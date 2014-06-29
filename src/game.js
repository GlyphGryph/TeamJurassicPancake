function Game(){
  var that = this;
  var character = new Character("Jake");
  var scenes;
  var state_manager;
  var ticket_pool = [];
  var input_enabled = true;
  var update_frequency = 1; // Hours between updates
  scenes = load_scenes();
  var happenings = {};
  jQuery.each(scenes, function(index, scene){
    var happening = new Happening(scene);
    happenings[scene["id"]] = happening;
    if(happening.type === "initial"){
      if(state_manager){
        throw "ERROR: Multiple initial states provided."; 
      }
      state_manager = new StateManager();
      state_manager.change_state(happening);
    } else if(happening.type == "open"){
      ticket_pool.push(happening);
    }
  });
  if(!state_manager){
    throw "ERROR: No initial state provided.";
  }

  var time = new TimeStamp(0);
  var last_time = new TimeStamp(0);
  var update_text = "";

  function run(){
    update_text = build_update();
    update_character();
    update_description(update_text);
  }
  
  function update_description(update_text){
    var description = jQuery("#description");
    description.html(update_text);
  }

  function update_character(){
    var character_text; 
    character_text = "<div>"
    character_text += "<span class='name'>"+character.name+"</span>";
    jQuery.each(character.attributes, function(index, attribute){
      character_text += "<span class='"+attribute.id+"'>"+attribute.label+": "+attribute.value+"</span>";
    });
    character_text += "<span class='time'>Time: "+time.formatted()+"</span>";
    character_text += "</div>";
    if(character.conditions.length > 0){
      character_text += "<div><span class='conditions'>Conditions: "
      jQuery.each(character.conditions, function(index, condition){
        character_text += condition + "  ";
      });
      character_text += "</span></div>";
    }
    jQuery("#character").html(character_text);
    return character_text;
  }

  function pass_time(){
    // Continue to run the logic of pass_time until something happens.
    var happen = false;
    update_character();
    update_description("<div class='phrase'>Time passes...</div>");
    if(time.total_hours%update_frequency === 0){
      var current_priority = 1;
      var tickets = [];
      jQuery.each(ticket_pool, function(index, happening){
        var alloted = happening.tickets(character, state_manager.history, time)
        if(alloted > 0){
          if(happening.priority > current_priority){
            tickets = [];
            current_priority = happening.priority;
            for (var i=0; i<alloted; ++i ){
              tickets.push(happening);
            }
          } else if(happening.priority === current_priority){
            for (var i=0; i<alloted; ++i ){
              tickets.push(happening);
            }
          }
       }   
      });
      var max = tickets.length-1
      var draw = getRandomInt(0,max);
      if(tickets[draw]){
        state_manager.change_state(tickets[draw]);
        happen=true;
      }
    }
    if(happen){
      run();
      input_enabled = true;
      return true;
    }
    time.total_hours += 1;
    setTimeout(pass_time, 100);
    return false;
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function build_update(){
    var description = ""
    // Process any effects that occur before the bulk of this Happening
    description += handle_effects(state_manager.state.before);
    // In case any of those effects changes the time, process conditions
    description += process_conditions();
    if(time.total_hours !== last_time.total_hours){
      description += time_passed();
    }
    last_time.total_hours = time.total_hours;
    if(state_manager.state.description){
      description += "<div class='phrase'>"+state_manager.state.description+"</div>";
    }

    //Process any effects that occue after the bulk of this happending
    description += handle_effects(state_manager.state.after);
    description += process_conditions();

    var target_selected = false;
    if(state_manager.state.auto){
      jQuery.each(state_manager.state.auto, function(index, auto){
        if(!target_selected && !auto["condition"]){
          target_selected = auto["target"];
        } else if(!target_selected && auto["condition"](character, state_manager.history, time) ) {
          target_selected = auto["target"];
        }
      });
    }
    if(target_selected){
      state_manager.change_state(happenings[target_selected]);
      description += build_update();
    } else {
      description += "<div id='choices'>";
      jQuery.each(state_manager.state.choices, function(index, choice){
        if(choice.condition(character, state_manager.history, time)){
          description += "<p><div class='choice' data-index='"+index+"'></p>";
          description += choice.text;
          description += "</div>";
        }
      });
      description += "</div>";
    }
    return description;
  }

  function handle_effects(effects){
    var display = "";
    jQuery.each(effects, function(index, effect){
      if(!effect.action){
        throw("Error: Effect has no action defined.");
      }
      if(effect.action == "add_condition"){
        display += character.add_condition(effect.value);
      } else if(effect.action == "remove_condition"){
        display += character.remove_condition(effect.value);
      } else if(effect.action == "progress"){
        character.progress();
      } else if(effect.action == "modify_attribute"){
        character.modify_attribute(effect.id, effect.value);
      } else if(effect.action == "tic"){
        time.total_hours+=effect.value;
      }
      
    });
    return display;
  }

  function process_conditions(){
    return character.process_conditions();
  }

  function time_passed(){
    return "<div class='timestamp'>"+(time.total_hours-last_time.total_hours)+" hours later...</div>";
  }

  this.start = function(){
    run();
  }
  
  jQuery("#description").on("click", ".choice", function(){
    if(input_enabled){
      input_enable = false;
      var target_id = state_manager.state.choices[jQuery(this).data("index")].target;
      if(target_id != "open"){
        state_manager.change_state(happenings[target_id]);
        run();
        input_enabled = true;
      } else {
        pass_time();
      }
    }
  });
}

function StateManager(){
  this.state;
  this.history = new History();

  this.change_state = function(new_state){
    if(new_state){
      this.history.add(new_state);
      this.state = new_state;
    } else {
      throw "ERROR: Invalid state provided!";
    }
  }
}

function Character(name){
  this.name = name;
  this.attributes = [
    {"id": "progress", "label": "Progress", "value": 0, "min": 0},
    {"id": "fatigue", "label": "Fatigue", "value": 40, "min": 0},
    {"id": "hunger", "label": "Hunger", "value": 20, "min": 0},
  ]
  this.conditions = [];

  this.get_attribute = function(id){
    var value;
    var found = false;
    jQuery.each(this.attributes, function(index, attribute){
      if(attribute.id === id){
        value = attribute.value;
        found = true;
      }
    });
    if(!found){
      throw "ERROR: Attribute ["+id+"] does not exist.";
    }
    return value;
  }

  this.get_focus = function(){
    var fatigue_penalty;
    if(this.get_attribute("fatigue") > 32){
      fatigue_penalty = this.get_attribute("fatigue")-32;
    } else {
      fatigue_penalty = 0;
    }
    var focus = 100 - fatigue_penalty - (this.get_attribute("hunger")/2);
    return focus;
  }


  this.add_condition = function(condition){
    this.conditions.push(condition);
    //if (condition == "melancholic spirit") {
    //  this.willpower -= 1;
    //}
    return "<div class='condition'>You have acquired '"+condition+"'!</div>";
  };

  this.modify_attribute = function(id, value){
    var modified=false;
    jQuery.each(this.attributes, function(index, attribute){
      if(attribute.id == id){
        attribute.value+=value;
        if("min" in attribute && attribute.min > attribute.value ){
          attribute.value = attribute.min;
        }
        modified=true;
      }
    });
    if(!modified){
      throw("ERROR: Tried to modify attribute ["+id+"], but it doesn't exist.");
    }
  }

  this.process_conditions = function(){
    for (i = 0; i < this.conditions.length; i++) { 
      condition_pull = this.conditions[i];
      switch (condition_pull) {
        case "melancholic spirit":
            this.willpower -= 1;
            break;
        
        default:
            break;
      }
    }
    return "";
  };

  this.remove_condition = function(condition){
    var index_to_delete = this.conditions.findIndex(function(a){return a == condition});
    if(index_to_delete){
      this.conditions = this.conditions.slice(0,index_to_delete).concat(this.conditions.slice(index_to_delete+1))
      return "<div class='condition'>You are no longer suffering from '"+condition+"'!</div>";
    } else {
      return "<div class='error'>ERROR: Attempted to remove condition ["+condition+"] that does not exist!</div>";
    }
  };


  this.progress = function(value){
    if(this.get_focus() <= 10){
      modifier=0;
    } else if(this.get_focus() <= 20){
      modifier=1;
    } else if(this.get_focus() <= 40){
      modifier=2;
    } else if(this.get_focus() <= 60){
      modifier=3;
    } else if(this.get_focus() <= 80){
      modifier=4;
    } else {
      modifier=5;
    }
    this.modify_attribute("progress", modifier);
    return modifier;
  }
}

function Happening(scene){
  this.description = scene["text"] || null;
  var choices = [];
  if(scene["choices"]){
    jQuery.each(scene["choices"], function(index, choice){
      choices.push(new Choice(choice));
    });
  }
  this.choices = choices;
  this.tickets = scene["tickets"] || function(){return 0};
  this.priority = scene["priority"] || 1;
  this.type = scene["type"] || "chain";
  this.before = scene["before"] || [];
  this.after = scene["after"] || [];
  this.auto = scene["auto"] || null;
  this.id = scene["id"];
}

function Choice(options){
  this.text = options["text"];
  this.target = options["target"];
  this.condition = options["condition"] || function(){return true;};
}

function History(){
  this.list = [];
  this.contains = function(value){
    var found = false;
    jQuery.each(this.list, function(index, element){
      if(element.id === value){
        found=true;
      }
    });
    return found;
  };
  this.excludes = function(value){
    return !this.contains(value);
  };
  this.add = function(state){
    this.list.push(state);
  }
};

function TimeStamp(hours){
  this.total_hours = hours;
  this.day = function(){
    return Math.floor(this.total_hours/24);
  };
  this.hour = function(){
    return this.total_hours%24;
  }
  this.formatted = function(){
    var stamp = "Day "+this.day()+", "
    var time_of_day = (this.hour()%12);
    if(time_of_day == 0){
      time_of_day = 12;
    }
    stamp+=time_of_day+":00";
    if(this.hour() >= 12){
      stamp+="pm";
    } else {
      stamp+="am";
    }

    return stamp;
  }
}

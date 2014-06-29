function Game(){
  var that = this;
  var character = new Character("Jake");
  var history = new History();
  var scenes;
  var state;
  var ticket_pool = {};
  var input_enabled = true;
  real_data = confirm("Load real data?")
  if(real_data){
    scenes = load_scenes();
  } else { 
    scenes = load_dummy_scenes();
  }
  var happenings = {};
  jQuery.each(scenes, function(index, scene){
    var happening = new Happening(scene);
    happenings[scene["id"]] = happening;
    if(happening.type === "initial"){
      if(state){
        throw "ERROR: Multiple initial states provided."; 
      }
      state = happening;
    } else if(happening.type == "open"){
      ticket_pool[scene["id"]] = happening;
    }
  });
  history.add(state);
  if(!state){
    throw "ERROR: No initial state provided.";
  }

  var time = new TimeStamp(0);
  var last_time = new TimeStamp(0);
  var update_text = "";

  function run(){
    update_text = build_update();
    update_character();
    jQuery("#description").html(update_text);
  }

  function update_character(){
    var character_text; 
    character_text = "<span class='name'>"+character.name+"</span>";
    character_text += "<span class='health'>Health: "+character.health+"</span>";
    character_text += "<span class='anxiety'>Anx: "+character.anxiety+"</span>";
    character_text += "<span class='willpower'>Will: "+character.willpower+"</span>";
    character_text += "<span class='self esteem'>Slf: "+character.self_esteem+"</span>";
    character_text += "<span class='comfort'>Cmf: "+character.comfort+"</span>";
    character_text += "<span class='hygiene'>Hyg: "+character.hygiene+"</span>";
    character_text += "<span class='time'>Time: "+time.formatted()+"</span>";
    jQuery("#character").html(character_text);
    return character_text;
  }

  function pass_time(){
    // Continue to run the logic of pass_time until something happens.
    var happen = false;
    time.total_hours += 1;
    update_character();
    jQuery("#description").html("<div class='phrase'>Time passes...</div>");
    if(time.total_hours%24 === 8){
      var current_priority = 1;
      var tickets = [];
      jQuery.each(ticket_pool, function(index, happening){
        var alloted = happening.tickets(character, history, time)
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
      var max = tickets.length
      if(current_priority === 1){
        max = 365;
      }
      var draw = getRandomInt(0,max);
      debugger;
      if(tickets[draw]){
        state = tickets[draw];
        happen=true;
      }
    }
    if(happen){
      run();
      input_enabled = true;
      return true;
    }
    setTimeout(pass_time, 100);
    return false;
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function build_update(){
    var description = ""
    // Process any effects that occur before the bulk of this Happening
    description += handle_effects(state.before);
    // In case any of those effects changes the time, process conditions
    description += process_conditions();

    if(time.total_hours != last_time.total_hours){
      description += time_passed();
    }
    last_time.total_hours = time.total_hours;
    if(state.description){
      description = "<div class='phrase'>"+state.description+"</div>";
    }

    //Process any effects that occue after the bulk of this happending
    description += handle_effects(state.after);
    description += process_conditions();

    var target_selected = false;
    if(state.auto){
      jQuery.each(state.auto, function(index, auto){
        if(!target_selected && !auto["condition"]){
          target_selected = auto["target"];
        } else if(!target_selected && auto["condition"](character) ) {
          target_selected = auto["target"];
        }
      });
    }
    if(target_selected){
      state = happenings[target_selected];
      description += build_update();
    } else {
      description += "<div id='choices'>";
      jQuery.each(state.choices, function(index, choice){
        description += "<p><div class='choice' data-index='"+index+"'></p>";
        description += choice.text;
        description += "</div>";
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
      } else if(effect.action == "time_passes"){
        time.total_hours+=effect.value;
      } else if(effect.action == "health"){
        character.health+=effect.value;
      } else if(effect.action == "anxiety"){
        character.anxiety+=effect.value;
      } else if(effect.action == "willpower"){
        character.willpower+=effect.value;
      } else if(effect.action == "self_esteem"){
        character.self_esteem+=effect.value;
      } else if(effect.action == "comfort"){
        character.comfort+=effect.value;
      } else if(effect.action == "hygiene"){
        character.hygiene+=effect.value;
      }
      
    });
    return display;
  }

  function process_conditions(){
    return "";
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
      var target_id = state.choices[jQuery(this).data("index")].target;
      if(target_id != "open"){
        state = happenings[target_id];
        run();
        input_enabled = true;
      } else {
        pass_time();
      }
    }
  });
}

function Character(name){
  this.name = name;
  this.health = 0;
  this.anxiety = 0
  this.willpower = 5;
  this.self_esteem = 5;
  this.comfort = 10;
  this.hygiene = 10;
  this.conditions = [];

  this.add_condition = function(condition){
    this.conditions.push(condition);
    //if (condition == "melancholic spirit") {
    //  this.willpower -= 1;
    //}
    return "<div class='condition'>You have acquired '"+condition+"'!</div>";
  };
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
    
    
  };
  this.remove_condition = function(condition){
    var index_to_delete = this.conditions.findIndex(function(a){return a == condition});
    if(index_to_delete){
      this.conditions = this.conditions.slice(0,index_to_delete).concat(this.conditions.slice(index_to_delete+1))
      return "<div class='condition'>You are no longer suffering from '"+condition+"'!</div>";
    } else {
      return "<div class='error'>ERROR: Attempted to remove a condition that does not exist!</div>";
    }
  };
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
}

function History(){
  this.list = [];
  this.contains = function(value){
    return jQuery.inArray(value, list);
  };
  this.excludes = function(value){
    return !jQuery.inArray(value, list);
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

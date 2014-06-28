function Game(){
  var that = this;
  var character = new Character("Jake");

  var scenes = load_dummy_scenes();
  var happenings = {};
  jQuery.each(scenes, function(index, scene){
    happenings[scene["id"]] = new Happening(scene);
  });

  var state = happenings["table_choice"];
  var time = 0;
  var last_time = -1;
  var update_text = "";
  var character_text = "";

  this.run = function(){
    update_text = build_update();
    character_text = "<span class='name'>"+character.name+"</span>";
    character_text += "<span class='health'>Health: "+character.health+"</span>";
    character_text += "<span class='time'>Time: "+get_time()+"</span>";
    jQuery("#character").html(character_text);
    jQuery("#description").html(update_text);
  }

  function build_update(){
    var description = ""
    // Process any effects that occur before the bulk of this Happening
    description += handle_effects(state.before);
    // In case any of those effects changes the time, process conditions
    description += process_conditions();

    if(time != last_time){
      description += get_time();
    }
    last_time = time;
    description = "<div class='phrase'>"+state.description+"</div>"

    //Process any effects that occue after the bulk of this happending
    description += handle_effects(state.after);
    description += process_conditions();

    var target_selected = false;
    if(state.auto){
      jQuery.each(state.auto, function(index, auto){
        if(!target_selected && !auto["condition"]){
          target_selected = auto["target"];
        } else if(!target_selected && auto["condition"]() ) {
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

  function handle_effects(thing){
  }

  function process_conditions(){
  }

  function get_time(){
    return time;
  }

  jQuery("#description").on("click", ".choice", function(){
    var target_id = state.choices[jQuery(this).data("index")].target;
    state = happenings[target_id];
    that.run();
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
}

function Happening(scene){
  this.description = scene["text"] || "I AM ERROR";
  var choices = [];
  if(scene["choices"]){
    jQuery.each(scene["choices"], function(index, choice){
      choices.push(new Choice(choice["text"], choice["target"]));
    });
  }
  this.choices = choices;
  this.before = scene["before"] || {};
  this.after = scene["after"] || {};
  this.auto = scene["auto"] || null;
}

function Choice(text, target){
  this.text = text;
  this.target = target;
}

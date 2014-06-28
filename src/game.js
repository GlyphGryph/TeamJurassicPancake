function Game(){
  var that = this;
  var character = new Character("Jake");

  var scenes = load_scenes();
  var happenings = {};
  jQuery.each(scenes, function(index, scene){
    happenings[scene["id"]] = new Happening(scene);
  });

  var state = happenings["day_1_intro"];
  var update_text = "";
  var character_text = "";

  this.run = function(){
    update_text = build_update();
    character_text = "<span class='name'>"+character.name+"</span>";
    character_text += "<span class='health'>Health: "+character.health+"</span>";
    jQuery("#character").html(character_text);
    jQuery("#description").html(update_text);
  }

  function build_update(){
    var description = "<div class='phrase'>"+state.description+"</div>"
    if(state.effects["lose_health"]){
      character.health -= state.effects["lose_health"];
    }
    if(state.auto){
      state = state.auto;
      return description + build_update();
    } else {
      description += "<div id='choices'>";
      jQuery.each(state.choices, function(index, choice){
        description += "<div class='choice' data-index='"+index+"'>";
        description += choice.text;
        description += "</div>";
      });
      description += "</div>";
    }
    return description;
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
  this.effects = scene["effects"] || {};
  this.auto = scene["auto"] || null;
}

function Choice(text, target){
  this.text = text;
  this.target = target;
}

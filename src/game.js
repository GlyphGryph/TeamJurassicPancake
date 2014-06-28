function Game(){
  var that = this;
  var character = new Character("Jake");

  var candy = new Happening({
    "description": "Some candy is available."
  });
  var new_table = new Happening({
    "description":"You check out a new table.", 
    "auto": candy
  });
  var throwup = new Happening({
    "description": "You eat some candy and then throw up.",
    "effects": {"lose_health": 10},
    "auto": new_table,
  });
  candy.choices = [new Choice("Eat some candy", throwup), new Choice("Check out a different table", new_table)];

  var state = new_table;
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
    state = state.choices[jQuery(this).data("index")].target;
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
}

function Happening(options){
  this.description = options["description"] || "I AM ERROR";
  this.choices = options["choices"] || [];
  this.effects = options["effects"] || {};
  this.auto = options["auto"] || null;
}

function Choice(text, target){
  this.text = text;
  this.target = target;
}

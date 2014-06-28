function Game(){
  var that = this;
  var character = new Character("Jake");

  var candy = new Happening("Some candy is available.", []);
  var new_table = new Happening("You check out a new table.", [], {}, candy)
  var throwup = new Happening("You eat some candy and then throw up.", [], {"lose_health": 10}, new_table);
  candy.choices = [new Choice("Eat some candy", throwup), new Choice("Check out a different table", new_table)];

  var state = throwup;
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
    if(state.side_effects["lose_health"]){
      character.health -= state.side_effects["lose_health"];
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
}

function Happening(description, choices, side_effects = {}, auto=null){
  this.description = description;
  this.choices = choices;
  this.side_effects = side_effects;
  this.auto = auto;
}

function Choice(text, target){
  this.text = text;
  this.target = target;
}

function Game(){
  var that = this;
  var candy = new Happening("Some candy is available.", []);
  var new_table = new Happening("You check out a new table.", [], candy)
  var throwup = new Happening("You eat some candy and then throw up.", [], new_table);
  candy.choices = [new Choice("Eat some candy", throwup), new Choice("Check out a different table", new_table)];

  var state = throwup;

  this.run = function(){
    var update_text = build_update();
    jQuery("#description").html(update_text);
  }

  function build_update(){
    var description = "<div class='phrase'>"+state.description+"</div>"
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

function Character(){
  this.name = "Jake";
  this.health = 100;
}

function Happening(description, choices, auto=null){
  this.description = description;
  this.choices = choices;
  this.auto = auto;
}

function Choice(text, target){
  this.text = text;
  this.target = target;
}

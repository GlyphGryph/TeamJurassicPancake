function Game(){
  var candy = new Happening("Some candy is available.", []);
  var new_table = new Happening("You check out a new table.", [], candy)
  var throwup = new Happening("You throw up.", [], new_table);
  candy.choices = [new Choice("Eat some candy", throwup), new Choice("Check out a different table", new_table)];

  var state = candy;

  this.run = function(){
    jQuery("#description").html(state.description);
  }
}

function Character(){
  this.name = "Jake";
  this.health = 100;
}

function Happening(description, choices, auto=null){
  this.description = description;
  this.choices = choices;
}

function Choice(text, target){
  this.text = text;
  this.target = target;
}

function load_scenes(){
  return [
    /*
    { "type": "chain",
      "id": "",
      "text": "",
      "choices": [{
        "text": "",
        "target": ""
      }],
    },
    */
    { "type": "initial",
      "id": "start",
      "text": "<p>Okay, three days left to do that Kickstarter art thing I've been commissioned to. Three days. I know I got contacted a couple of weeks ago, but I am an almost pathological procrastinator. Now, money's running REALLY low, and so is time. I guess it's time that I go through the usual stressed routine of finishing in time, and hope for the best. At least the pay's decent for this. At least I have glorious coffee. So, what do I do today?</p>",
      "choices": [
        {"text": "Work", "target": "work"},
      ],
    },
    { "type": "chain",
      "id": "start_work",
      "before": [
        {"action": "progress"},
        {"action": "modify_attribute", "id": "fatigue", "value": 4 },
        {"action": "tic", "value": 1},
      ],
      "text": "<p>Better start working on this art thing, don't want to flop this one.</p>",
      "choices": [
        {"text": "Moving on...", "target": "open"},
      ]
    },
    // HOURLY CHOICE AND OPTIONS
    { "type": "open",
      "priority": 1,
      "tickets": function(character, history, time){
        return 10;
      },
      "id": "the_choice",
      "text": "What do?",
      "choices": [
        {"text": "Work", "target": "work"},
        {"text": "Browse internet", "target": "browse_internet"},
        {"text": "Ok, enough work for now. Time to sleep.", "target": "sleep", "condition": function(character, history, time){
          if(character.get_attribute("fatigue") > 24){
            return true;
          }
          else false;
        }},
        {"text": "Okay, let's grab something to eat...", "target": "eat", "condition": function(character, history, time){
          if(character.get_attribute("hunger") > 12 && character.get_attribute("food supply") > 0){
            return true;
          }
          else false;
        }},
        {"text": "Coffee time, I think.", "target": "make_coffee", "condition": function(character, history, time){
          if(character.get_attribute("coffee supply") > 0){
            return true;
          }
          else false;
        }},
        {"text": "Go to the store for supplies", "target": "store_hub"},
      ],
    },
    { "type": "chain",
      "id": "work",
      "before": [
        { "action": "progress"},
        { "action": "modify_attribute", "id": "fatigue", "value": 4 },
        { "action": "tic", "value": 1},
      ],
      "text": "<p>Keeping up the... Work. Exhausting, but necessary. I think.</p>",
      "choices": [
        {"text": "Moving on...", "target": "open"},
      ]
    },
    { "type": "chain",
      "id": "browse_internet",
      "before": [
        { "action": "modify_attribute", "id": "fatigue", "value": 2 },
        { "action": "tic", "value": 1},
      ],
      "text": "<p>Need a break. Time to look at cats on the internet.</p>",
      "choices": [
        {"text": "Moving on...", "target": "open"},
      ]
    },
    { "type": "chain",
      "id": "sleep",
      "text": "<p>zZzZzZzZz...</p>",
      "after": [
        { "action": "tic", "value": 8 },
        { "action": "modify_attribute", "id": "fatigue", "value": -64 },
      ],
      "choices": [
        {"text": "Another sleep well done. That was nice. But now it's time to get up.", "target": "open"},
      ]
    },
    { "type": "chain",
      "id": "eat",
      "text": "<p>I sit down for a nice, relaxing meal.</p>",
      "after": [
        { "action": "tic", "value": 1 },
        { "action": "modify_attribute", "id": "fatigue", "value": 2 },
        { "action": "modify_attribute", "id": "hunger", "value": -40 },
        { "action": "modify_attribute", "id": "food supply", "value": -10 },
      ],
      "choices": [
        {"text": "All done!", "target": "open"},
      ]
    },
    { "type": "chain",
      "id": "make_coffee",
      "before": [
        { "action": "progress"},
        { "action": "modify_attribute", "id": "fatigue", "value": -15 },
        { "action": "modify_attribute", "id": "coffee supply", "value": -10 },
        { "action": "add_condition", "value": Condition("caffeinated", 4), },
        { "action": "tic", "value": 1},
      ],
      "text": "<p>Keeping up the... Work. Exhausting, but necessary. I think.</p>",
      "choices": [
        {"text": "Moving on...", "target": "open"},
      ]
    },
    { "type": "chain",
      "id": "store_hub",
      "before": [
        { "action": "modify_attribute", "id": "fatigue", "value": 4 },
        { "action": "tic", "value": 1},
      ],
      "text": "<p>I go to the store to pick up some supplies.</p>",
      "choices": [
        {"text": "Buy some food and stuff.", "target": "store_food", "condition": function(character, history, time){
          if(character.get_attribute("money") > 29){
            return true;
          }
          else false;
        }},
        {"text": "Buy coffee!", "target": "store_coffee", "condition": function(character, history, time){
          if(character.get_attribute("money") > 9){
            return true;
          }
          else false;
        }},
        {"text": "Okay, time to go home.", "target": "ride_home"},
      ]
    },
    { "type": "chain",
      "id": "store_food",
      "before": [
        { "action": "modify_attribute", "id": "money", "value": -30 },
        { "action": "modify_attribute", "id": "food supply", "value": 10 },
        { "action": "tic", "value": 0},
      ],
      "text": "<p>Some food in the basket. Look at that money go.</p>",
      "choices": [
        {"text": "Buy some food and stuff.", "target": "store_food", "condition": function(character, history, time){
          if(character.get_attribute("money") > 29){
            return true;
          }
          else false;
        }},
        {"text": "Buy coffee!", "target": "store_coffee", "condition": function(character, history, time){
          if(character.get_attribute("money") > 9){
            return true;
          }
          else false;
        }},
        {"text": "Okay, time to go home.", "target": "ride_home"},
      ]
    },
    { "type": "chain",
      "id": "store_coffee",
      "before": [
        { "action": "modify_attribute", "id": "money", "value": -10 },
        { "action": "modify_attribute", "id": "coffee supply", "value": 10 },
      ],
      "text": "<p>Look at that coffee in the basket. Look at it. Freaking glorious right there.</p>",
      "choices": [
        {"text": "Buy some food and stuff.", "target": "store_food", "condition": function(character, history, time){
          if(character.get_attribute("money") > 29){
            return true;
          }
          else false;
        }},
        {"text": "Buy coffee!", "target": "store_coffee", "condition": function(character, history, time){
          if(character.get_attribute("money") > 9){
            return true;
          }
          else false;
        }},
        {"text": "Okay, time to go home.", "target": "ride_home"},
      ]
    },
    { "type": "chain",
      "id": "ride_home",
      "before": [
        { "action": "tic", "value": 1},
      ],
      "text": "<p>Alright, it's time to get back on the road home. Gotta catch a bus.</p>",
      "choices": [
        {"text": "Wait. Am I too close to that bus?", "target": "bus_hit", "condition": function(character, history, time){
          if(character.get_attribute("fatigue") >= 74){
            return true;
          }
          else false;
        }},
        {"text": "Let's roll.", "target": "open", "condition": function(character, history, time){
          if(character.get_attribute("fatigue") < 74){
            return true;
          }
          else false;
        }},
      ]
    },
    { "type": "chain",
      "id": "bus_hit",
      "text": "<p>Oops. Welp. That WAS a bus getting too close. I just took a bad hit . . .</p>",
      "auto": [
        {"target": "game_over"}
      ]
    },
    
    
    
    
    // RANDOM EVENTS - These event chains get mixed in with the regular decisions
    { "type": "open",
      "priority": 1,
      "tickets": function(character, history, time){
        if(character.get_attribute("fatigue") >= 40){
          return 1;
        } else {
          return 0;
        }
      },
      "id": "whoa_a_spider",
      "text": "<p>Did that ... did that big spider just go behind my computer? Oh God. What do I do?</p>",
      "auto": [
        {"text": "I should HUNT this spider before it hunts me.", "target": "hunt_spider"},
        {"text": "Whatever.", "target": "ignore_spider"},
      ],
    },
    { "type": "chain",
      "id": "hunt_spider",
      "text": "<p>SMASH. One less pest around here. Wait, how long did that take? At least I'm a little less tired now . . .</p>",
      "before": [
        { "action": "tic", "value": 2 },
        {"action": "modify_attribute", "id": "fatigue", "value": -8 },
      ],
      "choices": [
        {"text": "Back to work, I think.", "target": "open"},
      ]
    },
    { "type": "chain",
      "id": "ignore_spider",
      "text": "<p>It can wait. Ugh, I've lost time.</p>",
      "before": [
        { "action": "tic", "value": 1 },
        {"action": "modify_attribute", "id": "fatigue", "value": -8 }, // it's a bit harder to sleep with a spider in the room.
      ],
      "choices": [
        {"text": "Not the most comfortable sleep I've ever had, but, I'm awake now.", "target": "open"},
      ]
    },
    
    // OVERRIDES - These are event chains that happen with priorities, such as falling asleep from being exhausted
    { "type": "open",
      "priority": 3,
      "tickets": function(character, history, time){
        if(character.get_attribute("fatigue") >= 100){
          return 10;
        } else {
          return 0;
        }
      },
      "id": "the_choice",
      "text": "What... huh... ugh... can't focus... so... zzzzZZZzzzZZzzzz",
      "auto": [
        {"target": "force_sleep"},
      ],
    },
    { "type": "chain",
      "id": "force_sleep",
      "text": "<p>Ugh? What happened? Did I fall asleep at my desk?</p>",
      "before": [
        { "action": "tic", "value": 8 },
        {"action": "modify_attribute", "id": "fatigue", "value": -48 },
      ],
      "choices": [
        {"text": "Not the most comfortable sleep I've ever had, but, I'm awake now.", "target": "open"},
      ]
    },
    
    
    // ENDINGS
    { "type": "open",
      "priority": 5,
      "tickets": function(character, history, time){
        if(character.get_attribute("progress") >= 100 && time.total_hours === 72){
          return 1;
        }
        return 0;
      },
      "id": "glorious_ending",
      "text": "<p>Work turned in, at the nick of time. Customer seems very pleased indeed! That makes me glad. Hope you guys succeed with your Kickstarter!</p><p>A month passed, and their Kickstarter was a resounding success. They even gave me a bonus for helping out! Awesome! Maybe I can afford more than ramen today!</p>",
      "auto": [
        {"target": "game_over"}
      ]
    },
    { "type": "open",
      "priority": 5,
      "tickets": function(character, history, time){
        if(character.get_attribute("progress") >= 90 && time.total_hours === 72){
          return 1;
        }
        return 0;
      },
      "id": "good_ending",
      "text": "<p>Work turned in, at the nick of time. Customer seems very pleased indeed! That makes me glad. Hope you guys succeed with your Kickstarter!</p><p>A month passed. The Kickstarter flopped. Crap. Oh well, can't win them all. Customer still appreciates my help, at least.</p>",
      "auto": [
        {"target": "game_over"}
      ]
    },
    { "type": "open",
      "priority": 5,
      "tickets": function(character, history, time){
        if(character.get_attribute("progress") > 50 && character.get_attribute("progress") < 120 && time.total_hours === 72){
          return 1;
        }
        return 0;
      },
      "id": "mediocre_ending_1",
      "text": "<p>Work turned in. Customer is okay with the result. Not like overly ecstatic, but they accept it, and pay me my dues. Hopefully they succeed.</p><p>The golden month has passed. Kickstarter was a success! I'm happy for them, and I'm happy to have been paid.</p>",
      "auto": [
        {"target": "game_over"}
      ]
    },
    { "type": "open",
      "priority": 5,
      "tickets": function(character, history, time){
        if(character.get_attribute("progress") > 50 && character.get_attribute("progress") < 120 && time.total_hours === 72){
          return 1;
        }
        return 0;
      },
      "id": "mediocre_ending_1",
      "text": "",
      "auto": [
        {"target": "game_over"}
      ]
    },
    { "type": "open",
      "priority": 5,
      "tickets": function(character, history, time){
        if(character.get_attribute("progress") > 50 && character.get_attribute("progress") < 120 && time.total_hours === 72){
          return 1;
        }
        return 0;
      },
      "id": "mediocre_ending_2",
      "text": "<p>Work turned in. Customer is okay with the result. Not like overly ecstatic, but they accept it, and pay me my dues. Hopefully they succeed.</p><p>The not so golden month has passed. Kickstarter failed. Oh well. Customer doesn't blame me, at least.</p>",
      "auto": [
        {"target": "game_over"}
      ]
    },
    { "type": "open",
      "priority": 5,
      "tickets": function(character, history, time){
        if(character.get_attribute("progress") > 50 && character.get_attribute("progress") < 120 && time.total_hours === 72){
          return 1;
        }
        return 0;
      },
      "id": "bad_ending_1",
      "text": "<p>Work turned in. Customer dissatisfied, doesn't want to pay me in full for this. The hell is up with those guys? You don't just cut pay on a commission like that! I don't really care where their Kickstarter goes. I GUESS it's okay if they succeed.</p><p>One month later, Kickstarter successful. Good for them, I guess. Meanwhile I'm trying to scrape by with what I have.</p>",
      "auto": [
        {"target": "game_over"}
      ]
    },
    { "type": "open",
      "priority": 5,
      "tickets": function(character, history, time){
        if(character.get_attribute("progress") > 50 && character.get_attribute("progress") < 120 && time.total_hours === 72){
          return 1;
        }
        return 0;
      },
      "id": "bad_ending_2",
      "text": "<p>Work turned in. Customer dissatisfied, doesn't want to pay me in full for this. The hell is up with those guys? You don't just cut pay on a commission like that! I don't really care where their Kickstarter goes. I GUESS it's okay if they succeed.</p><p>Their month has passed, and their Kickstarter fell face first on the ground. Can't say whose fault that was, but at least they don't blame me. Perhaps it IS my fault, maybe I just didn't do well enough.</p>",
      "auto": [
        {"target": "game_over"}
      ]
    },
    { "type": "open",
      "priority": 5,
      "tickets": function(character, history, time){
        if(character.get_attribute("progress") > 20 && character.get_attribute("progress") < 80 && time.total_hours === 72){
          return 1;
        }
        return 0;
      },
      "id": "very_bad_ending_1",
      "text": "<p>Work turned in. Customer really not happy with it, and refuses to pay me. Dick. Still used the artwork for the Kickstarter. Fuck those guys.</p><p>As predicted, their Kickstarter failed. I say it's because they're dicks. They blame me for the terrible art. Screw that. I need to find another client to make money.</p>",
      "auto": [
        {"target": "game_over"}
      ]
    },
    { "type": "open",
      "priority": 5,
      "tickets": function(character, history, time){
        if(character.get_attribute("progress") < 50 && time.total_hours === 72){
          return 1;
        }
        return 0;
      },
      "id": "very_bad_ending_2",
      "text": "<p>Work turned in, if it can be called work. Customer is absolutely livid, won't give me pause about how bad it is. Refuses to pay me or use the art. This wasn't my best effort ever, but come on, a guy's gotta live off of something!</p><p>Checked their Kickstarter today, out of morbid curiosity. It failed, badly. There's no shortage of angry emails telling me how it's all my fault. All from the same person. Screw that guy, as if he's never had a bad set of days in his life before. I direly need money now, since the turd didn't pay me. I hope I won't get evicted.</p>",
      "auto": [
        {"target": "game_over"}
      ]
    },
    { "type": "open",
      "priority": 5,
      "tickets": function(character, history, time){
        if(character.get_attribute("progress") > 100 && time.total_hours === 72){
          return 1;
        }
        return 0;
      },
      "id": "",
      "text": "",
      "auto": [
        {"target": "game_over"}
      ]
    },
    { "type": "open",
      "priority": 5,
      "tickets": function(character, history, time){
        if(character.get_attribute("progress") > 100 && time.total_hours === 72){
          return 1;
        }
        return 0;
      },
      "id": "",
      "text": "",
      "auto": [
        {"target": "game_over"}
      ]
    },
    { "type": "open",
      "priority": 5,
      "tickets": function(character, history, time){
        if(character.get_attribute("progress") > 100 && time.total_hours === 72){
          return 1;
        }
        return 0;
      },
      "id": "",
      "text": "",
      "auto": [
        {"target": "game_over"}
      ]
    },
    // MISSED DATE
    { "type": "open",
      "priority": 5,
      "tickets": function(character, history, time){
        if(time.total_hours > 72){
          return 1;
        }
        return 0;
      },
      "id": "missed_due_date",
      "text": "<p>Oops. It's past the final hour now. Didn't turn anything in. Shit. Customer ain't gonna be happy about this. Neither is my wallet. Neither am I. At least I slept pretty well. Contacted customer, he is disappointed, and a bit pissy. Understandable enough. Won't get paid. I GUESS that's understandable too. Hope they manage anyways. I'll need to earn some money that isn't from this commission.</p>",
      "auto": [
        {"target": "game_over"}
      ]
    },

    //GAME OVER
    { "type": "chain",
      "id": "game_over",
      "text": "<p>GAME OVER!</p>",
    },
  ]
}

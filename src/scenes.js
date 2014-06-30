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
          if(character.get_attribute("hunger") > 12 && character.get_attribute("food_supply") > 0){
            return true;
          }
          else false;
        }},
        {"text": "Coffee time, I think.", "target": "make_coffee", "condition": function(character, history, time){
          if(character.get_attribute("coffee_supply") > 0){
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
        { "action": "modify_attribute", "id": "food_supply", "value": -1 },
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
        { "action": "modify_attribute", "id": "coffee_supply", "value": -1 },
        { "action": "add_condition", "id": "caffeinated", "lifespan": 4, },
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
        {"text": "Buy some food and stuff. (Cost: 30)", "target": "store_food", "condition": function(character, history, time){
          if(character.get_attribute("money") > 29){
            return true;
          }
          else false;
        }},
        {"text": "Buy coffee! (Cost: 10)", "target": "store_coffee", "condition": function(character, history, time){
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
        { "action": "modify_attribute", "id": "food_supply", "value": 1 },
        { "action": "tic", "value": 0},
      ],
      "text": "<p>Some food in the basket. Look at that money go.</p>",
      "choices": [
        {"text": "Buy some food and stuff. (Cost: 30)", "target": "store_food", "condition": function(character, history, time){
          if(character.get_attribute("money") > 29){
            return true;
          }
          else false;
        }},
        {"text": "Buy coffee!(Cost: 10)", "target": "store_coffee", "condition": function(character, history, time){
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
        { "action": "modify_attribute", "id": "coffee_supply", "value": 1 },
      ],
      "text": "<p>Look at that coffee in the basket. Look at it. Freaking glorious right there.</p>",
      "choices": [
        {"text": "Buy some food and stuff. (Cost: 30)", "target": "store_food", "condition": function(character, history, time){
          if(character.get_attribute("money") > 29){
            return true;
          }
          else false;
        }},
        {"text": "Buy coffee! (Cost: 10)", "target": "store_coffee", "condition": function(character, history, time){
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
        if(time.hour() > 7 && time.hour() < 18 && history.excludes("first_ring")){
          return 1;   
        }
        return 0;
      },
      "id": "first_ring",
      "text": "<p>The phone is ringing...</p>",
      "choices": [
        {"text": "Answer it.", "target": "answer_phone_1"},
        {"text": "Turn off the damned thing - I need to focus!", "target": "unplug_phone"},
        {"text": "Just let it ring - if it's important, they'll call back later.", "target": "ignore_phone"},
      ]
    },
    { "type": "chain",
      "id": "ignore_phone",
      "text": "<p>You ignore it, and eventually it stops ringing.</p>",
      "auto": [
        {"target": "the_choice"},
      ],
    },
    { "type": "chain",
      "id": "unplug_phone",
      "text": "<p>You turn off the phone, and the ringing stops. Ah, silence. Now you can finally get some work done!</p>",
      "auto": [
        {"target": "the_choice"},
      ],
    },
    { "type": "chain",
      "id": "answer_phone_1",
      "text": "<p>It's your mother. She's in the neighbourhood, and wants to know if she can stop by to visit. It's been too long since she last got to see you - you're always so busy!</p>",
      "choices": [
        { "text": "Sorry, mom. I'm busy this weekend.", "target": "phone_rejection"},
        { "text": "Sure, mom. I can always spare some time for you.", "target": "phone_accept"},
      ]
    },
    { "type": "chain",
      "id": "phone_rejection",
      "text": "<p>You tell her that you're really busy and on a tight schedule, and now's not a good time. You have to go. She sounds really disappointed, but she let's you go, and says to give her a call back whenever you find some free time. She misses hearing the sound of your voice.</p>",
      "auto": [
        {"target": "the_choice"},
      ],
    },
    { "type": "chain",
      "id": "phone_accept",
      "text": "<p>She says she'll head right over then, and she remains on the phone for the entire trip. Eventually, she says she's at your front door, and you let her in. You spend some time chatting about this and then, and then notice the time. She doesn't seem like she's planning on leaving anytime soon, though...</p>",
      "after": [
        {"action": "modify_attribute", "id": "fatigue", "value": 4 },
        {"action": "tic", "value": 1},
      ],
      "choices": [
        { "text": "Enjoy this opportunity, since you don't get to see her often", "target": "visit_mom"},
        { "text": "Explain that you've got an important project you've got to get back to", "target": "kick_out_mom"},
      ]
    },
    { "type": "chain",
      "id": "kick_out_mom",
      "text": "<p>You tell her it's been nice seeing her, but you've really got to get back to work. She gives you a hug, and says she understands, although she looks crestfallen, and asks you not to be such a stranger before heading out.</p>",
      "auto": [
        {"target": "the_choice"},
      ],    
    },
    { "type": "chain",
      "id": "visit_mom",
      "text": "<p>She asks how things are going, and tells you about her health problems and the argument she's been in with some relatives, and how much she hates her new neighbors and how they keep calling the cops whenever she lights things on fire in the backyard, but the joke's on them because she's always got a bag of hot dogs to pull and claim she's cooking, so she doesn't even have to put it out. She says you look too skinny, and you need to eat more and exercise more, and what happened to that pretty girl you were seeing?</p><p>You explain that you broke up months ago and, yes, you probably should eat better. She responds by offering to make you dinner, and before you can stop her she has your cupboards open and is aghast at how bare they are! She asks where all your food is.</p>",
      "after": [
        {"action": "modify_attribute", "id": "fatigue", "value": 4 },
        {"action": "tic", "value": 1},
      ],
      "choices": [
        { "text": "Admit you've been busy and really low on funds, you can't afford to buy much more right now.", "target": "visit_mom_2"},
      ]
    },
    { "type": "chain",
      "id": "visit_mom_2",
      "text": "<p>She finally realizes that you would be working if you aren't here, and apologizes for taking up so much of her time. She gives you a hundred dollar bill, pushing it into your hand before you can put together the words to refuse it, before taking her leave. She says she'll be by again sometime soon, and if you need any more money just let her know! She doesn't want her baby to starve, but for now she'll leave and let you get back to work. The door shuts behind her shortly afterwards, and you're left alone in the house once more. It was, to be honest, an enjoyable enough visit, and at least you've got enough money now to eat for the rest of the week...</p>",
      "after": [
        {"action": "modify_attribute", "id": "money", "value": 100},
      ],
      "auto": [
        {"target": "the_choice"},
      ],    
    },
    // These events occur if your phone rang previously, but you failed to answer it
    { "type": "open",
      "priority": 1,
      "tickets": function(character, history, time){
        if(history.contains("ignore_phone") && history.excludes("answer_phone_2") && history.excludes("unplug_phone")){
          return 2;
        } else {
          return 0;
        }
      },
      "text": "<p>The phone is ringing again...</p>",
      "choices": [
        {"text": "Answer it.", "target": "answer_phone_2"},
        {"text": "Turn off the damned thing - I need to focus!", "target": "unplug_phone"},
        {"text": "Just let it ring - if it's important, they'll call back later.", "target": "ignore_phone"},
      ]
    },
    { "type": "chain",
      "id": "answer_phone_2",
      "text": "Its your mother. She says she's home now, but she had been in the area and wanted to visit. You must have been out when she called. She wanted to visit - it's been forever since she's seen you. She wants to know how you've been and what's been going on in your life.",
      "choices": [
        { "text": "Let her know you don't have time to talk", "target": "phone_rejection"},
        { "text": "Chat with her for a little while", "target": "phone_conversation"},
      ]
    },
    { "type": "chain",
      "id": "phone_conversation",
      "text": "<p>The phone call drags on and on. It's enjoyable enough, but you're constantly being nagged by the voice that says you should be working, and it really HAS been too long since you last talked - that's part of why it takes so long. There's a lot to catch up on! Eventually, though, you tell her you have to go, and she says that maybe she will get a chance to talk with you in person after you're done with your current project - she'd be happy to come up and visit once you have some free time. You think you'd like that.</p>",
      "after": [
        {"action": "modify_attribute", "id": "fatigue", "value": 4 },
        {"action": "tic", "value": 1},
      ],
      "auto": [
        {"target": "the_choice"},
      ],
    },
    { "type": "open",
      "priority": 1,
      "tickets": function(character, history, time){
        if(character.get_attribute("fatigue") >= 40 && history.excludes("who_a_spider")){
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
      "id": "too_tired",
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

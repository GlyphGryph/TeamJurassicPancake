function load_dummy_scenes(){
  return [
    { "type": "initial",
      "text": "<p>You go for a walk around the confectionary.</p>",
      "id": "walk_around",
      "choices": [
        { "text": "Explore for a while!",
          "target": "open",
        },
      ]
    },
    { "type": "open",
      "priority": 2,
      "tickets": function(character, history, timestamp){
        if(history.excludes("clown")){
          return 5;
        }
        return 0;
      },
      "id": "clown",
      "text": "<p>Ah! A scary clown hands you a balloon! He says to be careful... this is the only one you'll get!</p>",
      "after": [ 
        {"action": "add_condition", "value": "balloon"},
      ],
      "choices": [
        {"text": "Ugh.", "target": "open",}
      ]
    },
    { "type": "open",
      "priority": 1,
      "tickets": function(character, history, timestamp){
        return 100;
      },
      "id": "bird_poop",
      "text": "<p>A bird poops on you.</p>",
      "choices": [
        { "text": "Ugh.",
          "target": "open",
        },
      ]
    },
    { "type": "open",
      "priority": 1,
      "tickets": function(character, history, timestamp){
        return 264;
      },
      "id": "find_table",
      "auto": [
        {"target": "table_choice"}
      ]
    },
    { "type": "open",
      "priority": 2,
      "tickets": function(character, history, timestamp){
        if(timestamp.day() > 3){
          return 1;
        };
      },
      "id": "get_bored",
      "text": "<p>You get bored and leave after wandering around for a few days.</p><p>You win, I guess?</p>"
    },
    { "id": "eat_candy",
      "text": "<p>You eat some candy from the table.</p>",
      "before": [
        {"action": "health", "value": -10},
        {"action": "time_passes", "value": 4},
      ],
      "auto": [
        { "target": "candy_sick",
          "condition": function(character, history, timestamp){
            if(character.health < -60){
              return true;
            } else {
              return false;
            }
          },
        },
        {
          "target": "table_choice",
        },
      ],
    },
    { "id": "table_choice",
      "text": "<p>There's several types of candy at this table! What do?</p>",
      "choices": [
        { "text": "Eat a blue one!",
          "target": "eat_candy",
          "condition": function(character, history, timestamp){
            if(character.health >= -30){
              return true;
            } else {
              return false;
            }
          }
        },
        { "text": "Eat a red one!",
          "target": "eat_candy",
          "condition": function(character, history, timestamp){
            if(character.health >= -30){
              return true;
            } else {
              return false;
            }
          }
        },
        { "text": "Ugh... I don't feel so good, but... eat another one...?",
          "target": "eat_candy",
          "condition": function(character, history, timestamp){
            if(character.health < -30){
              return true;
            } else {
              return false;
            }
          }
        },
        { "text": "Explore for a while!",
          "target": "open",
        },
      ],
    },
    { "id": "candy_sick",
      "text": "<p>Ugggh.... you don't feel so good all of a sudden...</p><p>The world spins, and you clutch the table before collapsing. As you lose consciousness, you hear an ambulance in the distance...</p>",
      "after": [
        { "action": "add_condition", "value": "nausea", },
        { "action": "add_condition", "value": "unconscious", }
      ],

      "auto": [
        { "target": "ambulance_ride",},
      ],
    },
    { "id": "ambulance_ride",
      "before": [
        {"action": "time_passes", "value": 400,}
      ],
      "after": [
        {"action": "remove_condition", "value": "unconscious",},
      ],
      "auto": [
        { "target": "hospital_stay", },
      ],
    },
    { "id": "hospital_stay",
      "text": "You die in the hospital. It is terrible.",
    }
  ]
}

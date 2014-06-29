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
      "text": "GET STARTED!",
      "choices": [
        {"text": "Work", "target": "work"},
        {"text": "Sleep", "target": "sleep"},
      ],
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
        {"text": "Sleep", "target": "sleep"},
      ],
    },
    { "type": "chain",
      "id": "work",
      "text": "You work your ass off. It's exhausting.",
      "after": [
        {"action": "modify_attribute", "id": "progress", "value": 5},
      ],
      "choices": [
        {"text": "Moving on...", "target": "open"},
      ]
    },
    { "type": "chain",
      "id": "sleep",
      "text": "You sleep your ass off. It's invigorating.",
      "after": [
        { "action": "tics", "value": 8 }
      ],
      "choices": [
        {"text": "Moving on...", "target": "open"},
      ]
    },
    // ENDINGS
    { "type": "open",
      "priority": 5,
      "tickets": function(character, history, time){
        if(character.get_attribute("progress") > 100 && time.total_hours === 72){
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
        if(time.total_hours > 72){
          return 1;
        }
        return 0;
      },
      "id": "missed_due_date",
      "text": "<p>I didn't finish in time! Oh god! I'm a failure! Note: You die die of shame. It is terrible.</p>",
      "auto": [
        {"target": "game_over"}
      ]
    },
    { "type": "chain",
      "id": "game_over",
      "text": "<p>GAME OVER!</p>",
    },
  ]
}

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
        {"action": "progress", "value": 5},
      ],
      "auto": [
        {"target": "open"},
      ]
    }
  ]
}

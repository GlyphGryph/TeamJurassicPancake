function load_dummy_scenes(){
  return [
    { "id": "eat_candy",
      "text": "<p>You eat some candy from the table.</p>",
      "effects": {
        "health": -10,
        "time_passes": 10,
      },
      "auto": [
        { "target": "candy_sick",
          "conditions": function(character){
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
      "text": "<p>There's several types of candy at this table! What do?",
      "choices": [
        { "text": "Eat a blue one!",
          "target": "eat_candy",
        },
        { "text": "Eat a red one!",
          "target": "eat_candy",
        },
      ],
      "before": {
        "time_passes": 1,
      },
    },
    { "id": "candy_sick",
      "text": "<p>Ugggh.... you don't feel so good all of a sudden...</p><p>The world spins, and you clutch the table before collapsing. As you lose consciousness, you hear an ambulance in the distance...</p>",
      "after": {
        "add_condition": "nausea",
        "add_condition": "unconscious",
      },
      "auto": [
        { "target": "ambulance_ride",},
      ],
    },
    { "id": "ambulance_ride",
      "before": {
        "time_passes": 400,
      },
      "after": {
        "remove_condition": "unconscious",
      },
      "auto": [
        { "target": "hospital_stay", },
      ],
    },
    { "id": "hospital_stay",
      "text": "You die in the hospital. It is terrible.",
    }
  ]
}

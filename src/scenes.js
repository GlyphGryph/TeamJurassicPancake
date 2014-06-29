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
      "id": "day_1_intro",
      "text": "<p>Okay, woke up today. Day one on my journey to fame. Not day one on my adventures into art, but the first day where I've set out to become more than a garden gnome. Also not the first day of my long term intermittent depression. Today's an okay day though, I feel like I can get out of bed, so let's go with that. Been saving up for this time, I have enough money to go without work for a while.</p> <p>Apartment's a bit messy, but that's how it's been for months. I'm not that big on clinical neatness, but you can find stuff, and there are no alien lifeforms spawning in here, so that's good enough for now.</p> <p>Do the morning routines, get some breakfast, all that usual jazz. Cornflakes again. Not the most exciting, but affordable enough.</p> <p>So, how do I even proceed with this?</p>",
      "choices": [{
        "text": "Check on internet for tips for budding artists",
        "target": "day_1_look_online"
      },
      {
        "text": "Get practicing",
        "target": "day_1_get_practice"
      }],
    },
    { "type": "chain",
      "id": "day_1_look_online",
      "text": "<p>Hm, let's check online, maybe someone has useful tips. Click click, read read. Hard work. Diligence. No shortcuts. Don't crave fame. So what they're telling me is that I just have to keep painting and avoid seeming desperate. Easy for them to say, they're already there. They say that getting criticism will help you improve quickly, but am I ready for that?</p>",
      "choices": [{
        "text": "Yes.",
        "target": "day_1_yes_crit"
      },
      {
        "text": "No.",
        "target": "day_1_no_crit"
      }],
    },
    { "type": "chain",
      "id": "day_1_get_practice",
      "text": "<p>Practicing seems like a good start. I know I've done it before, but one can't practice too much. I bet all the great ones also practiced a lot before going public. I don't have all the basics down yet, but I'm sure they'll come.</p>",
      "choices": [{
        "text": "[...]",
        "target": "open"
      }],
	  "after": [
		{"action": "ambition", "value": -5,},
		{"action": "progress", "value": 5,},
      ],
    },
    { "type": "chain",
      "id": "day_1_no_crit",
      "text": "<p>Nah, another day perhaps, after some more practicing. Speaking of which, better do some of that practicing. Paint paint. Looks vaguely like a potato, is actually supposed to be a vase. How does one even do that?</p> <p>Enough practicing for today.</p>",
      
      "choices": [{
        "text": "[...]",
        "target": "open"
      }],
	  "after": [
		{"action": "ambition", "value": 5,},
		{"action": "progress", "value": 10,},
		{"action": "willpower", "value": -5,},
		{"action": "comfort", "value": -5,},
		{"action": "anxiety", "value": 10,},
      ],
    },
    { "type": "chain",
      "id": "day_1_yes_crit",
      "text": "<p>Yeah, I guess. This is gonna be a rough ride, because I know I'm not very good, and the critics are probably going to tear me a new one. I hope this is the right choice.</p> <p>Painted a few things to the best of my ability, and asked online for criticism, straight out of the box. Let's see how this goes.</p>",
      
      "choices": [{
        "text": "[...]",
        "target": "open"
      }],
	  "after": [
		{"action": "ambition", "value": -5,},
		{"action": "self_esteem", "value": -5,},
		{"action": "progress", "value": 5,},
      ],
    },
	
	
	
	{ "type": "open",
      "priority": 1,
      "tickets": function(character, history, timestamp){
        return 360;
      },
      "id": "daily_routines",
      "text": "<p>Another day, another chance to move through this life.</p>",
      "choices": [
        { "text": "Practice intensely.",
          "target": "daily_practice_intense",
		  "condition": function(character, history, timestamp){
            if(character.willpower >= 50){
              return true;
            } else {
              return false;
            }
          }
        },
		{ "text": "Take care of yourself, and then your art.",
          "target": "daily_taking_care",
		  "condition": function(character, history, timestamp){
            if(character.willpower >= 10){
              return true;
            } else {
              return false;
            }
          }
        },
		{ "text": "Clean the apartment.",
          "target": "daily_cleaning",
        },
		{ "text": "Loaf around for the whole day, and browse the internets",
          "target": "daily_browsing",
        },
		{ "text": "Ugh.",
          "target": "open",
        },
		{ "text": "Ugh.",
          "target": "open",
        },
      ],
	  "after": [
		{"action": "money", "value": -15,},
		{"action": "ambition", "value": -5,},
        {"action": "comfort", "value": -5,},
		{"action": "hygiene", "value": -5,}
      ],
    },
	{ "type": "chain",
      "id": "daily_practice_intense",
      "text": "<p>You have so much creativity today, and you need to let it all out. All of a sudden you look up from your work and you haven't eaten all day. You don't feel like getting a shower. God damn you could use some sleep right now.</p>",
      "choices": [{
        "text": "[...]",
        "target": "open"
      }],
	  "after": [
		{"action": "progress", "value": 7,},
		{"action": "anxiety", "value": 10,},
		{"action": "ambition", "value": 20,},
        {"action": "comfort", "value": -5,},
		{"action": "willpower", "value": -10,}
      ],
    },
	{ "type": "chain",
      "id": "daily_taking_care",
      "text": "<p>Today I'm going to eat, shower, and get some painting done. That seems like an okay day.</p>",
      "choices": [{
        "text": "[...]",
        "target": "open"
      }],
	  "after": [
		{"action": "progress", "value": 2,},
		{"action": "ambition", "value": 5,},
		{"action": "anxiety", "value": 5,},
		{"action": "hygiene", "value": 15,},
		{"action": "willpower", "value": -5,}
      ],
    },
	{ "type": "chain",
      "id": "daily_cleaning",
      "text": "<p>Alright, you need to clean this pig's place of an apartment. Sometimes it just gets too much, you know?</p>",
      "choices": [{
        "text": "[...]",
        "target": "open"
      }],
	  "after": [
        {"action": "comfort", "value": 20,},
      ],
    },
	{ "type": "chain",
      "id": "daily_browsing",
      "text": "<p>Some days you just have to take for yourself, you know? You'll get back to painting, but you need a personal day. You need to recharge after all of that intense creativity. That you have totally been doing. Yes.</p>",
      "choices": [{
        "text": "[...]",
        "target": "open"
      }],
	  "after": [
		{"action": "ambition", "value": -5,},
		{"action": "health", "value": 10,},
		{"action": "willpower", "value": 15,},
		{"action": "anxiety", "value": -5,},
      ],
    },
	
	
	
	
	
	{ "type": "open",
      "priority": 50,
      "tickets": function(character, history, timestamp){
		if time.day() == 14 {return 10;}
      },
      "id": "store_event_a",
      "text": "<p>I'm out of toilet paper, so I have to get out of bed and buy some. Might as well get some food while I'm at it.</p> <p>At the store now, vaguely resembling a human being. Been wondering if maybe I should pick some other things up. Budget's a bit tight, but there's still things to choose from, I think.</p>",
      "choices": [
		{ "text": "Get cheap noodles",
          "target": "store_event_a_noodles",
		},
		{ "text": "Get mid-range meal",
          "target": "store_event_a_meal",
        },
		{ "text": "Just the toilet paper",
          "target": "store_event_a_nm",
        },
	  ],
	  "after": [
		{"action": "hygiene", "value": 10,},
		{"action": "comfort", "value": 10,},
      ],
    },
	{ "type": "chain",
      "id": "store_event_a_noodles",
      "text": "<p>I guess I can't really afford luxury right now. Noodles it is, then. Noodles and toilet paper. The sooner I can get out of here, the better.</p>",
      "choices": [{
        "text": "[...]",
        "target": "open",
		"condition": function(character, history, timestamp){
            if(character.willpower >= 20){
              return true;
            } else {
              return false;
            }
          }
      },
	  {
        "text": "Wait, is that a bus?",
        "target": "store_bus_a",
		"condition": function(character, history, timestamp){
            if(character.willpower < 20){
              return true;
            } else {
              return false;
            }
          }
      }
	  ],
    },
	{ "type": "chain",
      "id": "store_event_a_meal",
      "text": "<p>Today's a good day, so I think I'll get something slightly better than noodles. A quick chili, perhaps?</p> <p>On the way home now. People are driving like mad today. Better not hang too close to the road, in case more crazy bus drivers try to decapitate me.</p> <p>Back home, chili made and eaten. That burning sensation is both nice and terrible at the same time.</p>",
      "choices": [{
        "text": "[...]",
        "target": "open"
      }],
	  "after": [
		{"action": "health", "value": 5,},
        {"action": "money", "value": -15,},
      ],
    },
	{ "type": "chain",
      "id": "store_event_a_nm",
      "text": "<p>Not feeling like sticking around to pick up anything else.</p>",
      "choices": [{
        "text": "[...]",
        "target": "open"
      }],
    },
	{ "type": "chain",
      "id": "store_a_bus",
      "text": "<p>Standing at the bus stop. Slumping a bit together, not feeling all that good about myself. Bus comes in. Bus driver seems rather sleepy. Head's leaning a bit too far forwards, and gets smacked by the mirror.</p> <p>Ow. Woken up on the tarmac, concerned people looking at me. Yeah, I'm fine, hell of a headache though. Probably a concussion. Ugh. People insist that I go to a doctor. Guess I won't be doing more today.</p> <p>Doctor confirmed concussion, told me to stay in bed as much as possible the next few days. Not very easy when you live on your own.</p>",
      "choices": [{
        "text": "[...]",
        "target": "open"
      }],
	  "after": [
		{"action": "self_esteem", "value": -5,},
		{"action": "health", "value": -40,},
		{"action": "progress", "value": -2,},
		{"action": "hygiene", "value": -5,},
      ],
    },
	
	
	{ "type": "open",
      "priority": 2,
      "tickets": function(character, history, timestamp){
        if (timestamp.day() > 3 && character.progress > 10) // && history.excludes("milestone_a"))  // <- THERES A BUG IN EXCLUDES D: AND IT'S MAKING THIS HARD D:
        {
          return 1;
        };
      },
      "id": "milestone_a",
      "text": "<p>Been trying to address the criticism I've been getting, making some progress. One guy even openly offered to keep checking in and guide me along, which I think is awesome.</p>",
      "choices": [
	  {
        "text": "I should paint for myself!",
        "target": "milestone_a_selfpaint",
		"condition": function(character, history, timestamp){
            if(character.willpower >= 20 && character.self_esteem >= 20 ){
              return true;
            } else {
              return false;
            }
          }
      },
	  {
        "text": "I should practice alone.",
        "target": "milestone_a_forever_alone",
      },
	  ],
    },
	{ "type": "chain",
      "id": "milestone_a_selfpaint",
      "text": "<p>I feel pretty good today, maybe I should just try dicking around and see what comes out of it. One bird, with... Two birds on top. Because why not? They don't look a lot like birds, though. Oh well.</p>",
      "choices": [{
        "text": "[...]",
        "target": "open"
      }],
      "after": [
		{"action": "self_esteem", "value": 5,},
		{"action": "progress", "value": 10,},
		{"action": "willpower", "value": -10,},
		{"action": "anxiety", "value": 10,},
      ],
    },
	{ "type": "chain",
      "id": "milestone_a_forever_alone",
      "text": "<p>Hnng. I really should get some tips from others, progress is hard on my own. But, depression wins over socialities today. Maybe I can at least do some lazy strokes on the canvas. Maybe if I try to paint a box. Can't be assed to think outside the box today.</p> <p>Painted more than one box. Feel like I'm kind of getting the hang of that, at least.</p>",
      "choices": [{
        "text": "[...]",
        "target": "open"
      }],
      "after": [
		{"action": "self_esteem", "value": -2,},
		{"action": "progress", "value": 5,},
		{"action": "ambition", "value": -5,},
		{"action": "anxiety", "value": 5,},
      ],
    },
	
    
    
    
    
    { "type": "open",
      "priority": 2,
      "tickets": function(character, history, timestamp){
        if (timestamp.day() > 3 && character.progress > 20) // && history.excludes("milestone_b"))  // <- THERES A BUG IN EXCLUDES D: AND IT'S MAKING THIS HARD D:
        {
          return 1;
        };
      },
      "id": "milestone_b",
      "text": "<p>Number of caustic assholes lessening, probably getting bored of mocking the depressive fool. Not quite as many people responding to my efforts as before, but the one guy who offered to guide me is still around. Swell chap, knows his stuff. I don't feel worthy of his attention. Apartment getting a bit messy, but nothing serious.</p>",
      "choices": [
	  {
        "text": "I should practice alone.",
        "target": "milestone_b_practice",
      },
      {
        "text": "I should clean my apartment.",
        "target": "milestone_b_clean",
      },
      {
        "text": "I should put more stuff online.",
        "target": "milestone_b_online",
      },
	  ],
    },
    { "type": "chain",
      "id": "milestone_b_practice",
      "text": "<p>Been practicing quietly, seeing some slow improvement. Disappointingly slow.</p>",
      "choices": [{
        "text": "[...]",
        "target": "open"
      }],
      "after": [
		{"action": "self_esteem", "value": -2,},
		{"action": "progress", "value": 3,},
		{"action": "ambition", "value": -5,},
		{"action": "anxiety", "value": 5,},
      ],
    },
    { "type": "chain",
      "id": "milestone_b_clean",
      "text": "<p>Might as well clean the place now that I have the excess to do it, and while it's not a monumental task. Might even be able to squeeze in a sketch or two after this.</p>",
      "choices": [{
        "text": "[...]",
        "target": "open"
      }],
      "after": [
		{"action": "hygiene", "value": 10,},
		{"action": "progress", "value": 2,},
      ],
    },
    { "type": "chain",
      "id": "milestone_b_online",
      "text": "<p>Yes, I'll go online and show what I've made so far. Perhaps they'll offer some tips. Turning on computer, clicking the browser, finding suitable site.</p> <p>Scribblings are public now. No response yet. Perhaps it'll trickle in later. Meanwhile, better keep practicing the basic stuff.</p>",
      "choices": [{
        "text": "[...]",
        "target": "open"
      }],
      "after": [
		{"action": "self_esteem", "value": 5,},
		{"action": "progress", "value": 10,},
		{"action": "willpower", "value": -10,},
		{"action": "anxiety", "value": 10,},
      ],
    },
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    { "type": "open",
      "priority": 2,
      "tickets": function(character, history, timestamp){
        if (character.progress > 100) 
        {
          return 1;
        };
      },
      "id": "victory",
      "text": "<p>Last necessary entry. My art has been exhibited. People are talking about how unconventional and creative it is. I still get depressive from time to time, but in between that... I'm actually happy. I've made it. People are voluntarily donating a bit of money to me so I can keep painting. I respond by giving people free requests from time to time. My best pieces go into exhibits. I'm not the wealthiest man ever, but I'm actually making a living off of this.</p> <p>Oh, friend's calling me. Turned out he lives a few blocks away. Wants to go have a pint at the pub for celebration. Do I feel like it?</p> <p>Yeah. I do.</p>",
      
    },
    
    
    { "type": "open",
      "priority": 2,
      "tickets": function(character, history, timestamp){
        if (character.money < 0) 
        {
          return 1;
        };
      },
      "id": "the_dream_is_dead",
      "text": "<p>Yeah. Pipe dream. This ain't going nowhere. At least I know how to clean things. Maybe I can get a job as a janitor, or something.</p>",
    },
    
    
    
    
    ////////////
    
    
    { "type": "open",
      "priority": 3,
      "tickets": function(character, history, timestamp){
        //if(character.ambition > 0 && history.excludes("day_14_store_time") && timestamp.day() == 14 && timestamp.hour() == 10){
        //  return 1;
        //}
        return 0;
      },
      "id": "day_14_store_time",
      "text": "<p>Day 14. Have practiced every day so far. Probably not today, depressive episode has set in. I'm out of toilet paper though, so I have to get out of bed and buy some. Might as well get some food while I'm at it.</p> <p>At the store now, vaguely resembling a human being. Budget's a bit tight, but there's still things to choose from.</p>",
      "choices": [{
        "text": "Get cheap noodles",
        "target": "day_14_cheap_noodles"
      }],
    },
    { "type": "chain", // this seems more like a random event?
      "id": "day_14_cheap_noodles",
      "text": "<p>I guess I can't really afford luxury right now. Noodles it is, then. Noodles and toilet paper. The sooner I can get out of here, the better.</p> <p>Standing at the bus stop. Slumping a bit together, not feeling all that good about myself. Bus comes in. Bus driver seems rather sleepy. Head's leaning a bit too far forwards, and gets smacked by the mirror.</p> <p>Ow. Woken up on the tarmac, concerned people looking at me. Yeah, I'm fine, hell of a headache though. Probably a concussion. Ugh. People insist that I go to a doctor. Guess I won't be doing more today.</p> <p>Doctor confirmed concussion, told me to stay in bed as much as possible the next few days. Not very easy when you live on your own.</p>",
      "choices": [{
        "text": "[...]",
        "target": "day_31_bus_headbutt"
      }],
    },
    { "type": "chain",
      "id": "day_31_bus_headbutt",
      "text": "<p>Day 31. Concussion gone since a couple of weeks ago, but been having motivational problems because of depression. Today's one of the brighter days again. Apartment's getting messy because of me not having the excess to clean it, but that's going to take time. At the same time though, I haven't practiced since I headbutted that bus.</p>",
      "choices": [{
        "text": "Try to paint a proper piece",
        "target": "day_31_painting_proper"
      }],
    },
    { "type": "chain",
      "id": "day_31_painting_proper",
      "text": "<p>Apartment ain't going nowhere yet, better focus on my craft. Station's getting a bit icky, though. Air's not very good in here either. Painty painty.</p>",
      "choices": [{
        "text": "[...]",
        "target": "day_34_flu"
      }],
    },
    { "type": "chain",
      "id": "day_34_flu",
      "text": "<p>Caught a flu, not in any condition to do anything beyond the necessities. Last attempt at painting something good was a flop.</p>",
      "choices": [{
        "text": "[...]",
        "target": "day_41_denial_of_actual_depressive_episode"
      }],
      "after": [
        {"action": "add_condition", "value": "flu",}
      ],
    },
    { "type": "chain",
      "id": "day_41_denial_of_actual_depressive_episode",
      "text": "<p>Flu gone, depression on hold. Nobody really knows about my quest, though.</p>",
      "choices": [{
        "text": "Keep practicing in private",
        "target": "day_41_denial_of_any_personal_skill"
      }],
      "after": [
        // {"action": "remove_condition", "value": "flu",}
      ],
    },
    { "type": "chain",
      "id": "day_41_denial_of_any_personal_skill",
      "text": "<p>I guess they don't need to yet. I still need to get better. People are probably going to point and laugh if they saw my work right now.</p>",
      "choices": [{
        "text": "[...]",
        "target": "day_60_wretched_apartment"
      }],
    },
    { "type": "chain",
      "id": "day_60_wretched_apartment",
      "text": "<p>Day 60. Been practicing quietly, seeing some slow improvement. Disappointingly slow. Apartment is getting increasingly revolting to hang around in. I think I detect a faint scent of mold. Really should clean this place.</p>",
      "choices": [{
        "text": "Clean apartment quickly",
        "target": "day_60_quick_clean"
      }],
    },
    { "type": "chain",
      "id": "day_60_quick_clean",
      "text": "<p>Maybe just a quick cleanup to prevent it from getting worse than this. Rather droll, but at least I know how to do it, unlike painting. Better practice that some more.</p>",
      "choices": [{
        "text": "[...]",
        "target": "day_81_fear_and_loathing_of_that_growing_toxic_mold_in_the_corner_that_i_dont_really_want_to_look_at_and_also_denial_of_continued_depressive_episode_..._huh_my_life_really_sucks_right_now"
      }],
      "after": [
        {"action": "comfort", "value": -5},
      ],
    },
    { "type": "chain",
      "id": "day_81_fear_and_loathing_of_that_growing_toxic_mold_in_the_corner_that_i_dont_really_want_to_look_at_and_also_denial_of_continued_depressive_episode_..._huh_my_life_really_sucks_right_now",
      "text": "<p>Day 81. Had a depressive episode last week. Fortunately gone today, I think. I still don't feel much good at anything, painting progress seems to have stalled. At least it's not toxic in here, yet. Mold scent has gotten worse.</p>",
      "choices": [{
        "text": "Try to get criticism online",
        "target": "day_81_taking_critism_the_wrong_way_because_you_didnt_experience_it_early"
      }],
    },
    { "type": "chain",
      "id": "day_81_taking_critism_the_wrong_way_because_you_didnt_experience_it_early",
      "text": "<p>I guess I won't ever progress beyond this if I don't ask others. The mold can wait, I gotta help my dreams.</p> <p>People say I got potential, but have lots of fundamental flaws. Yeah, of course. Potential. Isn't that what they always say to cheer up the newbies? Please don't just tell me to practice more, I've been doing that for months. It's not helping. This guy's giving me some tips and telling me to take references. Do some sketches, work on the basics. Yeah. Sure.</p>",
      "choices": [{
        "text": "[...]",
        "target": "day_97_using_online_advice_is_hard_when_youve_got_black_mold"
      }],
    },
    { "type": "chain",
      "id": "day_97_using_online_advice_is_hard_when_youve_got_black_mold",
      "text": "<p>Day 97. Been trying to do what the online person said, but have had a hard time getting motivated. I'm not sure I'm cut out for this arting business. Could just be the depression speaking. I think I'm allergic to mold, nose is running, eyes watering and I cough up mucus. I should probably do something about that.</p>",
      "choices": [{
        "text": "Go buy cleaning supplies and fungicides",
        "target": "day_97_cleaning_mold_while_very_depressed"
      },
      { "type": "chain",
     
        "text": "Ignore the mold, ignore the advice, do your own thing",
        "target": "day_104_hospital_visit"
      },
      ],
    },
    { "type": "chain",
      "id": "day_97_cleaning_mold_while_very_depressed",
      "text": "<p>Doing it myself is cheaper than hiring someone. Better get some stuff to remove that mold, it hasn't been in here before.</p> <p>Cleaning supplies acquired, this time without getting struck by rogue bus. Better clean the whole place thoroughly, don't want this allergy acting up again. Apply fungicide, wait for it to kill the little bastards, wipe off. Ugly black blotches on the wall, but at least they're dead. They still look better than my paintings.</p>",
      "choices": [{
        "text": "[...]",
        "target": "day_113_dying_dreams"
      }],
      "after": [
        {"action": "comfort", "value": 15},
      ],
    },
    { "type": "chain",
      "id": "day_104_hospital_visit",
      "text": "<p>When I stopped answering my phone, the super busted into my apartment, and found me slumped over my easels. I woke up in the hospital, and they tell me my lungs are full of black goo. It doesn't look good.</p>",
    },
    { "type": "chain",
      "id": "day_113_dying_dreams",
      "text": "<p>Day 113. Haven't bothered practicing. Depression acting up again, but at least the apartment is reasonably clean. Budget's getting really tight. At this rate, I'll need to get some slave work very soon. It's clear that painting isn't going to net me any income within the foreseeable future.</p>",
      "choices": [{
        "text": "Pick up brush in hopes of getting a flash of inspiration for a magnum opus",
        "target": "day_113_hope_for_inspiration_that_is_not_forthcoming"
      }],
    },
    { "type": "chain",
      "id": "day_113_hope_for_inspiration_that_is_not_forthcoming",
      "text": "<p>Maybe if I pick up the brush like I had an idea of what I'm doing. Wave it around like I was Michaelangelo, brimming with inspiration.</p> <p>Nope, nothing.</p>",
      "choices": [{
        "text": "[...]",
        "target": "day_140_reckoning_day:_the_dream_is_doomed"
      }],
    },
    { "type": "chain",
      "id": "day_140_reckoning_day:_the_dream_is_doomed",
      "text": "<p>Day 140. Budget at its limit. I need to make a decision today. Either I cling on to this pipe dream of artistic success and get evicted, or I face reality get a full time job.</p>",
      "choices": [{
        "text": "Get a job",
        "target": "day_140_the_dream_is_dead"
      }],
    },
    { "type": "chain",
      "id": "day_140_the_dream_is_dead",
      "text": "<p>Yeah. Pipe dream. This ain't going nowhere. At least I know how to clean things. Maybe I can get a job as a janitor, or something.</p>",
    },
    { "type": "chain",
      "id": "",
      "text": "",
      "choices": [{
        "text": "",
        "target": ""
      }],
    },
  ]
}

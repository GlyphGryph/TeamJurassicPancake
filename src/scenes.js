function load_scenes(){
  return [
    /*
    { "id": "",
      "text": "",
      "choices": [{
        "text": "",
        "target": ""
      }],
    },
    */
    {
      "id": "day_1_intro",
      "text": "<p>Okay, woke up today. Day one on my journey to fame. Not day one on my adventures into art, but the first day where I've set out to become more than a garden gnome. Also not the first day of my long term intermittent depression. Today's an okay day though, I feel like I can get out of bed, so let's go with that. Been saving up for this time, I have enough money to go without work for a while.</p> <p>Apartment's a bit messy, but that's how it's been for months. I'm not that big on clinical neatness, but you can find stuff, and there are no alien lifeforms spawning in here, so that's good enough for now.</p> <p>Do the morning routines, get some breakfast, all that usual jazz. Cornflakes again. Not the most exciting, but affordable enough.</p> <p>So, how do I even proceed with this?</p>",
      "choices": [{
        "text": "Check on internet for tips for budding artists",
        "target": "day_1_look_online"
      }],
    },
    { "id": "day_1_look_online",
      "text": "<p>Hm, let's check online, maybe someone has useful tips. Click click, read read. Hard work. Diligence. No shortcuts. Don't crave fame. So what they're telling me is that I just have to keep painting and avoid seeming desperate. Easy for them to say, they're already there. They say that getting criticism will help you improve quickly, but am I ready for that?</p>",
      "choices": [{
        "text": "No.",
        "target": "day_1_no_crit"
      }],
    },
    { "id": "day_1_no_crit",
      "text": "<p>Nah, another day perhaps, after some more practicing. Speaking of which, better do some of that practicing. Paint paint. Looks vaguely like a potato, is actually supposed to be a vase. How does one even do that?</p> <p>Enough practicing for today.</p>",
      "choices": [{
        "text": "[...]",
        "target": "day_14_store_time"
      }],
    },
    { "id": "day_14_store_time",
      "text": "<p>Day 14. Have practiced every day so far. Probably not today, depressive episode has set in. I'm out of toilet paper though, so I have to get out of bed and buy some. Might as well get some food while I'm at it.</p> <p>At the store now, vaguely resembling a human being. Budget's a bit tight, but there's still things to choose from.</p>",
      "choices": [{
        "text": "Get cheap noodles",
        "target": "day_14_cheap_noodles"
      }],
    },
    { "id": "day_14_cheap_noodles",
      "text": "<p>I guess I can't really afford luxury right now. Noodles it is, then. Noodles and toilet paper. The sooner I can get out of here, the better.</p> <p>Standing at the bus stop. Slumping a bit together, not feeling all that good about myself. Bus comes in. Bus driver seems rather sleepy. Head's leaning a bit too far forwards, and gets smacked by the mirror.</p> <p>Ow. Woken up on the tarmac, concerned people looking at me. Yeah, I'm fine, hell of a headache though. Probably a concussion. Ugh. People insist that I go to a doctor. Guess I won't be doing more today.</p> <p>Doctor confirmed concussion, told me to stay in bed as much as possible the next few days. Not very easy when you live on your own.</p>",
      "choices": [{
        "text": "[...]",
        "target": "day_31_bus_headbutt"
      }],
    },
    { "id": "day_31_bus_headbutt",
      "text": "<p>Day 31. Concussion gone since a couple of weeks ago, but been having motivational problems because of depression. Today's one of the brighter days again. Apartment's getting messy because of me not having the excess to clean it, but that's going to take time. At the same time though, I haven't practiced since I headbutted that bus.</p>",
      "choices": [{
        "text": "Try to paint a proper piece",
        "target": "day_31_painting_proper"
      }],
    },
    { "id": "day_31_painting_proper",
      "text": "<p>Apartment ain't going nowhere yet, better focus on my craft. Station's getting a bit icky, though. Air's not very good in here either. Painty painty.</p>",
      "choices": [{
        "text": "[...]",
        "target": "day_34_flu"
      }],
    },
    { "id": "day_34_flu",
      "text": "<p>Caught a flu, not in any condition to do anything beyond the necessities. Last attempt at painting something good was a flop.</p>",
      "choices": [{
        "text": "[...]",
        "target": "day_41_denial_of_actual_depressive_episode"
      }],
    },
    { "id": "day_41_denial_of_actual_depressive_episode",
      "text": "<p>Flu gone, depression on hold. Nobody really knows about my quest, though.</p>",
      "choices": [{
        "text": "Keep practicing in private",
        "target": "day_41_denial_of_any_personal_skill"
      }],
    },
    { "id": "day_41_denial_of_any_personal_skill",
      "text": "<p>I guess they don't need to yet. I still need to get better. People are probably going to point and laugh if they saw my work right now.</p>",
      "choices": [{
        "text": "[...]",
        "target": "day_60_wretched_apartment"
      }],
    },
    { "id": "day_60_wretched_apartment",
      "text": "<p>Day 60. Been practicing quietly, seeing some slow improvement. Disappointingly slow. Apartment is getting increasingly revolting to hang around in. I think I detect a faint scent of mold. Really should clean this place.</p>",
      "choices": [{
        "text": "Clean apartment quickly",
        "target": "day_60_quick_clean"
      }],
    },
    { "id": "day_60_quick_clean",
      "text": "<p>Maybe just a quick cleanup to prevent it from getting worse than this. Rather droll, but at least I know how to do it, unlike painting. Better practice that some more.</p>",
      "choices": [{
        "text": "[...]",
        "target": "day_81_fear_and_loathing_of_that_growing_toxic_mold_in_the_corner_that_i_dont_really_want_to_look_at_and_also_denial_of_continued_depressive_episode_..._huh_my_life_really_sucks_right_now"
      }],
    },
    { "id": "day_81_fear_and_loathing_of_that_growing_toxic_mold_in_the_corner_that_i_dont_really_want_to_look_at_and_also_denial_of_continued_depressive_episode_..._huh_my_life_really_sucks_right_now",
      "text": "<p>Day 81. Had a depressive episode last week. Fortunately gone today, I think. I still don't feel much good at anything, painting progress seems to have stalled. At least it's not toxic in here, yet. Mold scent has gotten worse.</p>",
      "choices": [{
        "text": "Try to get criticism online",
        "target": "day_81_taking_critism_the_wrong_way_because_you_didnt_experience_it_early"
      }],
    },
    { "id": "day_81_taking_critism_the_wrong_way_because_you_didnt_experience_it_early",
      "text": "<p>I guess I won't ever progress beyond this if I don't ask others. The mold can wait, I gotta help my dreams.</p> <p>People say I got potential, but have lots of fundamental flaws. Yeah, of course. Potential. Isn't that what they always say to cheer up the newbies? Please don't just tell me to practice more, I've been doing that for months. It's not helping. This guy's giving me some tips and telling me to take references. Do some sketches, work on the basics. Yeah. Sure.</p>",
      "choices": [{
        "text": "[...]",
        "target": "day_97_using_online_advice_is_hard_when_youve_got_black_mold"
      }],
    },
    { "id": "day_97_using_online_advice_is_hard_when_youve_got_black_mold",
      "text": "<p>Day 97. Been trying to do what the online person said, but have had a hard time getting motivated. I'm not sure I'm cut out for this arting business. Could just be the depression speaking. I think I'm allergic to mold, nose is running, eyes watering and I cough up mucus. I should probably do something about that.</p>",
      "choices": [{
        "text": "Go buy cleaning supplies and fungicides",
        "target": "day_97_cleaning_mold_while_very_depressed"
      },
      {
        "text": "Ignore the mold, ignore the advice, do your own thing",
        "target": "day_104_hospital_visit"
      },
      ],
    },
    { "id": "day_97_cleaning_mold_while_very_depressed",
      "text": "<p>Doing it myself is cheaper than hiring someone. Better get some stuff to remove that mold, it hasn't been in here before.</p> <p>Cleaning supplies acquired, this time without getting struck by rogue bus. Better clean the whole place thoroughly, don't want this allergy acting up again. Apply fungicide, wait for it to kill the little bastards, wipe off. Ugly black blotches on the wall, but at least they're dead. They still look better than my paintings.</p>",
      "choices": [{
        "text": "[...]",
        "target": "day_113_dying_dreams"
      }],
    },
    { "id": "day_104_hospital_visit",
      "text": "<p>When I stopped answering my phone, the super busted into my apartment, and found me slumped over my easels. I woke up in the hospital, and they tell me my lungs are full of black goo. It doesn't look good.</p>",
    },
    { "id": "day_113_dying_dreams",
      "text": "<p>Day 113. Haven't bothered practicing. Depression acting up again, but at least the apartment is reasonably clean. Budget's getting really tight. At this rate, I'll need to get some slave work very soon. It's clear that painting isn't going to net me any income within the foreseeable future.</p>",
      "choices": [{
        "text": "Pick up brush in hopes of getting a flash of inspiration for a magnum opus",
        "target": "day_113_hope_for_inspiration_that_is_not_forthcoming"
      }],
    },
    { "id": "day_113_hope_for_inspiration_that_is_not_forthcoming",
      "text": "<p>Maybe if I pick up the brush like I had an idea of what I'm doing. Wave it around like I was Michaelangelo, brimming with inspiration.</p> <p>Nope, nothing.</p>",
      "choices": [{
        "text": "[...]",
        "target": "day_140_reckoning_day:_the_dream_is_doomed"
      }],
    },
    { "id": "day_140_reckoning_day:_the_dream_is_doomed",
      "text": "<p>Day 140. Budget at its limit. I need to make a decision today. Either I cling on to this pipe dream of artistic success and get evicted, or I face reality get a full time job.</p>",
      "choices": [{
        "text": "Get a job",
        "target": "day_140_the_dream_is_dead"
      }],
    },
    { "id": "day_140_the_dream_is_dead",
      "text": "<p>Yeah. Pipe dream. This ain't going nowhere. At least I know how to clean things. Maybe I can get a job as a janitor, or something.</p>",
    },
    { "id": "",
      "text": "",
      "choices": [{
        "text": "",
        "target": ""
      }],
    },
  ]
}

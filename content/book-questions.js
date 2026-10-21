// Content data. Plain script (not a module) so the site opens straight from the file system.
window.ENNEAGRAM = window.ENNEAGRAM || {};
window.ENNEAGRAM.QUESTIONS = {
  "source": "Don Richard Riso & Russ Hudson, The Wisdom of the Enneagram (Bantam, 1999). Transcribed from an OCR text copy; check against the printed pages before publishing.",
  "types": {
    "1": {
      "name": "The Reformer",
      "keywords": "Rational, principled, self-controlled"
    },
    "2": {
      "name": "The Helper",
      "keywords": "Caring, generous, possessive"
    },
    "3": {
      "name": "The Achiever",
      "keywords": "Adaptable, ambitious, image-conscious"
    },
    "4": {
      "name": "The Individualist",
      "keywords": "Intuitive, aesthetic, self-absorbed"
    },
    "5": {
      "name": "The Investigator",
      "keywords": "Perceptive, innovative, detached"
    },
    "6": {
      "name": "The Loyalist",
      "keywords": "Engaging, responsible, defensive"
    },
    "7": {
      "name": "The Enthusiast",
      "keywords": "Upbeat, accomplished, impulsive"
    },
    "8": {
      "name": "The Challenger",
      "keywords": "Self-confident, decisive, domineering"
    },
    "9": {
      "name": "The Peacemaker",
      "keywords": "Receptive, reassuring, complacent"
    }
  },
  "quest": {
    "name": "Riso-Hudson QUEST (Quick Enneagram Sorting Test)",
    "accuracy": "about 70 percent (book’s claim); narrows to top two or three types",
    "instructions": "Pick the one paragraph in each group that best reflects your general attitudes and behaviors, as you have been most of your life. Agree with the overall tone, not every word. Go with your gut. If you truly can’t decide, you may pick two in one group only.",
    "groups": [
      {
        "id": "I",
        "options": [
          {
            "key": "A",
            "text": "I have tended to be fairly independent and assertive: I’ve felt that life works best when you meet it head-on. I set my own goals, get involved, and want to make things happen. I don’t like sitting around—I want to achieve something big and have an impact. I don’t necessarily seek confrontations, but I don’t let people push me around, either. Most of the time I know what I want, and I go for it. I tend to work hard and to play hard."
          },
          {
            "key": "B",
            "text": "I have tended to be quiet and am used to being on my own. I usually don’t draw much attention to myself socially, and it’s generally unusual for me to assert myself all that forcefully. I don’t feel comfortable taking the lead or being as competitive as others. Many would probably say that I’m something of a dreamer—a lot of my excitement goes on in my imagination. I can be quite content without feeling I have to be active all the time."
          },
          {
            "key": "C",
            "text": "I have tended to be extremely responsible and dedicated. I feel terrible if I don’t keep my commitments and do what’s expected of me. I want people to know that I’m there for them and that I’ll do what I believe is best for them. I’ve often made great personal sacrifices for the sake of others, whether they know it or not. I often don’t take adequate care of myself—I do the work that needs to be done and relax (and do what I really want) if there’s time left."
          }
        ]
      },
      {
        "id": "II",
        "options": [
          {
            "key": "X",
            "text": "I am a person who usually maintains a positive outlook and feels that things will work out for the best. I can usually find something to be enthusiastic about and different ways to occupy myself. I like being around people and helping others to be happy—I enjoy sharing my own well-being with them. (I don’t always feel great, but I try not to show it to anyone!) However, staying positive has sometimes meant that I’ve put off dealing with my own problems for too long."
          },
          {
            "key": "Y",
            "text": "I am a person who has strong feelings about things—most people can tell when I’m unhappy about something. I can be guarded with people, but I’m more sensitive than I let on. I want to know where I stand with others and who and what I can count on—it’s pretty clear to most people where they stand with me. When I’m upset about something, I want others to respond and to get as worked up as I am. I know the rules, but I don’t want people telling me what to do. I want to decide for myself."
          },
          {
            "key": "Z",
            "text": "I tend to be self-controlled and logical—I am uncomfortable dealing with feelings. I am efficient—even perfectionistic—and prefer working on my own. When there are problems or personal conflicts, I try not to bring my feelings into the situation. Some say I’m too cool and detached, but I don’t want my emotional reactions to distract me from what’s really important to me. I usually don’t show my reactions when others “get to me.”"
          }
        ]
      }
    ],
    "key": {
      "AX": 7,
      "AY": 8,
      "AZ": 3,
      "BX": 9,
      "BY": 4,
      "BZ": 5,
      "CX": 2,
      "CY": 6,
      "CZ": 1
    }
  },
  "tas": {
    "name": "Riso-Hudson TAS (Type Attitude Sorter)",
    "scale": {
      "1": "Not at All True",
      "2": "Seldom True",
      "3": "Somewhat True",
      "4": "Generally True",
      "5": "Very True"
    },
    "scoring": "Add the 15 scores for a type (range 15-75).",
    "bands": [
      {
        "min": 15,
        "max": 15,
        "meaning": "Probably not this type (for 1, 2, 6: probably not a compliant type)"
      },
      {
        "min": 16,
        "max": 30,
        "meaning": "Probably not this type"
      },
      {
        "min": 31,
        "max": 45,
        "meaning": "Probably has issues of this type, or a parent of this type"
      },
      {
        "min": 46,
        "max": 60,
        "meaning": "Most likely has a component of this type"
      },
      {
        "min": 61,
        "max": 75,
        "meaning": "Most likely this type (but could still be another)"
      }
    ],
    "statements": {
      "1": [
        "Most people see me as a serious, no-nonsense person—and when all is said and done, I suppose I am.",
        "I have always tried to be honest and objective about myself—and I’m determined to follow my conscience no matter what the cost.",
        "While there is some part of me that can be wild, generally speaking that just hasn’t been my style.",
        "It seems that I am living with a judge inside my head: sometimes the judge is wise and discerning, but often it is simply stern and harsh.",
        "I feel that I have paid a great price for trying to be perfect.",
        "I like to laugh as much as anyone—I should do it more often!",
        "My principles and ideals inspire me toward greater achievement and make my life feel meaningful and worthwhile.",
        "I do not understand why so many people have such lax standards.",
        "So much depends on me getting things done that I have to be more organized and methodical than others.",
        "I have a personal sense of mission, maybe even a calling to something higher, and I believe that there is something extraordinary that I may accomplish during my life.",
        "I hate mistakes, and so I tend to be extremely thorough to make sure that things are being done properly.",
        "Much of my life I have believed that right is right and wrong is wrong—and that’s all there is to it.",
        "I have a hard time leaving well enough alone.",
        "Many responsibilities have fallen on my shoulders: if I hadn’t risen to the occasion, God only knows what would have happened.",
        "I am deeply moved by human nobility and grace under pressure."
      ],
      "2": [
        "My genuine concern for others makes me become deeply involved with them—with their hopes, dreams, and needs.",
        "It feels natural to be friendly: I strike up conversations easily and am on a first-name basis with everyone.",
        "I have found that people respond warmly to me when I give them some attention and encouragement.",
        "I cannot see a stray dog in the street without wanting to bring it home.",
        "I feel good about the fact that I am a thoughtful, generous person.",
        "It’s hard for me to take credit for the many things I’ve done for people, but it bothers me a lot when they don’t seem to notice or care.",
        "It is true that I often do more for others than I should—I give away too much and do not think of myself enough.",
        "I often find myself trying to win people over—especially if they initially seem indifferent to me.",
        "I take special joy in entertaining and hosting my friends and “extended family.”",
        "I can be warm and supportive, but there is more steel in me than others might think.",
        "I am able to express my feelings for people more openly than most.",
        "I make special efforts to know what’s going on with the people I care about.",
        "I see myself as something of a “healer of broken hearts.”",
        "My health and finances have frequently suffered because I have put other people’s needs and interests before my own.",
        "I love to knock myself out to make people feel welcomed and appreciated."
      ],
      "3": [
        "I see myself as a highly competent person: it really bothers me when I am anything less than effective and efficient.",
        "When things are going well for me, I virtually “glow” with a kind of inner joy in being who I am and having the life that I have.",
        "I try to present myself to others in the best possible light—but doesn’t everyone?",
        "My feelings have tended to be foreign to me—I feel things strongly for a little while, and then just get on with things.",
        "It’s important to me to feel successful, even if I’m not yet the success I want to be.",
        "For better or worse, I am good at covering up my insecurities—people would never guess what I’m really feeling!",
        "I want to make a good impression on people, so I’m usually polite, well-mannered, and friendly.",
        "I am aware of how well my friends and colleagues are doing, and I tend to compare myself with them.",
        "I often strive to be the best at what I’m doing—if I can’t be outstanding at something, I generally don’t bother with it.",
        "Sometimes I’ve had to cut corners a little to achieve my goals.",
        "When I am insecure, I can be rather aloof and cool with people.",
        "It really bothers me when others don’t acknowledge the excellence of what I’ve done.",
        "I’m more adaptable than most; if things aren’t working well, I know how to change my behavior to obtain the results I want.",
        "I always have a goal in focus and know how to motivate myself to achieve it.",
        "I have a workaholic streak—I feel adrift if I’m not accomplishing things."
      ],
      "4": [
        "Many people see me as enigmatic, difficult, and contradictory—and I like that about myself!",
        "I tend to brood over my negative feelings for a long time before getting free of them.",
        "I often feel alone and lonely, even when I’m around people I’m close to.",
        "If I’m criticized or misunderstood, I tend to withdraw and sulk.",
        "I find it difficult to get involved with projects if I don’t have creative control.",
        "I tend not to follow rules or to go along with expectations because I want to put my own special touch on whatever I do.",
        "By most standards, I’m fairly dramatic and temperamental.",
        "I tend to spend quite a bit of time imagining scenes and conversations that haven’t necessarily happened.",
        "I long for someone to rescue me and sweep me away from all of this dreary mess.",
        "When things get tough, I tend to crumble and give up—perhaps I give up too easily.",
        "I can forgive almost anything except bad taste.",
        "Generally, I don’t enjoy working too closely with others.",
        "Finding myself and being true to my emotional needs have been extremely important motivations for me.",
        "I don’t like either to take the lead or to be a follower.",
        "I am acutely aware of my intuitions, whether or not I have the courage to act on them."
      ],
      "5": [
        "I like to get into things in depth and pore over details until I’ve figured something out as completely as possible.",
        "I am an extremely private person who doesn’t let many people into my world.",
        "I do not feel very big or powerful—more small and invisible: I’d make a good spy!",
        "Other people would think I’m crazy if they knew what I was thinking most of the time.",
        "Only by getting accurate information can you make a rational decision—but then, most people aren’t really rational.",
        "My family thinks that I am somewhat strange or eccentric—they’ve certainly told me that I need to get out more.",
        "I can talk a blue streak when I want to; most of the time, though, I prefer to just watch all the craziness around me.",
        "If you need a problem solved, let me work on it by myself, and I’ll come up with the answer.",
        "When you really think about it, you can’t get much stranger than so-called normal behavior.",
        "I tend to take a long time fine-tuning projects I’m working on.",
        "Most people are so incredibly ignorant, it’s amazing that anything works at all!",
        "I know a lot about a lot of things, and in a few areas, I consider myself an expert.",
        "I am extremely curious and enjoy investigating why things are the way they are—even obvious things are not really so obvious when you really look at them.",
        "My mind is so intense and active that I often feel like it’s on fire.",
        "Often I lose all track of time because I’m concentrating so completely on what I’m doing."
      ],
      "6": [
        "I am attracted to authority but distrustful of it at the same time.",
        "I am very emotional, although I don’t often show what I feel—except to those I’m close with—and even then, not always.",
        "If I make a mistake, I fear that everyone is going to jump down my throat.",
        "I feel more secure doing what’s expected of me than striking out on my own.",
        "I may not always agree with the rules—and I don’t always follow them—but I want to know what they are!",
        "I tend to have strong first impressions about people that are difficult to change.",
        "There are a few people I really look up to—they are sort of my heroes.",
        "I don’t like making big decisions, but I certainly don’t want anyone else to make them for me!",
        "Some people see me as jittery and nervous—but they don’t know the half of it!",
        "I know how much I mess up, so being suspicious of what others are up to just makes sense to me.",
        "I want to trust people, but often find myself questioning their motives.",
        "I am a real hard worker: I keep plodding along until the job gets done.",
        "I sound out the opinions of people I trust before I have to make a big decision.",
        "It’s really weird: I can be skeptical, even cynical, about all kinds of things, and then turn around and fall for something hook, line, and sinker.",
        "Anxiety seems to be my middle name."
      ],
      "7": [
        "I love traveling and discovering different kinds of foods, people, and experiences—the whole fabulous whirlwind of life!",
        "My calendar is usually full, and I like to keep it that way: no grass is going to grow under my feet!",
        "What’s important to me is excitement and variety rather than comfort and playing it safe—although I’ll take my comforts wherever I can find them.",
        "My mind is always chattering—sometimes it seems like I’m thinking about ten things at once!",
        "One thing I absolutely cannot stand is being bored—and I make sure that I am never boring myself.",
        "I’m pretty committed when I’m in a relationship, but when it’s over, I move on.",
        "I am curious and adventurous and am usually the first one of my friends to try whatever is new and interesting.",
        "When I no longer enjoy doing something, I stop doing it.",
        "I’m not just a “fun person”—there is a serious, even dark side to me, although I do not like to go there very much.",
        "I’m good at the big picture, not so much the little details: it’s more enjoyable for me to brainstorm a lot of new ideas than to get involved with implementing them.",
        "When I really want something, I usually find a way to get it.",
        "Things get me down once in a while, but I quickly pop back up again.",
        "One of my main problems is that I am easily distracted and can get too scattered.",
        "I tend to spend more money than I probably should.",
        "Other people are great to have along—as long as they want to go where I’m going."
      ],
      "8": [
        "I am extremely independent and don’t like having to rely on others for what I really need.",
        "I feel that “you have to break some eggs to make an omelet.”",
        "When I care about people, I often begin to think of them as “my people” and feel like I need to watch out for their interests.",
        "I know how to get results: I know how to reward people and how to put pressure on them to get things done.",
        "I do not have much sympathy for those who are weak and vacillating—weakness just invites trouble.",
        "I am strong-willed and do not give up or back down easily.",
        "I am never prouder than when I see someone I’ve taken under my wing make it on their own.",
        "I have a tender, even somewhat sentimental side that I show to very few people.",
        "People who know me appreciate the fact that I talk straight to them and tell them exactly what’s on my mind.",
        "I’ve had to work hard for everything I have—I think struggle is good because it toughens you up and makes you clear about what you want.",
        "I see myself as a challenger, as someone who pushes people beyond their comfort zone to achieve their best.",
        "My sense of humor is earthy, sometimes even crude, although I think most people are too prissy and thin-skinned.",
        "I can get into a towering rage, but it blows over.",
        "I feel most alive when I do what others think is impossible: I like to go to the edge and see if I can beat the odds.",
        "Somebody usually has to come up on the short end of the stick, and I don’t want it to be me."
      ],
      "9": [
        "What people seem to like about me is that they feel safe around me.",
        "I don’t mind being around people, and I don’t mind being alone—either way is fine, as long as I’m at peace with myself.",
        "I’ve found a certain balance in my life, and I see no reason to mess with it.",
        "Being “comfortable” in every sense of the word appeals to me a lot.",
        "I would rather give someone else their way than create a scene.",
        "I don’t know exactly how I do it, but I don’t let things get to me.",
        "I’m pretty easy to please and usually feel that what I have is good enough for me.",
        "I’ve been told that I seem distracted and absentminded—the fact is I understand things, but I just don’t want to react to them.",
        "I don’t think I’m particularly stubborn, but people say that I can be hard-headed once I make up my mind.",
        "Most people get themselves worked up too easily: I’m much more even-keeled.",
        "You’ve got to take what life brings, since there’s not much you can do about it anyway!",
        "I can easily see different points of view, and I tend to agree with people more than I disagree with them.",
        "I believe in emphasizing the positive rather than dwelling on the negative.",
        "I have what might be called a philosophy of life that guides me and gives me a great deal of comfort in difficult times.",
        "During the day, I do everything that needs to be done, but when the day is over, I really know how to relax and take it easy."
      ]
    }
  }
};

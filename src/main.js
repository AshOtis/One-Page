const { Plugin, PluginSettingTab, Setting, Notice } = require('obsidian');

// Inlined directly — Obsidian's plugin loader does not support require()
// of local files, only require('obsidian') and Node/Electron builtins.
const QUESTIONS = [
  // Avoidance / procrastination
  "What are you avoiding right now?",
  "What's one thing you're putting off, and why?",
  "What's the smallest next step on the thing you keep not starting?",
  "What are you hoping to feel by opening this tab?",
  "If you weren't allowed to scroll, what would you do with this time?",
  "What task have you been quietly dreading this week?",
  "What's the real reason you haven't started it yet?",
  "What would it cost you to start the thing for five minutes right now?",
  "What are you telling yourself to justify not doing it?",
  "What's easier to do than the thing you actually need to do?",
  "What's one email or message you keep not sending?",
  "What decision have you been putting off making?",
  "What's the boring task that would make everything else easier?",
  "What have you been meaning to fix for weeks?",
  "What would future-you thank you for starting today?",
  "What's the first domino you keep not tipping over?",
  "What are you procrastinating on that's actually not that hard?",
  "What's the thing you'd feel lighter having off your plate?",
  "What's one thing on your list you could finish in under ten minutes?",
  "What are you scrolling to postpone?",

  // Emotional check-in
  "What are you feeling, underneath whatever you're thinking about?",
  "What's bothering you that you haven't said out loud?",
  "What's one honest sentence about how this week is going?",
  "What emotion have you been pushing down today?",
  "What's weighing on you that has nothing to do with work?",
  "What's something you're anxious about that you haven't named yet?",
  "What would you tell a friend who felt exactly how you feel right now?",
  "What's actually bothering you, not the surface version?",
  "What are you carrying today that no one else can see?",
  "When did you last feel genuinely relaxed, and what were you doing?",
  "What's something you're proud of that you haven't told anyone?",
  "What's a feeling you've been avoiding sitting with?",
  "What's frustrating you that you haven't voiced?",
  "What do you need right now that you haven't asked for?",
  "What's something small that would make today better?",
  "What's making you tense that you could name in one sentence?",
  "What are you grateful for today, specifically?",
  "What's a worry that's bigger in your head than it needs to be?",
  "What's something you're excited about, even a little?",
  "What's one thing you'd change about how today has gone so far?",

  // Focus / intention for right now
  "What would make the next hour well spent?",
  "What do you actually want to be doing right now?",
  "What's the one thing that matters most today?",
  "What would make you feel like today wasn't wasted?",
  "What's worth your full attention right now?",
  "If you only got one thing done today, what should it be?",
  "What's the most useful thing you could do in the next 20 minutes?",
  "What are you optimizing for right now: rest, progress, or distraction?",
  "What's pulling your attention that doesn't deserve it?",
  "What would 'a good use of this hour' actually look like?",
  "What's one thing you could do now that your future self would appreciate?",
  "What's the difference between what you're doing and what you meant to do?",
  "What does focus feel like for you, and are you in it right now?",
  "What's the most important unfinished thing on your plate?",
  "If today had one clear win, what would it be?",
  "What would you do right now if no one was watching and it didn't matter?",
  "What's something worth doing slowly today?",
  "What's the difference between rest and avoidance for you right now?",
  "What's one thing you could do now instead of later?",
  "What are you actually trying to accomplish today?",

  // Reflection on the day / week
  "What's worth remembering about today?",
  "What went better than expected today?",
  "What's one thing you learned this week?",
  "What moment from today would you want to remember in a year?",
  "What's something you handled well recently?",
  "What surprised you today?",
  "What's one conversation that stuck with you this week?",
  "What did you do today that you're glad you did?",
  "What would you do differently if you replayed today?",
  "What's something that made you laugh recently?",
  "What's a small win from this week worth naming?",
  "What pattern have you noticed in yourself lately?",
  "What's something you've been avoiding thinking about this week?",
  "What's the best part of your day so far?",
  "What's something you noticed today that you'd normally miss?",
  "What's a mistake you made recently that taught you something?",

  // Values / bigger picture
  "What matters to you that you haven't spent time on lately?",
  "What's something you'd regret not doing this year?",
  "What does 'a good life' mean to you this week?",
  "What's something you value that today's schedule didn't reflect?",
  "What would you do differently if you had more courage right now?",
  "What's something you keep meaning to prioritize but don't?",
  "What's a habit you'd like to build, and what's stopping you?",
  "What does success look like to you this month, specifically?",
  "What's something you're doing out of habit rather than choice?",
  "What would you tell yourself a year ago if you could?",
  "What's a value you want to live by more this week?",
  "What's something you're doing for someone else's approval, not your own?",
  "What's one thing you want to be true about your life in five years?",
  "What are you optimizing your life for right now?",
  "What's a boundary you need to set but haven't?",

  // Curiosity / creative
  "What's something you're curious about but haven't looked into?",
  "What's an idea you haven't let yourself explore?",
  "What would you make if you had a free afternoon?",
  "What's a question you don't know the answer to but wish you did?",
  "What's something you used to enjoy that you've stopped doing?",
  "What's a small experiment you could try today?",
  "What's something you'd like to get better at?",
  "What's a story you haven't told anyone yet?",
  "What's something odd you noticed recently worth writing down?",
  "What's an idea worth five more minutes of thought?",

  // Body, people, work, change, small things
  "What's the one thing you'd drop from today if you could?",
  "Where in your body are you holding today's stress?",
  "How much sleep did you get, and how is it showing up?",
  "What's your energy like right now, out of ten, and why?",
  "What would rest actually look like for you today?",
  "When did you last go outside without a reason?",
  "What did you eat today that you enjoyed?",
  "What would you do with an extra hour today?",
  "Who would you like to hear from today?",
  "Who have you been meaning to get back in touch with?",
  "Who made your week a little easier?",
  "What's a conversation you need to have but keep postponing?",
  "Who do you feel most like yourself around?",
  "What's something you'd like someone to understand about you?",
  "Who could use a kind word from you today?",
  "What did someone say recently that you keep thinking about?",
  "What's a disagreement you're still turning over in your head?",
  "Who do you admire right now, and for what exactly?",
  "What part of your work do you secretly enjoy?",
  "What part of your work drains you most, and could you change it?",
  "What are you good at that nobody asks you to do?",
  "What would you work on if nobody was going to see it?",
  "What's a piece of work you're quietly proud of?",
  "What's the hardest problem in front of you, in one sentence?",
  "What are you making progress on, even slowly?",
  "What would 'enough' look like today?",
  "What's one thing you can say no to this week?",
  "What are you saying yes to that you'd rather decline?",
  "What are you holding onto that you could let go of?",
  "What's changed in you over the last year?",
  "What's something you believed a few years ago that you don't any more?",
  "What's a fear that's got smaller lately?",
  "What's a fear that's quietly got bigger?",
  "What are you learning the slow way?",
  "What would you try if you knew you'd be bad at it at first?",
  "What's a small promise you could keep to yourself today?",
  "What's the kindest thing you could do for yourself this evening?",
  "What would make tomorrow morning easier?",
  "What's on the calendar this week that you're quietly looking forward to?",
  "What season of life are you in right now?",
  "What do you want more of in your days?",
  "What do you want less of in your days?",
  "What does your ideal ordinary Tuesday look like?",
  "What's a place that makes you calmer just by thinking about it?",
  "What music fits your mood today?",
  "What's a book, film or song that changed how you saw something?",
  "What's the last thing you changed your mind about?",
  "What rabbit hole would you happily fall down this week?",
  "What's a skill you'd learn if time didn't matter?",
  "What's something you know a lot about that you rarely talk about?",
  "What would you write about if you had to fill a page right now?",
  "What's an old idea of yours that deserves another look?",
  "What's a question you'd like to ask someone older than you?",
  "What's a question you'd like to ask your younger self?",
  "What would you do differently if you were starting your career today?",
  "What's a risk you're glad you took?",
  "What's a risk you're still thinking about taking?",
  "What's distracting you most this week, and what does it give you?",
  "When do you do your best thinking?",
  "What's cluttering your space, your phone or your head?",
  "What's one notification you could turn off for good?",
  "How much of today has been your own choice?",
  "What are you rushing that would be better done slowly?",
  "What's the next small thing, not the whole project?",
  "What would you do now if you trusted yourself a little more?",
  "What's the story you're telling yourself about today?",
  "Which story about yourself feels true but might just be familiar?",
  "What did you need to hear this week?",
  "What's something you've stopped noticing that's still good?",
  "What made you feel useful recently?",
  "What made you feel small recently, and was it fair?",
  "What's a compliment you brushed off that you could let land?",
  "What would you like to be remembered for at work?",
  "What would you like to be remembered for at home?",
  "What do you keep coming back to, year after year?",
  "What's an unfinished project you could either finish or let go of?",
  "What are you saving for 'someday' that you could do now?",
  "What does your gut say about the decision you're weighing?",
  "What do you know now that you didn't know this morning?",
  "What's the most honest answer to 'How are you?' today?",
  "What helped the last time you felt like this?",
  "What's one thing you can control today?",
  "What's one thing you need to stop trying to control?",
  "What's a habit that's quietly working for you?",
  "What's a habit that's quietly working against you?",
  "What does a good evening look like tonight?",
  "What's something you're avoiding saying to yourself?",
  "What would you do this weekend if nothing was expected of you?",
  "Where did your time go yesterday?",
  "What would make this week feel finished?",
  "What's a small mess you could tidy in five minutes?",
  "What's worth celebrating that you haven't celebrated?",
  "What's an opinion you hold loosely?",
  "What's something you'd teach if someone asked?",
  "When did you feel most alive this month?",
  "What do you miss that you could bring back?",
  "What are you waiting for permission to do?",
  "If today had to fit on one page, what would it say?",
  "What's one thing you want to remember to do tomorrow?"
];

const STORY_PROMPTS = [
  "Write a short story about a lighthouse keeper who finds a letter addressed to someone who died a decade ago.",
  "Write a short story about the last customer in a shop on its final night of business.",
  "Write a short story about two strangers stuck in a lift who realise they've met before.",
  "Write a short story about a locksmith who's forgotten how to unlock their own front door.",
  "Write a short story about someone who finds a key that doesn't fit any door they own.",
  "Write a short story about a town where it has rained, without stopping, for exactly one year.",
  "Write a short story about a man who repairs clocks that have all stopped at the same time.",
  "Write a short story about a woman who receives a parcel addressed to her, postmarked twenty years from now.",
  "Write a short story about a dog that returns home alone after its owner leaves for a walk.",
  "Write a short story about the last person on Earth who still remembers how to write in longhand.",
  "Write a short story about a train that never reaches its final stop.",
  "Write a short story about two siblings who inherit a house neither of them wants to enter.",
  "Write a short story about someone who finds their own handwriting in a book they've never read.",
  "Write a short story about a lighthouse that goes dark for the first time in a hundred years.",
  "Write a short story about a photograph that shows a place no one can find.",
  "Write a short story about a small-town barber who knows everyone's secrets and tells no one.",
  "Write a short story about a message in a bottle that washes up exactly where it was thrown in.",
  "Write a short story about someone who wakes up one day speaking a language they've never learned.",
  "Write a short story about a night-shift worker who's the only person awake in the whole building.",
  "Write a short story about a garden that keeps growing something no one planted.",
  "Write a short story about a librarian who finds a book with her own name on the spine.",
  "Write a short story about a couple who write letters to each other despite living in the same house.",
  "Write a short story about a taxi driver who picks up the same silent passenger every night.",
  "Write a short story about a man who buys back, piece by piece, everything he once sold.",
  "Write a short story about a child who insists an empty chair at the table belongs to someone real.",
  "Write a short story about a radio that only ever picks up one station, broadcasting from nowhere.",
  "Write a short story about the last shop on a street being demolished, seen through the shopkeeper's eyes.",
  "Write a short story about a stranger who returns something you didn't know you'd lost.",
  "Write a short story about a house that seems to rearrange itself slightly every time someone leaves.",
  "Write a short story about a fisherman who catches something that shouldn't exist.",
  "Write a short story about someone who finds their childhood diary and doesn't recognise the person who wrote it.",
  "Write a short story about a town's only payphone, and the one person who still uses it.",
  "Write a short story about a wedding ring found in a place it should never have ended up.",
  "Write a short story about a museum guard who talks to the paintings after closing time.",
  "Write a short story about a letter that takes fifty years to arrive.",
  "Write a short story about someone who keeps receiving mail for a person who used to live in their house.",
  "Write a short story about a bridge that a town refuses to cross after dark.",
  "Write a short story about a man who plants a tree for every year he's been alive.",
  "Write a short story about the last voicemail on an old phone, and who finally listens to it.",
  "Write a short story about a stranger at a bus stop who seems to know exactly what you're thinking.",
  "Write a short story about a door in a house that was always kept locked, finally opened.",
  "Write a short story about someone returning to their childhood home to find it exactly as they left it.",
  "Write a short story about a night porter at a seaside hotel who keeps a register of guests who never check out.",
  "Write a short story about a woman who inherits a typewriter that finishes her sentences.",
  "Write a short story about a village that holds a funeral every year for someone nobody remembers.",
  "Write a short story about a postwoman on her last round before the route is closed for good.",
  "Write a short story about a boy who finds a map of his town with one extra street on it.",
  "Write a short story about a retired astronaut who can't stop looking at the moon.",
  "Write a short story about a cook in an all-night café who makes the same meal for a stranger every Thursday.",
  "Write a short story about a ferry where no one ever seems to arrive on the other side.",
  "Write a short story about two neighbours who talk only through notes left on a shared fence.",
  "Write a short story about someone who finds a voicemail from themselves that they don't remember leaving.",
  "Write a short story about a piano tuner called to a house with no piano.",
  "Write a short story about a woman who counts the steps between every place she's ever lived.",
  "Write a short story about a market trader who sells second-hand memories.",
  "Write a short story about an old man teaching his granddaughter to whistle on the last day of summer.",
  "Write a short story about a snowed-in railway station and the five people waiting in it.",
  "Write a short story about a translator who realises the letters she's translating are about her.",
  "Write a short story about a fox that visits the same garden every night at exactly midnight.",
  "Write a short story about a cinema projectionist who sees something in the film no one else can.",
  "Write a short story about a family that eats dinner in silence one night a year, and why.",
  "Write a short story about a lost glove that passes through ten different hands.",
  "Write a short story about someone who repaints their front door a new colour every time they fall in love.",
  "Write a short story about a watchmaker who builds a clock that runs backwards.",
  "Write a short story about a woman who swims in the same cold lake every morning for forty years.",
  "Write a short story about the last night of a seaside funfair before the winter closure.",
  "Write a short story about a mechanic who finds a note hidden inside a car's door panel.",
  "Write a short story about a teenager who discovers their grandmother was once a famous singer.",
  "Write a short story about a bookshop that only opens when it's raining.",
  "Write a short story about a man who keeps the light on in his window for someone who left long ago.",
  "Write a short story about a stray cat that adopts an entire block of flats.",
  "Write a short story about a hospital porter's night, told through the people he wheels from ward to ward.",
  "Write a short story about a crossword compiler who hides a confession in tomorrow's puzzle.",
  "Write a short story about a hiker who finds a tent pitched in a place nobody could reach.",
  "Write a short story about a coastal town where the tide went out one day and didn't come back.",
  "Write a short story about an old radio presenter's final broadcast, to listeners she's never met.",
  "Write a short story about someone who finds an exact copy of their house three streets away.",
  "Write a short story about two pen pals who finally agree to meet after thirty years.",
  "Write a short story about a gardener who tells the bees the family's news.",
  "Write a short story about a lift attendant in a building that no longer needs one.",
  "Write a short story about a girl who collects the sounds of her street on an old tape recorder.",
  "Write a short story about a bus driver on the last service of the night on Christmas Eve.",
  "Write a short story about a man who returns a library book forty years overdue.",
  "Write a short story about a ferry café that serves the same three regulars every winter.",
  "Write a short story about a village choir that keeps one seat empty.",
  "Write a short story about someone who wakes to find every clock in the house showing a different time.",
  "Write a short story about a farmer who finds a perfect circle in the frost.",
  "Write a short story about a removal man who notices one box that never gets unpacked.",
  "Write a short story about two old friends who meet on the same bench each year to settle one argument.",
  "Write a short story about a woman who writes obituaries and has to write one for her own father.",
  "Write a short story about a night-time lorry driver and the voice on the radio that keeps him awake.",
  "Write a short story about a child who believes the moon follows only her.",
  "Write a short story about a cobbler who can tell a person's whole story from their shoes.",
  "Write a short story about a tree that a whole street refuses to let the council cut down.",
  "Write a short story about a seaside café owner who keeps a jar of notes left by customers.",
  "Write a short story about someone who receives an apology letter for something that hasn't happened yet.",
  "Write a short story about a pair of shoes left at the top of a hill every Sunday.",
  "Write a short story about a scientist alone at an Antarctic station on the longest night of the year.",
  "Write a short story about a carpenter building a boat in a garden a hundred miles from the sea.",
  "Write a short story about a woman who finds the house she dreams about every night, up for sale."
];

const POETRY_PROMPTS = [
  "Write a haiku about the quiet of early morning.",
  "Write a short poem about waiting for something you can't rush.",
  "Write a haiku about the last leaf on a tree in autumn.",
  "Write a poem, any length, about a color and what it reminds you of.",
  "Write a haiku about rain on a window.",
  "Write a short poem about a place you've never been but can picture clearly.",
  "Write a haiku capturing the moment just before sleep.",
  "Write a poem about something ordinary made strange by close attention.",
  "Write a haiku about the sound of a door closing.",
  "Write a short poem about a memory triggered by a smell.",
  "Write a haiku about the first snow, or the idea of it.",
  "Write a poem about someone waving goodbye at a train station.",
  "Write a haiku about a cup of tea going cold.",
  "Write a short poem about the space between two heartbeats.",
  "Write a haiku about a streetlight flickering on at dusk.",
  "Write a poem about a name you've never told anyone the meaning of.",
  "Write a haiku about footprints in wet sand disappearing.",
  "Write a short poem about the exact moment a storm breaks.",
  "Write a haiku about a single candle in a dark room.",
  "Write a poem about the last thing you'd want someone to remember about you.",
  "Write a haiku about a kettle coming to the boil.",
  "Write a short poem about the walk home after a long day.",
  "Write a haiku about a cat asleep in a patch of sun.",
  "Write a poem about your hands and what they've done today.",
  "Write a haiku about the moon seen from a bus window.",
  "Write a short poem about a word you love the sound of.",
  "Write a haiku about frost on a car windscreen.",
  "Write a poem about a room you used to sleep in.",
  "Write a haiku about birdsong before dawn.",
  "Write a short poem about something you lost and never found.",
  "Write a haiku about a puddle holding the sky.",
  "Write a poem made only of things you can see right now.",
  "Write a haiku about the smell of cut grass.",
  "Write a short poem about an empty playground at dusk.",
  "Write a haiku about the first warm day of spring.",
  "Write a poem to your younger self, in eight lines or fewer.",
  "Write a haiku about a late train.",
  "Write a short poem about the sea in winter.",
  "Write a haiku about a moth at the window.",
  "Write a poem about a meal shared with someone you love.",
  "Write a haiku about fog on a hillside.",
  "Write a short poem about the sound of your street at night.",
  "Write a haiku about a spider's web after rain.",
  "Write a poem about a song that takes you somewhere else.",
  "Write a haiku about a dog waiting at the door.",
  "Write a short poem about a promise.",
  "Write a haiku about the last light on a summer evening.",
  "Write a poem in which every line begins with 'I remember'.",
  "Write a haiku about a bicycle left out in the rain.",
  "Write a short poem about a quiet kind of courage."
];

const DIALOGUE_PROMPTS = [
  "Write a conversation between two strangers waiting for a delayed flight.",
  "Write a dialogue between an old friend and someone who let them down, meeting again after years.",
  "Write a conversation between a parent and a child about something neither wants to say directly.",
  "Write a dialogue between two people who disagree about whether to leave a place they both love.",
  "Write a conversation between a doctor and a patient hearing news they weren't expecting.",
  "Write a dialogue between two coworkers on the last day one of them is quitting.",
  "Write a conversation between siblings clearing out their late parent's house.",
  "Write a dialogue between two people on a long car ride who've run out of things to say, until one of them says something real.",
  "Write a conversation between a customer and a shopkeeper who clearly both know something isn't being said.",
  "Write a dialogue between two old rivals forced to work together.",
  "Write a conversation between someone and their reflection, if it could talk back.",
  "Write a dialogue between two people breaking up, where neither one is the villain.",
  "Write a conversation overheard on a park bench between two people who've just met.",
  "Write a dialogue between a teacher and a student who's about to give up.",
  "Write a conversation between two neighbors during a power outage.",
  "Write a dialogue between two people meeting for a first date that neither of them wanted to go on.",
  "Write a conversation between a person and an old voicemail from someone they miss, imagined as if it could answer back.",
  "Write a dialogue between two people stuck in an elevator who used to be close.",
  "Write a conversation between a parent and their grown child about a decision the child hasn't told them about yet.",
  "Write a dialogue between two people at a funeral who haven't spoken in years.",
  "Write a conversation between a grandparent and a grandchild about the first time each of them was truly afraid.",
  "Write a dialogue between two night-shift workers on their break at 3 a.m.",
  "Write a conversation between a landlord and a tenant on the day the tenant moves out after twenty years.",
  "Write a dialogue between two people who both think they should be the one to apologise.",
  "Write a conversation between a busker and the one person who stops to listen.",
  "Write a dialogue between two strangers sharing an umbrella.",
  "Write a conversation between a job interviewer and a candidate who decides to be completely honest.",
  "Write a dialogue between an old couple deciding whether to sell the family home.",
  "Write a conversation between two friends where one of them is hiding good news.",
  "Write a dialogue between a lighthouse keeper and the supply-boat captain on the final delivery.",
  "Write a conversation between a child and the monster under the bed, who turns out to be shy.",
  "Write a dialogue between two people at a bus stop in the rain, one of whom is about to change their life.",
  "Write a conversation between a waiter and the last diner of the night.",
  "Write a dialogue between two sisters planning a surprise neither of them thinks will work.",
  "Write a conversation between a mechanic and a customer who's more attached to the car than they'll admit.",
  "Write a dialogue between a new parent and their own parent at 4 a.m.",
  "Write a conversation between two old soldiers who fought on opposite sides.",
  "Write a dialogue between a writer and a character who refuses to do what the plot needs.",
  "Write a conversation between two people on their first walk after a long illness.",
  "Write a dialogue between a shop assistant and a customer returning a gift they secretly love.",
  "Write a conversation between two friends at the top of a hill they used to climb as children.",
  "Write a dialogue between a ghost and the new owner of its house, agreeing the rules.",
  "Write a conversation between two people in a hospital waiting room, waiting for news about different people.",
  "Write a dialogue between a referee and a player after the final whistle of a lost cup final.",
  "Write a conversation between a father and son trying to fix something neither knows how to fix.",
  "Write a dialogue between two strangers on a night bus who find they grew up on the same street.",
  "Write a conversation between a person and their future self, who will only answer yes or no.",
  "Write a dialogue between two colleagues snowed in at the office.",
  "Write a conversation between an old dog and a new puppy, as if they could talk.",
  "Write a dialogue between two people saying goodbye at an airport, where only one of them knows it's for good."
];

const GRATITUDE_PROMPTS = [
  "What's something small someone did for you recently that you haven't thanked them for?",
  "What's a comfort in your daily routine you'd miss if it disappeared?",
  "Who is someone who shaped who you are, that you don't think about often?",
  "What's something about your body you're grateful works the way it does?",
  "What's a place that's given you peace, and why?",
  "What's a skill you have that you take for granted?",
  "What's something in your home that makes it feel like yours?",
  "What's a hard time in your life that, in hindsight, taught you something you're grateful for?",
  "Who is someone you're glad you met, even briefly?",
  "What's a small pleasure you had today that you almost didn't notice?",
  "What's something about today's weather, food, or surroundings you appreciated?",
  "What's a piece of advice someone gave you that turned out to matter?",
  "What's something you own that you'd be sad to lose, and why?",
  "What's a moment this week when someone made you laugh?",
  "What's a freedom you have that you don't think about often?",
  "What's something about your work or how you spend your time that you're thankful for?",
  "Who is someone who believed in you before you believed in yourself?",
  "What's a tradition or ritual, however small, that means something to you?",
  "What's something beautiful you saw recently that you didn't expect?",
  "What's a relationship in your life you don't say thank you for often enough?",
  "What's a sound you love hearing at home?",
  "Who taught you something practical that you still use?",
  "What's a meal that always makes you feel looked after?",
  "What's a small kindness from a stranger that you still remember?",
  "What's something your past self did that makes your life easier now?",
  "What's a book, film or song you're glad exists?",
  "Who is someone who makes you laugh without trying?",
  "What's a walk or route you're always glad to take?",
  "What's something in nature you saw this week that you're glad you noticed?",
  "What's a mistake you're grateful you made early?",
  "Who checked in on you when you needed it?",
  "What's a tool or object that makes your days easier?",
  "What's a smell that brings back a good memory?",
  "What's something you can do now that you couldn't do a year ago?",
  "Who is a teacher, of any kind, you're thankful for?",
  "What's a door that closed and led somewhere better?",
  "What's a quiet moment from today you'd like to keep?",
  "What's something about where you live that you'd miss if you moved?",
  "Who is someone you can be completely yourself with?",
  "What's a kindness you were able to give recently?",
  "What's a lesson from a difficult person that you're grateful for, however reluctantly?",
  "What's something in your cupboard or fridge you're glad to have today?",
  "What's a piece of technology that quietly improves your life?",
  "What's a memory with a friend that still makes you smile?",
  "What's something about this season you're glad of?",
  "Who did their job well today so that your day ran smoothly?",
  "What's a habit you're glad you kept?",
  "What's an ordinary thing that would have amazed you as a child?",
  "What's something about your own character you're grateful for?",
  "What's one thing from today you'd like to say thank you for, even if only here?"
];

const DEFAULT_SETTINGS = {
  autoInsert: true,
  storyChance: 0.25,
  poetryChance: 0.15,
  dialogueChance: 0.15,
  gratitudeChance: 0.2,
  insertHeading: '## Reflection'
};

// Special decks, checked in this order each time a prompt is drawn. Each
// is gated to appear at most once per calendar day, independent of the
// others and of how many times a prompt is drawn that day. Whatever
// doesn't match falls through to the base QUESTIONS pool.
const DECKS = [
  { type: 'story', list: STORY_PROMPTS, chanceKey: 'storyChance', dateKey: 'lastStoryDate', queueKey: 'storyQueue', label: 'Short story' },
  { type: 'poetry', list: POETRY_PROMPTS, chanceKey: 'poetryChance', dateKey: 'lastPoetryDate', queueKey: 'poetryQueue', label: 'Poem' },
  { type: 'dialogue', list: DIALOGUE_PROMPTS, chanceKey: 'dialogueChance', dateKey: 'lastDialogueDate', queueKey: 'dialogueQueue', label: 'Dialogue' },
  { type: 'gratitude', list: GRATITUDE_PROMPTS, chanceKey: 'gratitudeChance', dateKey: 'lastGratitudeDate', queueKey: 'gratitudeQueue', label: 'Gratitude' }
];

// Fisher-Yates shuffle
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

module.exports = class OnePagePlugin extends Plugin {
  async onload() {
    await this.loadSettings();

    this.addCommand({
      id: 'insert-one-page-prompt',
      name: 'Insert reflection prompt',
      editorCallback: (editor) => this.insertAtCursor(editor)
    });

    this.addSettingTab(new OnePageSettingTab(this.app, this));

    this.registerEvent(
      this.app.vault.on('create', (file) => this.handleFileCreate(file))
    );
    this.registerEvent(
      this.app.workspace.on('file-open', (file) => {
        if (file) this.maybeAutoInsert(file);
      })
    );
  }

  async loadSettings() {
    const data = (await this.loadData()) || {};
    this.settings = Object.assign({}, DEFAULT_SETTINGS, data.settings);
    this.state = Object.assign(
      {
        queue: [],
        storyQueue: [], lastStoryDate: null,
        poetryQueue: [], lastPoetryDate: null,
        dialogueQueue: [], lastDialogueDate: null,
        gratitudeQueue: [], lastGratitudeDate: null,
        lastAutoInsertDate: null
      },
      data.state
    );
  }

  async persist() {
    await this.saveData({ settings: this.settings, state: this.state });
  }

  // Shuffled-bag draw: work through a shuffled copy of a list, only
  // reshuffling once every item has been shown. Guarantees no repeats
  // until the whole set has appeared once.
  drawFromBag(list, queueKey) {
    let queue = this.state[queueKey];
    if (!queue || !queue.length) {
      queue = shuffle([...Array(list.length).keys()]);
    }
    const index = queue.shift();
    this.state[queueKey] = queue;
    return list[index];
  }

  // Checks each special deck in turn (story, poetry, dialogue, gratitude).
  // Each is gated to at most once per calendar day; whichever one is
  // eligible AND wins its own chance roll first is used. If none hit,
  // falls through to the base reflective-question pool.
  drawPrompt() {
    const todayStr = new Date().toDateString();

    for (const deck of DECKS) {
      const alreadyToday = this.state[deck.dateKey] === todayStr;
      const chance = this.settings[deck.chanceKey] || 0;
      if (!alreadyToday && Math.random() < chance) {
        const text = this.drawFromBag(deck.list, deck.queueKey);
        this.state[deck.dateKey] = todayStr;
        return { text, type: deck.type, label: deck.label };
      }
    }

    const text = this.drawFromBag(QUESTIONS, 'queue');
    return { text, type: 'question', label: 'Reflection' };
  }

  buildBlock(prompt) {
    return `${this.settings.insertHeading}\n*${prompt.label}:* ${prompt.text}\n\n`;
  }

  async insertAtCursor(editor) {
    const prompt = this.drawPrompt();
    await this.persist();
    const cursor = editor.getCursor();
    editor.replaceRange(this.buildBlock(prompt), cursor);
    new Notice(`${prompt.label} prompt inserted`);
  }

  // Best-effort detection of "this file is today's daily note", read from
  // the core Daily Notes plugin's own settings (folder + date format).
  isTodaysDailyNote(file) {
    // Obsidian has no public API for the core Daily Notes settings, so read them defensively:
    // if anything is missing or changes shape, auto-insert simply does nothing.
    let options;
    try {
      const ip = this.app.internalPlugins;
      const dn = ip && (typeof ip.getEnabledPluginById === 'function'
        ? ip.getEnabledPluginById('daily-notes')
        : (ip.plugins && ip.plugins['daily-notes'] && ip.plugins['daily-notes'].enabled && ip.plugins['daily-notes'].instance));
      if (!dn) return false;
      options = dn.options || {};
    } catch (e) { return false; }
    const format = options.format || 'YYYY-MM-DD';
    const folder = (options.folder || '').replace(/\/+$/, '');
    const todayName = window.moment().format(format);
    const expectedPath = folder ? `${folder}/${todayName}.md` : `${todayName}.md`;

    return file.path === expectedPath;
  }

  // Handles both "note just got created" and "note (new or pre-existing)
  // just got opened". Auto-insert is gated to once per calendar day via
  // state.lastAutoInsertDate, claimed synchronously before any awaits so
  // the create and file-open events can't both slip through and double-insert.
  async maybeAutoInsert(file) {
    if (!this.settings.autoInsert) return;
    if (!file || file.extension !== 'md') return;
    if (!this.isTodaysDailyNote(file)) return;

    const todayStr = new Date().toDateString();
    if (this.state.lastAutoInsertDate === todayStr) return;

    this.state.lastAutoInsertDate = todayStr; // claim the day immediately
    await this.persist();

    const content = await this.app.vault.read(file);
    if (content.includes(this.settings.insertHeading)) return; // already has one

    const prompt = this.drawPrompt();
    await this.persist();
    await this.app.vault.append(file, `\n${this.buildBlock(prompt)}`);
  }

  handleFileCreate(file) {
    if (!this.settings.autoInsert) return;
    if (!file || file.extension !== 'md') return;
    if (!this.isTodaysDailyNote(file)) return;

    // Small delay lets the daily-note template (if any) finish writing
    // first. If file-open already claimed the day by the time this runs,
    // maybeAutoInsert exits immediately — no duplicate.
    const t = window.setTimeout(() => this.maybeAutoInsert(file), 300);
    this.register(() => window.clearTimeout(t));
  }
};

class OnePageSettingTab extends PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display() {
    const { containerEl } = this;
    containerEl.empty();

    new Setting(containerEl)
      .setName('Auto-insert into daily notes')
      .setDesc('Automatically add a prompt to today\'s daily note — whether it\'s brand new or already existed — the first time it\'s created or opened each day. Requires the core Daily Notes plugin to be enabled.')
      .addToggle((toggle) =>
        toggle.setValue(this.plugin.settings.autoInsert).onChange(async (value) => {
          this.plugin.settings.autoInsert = value;
          await this.plugin.persist();
        })
      );

    new Setting(containerEl)
      .setName('Story prompt chance')
      .setDesc('How often a prompt is a short-story premise instead of a reflective question. Story prompts never appear more than once per day, regardless of this setting.')
      .addSlider((sl) =>
        sl.setLimits(0, 1, 0.05).setValue(this.plugin.settings.storyChance).setDynamicTooltip().onChange(async (value) => {
          this.plugin.settings.storyChance = value;
          await this.plugin.persist();
        })
      );

    new Setting(containerEl)
      .setName('Poetry/haiku prompt chance')
      .setDesc('How often a prompt is a poem or haiku premise. Capped to once per day like the other decks.')
      .addSlider((sl) =>
        sl.setLimits(0, 1, 0.05).setValue(this.plugin.settings.poetryChance).setDynamicTooltip().onChange(async (value) => {
          this.plugin.settings.poetryChance = value;
          await this.plugin.persist();
        })
      );

    new Setting(containerEl)
      .setName('Dialogue prompt chance')
      .setDesc('How often a prompt asks you to write a conversation between two people. Capped to once per day.')
      .addSlider((sl) =>
        sl.setLimits(0, 1, 0.05).setValue(this.plugin.settings.dialogueChance).setDynamicTooltip().onChange(async (value) => {
          this.plugin.settings.dialogueChance = value;
          await this.plugin.persist();
        })
      );

    new Setting(containerEl)
      .setName('Gratitude prompt chance')
      .setDesc('How often a prompt comes from the dedicated gratitude deck instead of general reflection. Capped to once per day.')
      .addSlider((sl) =>
        sl.setLimits(0, 1, 0.05).setValue(this.plugin.settings.gratitudeChance).setDynamicTooltip().onChange(async (value) => {
          this.plugin.settings.gratitudeChance = value;
          await this.plugin.persist();
        })
      );

    new Setting(containerEl)
      .setName('Insert heading')
      .setDesc('Heading text placed above each inserted prompt. Also used to detect whether a note already has one.')
      .addText((text) =>
        text.setValue(this.plugin.settings.insertHeading).onChange(async (value) => {
          if (value.trim()) {
            this.plugin.settings.insertHeading = value;
            await this.plugin.persist();
          }
        })
      );
  }
}
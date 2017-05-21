
var path = ""; // Satır başı yazısı
var blinkCursor; // İmleç
var is_menu_active = false; // Main menu açık iken input'a hiç birşey yazdırmaması kontrolü.
var menu_keys = false; // Main menu'den birşey seçip menüyü kapatınca input'a seçtiğin değeri yazdırmaması kontrolü.
var is_menu_available = true; // Main Menu'ye erişim kontrolü.
var is_screen_loaded = false; // Main Menu'ye erişim kontrolü.
var action_type = 0;
var finished_action = 0;
var dialogueCount = 0;
var storyCount = 0;
var current_dialogue_name = ""; // action() içinde, action_type = "dialogue_answer" devam ediyor ise hangi diyaloğa cevap vereceğini tutuyor.

var isFight = false;

//init object
var options = new Options();



var dialogues = {
    name_dialogue :
    {
        id : 1,
        keyName : "name_dialogue",
        type : "text",
        question : "Hello my friend, tell me your name?",
        printText : function(input){
            return "<div style='color: #0F0'>OK, your name is "+input;
        },
        saveAnswer : function (answer){
            dialogueAnswers[this.keyName] = answer; // dialogueAnswers objesine diyalog key ve cevabı yazdırdık
            options.name = answer; // options objesindeki name özelliğine gelen cevabı yazdırdık
        }
    },
    do_you_like_beer :
    {
        id : 2,
        keyName : "do_you_like_beer",
        type : "number",
        question : "Do you like beer?",
        answers : 
            [{
                id : 1,
                inputText : "Yes i like",
                saveAnswer : function (keyName){
                    dialogueAnswers[keyName] = this.inputText;
                    return "OK, man nice.";
                }
            },
            {
                id : 2,
                inputText : "I hate that shit.",
                saveAnswer : function (keyName){
                    dialogueAnswers[keyName] = this.inputText;
                    return "OK man, calm down..";
                }
            },
            {
                id : 3,
                inputText : "I love it!",
                saveAnswer : function (keyName){
                    dialogueAnswers[keyName] = this.inputText;
                    return "Wow maan... Take it and end this fucking game!";
                }
            }]
    },
    do_you_like_girls :
    {
        id : 3,
        keyName : "do_you_like_girls",
        type : "number",
        question : "Do you like girls?",
        answers : 
            [{
                id : 1,
                inputText : "Of course i like girls.",
                saveAnswer : function (keyName){
                    dialogueAnswers[keyName] = this.inputText;
                    return "OK, nice.";
                }
            },
            {
                id : 2,
                inputText : "I am a girl...",
                saveAnswer : function (keyName){
                    dialogueAnswers[keyName] = this.inputText;
                    return "OK lady, calm down.. Sorry about for calling you 'man'.";
                }
            },
            {
                id : 3,
                inputText : "Girls? I am Gay.",
                saveAnswer : function (keyName){
                    dialogueAnswers[keyName] = this.inputText;
                    return "From now on your name is Gaylord";
                }
            }]
    },
    do_you_wanna_fight :
    {
        id : 4,
        keyName : "do_you_wanna_fight",
        type : "number",
        question : "Do you wanna fight?",
        answers : 
            [{
                id : 1,
                inputText : "Yes.",
                saveAnswer : function (keyName){
                    dialogueAnswers[keyName] = this.inputText;
                    return "Prepare to fight!";
                },
                action : function (keyName){
                    isFight = true;
                    action_type = "prepare_fight";
                    enemy = Characters.gandalf;
                }
            },
            {
                id : 2,
                inputText : "No.",
                saveAnswer : function (keyName){
                    dialogueAnswers[keyName] = this.inputText;
                    return "Okey then, go on...";
                },
                action : function (keyName){
                    
                }
            }]
    },
}

var stories = {
    starting_story :
    {
        id : 1,
        isShown: false,
        keyName : "starting_story",
        text : "There once was a little boy who had a bad temper. His father gave him a bag of nails and told him that every time he lost his temper, he must hammer "+
        "a nail into the back of the fence. The first day, the boy had driven 37 nails into the fence. Over the next few weeks, as he learned to control his anger, "+
        "the number of nails hammered daily gradually dwindled down. He discovered it was easier to hold his temper than to drive those nails into the fence. ",
    },
    second_story :
    {
        id : 2,
        isShown: false,
        keyName : "second_story",
        text : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse porta, urna eu molestie condimentum, urna felis tincidunt lectus, id finibus nibh"+
        "nibh vitae nulla. Etiam euismod leo ante, id ultricies odio mollis ut. Vestibulum ante ipsum, scelerisque eu aliquet vitae, tincidunt non ligula. Sed in euismod urna. "+
        "Proin lobortis porttitor lacus, vitae tempor risus tempor in. In gravida id tellus vitae tincidunt. Etiam lectus libero, volutpat in lacus eu, bibendum porttitor nisi.",
    },
    accept_fight :
    {
        id : 3,
        isShown: false,
        keyName : "accept_fight",
        text : "STORY dovusu kabul ettin",
        doAction : function(){
            
        }
    },
    decline_fight :
    {
        id : 4,
        isShown: false,
        keyName : "decline_fight",
        text : "STORY dovusu kabul reddettin",
        doAction : function(){
            action_type = 0;
        }
    },
    force_fight :
    {
        id : 5,
        isShown: false,
        keyName : "force_fight",
        text : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse porta, urna eu molestie condimentum, urna felis tincidunt lectus, id finibus nibh"+
        "nibh vitae nulla. Etiam euismod leo ante, id ultricies odio mollis ut. Vestibulum ante ipsum, scelerisque eu aliquet vitae, tincidunt non ligula. Sed in euismod urna. "+
        "Proin lobortis porttitor lacus, vitae tempor risus tempor in. In gravida id tellus vitae tincidunt. Etiam lectus libero, volutpat in lacus eu, bibendum porttitor nisi.",
        doAction : function(){
            
        }
    }
}



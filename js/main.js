
var storySequence = ["starting_story", "first_story", "first_story_2","second_story","third_story","forth_story","fifth_story"]; // Diyalogları sırası ile bu diziden oluşturuyor.
var dialogueSequence = ["name_dialogue","nick_dialogue", "do_you_wanna_fight", "do_you_like_girls", "do_you_like_girls"]; // Diyalogları sırası ile bu diziden oluşturuyor.
//var dialogueSequence = ["do_you_wanna_fight","nick_dialogue", "do_you_wanna_fight", "do_you_like_girls", "do_you_like_girls"]; // Diyalogları sırası ile bu diziden oluşturuyor.



var processSequence = [ // İşlem Sırası
    {id:1, type:"story"},
    {id:2, type:"dialogue"},
    {id:3, type:"dialogue"},
    {id:4, type:"story"},
    {id:4, type:"story"},
    {id:5, type:"story"},
    {id:6, type:"story"},
    {id:7, type:"story"},
    {id:8, type:"story"},
    {id:9, type:"story"},
    {id:10, type:"story"},
    {id:11, type:"story"},
    {id:12, type:"story"},
];
/*
var processSequence = [ // İşlem Sırası
    {id:1, type:"dialogue"},
    {id:2, type:"dialogue"},
    {id:3, type:"dialogue"},
    {id:4, type:"dialogue"},
    {id:5, type:"dialogue"},
    {id:6, type:"story"},
    {id:7, type:"story"},
    {id:8, type:"story"},
    {id:8, type:"story"},
];*/

function action() {
    //console.log(action_type);
    if (action_type == "dialogue_question"){action_type = "dialogue_answer";} // action_type == "dialogue_question" ise cevaplama kısmına geç.
    if(action_type != "dialogue_answer" && action_type != "fight" && finished_action < processSequence.length){ // dialogue veya story oluştur
        if(processSequence[finished_action].type == "dialogue"){
            action_type = "create_dialog";
            initDialogue();
        } else if(processSequence[finished_action].type == "story") {
            action_type = "create_story_text";
            initStory();
        }
    } else if (action_type == "dialogue_answer"){ // dialogue_answer
        answer = $("#input").val();
        answerQuestion(current_dialogue_name, answer);
    }
    skill = $("#input").val();
    if(action_type == "fight"){
        is_menu_available = false;
        $("#fight").show();

        if(skill=="1" || skill=="2" || skill=="3" || skill=="4"){
            useSkill(skill, mainCharacter, enemy);
        }
        fightUI(mainCharacter, enemy);
    } else {
        is_menu_available = true;
        $("#fight").hide();
    }
    if (action_type == "prepare_fight"){action_type = "fight";}
    scrollBottom();
}















function selectCharacter(){
    mainCharacter = Characters.saruman;
}


function lvlUp(lvl){
    if(lvl==1) return 100;
    else return Math.log2(lvl) *100 + lvlUp(lvl-1);
}

console.log("Log2(2)"+lvlUp(2));
console.log("Log2(3)"+lvlUp(3));
console.log("Log2(4)"+lvlUp(4));
console.log("Log2(5)"+lvlUp(5));
console.log("Log2(6)"+lvlUp(6));
console.log("Log2(7)"+lvlUp(7));
console.log("Log2(8)"+lvlUp(8));
console.log("Log2(9)"+lvlUp(9));
console.log("Log2(10)"+lvlUp(10));


//dialogues["do_you_wanna_fight"].answers[0].action = "function(){dialogueAnswers[keyName] = this.inputText;}createStory('accept_fight');";



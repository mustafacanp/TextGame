
var storySequence = ["starting_story", "first_story", "first_story_2","second_story","third_story","forth_story","fifth_story","sixth_story","seventh_story",
"eighth_story","nineth_story"];
var dialogueSequence = ["name_dialogue","nick_dialogue", "do_you_wanna_fight", "do_you_like_girls", "do_you_like_girls"];
//var dialogueSequence = ["do_you_wanna_fight","do_you_wanna_fight", "do_you_wanna_fight", "do_you_like_girls", "do_you_like_girls"];


var dialogueSequence = ["do_you_wanna_fight","name_dialogue","nick_dialogue", "do_you_wanna_fight", "do_you_like_girls", "do_you_like_girls"];

var processSequence = [ // İşlem Sırası
    {id:0, type:"dialogue"},
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
    {id:13, type:"dialogue"},
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
];
*/


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
        //is_menu_available = true;
        $("#fight").hide();
    }
    if (action_type == "prepare_fight"){action_type = "fight";}
    scrollBottom();
}







function selectCharacter(){
    let saruman = new Saruman();
    let gandalf = new Gandalf();
    mainCharacter = new Character(gandalf);

    //console.log(mainCharacter);
    //mainCharacter.setName("Main")
    //console.log(mainCharacter.getName());
    
    //console.log(mainCharacter.getSkills()[0]);

    //console.log(mainCharacter.getSkills()[0].description);
    //mainCharacter = Characters.saruman;
    //console.log(mainCharacter._character);
}


function loadEnemy(mob){
    enemy = new Character(mob);
    /*
    console.log("---");
    console.log("Main Character's HP : " + mainCharacter.getHealth());
    console.log("Enemy's HP : " + enemy.getHealth());
    console.log("---");
    */
}




















var current_max_exp = 100;
function reqExptoLvlUp(lvl){
    if(lvl==1) return current_max_exp;
    else return parseInt(Math.log2(lvl) *100 + reqExptoLvlUp(lvl-1));
}
/*
console.log(reqExptoLvlUp(2));
console.log(reqExptoLvlUp(3));
console.log(reqExptoLvlUp(4));
console.log(reqExptoLvlUp(5));
console.log(reqExptoLvlUp(6));
console.log(reqExptoLvlUp(7));
console.log(reqExptoLvlUp(8));
console.log(reqExptoLvlUp(9));
console.log(reqExptoLvlUp(10));
*/

var current_max_exp = 100;
function reqExptoLvlUp2(lvl){
    if(lvl==1) return current_max_exp;
    else return parseInt((Math.pow(5 + lvl, 2) + reqExptoLvlUp2(lvl-1) + 1) * 1.1);
}


/*
console.log(reqExptoLvlUp2(2));
console.log(reqExptoLvlUp2(3));
console.log(reqExptoLvlUp2(4));
console.log(reqExptoLvlUp2(5));
console.log(reqExptoLvlUp2(6));
console.log(reqExptoLvlUp2(7));
console.log(reqExptoLvlUp2(8));
console.log(reqExptoLvlUp2(9));
console.log(reqExptoLvlUp2(10));
console.log("15: " + reqExptoLvlUp2(15));
console.log("20: " + reqExptoLvlUp2(20));
console.log("50: " + reqExptoLvlUp2(50));
console.log("100: " + reqExptoLvlUp2(100));
*/
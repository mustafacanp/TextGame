
var storySequence = ["starting_story", "first_story", "first_story_2","second_story","third_story","forth_story","fifth_story","sixth_story","seventh_story","eighth_story","nineth_story"];
//var dialogueSequence = ["name_dialogue","nick_dialogue", "do_you_wanna_fight"];
var dialogueSequence = ["do_you_wanna_fight","do_you_wanna_fight","name_dialogue","nick_dialogue", "do_you_wanna_fight"];

var processSequence = [ // İşlem Sırası
    {id:0, type:"story"},
    {id:1, type:"dialogue"},
    {id:2, type:"dialogue"},
    {id:3, type:"story"},
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
    console.log(action_type);
    if (action_type == "dialogue_question"){action_type = "dialogue_answer";} // action_type == "dialogue_question" ise cevaplama kısmına geç.

    /* Dialogue & Story */
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

    /* Fight */
    var inputKey = $("#input").val();
    if(action_type == "fight"){
        is_menu_available = false;
        $("#fight").show();

        if(inputKey=="1" || inputKey=="2" || inputKey=="3" || inputKey=="4" || inputKey=="5" || inputKey=="6"){
            // 5 => Health Pot && 6 => Mana Pot
            useSkill(inputKey, mainCharacter, enemy);
        }

        fightUI(mainCharacter, enemy);
    } else {
        //is_menu_available = true;
        $("#fight").hide();
    }
    if (action_type == "prepare_fight"){action_type = "fight";}
    /* Fight */


    scrollBottom();
}







function selectCharacter(character){
    mainCharacter = new Character(character);

    //console.log(mainCharacter);
    //mainCharacter.setName("fladnaG")
    //console.log(mainCharacter.getName());
    //console.log(mainCharacter.getSkills()[0]);
    //console.log(mainCharacter.getSkills()[0].description);
}

/*
var goblin = new Goblin();
var mob = new Mob(goblin, 2);
*/
//console.log(mob.skill1);




console.log("1 :" + reqExptoLvlUp(1));
console.log("2 :" + reqExptoLvlUp(2));
console.log("3 :" + reqExptoLvlUp(3));
console.log("4 :" + reqExptoLvlUp(4));
console.log("5 :" + reqExptoLvlUp(5));
console.log("6 :" + reqExptoLvlUp(6));
console.log("7 :" + reqExptoLvlUp(7));
console.log("8 :" + reqExptoLvlUp(8));
console.log("9 :" + reqExptoLvlUp(9));
console.log("10 :" + reqExptoLvlUp(10));
console.log("15: " + reqExptoLvlUp(15));
console.log("20: " + reqExptoLvlUp(20));
console.log("50: " + reqExptoLvlUp(50));
console.log("100: " + reqExptoLvlUp(100));

console.log("-----------------");

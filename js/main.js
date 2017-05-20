
var storySequence = ["starting_story", "second_story","second_story","second_story"]; // Diyalogları sırası ile bu diziden oluşturuyor.
var dialogueSequence = ["name_dialogue","do_you_wanna_fight", "do_you_like_beer", "do_you_like_girls", "do_you_like_girls"]; // Diyalogları sırası ile bu diziden oluşturuyor.
var processSequence = [ // İşlem Sırası
    {id:1, type:"dialogue"},
    {id:2, type:"story"},
    {id:3, type:"dialogue"},
    {id:4, type:"story"},
    {id:5, type:"dialogue"},
    {id:4, type:"story"},
    {id:7, type:"dialogue"},
];

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
        $("#fight").show();        
        var mainCharacter = Characters.saruman;
        var enemy = Characters.gandalf;

        if(skill=="1" || skill=="2" || skill=="3" || skill=="4"){
            useSkill(skill, mainCharacter, enemy);
        }
        fightUI(mainCharacter, enemy);
    } else {
        $("#fight").hide();
    }
    if (action_type == "prepare_fight"){action_type = "fight";}
    scrollBottom();
}



//dialogues["do_you_wanna_fight"].answers[0].action = "function(){dialogueAnswers[keyName] = this.inputText;}createStory('accept_fight');";




var storySequence = ["starting_story", "second_story", "starting_story"]; // Diyalogları sırası ile bu diziden oluşturuyor.
var dialogueSequence = ["name_dialogue", "do_you_like_beer", "do_you_like_girls", "do_you_like_girls"]; // Diyalogları sırası ile bu diziden oluşturuyor.
var processSequence = [ // İşlem Sırası
    {id:1, type:"dialogue"},
    {id:2, type:"story"},
    {id:3, type:"story"},
    {id:4, type:"dialogue"},
    {id:5, type:"dialogue"},
    {id:6, type:"story"},
    {id:7, type:"dialogue"},
];

function action(){
    if(action_type != "dialogue_answer" && finished_action < processSequence.length){
        if(processSequence[finished_action].type == "dialogue"){
            action_type = "create_dialog";
            initDialogue();
        } else if(processSequence[finished_action].type == "story") {
            action_type = "create_story_text";
            initStory();
        }
    }
    if(action_type == "dialogue_answer"){
        answer = $("#input").val();
        answerQuestion(current_dialogue_name, answer);
    } if(action_type == "dialogue_question"){action_type = "dialogue_answer";} // action_type == "dialogue_question" ise cevaplama kısmına geç.
    scrollBottom();
}


var mainCharacter = Characters.Gandalf; // Karakteri oluşturduk.
//console.log(mainCharacter);
useSkill(mainCharacter, 1); // Skill kullandık.


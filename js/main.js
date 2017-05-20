
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

function action(){
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
    //console.log("storyCount = "+storyCount);
    //console.log("finished_action = "+finished_action);
    //console.log("-------------------------------------");
}



//dialogues["do_you_wanna_fight"].answers[0].action = "function(){dialogueAnswers[keyName] = this.inputText;}createStory('accept_fight');";


function useSkill(skill, mainCharacter, enemy){
    var dmg = getSkillDamage(mainCharacter, enemy, skill, 1); // Skill kullandık.
    if (dmg == "cooldown"){
        cout(mainCharacter.skills[skill-1].name+" cooldown "+mainCharacter.skills[skill-1].current_cooldown+" turn","yellow");
        return;
    } else if (dmg == "no_mana"){
        cout("Not Enough Mana for "+mainCharacter.skills[skill-1].name,"purple");
        return;
    } else if (dmg != 0){
        enemy.health -= dmg;
    }
    if(enemy.health <= 0){
        enemy.health = 0;
        action_type = 0;
        cout("YOU WIN! GET xx EXP.","green");
        return;
    }

    var random_skill, dmg2;
    do{
        random_skill = getRandomInt(1,4);
        /*if(dmg2 != "no_mana" && dmg2 != "cooldown"){
            cout(enemy.name+" used "+enemy.skills[random_skill-1].name+".","red");
        }*/
        dmg2 = getSkillDamage(enemy, mainCharacter, random_skill, 0); // Rakip skill kullandı.
    } while (dmg2 == "no_mana" || dmg2 == "cooldown");
    if (dmg2 != 0){
        mainCharacter.health -= dmg2;
    }
    if(mainCharacter.health <= 0){
        mainCharacter.health = 0;
        action_type = 0;
        cout("YOU LOSE!","red");
    }
    cout("---");
}


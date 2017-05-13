
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
        var mainCharacter = Characters.analkin;
        var enemy = Characters.saruman;

        if(skill=="1" || skill=="2" || skill=="3" || skill=="4"){
            useSkill(skill, mainCharacter, enemy);
        }
        doldur(mainCharacter, enemy);
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
    if (dmg == "no_mana"){
        cout("","Not Enough Mana for "+mainCharacter.skills[skill-1].name,"purple",0);
        return;
    } else if (dmg != 0){
        enemy.health -= dmg;
        cout("","You used "+mainCharacter.skills[skill-1].name+" hit "+dmg+".","green",0);
    } else if (dmg == 0){
        cout("",enemy.name+" evaded your attack.","purple",0);
    }
    if(enemy.health <= 0){
        enemy.health = 0;
        action_type = 0;
        cout("","YOU WIN! GET xx EXP.","green",0);
        return;
    }

    var random_skill, dmg2;
    do{
        random_skill = getRandomInt(1,4);
        dmg2 = getSkillDamage(enemy, mainCharacter, random_skill, 0); // Rakip skill kullandı.
    } while (dmg2 == "no_mana");
    if (dmg2 != 0){
        mainCharacter.health -= dmg2;
        cout("",enemy.name+" used "+enemy.skills[random_skill-1].name+". Hit "+dmg2+".","red",0);
    } else if (dmg2 == 0){
        cout("","Evaded "+enemy.name+"'s attack.","purple",0);
    }
    if(mainCharacter.health <= 0){
        mainCharacter.health = 0;
        action_type = 0;
        cout("","YOU LOSE!","red",0);
    }
    //console.log(dmg2);

    //console.log("Gandalf HP = " + mainCharacter.health);
    //console.log("Saruman HP = " + enemy.health);
    //console.log("--------------");
}
    
function doldur(mainCharacter, enemy){
    $("#ch-health").width(Math.round(mainCharacter.health/mainCharacter.max_health*100)+"%");
    $("#ch-health").text("Health:"+mainCharacter.health);
    $("#ch-skill1").text("1."+mainCharacter.skills[0].name);
    $("#ch-skill2").text("2."+mainCharacter.skills[1].name);
    $("#ch-skill3").text("3."+mainCharacter.skills[2].name);
    $("#ch-skill4").text("4."+mainCharacter.skills[3].name);
    
    $("#ch-mana").text("Mana:"+mainCharacter.mana);
    $("#ch-mana").width(Math.round(mainCharacter.mana/mainCharacter.max_mana*100)+"%");
    $("#ch-skill1-mana-cost").text("+5 Mana");
    $("#ch-skill2-mana-cost").text("-"+mainCharacter.skills[1].mana_cost+" Mana");
    $("#ch-skill3-mana-cost").text("-"+mainCharacter.skills[2].mana_cost+" Mana");
    $("#ch-skill4-mana-cost").text("-"+mainCharacter.skills[3].mana_cost+" Mana");

    
    $("#en-health").width(Math.round(enemy.health/enemy.max_health*100)+"%");
    $("#en-health").text("Health:"+enemy.health);
    $("#en-skill1").text("1."+enemy.skills[0].name);
    $("#en-skill2").text("2."+enemy.skills[1].name);
    $("#en-skill3").text("3."+enemy.skills[2].name);
    $("#en-skill4").text("4."+enemy.skills[3].name);
    
    $("#en-mana").text("Mana:"+enemy.mana);
    $("#en-mana").width(Math.round(enemy.mana/enemy.max_mana*100)+"%");
    $("#en-skill1-mana-cost").text("+5 Mana");
    $("#en-skill2-mana-cost").text("-"+enemy.skills[1].mana_cost+" Mana");
    $("#en-skill3-mana-cost").text("-"+enemy.skills[2].mana_cost+" Mana");
    $("#en-skill4-mana-cost").text("-"+enemy.skills[3].mana_cost+" Mana");
}

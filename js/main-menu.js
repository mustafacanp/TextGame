
/* Load Menu */
function loadScreen(menu){
    if(menu == "character"){
        $("#character-menu").show();
        is_screen_loaded = true;
        characterUI(mainCharacter);
    } else if(menu == "skill"){
        $("#skills-menu").show();
        is_screen_loaded = true;
        skillsUI(mainCharacter);
    } else if(menu == "inventory"){
        $("#container2").html("inventory");
    } else if(menu == "map"){
        $("#container2").html("map");
    }
}
function saveGame(){
    console.log("Saving...");
    // pc'ye cookie bırakıp ajax ile verileri gönderecek
}
function loadGame(){
    console.log("Loading...");
    // pc'den cookie alıp ajax ile verileri getirecek
}
/* Load Menu */

function hideAllMenus(){
    $("#skills-menu").hide();
    $("#character-menu").hide();
}

/* Fight Screen UI */
function fightUI(mainCharacter, enemy){
    $("#ch-health").width(Math.round(mainCharacter.getHealth()/mainCharacter.getMaxHealth()*100)+"%");
    $("#ch-health").html("Health:"+mainCharacter.getHealth());
    $("#ch-skill1").html("[1]."+mainCharacter.getSkill(0).name+isSkillAvailable(mainCharacter, 0));
    $("#ch-skill2").html("[2]."+mainCharacter.getSkill(1).name+isSkillAvailable(mainCharacter, 1));
    $("#ch-skill3").html("[3]."+mainCharacter.getSkill(2).name+isSkillAvailable(mainCharacter, 2));
    $("#ch-skill4").html("[4]."+mainCharacter.getSkill(3).name+isSkillAvailable(mainCharacter, 3));
    
    $("#ch-mana").html("Mana:"+mainCharacter.getMana());
    $("#ch-mana").width(Math.round(mainCharacter.getMana()/mainCharacter.getMaxMana()*100)+"%");
    $("#ch-skill1-mana-cost").html("+"+mainCharacter.getSkill(0).mana_regen+" Mana");
    $("#ch-skill2-mana-cost").html("-"+mainCharacter.getSkill(1).mana_cost+" Mana");
    $("#ch-skill3-mana-cost").html("-"+mainCharacter.getSkill(2).mana_cost+" Mana");
    $("#ch-skill4-mana-cost").html("-"+mainCharacter.getSkill(3).mana_cost+" Mana");

    
    $("#en-health").width(Math.round(enemy.getHealth()/enemy.getMaxHealth()*100)+"%");
    $("#en-health").html("Health:"+enemy.getHealth());
    $("#en-skill1").html("[1]."+enemy.getSkill(0).name+isSkillAvailable(enemy, 0));
    $("#en-skill2").html("[2]."+enemy.getSkill(1).name+isSkillAvailable(enemy, 1));
    $("#en-skill3").html("[3]."+enemy.getSkill(2).name+isSkillAvailable(enemy, 2));
    $("#en-skill4").html("[4]."+enemy.getSkill(3).name+isSkillAvailable(enemy, 3));

    $("#en-mana").html("Mana:"+enemy.getMana());
    $("#en-mana").width(Math.round(enemy.getMana()/enemy.getMaxMana()*100)+"%");
    $("#en-skill1-mana-cost").html("+"+enemy.getSkill(0).mana_regen+" Mana");
    $("#en-skill2-mana-cost").html("-"+enemy.getSkill(1).mana_cost+" Mana");
    $("#en-skill3-mana-cost").html("-"+enemy.getSkill(2).mana_cost+" Mana");
    $("#en-skill4-mana-cost").html("-"+enemy.getSkill(3).mana_cost+" Mana");
}

/* Skills Screen UI */
function skillsUI(character){
    for(var i = 1; i <=4; i++){
        var skill = mainCharacter.getSkill(i-1);
        var skill_type_string = (skill.type == "atk") ? "Attack" : "Magic";
        var skill_type_stat = (skill.type == "atk") ? mainCharacter.getStrength() : mainCharacter.getIntelligence();
        var mana_cost = (skill.mana_cost != 0) ? skill.mana_cost+" Mana" : "None";
        var cooldown = (skill.cooldown != 0) ? skill.cooldown+ " Turns" : "None";
        var skill_type_string_lower = skill_type_string.charAt(0).toLowerCase()+skill_type_string.slice(1);
        
        $(".skill"+i).html("<div class='name'>["+i+"] "+skill.name+"<span class='"+skill_type_string_lower+"'>("+skill_type_string+")</span></div>");
        $(".skill"+i).append("<div class='damage'><span class='yellow'>Damage: </span>"+skill.base_damage+" + <span class='"+skill_type_string_lower+"'>"+Math.round(skill.damage_rate * skill_type_stat)+"</span></div>");
        $(".skill"+i).append("<div class='description'>"+skill.description+"</div>");
        $(".skill"+i).append("<div class='mana_cost'>"+mana_cost+"</div>");
        $(".skill"+i).append("<div class='cooldown'>"+cooldown+"</div>");
    }
}
/*
    <div class="name">Gandalf</div>
    <div class="health-bar">100%</div>
    <div class="mana-bar">100%</div>
    <div class="strength">10</div>
    <div class="intelligence">10</div>
    <div class="defense">10</div>
    <div class="magic_resistance">10</div>
    <div class="evade">3%</div>
    <div class="critical_rate">15%</div>
    <div class="critical_damage">200%</div>
*/
function characterUI(character){
    $("#character-menu .name").text(character.getName());
    $("#character-menu .health-bar").text(character.getHealth());
    $("#character-menu .mana-bar").text(character.getMana());
    $("#character-menu .strength").text("Strength: "+character.getStrength());
    $("#character-menu .intelligence").text("Intelligence: "+character.getIntelligence());
    $("#character-menu .defense").text("Defense: "+character.getDefense());
    $("#character-menu .magic_resistance").text("Magic Resistance: "+character.getMagic_resistance());
    $("#character-menu .evade").text("Evade Rate: "+character.getEvade());
    $("#character-menu .critical_rate").text("Critical Rate: "+character.getCritical_rate());
    $("#character-menu .critical_damage").text("Critical Damage: "+character.getCritical_damage());
}
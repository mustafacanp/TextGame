
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
}

/* Fight Screen UI */
function fightUI(mainCharacter, enemy){
    $("#ch-health").width(Math.round(mainCharacter.health/mainCharacter.max_health*100)+"%");
    $("#ch-health").html("Health:"+mainCharacter.health);
    $("#ch-skill1").html("[1]."+mainCharacter.skills[0].name+isSkillAvailable(mainCharacter, 0));
    $("#ch-skill2").html("[2]."+mainCharacter.skills[1].name+isSkillAvailable(mainCharacter, 1));
    $("#ch-skill3").html("[3]."+mainCharacter.skills[2].name+isSkillAvailable(mainCharacter, 2));
    $("#ch-skill4").html("[4]."+mainCharacter.skills[3].name+isSkillAvailable(mainCharacter, 3));
    
    $("#ch-mana").html("Mana:"+mainCharacter.mana);
    $("#ch-mana").width(Math.round(mainCharacter.mana/mainCharacter.max_mana*100)+"%");
    $("#ch-skill1-mana-cost").html("+"+mainCharacter.skills[0].mana_regen+" Mana");
    $("#ch-skill2-mana-cost").html("-"+mainCharacter.skills[1].mana_cost+" Mana");
    $("#ch-skill3-mana-cost").html("-"+mainCharacter.skills[2].mana_cost+" Mana");
    $("#ch-skill4-mana-cost").html("-"+mainCharacter.skills[3].mana_cost+" Mana");

    
    $("#en-health").width(Math.round(enemy.health/enemy.max_health*100)+"%");
    $("#en-health").html("Health:"+enemy.health);
    $("#en-skill1").html("[1]."+enemy.skills[0].name+isSkillAvailable(enemy, 0));
    $("#en-skill2").html("[2]."+enemy.skills[1].name+isSkillAvailable(enemy, 1));
    $("#en-skill3").html("[3]."+enemy.skills[2].name+isSkillAvailable(enemy, 2));
    $("#en-skill4").html("[4]."+enemy.skills[3].name+isSkillAvailable(enemy, 3));

    $("#en-mana").html("Mana:"+enemy.mana);
    $("#en-mana").width(Math.round(enemy.mana/enemy.max_mana*100)+"%");
    $("#en-skill1-mana-cost").html("+"+enemy.skills[0].mana_regen+" Mana");
    $("#en-skill2-mana-cost").html("-"+enemy.skills[1].mana_cost+" Mana");
    $("#en-skill3-mana-cost").html("-"+enemy.skills[2].mana_cost+" Mana");
    $("#en-skill4-mana-cost").html("-"+enemy.skills[3].mana_cost+" Mana");
}

/* Skills Screen UI */
function skillsUI(character){
    for(var i = 1; i <=4; i++){
        var skill = character.skills[i-1];
        var skill_type_string = (skill.type == "atk") ? "Attack" : "Magic";
        var skill_type_stat = (skill.type == "atk") ? character.strength : character.intelligence;
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
    $("#character-menu .name").text(character.name);
    $("#character-menu .health-bar").text(character.health);
    $("#character-menu .mana-bar").text(character.mana);
    $("#character-menu .strength").text("Strength: "+character.strength);
    $("#character-menu .intelligence").text("Intelligence: "+character.intelligence);
    $("#character-menu .defense").text("Defense: "+character.defense);
    $("#character-menu .magic_resistance").text("Magic Resistance: "+character.magic_resistance);
    $("#character-menu .evade").text("Evade Rate: "+character.evade);
    $("#character-menu .critical_rate").text("Critical Rate: "+character.critical_rate);
    $("#character-menu .critical_damage").text("Critical Damage: "+character.critical_damage);
}

/* Damage */
function getSkillDamage(character, enemy, skill_id, is_main_character){
    actionType = "skill";
    var skill, damage, skill_type_stat, def_type_stat, crit_luck, evade_luck, damage_multipler, is_crit, is_evade, is_heal;
    
    skill = character.skills[skill_id-1];

    /* is Cooldown Available */
    if(skill.cooldown != 0){ // skillin cooldownu varsa
        if(skill.current_cooldown != 0){
            //console.log("Cooldown = "+skill.cooldown);
            //console.log("Current Cooldown = "+skill.current_cooldown);
            return "cooldown";
        } else if (skill.current_cooldown == 0 && character.mana >= skill.mana_cost) { // 1. skill (Cooldownsuz)) { // current_cooldown = 0 ise (şuan bekleme süresi yok ise) bekleme süresine sok
            for(i=1; i<=3; i++){
                character.skills[i].current_cooldown--;
                if(character.skills[i].current_cooldown < 0){
                    character.skills[i].current_cooldown = 0;
                }
            }
            skill.current_cooldown = skill.cooldown;
        }
    } else { // 1. skill (Cooldownsuz)
        for(i = 1; i <= 3; i++){
            character.skills[i].current_cooldown--;
            if(character.skills[i].current_cooldown < 0){
                character.skills[i].current_cooldown = 0;
            }
        }
        skill.current_cooldown = skill.cooldown;
    }
    /* is Cooldown Available */

    /* is Mana Enough */
    if(skill.mana_cost){
        if(character.mana < skill.mana_cost){
            return "no_mana";
        } else {
            character.mana -= skill.mana_cost;
        }
    }
    /* is Mana Enough */


    /* Buff */
    if(skill.buff){
        skill.buff(character, enemy);
    }
    if(character.health > character.max_health){
        character.health = character.max_health;
    }
    if(character.mana > character.max_mana){
        character.mana = character.max_mana;
    }
    /* Buff */

    /*Evade*/
    evade_luck = getRandomInt(1,100);
    if(evade_luck <= enemy.evade){
        is_evade = true;
        if(is_main_character){
            cout(enemy.name+" evaded your attack.","purple");
        } else {
            cout("Evaded "+enemy.name+"'s attack.","purple");
        }
        return 0;
    }

    skill_type_stat = (skill.type == "atk") ? character.strength : character.intelligence;

    /*Stat Damage*/
    damage = Math.round(skill_type_stat * skill.damage_rate * getRandomInt(80,130)/100);
    
    /*Add Base Damage*/
    damage = damage + skill.base_damage;

    /*Crit*/
    crit_luck = getRandomInt(1,100); // Crit ihtimali için sayı oluştur.
    if(character.temporary.critical_rate){
        if(crit_luck <= character.temporary.critical_rate){ // Sayı karakterin şansının içindeyse critical_damage katı vur.
            is_crit = true;
            if(character.temporary.critical_damage){
                damage *= character.temporary.critical_damage;
            } else {
                damage *= character.critical_damage;
            }
        }
    } else {
        if(crit_luck <= character.critical_rate){ // Sayı karakterin şansının içindeyse critical_damage katı vur.
            is_crit = true;
            if(character.temporary.critical_damage){
                damage *= character.temporary.critical_damage;
            } else {
                damage *= character.critical_damage;
            }
        }
    }

    /*Defense - Magic Resistance*/
    def_type_stat = (skill.type == "atk") ? enemy.defense : enemy.magic_resistance;
    damage_multipler = 100 / (100 + def_type_stat); // if(def_type_stat < 0) { damage_multipler = 2 - (100 / (100 - enemy.def_type_stat)) };
    damage = Math.round(damage * damage_multipler);
    
    if(skill.extraDamage){
        damage += skill.extraDamage(character, enemy);
    }

    /*Heal*/

    /* COUT */
    if(is_crit){
        if(is_main_character){
            cout("You used "+skill.name+". Hit "+damage+". Critical Hit!","green");
        } else {
            cout(character.name+" used "+skill.name+". Hit "+damage+". Critical Hit!","red");
        }
    } else {
        if(is_main_character){
            cout("You used "+skill.name+". Hit "+damage+".","green");
        } else {
            cout(character.name+" used "+skill.name+". Hit "+damage+".","red");
        }
    }
    if(skill.heal){
        var healed_hp = skill.heal(character, enemy);
        is_heal = true;
        if (healed_hp == false){ is_heal = false; } // Random tutmadıysa.
        if (healed_hp == "max_healed"){ character.health = character.max_health; } // Fulleme ise.
        else { character.health += healed_hp; } // Normal heal ise.
        if(character.health > character.max_health){ character.health = character.max_health; } // Can max candan fazla ise.

        if(is_heal){
            if(is_main_character && healed_hp != "max_healed"){ // Ana karakter normal heal
                cout("You healed " + healed_hp + " HP.","green");
            } else if (is_main_character && healed_hp == "max_healed") { // Ana karakter full heal
                cout("You full healed your HP!","green");
            } else if (!is_main_character && healed_hp != "max_healed") { // Rakip normal heal
                cout(character.name + " healed " + healed_hp + " HP.","red");
            } else if (!is_main_character && healed_hp == "max_healed") { // Rakip full heal
                cout(character.name + " full healed his HP!","green");
            }
        }

    }

    character.temporary.strength = 0;
    character.temporary.intelligence = 0;
    character.temporary.defense = 0;
    character.temporary.magic_resistance = 0;
    character.temporary.evade = 0;
    character.temporary.critical_rate = 0;
    character.temporary.critical_damage = 0;

    enemy.temporary.strength = 0;
    enemy.temporary.intelligence = 0;
    enemy.temporary.defense = 0;
    enemy.temporary.magic_resistance = 0;
    enemy.temporary.evade = 0;
    enemy.temporary.critical_rate = 0;
    enemy.temporary.critical_damage = 0;

    return damage;
}
/* Damage */




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
        cout("YOU WIN!","green"); //TODO EXP
        cout("Get xxx Gold.","green"); //TODO EXP
        cout("Get xxx EXP.","green"); //TODO EXP
        return;
    }

    // Enenmy(AI) Damage
    var random_skill, dmg2;
    do{
        if(enemy.mana < enemy.skills[3].mana_cost && enemy.health * 5/4 < mainCharacter.health){ // Manası ultiye yetmiyor ve canı bizden az ise:
            dmg2 == "ulti_degil";
            dmg2 = getSkillDamage(enemy, mainCharacter, 1, 0); // Basic attack yap.
        } else { // Manası ultiye yetiyor ise:
            dmg2 = getSkillDamage(enemy, mainCharacter, 4, 0); // Rakip ulti attı.
            if(dmg2 == "no_mana" || dmg2 == "cooldown"){
                random_skill = getRandomInt(1,4);
                dmg2 = getSkillDamage(enemy, mainCharacter, random_skill, 0); // Rakip skill kullandı.
            }
        }
        
    } while (dmg2 == "no_mana" || dmg2 == "cooldown" || dmg2 == "ulti_degil");
    if (dmg2 != 0){
        mainCharacter.health -= dmg2;
    }
    if(mainCharacter.health <= 0){
        mainCharacter.health = 0;
        action_type = 0;
        cout("YOU LOSE!","red");
    }
    cout("-----");
}




/* Cooldown & Mana Control */
function isSkillAvailable(character, skillID){
    if(skillID == 0){
        return "<br /><span class='small green'>Ready!</span>";
    } else {
        if(character.skills[skillID].current_cooldown == 0){
            if(character.skills[skillID].mana_cost > character.mana){
                return "<br /><span class='small blue'>Not Enough Mana</span>";
            } else {
                return "<br /><span class='small green'>Ready!</span>";
            }
        } else {
            return "<br /><span class='small purple'>Cooldown: "+character.skills[skillID].current_cooldown+"</span>";
        }
    }
}








Skills = {
    gandalf1 : {
        name : "Attack",
        base_damage: 3,
        damage_rate : 0.7,
        type : "atk",
        mana_regen: 5,
        mana_cost: 0,
        cooldown: 0,
        buff: function(character, enemy){
            character.mana += 5;
        },
        description: "Basic attack skill. Gives 5 Mana.",
    },
    gandalf2 : {
        name : "W",
        base_damage: 8,
        damage_rate : 0.8,
        type : "magic",
        mana_cost: 10,
        cooldown: 2,
        current_cooldown: 0,
        buff: function(character, enemy){
            if(enemy.magic_resistance > 0){
                enemy.magic_resistance -= enemy.magic_resistance * 20/100;
                enemy.magic_resistance = Math.round(enemy.magic_resistance);
            }
        },
        description: "Enemy's magic resistance -%20",
        
    },
    gandalf3 : {
        name : "E",
        base_damage: 7,
        damage_rate : 1,
        type : "magic",
        mana_cost: 10,
        cooldown: 3,
        current_cooldown: 0,
        description: "%5 şansla canını fuller.(Can değerin %30'un altındaysa %20 ihtimalle canını fuller.)",
        heal: function(character, enemy){
            var random = getRandomInt(1,100);
            if(character.health <= character.max_health * 3/10){
                if(random <= 20){
                    return "max_healed";
                } else {
                    return false;
                }
            } else {
                if(random <= 5){
                    return "max_healed";
                } else {
                    return false;
                }
            }
        }
    },
    gandalf4 : {
        name : "Ultimate",
        base_damage: 10,
        damage_rate : 1.2,
        type : "magic",
        mana_cost: 35,
        cooldown: 5,
        current_cooldown: 5,
        buff: function(character, enemy){
            enemy.magic_resistance -= enemy.magic_resistance*3/10;
            enemy.magic_resistance = Math.round(enemy.magic_resistance);
        },
        description: "Canını %15 doldurur ve rakibin büyü direncini %30 azaltır.",
        heal: function(character, enemy){
            return Math.floor(character.max_health*15/100);
        }
    },

    saruman1 : {
        name : "Attack",
        base_damage: 2,
        damage_rate : 0.7,
        type : "atk",
        mana_regen: 7,
        mana_cost: 0,
        cooldown: 0,
        buff: function(character, enemy){
            character.mana += 7;
        },
        description: "Basic attack skill. Gives 7 Mana.",
    },
    saruman2 : {
        name : "W",
        base_damage: 5,
        damage_rate : 1,
        type : "magic",
        mana_cost: 10,
        cooldown: 2,
        current_cooldown: 0,
        buff: function(character, enemy){
            enemy.magic_resistance -= enemy.magic_resistance/15;
            enemy.magic_resistance = Math.round(enemy.magic_resistance);
        },
        description: "Enemy's magic resistance -%15",
    },
    saruman3 : {
        name : "E",
        base_damage: 8,
        damage_rate : 0.7,
        type : "magic",
        mana_cost: 20,
        cooldown: 3,
        current_cooldown: 0,
        buff: function(character, enemy){
            var random = getRandomInt(1,100);
            if(random <= 50){
                character.mana += 20;
            }
            character.temporary.critical_rate = 30;
        },
        description: "%50 şansla Mana tüketmez ve %30 şansla crit vurur.",
    },
    saruman4 : {
        name : "Ultimate",
        base_damage: 10,
        damage_rate : 1,
        type : "magic",
        mana_cost: 30,
        cooldown: 5,
        current_cooldown: 5,
        description: "Damage + rakibin o anki can değerinin %15'i vurur. Kendi can değerine max can değerinin %10'u heal yapar.",
        extraDamage: function(character, enemy){
            return Math.floor(enemy.health*15/100);
        },
        heal: function(character, enemy){
            return Math.floor(character.max_health*1/10);
        }
    },

    analkin1 : {
        name : "Light Saber Strike",
        base_damage: 5,
        damage_rate : 0.7,
        type : "atk",
        mana_regen: 4,
        mana_cost: 0,
        cooldown: 0,
        buff: function(character, enemy){
            character.mana += 4;
        },
        description: "Basic attack skill. Gives 4 Mana.",
    },
    analkin2 : {
        name : "Force Grab",
        base_damage: 10,
        damage_rate : 0.8,
        type : "magic",
        mana_cost: 12,
        cooldown: 2,
        current_cooldown: 0,
        buff: function(character, enemy){
            if(character.evade < 20){
                character.evade += 1;
            }
            //console.log(character.evade);
        },
        description: "Increases Evade %1. (Max %20)",
    },
    analkin3 : {
        name : "Pew / Pew",
        base_damage: 5,
        damage_rate : 1.5,
        type : "atk",
        mana_cost: 20,
        cooldown: 3,
        current_cooldown: 0,
        buff: function(character, enemy){
            enemy.defense -= enemy.defense/10;
            enemy.defense = Math.round(enemy.defense);
        },
        description: "Rakibin defansını %10 azaltır.",
    },
    analkin4 : {
        name : "Oppi",
        base_damage: 5,
        damage_rate : 1.2,
        type : "magic",
        mana_cost: 30,
        cooldown: 5,
        current_cooldown: 5,
        buff: function(character, enemy){
            enemy.mana -= Math.floor(enemy.mana*3/10); //!
        },
        description: "Damage + rakibin o anki can değerinin %10'u vurur, o anki mana değerinin %30'unu tüketir. Kendi can değerine o anki can değerinin %15'i heal yapar.",
        extraDamage: function(character, enemy){
            return Math.floor(enemy.health*1/10);
        },
        heal: function(character, enemy){
            return Math.floor(character.health*15/100);
        }
    }

}


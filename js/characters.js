
function getSkillDamage(character, enemy, skill_id, is_main_character){
    actionType = "skill";
    var skill, damage, skill_type_stat, def_type_stat, crit_luck, evade_luck, damage_multipler, is_crit, is_evade;
    
    //console.log(character);
    skill = character.skills[skill_id-1];
    //console.log(skill);

    // is Mana Enough
    if(skill.mana_cost){
        if(character.mana < skill.mana_cost){
            return "no_mana";
        } else {
            character.mana -= skill.mana_cost;
        }
    }
    // is Mana Enough
    
    // is Cooldown Available
    if(skill.cooldown != 0){ // skillin cooldownu varsa
        if(skill.current_cooldown != 0){
            //console.log("Cooldown = "+skill.cooldown);
            //console.log("Current Cooldown = "+skill.current_cooldown);
            return "cooldown";
        } else { // current_cooldown = 0 ise (şuan bekleme süresi yok ise) bekleme süresine sok
            for(i=1; i<=3; i++){
                character.skills[i].current_cooldown--;
                if(character.skills[i].current_cooldown < 0){
                    character.skills[i].current_cooldown = 0;
                }
            }
            skill.current_cooldown = skill.cooldown;
        }
    } else { // 1. skill (Cooldownsuz)
        for(i=1; i<=3; i++){
            character.skills[i].current_cooldown--;
            if(character.skills[i].current_cooldown < 0){
                character.skills[i].current_cooldown = 0;
            }
        }
        skill.current_cooldown = skill.cooldown;
    }
    // is Cooldown Available
    
    if(skill.buff){
        skill.buff(character, enemy);
    }
    if(character.health > character.max_health){
        character.health = character.max_health;
    }
    if(character.mana > character.max_mana){
        character.mana = character.max_mana;
    }



    /*Evade*/
    evade_luck = getRandomInt(1,100);
    if(evade_luck <= enemy.evade){
        is_evade = true;
        return 0;
    }

    skill_type_stat = (skill.type == "atk") ? character.attack : character.intelligence;

    /*Damage*/
    damage = Math.round(skill_type_stat * skill.damageRate * getRandomInt(80,130)/100);
    
    /*Crit*/
    crit_luck = getRandomInt(1,100) / 100; // Crit ihtimali için sayı oluştur.
    if(crit_luck <= character.critical_rate){ // Sayı karakterin şansının içindeyse critical_damage katı vur.
        is_crit = true;
        if(is_main_character){
            cout("","Critical Hit!.","green",0);
        } else {
            cout("","Critical Hit!.","red",0);
        }
        damage *= character.critical_damage;
    }

    /*Defense - Magic Resistance*/
    def_type_stat = (skill.type == "atk") ? enemy.defense : enemy.magic_resistance;
    damage_multipler = 100 / (100 + def_type_stat); // if(def_type_stat < 0) { damage_multipler = 2 - (100 / (100 - enemy.def_type_stat)) };
    damage = Math.round(damage * damage_multipler);
    

    return damage;
}




var Characters = {
    gandalf : {
        id: 1,
        name: "Gandalf",
        max_health: 500, // Health değeri biraz fazla olsun hemen ölürler :D
        health: 500,
        max_mana: 100,
        mana: 100,
        attack: 12,
        defense: 22,
        magic_resistance: 30,
        speed : 1, // ???
        intelligence: 55,
        evade: 10, // %0 - %100
        critical_rate: 0.15,
        critical_damage: 2,
        skills: [
            skill1 = {
                name : "Attack",
                damageRate : 0.7,
                type : "atk",
                mana_cost: 0,
                cooldown: 0,
                buff: function(character, enemy){
                    character.mana += 5;
                }
            },
            skill2 = {
                name : "W",
                damageRate : 0.8,
                type : "magic",
                mana_cost: 10,
                cooldown: 2,
                current_cooldown: 0,
                    buff: function(character, enemy){
               //   character.evade += 0.01/character.evade;
                }
                
            },
            skill3 = {
                name : "E",
                damageRate : 1,
                type : "magic",
                mana_cost: 10,
                cooldown: 3,
                current_cooldown: 0,
            },
            ulti = {
                name : "R",
                damageRate : 1.2,
                type : "magic",
                mana_cost: 35,
                cooldown: 5,
                current_cooldown: 5,
                buff: function(character, enemy){
                    character.health += character.health*1/5;
                    enemy.magic_resistance -= enemy.magic_resistance*3/10
                }
            }
        ]
    },

    saruman : {
        id: 1,
        name: "Saruman",
        max_health: 5500, // Health değeri biraz fazla olsun hemen ölürler :D
        health: 5500,
        max_mana: 250,
        mana: 250,
        attack: 155,
        defense: 25,
        speed : 1, // ???
        magic_resistance: 35,
        intelligence: 50,
        evade: 10, // %0 - %100
        critical_rate: 0.18,
        critical_damage: 2,
        skills: [
            skill1 = {
                name : "Attack",
                damageRate : 0.7,
                type : "atk",
                mana_cost: 0,
                cooldown: 0,
                 buff: function(character, enemy){
                    character.mana += 7;
                }
            },
            skill2 = {
                name : "W",
                damageRate : 1,
                type : "magic",
                mana_cost: 10,
                cooldown: 2,
                current_cooldown: 0,
                   buff: function(character, enemy){
                        enemy.defense -= enemy.defense/10;
                }
            },
            skill3 = {
                name : "E",
                damageRate : 0.5,
                type : "magic",
                mana_cost: 12,
                cooldown: 3,
                current_cooldown: 0,
            },
            ulti = {
                name : "R",
                damageRate : 1.2,
                type : "magic",
                mana_cost: 30,
                cooldown: 5,
                current_cooldown: 5,
                  buff: function(character, enemy){
                        enemy.health -= Math.floor(enemy.health*2/10);
                        character.health += Math.floor(character.health*2/10);
                }
            }
        ]
    },

     analkin : {
        id: 1,
        name: "Analkin",
        max_health: 5500, // Health değeri biraz fazla olsun hemen ölürler :D
        health: 5500,
        max_mana: 250,
        mana: 250,
        attack: 155,
        defense: 25,
        speed : 1, // ???
        magic_resistance: 35,
        intelligence: 50,
        evade: 10, // %0 - %100
        critical_rate: 0.18,
        critical_damage: 2,
        skills: [
            skill1 = {
                name : "Light Saber Strike",
                damageRate : 0.7,
                type : "atk",
                cooldown: 0,
                   buff: function(character, enemy){
                    character.mana += 4;
                }
            },
            skill2 = {
                name : "Force Grab",
                damageRate : 0.8,
                type : "magic",
                mana_cost: 20,
                cooldown: 2,
                current_cooldown: 0,
                    buff: function(character, enemy){
                    if(character.evade < 20){
                        character.evade += 1;
                    }
                    //console.log(character.evade);
                }
            },
            skill3 = {
                name : "Pew / Pew",
                damageRate : 2,
                type : "magic",
                mana_cost: 12,
                cooldown: 3,
                current_cooldown: 0,
                buff: function(character, enemy){
                    enemy.defense -= enemy.defense/10;
                    enemy.defense = Math.round(enemy.defense);
                }
            },
            ulti = {
                name : "Oppi",
                damageRate : 1.2,
                type : "magic",
                mana_cost: 30,
                cooldown: 5,
                current_cooldown: 5,
                buff: function(character, enemy){
                    enemy.mana -= Math.floor(enemy.mana*5/10); //!
                    enemy.health -= Math.floor(enemy.health*1/10);
                    character.health += Math.floor(character.health*2/10);
                }
            }
        ]
    }


}

function getSkillDamage(character, enemy, skill_id, is_main_character){
    actionType = "skill";
    var skill, damage, skill_type_stat, def_type_stat, crit_luck, evade_luck, damage_multipler, is_crit, is_evade;
    
    //console.log(character);
    skill = character.skills[skill_id-1];
    //console.log(skill);

    if(skill.mana_cost){
        if(character.mana < skill.mana_cost){
            return "no_mana";
        } else {
            character.mana -= skill.mana_cost;
        }
    }
    if(skill.buff){
        skill.buff(character);
    }

    /*Evade*/
    evade_luck = getRandomInt(1,100)/100;
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
        max_health: 130, // Health değeri biraz fazla olsun hemen ölürler :D
        health: 130,
        mana: 100,
        attack: 10,
        defense: 20,
        magic_resistance: 30,
        speed : 1, // ???
        intelligence: 55,
        evade: 0.1, // %0 - %100
        critical_rate: 0.15,
        critical_damage: 2,
        skills: [
            skill1 = {
                name : "Yirmih",
                damageRate : 0.13,
                type : "atk",
                mana_cost: 0
            },
            skill2 = {
                name : "W",
                damageRate : 0.2,
                type : "magic",
                mana_cost: 10
            },
            skill3 = {
                name : "E",
                damageRate : 0.22,
                type : "magic",
                mana_cost: 10
            },
            ulti = {
                name : "R",
                damageRate : 0.25,
                type : "magic",
                mana_cost: 20,
                buff: function(character){
                    character.health += 5;
                    if(character.health > character.max_health){
                        character.health = character.max_health;
                    }
                }
            }
        ]
    },
    saruman : {
        id: 1,
        name: "Saruman",
        max_health: 120, // Health değeri biraz fazla olsun hemen ölürler :D
        health: 120,
        mana: 100,
        attack: 15,
        defense: 25,
        speed : 1, // ???
        magic_resistance: 35,
        intelligence: 50,
        evade: 0.1, // %0 - %100
        critical_rate: 0.18,
        critical_damage: 2,
        skills: [
            skill1 = {
                name : "Depik",
                damageRate : 0.14,
                type : "atk",
                mana_cost: 0
            },
            skill2 = {
                name : "W",
                damageRate : 0.2,
                type : "magic",
                mana_cost: 10
            },
            skill3 = {
                name : "E",
                damageRate : 0.25,
                type : "magic",
                mana_cost: 12
            },
            ulti = {
                name : "R",
                damageRate : 0.3,
                type : "magic",
                mana_cost: 15
            }
        ]
    },
}
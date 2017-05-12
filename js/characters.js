
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
    if(character.health > character.max_health){
        character.health = character.max_health;
    }
    if(character.mana > character.max_mana){
        character.mana = character.max_mana;
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
        max_health: 500, // Health değeri biraz fazla olsun hemen ölürler :D
        health: 500,
        max_mana: 100,
        mana: 100,
        attack: 12,
        defense: 22,
        magic_resistance: 30,
        speed : 1, // ???
        intelligence: 55,
        evade: 0.1, // %0 - %100
        critical_rate: 0.15,
        critical_damage: 2,
        skills: [
            skill1 = {
                name : "Attack",
                damageRate : 0.7,
                type : "atk",
                mana_cost: 0
            },
            skill2 = {
                name : "W",
                damageRate : 0.8,
                type : "magic",
                mana_cost: 10,
                    buff: function(character){
               //   character.evade += 0.01/character.evade;
                }
                
            },
            skill3 = {
                name : "E",
                damageRate : 1,
                type : "magic",
                mana_cost: 10
            },
            ulti = {
                name : "R",
                damageRate : 1.2,
                type : "magic",
                mana_cost: 20,
                buff: function(character){
                    character.health += 5;
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
        mana: 100,
        attack: 155,
        defense: 25,
        speed : 1, // ???
        magic_resistance: 35,
        intelligence: 50,
        evade: 0.1, // %0 - %100
        critical_rate: 0.18,
        critical_damage: 2,
        skills: [
            skill1 = {
                name : "Attack",
                damageRate : 0.7,
                type : "atk",
                mana_cost: 0,
                 buff: function(character){
                    character.mana += 7;
                }
            },
            skill2 = {
                name : "W",
                damageRate : 1,
                type : "magic",
                mana_cost: 10,
                   buff: function(character){
                        Characters.analkin.defense -= character.defense/10;
                }
            },
            skill3 = {
                name : "E",
                damageRate : 0.5,
                type : "magic",
                mana_cost: 12,
                  buff: function(character){
                        Characters.analkin.health -= Math.floor(Characters.analkin.health*2/10);
                        character.health += Math.floor(character.health*2/10);
                }
            },
            ulti = {
                name : "R",
                damageRate : 1.2,
                type : "magic",
                mana_cost: 15
            }
        ]
    },




        analkin : {


        id: 1,
        name: "Analkin",
        max_health: 5500, // Health değeri biraz fazla olsun hemen ölürler :D
        health: 5500,
        max_mana: 250,
        mana: 100,
        attack: 155,
        defense: 25,
        speed : 1, // ???
        magic_resistance: 35,
        intelligence: 50,
        evade: 0.1, // %0 - %100
        critical_rate: 0.18,
        critical_damage: 2,
        skills: [
            skill1 = {
                name : "Light Saber Strike",
                damageRate : 0.7,
                type : "atk",
                   buff: function(character){
                    character.mana += 4;
                }
            },
            skill2 = {
                name : "Force Grab",
                damageRate : 0.8,
                type : "magic",
                mana_cost: 20,
                  buff: function(character){
                    character.evade += 0.01/character.evade;
                }
            },
            skill3 = {
                name : "Pew / Pew",
                damageRate : 2,
                type : "magic",
                mana_cost: 12,
                buff: function(character){
                    character.defense -= character.defense/10;
                 //   console.log(character.defense);
                }
            },
            ulti = {
                 name : "Oppi",
                damageRate : 1.2,
                type : "magic",
                mana_cost: 15,
                buff: function(character){
                Characters.saruman.mana -= Math.floor(Characters.saruman.mana*3/10); //!
                Characters.saruman.health -= Math.floor(Characters.saruman.health*1/10);
                character.health += Math.floor(Characters.saruman.health*2/10);
                
              

                }
            }
        ]
    }


}
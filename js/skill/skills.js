
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
            character.manaUp(5);
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
            if(enemy.getMagicResistance() > 0){
                enemy.setMagicResistance(Math.round(enemy.getMagicResistance() * 1 / 5));
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
            if(character.getHealth() <= character.getMaxHealth() * 3 / 10){
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
            enemy.magicResistanceDown(Math.round(enemy.getMagicResistance() * 3 / 10));
        },
        description: "Canını %15 doldurur ve rakibin büyü direncini %30 azaltır.",
        heal: function(character, enemy){
            return Math.floor(character.getMaxHealth()*15/100);
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
            character.manaUp(7);
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
            enemy.magicResistanceDown(Math.round( enemy.getMagicResistance() * 1 / 15));
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
                character.manaUp(20);
            }
            character.getTemporary().critical_rate = 30;
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
            return Math.floor(enemy.getHealth() * 15 / 100);
        },
        heal: function(character, enemy){
            return Math.floor(character.getMaxHealth() * 1 / 10);
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
            character.manaUp(4);
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
            if(character.getEvade() < 20){
                character.evadeUp(1);
            }
            //console.log(character.getEvade());
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
            enemy.defenseDown(Math.round(enemy.getDefense() / 10));
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
            enemy.manaDown(Math.floor(enemy.getMana() * 3 / 10)); //!
        },
        description: "Damage + rakibin o anki can değerinin %10'u vurur, o anki mana değerinin %30'unu tüketir. Kendi can değerine o anki can değerinin %15'i heal yapar.",
        extraDamage: function(character, enemy){
            return Math.floor(enemy.getHealth() * 1 / 10);
        },
        heal: function(character, enemy){
            return Math.floor(character.getHealth() * 15/100);
        }
    }

}



var Characters = {
    gandalf : {
        id: 1,
        name: "Gandalf",
        max_health: 1000, // Health değeri biraz fazla olsun hemen ölürler :D
        health: 1000,
        max_mana: 100,
        mana: 100,
        strength: 6,
        defense: 10,
        magic_resistance: 8,
        speed : 1, // ???
        intelligence: 10,
        evade: 10, // %0 - %100
        critical_rate: 0.15,
        critical_damage: 2,
        skills: [
            skill1 = {
                name : "Attack",
                base_damage: 5,
                damageRate : 0.7,
                type : "atk",
                mana_cost: 0,
                cooldown: 0,
                buff: function(character, enemy){
                    character.mana += 5;
                },
                description: "Basic attack skill. Gives 5 Mana.",
            },
            skill2 = {
                name : "W",
                base_damage: 5,
                damageRate : 0.8,
                type : "magic",
                mana_cost: 10,
                cooldown: 2,
                current_cooldown: 0,
                buff: function(character, enemy){
                    if(enemy.defense > 0){
                        enemy.defense -= enemy.defense * 15/100;
                        enemy.defense = Math.round(enemy.defense);
                    }
                },
                description: "Enemy's defense -%15",
                
            },
            skill3 = {
                name : "E",
                base_damage: 5,
                damageRate : 1,
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
            ulti = {
                name : "Ultimate",
                base_damage: 5,
                damageRate : 1.2,
                type : "magic",
                mana_cost: 35,
                cooldown: 5,
                current_cooldown: 5,
                buff: function(character, enemy){
                    enemy.magic_resistance -= enemy.magic_resistance*3/10;
                    enemy.magic_resistance = Math.round(enemy.magic_resistance);
                },
                description: "Canını %10 doldurur ve rakibin büyü direncini %30 azaltır.",
                heal: function(character, enemy){
                    return Math.floor(character.max_health*1/10);
                }
            }
        ]
    },

    saruman : {
        id: 1,
        name: "Saruman",
        max_health: 1000, // Health değeri biraz fazla olsun hemen ölürler :D
        health: 1000,
        max_mana: 100,
        mana: 100,
        strength: 5,
        defense: 10,
        speed : 1, // ???
        magic_resistance: 8,
        intelligence: 10,
        evade: 10, // %0 - %100
        critical_rate: 0.18,
        critical_damage: 2,
        skills: [
            skill1 = {
                name : "Attack",
                base_damage: 5,
                damageRate : 0.7,
                type : "atk",
                mana_cost: 0,
                cooldown: 0,
                buff: function(character, enemy){
                    character.mana += 7;
                },
                description: "Basic attack skill. Gives 7 Mana.",
            },
            skill2 = {
                name : "W",
                base_damage: 5,
                damageRate : 1,
                type : "magic",
                mana_cost: 10,
                cooldown: 2,
                current_cooldown: 0,
                buff: function(character, enemy){
                    enemy.magic_resistance -= enemy.magic_resistance/15;
                    enemy.magic_resistance = Math.round(enemy.magic_resistance);
                },
                description: "Enemy's magic resistence -%15",
            },
            skill3 = {
                name : "E",
                base_damage: 5,
                damageRate : 0.5,
                type : "magic",
                mana_cost: 12,
                cooldown: 3,
                current_cooldown: 0,
                buff: function(character, enemy){
                    var random = getRandomInt(1,100);
                    if(random <= 50){
                        character.mana += 12;
                    }
                },
                description: "%50 şansla Mana tüketmez.",
            },
            ulti = {
                name : "Ultimate",
                base_damage: 5,
                damageRate : 1,
                type : "magic",
                mana_cost: 30,
                cooldown: 5,
                current_cooldown: 5,
                description: "Skill + rakibin o anki can değerinin %15'i vurur, karakterin canına max can değerinin %10'unu ekler.",
                extraDamage: function(character, enemy){
                    return Math.floor(enemy.health*15/100);
                },
                heal: function(character, enemy){
                    return Math.floor(character.max_health*1/10);
                }
            }
        ]
    },

     analkin : {
        id: 1,
        name: "Analkin",
        max_health: 1000,
        health: 1000,
        max_mana: 50,
        mana: 50,
        strength: 8,
        defense: 10,
        speed : 1, // ???
        magic_resistance: 7,
        intelligence: 10,
        evade: 10, // %0 - %100
        critical_rate: 0.18,
        critical_damage: 2,
        skills: [
            skill1 = {
                name : "Light Saber Strike",
                base_damage: 5,
                damageRate : 0.7,
                type : "atk",
                cooldown: 0,
                buff: function(character, enemy){
                    character.mana += 4;
                },
                description: "Basic attack skill. Gives 4 Mana.",
            },
            skill2 = {
                name : "Force Grab",
                base_damage: 10,
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
                },
                description: "Increases Evade %1. (Max %20)",
            },
            skill3 = {
                name : "Pew / Pew",
                base_damage: 5,
                damageRate : 2,
                type : "magic",
                mana_cost: 12,
                cooldown: 3,
                current_cooldown: 0,
                buff: function(character, enemy){
                    enemy.defense -= enemy.defense/10;
                    enemy.defense = Math.round(enemy.defense);
                },
                description: "Rakibin defansını %10 azaltır.",
            },
            ulti = {
                name : "Oppi",
                base_damage: 5,
                damageRate : 1.2,
                type : "magic",
                mana_cost: 30,
                cooldown: 5,
                current_cooldown: 5,
                buff: function(character, enemy){
                    enemy.mana -= Math.floor(enemy.mana*3/10); //!
                },
                description: "Rakibin o anki canını %10, manasını %30 düşürür. Kendi canı değerini o anki can değerinin %15'i arttırır.",
                extraDamage: function(character, enemy){
                    return Math.floor(enemy.health*1/10);
                },
                heal: function(character, enemy){
                    return Math.floor(character.health*15/100);
                }
            }
        ]
    }


}
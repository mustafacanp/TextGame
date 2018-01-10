
class Skill{

    constructor(skill) {
        this.id = skill.id;
        this.name = skill.name;
        this.base_damage = skill.base_damage;
        this.damage_rate = skill.damage_rate;
        this.type = skill.type;
        this.mana_regen = skill.mana_regen;
        this.mana_cost = skill.mana_cost;
        this.cooldown = skill.cooldown;
        this.current_cooldown = skill.current_cooldown;
        this.skill_sound = skill.skill_sound;
        this.buff = skill.buff;
        this.heal = skill.heal;
        this.extra_damage = skill.extra_damage;
        this.description = skill.description;
    }

    setId(id) { this.id = id; }
    getId() { return this.id; }

    setName(name) { this.name = name; }
    getName() { return this.name; }

    setBaseDamage(base_damage) { this.base_damage = base_damage; }
    getBaseDamage() { return this.base_damage; }

    setDamageRate(damage_rate) { this.damage_rate = damage_rate; }
    getDamageRate() { return this.damage_rate; }

    setType(type) { this.type = type; }
    getType() { return this.type; }

    setManaRegen(mana_regen) { this.mana_regen = mana_regen; }
    getManaRegen() { return this.mana_regen; }

    setManaCost(mana_cost) { this.mana_cost = mana_cost; }
    getManaCost() { return this.mana_cost; }

    setCooldown(cooldown) { this.cooldown = cooldown; }
    getCooldown() { return this.cooldown; }

    setCurrentCooldown(current_cooldown) { this.current_cooldown = current_cooldown; }
    getCurrentCooldown() { return this.current_cooldown; }

    setSkillSound(skill_sound) { this.skill_sound = skill_sound; }
    getSkillSound() { return this.skill_sound; }

    setBuff(buff) { this.buff = buff; }
    getBuff() { return this.buff; }

    setHeal(heal) { this.heal = heal; }
    getHeal() { return this.heal; }

    setExtraDamage(extra_damage) { this.extra_damage = extra_damage; }
    getExtraDamage() { return this.extra_damage; }

    setDescription(description) { this.description = description; }
    getDescription() { return this.description; }

}


Skills = {
    gandalf1 : {
        id : 1,
        name : "Attack",
        base_damage: 3,
        damage_rate : 0.7,
        type : "atk",
        mana_regen: 5,
        mana_cost: 0,
        cooldown: 0,
        current_cooldown: 0,
        skill_sound: "atk1.wav",
        buff: function(character, enemy){
            character.manaUp(5);
        },
        description: "Basic attack skill. Gives 5 Mana.",
    },
    gandalf2 : {
        id : 2,
        name : "W",
        base_damage: 8,
        damage_rate : 0.8,
        type : "magic",
        mana_cost: 10,
        cooldown: 2,
        current_cooldown: 0,
        skill_sound: "atk1.wav",
        buff: function(character, enemy){
            if(enemy.getMagicResistance() > 0){
                enemy.setMagicResistance(Math.round(enemy.getMagicResistance() * 1 / 5));
            }
        },
        description: "Enemy's magic resistance -%20",

    },
    gandalf3 : {
        id : 3,
        name : "E",
        base_damage: 7,
        damage_rate : 1,
        type : "magic",
        mana_cost: 10,
        cooldown: 3,
        current_cooldown: 0,
        skill_sound: "atk1.wav",
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
        id : 4,
        name : "Ultimate",
        base_damage: 10,
        damage_rate : 1.2,
        type : "magic",
        mana_cost: 35,
        cooldown: 5,
        current_cooldown: 5,
        skill_sound: "ulti1.wav",
        buff: function(character, enemy){
            enemy.magicResistanceDown(Math.round(enemy.getMagicResistance() * 3 / 10));
        },
        description: "Canını %15 doldurur ve rakibin büyü direncini %30 azaltır.",
        heal: function(character, enemy){
            return Math.floor(character.getMaxHealth()*15/100);
        }
    },

    saruman1 : {
        id : 5,
        name : "Attack",
        base_damage: 2,
        damage_rate : 0.7,
        type : "atk",
        mana_regen: 7,
        mana_cost: 0,
        cooldown: 0,
        current_cooldown: 0,
        skill_sound: "atk1.wav",
        buff: function(character, enemy){
            character.manaUp(7);
        },
        description: "Basic attack skill. Gives 7 Mana.",
    },
    saruman2 : {
        id : 6,
        name : "W",
        base_damage: 5,
        damage_rate : 1,
        type : "magic",
        mana_cost: 10,
        cooldown: 2,
        current_cooldown: 0,
        skill_sound: "atk1.wav",
        buff: function(character, enemy){
            enemy.magicResistanceDown(Math.round( enemy.getMagicResistance() * 15 / 100));
        },
        description: "Enemy's magic resistance -%15",
    },
    saruman3 : {
        id : 7,
        name : "E",
        base_damage: 8,
        damage_rate : 0.7,
        type : "magic",
        mana_cost: 20,
        cooldown: 3,
        current_cooldown: 0,
        skill_sound: "atk1.wav",
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
        id : 8,
        name : "Ultimate",
        base_damage: 10,
        damage_rate : 1,
        type : "magic",
        mana_cost: 30,
        cooldown: 5,
        current_cooldown: 5,
        skill_sound: "ulti1.wav",
        description: "Damage + rakibin o anki can değerinin %15'i vurur. Kendi can değerine max can değerinin %10'u heal yapar.",
        extraDamage: function(character, enemy){
            return Math.floor(enemy.getHealth() * 15 / 100);
        },
        heal: function(character, enemy){
            return Math.floor(character.getMaxHealth() * 1 / 10);
        }
    },

    analkin1 : {
        id : 9,
        name : "Light Saber Strike",
        base_damage: 5,
        damage_rate : 0.7,
        type : "atk",
        mana_regen: 4,
        mana_cost: 0,
        cooldown: 0,
        current_cooldown: 0,
        skill_sound: "atk1.wav",
        buff: function(character, enemy){
            character.manaUp(4);
        },
        description: "Basic attack skill. Gives 4 Mana.",
    },
    analkin2 : {
        id : 10,
        name : "Force Grab",
        base_damage: 10,
        damage_rate : 0.8,
        type : "magic",
        mana_cost: 12,
        cooldown: 2,
        current_cooldown: 0,
        skill_sound: "atk1.wav",
        buff: function(character, enemy){
            if(character.getEvade() < 20){
                character.evadeUp(1);
            }
            //console.log(character.getEvade());
        },
        description: "Increases Evade %1. (Max %20)",
    },
    analkin3 : {
        id : 11,
        name : "Pew / Pew",
        base_damage: 5,
        damage_rate : 1.5,
        type : "atk",
        mana_cost: 20,
        cooldown: 3,
        current_cooldown: 0,
        skill_sound: "atk1.wav",
        buff: function(character, enemy){
            enemy.defenseDown(Math.round(enemy.getDefense() / 10));
        },
        description: "Rakibin defansını %10 azaltır.",
    },
    analkin4 : {
        id : 12,
        name : "Oppi",
        base_damage: 5,
        damage_rate : 1.2,
        type : "magic",
        mana_cost: 30,
        cooldown: 5,
        current_cooldown: 5,
        skill_sound: "ulti1.wav",
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
    },




    // MOBS START
    goblin1 : {
        id : 1,
        name : "Attack",
        base_damage: 4,
        damage_rate : 0.8,
        type : "atk",
        mana_regen: 5,
        mana_cost: 0,
        cooldown: 0,
        current_cooldown: 0,
        skill_sound: "atk1.wav",
        buff: function(character, enemy){
            character.manaUp(5);
        },
        description: "Basic attack skill. Gives 5 Mana.",
    },
    goblin2 : {
        id : 10,
        name : "Ultimate Goblin",
        base_damage: 10,
        damage_rate : 1,
        type : "atk",
        mana_cost: 15,
        cooldown: 2,
        current_cooldown: 2,
        skill_sound: "atk1.wav",
        buff: function(character, enemy){
            if(character.getEvade() < 30){
                character.evadeUp(5);
            }
            //console.log(character.getEvade());
        },
        description: "Increases Evade %5. (Max %50)",
    },
    // MOBS END

}

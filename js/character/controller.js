
class Character {

    constructor(character) {
        this._id = character._id;
        this._level = 1;
        this._experience = 0;
        this._gold = 10;
        this._name = character._name;
        this._max_health = character._max_health;
        this._health = character._health;
        this._max_mana = character._max_mana;
        this._mana = character._mana;
        this._strength = character._strength;
        this._intelligence = character._intelligence;
        this._defense = character._defense;
        this._magic_resistance = character._magic_resistance;
        this._speed = character._speed;
        this._evade = character._evade;
        this._critical_rate = character._critical_rate;
        this._critical_damage = character._critical_damage;
        this._temporary = character._temporary;
        this._skills = [
            this.skill1 = character._skill1,
            this.skill2 = character._skill2,
            this.skill3 = character._skill3,
            this.skill4 = character._skill4
        ];
    }

    getId(){ return this._id; }
    setId (id){ this._id = id; }

    getLvl(){ return this._level; }
    setLvl (level){ this._level = level; }
    lvlUp (){ this._level++; }

    getExp(){ return this._experience; }
    setExp (experience){ this._experience = experience; }

    getGold(){ return this._gold; }
    setGold (gold){ this._gold = gold; }
    goldUp (gold){ this._gold += gold; }

    getName(){ return this._name; }
    setName (name){ this._name = name; }

    getMaxHealth(){ return this._max_health; }
    setMaxHealth (max_health){ this._max_health = max_health; }

    getHealth(){ return this._health; }
    setHealth (health){ this._health = health; }

    getMaxMana(){ return this._max_mana; }
    setMaxMana(max_mana){ this._max_mana = max_mana; }

    getMana(){ return this._mana; }
    setMana(mana){ this._mana = mana; }

    getStrength(){ return this._strength; }
    setStrength(strength){ this._strength = strength; }

    getIntelligence(){ return this._intelligence; }
    setIntelligence(intelligence){ this._intelligence = intelligence; }

    getDefense(){ return this._defense; }
    setDefense(defense){ this._defense = defense; }

    getMagicResistance(){ return this._magic_resistance; }
    setMagicResistance(magic_resistance){ this._magic_resistance = magic_resistance; }

    getSpeed(){ return this._speed; }
    setSpeed(speed){ this._speed = speed; }

    getEvade(){ return this._evade; }
    setEvade(evade){ this._evade = evade; }

    getCriticalRate(){ return this._critical_rate; }
    setCriticalRate(critical_rate){ this._critical_rate = critical_rate; }

    getCriticalDamage(){ return this._critical_damage; }
    setCriticalDamage(critical_damage){ this._critical_damage = critical_damage; }

    getTemporary(){ return this._temporary; }
    setTemporary(temporary){ this._temporary = temporary; }

    getSkills(){ return this._skills; }
    setSkills(skills){ this._skills = skills; }

    getSkill(skillId){ return this._skills[skillId]; }



    maxHealthUp(heal){ this._maxHealth += heal; }
    maxHealthDown(damage){ this._maxHealth -= damage; }

    healthUp(heal){ this._health += heal; }
    healthDown(damage){ this._health -= damage; }

    maxManaUp(heal){ this._maxMana += heal; }
    maxManaDown(damage){ this._maxMana -= damage; }

    manaUp(heal){ this._mana += heal; }
    manaDown(damage){ this._mana -= damage; }

    strengthUp(buff_damage){ this._strength += buff_damage; }
    strengthDown(debuff_damage){ this._strength -= debuff_damage; }

    intelligenceUp(buff_damage){ this._intelligence += buff_damage; }
    intelligenceDown(debuff_damage){ this._intelligence -= debuff_damage; }

    defenseUp(buff_damage){ this._defense += buff_damage; }
    defenseDown(debuff_damage){ this._defense -= debuff_damage; }

    magicResistanceUp(buff_damage){ this._magic_resistance += buff_damage; }
    magicResistanceDown(debuff_damage){ this._magic_resistance -= debuff_damage; }

    speedUp(buff_damage){ this._speed += buff_damage; }
    speedDown(debuff_damage){ this._speed -= debuff_damage; }

    evadeUp(buff_damage){ this._evade += buff_damage; }
    evadeDown(debuff_damage){ this._evade -= debuff_damage; }

    criticalRateUp(buff_damage){ this.critical_rate += buff_damage; }
    criticalRateDown(debuff_damage){ this.critical_rate -= debuff_damage; }

    criticalDamageUp(buff_damage){ this.critical_damage += buff_damage; }
    criticalDamageDown(debuff_damage){ this.critical_damage -= debuff_damage; }


}






/*
var Animal = {
    speak() {
        console.log(this.name + ' ses çıkarıyor.');
    }
};

class Dog {
    constructor(name) {
        this.name = name;
        var a = 1;
    }
    speak() {
        console.log(this.name + ' havlıyor.');
    }
}

Object.setPrototypeOf(Dog.prototype, Animal);// If you do not do this you will get a TypeError when you invoke speak

var d = new Dog('Karabaş');
d.speak(); // Karabaş ses çıkarıyor.
*/

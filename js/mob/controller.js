
class Mob {

    constructor(mob, lvl) {
        lvl--;

        this._id = mob._id;
        this._name = mob._name;
        this._max_health = mob._max_health +             (lvl * mob._lvlUpMulriplers.max_health);
        this._health = mob._health +                     (lvl * mob._lvlUpMulriplers.health);
        this._max_mana = mob._max_mana +                 (lvl * mob._lvlUpMulriplers.max_mana);
        this._mana = mob._mana +                         (lvl * mob._lvlUpMulriplers.mana);
        this._strength = mob._strength +                 (lvl * mob._lvlUpMulriplers.strength);
        this._intelligence = mob._intelligence +         (lvl * mob._lvlUpMulriplers.intelligence);
        this._defense = mob._defense +                   (lvl * mob._lvlUpMulriplers.defense);
        this._magic_resistance = mob._magic_resistance + (lvl * mob._lvlUpMulriplers.magic_resistance);
        this._speed = mob._speed;
        this._evade = mob._evade;
        this._critical_rate = mob._critical_rate;
        this._critical_damage = mob._critical_damage;
        this._temporary = mob._temporary;
        this._skills = [
            this.skill1 = mob._skill1,
            this.skill2 = mob._skill2,
            this.skill3 = mob._skill3,
            this.skill4 = mob._skill4
        ];

        // Mob's EXP and Gold
        this._exp = Math.round(getRandomInt(10 + (5 * lvl), 15 + (5 * lvl)));
        this._gold = Math.round(getRandomInt(90 * (lvl+1), 110 * (lvl+1))/10);
        //console.log(this._exp);
        //console.log(this._gold);

        //this._gold = (lvl == 1) ? getRandomInt(5, 8) : getRandomInt((lvl * lvl), (lvl * (lvl + 1)));

    }

    getId(){ return this._id; }
    setId (id){ this._id = id; }

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

    getExp(){ return this._exp; }
    setExp(exp){ this._exp = exp; }

    getGold(){ return this._gold; }
    setGold(gold){ this._gold = gold; }


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

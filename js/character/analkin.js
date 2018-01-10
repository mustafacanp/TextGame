
//class Gandalf extends Character {
class Analkin {

    constructor() {
        //super();

        this._id = 3;
        this._name = "Analkin",
        this._max_health = 250,
        this._health = 250;
        this._max_mana = 60;
        this._mana = 60;
        this._strength = 10,
        this._intelligence = 10;
        this._defense = 10;
        this._magic_resistance = 7;
        this._speed = 1;
        this._evade = 10;
        this._critical_rate = 10;
        this._critical_damage = 200;
        this._temporary = {
            strength: 0,
            intelligence: 0,
            defense: 0,
            magic_resistance: 0,
            evade: 0,
            critical_rate: 0,
            critical_damage: 0,
        }
        this._skill1 = new Skill(Skills.analkin1);
        this._skill2 = new Skill(Skills.analkin2);
        this._skill3 = new Skill(Skills.analkin3);
        this._skill4 = new Skill(Skills.analkin4);
        this._lvlUpMulriplers = {
            max_health: 20,
            health: 20,
            max_mana: 4,
            mana: 4,
            strength: 3,
            intelligence: 1,
            defense: 3,
            magic_resistance: 2.5,
        }
    }

}

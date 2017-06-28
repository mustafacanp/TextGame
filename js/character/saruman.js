
//class Gandalf extends Character {
class Saruman {

    constructor() {
        //super();

        this._id = 1;
        this._name = "Saruman",
        this._max_health = 250,
        this._health = 250;
        this._max_mana = 100;
        this._mana = 100;
        this._strength = 5,
        this._intelligence = 10;
        this._defense = 10;
        this._magic_resistance = 1;
        this._speed = 8;
        this._evade = 10;
        this._critical_rate = 18;
        this._critical_damage = 2;
        this._temporary = {
            strength: 0,
            intelligence: 0,
            defense: 0,
            magic_resistance: 0,
            evade: 0,
            critical_rate: 0,
            critical_damage: 0,
        }
        this._skill1 = new Skill(Skills.saruman1);
        this._skill2 = new Skill(Skills.saruman2);
        this._skill3 = new Skill(Skills.saruman3);
        this._skill4 = new Skill(Skills.saruman4);
    }
    
}
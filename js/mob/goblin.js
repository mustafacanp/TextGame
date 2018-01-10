

class Goblin {

    constructor() {
        //super();
        
        this._id = 101;
        this._name = "Goblin";
        this._max_health = 150;
        this._health = 150;
        this._max_mana = 30;
        this._mana = 30;
        this._strength = 8,
        this._intelligence = 1;
        this._defense = 7;
        this._magic_resistance = 5;
        this._speed = 1;
        this._evade = 5;
        this._critical_rate = 15;
        this._critical_damage = 200;
        this._temporary = {
            strength: 0,
            intelligence: 0,
            defense: 0,
            magic_resistance: 0,
            evade: 0,
            critical_rate: 0,
            critical_damage: 0,
        };
        this._skill1 = new Skill(Skills.goblin1);
        this._skill2 = new Skill(Skills.goblin1);
        this._skill3 = new Skill(Skills.goblin1);
        this._skill4 = new Skill(Skills.goblin2);
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

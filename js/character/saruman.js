
class Saruman {
    constructor() {
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
        this._skills = [
            skill1 = Skills.saruman1,
            skill2 = Skills.saruman2,
            skill3 = Skills.saruman3,
            skill4 = Skills.saruman4
        ];
    }
}
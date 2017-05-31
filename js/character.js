var mainCharacter, enemy;

class Character {
    constructor(name, max_health, health, max_mana, mana, strength, intelligence, defense, magic_resistance, speed, evade, critical_rate, critical_damage, temporary, skill) {
        
    }
}

var Animal = {
    speak() {
        console.log(this.name + ' makes a noise.');
    }
};

class Dog {
    constructor(name) {
        this.name = name;
    }
    speak() {
        console.log(this.name + ' barking.');
    }
}

Object.setPrototypeOf(Dog.prototype, Animal);// If you do not do this you will get a TypeError when you invoke speak

var d = new Dog('Mitzie');
d.speak(); // Mitzie makes a noise.



var Characters = {
    gandalf : {
        id: 1,
        name: "Gandalf",
        max_health: 250, // Health değeri biraz fazla olsun hemen ölürler :D
        health: 250,
        max_mana: 100,
        mana: 100,
        strength: 6,
        intelligence: 10,
        defense: 10,
        magic_resistance: 8,
        speed : 1, // ???
        evade: 10, // %0 - %100
        critical_rate: 15,
        critical_damage: 2,
        temporary: {
            strength: 0,
            intelligence: 0,
            defense: 0,
            magic_resistance: 0,
            evade: 0,
            critical_rate: 0,
            critical_damage: 0,
        },
        skills: [
            skill1 = Skills.gandalf1,
            skill2 = Skills.gandalf2,
            skill3 = Skills.gandalf3,
            skill4 = Skills.gandalf4
        ]
    },

    saruman : {
        id: 1,
        name: "Saruman",
        max_health: 250, // Health değeri biraz fazla olsun hemen ölürler :D
        health: 250,
        max_mana: 100,
        mana: 100,
        strength: 5,
        intelligence: 10,
        defense: 10,
        speed : 1, // ???
        magic_resistance: 8,
        evade: 10, // %0 - %100
        critical_rate: 18,
        critical_damage: 2,
        temporary: {
            strength: 0,
            intelligence: 0,
            defense: 0,
            magic_resistance: 0,
            evade: 0,
            critical_rate: 0,
            critical_damage: 0,
        },
        skills: [
            skill1 = Skills.saruman1,
            skill2 = Skills.saruman2,
            skill3 = Skills.saruman3,
            skill4 = Skills.saruman4
        ]
    },

     analkin : {
        id: 1,
        name: "Analkin",
        max_health: 250,
        health: 250,
        max_mana: 60,
        mana: 60,
        strength: 9,
        intelligence: 9,
        defense: 10,
        speed : 1, // ???
        magic_resistance: 7,
        evade: 10, // %0 - %100
        critical_rate: 13,
        critical_damage: 2,
        temporary: {
            strength: 0,
            intelligence: 0,
            defense: 0,
            magic_resistance: 0,
            evade: 0,
            critical_rate: 0,
            critical_damage: 0,
        },
        skills: [
            skill1 = Skills.analkin1,
            skill2 = Skills.analkin2,
            skill3 = Skills.analkin3,
            skill4 = Skills.analkin4
        ]
    }


}
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

var Characters = {
    Gandalf : {
        id : 1,
        health: 130, // Health değeri biraz fazla olsun hemen ölürler :D
        attack: 10,
        defense: 20,
        speed : 1, // ???
        intelligence: 55,
        evade: 10, // %0 - %100
        skill1: function () {
            critLuck = getRandomInt(0,100)
            if(critLuck){

            }
            return Math.round(this.intelligence * 0.2 * + getRandomInt(100,130)/100);
            // intelligence : Karakterin int i
            // 0.2          : Skill Gücü
            // getRandomInt : Vuruş farklılığı yaratmak için
        },
        skill2: function () {
            return Math.round(this.intelligence * 0.25 * + getRandomInt(100,130)/100);
        },
        skill3: function () {
            this.defense = this.defense * 1.5;
        }
    },
    Saruman : {
        health: 60,
        attack: 15,
        defense: 15,
        intelligence: 50,
        skill1: function () {
            return this.intelligence * 0.2;
        },
        skill2: function () {
            return this.intelligence * 0.3;
        },
        skill3: function () {
            this.defense = this.defense * 1.5;
        }
    },
    Legolas : {
        health: 40,
        attack: 40,
        defense: 35,
        intelligence: 10,
        skill1: function () {
            return this.attack * 0.2;
        },
        skill2: function () {
            return this.attack * 0.3;
        },
        skill3: function () {
            this.defense = this.defense * 1.5;
        }
    }
}
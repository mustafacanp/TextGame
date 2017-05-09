
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function useSkill(character, skill){
    
    actionType = "skill";

    var damage;
    var chSkill = character.skills[skill-1];
    
    var skillTypeStat = (chSkill.type == "atk") ? character.attack : character.intelligence;
    // if(chSkill.type == "atk"){ skillTypeStat=character.attack } else { skillTypeStat=character.intelligence } (Üst satır)

    damage = Math.round(skillTypeStat * chSkill.damageRate * getRandomInt(100,130)/100);
    // skillTypeStat      : Karakterin int i
    // chSkill.damageRate : Skill Gücü
    // getRandomInt       : Vuruş farklılığı yaratmak için
    
    critLuck = getRandomInt(0,100) / 100; // Crit ihtimali için sayı oluştur.
    if(critLuck < character.criticalRate){ // Sayı karakterin şansının içindeyse criticalDamage katı vur.
        console.log("Critical Hit!");
        damage *= character.criticalDamage;
    }
    console.log("Damage: " + damage);
    
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
        criticalRate: 0.15,
        criticalDamage: 2,
        skills: [
            skill1 = {
                name : "Q",
                damageRate : 0.25,
                type : "magic"
            },
            skill2 = {
                name : "W",
                damageRate : 0.2,
                type : "magic"
            },
            skill3 = {
                name : "E",
                damageRate : 0.14,
                type : "atk"
            },
            ulti = {
                name : "R",
                damageRate : 0.3,
                type : "magic"
            }
        ]
    },
}

/* Calculate Damage */
function getSkillDamage(character, enemy, skill_id, is_main_character){

    is_main_character = false;
    if(character == mainCharacter){
      is_main_character = true;
    }
    actionType = "skill";
    var skill, damage, skill_type_stat, def_type_stat, crit_luck, evade_luck, damage_multipler, is_crit, is_evade, is_heal;

    skill = character.getSkill(skill_id-1);

    /* is Cooldown Available */
    if(skill.cooldown != 0){ // skillin cooldownu varsa
        if(skill.current_cooldown != 0){
            return "cooldown";
        } else if (skill.current_cooldown == 0 && character.getMana() >= skill.mana_cost) { // 1. skill (Cooldownsuz)) { // current_cooldown = 0 ise (şuan bekleme süresi yok ise) bekleme süresine sok
            for(i=1; i<=3; i++){
                character.getSkill(i).current_cooldown--;
                if(character.getSkill(i).current_cooldown < 0){
                    character.getSkill(i).current_cooldown = 0;
                }
            }
            skill.current_cooldown = skill.cooldown;
        }
    } else { // 1. skill (Cooldownsuz)
        for(i = 1; i <= 3; i++){
            character.getSkill(i).current_cooldown--;
            if(character.getSkill(i).current_cooldown < 0){
                character.getSkill(i).current_cooldown = 0;
            }
        }
        skill.current_cooldown = skill.cooldown;
    }

    /* is Mana Enough */
    if(skill.mana_cost){
        if(character.getMana() < skill.mana_cost){
            return "no_mana";
        } else {
            character.manaDown(skill.mana_cost);
        }
    }

    /* Buff */
    if(skill.buff){
        skill.buff(character, enemy);
    }
    if(character.getHealth() > character.getMaxHealth()){
        character.setHealth(character.getMaxHealth());
    }
    if(character.getMana() > character.getMaxMana()){
        character.setMana(character.getMaxMana());
    }

    /*Evade*/
    evade_luck = getRandomInt(1,100);
    if(evade_luck <= enemy.getEvade()){
        is_evade = true;
        if(is_main_character){
            if(character == mainCharacter){
              var skillSound = new Audio("");
              skillSound.currentTime = 0;
              skillSound.src = "/PROJECTS/TextGame/audio/" + skill.getSkillSound();
              skillSound.play();
            }
            cout(enemy.getName()+" evaded your attack.","purple");7

            var skillSound = new Audio("");
            skillSound.currentTime = 0;
            skillSound.src = "audio/miss.wav";
            skillSound.play();

        } else {
            cout("Evaded "+enemy.getName()+"'s attack.","purple");
        }
        return 0;
    }

    skill_type_stat = (skill.type == "atk") ? character.getStrength() : character.getIntelligence();

    /*Stat Damage*/
    damage = Math.round(skill_type_stat * skill.damage_rate * getRandomInt(80,120)/100);

    /*Add Base Damage*/
    damage = damage + skill.base_damage;



    /*Crit*/
    crit_luck = getRandomInt(1,100); // Crit ihtimali için sayı oluştur.
    if(character.getTemporary().critical_rate != 0){
        if(crit_luck <= character.getTemporary().critical_rate){ // Sayı karakterin şansının içindeyse critical_damage katı / 100 vur.
            is_crit = true;
            if(character.getTemporary().critical_damage != 0){
                damage = Math.round(damage * character.getTemporary().critical_damage / 100);
            } else {
                damage = Math.round(damage * character.getCriticalDamage() / 100);
            }
        }
    } else {
        if(crit_luck <= character.getCriticalRate()){ // Sayı karakterin şansının içindeyse critical_damage katı vur.
            is_crit = true;
            if(character.getTemporary().critical_damage != 0){
                damage = Math.round(damage * character.getTemporary().critical_damage / 100);
            } else {
                damage = Math.round(damage * character.getCriticalDamage() / 100);
            }
        }
    }

    /*Defense - Magic Resistance*/
    def_type_stat = (skill.type == "atk") ? enemy.getDefense() : enemy.getMagicResistance();
    damage_multipler = 100 / (100 + def_type_stat); // if(def_type_stat < 0) { damage_multipler = 2 - (100 / (100 - enemy.def_type_stat)) };
    damage = Math.round(damage * damage_multipler);

    if(skill.extraDamage){
        damage += skill.extraDamage(character, enemy);
    }



    /* Cout */
    if(is_crit){
        if(is_main_character){
            cout("You used "+skill.name+". Hit "+damage+". Critical Hit!","green");
        } else {
            cout(character.getName()+" used "+skill.name+". Hit "+damage+". Critical Hit!","red");
        }
    } else {
        if(is_main_character){
            cout("You used "+skill.name+". Hit "+damage+".","green");
        } else {
            cout(character.getName()+" used "+skill.name+". Hit "+damage+".","red");
        }
    }

    /* Heal */
    if(skill.heal){
        var healed_hp = skill.heal(character, enemy);
        is_heal = true;
        if (healed_hp == false){ is_heal = false; } // Random tutmadıysa.
        if (healed_hp == "max_healed"){ character.setHealth(character.getMaxHealth()); } // Fulleme ise.
        else { character.healthUp(healed_hp); } // Normal heal ise.
        if(character.getHealth() > character.getMaxHealth()){ character.setHealth(character.getMaxHealth()); } // Can max candan fazla ise.

        if(is_heal){
            if(is_main_character && healed_hp != "max_healed"){ // Ana karakter normal heal
                cout("You healed " + healed_hp + " HP.","green");
            } else if (is_main_character && healed_hp == "max_healed") { // Ana karakter full heal
                cout("You full healed your HP!","green");
            } else if (!is_main_character && healed_hp != "max_healed") { // AI normal heal
                cout(character.getName() + " healed " + healed_hp + " HP.","red");
            } else if (!is_main_character && healed_hp == "max_healed") { // AI full heal
                cout(character.getName() + " full healed his HP!","green");
            }
        }

    }

    /* Reset Temporary Stats */
    character.getTemporary().strength = 0;
    character.getTemporary().intelligence = 0;
    character.getTemporary().defense = 0;
    character.getTemporary().magic_resistance = 0;
    character.getTemporary().evade = 0;
    character.getTemporary().critical_rate = 0;
    character.getTemporary().critical_damage = 0;
    enemy.getTemporary().strength = 0;
    enemy.getTemporary().intelligence = 0;
    enemy.getTemporary().defense = 0;
    enemy.getTemporary().magic_resistance = 0;
    enemy.getTemporary().evade = 0;
    enemy.getTemporary().critical_rate = 0;
    enemy.getTemporary().critical_damage = 0;

    if(is_main_character){
      var skillSound = new Audio("");
      skillSound.currentTime = 0;
      skillSound.src = "audio/" + skill.getSkillSound();
      skillSound.play();
    }

    return damage;
}





/* UseSkill (Controls Health, Mana and Cooldown) */
function useSkill(skillNumber, mainCharacter, enemy){

    if(skillNumber>=1 && skillNumber<=4){
        var skill = mainCharacter.getSkill(skillNumber-1);
        var dmg = getSkillDamage(mainCharacter, enemy, skillNumber); // Skill kullandık.

        if (dmg == "cooldown"){ // Cooldown Control
            cout(skill.name+" cooldown "+skill.current_cooldown+" turn","yellow");
            return;
        } else if (dmg == "no_mana"){ // Mana Control
            cout("Not Enough Mana for "+skill.name,"purple");
            return;
        } else if (dmg != 0){
            enemy.healthDown(dmg);
        }
        if(enemy.getHealth() <= 0){
            endFight(1, enemy); // Kazandı ise 1, 2. parametre exp
            return;
        }
    }
    if(skillNumber==5){
        if(mainCharacter.getHealth() == mainCharacter.getMaxHealth()){
          cout("Your HP is Full", "yellow");
          return;
        }
        if(!getItemById(1)){
          cout("You don't have Health Potion!","red");
          return;
        }
        else
          useHpPotion(mainCharacter);
    }
    if(skillNumber==6){
        if(mainCharacter.getMana() == mainCharacter.getMaxMana()){
          cout("Your Mana is Full", "yellow");
          return;
        }
        if(!getItemById(5)){
          cout("You don't have Mana Potion!","red");
          return;
        }
        else
          useManaPotion(mainCharacter);
    }

    // Enenmy(AI) Damage
    var random_skill, dmg2;
    do{
        if(enemy.getMana() < enemy.getSkill(3).mana_cost && enemy.getHealth() * 5/4 < mainCharacter.getHealth()){ // Manası ultiye yetmiyor ve canı bizden az ise:
            dmg2 == "ulti_degil";
            dmg2 = getSkillDamage(enemy, mainCharacter, 1); // AI Basic Attack yaptı.
        } else { // Manası ultiye yetiyor ise:
            dmg2 = getSkillDamage(enemy, mainCharacter, 4); // AI ulti attı.
            if(dmg2 == "no_mana" || dmg2 == "cooldown"){
                random_skill = getRandomInt(1,4);
                dmg2 = getSkillDamage(enemy, mainCharacter, random_skill); // AI skill kullandı.
            }
        }

    } while (dmg2 == "no_mana" || dmg2 == "cooldown" || dmg2 == "ulti_degil");
    if (dmg2 != 0){
        mainCharacter.healthDown(dmg2);
    }
    if(mainCharacter.getHealth() <= 0){
        endFight(0); // Kazanamadı ise 0
    }
    cout("-----");
}




/* Cooldown & Mana Control */
function isSkillAvailable(character, skillID){
    if(skillID == 0){
        return "<br /><span class='small green'>Ready!</span>";
    } else {
        if(character.getSkill(skillID).getCurrentCooldown() == 0){
            if(character.getSkill(skillID).getManaCost() > character.getMana()){
                return "<br /><span class='small blue'>Not Enough Mana</span>";
            } else {
                return "<br /><span class='small green'>Ready!</span>";
            }
        } else {
            return "<br /><span class='small purple'>Cooldown: "+character.getSkill(skillID).getCurrentCooldown()+"</span>";
        }
    }
}

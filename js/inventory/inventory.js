
function getItemById(id){
  for (var i = 0; i < inventory.length; i++) {
    if(inventory[i].id == id && inventory[i].quantity != 0)
      return inventory[i];
  }
  return null;
}

function useHpPotion(character){
  character.setHealth(Math.floor(character.getHealth() + (character.getMaxHealth() * 30 / 100 )));
  if(character.getHealth() > character.getMaxHealth()){ character.setHealth(character.getMaxHealth()); } // Can max candan fazla ise.
  cout("Used HP Potion.", "green");
  inventory[0].quantity--;
}

function useManaPotion(character){
  if(character.getMana() == character.getMaxMana()){
    cout("Your Mana is Full");
    return;
  }
  character.setMana(Math.floor(character.getMana() + (character.getMaxMana() * 30 / 100 )));
  if(character.getMana() > character.getMaxMana()){ character.setMana(character.getMaxMana()); } // Can max candan fazla ise.
  cout("Used Mana Potion.", "green");
  inventory[1].quantity--;
}


var inventory = [
  {
    id: 1,
    name: "Health Potion I",
    quantity: 3,
    desc: "+%30 HP."
  },
  {
    id: 5,
    name: "Mana Potion I",
    quantity: 2,
    desc: "+%30 Mana."
  },
  {
    id: 11,
    name: "Metal",
    quantity: 3,
    desc: "For craft."
  },
  {
    id: 12,
    name: "Wood",
    quantity: 12,
    desc: "For craft."
  }
];

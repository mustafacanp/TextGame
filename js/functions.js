
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max)+1;
  return Math.floor(Math.random() * (max - min)) + min;
}

function disableRightClick(){ //Disable Right Click
    //Disable full page
    $("body").on("contextmenu",function(e){
        return false;
    });
}
function scrollBottom(){
    $('#container').animate({scrollTop: $('#container')[0].scrollHeight}, 300);
}
function focusInput(){ // Sayfada herhangi bir yere tıklansa da inputa focuslanması
    $("#input").focus();
    $(document).click(function(e) {
        $("#input").focus();
    });
}
function hideInputCursor(){ // İmleç
    clearInterval(blinkCursor);
    $('#input').focus();
    blinkCursor = window.setInterval(function() {
        if ($('#cursor').css('visibility') === 'visible') {
            $('#cursor').css({ visibility: 'hidden' });
        } else {
            $('#cursor').css({ visibility: 'visible' });  
        }
    }, 500);
    $('input').keyup(function() {
        if(!menu_keys && !is_menu_active){
            $('#cmd span').text($(this).val());
        } else {
            $('#input').val("");
            menu_keys = false;
        }
    });
}
function cin(){
    $("#container").append('<div class="line input-line"><div class="text">></div><div id="cmd"><span></span><div id="cursor"></div></div><input type="text" id="input" maxlength="50" /></div>');
}
function cout(_output, _class, path){
    if (arguments.length === 1) {
        $("#container").append('<div class="line"><div class="text">'+_output+'</div></div>');
    } else if (arguments.length === 2) {
        $("#container").append('<div class="line"><div class="text '+_class+'">'+_output+'</div></div>');
    } else if (arguments.length === 3) {
        $("#container").append('<div class="line"><div class="text '+_class+'">'+path+'>'+_output+'</div></div>');
    }
}
function removeInputLine(){ // Tüm girdi satırlarını siler.
    $(".line").each(function(){
        var isInputLine = $(this).hasClass("input-line");
        if(isInputLine){$(this).remove();}
    });
}
function refreshInputLine(){ // Girdi satırını temizle.
    //removeInputLine();
    //cin();
    $("#input").val("");
    hideInputCursor();
}


/* Load Menu */
function loadMenu(menu){
    if(menu == "character"){
        $("#container2").html("character");
    } else if(menu == "skill"){
        $("#container2").html("skill");
    } else if(menu == "inventory"){
        $("#container2").html("inventory");
    } else if(menu == "map"){
        $("#container2").html("map");
    }
}
function saveGame(){
    console.log("Saving...");
    // pc'ye cookie bırakıp ajax ile verileri gönderecek
}
function loadGame(){
    console.log("Loading...");
    // pc'den cookie alıp ajax ile verileri getirecek
}
/* Load Menu */





/* Fight Screen UI */
function fightUI(mainCharacter, enemy){
    $("#ch-health").width(Math.round(mainCharacter.health/mainCharacter.max_health*100)+"%");
    $("#ch-health").html("Health:"+mainCharacter.health);
    $("#ch-skill1").html("[1]."+mainCharacter.skills[0].name+isAvailable(mainCharacter, 0));
    $("#ch-skill2").html("[2]."+mainCharacter.skills[1].name+isAvailable(mainCharacter, 1));
    $("#ch-skill3").html("[3]."+mainCharacter.skills[2].name+isAvailable(mainCharacter, 2));
    $("#ch-skill4").html("[4]."+mainCharacter.skills[3].name+isAvailable(mainCharacter, 3));
    
    $("#ch-mana").html("Mana:"+mainCharacter.mana);
    $("#ch-mana").width(Math.round(mainCharacter.mana/mainCharacter.max_mana*100)+"%");
    $("#ch-skill1-mana-cost").html("+5 Mana");
    $("#ch-skill2-mana-cost").html("-"+mainCharacter.skills[1].mana_cost+" Mana");
    $("#ch-skill3-mana-cost").html("-"+mainCharacter.skills[2].mana_cost+" Mana");
    $("#ch-skill4-mana-cost").html("-"+mainCharacter.skills[3].mana_cost+" Mana");

    
    $("#en-health").width(Math.round(enemy.health/enemy.max_health*100)+"%");
    $("#en-health").html("Health:"+enemy.health);
    $("#en-skill1").html("[1]."+enemy.skills[0].name+isAvailable(enemy, 0));
    $("#en-skill2").html("[2]."+enemy.skills[1].name+isAvailable(enemy, 1));
    $("#en-skill3").html("[3]."+enemy.skills[2].name+isAvailable(enemy, 2));
    $("#en-skill4").html("[4]."+enemy.skills[3].name+isAvailable(enemy, 3));

    $("#en-mana").html("Mana:"+enemy.mana);
    $("#en-mana").width(Math.round(enemy.mana/enemy.max_mana*100)+"%");
    $("#en-skill1-mana-cost").html("+5 Mana");
    $("#en-skill2-mana-cost").html("-"+enemy.skills[1].mana_cost+" Mana");
    $("#en-skill3-mana-cost").html("-"+enemy.skills[2].mana_cost+" Mana");
    $("#en-skill4-mana-cost").html("-"+enemy.skills[3].mana_cost+" Mana");
}

/* Cooldown & Mana Control */
function isAvailable(character, skillID){
    if(skillID == 0){
        return "<br /><span class='small green'>Ready!</span>";
    } else {
        if(character.skills[skillID].current_cooldown == 0){
            if(character.skills[skillID].mana_cost > character.mana){
                return "<br /><span class='small italic blue'>Not Enough Mana</span>";
            } else {
                return "<br /><span class='small green'>Ready!</span>";
            }
        } else {
            return "<br /><span class='small italic red'>Cooldown: "+character.skills[skillID].current_cooldown+"</span>";
        }
    }
}

// TODO: KALDIR
$("#statistics-button").click(function(){
    $("#statistics").toggle();
    if(options){
        var string = "";
        for(var key in options) {
            var value = options[key];
            string += "<div class='left'>"+key+"</div><div class='right'>"+value+"</div>"
        }
        $("#general .content").html(string);
    }
    if(dialogueAnswers){
        var string = "";
        for(var key in dialogueAnswers) {
            var value = dialogueAnswers[key];
            string += "<div class='left'>"+key+"</div><div class='right'>"+value+"</div>"
        }
        $("#your_answers .content").html(string);
    }
});
/*
addSpaces(''+
'                                                                  ..-`          '+'<br>'+ // http://www.text-image.com/convert/ascii.html
'                                                                ./+yo-          '+'<br>'+ // Image width: 30 characters + 50 sola ben ekledim
'                                                              ./osyy-           '+'<br>'+
'                                                             .+sssyyy-          '+'<br>'+
'                                                           ./osssssyyyo.        '+'<br>'+
'                                                        -:oo++++++++oooyo.      '+'<br>'+
'                                                           `/+---:-s--:/.       '+'<br>'+
'                                                           .--:-:-/:::::`       '+'<br>'+
'                                                          ...:::::++++:`        '+'<br>'+
'                                                          .//://:/osh+`         '+'<br>'+
'                                                           /o-/hs+hddd-         '+'<br>'+
'                                                           +o -dhyddds.         '+'<br>'+
'                                                           +o -ddhdddh+.        '+'<br>'+
'                                                           +o -dh/hddhy+.       '+'<br>'+
'                                                              .o+  oo.          '+'<br>'+
'');

 addSpaces(''+
'                      ``.:ssso-              <br>'+
'                    `./+syy+:                <br>'+
'                   -/oosyyy.                 <br>'+
'                 .:oosssyyys+                <br>'+
'                .:+ssssssyyys-`              <br>'+
'              .-oossssssssyyyho/             <br>'+
'         -///++oooooooooosssyyyyoo+`         <br>'+
'         ```:s+/o+///////+o+/+++y+`          <br>'+
'              .-s/----::-/s--:::/-           <br>'+
'              .----:::::::---:::/-           <br>'+
'              .-:::--:--+//////:``           <br>'+
'            `-``::::::::++++++:-             <br>'+
'            .++/`.-::://oosys:.              <br>'+
'              /++osso:/+syhdhy-              <br>'+
'              sh``.hhhoohhdddd:              <br>'+
'              yd   hddyyddddhy-              <br>'+
'              yd   hddhyddddho-              <br>'+
'              yd   hdddddddddhso             <br>'+
'              yd   hddysdddddhyyo:     `` `` <br>'+
'              /+   hdm:`+sdmh///       -y+/- <br>'+
'                   ://.  .//:          ....` <br>'+
'');

function addSpaces(string){
    $("#container").html(string.replace(/ /g, "&nbsp;"));
    console.log(string.replace(" ", "&nbsp"));
}
*/

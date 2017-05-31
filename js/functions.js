
function FindAndReplaceAll(text){
  var normal = new Array("Ä±","Å?","Ã¼","Ã§","Ã¶","Ä?","ÅŸ","Ã‡","Ä°","ÄŸ","Åž","Ã–","Ãœ","Ä±","Å?","Ã§","Ã¶","Ä?","ÅŸ","Ã‡","Ä°","ÄŸ","Åž","Ã–","Ãœ","Ã¼","ÄŸ");
  var turkish = new Array("ı","ş","ü","ç","ö","ğ","ş","Ç","i","ğ","Ş","Ö","Ü","ı", "ş", "ç", "ö", "ğ", "ş", "Ç", "i", "ğ", "Ş", "Ö", "Ü", "ü", "ğ");

  for (var i = 0; i < text.length; i+=2) 
  {
    for(var j = 0; j < 27;j++)
        {
            if((text.charAt(i)+text.charAt(i+1)) == normal[j])
            {

               text= text.replace((text.charAt(i)+text.charAt(i+1)), turkish[j]);    
            }

        }
  }


  return text;
}

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


*/

function addSpaces(string){
    $("#container").html(string.replace(/ /g, "&nbsp;"));
}






function intro(){
    is_animating = true;
    addSpaces(''+
    '                                  |>>><br>'+
    '                                  |<br>'+
    '                    |>>>      _  _|_  _         |>>><br>'+
    '                    |        |;| |;| |;|        |<br>'+
    '                _  _|_  _    \\.    .   /       _|_  _<br>'+
    '                |;|_|;|_|;|   \\:. ,   /    |;|_|;|_|;|<br>'+
    '                \\..      /    ||;   . |     \\.    .  /<br>'+
    '                 \\.  ,  /     ||:  .  |      \\:  .  /<br>'+
    '                 ||:   |_   _ ||_ . _ | _   _||:   |<br>'+
    '                 ||:  .|||_|;|_|;|_|;|_|;|_|;||:.  |<br>'+
    '                 ||:   ||.    .     .      . ||:  .|<br>'+
    '                 ||: . || .     . .   .  ,   ||:   |       <span>/`\\</span><br>'+
    '                 ||:   ||:  ,  _______   .   ||: , |            <span>\\,/</span><br>'+
    '                 ||:   || .   /+++++++\\   .  ||:   |<br>'+
    '                 ||:   ||.    |+++++++| .    ||: . |<br>'+
    '              __ ||: . ||: ,  |+++++++|.  . _||_   |<br>'+
    '     ____--`~    --~~__|.     |+++++__|----~    ~`---,              ___<br>'+
    '-~--~                   ~---__|,--~                  ~~----_____-~   ~----~~---_____-~   ~----~~<br><br><br><br><br>'+
    '');
    $("#container span:eq(0)").attr('id', 'bird1');
    $("#container span:eq(1)").attr('id', 'bird2');
    $("#bird1, #bird2").css('position','absolute');
    for(var i = 1; i < 22; i++){
        fly(i);
    }
    setTimeout(function(){
        $("#container").html("");
        cin(); // Girdi satırı oluşturdu.
        is_animating = false;
        cout("Welcome visitor. Press enter to continue...<br><br>", "green");
    },6300);
}
function fly(i){
    var space = "&nbsp;&nbsp;".repeat(i);
    if(i%2 == 0){
        var bird1 = "/`\\";
        var bird2 = "\\,/";
    } else {
        var bird1 = "\\,/";
        var bird2 = "/`\\";
    }
    setTimeout(function(){
        $("#bird1").html(space+bird1);
        $("#bird2").html(space+bird2);
        $("#bird1, #bird2").css('margin-top','-'+i*6+'px' );
    },i*300);
}
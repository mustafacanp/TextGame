
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
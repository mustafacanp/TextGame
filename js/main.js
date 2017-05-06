
var start = function () {

    var URL = "Homepage"; // Satır başı yazısı
    var blinkCursor; // İmleç

    var pressEnter = function(){ // Enter'a basınca yeni satıra geçme
        $(document).keypress(function(e) {
            if(e.which == 13) {
                newLine(1);
            }
        });
    }

    var focusInput = function(){ // Sayfada herhangi bir yere tıklansa da inputa focuslanması
        $("#input").focus();
        $(document).click(function(e) {
            $("#input").focus();
        });
    }

    var hideInputCursor = function(){ // İmleç
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
            $('#cmd span').text($(this).val());
        });
    }
    
    function refreshInputLine(){ // Tüm girdi satırlarını siler.
        $(".line").each(function(){
            var isInputLine = $(this).hasClass("input-line");
            if(isInputLine){$(this).remove();}
        });
        $("#container").append('<div class="line input-line"><div class="text">'+URL+'></div><div id="cmd"><span></span><div id="cursor"></div></div><input type="text" id="input" /></div>');
        hideInputCursor();
    }

    function unknownCommand(input, message){ // Geçersiz girdi alınınca gösterilir. (newLine fonksiyonunun içinde isValid false gelirse)
        $('#input').attr('readonly', true);
        $("#container").append('<div class="line spaced"><div class="text">'+URL+'>'+input+'<br>'+message+'</div></div>');
    }
    
    function newLine(action, value){ // Asıl iş burada dönüyor. Burayı düşünelim :D
        var inputValue = $("#input").val(); // input değerini alıyor

        var isValid = checkValidity(action, value); // Girdi geçerli mi? Geçerlilik kontrollerini checkValidity() yapacak. Asıl iş burada dönüyor2 :D

        if(inputValue == "Help" || inputValue == "help"){ // Kaldırılacak
            isValid = true;
        }

        if(isValid) { // Girdi geçerli ise
            createAction(action, value);
            var helpText = "For more information on a specific command, type HELP command-name";
            $("#container").append('<div class="line"><div class="text">'+URL+'>'+inputValue+'</div></div>');
            $("#container").append('<div class="line spaced"><div class="text">'+helpText+'</div></div>');

        } if(!isValid) { // Girdi geçersiz ise
            
            if(inputValue == ""){ // Kaldırılacak
                $("#container").append('<div class="line"><div class="text">'+URL+'></div></div>');
            } else {
                unknownCommand(inputValue,"'"+inputValue+"' is unknown command. If you need help, type help. Clever?");
            }
        }
        refreshInputLine();
    }

    function checkValidity(action, value){

    }
    function createAction(action, value){
        
    }

    // Karakter oluşturup skill attık. Skill vuruş değerine consoledan bakabilirsin, kod characters.js'de
    var character;
    Character = Characters['Gandalf'];
    console.log(Character);
    console.log("intelligence: "+Character.intelligence);
    console.log("Skill1: "+Character.skill1());
    console.log("Skill2: "+Character.skill2());



    return {
        init: function () { // Site yüklenince (initialize olunca)
            refreshInputLine(); // İlk satırı oluşturdu.
            focusInput(); // Site yüklenince ve sayfada herhangi bir yere basınca input alanına focus olur.
            pressEnter(); // Enter kontrolünü ekledi.
        }
    };
}();

jQuery(document).ready(function () {
  start.init();
});


/* Sol Üst Yazı Rengi */
var color = "green";
$("#switch-color").click(function(){
    if(color != "grey"){
        console.log("a");
        $("#cursor").css("background-color","#0F0");
        $("#container").css("color","#0F0");
        color = "grey";
    } else {
        console.log("b");
        $("#cursor").css("background-color","#AAA");
        $("#container").css("color","#AAA");
        color = "green";
    }
});
/* Gereksiz */
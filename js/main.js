//'use strict';

var start = function () {

    var URL = "Homepage"; // Satır başı yazısı
    var blinkCursor; // İmleç
    this.actionType = 0;

    var pressEnter = function(){ // Enter'a basınca newLine() fonksiyonu ile yeni satıra geçme
        $(document).keypress(function(e) {
            if(e.which == 13) {
                newLine();
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
    

    function askQuestion(question){
        var response = getInput("dialogue",question);
        $("#container").append('<div class="line"><div class="text">'+URL+'>'+response+'</div></div><br>');
    }
    function answerQuestion(question, input){
        var response = getInput("dialogue", question, input);
        if(typeof response == "string"){
            $("#container").append('<div class="line"><div class="text">'+URL+'>'+response+'</div></div><br>');
            actionType = 0;
        }
        if(typeof response == "object"){
            $("#container").append('<div class="line"><div class="text">Try:');
            for(var i=1; i<response.length; i++){
                //console.log(response[i]);
                $("#container").append(response[i].id + "." + response[i].inputText + '<br>');
            }
            $("#container").append('</div></div><br>');
        }
    }
    
    var inputValue = $("#input").val(); // input değerini alıyor
    $("#container").append('<div class="line"><div class="text">'+URL+'>'+inputValue+'</div></div>');
    askQuestion("do_you_like_beer");

    
    function newLine(){ // Asıl iş burada dönüyor. Burayı düşünelim :D

        var inputValue = $("#input").val(); // input değerini alıyor

        $("#container").append('<div class="line"><div class="text">'+URL+'>'+inputValue+'</div></div>');

        if(actionType == "dialogueQuestion"){
            answerQuestion("do_you_like_beer", inputValue);
        }

        // Satırı oluşturacak, girdiyi aldık type ne ???

         // Girdi geçerli mi? Geçerlilik kontrollerini getInput() yapacak. Asıl iş burada dönüyor2 :D

        /*
        if(inputValue == "Help" || inputValue == "help"){ // Kaldırılacak
            isValid = true;
        }

        if(isValid) { // Girdi geçerli ise
            var helpText = "For more information on a specific command, type HELP command-name";
            $("#container").append('<div class="line"><div class="text">'+URL+'>'+inputValue+'</div></div>');
            $("#container").append('<div class="line spaced"><div class="text">'+helpText+'</div></div>');

        } if(!isValid) { // Girdi geçersiz ise
            
            if(inputValue == ""){ // Kaldırılacak
                $("#container").append('<div class="line"><div class="text">'+URL+'></div></div>');
            } else {
                unknownCommand(inputValue,"'"+inputValue+"' is unknown command. If you need help, type help. Clever?");
            }
        }*/
        refreshInputLine();
    }

    var mainCharacter = Characters.Gandalf; // Karakteri oluşturduk.
    //console.log(mainCharacter);

    //useSkill(mainCharacter, 1); // Skill kullandık.
    
    



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
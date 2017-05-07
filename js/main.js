//'use strict';

var start = function () {

    var URL = "Homepage"; // Satır başı yazısı
    var blinkCursor; // İmleç
    this.actionType = 0;
    this.dialogFinished = false;
    this.dialogCount = 1;

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
        //console.log(actionType);
        actionType = "dialogueQuestion";
        var response = dialogue(question);
        //console.log(actionType);
        $("#container").append('<div class="line"><div class="text">'+URL+'>'+response+'</div></div><br>'); // Ekrana düşen soru
    }
    function answerQuestion(question, input){
        var response = dialogueAnswer( question, input);
        if(typeof response == "string"){
            $("#container").append('<div class="line"><div class="text">'+URL+'>'+input+'</div></div>');
            $("#container").append('<div class="line"><div class="text blue">'+response+'</div></div><br>'); // Cevap doğru ise
            actionType = "dialog_finished";
        console.log(dialogFinished);
        console.log(dialogCount);
        console.log(actionType);
        }
        if(typeof response == "object"){ // Cevap yanlış ise doğru şıkları göster
            $("#container").append('<div class="line"><div class="text">'+URL+'>'+input+'</div></div>');
            $("#container").append('<div class="line"><div class="text red">Try:');  // Cevap yanlış ise doğru şıkları göster
            for(var i=0; i<response.length; i++){
                //console.log(response[i]);
                $("#container").append("<div class='text red' style='width: 100%;'>"+response[i].id + "." + response[i].inputText + '</div>');  // Cevap yanlış ise doğru şıkları göster
            }
            $("#container").append('</div></div><br>');
        }
        refreshInputLine();
    }
    function createDialog(dialogName){
        var inputValue = $("#input").val(); // input değerini alıyor
        askQuestion(dialogName);


        $(document).off("keypress");

        //pressEnter();
        $(document).on("keypress",function(e) {
            if(e.which == 13) {
                //console.log(dialogName);
                inputValue = $("#input").val(); // input değerini alıyor
                if(actionType == "dialogAnswer"){
                    answerQuestion(dialogName, inputValue);
                }
            }
        }); 
    }

    createDialog("do_you_like_beer");

    
    function newLine(){ // Asıl iş burada dönüyor. Burayı düşünelim :D
        //console.log(actionType);
        console.log(dialogFinished);
        console.log(dialogCount);
        console.log(actionType);

        var inputValue = $("#input").val(); // input değerini alıyor
        
        if(actionType == "create_new_dialog" && dialogCount < 10 && dialogFinished){ // Action yok ise
            if(dialogCount == 2){
                $("#container").append('<div class="line"><div class="text">'+URL+'>'+inputValue+'</div></div>');  // Son girdini gösterir.
                createDialog("do_you_like_girls");
            }
            else if(dialogCount == 3){
                $("#container").append('<div class="line"><div class="text">'+URL+'>'+inputValue+'</div></div>');  // Son girdini gösterir.
                console.log("dialogCount == 3");
                createDialog("do_you_like_beer");
            }
            else if(dialogCount == 4){
                $("#container").append('<div class="line"><div class="text">'+URL+'>'+inputValue+'</div></div>');  // Son girdini gösterir.
                console.log("dialogCount == 4");
                createDialog("do_you_like_girls");
            }
        }
        if(actionType == "dialog_finished"){actionType="create_new_dialog";} // Actiondan yeni çıkıldı ise fazladan girdili satır oluşmasını engelleme

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


/* Sol Üst Yazı Rengi
var color = "grey";
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
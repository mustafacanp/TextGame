//'use strict';

var start = function () {

    var pressEnter = function(){ // Enter'a basınca newLine() fonksiyonu ile yeni satıra geçme
        $(document).keypress(function(e) {
            if(e.which == 13) {
                newLine();
            }
        });
    }

    createDialog("do_you_like_beer");

    function createDialog(dialogName){
        dialogCount++;
        askQuestion(dialogName); // Soruyu sorduk.

        $(document).off("keypress"); // Önceki diyalogların keypress eventini kapadık.
        $(document).on("keypress",function(e) { // Yeni diyalog için keypress eventi açtık.
            if(e.which == 13) {
                inputValue = $("#input").val(); // input değerini alıyor
                if(actionType == "dialogAnswer"){
                    answerQuestion(dialogName, inputValue);
                }
            }
        });
        pressEnter(); // $(document).off("keypress"); ile tüm keypress eventleri kapanmıştı enter'ı tekrar açtık.

        function askQuestion(question){
            actionType = "dialogueQuestion";
            var response = dialogue(question);
            cout(path, response, "", 1); // Soruyu yazdır

            var response = dialogueAnswer( question, ''); //Cevapları yazdır
            for(var i=0; i<response.length; i++){
                cout("", response[i].id + "." + response[i].inputText, 'purple', 0); //Cevapları yazdır
            }
        }
        function answerQuestion(question, input){
            var response = dialogueAnswer( question, input);
            if(typeof response == "string"){ // Cevap doğru ise
                cout(path, input, "", 1); // Son girdini yazdır
                cout("", response, 'green', 0); // Cevabından gelen response'u(karşı cevabı) yazdır.
                actionType = "dialog_finished";
                cout("", "<br>", "", 0); // Doğru cevap sonrası boş satır atlat.
            }
            if(typeof response == "object"){ // Cevap yanlış ise
                cout(path, input, "", 1); // Son girdini yazdır
                cout("", 'Invalid input.', 'red spaced', 0); // Cevap yanlış ise Invalid input. yazdır
            }
            refreshInputLine();
        }
    }

    
    function newLine(){ // Asıl iş burada dönüyor. Burayı düşünelim :D

        var inputValue = $("#input").val(); // input değerini alıyor
        
        if(actionType == "create_new_dialog" && dialogCount < 10 && dialogFinished){ // Action yok ise
            if(dialogCount == 1){
                createDialog("do_you_like_girls");
            }
            else if(dialogCount == 2){
                createDialog("do_you_like_beer");
            }
            else if(dialogCount == 3){
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
            $("#container").append('<div class="line"><div class="text">'+path+'>'+inputValue+'</div></div>');
            $("#container").append('<div class="line spaced"><div class="text">'+helpText+'</div></div>');

        } if(!isValid) { // Girdi geçersiz ise
            
            if(inputValue == ""){ // Kaldırılacak
                $("#container").append('<div class="line"><div class="text">'+path+'></div></div>');
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
        init: function () { // Sayfa yüklenince (initialize olunca)
            refreshInputLine(); // İlk satırı oluşturdu.
            focusInput(); // Sayfada herhangi bir yere basınca input alanına focus olur.
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
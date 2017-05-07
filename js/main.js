//'use strict';

var start = function () {

    var pressEnter = function(){ // Enter'a basınca newLine() fonksiyonu ile yeni satıra geçme
        $(document).keypress(function(e) {
            if(e.which == 13) {
                newLine();
            }
        });
    }


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
            if(typeof response == "object"){ // Number type cevap gelmesi gerekiyor ise
                cout(path, response.question, "", 1); // Soruyu yazdır
                for(var i=0; i<response.answers.length; i++){
                    cout("", response.answers[i].id + "." + response.answers[i].inputText, 'purple', 0); //Cevapları yazdır
                }
            } else { // Text type cevap gelmesi gerekiyor ise
                cout(path, response, "", 1); // Soruyu yazdır
            }
        }
        function answerQuestion(question, input){
            var response = dialogueAnswer( question, input);
            if(response){ // Cevap doğru ise
                cout(path, input, "", 1); // Son girdini yazdır
                cout("", response, 'green', 0); // Cevabından gelen response'u(karşı cevabı) yazdır.
                actionType = "dialog_finished";
                cout("", "<br>", "", 0); // Doğru cevap sonrası boş satır atlat.
            }
            if(!response){ // Cevap yanlış ise
                cout(path, input, "", 1); // Son girdini yazdır
                cout("", 'Invalid input.', 'red spaced', 0); // Cevap yanlış ise Invalid input. yazdır
            }
            refreshInputLine();
        }
    }
    function initDialogues(){
        if(actionType == "create_new_dialog" && dialogFinished){
            if(dialogCount <= dialogueSequence.length){
                createDialog(dialogueSequence[dialogCount-1]); // if(dialogCount == 1){createDialog("do_you_like_girls");}
            }
        }
        if(actionType == "dialog_finished"){actionType="create_new_dialog";} // Actiondan yeni çıkıldı ise fazladan girdili satır oluşmasını engelleme
    }
    
    var dialogueSequence = ["do_you_like_girls", "do_you_like_beer", "do_you_like_girls", "do_you_like_beer"]; // Diyalogları sırası ile bu diziden oluşturuyor.
    function newLine(){
        initDialogues();
        refreshInputLine();
    }
    

    var mainCharacter = Characters.Gandalf; // Karakteri oluşturduk.
    //console.log(mainCharacter);
    //useSkill(mainCharacter, 1); // Skill kullandık.
    

    return {
        init: function () { // Sayfa yüklenince (initialize olunca)
            createDialog("name_dialog");
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


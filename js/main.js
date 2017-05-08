//'use strict';

var start = function () {

    var isMenuActive = false;

    var pressEnter = function(){ // Enter'a basınca newLine() fonksiyonu ile yeni satıra geçme
        $(document).on("keypress",function(e) {
            if(e.which == 13) {
                newLine();
            } if(e.keyCode == 99 && isMenuActive){
                loadMenu("character")
                $("#main-menu").hide();
                isMenuActive = false;
            } if(e.keyCode == 107 && isMenuActive){
                loadMenu("skill")
                $("#main-menu").hide();
                isMenuActive = false;
            } if(e.keyCode == 105 && isMenuActive){
                loadMenu("inventory");
                $("#main-menu").hide();
                isMenuActive = false;
            } if(e.keyCode == 109 && isMenuActive){
                loadMenu("map");
                $("#main-menu").hide();
                isMenuActive = false;
            } if(e.keyCode == 115 && isMenuActive){
                saveGame();
                $("#main-menu").hide();
                isMenuActive = false;
            } if(e.keyCode == 108 && isMenuActive){
                loadGame();
                $("#main-menu").hide();
                isMenuActive = false;
            }
        });
        $(document).on("keyup",function(e) {
            if(e.keyCode == 27){
                if(isMenuActive){
                    $("#main-menu").hide();
                    isMenuActive = false;
                } else {
                    $("#main-menu").show();
                    isMenuActive = true;
                }
            }
        });
    }

    function createDialogue(dialogueName){
        dialogueCount++;
        askQuestion(dialogueName); // Soruyu sorduk.

        $(document).off("keypress"); // Önceki diyalogların keypress eventini kapadık.
        $(document).on("keypress",function(e) { // Yeni diyalog için keypress eventi açtık.
            if(e.which == 13) {
                inputValue = $("#input").val(); // input değerini alıyor
                if(actionType == "dialogue_answer"){
                    answerQuestion(dialogueName, inputValue);
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
                    cout("", response.answers[i].id + "." + response.answers[i].inputText, "purple option", 0); //Cevapları yazdır
                }
            } else { // Text type cevap gelmesi gerekiyor ise
                cout(path, response, "", 1); // Soruyu yazdır
            }
        }
        function answerQuestion(question, input){
            var response = dialogueAnswer( question, input);
            if(response){ // Cevap doğru ise
                //cout(path, input, "", 1); // Son girdini yazdır
                cout("", response, "green", 0); // Cevabından gelen response'u(karşı cevabı) yazdır.
                //------------------------------------------------------------------------------------------------------------------------------------------------------------
                //actionType = "create_dialog";
                actionType = 0;
                finishedAction++;
                $(".line").each(function(){var isInputLine = $(this).children(".text").hasClass("option");if(isInputLine){$(this).remove();}}); // Doğru cevap sonrası yanlış cevapları siler.
                //------------------------------------------------------------------------------------------------------------------------------------------------------------
                cout("", "<br>", "", 0); // Doğru cevap sonrası boş satır atlat.
            }
            if(!response){ // Cevap yanlış ise
                //cout(path, input, "", 1); // Son girdini yazdır
                //cout("", "Invalid input.", "red spaced", 0); // Cevap yanlış ise Invalid input. yazdır
            }
            refreshInputLine();
        }
    }
    function initDialogue(){
        if(actionType == "create_dialog"){
            if(dialogueCount < dialogueSequence.length){
                createDialogue(dialogueSequence[dialogueCount]); // if(dialogueCount == 1){createDialogue("do_you_like_girls");}
            }
        }
    }
    
    function createStoryText(storyName){
        storyCount++;
        actionType = "create_story_text";
        cout("",story[storyName ].text,"",0);
        cout("", "<br>", "", 0); // Hikaye sonrası boş satır atlat.
        story[storyName].isShown = true;
        finishedAction++;
    }
    function initStory(){
        if(actionType == "create_story_text"){
            if(storyCount < storySequence.length){
                createStoryText(storySequence[storyCount]); // if(storyCount == 1){createStoryText("starting_story");}
            }
        }
    }

    var dialogueSequence = ["name_dialogue", "do_you_like_beer", "do_you_like_girls", "do_you_like_girls"]; // Diyalogları sırası ile bu diziden oluşturuyor.
    var storySequence = ["starting_story", "second_story", "starting_story"]; // Diyalogları sırası ile bu diziden oluşturuyor.
    var akisSirasi = [
        {id:1, type:"dialogue"},
        {id:2, type:"story"},
        {id:3, type:"story"},
        {id:4, type:"dialogue"},
        {id:5, type:"dialogue"},
        {id:6, type:"story"},
        {id:7, type:"dialogue"},
    ];

    function newLine(){
        if(actionType != "dialogue_answer" && finishedAction < akisSirasi.length){
            if(akisSirasi[finishedAction].type == "dialogue"){
                actionType = "create_dialog";
                initDialogue();
            } else if(akisSirasi[finishedAction].type == "story") {
                actionType = "create_story_text";
                initStory();
            }
            scrollBottom();
        }
        refreshInputLine();
    }
    

    var mainCharacter = Characters.Gandalf; // Karakteri oluşturduk.
    //console.log(mainCharacter);
    //useSkill(mainCharacter, 1); // Skill kullandık.
    

    return {
        init: function () { // Sayfa yüklenince (initialize olunca)
            //createDialogue("name_dialogue");
            cout("", "Welcome visitor. Press enter to continue...<br><br>", "green", 0);
            refreshInputLine(); // İlk satırı oluşturdu.
            focusInput(); // Sayfada herhangi bir yere basınca input alanına focus olur.
            pressEnter(); // Enter kontrolünü ekledi.
        }
    };
}();

jQuery(document).ready(function () {
  start.init();
  setInterval(drawMatrix, 35);
});


/* Matrix */
var canvas = document.getElementById("matrix");
var ctx = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
var matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%";
matrix = matrix.split("");
var font_size = 10;
var columns = canvas.width/font_size; //number of columns for the rain
//an array of drops - one per column
var drops = [];
//x below is the x coordinate
//1 = y co-ordinate of the drop(same for every drop initially)
for(var x = 0; x < columns; x++)
    drops[x] = 1; 

//drawing the characters
var drawMatrix = function(){
    ctx.fillStyle = "rgba(0, 0, 0, 0.04)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#0F0"; //green text
    ctx.font = font_size + "px arial";
    //looping over drops
    for(var i = 0; i < drops.length; i++)
    {
        //a random chinese character to print
        var text = matrix[Math.floor(Math.random()*matrix.length)];
        //x = i*font_size, y = value of drops[i]*font_size
        ctx.fillText(text, i*font_size, drops[i]*font_size);

        //sending the drop back to the top randomly after it has crossed the screen
        //adding a randomness to the reset to make the drops scattered on the Y axis
        if(drops[i]*font_size > canvas.height && Math.random() > 0.975)
            drops[i] = 0;

        //incrementing Y coordinate
        drops[i]++;
    }
}
/* Matrix */














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



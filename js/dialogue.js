
function initDialogue(){
    if(dialogueCount < dialogueSequence.length){
        createDialogue(dialogueSequence[dialogueCount]); // if(dialogueCount == 1){createDialogue("do_you_like_girls");}
    }
}
function createDialogue(dialogueName){
    dialogueCount++;
    askQuestion(dialogueName); // Soruyu sorduk.
    current_dialogue_name = dialogueName;
    answer = $("#input").val(); // Cevaptan gelen response'u alıyor alıyor.
}

function askQuestion(question){
    var response = dialogueQuestion(question);
    if(typeof response == "object"){ // Number type cevap gelmesi gerekiyor ise
        cout(response.question, "", path); // Soruyu yazdır
        for(var i=0; i<response.answers.length; i++){
            cout(response.answers[i].id + "." + response.answers[i].inputText, "purple option"); //Cevapları yazdır
        }
    } else { // Text type cevap gelmesi gerekiyor ise
        cout(response, "", path); // Soruyu yazdır
    }
}
function answerQuestion(question, input){
    var response = dialogueAnswer( question, input);
    if(response){ // Cevap doğru ise
        //cout(input, "", path); // Son girdini yazdır
        cout(response, "green"); // Cevabını(67. satırdan gelen return <div style='color: #00F; color: red'>) ve cevabından gelen response'u(karşı cevabı) yazdır. YEŞİL.
        $(".line").each(function(){var isInputLine = $(this).children(".text").hasClass("option");if(isInputLine){$(this).remove();}}); // Doğru cevap sonrası yanlış cevapları siler.
        cout("<br>"); // Doğru cevap sonrası boş satır atlat.
        finished_action++;
        action_type = 0;
         
        //////////////////////
        if(dialogues[question].type == "number"){
            if(dialogues[question].answers && dialogues[question].answers[input-1].action){
                dialogues[question].answers[input-1].action();
            }
        }
        ///////////////////////
    }
    if(!response){ // Cevap yanlış ise
        //cout(input, "", path); // Son girdini yazdır
        //cout("Invalid input.", "red spaced"); // Cevap yanlış ise Invalid input. yazdır
    }
    //refreshInputLine();
}

function dialogueQuestion(question){
    action_type = "dialogue_question";
    if(dialogues[question].type == "text"){
        return dialogues[question].question;
    } else if(dialogues[question].type == "number"){
        return dialogues[question];
    }
}
function dialogueAnswer(question, input){
    if(dialogues[question].type == "text" && input != ""){ // Text tipi cevap isteyen soru ise (Story)
        dialogues[question].saveAnswer(input); // Story'nin cevabını kaydetti ve yapması gereken işlem varsa yaptı.
        var printText = dialogues[question].printText(input);
        action_type = 0;
        scrollBottom();
        return printText;
    } else if(input == ""){ // Cevap boş ise (tip fark etmez)
        action_type = "dialogue_answer";
        return false;
    }
    else if(dialogues[question].type == "number"){// Number tipi cevap isteyen soru ise
        if(dialogues[question].answers[input-1]){ // number type sorudan geçerli cevap gelirse
            action_type = 0;
            //1.Yes i like OK, man nice. MAVİ (Seçtiğin cevap).
            return "<div style='color: #00F;'>"+(dialogues[question].answers[input-1].id)+'.'+dialogues[question].answers[input-1].inputText+'</div>'+dialogues[question].answers[input-1].saveAnswer(dialogues[question].keyName); // Girdi doğru ise
            //1.Yes i like OK, man nice.
        } else { // number type sorudan geçersiz cevap gelirse
            action_type = "dialogue_answer";
            return false;
        }
    }
}

var dialogueAnswers = {} // Diyaloglardan gelen cevaplar bu objede saklanıyor.
function getDialogueAnswers(key){ // Cevapları çekmek için sorunun key'i gönderilmeli.
    return dialogueAnswers[key];
}


function initDialogue(){
    if(dialogueCount < dialogueSequence.length){
        createDialogue(dialogueSequence[dialogueCount]); // if(dialogueCount == 1){createDialogue("do_you_like_girls");}
    }
}
function createDialogue(dialogueName){
    dialogueCount++;
    askQuestion(dialogueName); // Soruyu sorduk.
    current_dialogue_name = dialogueName;
    action_type == "dialogue_question";
    answer = $("#input").val(); // Cevaptan gelen response'u alıyor alıyor.
}

function askQuestion(question){
    var response = dialogueQuestion(question);
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
        $(".line").each(function(){var isInputLine = $(this).children(".text").hasClass("option");if(isInputLine){$(this).remove();}}); // Doğru cevap sonrası yanlış cevapları siler.
        cout("", "<br>", "", 0); // Doğru cevap sonrası boş satır atlat.
        finished_action++;
        action_type = 0;
    }
    if(!response){ // Cevap yanlış ise
        //cout(path, input, "", 1); // Son girdini yazdır
        //cout("", "Invalid input.", "red spaced", 0); // Cevap yanlış ise Invalid input. yazdır
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
    if(dialogues[question].type == "text" && input != ""){ // Text tipi cevap isteyen soru ise
        dialogues[question].saveAnswer(input);
        action_type = 0;
        scrollBottom();
        return "<div style='color: #0F0'>OK, your name is "+input; // Girdi doğru ise;
    } else if(input == ""){
        action_type = "dialogue_answer";
        return false;
    }
    if(dialogues[question].type == "number"){// Number tipi cevap isteyen soru ise
        if(dialogues[question].answers[input-1]){ // number type sorudan geçerli cevap gelirse
            action_type = 0;
            return "<div style='color: #00F'>"+(dialogues[question].answers[input-1].id)+'.'+dialogues[question].answers[input-1].inputText+'</div>'+dialogues[question].answers[input-1].saveAnswer(dialogues[question].keyName); // Girdi doğru ise
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

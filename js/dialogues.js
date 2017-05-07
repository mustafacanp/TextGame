


var dialogueAnswers = {} // Diyaloglardan gelen cevaplar bu objede saklanıyor.

function getdialogueAnswers(key){ // Cevapları çekmek için sorunun key'i gönderilmeli.
    return dialogueAnswers[key];
}

function dialogue(question){
    //console.log(dialogues[question][0].question);
    actionType = "dialogue_answer";
    if(dialogues[question].type == "text"){
        return dialogues[question].question;
    } else if(dialogues[question].type == "number"){
        return dialogues[question];
    }
}
function dialogueAnswer(question, input){
    if(dialogues[question].type == "text" && input != ""){ // Text tipi cevap isteyen soru ise
        dialogues[question].saveAnswer(input);
        actionType = 0;
        return "<div style='color: #0F0'>OK, your name is "+input; // Girdi doğru ise;
    } else if(input == ""){
        actionType = "dialogue_answer";
        return false;
    }
    if(dialogues[question].type == "number"){// Number tipi cevap isteyen soru ise
        //console.log(dialogues[question].answers);
        if(dialogues[question].answers[input-1]){ // number type sorudan geçerli cevap gelirse
            actionType = 0;
            return "<div style='color: #00F'>"+(dialogues[question].answers[input-1].id)+'.'+dialogues[question].answers[input-1].inputText+'</div>'+dialogues[question].answers[input-1].saveAnswer(dialogues[question].keyName); // Girdi doğru ise
        } else { // number type sorudan geçersiz cevap gelirse
            actionType = "dialogue_answer";
            return false;
        }
    }
}

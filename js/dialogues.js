
var dialogues = {
    name_dialog :
    {
        id : 1,
        keyName : "name_dialog",
        type : "text",
        question : "Hello my friend, tell me your name?",
        saveAnswer : function (answer){
            dialogueAnswers[this.keyName] = answer; // dialogueAnswers objesine diyalog key ve cevabı yazdırdık
            options.name = answer; // options objesindeki name özelliğine gelen cevabı yazdırdık
        }
    },
    do_you_like_beer :
    {
        id : 2,
        keyName : "do_you_like_beer",
        type : "number",
        question : "Do you like beer?",
        answers : 
            [{
                id : 1,
                inputText : "Yes i like",
                saveAnswer : function (keyName){
                    dialogueAnswers[keyName] = this.inputText;
                    return "OK, man nice.";
                }
            },
            {
                id : 2,
                inputText : "I hate that shit.",
                saveAnswer : function (keyName){
                    dialogueAnswers[keyName] = this.inputText;
                    return "OK man, calm down..";
                }
            },
            {
                id : 3,
                inputText : "I love it!",
                saveAnswer : function (keyName){
                    dialogueAnswers[keyName] = this.inputText;
                    return "Wow maan... Take it and end this fucking game!";
                }
            }]
    },
    do_you_like_girls :
    {
        id : 3,
        keyName : "do_you_like_girls",
        type : "number",
        question : "Do you like girls?",
        answers : 
            [{
                id : 1,
                inputText : "Of course i like girls.",
                saveAnswer : function (keyName){
                    dialogueAnswers[keyName] = this.inputText;
                    return "OK, nice.";
                }
            },
            {
                id : 2,
                inputText : "I am a girl...",
                saveAnswer : function (keyName){
                    dialogueAnswers[keyName] = this.inputText;
                    return "OK lady, calm down.. Sorry about for calling you 'man'.";
                }
            },
            {
                id : 3,
                inputText : "Girls? I am Gay.",
                saveAnswer : function (keyName){
                    dialogueAnswers[keyName] = this.inputText;
                    return "From now on your name is Gaylord";
                }
            }]
    },
}

var dialogueAnswers = {} // Diyaloglardan gelen cevaplar bu objede saklanıyor.
function getdialogueAnswers(key){ // Cevapları çekmek için sorunun key'i gönderilmeli.
    return dialogueAnswers[key];
}

function dialogue(question){
    //console.log(dialogues[question][0].question);
    actionType = "dialogAnswer";
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
        dialogFinished = true;
        return "<div style='color: #0F0'>OK, your name is "+input; // Girdi doğru ise;
    } else if(input == ""){
        actionType = "dialogAnswer";
        return false;
    }
    if(dialogues[question].type == "number"){// Number tipi cevap isteyen soru ise
        //console.log(dialogues[question].answers);
        if(dialogues[question].answers[input-1]){ // number type sorudan geçerli cevap gelirse
            actionType = 0;
            dialogFinished = true;
            return "<div style='color: #00F'>"+(dialogues[question].answers[input-1].id)+'.'+dialogues[question].answers[input-1].inputText+'</div>'+dialogues[question].answers[input-1].saveAnswer(dialogues[question].keyName); // Girdi doğru ise
        } else { // number type sorudan geçersiz cevap gelirse
            actionType = "dialogAnswer";
            return false;
        }
    }
}
/*
var inputTypes = {
string : [],
yes_no : [0,1],
skill : [1,2,3,4],
isValid : function(){
    if(asd == 2){}
}
}
*/
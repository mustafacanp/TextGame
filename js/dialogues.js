
var dialogues = {
    name_dialog :
    {
        id : 1,
        keyName : "name_dialog",
        type : "text",
        question : "Hello my friend, tell me your name?",
        saveAnswer : function (answer){
            options.name = answer;
            console.log(options);
            answers[this.keyName] = answer;
            getNumberQuestionAnswers(this.keyName);
        }
    },
    do_you_like_beer :
    {
        id : 2,
        keyName : "do_you_like_beer",
        type : "number",
        question : "Do you like beer?",
        answers : [
        {
            id : 1,
            inputText : "Yes i like",
            saveAnswer : function (){
                return "OK, man nice.";
            }
        },
        {
            id : 2,
            inputText : "I hate that shit.",
            saveAnswer : function (){
                return "OK man, calm down..";
            }
        },
        {
            id : 3,
            inputText : "I love it!",
            saveAnswer : function (){
                return "Wow maan... Take it and end this fucking game!";
            }
        }
    ]},
    do_you_like_girls :
    {
        id : 3,
        keyName : "do_you_like_girls",
        type : "number",
        question : "Do you like girls?",
        answers : [
        {
            id : 1,
            inputText : "Of course i like girls.",
            saveAnswer : function (){
                return "OK, nice.";
            }
        },
        {
            id : 2,
            inputText : "I am a girl...",
            saveAnswer : function (){
                return "OK lady, calm down.. Sorry about for calling you 'man'.";
            }
        },
        {
            id : 3,
            inputText : "Girls? I am Gay.",
            saveAnswer : function (){
                return "From now on your name is Gaylord";
            }
        }
    ]},
}

var answers = {}
function getNumberQuestionAnswers(key){
    return ;
}
function getTextQuestionAnswers(key){
    console.log(answers[key]);
    return ;
}

function dialogue(question){
    //console.log(dialogues[question][0].question);
    actionType = "dialogAnswer";
    return dialogues[question].question;
}
function dialogueAnswer(question, input){
    if(dialogues[question].type == "text"){
        dialogues[question].saveAnswer(input);
        actionType = 0;
        dialogFinished = true;
        return "<div style='color: #0F0'>OK, your name is "+input; // Girdi doğru ise;
    }
    if(dialogues[question].type == "number"){
        //console.log(dialogues[question].answers);
        if(dialogues[question].answers[input-1]){ // number type sorudan doğru cevap gelirse
            actionType = 0;
            dialogFinished = true;
            return "<div style='color: #00F'>"+(dialogues[question].answers[input-1].id)+'.'+dialogues[question].answers[input-1].inputText+'</div>'+dialogues[question].answers[input-1].saveAnswer(); // Girdi doğru ise
        } else { // number type sorudan yanlış cevap gelirse
            actionType = "dialogAnswer";
            return false; // Yanlış girdi gelirse doğru girdi olan diğer şıkları görüntüleyecek...
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
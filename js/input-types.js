
function getInput(type, param1, param2) {
    switch (arguments.length) { //overload kaç argument? (type, parameter1, parameter2)
    case 1:
        console.log("getInput() fonskiyonu 3 parametre ile cagirilir. Detaylar icin intput-types.js'i inceleyin.");
        return false;
    case 2:
        if(type == "dialogue"){ // type = "dialogue"" ise
            this.actionType = "dialogueQuestion";
            return dialogue(param1); // question, answer
        }
        break;
    case 3:
        if(type == "dialogue"){ // type = "dialogue"" ise
            this.actionType = "dialogueAnswer";
            return dialogueAnswer(param1, param2); // question, answer
        }
        break;
    }
}


    var dialogues = {
        do_you_like_beer : [
            {
                question : "Do you like beer?"
            },
            {
                id : 1,
                inputText : "I hate that shit.",
                output : function (){
                    return "OK man, calm down..";
                }
            },
            {
                id : 2,
                inputText : "Yes i like",
                output : function (){
                    return "OK, nice.";
                }
            },
            {
                id : 3,
                inputText : "I love it!",
                output : function (){
                    return "Wow maan... Take it and end this fucking game!";
                }
            }
        ],/*
        yes_no : {
            
        },
        skill : [1,2,3,4],
        isValid : function(){
            if(asd == 2){}
        }*/
    }
    function dialogue(question){
        
        //console.log("Soru line'i olustur.");
        //console.log(dialogues[question][0].question);
        return dialogues[question][0].question;
    }
    function dialogueAnswer(question, answer){
        if(dialogues[question][answer]){
            //console.log(dialogues[question][answer].output());
            return dialogues[question][answer].output();
        }
        else{
            //console.log(dialogues[question]);
            return dialogues[question]; // Yanlış girdi gelirse doğru girdi olan diğer şıkları görüntüleyecek...
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
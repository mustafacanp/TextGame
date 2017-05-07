
var dialogues = {
    do_you_like_beer : [
        {
            question : "Do you like beer?",
            id : 1,
            inputText : "Yes i like",
            output : function (){
                return "OK, nice.";
            }
        },
        {
            id : 2,
            inputText : "I hate that shit.",
            output : function (){
                return "OK man, calm down..";
            }
        },
        {
            id : 3,
            inputText : "I love it!",
            output : function (){
                return "Wow maan... Take it and end this fucking game!";
            }
        }
    ],
    do_you_like_girls : [
        {
            question : "Do you like girls?",
            id : 1,
            inputText : "No i am Gay.",
            output : function (){
                return "OK gay..";
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
    ],
    
    
    /*
    yes_no : {
        
    },
    skill : [1,2,3,4],
    isValid : function(){
        if(asd == 2){}
    }*/
}
function dialogue(question){
    //console.log(dialogues[question][0].question);
    actionType = "dialogAnswer";
    return dialogues[question][0].question;
}
function dialogueAnswer(question, input){
    if(dialogues[question][input-1]){
        actionType = 0;
        dialogFinished = true;
        console.log(dialogCount);
        return "<div style='color: #00F'>"+dialogues[question][input-1].id+'.'+dialogues[question][input-1].inputText+'</div>'+dialogues[question][input-1].output(); // Girdi doğru ise
    }
    else{
        actionType = "dialogAnswer";
        console.log(dialogCount);
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
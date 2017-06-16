
var dialogues = {
    name_dialogue :
    {
        id : 1,
        keyName : "name_dialogue",
        type : "text",
        question : "Bu arada ben Terminal. Senin adın nedir?",
        printText : function(input){
            return "<span class='green'>" + input + "</span>";
        },
        saveAnswer : function (answer){
            dialogueAnswers[this.keyName] = answer; // dialogueAnswers objesine diyalog key ve cevabı yazdırdık
            options.name = answer; // options objesindeki name özelliğine gelen cevabı yazdırdık
        }
    },
    nick_dialogue :
    {
        id : 2,
        keyName : "nick_dialogue",
        type : "text",
        question : "Peki sana nasıl hitap etmemi istersin? Lordum, yabancı, kanka ya da ne istersen.",
        printText : function(input){
            return "Tamam <span class='green'>" + s_fake_nick + "</span>. Neyse nerede kalmışık sana " + ek(s_city, "e") + " anlatıyordum. " + ek(s_city, "de") +
            " yüzlerce yıl önce üç kadim ırk birlikte yaşardı. İnsanlar, " + ek(s_race2, "ler") + " ve " + ek(s_race3, "ler") + ".";
        },
        saveAnswer : function (answer){
            dialogueAnswers[this.keyName] = answer; // dialogueAnswers objesine diyalog key ve cevabı yazdırdık
            options.name = answer; // options objesindeki name özelliğine gelen cevabı yazdırdık
        }
    },
    do_you_like_beer :
    {
        id : 3,
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
    do_you_wanna_fight :
    {
        id : 4,
        keyName : "do_you_wanna_fight",
        type : "number",
        question : "Do you wanna fight?",
        answers : 
            [{
                id : 1,
                inputText : "Yes.",
                saveAnswer : function (keyName){
                    dialogueAnswers[keyName] = this.inputText;
                    return "Prepare to fight!";
                },
                action : function (keyName){
                    isFight = true;
                    action_type = "prepare_fight";
                    enemy = Characters.gandalf;
                }
            },
            {
                id : 2,
                inputText : "No.",
                saveAnswer : function (keyName){
                    dialogueAnswers[keyName] = this.inputText;
                    return "Okey then, go on...";
                },
                action : function (keyName){
                    
                }
            }]
    },
}

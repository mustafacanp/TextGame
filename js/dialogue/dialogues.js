
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
            options.nickName = answer; // options objesindeki name özelliğine gelen cevabı yazdırdık
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
    do_you_wanna_fight :
    {
        id : 4,
        keyName : "do_you_wanna_fight",
        type : "number",
        question : "Önünü kestiler savaşmak istiyor musun?",
        answers :
            [{
                id : 1,
                inputText : "Evet",
                saveAnswer : function (keyName){
                    dialogueAnswers[keyName] = this.inputText;
                    return "Hazırlıklarını bitir savaş başlıyor!";
                },
                action : function (keyName){
                    $("#container-info").css("display","block"); // TODO: #container-info göster
                    const goblin = new Goblin();
                    startFight(goblin, 1);
                }
            },
            {
                id : 2,
                inputText : "Hayır",
                saveAnswer : function (keyName){
                    dialogueAnswers[keyName] = this.inputText;
                    return "Koşarak uzaklaştın...";
                },
                action : function (keyName){

                }
            }]
    },
}


var path = ""; // Satır başı yazısı
var blinkCursor; // İmleç
var is_menu_active = false; // Main menu açık iken input'a hiç birşey yazdırmaması kontrolü.
var menu_keys = false; // Main menu'den birşey seçip menüyü kapatınca input'a seçtiğin değeri yazdırmaması kontrolü.
var is_menu_available = true; // Main Menu'ye erişim kontrolü.
var is_screen_loaded = false; // Main Menu'ye erişim kontrolü.
var action_type = 0;
var finished_action = 0;
var dialogueCount = 0;
var storyCount = 0;
var t_speed = 25; // t plugin text writing speed.
var current_dialogue_name = ""; // action() içinde, action_type = "dialogue_answer" devam ediyor ise hangi diyaloğa cevap vereceğini tutuyor.
var is_writing = false;
var is_animating = false;
var isFight = false;

//init object
var options = new Options();

s_fake_nick = "sadıç";
s_fake_nick_e = "sadıca";
s_fake_nick_i = "sadıcı";
s_fake_nick_de = "sadıçda";
s_fake_nick_den = "sadıçdan";

s_city = "Mordor";
s_city_e = "Mordor'a";
s_city_i = "Mordor'u";
s_city_de = "Mordor'da";
s_city_den = "Mordor'dan";

s_year_ago = "yüzlerce";

s_race2 = "Orclar";
s_race3 = "Elfler";

s_human_king = "Gaylord";
s_human_king_e = "Gaylord'a";
s_human_king_i = "Gaylord'u";
s_human_king_de = "Gaylord'da";
s_human_king_den = "Gaylord'dan";

s_race3_mountain = "Ağrı";

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
            return "Tamam <span class='green'>" + s_fake_nick + "</span>. Neyse nerede kalmışık sana " + s_city_e + " anlatıyordum. " + s_city_de + " " + s_year_ago + " yıl önce 3 kadim ırk birlikte yaşardı. "+
            "İnsanlar, " + s_race2 + ", " + s_race3 + ".";
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

var stories = {
    starting_story :
    {
        id : 1,
        isShown: false,
        keyName : "first_story",
        text : "Hoşgeldin yabancı. Burası " + s_city + ". Herşeyden önce istersen sana biraz " + s_city_i + "n hikayesini anlatayım. "+
                "Enter'a basmadan önce çayını kahveni al gel istersen. Anlatacakların uzun sürebilir.",
    },
    first_story :
    {
        id : 2,
        isShown: false,
        keyName : "starting_story",
        text : "Bu ırklar Tanrıları farklı olsa da yüzyıllarca barış içinde yaşadılar. Yüzyıllarca süren barış insanların başında olan zalim hükümdar " + s_human_king_i +
        "n anlaşmayı bozmasıyla sonra erdi. Gözü hep " + s_race3 + "'lerin teknolojisinde olan ve " + s_race3 + "'lerin hep insanlardan daha gelişmiş olmasını çekemeyen " +
        s_human_king + ", " + s_race2 + "'ları da yanına alarak " + s_race3 + "'lere savaş açtı. Kendini sadece teknoloji ve gelişmeye adayan elfler çok dayanamadı. " +
        "Şehirlerini terk ederek bir daha görünmemek üzere dağlara kaçtılar. Nereye gittikleri hiç bilinmedi. Kimilerine göre Toprak Tanrısı halkını göğe yükseltti, " +
        "kimilerine göre hiç kimsenin görmediği " + s_race3_mountain + " Dağında Tanrıları tarafından korunuyorlar, kimilerine göre de haydut oldular.",
    },
    second_story :
    {
        id : 3,
        isShown: false,
        keyName : "second_story",
        text : "Bu arada " + s_race3 + "lerin hikaye ile hiçbir alakası yok, genel kültür olsun diye anlattım. Ortamlarda satarsın kim bilecek? Ihımh neyse asıl hikayeye gelelim.",
    },
    third_story :
    {
        id : 4,
        isShown: false,
        keyName : "third_story",
        text : "Aradan uzun yıllar geçer insanlar ve " + s_race2 + "lar huzur içinde yaşarlar. Ta ki yukarıda işler değişinceye kadar...",
    },
    forth_story :
    {
        id : 5,
        isShown: false,
        keyName : "forth_story",
        text : "Tanrılar için sıradan bir gündü. Rakı masası kurulmuş, mezeler hazırlanmış, su tanrısının rakıları getirmesi bekleniyordu. Toprak Tanrısı halkının maduriyetinden yakınıyordu.",
    },
    fifth_story :
    {
        id : 6,
        isShown: false,
        keyName : "fifth_story",
        text : "Su Tanrısı elinde rakı tepsisiyle geldi. Gelirken yanardağın altını açık unuttuğunu hatırlayan Ateş Tanrısı bir de rakısına su katıldığını görünce Ateş Tanrısına patladı ve dedi ki:<br />"+
        "- 水のファゴットのたれのアナンダ、ファックファックおっぱいがディックジュースをお尻<br />"+
        "Ateş Tanrısı çok ağır konuşmuştu. Su Tanrısı hiddetle ayağa kalktı ve dedi ki:<br />"+
        "+ アナンダ、シュート胸クソたるみお尻ファックディック溶岩ファゴットファゴット"
    },
    sixth_story :
    {
        id : 7,
        isShown: false,
        keyName : "sixth_story",
        text : "Bu diyalog hakkında sadece Tanrılar arasında bir savaş başlattığını biliyorum. Bana da hak ver sadece bir terminalim Tanrıların dilinde konuşamıyorum malesef."
    },
    seventh_story :
    {
        id : 6,
        isShown: false,
        keyName : "seventh_story",
        text : "Su Tanrısı'nın sözleri üzerine Ateş Tanrısı dünyaya indi ve insanların şehirlerine saldırmaya başladı. "+
        "Su Tanrısı Ateş Tanrısının saldırısını püskürttü. Ateş Tanrısı tüm gücünü kaybetmişti. "+
        "Bunun üzerine Ateş Tanrısı " + s_race2 + "ları de alarak ateşin kaynağı olan yer altına güç toplamak için indi.",
    },



    seventh_story :
    {
        id : 6,
        isShown: false,
        keyName : "seventh_story",
        text : "Su Tanrısı'nın sözleri üzerine Ateş Tanrısı dünyaya indi ve insanları yakmaya başladı. Su Tanrısı denizlerin Ateş Tanrısının verdiği hasarı engelledi ve tüm gücünü emdi."+
        "Bunun üzerine Ateş Tanrısı {2}leri de alarak ateşin kaynağı olan yer altına güç toplamak için indi."
    },
    accept_fight :
    {
        id : 7,
        isShown: false,
        keyName : "accept_fight",
        text : "STORY dovusu kabul ettin",
        doAction : function(){
            
        }
    },
    decline_fight :
    {
        id : 7,
        isShown: false,
        keyName : "decline_fight",
        text : "STORY dovusu kabul reddettin",
        doAction : function(){
            action_type = 0;
        }
    },
    force_fight :
    {
        id : 8,
        isShown: false,
        keyName : "force_fight",
        text : "Suspendisse porta, urna eu molestie condimentum, urna felis tincidunt lectus.",
        doAction : function(){
            
        }
    }
}





/*
X = Mordor
Y = çükübik
Z = 3bin
1 = Saruman
2 = Cadılar
3 = Elf

Story
Hoşgeldin yabancı. Burası {x}. Herşeyden önce istersen sana biraz {x}'in hikayesini anlatayım.
Enter'a basmadan önce çayını kahveni al gel istersen.
Anlatacakların uzun sürebilir.


Dialog (Text)
Bu arada ben Terminal. Senin adın nedir?


Dialog (Text)
Peki sana nasıl hitap etmemi istersin?


Story
Tamam {Y}. Neyse nerede kalmışık sana {x}'i anlatıyordum. {x}'da {z} yıl önce 3 kadim ırk birlikte yaşardı. İnsanlar, {1}, {2}.
Animation (Yazı kalıyor.)


Story
Bu ırklar Tanrıları farklı olsa da yüzyıllarca barış içinde yaşadılar. Yüzyıllarca süren barış insanların başında olan zalim hükümdar {1}'ın anlaşmayı bozmasıyla sonra erdi. Gözü hep {3}'lerin teknolojisinde olan ve {3}'lerin hep insanlardan daha gelişmiş olmasını çekemeyen {1}, {2}'leri de yanına alarak {3}'lere savaş açtı. Kendini sadece teknoloji ve gelişmeye adayan elfler çok dayanamadı. Şehirlerini terk ederek bir daha görünmemek üzere dağlara kaçtılar. Nereye gittikleri hiç bilinmedi. Kimilerine göre Toprak Tanrısı halkını halkını göğe yükseltti, kimilerine göre hiç kimsenin görmediği {4} Dağında Tanrıları tarafından korunuyorlar, kimilerine göre de haydut oldular.
Animation?(Dağ)


Story
Bu arada {3}lerin hikaye ile hiçbir alakası yok, genel kültür olsun diye anlattım. Ortamlarda satarsın kim bilecek? Ihımh neyse asıl hikayeye gelelim.


Story
Aradan uzun yıllar geçer insanlar ve {2}ler huzur içinde yaşarlar. Ta ki yukarıda işler değişinceye kadar...

Animation + (Altına) Story
Tanrılar için sıradan bir gündü. Rakı masası kurulmuş, mezeler hazırlanmış, su tanrısının rakıları getirmesi bekleniyordu. Toprak Tanrısı halkının maduriyetinden yakınırıyordu.


Story
Su Tanrısı elinde rakı tepsisiyle geldi. Gelirken yanardağın altını açık unuttuğunu hatırlayan Ateş Tanrısı bir de rakısına su katıldığını görünce Su Tanrısına patladı ve dedi ki:
- 水のファゴットのたれのアナンダ、ファックファックおっぱいがディックジュースをお尻
+ アナンダ、シュート胸クソたるみお尻ファックディック溶岩ファゴットファゴット


Story
Bu diyalog hakkında sadece Tanrılar arasında bir savaş başlattığını biliyorum. Bana da hak ver sadece bir terminalim Tanrıların dilinde konuşamıyorum malesef.


Story
Ateş Tanrısı dünyaya iner ve insanları yakmaya başlar. Su Tanrısı Ateş Tanrısının verdiği hasarı engeller ve tüm gücünü emer. Bunun üzerine Ateş Tanrısı {2}leri de alarak ateşin kaynağı olan yer altına güç toplamak için iner.


Cadılar artık yer alında yaşamaya başlamıştır. Hikaye yüzyıllarca anlatılarak {2 }efnaseye dönüşür. Artık kimse {2}lerin varlığına bile inanmamaktadır.


Ama bir gün gücünü toplayan Ateş Tanrısı halkı ile X'in hakimi olmak için yer yüzüne çıkar...

*/

var stories = {
    starting_story :
    {
        id : 1,
        isShown: false,
        keyName : "first_story",
        text : "Hoşgeldin yabancı. Burası " + s_city + ". Herşeyden önce istersen sana biraz " + ek(s_city, "in") + " hikayesini anlatayım. "+
                "Enter'a basmadan önce çayını kahveni al gel istersen. Anlatacakların uzun sürebilir.",
    },
    first_story :
    {
        id : 2,
        isShown: false,
        keyName : "starting_story",
        text : "Bu ırklar tanrıları farklı olsa da yüzyıllarca barış içinde yaşadılar. Yüzyıllarca süren barış insanların başında olan zalim hükümdar " +
        ek(s_human_king, "in") + " anlaşmayı bozmasıyla sonra erdi. Gözü hep " + ek(s_race3, "ler,in") + " teknolojisinde olan ve " + ek(s_race3, "ler,in") +
        " hep insanlardan daha gelişmiş olmasını çekemeyen " + s_human_king + ", " + ek(s_race2, "ler,i") + " da yanına alarak " +
        ek(s_race3, "ler,e") + " savaş açtı.",
    },
    first_story_2 :
    {
        id : 3,
        isShown: false,
        keyName : "first_story_2",
        text : "Kendini sadece teknoloji ve gelişmeye adayan " + ek(s_race3, "ler") + " çok dayanamadı. " +
        "Şehirlerini terk ederek bir daha görünmemek üzere dağlara kaçtılar. Nereye gittikleri hiç bilinmedi. Kimilerine göre Toprak Tanrısı halkını göğe yükseltti, " +
        "kimilerine göre hiç kimsenin görmediği " + ek(s_race3_mountain, "in,de") + " tanrıları tarafından korunuyorlar, kimilerine göre de haydut oldular.",
    },
    second_story :
    {
        id : 4,
        isShown: false,
        keyName : "second_story",
        text : "Bu arada " + ek(s_race3, "ler,in") + " hikaye ile hiçbir alakası yok, genel kültür olsun diye anlattım. " +
        "Ortamlarda satarsın kim bilecek? Ihımh neyse asıl hikayeye gelelim.",
    },
    third_story :
    {
        id : 5,
        isShown: false,
        keyName : "third_story",
        text : "Aradan uzun yıllar geçer insanlar ve " + ek(s_race2, "ler") + " huzur içinde yaşarlar. Ta ki yukarıda işler değişinceye kadar...",
    },
    forth_story :
    {
        id : 6,
        isShown: false,
        keyName : "forth_story",
        text : "Tanrılar için sıradan bir gündü. Rakı masası kurulmuş, mezeler hazırlanmış, Su Tanrısı'nın rakıları getirmesi bekleniyordu. " +
        "Toprak Tanrısı halkının maduriyetinden yakınıyordu.",
    },
    fifth_story :
    {
        id : 7,
        isShown: false,
        keyName : "fifth_story",
        text : "Su Tanrısı elinde rakı tepsisiyle geldi. Gelirken yanardağın altını açık unuttuğunu hatırlayan Ateş Tanrısı bir de rakısına " +
        "su katıldığını görünce Su Tanrısı'na patladı ve dedi ki:<br />"+
        "- 水のファゴットのたれのアナンダ、ファックファックおっぱいがディックジュースをお尻<br />"+
        "Ateş Tanrısı çok ağır konuşmuştu. Su Tanrısı hiddetle ayağa kalktı ve dedi ki:<br />"+
        "+ アナンダ、シュート胸クソたるみお尻ファックディック溶岩ファゴットファゴット"
    },
    sixth_story :
    {
        id : 8,
        isShown: false,
        keyName : "sixth_story",
        text : "Bu diyalog hakkında sadece tanrılar arasında bir savaş başlattığını biliyorum. Bana da hak ver sadece bir terminalim " +
        "tanrıların dilinde konuşamıyorum malesef."
    },
    seventh_story :
    {
        id : 9,
        isShown: false,
        keyName : "seventh_story",
        text : "Su Tanrısı'nın sözleri üzerine Ateş Tanrısı dünyaya indi ve insanların şehirlerine saldırmaya başladı. "+
        "Su Tanrısı Ateş Tanrısı'nın saldırısını püskürttü. Ateş Tanrısı tüm gücünü kaybetmişti. "+
        "Bunun üzerine Ateş Tanrısı halkı olan " + ek(s_race2, "ler,i") + " da alarak ateşin kaynağı olan yer altına güç toplamak için indi.",
    },
    eighth_story :
    {
        id : 10,
        isShown: false,
        keyName : "eighth_story",
        text : ek(s_race2, "ler").charAt(0).toUpperCase() + ek(s_race2, "ler").slice(1) + " artık yer altında yaşamaya başlamıştı. Hikaye yüzyıllarca anlatılarak " + ek(s_race2, "ler") + " efsaneye dönüştü. " +
        "Artık kimse " + ek(s_race2, "ler,in") + " varlığına bile inanmıyordu..."
    },
    nineth_story :
    {
        id : 11,
        isShown: false,
        keyName : "nineth_story",
        text : "Gelelim senin hikayene. Sen " + ek(s_city, "e") + " yakın " + ek(s_town, "in,de") + " dedesi ile yaşayan henüz 13 yaşında bir çocuksun. " +
        "Sönmüş " + ek(s_your_village, "ın") + " yamacında nehir kenarına kurulu köy, size yer altına kaçan " + ek(s_race2, "ler,den") + " kaldı. " +
        "Geçiminizi " + ek(s_your_village, "ın") + " zirvesindeki tütün tarlalarınızdan sağlıyorsunuz."
    },
    tenth_story :
    {
        id : 12,
        isShown: false,
        keyName : "tenth_story",
        text : "Özet olarak sen "+ ek(s_race2, "ler,in") +", ejderhaların, tanrıların olduğu bu evrende basit sıradan bir köylüsün."
    },
    eleventh_story :
    {
        id : 12,
        isShown: false,
        keyName : "tenth_story",
        text : "<del>Baban ... Pardon . . . </del>Annen seni doğurduktan sonra intihar etti. " +
        "Onu hiçbir zaman görmedin. Deden seni zamanı geldiğinde ailen hakkındaki herşeyi anlatacağını söyleyerek büyüttü. Buradan sonrası artık zaten senin hayatın."
    },
    four_years_later :
    {
        id : 12,
        isShown: false,
        keyName : "four_years_later",
        text : "<div style='text-align:center;width:850px'>" +
        ". . . . . . . . . . . . . . . . . . . . . . . . . . <br />"+
        ". . . . . . . . . 4 sene sonra . . . . . . . . . . . <br />"+
        " . . . . . . . . . . . . . . . . . . . . . . . . . . </div>"
    },

    accept_fight :
    {
        id : 101,
        isShown: false,
        keyName : "accept_fight",
        text : "STORY dovusu kabul ettin",
        doAction : function(){

        }
    },
    decline_fight :
    {
        id : 102,
        isShown: false,
        keyName : "decline_fight",
        text : "STORY dovusu kabul reddettin",
        doAction : function(){
            action_type = 0;
        }
    },
    force_fight :
    {
        id : 103,
        isShown: false,
        keyName : "force_fight",
        text : "Suspendisse porta, urna eu molestie condimentum, urna felis tincidunt lectus.",
        doAction : function(){

        }
    }
}

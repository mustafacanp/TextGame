
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
        s_human_king + ", " + s_race2 + "'ları da yanına alarak " + s_race3 + "'lere savaş açtı.",
    },
    first_story_2 :
    {
        id : 2,
        isShown: false,
        keyName : "first_story_2",
        text : "Kendini sadece teknoloji ve gelişmeye adayan elfler çok dayanamadı. " +
        "Şehirlerini terk ederek bir daha görünmemek üzere dağlara kaçtılar. Nereye gittikleri hiç bilinmedi. Kimilerine göre Toprak Tanrısı halkını göğe yükseltti, " +
        "kimilerine göre hiç kimsenin görmediği " + s_race3_mountain + " Dağı'nda Tanrıları tarafından korunuyorlar, kimilerine göre de haydut oldular.",
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
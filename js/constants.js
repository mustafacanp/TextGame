
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

s_city = "Mordor";

s_town = "Edincik Köyü";

s_race2 = "orc";
s_race3 = "elf";

s_human_king = "Gaylord";

s_race3_mountain = "Ağrı Dağı";






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
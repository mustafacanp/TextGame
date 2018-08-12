
var mainCharacter, enemy;
var path = ""; // Satır başı yazısı
var blinkCursor; // İmleç
var is_menu_active = false; // Main menu açık mı? Açık iken input'a yazdırmama kontrolü.
var menu_keys = false; // Main menu'den birşey seçip menüyü kapatınca input'a seçtiğin değeri yazdırmaması kontrolü.
var is_menu_available = 1; // Main Menu'ye erişim kontrolü.
var action_type = 0;
var finished_action = 0;
var dialogueCount = 0;
var storyCount = 0;
var t_speed = 25; // t plugin text writing speed. (ms per letter)
var current_dialogue_name = ""; // action() içinde, action_type = "dialogue_answer" devam ediyor ise hangi diyaloğa cevap vereceğini tutuyor.
var is_writing = false;
var is_animating = false;
var is_fighting = false;

//init object
var options = new Options();



s_fake_nick = "kanka";
s_city = "Pangro";
s_town = "Praven Köyü";
s_race2 = "Duras";
s_race3 = "Hels";
s_human_king = "Gaylord";
s_race3_mountain = "Nuga Dağı";
s_your_village = "Cigardağ";



/*

Story
Ateş Tanrısı dünyaya iner ve insanları yakmaya başlar. Su Tanrısı Ateş Tanrısının verdiği hasarı engeller ve tüm gücünü emer. Bunun üzerine Ateş Tanrısı {2}leri de alarak ateşin kaynağı olan yer altına güç toplamak için iner.


Cadılar artık yer alında yaşamaya başlamıştır. Hikaye yüzyıllarca anlatılarak {2 }efnaseye dönüşür. Artık kimse {2}lerin varlığına bile inanmamaktadır.


Ama bir gün gücünü toplayan Ateş Tanrısı halkı ile X'in hakimi olmak için yer yüzüne çıkar...

*/

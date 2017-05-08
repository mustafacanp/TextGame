function scrollBottom(){
    $('#container').animate({scrollTop: $('#container')[0].scrollHeight}, 300);
}
var focusInput = function(){ // Sayfada herhangi bir yere tıklansa da inputa focuslanması
    $("#input").focus();
    $(document).click(function(e) {
        $("#input").focus();
    });
}
var hideInputCursor = function(){ // İmleç
    clearInterval(blinkCursor);
    $('#input').focus();
    blinkCursor = window.setInterval(function() {
        if ($('#cursor').css('visibility') === 'visible') {
            $('#cursor').css({ visibility: 'hidden' });
        } else {
            $('#cursor').css({ visibility: 'visible' });  
        }
    }, 500);
    $('input').keyup(function() {
        $('#cmd span').text($(this).val());
    });
}
function cin(){
    $("#container").append('<div class="line input-line"><div class="text">></div><div id="cmd"><span></span><div id="cursor"></div></div><input type="text" id="input" maxlength="50" /></div>');
}
function cout(path, _output, _class, isPath){
    if(isPath){ // '>' yazdırılmayan çıktılar.
        $("#container").append('<div class="line"><div class="text '+_class+'">'+path+'>'+_output+'</div></div>');
    } else { // 'path>' yazdırılan sonuçlar.
        $("#container").append('<div class="line"><div class="text '+_class+'">'+_output+'</div></div>');
    }
}
function removeInputLine(){ // Tüm girdi satırlarını siler.
    $(".line").each(function(){
        var isInputLine = $(this).hasClass("input-line");
        if(isInputLine){$(this).remove();}
    });
}


var isMenuActive = false;

function refreshInputLine(){ // Yeni girdi satırı oluşturur.
    removeInputLine();
    cin();
    hideInputCursor();
}

function loadMenu(menu){
    if(menu == "character"){
        $("#container2").html("character");
    } else if(menu == "skill"){
        $("#container2").html("skill");
    } else if(menu == "inventory"){
        $("#container2").html("inventory");
    } else if(menu == "map"){
        $("#container2").html("map");
    }
}

function saveGame(){
    console.log("Saving...");
    // pc'ye cookie bırakıp ajax ile verileri gönderecek
}
function loadGame(){
    console.log("Loading...");
    // pc'den cookie alıp ajax ile verileri getirecek
}
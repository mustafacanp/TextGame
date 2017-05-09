
function disableRightClick(){ //Disable Right Click
    //Disable full page
    $("body").on("contextmenu",function(e){
        return false;
    });
}
function scrollBottom(){
    $('#container').animate({scrollTop: $('#container')[0].scrollHeight}, 300);
}
function focusInput(){ // Sayfada herhangi bir yere tıklansa da inputa focuslanması
    $("#input").focus();
    $(document).click(function(e) {
        $("#input").focus();
    });
}
function hideInputCursor(){ // İmleç
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
        if(!menu_keys && !is_menu_active){
            $('#cmd span').text($(this).val());
        } else {
            $('#input').val("");
            menu_keys = false;
        }
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
function refreshInputLine(){ // Girdi satırını temizle.
    //removeInputLine();
    //cin();
    $("#input").val("");
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

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max)+1;
  return Math.floor(Math.random() * (max - min)) + min;
}

// TODO: KALDIR
$("#statistics-button").click(function(){
    $("#statistics").toggle();
    if(options){
        var string = "";
        for(var key in options) {
            var value = options[key];
            string += "<div class='left'>"+key+"</div><div class='right'>"+value+"</div>"
        }
        $("#general .content").html(string);
    }
    if(dialogueAnswers){
        var string = "";
        for(var key in dialogueAnswers) {
            var value = dialogueAnswers[key];
            string += "<div class='left'>"+key+"</div><div class='right'>"+value+"</div>"
        }
        $("#your_answers .content").html(string);
    }
});
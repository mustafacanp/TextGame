
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
    $("#container").append('<div class="line input-line"><div class="text">'+path+'></div><div id="cmd"><span></span><div id="cursor"></div></div><input type="text" id="input" /></div>');
}
function cout(path, _output, _class, isPath){
    if(isPath){ // '>' yazdırılmayan çıktılar.
        $("#container").append('<div class="line"><div class="text '+_class+'">'+path+'>'+_output+'</div></div>');
    } else { // 'path>' yazdırılan sonuçlar.
        $("#container").append('<div class="line"><div class="text '+_class+'">'+_output+'</div></div>');
    }
}
function refreshInputLine(){ // Tüm girdi satırlarını siler.
    $(".line").each(function(){
        var isInputLine = $(this).hasClass("input-line");
        if(isInputLine){$(this).remove();}
    });
    cin();
    hideInputCursor();
}
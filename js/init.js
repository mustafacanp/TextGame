'use strict';
var start = function () {
    var keyPress = function(){ // Enter'a basınca newLine() fonksiyonu ile yeni satıra geç.
        $(document).on("keyup",function(e) {
            //console.log(is_menu_available);
            if(!is_writing && !is_animating){
                if(e.keyCode == 27 && is_menu_available){
                    if(is_menu_active){
                        refreshInputLine();
                        $("#main-menu").hide();
                        is_menu_active = false;
                    } else if(!is_menu_active) {
                        refreshInputLine();
                        $("#main-menu").show();
                        is_menu_active = true;
                        hideAllMenus();
                    }
                }
            }
        });
        $(document).on("keypress",function(e) {
            if(!is_writing && !is_animating){
                if(!is_menu_active){
                    if(e.which == 13) { // Enter basıldı ise...
                        action(); // Sonraki aksiyonu yap.
                        refreshInputLine(); // input'u temizle.
                    }
                } if(e.keyCode == 99 && is_menu_active){
                    loadScreen("character")
                    $("#main-menu").hide();
                    is_menu_active = false;
                    menu_keys = true;
                } if(e.keyCode == 107 && is_menu_active){
                    loadScreen("skill")
                    $("#main-menu").hide();
                    is_menu_active = false;
                    menu_keys = true;
                } if(e.keyCode == 105 && is_menu_active){
                    loadScreen("inventory");
                    $("#main-menu").hide();
                    is_menu_active = false;
                    menu_keys = true;
                } if(e.keyCode == 109 && is_menu_active){
                    loadScreen("map");
                    $("#main-menu").hide();
                    is_menu_active = false;
                    menu_keys = true;
                } if(e.keyCode == 115 && is_menu_active){
                    saveGame();
                    $("#main-menu").hide();
                    is_menu_active = false;
                    menu_keys = true;
                } if(e.keyCode == 108 && is_menu_active){
                    loadGame();
                    $("#main-menu").hide();
                    is_menu_active = false;
                    menu_keys = true;
                }
            }
        });
    }

    /* Matrix */
    var canvas = document.getElementById("matrix");
    var ctx = canvas.getContext("2d");
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    var matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%";
    matrix = matrix.split("");
    var font_size = 10;
    var columns = canvas.width/font_size;
    var drops = [];
    for(var x = 0; x < columns; x++){
        drops[x] = 1;
    }
    var drawMatrix = function(){
        ctx.fillStyle = "rgba(0, 0, 0, 0.04)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#0F0";
        ctx.font = font_size + "px arial";
        for(var i = 0; i < drops.length; i++){
            var text = matrix[Math.floor(Math.random()*matrix.length)];
            ctx.fillText(text, i*font_size, drops[i]*font_size);
            if(drops[i]*font_size > canvas.height && Math.random() > 0.975){
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    return {
        init: function () { // Sayfa yüklenince (initialize olunca)
            keyPress(); // Enter kontrolünü ekledi.
            //setInterval(drawMatrix, 35);
        }
    };
}();

jQuery(document).ready(function () {
    //createDialogue("name_dialogue");
    //disableRightClick();
    cin(); // Girdi satırı oluşturdu.
    refreshInputLine(); // #input'un değerini sıfırlar, input'u cursor'a bağlar(input'da değişen değeri cursor'a yazar)
    focusInput(); // Sayfada herhangi bir yere basınca input alanına focus olur.
    start.init(); // keyPress && drawMatrix

    //initDialogue(); // TODO: Bu satrı kaldır, alt satırları çalıştır.

    intro();
    setTimeout(function(){
        $("#container").html(""); // Animasyon temizlendi.
        cin();
        refreshInputLine();
        focusInput();
        is_animating = false;
        initDialogue();
    }, 6300);

    let gandalf = new Gandalf();
    selectCharacter(gandalf);
    mainScreenUI();
});

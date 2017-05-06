
var start = function () {

    var asd = function(){
        newLine();
    }
    var blink = function(){

        var $div2blink = $(".blink"); // Save reference for better performance
        var backgroundInterval = setInterval(function(){
            $div2blink.toggleClass("backgroundWhite");
        },500)

    }

    function newLine(type, value){
        $("#container").html('<div class="line"><div class="text">>SA</div><div class="blink"></div></div>');
    }
    
    return {
        //main function to initiate the module
        init: function () {
			asd();
			blink();
        }
    };
    
}();



jQuery(document).ready(function () {
  start.init();
});

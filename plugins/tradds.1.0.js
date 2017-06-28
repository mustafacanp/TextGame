
function ek(metin, ekler){

    var ekler_array = ekler.split(",");
    var cogul_mu = false;
    var kesme_isareti = false;
    var ozel_isim_mi = false;
    var yabanci_mi = false;
    
    var metin_array = metin.split("|");

    if(!(typeof metin_array[1] === "undefined")) {
        if(metin_array[1] == "y"){
            yabanci_mi = true;
        }
    }

    metin = metin_array[0];
    
    ekler_array = ekleri_sirala(ekler_array);

    if(/^[A-Z]/.test(metin)) {
        metin = metin.replace(/\w\S*/g, function(txt){
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
        ozel_isim_mi = true;
    }

    for(var i = 0; i < ekler_array.length; i++){            
        if(ekler_array[i] == "ler" || ekler_array[i] == "lar"){ metin = _ler(metin, ozel_isim_mi); cogul_mu = true; }
        if(ekler_array[i] == "in" || ekler_array[i] == "ın"){ metin = _in(metin, ozel_isim_mi, yabanci_mi); }
        if(ekler_array[i] == "e" || ekler_array[i] == "a"){ metin = _e(metin, ozel_isim_mi, yabanci_mi); }
        if(ekler_array[i] == "i" || ekler_array[i] == "ı"){ metin = _i( metin, ozel_isim_mi, yabanci_mi); }
        if(ekler_array[i] == "de" || ekler_array[i] == "da" || ekler_array[i] == "den" || ekler_array[i] == "dan"){ metin = _de_den(metin, ekler_array[i], ozel_isim_mi); }
    }

    return metin;


    function _ler(metin){
        
        if(ozel_isim_mi && !kesme_isareti){
            metin = ozelIsim(metin, true);
            kesme_isareti = true;
        }

        if (metin.match(/[aıou]$|[aıou][bcçdfgğhjklmnprsştvwxyz']$|[aıou][bcçdfgğhjklmnprsştvwxyz][bcçdfgğhjklmnprsştvwxyz]$/i)) {
            metin += "lar";
        } if (metin.match(/[eiöü]$|[eiöü][bcçdfgğhjklmnprsştvwxyz']$|[eiöü][bcçdfgğhjklmnprsştvwxyz][bcçdfgğhjklmnprsştvwxyz]$/i)) {
            metin += "ler";
        }
        return metin;
    }


    function _in(metin, ozel_isim_mi, yabanci_mi){

        if(metin.match(/.*[aeoueıiöü]$/i)){
            if(ozel_isim_mi && !cogul_mu && !kesme_isareti){
                metin = ozelIsim(metin);
                kesme_isareti = true;
            }
            metin += "n";
        } else {
            if(ozel_isim_mi && !cogul_mu && !kesme_isareti){
                metin = ozelIsim(metin);
                kesme_isareti = true;
            } else if (!ozel_isim_mi && !yabanci_mi) {
                metin = unsuz_yumusamasi(metin);
            }
            if (metin.match(/[aı].$|[aı][bcçdfgğhjklmnprsştvwxyz'].$|[aı][bcçdfgğhjklmnprsştvwxyz][bcçdfgğhjklmnprsştvwxyz].$/i)) {
                metin += "ın";
            } if (metin.match(/[ei].$|[ei][bcçdfgğhjklmnprsştvwxyz'].$|[ei][bcçdfgğhjklmnprsştvwxyz][bcçdfgğhjklmnprsştvwxyz].$/i)) {
                metin += "in";
            } if (metin.match(/[ou].$|[ou][bcçdfgğhjklmnprsştvwxyz'].$|[ou][bcçdfgğhjklmnprsştvwxyz][bcçdfgğhjklmnprsştvwxyz].$/i)) {
                metin += "un";
            } if (metin.match(/[öü].$|[öü][bcçdfgğhjklmnprsştvwxyz'].$|[öü][bcçdfgğhjklmnprsştvwxyz][bcçdfgğhjklmnprsştvwxyz].$/i)) {
                metin += "ün";
            }
        }

        return metin;
    }


    function _e(metin, ozel_isim_mi, yabanci_mi){
        if(metin.match(/.*[aeoueıiöü]$/i)){
            if(ozel_isim_mi && !cogul_mu && !kesme_isareti){
                metin = ozelIsim(metin);
                kesme_isareti = true;
            }
            metin += "y";
        } else {
            if(ozel_isim_mi && !cogul_mu && !kesme_isareti){
                metin = ozelIsim(metin);
                kesme_isareti = true;
            } else if (!ozel_isim_mi && !yabanci_mi) {
                metin = unsuz_yumusamasi(metin);
            }
        }
        if (metin.match(/(?=.*[aıou].$)|(?=.*[aıou]..$)(?=.*[bcçdfgğhjklmnprsştvwxyz'].$)|(?=.*[aıou]...$)(?=.*[bcçdfgğhjklmnprsştvwxyz]..$)(?=.*[bcçdfgğhjklmnprsştvwxyz].$)/i)) {
            metin += "a";
        } if (metin.match(/(?=.*[eiöü].$)|(?=.*[eiöü]..$)(?=.*[bcçdfgğhjklmnprsştvwxyz'].$)|(?=.*[eiöü]...$)(?=.*[bcçdfgğhjklmnprsştvwxyz]..$)(?=.*[bcçdfgğhjklmnprsştvwxyz].$)/i)) {
            metin += "e";
        }

        return metin;
    }


    function _i(metin, ozel_isim_mi, yabanci_mi){
        if(metin.match(/.*[aeoueıiöü]$/i)){
            if(ozel_isim_mi && !cogul_mu && !kesme_isareti){
                metin = ozelIsim(metin);
                kesme_isareti = true;
            }
            metin += "y";
        } else {
            if(ozel_isim_mi && !cogul_mu && !kesme_isareti){
                metin = ozelIsim(metin);
                kesme_isareti = true;
            } else if (!ozel_isim_mi && !yabanci_mi) {
                metin = unsuz_yumusamasi(metin);
            }
        }
        if (metin.match(/[aı].$|[aı][bcçdfgğhjklmnprsştvwxyz'].$|[aı][bcçdfgğhjklmnprsştvwxyz][bcçdfgğhjklmnprsştvwxyz].$/i)) {
            metin += "ı";
        } if (metin.match(/[ei].$|[ei][bcçdfgğhjklmnprsştvwxyz'].$|[ei][bcçdfgğhjklmnprsştvwxyz][bcçdfgğhjklmnprsştvwxyz].$/i)) {
            metin += "i";
        } if (metin.match(/[ou].$|[ou][bcçdfgğhjklmnprsştvwxyz'].$|[ou][bcçdfgğhjklmnprsştvwxyz][bcçdfgğhjklmnprsştvwxyz].$/i)) {
            metin += "u";
        } if (metin.match(/[öü].$|[öü][bcçdfgğhjklmnprsştvwxyz'].$|[öü][bcçdfgğhjklmnprsştvwxyz][bcçdfgğhjklmnprsştvwxyz].$/i)) {
            metin += "ü";
        }

        return metin;
    }


    function _de_den(metin, ek, ozel_isim_mi, yabanci_mi){
        
        metin = metin;
        if(metin.match(/.*[çfhksştp]$/i)){
            if(ozel_isim_mi && !cogul_mu && !kesme_isareti){
                metin = ozelIsim(metin);
                kesme_isareti = true;
            }
            metin += "t";
        } else {
            if(ozel_isim_mi && !cogul_mu && !kesme_isareti){
                metin = ozelIsim(metin);
                kesme_isareti = true;
            }
            metin += "d";
        }
        if (metin.match(/[aıou].$|[aıou][bcçdfgğhjklmnprsştvwxyz']|[aıou][bcçdfgğhjklmnprsştvwxyz][bcçdfgğhjklmnprsştvwxyz']|[aıou][bcçdfgğhjklmnprsştvwxyz][bcçdfgğhjklmnprsştvwxyz][bcçdfgğhjklmnprsştvwxyz'].$/i)) {
            metin += "a";
        } else if (metin.match(/[eiöü].$|[eiöü][bcçdfgğhjklmnprsştvwxyz']|[eiöü][bcçdfgğhjklmnprsştvwxyz][bcçdfgğhjklmnprsştvwxyz']|[eiöü][bcçdfgğhjklmnprsştvwxyz][bcçdfgğhjklmnprsştvwxyz][bcçdfgğhjklmnprsştvwxyz'].$/i)) {
            metin += "e";
        }

        if(ek == "den" || ek == "dan"){
            return metin + "n";
        } else {
            return metin;
        }

    }

    function ozelIsim(ozel_isim, cogul_mu){
        if(!cogul_mu){
            ozel_isim += "'";
        }
        return ozel_isim;
    }

    function ekleri_sirala (ekler_array) {
        var temp_array = [], concat_array = [];

        for(var i = 0; i < ekler_array.length; i++){
            if(ekler_array[i] == "ler" || ekler_array[i] == "lar"){
                temp_array.push(ekler_array[i]);
                ekler_array.splice(i,1);
            }
        }
        for(var i = 0; i < ekler_array.length; i++){
            if(ekler_array[i] == "in" || ekler_array[i] == "ın"){
                temp_array.push(ekler_array[i]);
                ekler_array.splice(i,1);
            }
        }

        concat_array = temp_array.concat(ekler_array);
        return concat_array;
    }

    function unsuz_yumusamasi (metin) {
        metin = metin.replace(/[ç]$/i, "c");
        metin = metin.replace(/[p]$/i, "b");
        metin = metin.replace(/[t]$/i, "d");
        if(metin.match(/[aeıioöuü][k]$/i)){
            metin = metin.replace(/k$/, "ğ");
        }
        else if(metin.match(/[bcçdfgğhjklmnprsştvwxyz][k]$/i)){
            metin = metin.replace(/k$/, "g");
        }
        return metin;
    }
}
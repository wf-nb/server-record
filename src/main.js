// 顯示動畫
function lup(dx){
    dx.css("display","")
    dx.animate({"opacity":"1"})
}
// 消失動畫
function ldown(dx){
    dx.animate({"opacity":"0"}, 250)
    setTimeout(function(){
        dx.css("display","none")
    }, 251)
}
// 訊息彈窗
function info(title, text, type, s){
    if (s == null){s = 4;}

    document.getElementById('info').classList.add(type);
    function tran(id, bool){
        if ($(id).transition("is visible") != bool){
            $(id).transition('fade right')
        }
    }
    document.getElementById("info_title").innerText = title;
    document.getElementById("info_text").innerText = text;
    tran("#info", true);
    setTimeout(function(){
        tran("#info", false);
        document.getElementById('info').classList.remove(type);
    }, Number(s)*1000)
}
// 跳轉頁面
function jump(url){
    if ($("body").transition("is visible") == true){
        $("body").transition('scale');
    }
    setTimeout(function(){
        window.location = url
    }, 100)
}
// other page on load
function oponload(){
    if ($("body").transition("is visible") == false){
        $("body").transition('scale');
    }
}
// 得到get參數
function getQueryVariable(variable){
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return(false);
}
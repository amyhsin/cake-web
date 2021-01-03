/*  photo playing  */
var jsImg = new Array("image/matchacookies.jpg","image/lemoncheesetarte.jpg","image/4.jpg","image/applepie.jpg");
var jsImg_len = jsImg.length;
 
var i = 0;
setInterval("seqImg()",3000);
function seqImg(){
    document.getElementById("myImg").innerHTML = "<img src=" + jsImg[i] + 
    " width = '650' height = '400' style= 'display: block; margin: auto; border:2px white solid; border-radius:20px; box-shadow:5px 5px 5px #aaaaaa;'>";
         i++;
         if (i>jsImg_len-1) i=0;
}
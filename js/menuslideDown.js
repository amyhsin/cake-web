/*  menu slideDown  */
$(document).ready(function() {
    $('.submenu').hide();
    $('.menu').hover(
       function() { 
         $(this).find('.submenu').slideDown(200);
       },
       function() {
         $(this).children('.submenu').slideUp(500); 
       });
 });
 
 function over(element){
     element.style.color="#ffc800";
 }
 function out(element){
     element.style.color="#555555"
 }
//Preload images first
$.fn.preload = function() {
    this.each(function(){
        $('<img/>')[0].src = this;
    });
}
var images = Array("images/fog.jpg",
                   "images/bcg6.jpg",
                   "images/bcg7.jpg",
                   "images/bcg5.jpg");
$([images[0],images[1],images[2],images[3]]).preload();
// Usage:
var currimg = 0;
$(document).ready(function(){
    function loadimg(){
       $('#top').animate({ opacity: 1 }, 500,function(){
            //finished animating, minifade out and fade new back in
            $('#top').animate({ opacity: 0.7 }, 100,function(){
                currimg++;
                if(currimg > images.length-1){
                    currimg=0;
                }
                var newimage = images[currimg];
                //swap out bg src
                $('#top').css("background-image", "url("+newimage+")");
                //animate fully back in
                $('#top').animate({ opacity: 1 }, 400,function(){
                    //set timer for next
                    setTimeout(loadimg,5000);
                });
            });
        });
     }
     setTimeout(loadimg,5000);
});

//counter
var countDownDate = new Date("Mar 15, 2018 10:00:00").getTime();
var x = setInterval(function() {

    var now = new Date().getTime();
    var distance = countDownDate - now;

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    $("#countdown").html("<span>" + days + "d </span><span>" + hours + "h </span><span>" + minutes + "m </span><span>" + seconds + "s </span>");

    if (distance < 0) {
      clearInterval(x);
      $("#countdown").hide();
    }
  }, 1000);

//mobile menu
if ($(window).width() < 868) {
   $("#nav_wrap").hide();
}
$(".menu-trigger").click(() => {
  $("#nav_wrap").slideToggle("slow");
});

//literature
$("#literature_list").hide();
$("#literature").click(() => {
  $("#literature_list").slideToggle("slow");
  return false;
});

//place imgs
var wysokosc_lewa = $(".double").first().height();
$(".breakout").height(wysokosc_lewa);

//button download
$(".button").hover(
  ( event ) => {
    $(event.target).closest('.button').children().toggleClass('hidden');
  }
);

// nav background changes
var target = 200,
    timeout = null;

$(window).scroll(function () {
    if (!timeout) {
        timeout = setTimeout(function () {
            clearTimeout(timeout);
            timeout = null;
            if ($(window).scrollTop() >= target) {
                $("#nav_wrap").css('background-color','rgba(255,255,255,1)');
            }else{
                $("#nav_wrap").css('background-color','rgba(255,255,255,0.4)');
            }
        }, 500);
    }
});

//history map
var map;
var mkrakow, mwarszawa, mpoznan, mgdansk, mtorun, mlublin, mlodz, mszczecin;
function initialize() {
	var mapOptions = {
		center: new google.maps.LatLng(52.219438, 19.145136),
		zoom: 5.7,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}
    // Coordinates
	var krakow = new google.maps.LatLng(50.064650, 19.94498);
	var warszawa = new google.maps.LatLng(52.229676, 21.012229);
  var poznan = new google.maps.LatLng(52.406374, 16.925168);
  var gdansk = new google.maps.LatLng(54.352025, 18.646638);
  var torun = new google.maps.LatLng(53.013790, 18.598444);
  var lublin = new google.maps.LatLng(51.246454, 22.568446);
  var lodz = new google.maps.LatLng(51.759248, 19.455983);
  var szczecin = new google.maps.LatLng(53.428544, 14.552812);

	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    //Markers
   mkrakow = new google.maps.Marker( {position: krakow, map: map} );
   mwarszawa = new google.maps.Marker( {position: warszawa, map: map} );
   mpoznan = new google.maps.Marker( {position: poznan, map: map} );
   mgdansk = new google.maps.Marker( {position: gdansk, map: map} );
   mtorun = new google.maps.Marker( {position: torun, map: map} );
   mlublin = new google.maps.Marker( {position: lublin, map: map} );
   mlodz = new google.maps.Marker( {position: lodz, map: map} );
   mszczecin = new google.maps.Marker( {position: szczecin, map: map} );
}

google.maps.event.addDomListener(window,'load',initialize);

//history
$(".history_container").hide();
$(".history_item").click(( event ) => {
  var desc = $(event.target).closest(".history_item").attr('data-name');
  $(".history_container").hide().html(desc).fadeIn();

  $(".active_history_item").removeClass("active_history_item");
  $(event.target).closest(".history_item").addClass("active_history_item");
});
$('.history_container').on('click', '.close', function(){
  $(".history_container").hide();
});

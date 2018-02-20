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
      $("#countdown").html("KONFERENCJA TRWA");
    }
  }, 1000);

//mobile menu
$(".menu-trigger").click(() => {
  $("#nav_wrap").slideToggle("slow");
});

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
function initialize() {
	var mapOptions = {
		center: new google.maps.LatLng(52.219438, 19.145136),
		zoom: 5.7,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}
    // Coordinates
	var krakow = new google.maps.LatLng(50.064650, 19.94498);
	var balticSea = new google.maps.LatLng(57.415672, 19.927596);
	var northSea = new google.maps.LatLng(56.029392, 3.514022);
	var atlanticOcean = new google.maps.LatLng(35.391504, -10.178066);

	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    //Markers
    marker = new google.maps.Marker( {position: krakow, map: map, title: 'IX Sesja'} );
    marker2 = new google.maps.Marker( {position: balticSea, map: map} );
    marker3 = new google.maps.Marker( {position: northSea, map: map} );
    marker4 = new google.maps.Marker( {position: atlanticOcean, map: map} );
}

google.maps.event.addDomListener(window,'load',initialize);

//history
$(".history_item").click(( event ) => {
  var desc = $(event.target).closest(".history_item").attr('data-name');
  $(".history_container").hide().html(desc).fadeIn();
  
  $(".active_history_item").removeClass("active_history_item");
  $(event.target).closest(".history_item").addClass("active_history_item");
});

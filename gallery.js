var dir = "images/ix_sesja/",
  dirSmall = "images/ix_sesja_small/";
var filename = "sesjaix%20%28";
var currentSlide = 1;

for(var i = 1; i <= 88; i++){
  $("#gallery").append("<a class='gallery-image' href='" +
   dir + filename + i + ").jpg'>" +
   "<div style=\"background: url(" + dirSmall + filename + i +
   "%29.jpg) !important;\" number=" + i + "></div></a>");
}

$('.gallery-image').click(function(e) {
  e.stopPropagation();
  e.preventDefault();
});

function refreshSlide(n){
  $("#showImage").attr("src", ""+ dir + filename + n + ").jpg");
}

$(".gallery-image").children("div").click(function(e) {
  $("#show").fadeIn();
  currentSlide = parseInt($(e.target).attr("number"));

  refreshSlide(currentSlide);
});

$("#showToRight").click(()=>{
  if(currentSlide == 88){

  }else{
    currentSlide += 1;
    refreshSlide(currentSlide);
  }
});

$("#showToLeft").click(()=>{
  if(currentSlide == 1){

  }else{
    currentSlide -= 1;
    refreshSlide(currentSlide);
  }
});

$("#closeShow").click(()=>{
  $("#show").fadeOut();
})

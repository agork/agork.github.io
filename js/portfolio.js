//PARTICLE SYSTEM
var canvasContainer = document.getElementById('top');
var WIDTH = canvasContainer.offsetWidth,
HEIGHT = canvasContainer.offsetHeight,
numberOfP = 40,
rangeOfP = 300,
pSpeed = 0.5,
mouseOn = false,
wentOff = false;

//should be called on resize event
function checkView(){
  if(WIDTH>500){
    document.getElementById('particle-container').style.display = 'block';
    //document.getElementById('alternateTop').style.display = 'none';
  }else{
    document.getElementById('particle-container').style.display = 'none';
    document.getElementById('alternate-top').style.display = 'block';
  }
  numberOfP = Math.round(WIDTH / 40);
  rangeOfP = numberOfP*10;
}
checkView();

var stage = new Konva.Stage({
  container: 'particle-container',
  width: WIDTH,
  height: HEIGHT
});
var layer = new Konva.Layer();
var background = new Konva.Rect({
  x: 0,
  y: 0,
  width: WIDTH,
  height: HEIGHT,
  fill: 'white',
  strokeEnabled: false,
  //globalCompositeOperation: "darker"
});
layer.add(background);
stage.add(layer);

var canvas = document.createElement('canvas');
canvas.width = stage.width();
canvas.height = stage.height();
var image = new Konva.Image({
  image: canvas,
  x: 0,
  y: 0,
  strokeEnabled: false
});
layer.add(image);
var context = canvas.getContext('2d');

var PARTICLES = [];
function initialize(size){
  for(var i = 0; i < size; i++){
    let scale = Math.random();
    let p = new Konva.Circle({
      x: Math.random() * WIDTH,
      y: Math.random() * HEIGHT,
      radius: 8,
      fill: 'rgb(254, 254, 254)',
      opacity:0.5,
      strokeEnabled: false,
      scale: {
        x: scale+0.5,
        y: scale+0.5
      },
      globalCompositeOperation: "destination-out"
    });

    var va = Math.random()*Math.PI*2;
    vx = Math.cos(va)*pSpeed;
    vy = Math.sin(va)*pSpeed;
    p.setAttr('movementV',[vx, vy]);

    layer.add(p);
    PARTICLES.push(p);
  }
}
initialize(numberOfP);

function draw(){
  //LINES
  context.clearRect(0,0,WIDTH,HEIGHT);
  for(var i = 0; i < numberOfP; i++){
    var p1 = PARTICLES[i];
    for(var j = i+1; j < numberOfP; j++){
      var p2 = PARTICLES[j];
      let d = dist(p1, p2);
      let c = eval(d, 0, rangeOfP, 0, 255);
      context.beginPath();
      context.strokeStyle = 'rgba('+c+','+c+','+c+', 0.1)';
      context.moveTo(p1.x(), p1.y());
      context.lineTo(p2.x(), p2.y());
      context.closePath();
      context.stroke();
    }
  }
  //MOVEMENT
  var m = stage.getPointerPosition();//{x: ... , y: ...}
  if(m)
    mouseOn = true;
  else if(m == undefined && mouseOn == true){
    mouseOn = false;
    wentOff = true;
  }

  for(var i = 0; i < numberOfP; i++){
    let p = PARTICLES[i];
    //bounds
    if(p.x() < 0-10)
      p.x(WIDTH+10);
    else if(p.x() > WIDTH+10)
      p.x(0-10);
    else if(p.y() < 0-10)
      p.y(HEIGHT+10);
    else if(p.y() > HEIGHT+10)
      p.y(0-10);

    //actual movement
    let movementV = p.getAttr('movementV');
    p.x(p.x()+movementV[0]);
    p.y(p.y()+movementV[1]);

    //magic :)
    if(mouseOn){
      var d = distMandP(m, p);
      let s = eval(d, 0, rangeOfP, 160, 8);
      p.setAttr('radius', s);
      let o = eval(d, 0, 200, 1, 0.5);
      p.setAttr('opacity', o);
    }else if(wentOff){
      p.setAttr('radius', 8);
      p.setAttr('opacity', 0.5);
    }
  }
  if(wentOff){
    wentOff = false;
  }

  layer.draw();
  window.requestAnimationFrame(draw);
}

window.requestAnimationFrame(draw);

function dist(A, B){
  let dX = A.x() - B.x();
  let dY = A.y() - B.y();
  return d = Math.sqrt(dX*dX + dY*dY);
}

function distMandP(A, B){
  let dX = A.x - B.x();
  let dY = A.y - B.y();
  return d = Math.sqrt(dX*dX + dY*dY);
}

function eval(x, sta1, sto1, sta2, sto2){
  var newval = (x - sta1) / (sto1 - sta1) * (sto2 - sta2) + sta2;
  if (sta2 < sto2)
    return Math.max(Math.min(newval, sto2), sta2);
  else
    return Math.max(Math.min(newval, sta2), sto2);
}

//NAVIGATION
var menuIcon = document.getElementById("menu-icon"),
isMenuOn = false;
menuIcon.addEventListener("click", triggerMenu);

function triggerMenu(){
  if(isMenuOn){
    document.getElementById("side-menu").style.width = '0px';
    isMenuOn = false;
  }else{
    if(WIDTH>500)
      document.getElementById("side-menu").style.width = '400px';
    else
      document.getElementById("side-menu").style.width = '100%';
    isMenuOn = true;
  }
}

var menuButtons = document.querySelectorAll(".menu-button");
for(var i = 0 ; i < menuButtons.length; i++){
  menuButtons[i].addEventListener("click", triggerMenu);
}

// MAP
google.maps.event.addDomListener(window, 'load', init);
function init() {
  var mapOptions = {
    zoom: 11,
    center: new google.maps.LatLng(50.061672, 19.938199), // Kraków
    // How you would like to style the map.
    styles: [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#a48b10"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"on"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#f5cf12"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#f5cf12"},{"lightness":17},{"weight":1.2}]},{"featureType":"administrative.province","elementType":"labels","stylers":[{"visibility":"simplified"},{"color":"#ffffff"}]},{"featureType":"administrative.locality","elementType":"labels","stylers":[{"visibility":"on"},{"color":"#333333"},{"weight":"0.63"}]},{"featureType":"administrative.neighborhood","elementType":"labels.text","stylers":[{"color":"#606060"},{"visibility":"on"},{"weight":"0.67"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5cf12"},{"gamma":"1"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5cf12"},{"visibility":"on"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#a48b10"},{"gamma":"0.00"},{"weight":"0.93"},{"lightness":"-100"},{"saturation":"100"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#a48b10"},{"saturation":"0"},{"visibility":"on"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"color":"#89740a"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels.text","stylers":[{"visibility":"on"},{"weight":"1.12"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"weight":"0.94"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"color":"#a48b10"},{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#a48b10"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#a48b10"},{"lightness":29},{"weight":0.2},{"visibility":"off"}]},{"featureType":"road.highway.controlled_access","elementType":"geometry","stylers":[{"color":"#f5cf12"}]},{"featureType":"road.highway.controlled_access","elementType":"labels","stylers":[{"visibility":"off"},{"color":"#ffffff"}]},{"featureType":"road.highway.controlled_access","elementType":"labels.text.fill","stylers":[{"visibility":"on"},{"color":"#f5cf12"}]},{"featureType":"road.highway.controlled_access","elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#333333"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#f5cf12"},{"lightness":16}]},{"featureType":"road.local","elementType":"geometry.stroke","stylers":[{"color":"#a48b10"},{"visibility":"on"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#a48b10"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#333333"},{"lightness":17}]}]
  };

  var mapElement = document.getElementById('map');

  var map = new google.maps.Map(mapElement, mapOptions);
}

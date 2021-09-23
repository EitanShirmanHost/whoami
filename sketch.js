

let x = [];
let y = [];

let fourierX;
let fourierY;



let time = 0;
let path = [];

var canvas;

function setup() {
  
  let social_height = windowWidth/8+"px";
  let social_text = windowHeight/20+"px";
  document.getElementById("github").style.height = social_height;
  document.getElementById("facebook").style.height = social_height;
  document.getElementById("twitter").style.height = social_height;
  document.getElementById("linkedin").style.height = social_height;
  document.getElementById("instagram").style.height = social_height;

  document.getElementById("ContactMeAt").style.fontSize = social_text;
 

  console.log(social_height);
  if(windowWidth>windowHeight){
    canvas = createCanvas(windowWidth, windowHeight/2);
    var text = height/2 + "px";
    document.getElementById("me").style.marginTop = text;
    
    function windowResized(){
    resizeCanvas(windowWidth,windowHeight);
} 

  }
  else{
    canvas = createCanvas(windowWidth, windowHeight/3);
    
  }
  
  canvas.position(0,0);
  canvas.style('z-index','-1');
  
  for(let i = 0; i<drawing.length;i+=5){
    x.push(drawing[i].x);
    y.push(drawing[i].y);
  }
  
  fourierX = dft(x);
  fourierY = dft(y);
  
  fourierX.sort((a,b)=>b.amp - a.amp);
  fourierY.sort((a,b)=>b.amp - a.amp);

  
}



function epiCycle(x,y,rotation,fourierY){
  for(let i = 0; i<fourierY.length; i++){
    
    prevX = x;
    prevY = y;
    
    let freq = fourierY[i].freq;
    
    let radius = fourierY[i].amp;
    let phase = fourierY[i].phase;
    x += radius * cos(freq*time+phase+rotation);
    y += radius * sin(freq*time+phase+rotation);
    
  
  noFill();
  stroke(255,75);
  ellipse(prevX,prevY,radius*2);
  
  fill(255);
  stroke(255);
  line(prevX,prevY,x,y);
    
  }
  return createVector(x,y);
}


function draw() {
  
  
  background(0);

  let vx = epiCycle(avgX + windowWidth/10, height*0.2, 0, fourierX);
  let vy = epiCycle( windowWidth/10, height*0.45, HALF_PI, fourierY);
  
  let v = createVector(vx.x, vy.y);
  path.unshift(v);
  line(vx.x, vx.y, v.x, v.y);
  line(vy.x, vy.y, v.x, v.y);

  beginShape();
  for(let i = 0; i<path.length; i++){
    noFill();
    vertex(path[i].x,path[i].y);
    
  }
  endShape();
  
  const dt = TWO_PI / fourierY.length;
  time +=dt;
  
  if(path.length>500){
    path.pop();
  }
}
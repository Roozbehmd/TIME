const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [ 1080  , 1080 ]
};

// const degToRad = (degrees) =>{
//   return degrees/180 * Math.PI;
// }

// const randomRange = (min, max) =>{
//   return Math.random() * (max - min) + min;
// }
function drawTriangle(context, x, y, triangleWidth, triangleHeight){
  context.beginPath();
  context.moveTo(x, y);
  context.lineTo(x + triangleWidth / 2, y - triangleHeight);
  context.lineTo(x - triangleWidth / 2, y - triangleHeight);
  context.closePath();
  context.fill();
}

// window.onload = function(){
// var canvas = document.getElementById("myCanvas");
// var context = canvas.getContext("2d");

// var grd;
// var triangleWidth = 150;
// var triangleHeight = 150;
// var triangleY = canvas.height / 2 - triangleWidth / 2;

// // linear gradient fill (second from left)
// grd = context.createLinearGradient(canvas.width  / 5, triangleY, canvas.width / 5, triangleY + triangleHeight);
// grd.addColorStop(0, "#8ED6FF"); // light blue
// grd.addColorStop(1, "#004CB3"); // dark blue
// drawTriangle(context, canvas.width / 2, triangleY, triangleWidth, triangleHeight, grd);

// };
const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);
      let seconds = 0;
      let minutes = 0;
      let hours = 0;


    //TIME
    function drawClock(liveSeconds,liveMinutes,liveHours){
      //reset canvas
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
      context.fillStyle = 'black';
      context.fillRect(0, 0, width, height);

       seconds = liveSeconds;
       minutes = liveMinutes;
        hours = liveHours;
      const cx = width/2;
      const cy = height/2;

      let x,y;
      const w = width*0.03;
      const h = height*0.1;
      const hourNum = 12;
      const hourMarkerRad = width*0.04;

      const radius = width * 0.4;



      //Hour Markers
          context.fillStyle = 'lime';

      for(let i = 0; i< hourNum; i++){
        let slice = math.degToRad(360/hourNum) ;
        let angle = slice *i;

        x = cx + radius * Math.sin(angle);
        y = cy + radius * Math.cos(angle);
        if(i == 3 || i == 0 || i == 9){
          context.save();
          context.translate(x,y);
          context.rotate(-angle);
          // context.scale(random.range(1,4),1);
          context.beginPath();
          context.rect(-w/2,-h/2,w,h);
          context.fill();
          context.restore();
        }

        else if (i == 6){
          drawTriangle(context, width / 2, 240, 100, 200);
        }

        else{
          context.save();
          context.translate(x,y);
          // context.rotate(-angle);
          // context.scale(random.range(1,4),1);
          context.beginPath();
          context.arc(0, 0,hourMarkerRad, 0, math.degToRad(360));
          context.fill();
          context.restore();
        }
        
      }

      
      
      context.fillStyle = 'cyan';

      //Second Hand
      const secondsHandLegth = width/2.10;
      const secondsHandWidth = width * 0.01;
      const secondsHandFlakeWidth = width * 0.04;
        context.save();
        x = cx + radius;
        y = cy + radius;
        context.translate(width/2,height/2);
        context.rotate(math.degToRad(seconds*6 - 90));
        context.beginPath();
        context.rect(0,-secondsHandWidth/2,secondsHandLegth,secondsHandWidth);
        context.fill();
        context.beginPath();
        context.rect(-secondsHandLegth/3.5,-secondsHandWidth/2,secondsHandLegth,secondsHandWidth);
        context.fill();
        context.translate(secondsHandLegth*0.65, 0);
        context.rotate(math.degToRad(45));
        context.rect(0,-secondsHandFlakeWidth,secondsHandFlakeWidth,secondsHandFlakeWidth);
        context.fill();
        context.restore();


      //Minute Hand
        context.fillStyle = 'cyan';
        const minutesHandLegth = width/2.10;
        const minutesHandWidth = width * 0.026;
        const minutesHandFlakeWidth = minutesHandWidth / 1.41421356;
          context.save();
          x = cx + radius;
          y = cy + radius;
          context.translate(width/2,height/2);
          if(seconds<60)
            context.rotate(math.degToRad((minutes + seconds/60)*6 - 90));
          else
            context.rotate(math.degToRad((minutes)*6 - 90));
          context.beginPath();
          context.rect(0,-minutesHandWidth/2,minutesHandLegth,minutesHandWidth);
          context.fill();
          context.translate(minutesHandLegth*0.972, 0);
          context.rotate(math.degToRad(45));
          context.rect(0,-minutesHandFlakeWidth,minutesHandFlakeWidth,minutesHandFlakeWidth);
          context.fill();
          context.restore();

        //Hour Hand
        context.fillStyle = 'cyan';
        const hourHandLegth = minutesHandLegth*0.65;
        const hourHandWidth = minutesHandWidth;
        const hourHandFlakeWidth = width * 0.085;
          context.save();
          x = cx + radius;
          y = cy + radius;
          context.translate(width/2,height/2);
        
          if(seconds<60)  
            context.rotate(math.degToRad((hours+minutes/60+seconds/3600)*30 - 90));
          else
            context.rotate(math.degToRad((hours+minutes/60)*30 - 90));
          context.beginPath();
          context.rect(0,-hourHandWidth/2,hourHandLegth,hourHandWidth);
          context.fill();
          context.translate(hourHandLegth*0.55, 0);
          context.rotate(math.degToRad(45));
          context.rect(0,-hourHandFlakeWidth,hourHandFlakeWidth,hourHandFlakeWidth);
          context.fill();
          context.restore();

      //Centre Cap
      context.fillStyle = 'cyan';

      context.save();
      context.beginPath();
      context.translate(width/2, height/2);
      context.arc(0, 0,hourMarkerRad, 0, math.degToRad(360));
      context.fill();
      context.restore();

    }

    //drawClock();
    let currentSeconds = new Date().getSeconds();
    var intervalId = window.setInterval(function(){
      currentSeconds+=0.125;
      let currentTime =  new Date();
      let liveHours = currentTime.getHours();
      let liveMinutes = currentTime.getMinutes();
      let liveSeconds = currentTime.getSeconds();
      if(liveSeconds>currentSeconds || currentSeconds>60){
              console.log(liveSeconds +" "+ currentSeconds);

        currentSeconds = liveSeconds;
      }
        //context.canvas.width = window.innerWidth - canvasMargin;
        //context.canvas.height = window.innerHeight- canvasMargin;
        drawClock(currentSeconds,liveMinutes,liveHours);
      }, 125);


    // context.translate(100,400);


  };
};

canvasSketch(sketch, settings);

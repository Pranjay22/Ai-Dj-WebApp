song = "";

function preload() {
    song = loadSound("");
}

scoreRightWrist = 0;
scoreLeftWrist = 0;

rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;

function setup () {
    canvas = createCanvas(600,500);
    canvas.center;

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video , modelLoaded);
    poseNet.on('pose' , gotPoses);
}

function modelLoaded () {
    console.log('PoseNet Is Initialized');
}

function gotPoses(results) {
    if(results.length > 0 )
    {
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose,keypoints[9].score;
        console.log("scoreRightWrist = " + scoreRightWrist + " scoreLeftWrist = " + scoreLeftWrist );

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        ("RightWristX = " + rightWrist + " RightWristY = " + rightWristy );

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        ("leftWristX = " + leftWristx + " leftWristY = " + leftWristy );
    }
}

function draw () {
    image(video , 0 , 0 , 600 , 500);

    fill("#ff5050");
    stroke("#ff5050");

    if(scoreRightWrist > 0.2)
    {
        circle(rightWristX,rightWristY,20);

        if(rightWristY >0 && rightWristY <= 100) 
        {
            document.getElementById("Speed").innerHTML = "Speed = 0.5x";
            song.rate(0.5);
        }

       else if(rightWristY >100 && rightWristY <= 200) 
       {
           document.getElementById("Speed").innerHTML = "Speed = 1x";
           song.rate(1);
       }

      else if(rightWristY >200 && rightWristY <= 300)
      {
          document.getElementById("Speed").innerHTML = "Speed = 1.5x";
          song.rate(1.5);
      }
      
      if(rightWristY >300 && rightWristY <= 400)
      {
          document.getElementById("Speed").innerHTML = "Speed = 2x";
          song.rate(2);
      }
      
      if(rightWristY >400)
      {
          document.getElementById("Speed").innerHTML = "Speed = 2.5x";
          song.rate(2.5);
      } 
    }

    if(scoreLeftWrist > 0.2)
    {
        circle(leftWristX , leftWristY,20);
        InNumberleftWristY = Number(leftWristY);
        new_leftWristX = floor(InNumberleftWristY *2);
        leftWristY_divide_1000 = new_leftWristX/1000;
        document.getElementById("volumne").innerHTML = "Volumne = " + leftWristY_divide_1000;
        song.setVolume(leftWristY_divide_1000);	

    }
}

function play() {
    song.play();
    song.setVolumne(1);
    song.rate(1);
}

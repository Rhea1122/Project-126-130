song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
status_1 = "";
status_2 = "";
leftWrist_score = 0;
rightWrist_score = 0;
function preload()
{
   song1 = loadSound("HP(R).mp3");
   song2 = loadSound("TBU.mp3");
}
function setup()
{
   canvas = Canvas(800,600);
   canvas.center();
   video = createCapture(VIDEO);
   video.hide();
   PoseNet = ml5.poseNet(video, modelLoaded);
   PoseNet.on('pose',gotPoses);
}
function modelLoaded()
{
   console.log("PoseNet is initialized");
}
function gotPoses(results)
{
   if(results>0)
   {
      console.log(results);
      leftWristX = results[0].pose.leftWrist.x;
      leftWristY = results[0].pose.leftWrist.y;
      console.log("LeftWristX = " + leftWristX + " ; " + " LeftWristY = " + leftWristY);

      rightWristX = results[0].pose.rightWrist.x;
      rightWristY = results[0].pose.rightWrist.y;
      console.log("RightWristX = " + rightWristX  + " ; " + " RightWristY = " + rightWristY);
   }
}
function draw()
{
    image(video,0,0,800,600);
	status_1 = song1.isPlaying();
	status_2 = song2.isPlaying();

	fill("#FF0000");
	stroke("#000000");

	if(leftWrist_score > 0.2)
{ 
		circle(rightWristX,rightWristY,20);
      song2.stop();

	if(status_1 == false)
   {
		song1.play();
		document.getElementById("song").innerHTML = "Playing - Hedwig's Theme Remix originally by John Williams";
   }
}

	if(rightWrist_score > 0.2)
   {
	   circle(leftWristX,leftWristY,20);
      song1.stop();

	if(song2_status == false)
   {
	   song2.play();
		document.getElementById("song").innerHTML = "Playing - Thinking 'Bout You by Ariana Grande";
   }
}

}
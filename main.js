song_1 = "";
song_2 = "";

leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreRightWrist = 0;
scoreLeftWrist = 0;
score_1 = "";
score_2 = "";

function preload()
{
    song_1 = loadSound("music1.mp3");
    song_2 = loadSound("music2.mp3");
}

function setup()
{
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function modelLoaded()
{
    console.log("Model is loaded");
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Right Wrist X = " + rightWristX + " Right Wrist Y = " + rightWristY);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left Wrist X = " + leftWristX + " Left Wrist Y = " + leftWristY);
    }
}

function draw()
{
    image(video, 0, 0, 600, 500);

    score_1 = song_1.isPlaying();
    score_2 = song_2.isPlaying();

    fill("#FF0000");
    stroke("#FF0000");

    if(scoreRightWrist > 0.2)
    {
        if(scoreLeftWrist > 0.2)
        {
            circle(leftWristX, leftWristY, 20);
            song_2.stop();
            if(score_1 == false)
            {
                song_1.play();
                document.getElementById("song").innerHTML = "Song 1";
            }
        }
    }   
    if(scoreLeftWrist > 0.2)
    {
        if(scoreRightWrist > 0.2)
        {
            circle(rightWristX, rightWristY, 20);
            song_1.stop();
            if(score_2 == false)
            {
                song_2.play();
                document.getElementById("song").innerHTML = "Song 2";
            }
        }
    }   
}

function play()
{
    song_1.play();
}

function stop()
{
    song_1.stop();
    song_2.stop();
}
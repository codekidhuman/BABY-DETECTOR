img = "";
stat = "";
objects = [];
function preload()
{
    img = loadImage("dog_cat.jpg");
    alarm = loadSound("alarm.mp3");
}
function setup()
{
    canvas = createCanvas(380, 380);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    video.size(380,380);

}
function start()
{
objectDetector = ml5.objectDetector('cocossd', modelLoaded);
document.getElementById("status").innerHTML = "Status : Detecting Objects";
}
function modelLoaded()
{
console.log("CocoSSD initialized");
stat = true;

}
function gotResult(error, results)
{
    if(error)
    {
        console.error(error);
    }
    console.log(results);
    objects = results;

}
function draw()
{
    image(video, 0, 0, 640, 420);
    if (stat != "")
    {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);
        for (i=0; i<objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status: OBJECT DETECTED";
            document.getElementById("NOO").innerHTML = "Number of Objects: "+objects.length;
            fill(r,g,b);
            percent = floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%", objects[i].x+15, objects[i].y+15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y,objects[i].width, objects[i].height);
            if (objects[i].label == "person")
            {
                document.getElementById("baby").innerHTML = "Baby Detected";
                alarm.stop();
            }
            else
            {
                document.getElementById("baby").innerHTML = "BABY NOT DETECTED";
                alarm.play();
            }
        }
        if (objects.length == 0)
        {
            document.getElementById("baby").innerHTML = "BABY NOT DETECTED";
            alarm.play();
        }
    }
}
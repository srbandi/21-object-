function setup() {
  canvas = createCanvas(350, 350);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier('MobileNet', modelLoaded);
}

function modelLoaded(){
  console.log('Model Loaded!!')
}

function draw(){
  image(video, 0, 0, 350, 350);
  classifier.classify(video, gotResult);
}
var prev_results = '';

function gotResult(error, results){
  if(error){
    console.error(error);
  }else {
    if((results[0].confindence > 0.5) && (prev_results != results[0].label)){
      console.log(results);
      prev_results = results[0].label;
      var synth = window.speechSynthesis;
      speak_data = 'Object detected id - '+ results[0].label;
      var utterThis = new SpeechSynthesisUtterance(speak_data);
      synth.speak(utterThis);

      document.getElementById("result_object_name").innerHTML = results[0].label;
      document.getElementById("results_object_accuracy").innerHTML = reaults[0].confindence.toFixed(3);
    }
  }
}


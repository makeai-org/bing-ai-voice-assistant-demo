//const talky = document.querySelector(".talky")
let done = true
let lastAud = null
runSpeechRecog = () => {
  if (Number.parseInt(lastAud)){
    xml.open("POST","/delete/",false)
    xml.onload = function() {}
    xml.send(lastAud)
  }
  let transcript;
    var output = document.getElementById('output');
    var action = document.getElementById('action');
    let recognization = new webkitSpeechRecognition();
    recognization.onstart = () => {
      talky.style.boxShadow = `inset 0 0 12px 12px red, inset 0 0 3px 2px red`
       listenStart()

    }
   recognization.onspeechstart = async function(e) {
      talkBox.innerHTML = "Voice Detected"
      talky.style.boxShadow = `inset 0 0 12px 12px green, inset 0 0 3px 2px green`
   }
   recognization.onaudioend = (e) => {
    //talkBox.innerHTML = "Responding..."
    talky.style.boxShadow = `inset 0 0 12px 12px blue, inset 0 0 3px 2px blue`
   }

    recognization.onresult = (e) => {
      //console.log(lastAud)
      listenEnd()
       transcript = e.results[0][0].transcript;
       transcript = transcript[0].toUpperCase() + transcript.slice(1)
       readout.innerHTML = transcript
       talkBox.innerHTML = ""
       xml.open("POST","/audio/",false)
       xml.onload = function() {
         let responseList = this.responseText.split(",")
        //console.log(responseList)
        for (let pos = 2; pos < responseList.length; pos++) {
         talkBox.innerHTML += " " + responseList[pos];
        }
        talky.style.boxShadow = `inset 0 0 12px 12px white, inset 0 0 3px 2px white`
         init()
         done = true
        let audio = new Audio(`static/${responseList[1]}.mp3`);audio.play();
        lastAud = Number.parseInt(responseList[0]);}
       xml.send(JSON.stringify(transcript))
    }
    recognization.onend = (e) => {
      //console.log(transcript)
      if (transcript == undefined){
        talkBox.innerHTML = "No Voice Detected"
        talky.style.boxShadow = `inset 0 0 12px 12px white, inset 0 0 3px 2px white`
      }
      done = true
    }

    recognization.start();
 }
 document.onkeydown = (e) => {
   if (e.key == " " && done == true){
      done = false
      readout.innerHTML = ""
      init()
    runSpeechRecog()
 }}

talky.addEventListener("click", clickAct)
talky.addEventListener("touchstart", clickAct)

function clickAct(e){
  if (done == true){
    done = false
    readout.innerHTML = ""
    init()
  runSpeechRecog()
}}

 function listenStart(){
   talkBox.innerHTML = "Listening..."
 }

 function listenEnd(){
   talkBox.innerHTML = "Press Space and Say Something!"
 }

 window.addEventListener("unload",(e) => {
  xml.open("POST","/delete/",true)
    xml.onload = function() {}
    xml.send(lastAud)
})

window.addEventListener("beforeunload", (e) => {
  xml.open("POST","/delete/",true)
    xml.onload = function() {}
    xml.send(lastAud)
})

const talky = document.querySelector(".talky")
const talkBox = document.querySelector(".talk-box")
const readout = document.querySelector(".readout")
const Title = document.querySelector(".name")
let lastKey = null;
let processOccuring = false;
let first = true
const xml = new XMLHttpRequest();

window.onresize = (e) => {
    init()
}

function talkBoxInit(dia){
    if (window.innerHeight >= window.innerWidth){
        talkBox.style.fontSize = window.innerWidth / 20 + "px"
    }
    else {
        talkBox.style.fontSize = window.innerWidth / 50 + "px"
    }
    talkBox.style.marginLeft = (dia-talkBox.clientWidth)/2 + "px"
    talkBox.style.marginTop = (dia-talkBox.clientHeight)/2 + "px"
}

function init(resize){
    dia = window.innerHeight / 1.75;
    talky.style.width = dia + "px";
    talky.style.height = dia + "px";
    talky.style.marginLeft = (window.innerWidth-dia)/2 + "px"
    talky.style.marginTop = (window.innerHeight-dia)/2  + "px"
    talkBoxInit(dia)
    pos = talky.getBoundingClientRect()
    readout.style.marginTop = pos.bottom * 1.1 + "px";
    readout.style.width =  dia + "px";
    readout.style.fontSize = window.innerWidth / 30 + "px"
    //readout.style.height = dia/16 + "px";
    readout.style.marginLeft = (window.innerWidth-readout.clientWidth)/2 + "px"
    if (first == true || resize == true){
        //console.log(first)
        Title.style.marginTop = pos.top * 0.3 + "px";
        Title.style.fontSize = pos.top * 0.3 + "px"
        Title.style.marginLeft = (window.innerWidth-Title.clientWidth)/2 + "px"
    }
    first = false
}
init()
let i = 0;
async function Exp(){
    i = 0;
    inter = setInterval(animeUp,0.1)
}
async function Shr(){
    i = 0;
    inter = setInterval(animeDw,0.1)
}
async function animeUp(){
    if (i == 20){
        clearInterval(inter)
        processOccuring = false
    }
    else{
        i++;
        talky.style.width = talky.clientWidth * 1.01 + "px";
        talky.style.height = talky.clientHeight * 1.01 + "px";
        talky.style.marginLeft = (window.innerWidth-talky.clientWidth)/2 + "px"
        talky.style.marginTop = (window.innerHeight-talky.clientHeight)/2 + "px"
        talkBoxInit(talky.clientHeight)
        let curtime = new Date();
        curtime = curtime.getTime()
        run = true
        while (run == true){
            locTime = new Date()
            locTime = locTime.getTime()
            //console.log(locTime - curtime)
            if (locTime - curtime > 100){
                run = false
            }
        }
    }
}
async function animeDw(){
    if (i == 20){
        clearInterval(inter)
        processOccuring = false
    }
    else{
        i++;
        talky.style.width = talky.clientWidth / 1.01 + "px";
        talky.style.height = talky.clientHeight / 1.01 + "px";
        talky.style.marginLeft = (window.innerWidth-talky.clientWidth)/2 + "px"
        talky.style.marginTop = (window.innerHeight-talky.clientHeight)/2 + "px"
        let curtime = new Date();
        talkBoxInit(talky.clientHeight)
        curtime = curtime.getTime()
        run = true
        while (run == true){
            locTime = new Date()
            locTime = locTime.getTime()
            //console.log(locTime - curtime)
            if (locTime - curtime > 100){
                run = false
            }
        }
    }
}
document.onkeydown = (e) => {
    if (e.key == "e" && lastKey != "exp" && processOccuring == false){
        Exp()
        processOccuring = true
        if (lastKey != "shr"){
            lastKey = "exp"
        }
        else {
            lastKey = null
        }
    }
    else if (e.key == "q" && lastKey != "shr" && processOccuring == false){
        processOccuring = true
        Shr()
        if (lastKey != "exp"){
            lastKey = "shr"
        }
        else {
            lastKey = null
        }
    }
}

window.onresize = (e) => {init(true)};

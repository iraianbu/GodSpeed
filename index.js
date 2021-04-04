var score = 0;
var points = 0;
var errorKeys = [];
var toret, i, j;
var timeSet = 1;
var  wpm=0, acc = [], corret = [];
var minute=0, second = 0;
var player = localStorage.getItem('playerName');
var errorOccur = 0;
var contentBox = [];
contentBox.push("Today, historians relate that, as a general rule, buying and selling securities was very much unorganized before the year 1792. Every person who owned a security faced the problem of finding interested buyers who might consider the purchase of a debt-free investment. This meant most people were somewhat slow in investing in stocks and bonds because these securities could not readily be converted into money");
contentBox.push("We have been told that an interesting number of traders and merchants agreed to try to do something to help correct the situation. At this first crucial meeting, they decided that it was a good idea to visit regularly on a daily basis to buy and sell securities. The group of leaders, whose meeting place was under an old, tall cottonwood tree, found the needed time to plot the financial future of our nation");
contentBox.push("We know from reading the old records that the original team who met together long ago in May became the very first members of the New York Stock Exchange. The New York Stock Exchange is still operating. Other stock exchanges conduct business in many countries around the world. Thousands and thousands of stocks and bonds are bought and sold each day");
contentBox.push("Web designers are expected to have an awareness of usability and if their role involves creating mark up then they are also expected to be up to date with web accessibility guidelines. The different areas of web design include web graphic design; interface design; authoring, including standardised code and proprietary software; user experience design; and search engine optimization");
contentBox.push("Editing is a growing field of work in the service industry. Paid editing services may be provided by specialized editing firms or by self-employed (freelance) editors. Editing firms may employ a team of in-house editors, rely on a network of individual contractors or both. Such firms are able to handle editing in a wide range of topics and genres, depending on the skills of individual editors");
contentBox.push("The services provided by these editors may be varied and can include proofreading, copy editing, online editing, developmental editing, editing for search engine optimization (SEO), etc. Self-employed editors work directly for clients or offer their services through editing firms, or both. They may specialize in a type of editing and in a particular subject area");
contentBox.push("Those who work directly for authors and develop professional relationships with them are called authors' editors. A late 20th century trend in typing, primarily used with devices with small keyboards (such as PDAs and Smartphones), is thumbing or thumb typing. This can be accomplished using one or both thumbs. The fastest typing speed ever, 216 words per minute, was achieved by Stella Pajunas-Garnand");
contentBox.push("Similar to desktop keybo  ards and input devices, if a user overuses keys which need hard presses and/or have small and unergonomic layouts, it could cause thumb tendonitis or other repetitive strain injury");
contentBox.push("from Chicago in 1946 in one minute on an IBM electric. As of 2005, writer Barbara Blackburn was the fastest English language typist in the world, according to The Guinness Book of World Records. Using the Dvorak Simplified Keyboard, she had maintained 150 wpm for 50 minutes, and 170 wpm for shorter periods, with a peak speed of 212 wpm. Blackburn, who failed her QWERTY typing class in high school");
contentBox.push("first encountered the Dvorak keyboard in 1938, quickly learned to achieve very high speeds, and occasionally toured giving speed-typing demonstrations during her secretarial career. She appeared on Late Night with David Letterman on January 24, 1985, but felt that Letterman made a spectacle of her. Blackburn died in April 2008 Medical transcription, also known as MT, is an allied health profession dealing");
contentBox.push("Closed captions were created for deaf or hard of hearing individuals to assist in comprehension. They can also be used as a tool by those learning to read, learning to speak a non-native language, or in an environment where the audio is difficult to hear or is intentionally muted with the process of transcribing voice-recorded medical reports that are dictated by physicians, nurses and other healthcare practitioners");
contentBox.push("Medical reports can be voice files, notes taken during a lecture, or other spoken material. These are dictated over the phone or uploaded digitally via the Internet or through smart phone apps Web designers are expected to have an awareness of usability and if their role involves creating mark up then they are also expected to be up to date with web accessibility guidelines");
var content;

document.querySelector(".player-name").innerText = "player";
document.querySelector(".minute").innerText = getInTimeFormat(minute)+":";
document.querySelector(".second").innerText = getInTimeFormat(second);
$(document).ready(function(){
    $('#Starter').modal({
        backdrop: 'static',
        keyboard: false
    });
    if(player!==null){
        document.querySelector("#player-name").value = player;

    }

    $('#Result').modal({
        backdrop: 'static',
        keyboard: false
    });
    $("#Starter").modal("toggle");
    $(".restart-btn").click(function(){
        location.reload();
        
    });
    minute = 0;
    second=0;
});


var start = false;
var timerID;

$(".time-set-btn").click(function(event){
    document.querySelectorAll(".time-set-btn")[this.value].classList.add("activate-time-set-btn");
    if(this.value == 2){
        minute = 5;
        timeSet = 5;
    }
    else{
        minute = parseInt(this.value)+1;
        timeSet = minute;
    }
    
    document.querySelectorAll(".time-set-btn")[(this.value+1)%3].classList.remove("activate-time-set-btn");
    document.querySelectorAll(".time-set-btn")[(this.value+2)%3].classList.remove("activate-time-set-btn");
    
});

$(".start-btn").click(function(){
    initSetup();
    
    document.addEventListener("keydown", checkContent);
});

function checkContent(event){
    if(!start && !checkKeydownBug(event.key)){
        start = true;
        timerID = setInterval(setTime, 1000);
    }
    if(score !== content.length){

        if(checkKeydownBug(event.key)){
            //donothing
        }
        else if(event.key === "Backspace"){
            if(score!==0){
                score--;
            }
            if(errorKeys[errorKeys.length-1] === score){
                errorKeys.pop();
            }
            document.querySelector(".content").innerHTML = modifyContent();

        }
        else if(event.key == content[score]){
            score++;
            document.querySelector(".content").innerHTML = modifyContent();

        }
        else{
            errorKeys.push(score);
            errorOccur++;
            score++;
            document.querySelector(".content").innerHTML = modifyContent();
        }
    }
    if(score === content.length){
        wpm += parseInt(((score-errorKeys.length)/(5*timeSet)));
        acc.push(parseFloat(((score-errorOccur)/score)));
        if(errorOccur !==0){
            corret.push(parseFloat((errorOccur-errorKeys.length)/errorOccur));
        }

        content = getContent();
        errorKeys = [];
        score = 0;
        errorOccur = 0;
        document.querySelector(".content").innerHTML = modifyContent();

    }
}



function initSetup(){
    $("#Starter").modal("toggle");

    score = 0;
    wpm = 0;
    acc = [];
    corret = [];
    errorKeys = [];
    // player-name-set
    if(player === null){
        player = "Player01";
    }

    player = document.querySelector("#player-name").value;
    document.querySelector(".player-name").innerText = player;
    localStorage.setItem("playerName",player);

    // player-time-set
    if(minute === 0){
        minute = 1;
    }
    document.querySelector(".minute").innerText = getInTimeFormat(minute)+":";
    document.querySelector(".second").innerText = getInTimeFormat(second);
    

    content = getContent();
    document.querySelector(".content").innerHTML = modifyContent();
}

function getContent(){
    return contentBox[Math.floor(Math.random()*contentBox.length)];

}

function setTime(){
    if(minute === 0  && second === 0){
        clearInterval(timerID);
        printResult();
        document.removeEventListener("keydown", function(event){
            checkContent(event);
            
        });
        start = false;
        document.removeEventListener("keydown", checkContent);
        $("#Result").modal("show");
        
    }
    else if(second === 0){
        second = 59;
        minute--;
    }
    else{
        second--;
    }

    document.querySelector(".minute").innerText = getInTimeFormat(minute)+":";
    document.querySelector(".second").innerText = getInTimeFormat(second);
}

function printResult(){
    wpm += parseInt(((score-errorKeys.length)/(5*timeSet)).toFixed(0));
    acc.push(parseFloat(((score-errorOccur)/score).toFixed(2)));
    if(errorOccur !== 0){
        corret.push(parseFloat((errorOccur-errorKeys.length)/errorOccur));
    }
    else{
        corret.push(0);
    }
    document.querySelector(".wpm").innerText = wpm;
    document.querySelector(".accuracy").innerText = calculateAccuracy();
    document.querySelector(".corrate").innerText = calculateCorret();
    
    if(wpm <= 25){
        document.querySelector("#Result .modal-title").innerText = "You Suck!"
    }
    else if(wpm <= 42){
        document.querySelector("#Result .modal-title"). innerText = "Yeah! Nice";
    }
    else{
        document.querySelector("#Result .modal-title").innerText = "tf! you're Great!"
    }

}
function calculateAccuracy(){
    toret = 0;
    for(i=0; i<acc.length; i++){
        toret += parseFloat(acc[i]);
    }
    return (toret/acc.length).toFixed(2);
}

function calculateCorret(){
    toret = 0;
    for(i=0; i<corret.length; i++){
        toret += parseFloat(corret[i]);
    }
    return (toret/corret.length).toFixed(2);
}
function getInTimeFormat(i){
    if(i/10 < 1){
        return "0"+i;
    }
    return ""+i;
}
function modifyContent(){
    toret = "";
    if(errorKeys.length === 0){
        toret += "<typedContent>"+content.slice(0,score)+"</typedContent>";
    }
    else{
        toret += "<typedContent>"+content.slice(0,errorKeys[0])+"</typedContent><errorKey>"+content[errorKeys[0]]+"</errorKey>";
    }
    for(i=1; i<errorKeys.length; i++){
        toret += "<typedContent>"+content.slice(errorKeys[i-1]+1,errorKeys[i])+"</typedContent><errorKey>"+content[errorKeys[i]]+"</errorKey>";
    }
    if(errorKeys.length !== 0){
        if(errorKeys[errorKeys.length-1] !== score-1){
            toret += "<typedContent>"+content.slice(errorKeys[i-1]+1,score)+"</typedContent>";
        }
    }
    if(score !== content.length){
        toret += "<u>"+content[score]+"</u>"+content.slice(score+1,content.length);
    }
    return toret;
}

function checkKeydownBug(i){
    if(i==="Alt" || i === "Shift"|| i === "Control" || i === "CapsLock" || i=== "Tab" || i==="Enter"){
        return true;
    }
    return false;
}
//after we finish countdown we start break countdown

let stopTimer = false;
let interval;
let SessionTime = 25;
let BreakTime = 5;
let SessionAmount = 4;
const display = document.getElementById('time');

// buttons and stuff
const UpSession = document.querySelector('#up-session');
const DownSession = document.querySelector('#down-session');
const UpBreak = document.querySelector('#up-break');
const DownBreak = document.querySelector('#down-break');
const displaySessionTime = document.querySelector('#time-session');
const displayBreakTime = document.querySelector('#time-break');
const sessionOrBreak = document.querySelector('.session');
const SessionAmountUp = document.querySelector('#repeat-up');
const SessionAmountdown = document.querySelector('#repeat-down');
const SessionRepeatTimes = document.querySelector('.repeat-times');
const StopButton = document.querySelector('.stop');
const ResetButton = document.querySelector('.reset');
const PlayButton = document.querySelector('.play');    
const PauseButton = document.querySelector('.pause');




function startTimer(seconds, oncomplete) {
    var startTime, timer, obj, ms = seconds*1000;

    //displays if its a session or break
    // if (seconds/60 == SessionTime){
    //     sessionOrBreak.innerText = 'Session'
    // }
    // else{
    //     sessionOrBreak.innerText = 'Break'
    // }

    obj = {};
    obj.resume = function() {
        startTime = new Date().getTime();
        timer = setInterval(obj.step,250); // adjust this number to affect granularity
                            // lower numbers are more accurate, but more CPU-expensive
    };
    obj.pause = function() {
        console.log('hi')
        ms = obj.step();
        clearInterval(timer);
    };
    obj.step = function() {
        var now = Math.max(0,ms-(new Date().getTime()-startTime)),
            m = Math.floor(now/60000), s = Math.floor(now/1000)%60;
        s = (s < 10 ? "0" : "")+s;
        display.innerText = m+":"+s;
        if( now == 0) {
            clearInterval(timer);
            obj.resume = function() {};
            if( oncomplete){
                oncomplete()
            } ;
        }
        return now;
    };
    obj.stop = function() {
        obj.pause();
        display.innerText = SessionTime + ':' + '00';
        ms = seconds*1000;
    }

    obj.resume();
    return obj;
}


let isStarted = false;

let timer;

PlayButton.onclick = () => {
    
    if(isStarted === false ){ 
        timer = startTimer(SessionTime*10,() => startTimer(BreakTime*10)); 
        //how we can start timer again? uhh it should be ^^
        console.log('1')
        startTimer(SessionTime*10,() => startTimer(BreakTime*10));
        console.log('2')
        
        
        
        
        //just to check
        
        isStarted = true;
        //let me try kk
    }
    else{
        timer.resume();
    }

};

function repeatTimes (){
    for(let i = 0; i < SessionAmount; i++){
        if (i%2 == 0){
            timer = startTimer(SessionTime*10,() => startTimer(BreakTime*10));
        }
    }
}

ResetButton.onclick = () => {
    if(isStarted === true){
        timer.stop();
    }
    
    SessionTime = 25;
    BreakTime = 5;
    displaySessionTime.innerText = SessionTime;
    display.innerText = SessionTime + ':' + '00'
    displayBreakTime.innerText = BreakTime;
}
PauseButton.onclick = () => timer.pause();
StopButton.onclick = () => timer.stop();

SessionAmountUp.onclick = function(){
    SessionAmount++;
    SessionRepeatTimes.innerText = SessionAmount;
}

SessionAmountdown.onclick = function(){
    SessionAmount--;
    SessionRepeatTimes.innerText = SessionAmount;
}

UpSession.onclick = function(){
    SessionTime++;
    isStarted = false;
    displaySessionTime.innerText = SessionTime;
    display.innerText = SessionTime + ':' + '00'
}

DownSession.onclick = function(){
    //do not let session time go below 1
    if(SessionTime == 1){
        return;
    }
    isStarted = false;
    SessionTime--;
    displaySessionTime.innerText = SessionTime;
    display.innerText = SessionTime + ':' + '00'
}

UpBreak.onclick = function(){
    BreakTime++;
    displayBreakTime.innerText = BreakTime;
}

DownBreak.onclick = function(){
    //do not let session time go below 1
    if(BreakTime == 1){
        return;
    }
    BreakTime--;
    displayBreakTime.innerText = BreakTime;
}




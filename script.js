//after we finish countdown we start break countdown

let stopTimer = false;
let interval;
let sessionTime = 25;
let timeleft = 25*60;
let BreakTime = 5;
let SessionAmount = 4;
let display = document.getElementById('time');

let isSession = true;
let isBreak = false;

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

const ResetButton = document.querySelector('.reset');
const PlayButton = document.querySelector('.play');    

const sessionShow = document.querySelector('#sessions-container')
const SessionsLeft = document.querySelector('#sessions-left')
sessionShow.style.display = 'none'; //hides the div

//i think we can put it here



let running = 0;
function startPause(){ 
  //we need show sessions left only when we started
  sessionShow.style.display = 'block'; //shows div
  
    if (running === 0){ //checks if we started
        running = 1;
        increment();
        PlayButton.innerHTML = "Pause";
    } else { // checks if we paused
        running = 0
        PlayButton.innerHTML = "Resume"
    }
}
function reset(){ 
    sessionShow.style.display = 'none';
    running = 0;
    timeleft = (sessionTime*60)+1; 
    PlayButton.innerHTML = "Start"
    SessionAmount = parseInt(SessionRepeatTimes.innerText);
    sessionTime = 25;
    timeleft = 25*60;
    BreakTime = 5;
    display.innerHTML = sessionTime + ':00';
    displayBreakTime.innerText = BreakTime;
    displaySessionTime.innerText = sessionTime;
    
    // and hide it when we reseted
}

function increment(){ // time function
    SessionsLeft.innerText = SessionAmount;
    

    if(SessionAmount == 0){
        sessionOrBreak.innerText = 'Done!'
        return; 
    }

    if(isSession === true){
        sessionOrBreak.innerText = 'Session'
    }
    else{
        sessionOrBreak.innerText = 'Break'
    }

    if(running == 1){
        setTimeout(function(){
            
            timeleft--;
            var mins = Math.floor(timeleft/60);
            let secs = Math.floor(timeleft%60);
            if(mins < 10) {
                mins = '0' + mins;
            }
            if (secs <10) {
                secs = '0' + secs
            }
            display.innerHTML = mins + ':' + secs;

            if(timeleft == 0) {
                if(SessionAmount > 0){ // so it wont go negative...and this skips the last break i think
                    switchTimer(); //so here we can make switcher function to replace time session/break
                }
                else{
                    return;
                }
                
                
            }
            increment();
        }, 1000);
    }
    
}
// now we need counter that counts sessionslol let me try lol kk
//fuuuuuuu last time lol ok your turn
function switchTimer() {
    if (SessionAmount > 0 ){ 
        if (isSession === true) { // if session end
            isSession = false;
            isBreak = true;
            timeleft = sessionTime*60;
            SessionAmount--;

            console.log(SessionAmount)
        } else if (isBreak === true ) { //if break end
            isBreak = false;
            isSession= true
            timeleft = BreakTime*60;
        }
    } else {
        running = 0; // it should work 
        return; 
        
    }
        
    //if session - do this
    // if break - do this
}



let timer;

PlayButton.addEventListener('click', startPause);


ResetButton.onclick = () => {
    reset();
}

SessionAmountUp.onclick = function(){
    if(running == 1){
        return;
    }
    SessionAmount++;
    SessionRepeatTimes.innerText = SessionAmount;
}

SessionAmountdown.onclick = function(){
    if(running == 1){
        return;
    }

    if(SessionAmount == 1){
        return;
    }
    SessionAmount--;
    SessionRepeatTimes.innerText = SessionAmount;
}

UpSession.onclick = function(){
    if(running == 1){
        return;
    }
    sessionTime++;
    timeleft = sessionTime*60;
    displaySessionTime.innerText = sessionTime;
    display.innerText = sessionTime + ':' + '00'
}

DownSession.onclick = function(){
    if(running == 1){
        return;
    }
    //do not let session time go below 1
    if(sessionTime == 1){
        return;
    }
    
    sessionTime--;
    timeleft = sessionTime*60;
    displaySessionTime.innerText = sessionTime;
    display.innerText = sessionTime + ':' + '00'

}

UpBreak.onclick = function(){
    if(running == 1){
        return;
    }
    BreakTime++;
    displayBreakTime.innerText = BreakTime;
}

DownBreak.onclick = function(){
    if(running == 1){
        return;
    }
    //do not let session time go below 1
    if(BreakTime == 1){
        return;
    }
    BreakTime--;
    displayBreakTime.innerText = BreakTime;
}



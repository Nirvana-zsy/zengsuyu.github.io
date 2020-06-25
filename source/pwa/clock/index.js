// Register service worker to control making site work offline

if('serviceWorker' in navigator) {
  navigator.serviceWorker
           .register('./sw.js')
           .then(function() { console.log('Service Worker Registered'); });
}

var fullFlag = false;
    var WEEK_DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    var lastTimer = null;

    quote()
    clock()
    setInterval(clock,1000)
    setInterval(quote,30000)

    document.getElementById("full").addEventListener("click",full)
    document.getElementById("exit").addEventListener("click",exitFullscreen)
    document.addEventListener('mousemove', () => {
      var now=new Date().getTime()
      if(!lastTimer || now - lastTimer >500 ){
        lastTimer=now
        userActive()
      }
    })
    document.addEventListener('fullscreenchange', () => {
      if (document.fullscreenElement) {
        document.getElementById("exit").style.display = "block";
        document.getElementById("exit").style.opacity = 1
        document.getElementById("full").style.display = "none";
        fullFlag = true;
        setTimeout(function(){
          document.getElementById("exit").style.opacity = 0
        },2000)
      } else {
        document.getElementById("exit").style.display = "none";
        document.getElementById("full").style.display = "block";
        document.getElementById("full").style.opacity = 1
        fullFlag = false;
        setTimeout(function(){
          document.getElementById("full").style.opacity = 0
        },2000)
      }
    });

    function clock(){
      var now = new Date()

      var year = now.getFullYear()+''
      var month = (now.getMonth()+1)+''
      var day = now.getDate()+''
      var weekDay = WEEK_DAYS[now.getDay()+'']
      var _date = `${year}-${month.padStart(2,'0')}-${day.padStart(2,'0')}  ${weekDay}`
      
      var hour = now.getHours()+''
      var minute = now.getMinutes()+''
      var second = (now.getSeconds()+'').padStart(2,'0')
      var _timer = `${hour.padStart(2,'0')} : ${minute.padStart(2,'0')}`

      document.getElementById('timer').innerHTML = _timer
      document.getElementById('date').innerHTML = _date
      document.getElementById('second').innerHTML = second
    }
    function quote(){
      var randomIdx = Math.floor(quotes.length * Math.random())
      var quote = quotes[randomIdx]
      var _quote = `${quote.quote} ——${quote.author}`
      document.getElementById('quote').innerHTML = _quote
    }
    function userActive(){
      if(fullFlag){
        document.getElementById("exit").style.opacity = 1
        setTimeout(function(){
          document.getElementById("exit").style.opacity = 0
        },3000)
      }else{
        document.getElementById("full").style.opacity = 1
        setTimeout(function(){
          document.getElementById("full").style.opacity = 0
        },3000)
      }
    }

    function full() {
      var ele = document.getElementById("content")
      if (ele.requestFullscreen) {
        ele.requestFullscreen();
      } else if (ele.mozRequestFullScreen) {
        ele.mozRequestFullScreen();
      } else if (ele.webkitRequestFullscreen) {
        ele.webkitRequestFullscreen();
      } else if (ele.msRequestFullscreen) {
        ele.msRequestFullscreen();
      }
    }
    function exitFullscreen() {
      if(document.exitFullScreen) {
        document.exitFullScreen();
      } else if(document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if(document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if(document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
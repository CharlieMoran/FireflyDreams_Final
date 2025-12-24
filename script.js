/*
 _
//\
V  \
 \  \_
  \,'.`-.
   |\ `. `.       
   ( \  `. `-.                         _,.-:\
    \ \   `.  `-._             __..--' ,-'; /
     \ `.   `-.   `-..___..---'   _.--'  ,'/
      `. `.    `-._        __..--'     ,' /
       `. `-_     ``--..''         _.-' ,'
         `-_ `-.___          __,--'  ,'
             `-.__  `----"""    __.-'
                   `--..____..--'
*/

// Particles
const partContainer = document.getElementById('particles');
for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + 'vw';
    p.style.animationDelay = Math.random() * 10 + 's';
    p.style.animationDuration = (Math.random() * 10 + 10) + 's';
    partContainer.appendChild(p);
}

// ORIGINAL WORKING MOON PHASE LOGIC
function getMoonPhase() {
    const date = new Date();
    let year = date.getFullYear(), month = date.getMonth() + 1, day = date.getDate();
    if (month < 3) { year--; month += 12; }
    month++;
    let c = 365.25 * year, e = 30.6 * month, jd = c + e + day - 694039.09;
    jd /= 29.5305882;
    let b = parseInt(jd); jd -= b; b = Math.round(jd * 8);
    if (b >= 8) b = 0;
    const phases = [
        { icon: "🌑", label: "New Moon" }, { icon: "🌒", label: "Waxing Crescent" },
        { icon: "🌓", label: "First Quarter" }, { icon: "🌔", label: "Waxing Gibbous" },
        { icon: "🌕", label: "Full Moon" }, { icon: "🌖", label: "Waning Gibbous" },
        { icon: "🌗", label: "Last Quarter" }, { icon: "🌘", label: "Waning Crescent" }
    ];
    document.getElementById('moonIcon').innerText = phases[b].icon;
    document.getElementById('moonLabel').innerText = phases[b].label;
}
getMoonPhase();

// Sunset Bell: Shows only between 5:00 PM and 8:00 PM
function checkSunset() {
    const hour = new Date().getHours();
    const bell = document.getElementById('sunsetBell');
    if (hour >= 17 && hour <= 20) {
        bell.style.display = 'block';
    } else {
        bell.style.display = 'none';
    }
}
checkSunset();
setInterval(checkSunset, 60000);

// Interaction Functions
function triggerMoonMagic(event) {
    alert("Moondrop is watching over the night! Magic is in the air.");
}

function triggerDreamMagic(event) {
    alert("Stardrop is weaving a peaceful dream for you! Sleep well.");
}

// Splash Logic
function bananaEnter(event) {
    const bgAudio = document.getElementById('bgMusic');
    bgAudio.volume = 0.2; bgAudio.play();
    document.getElementById('splashOverlay').style.opacity = '0';
    setTimeout(() => { document.getElementById('splashOverlay').style.display = 'none'; }, 800);
}

function bananaExit() { window.location.href = "https://www.google.com"; }


/*
 _
//\
V  \
 \  \_
  \,'.`-.
   |\ `. `.       
   ( \  `. `-.                         _,.-:\
    \ \   `.  `-._             __..--' ,-'; /
     \ `.   `-.   `-..___..---'   _.--'  ,'/
      `. `.    `-._        __..--'     ,' /
       `. `-_     ``--..''         _.-' ,'
         `-_ `-.___          __,--'  ,'
             `-.__  `----"""    __.-'
                   `--..____..--'
*/
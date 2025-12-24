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
        `. `-_     ``--..''         _.-','
          `-_ `-.___          __,--'  ,'
              `-.__  `----"""    __.-'
                   `--..____..--'
*/

let weatherActive = false;
let moonCooldown = false;
let dreamcatcherCooldown = false;
let bellClicks = 0;

// Environment Logic
function updateTheme() {
    const hour = new Date().getHours();
    const hero = document.getElementById('heroDisplay');
    const body = document.body;

    body.classList.remove('sunset-glow', 'cursor-day', 'cursor-night');

    if (hour >= 7 && hour < 17) {
        // Day
        hero.src = "images/hero.png";
        body.classList.add('cursor-day');
    } else if (hour >= 17 && hour < 19) {
        // Sunset
        hero.src = "images/hero sunset.jpg";
        body.classList.add('sunset-glow', 'cursor-day');
    } else {
        // Night
        hero.src = "images/hero night.jpg";
        body.classList.add('cursor-night');
    }
}

// Hemisphere Logic
async function checkHemisphere() {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const moon = document.getElementById('moonCrescent');
    const moonIcon = document.getElementById('moonIcon');
    
    // Check common Southern Hemisphere timezones
    if (tz.includes('Sydney') || tz.includes('Auckland') || tz.includes('Brazil') || tz.includes('Johannesburg')) {
        moon.classList.add('moon-south');
        moonIcon.style.display = "inline-block";
        moonIcon.style.transform = "scaleX(-1)";
    }
}

// Bell Logic
function ringBell() {
    const bell = document.getElementById('mcBell');
    const sound = document.getElementById('bellSound');
    
    sound.currentTime = 0;
    sound.play();

    // Reset animation on spam
    bell.style.transform = "rotate(0deg)";
    
    setTimeout(() => {
        bell.src = "images/Bell2.jpg";
        bell.style.transform = "rotate(-20deg)";
        setTimeout(() => {
            bell.src = "images/Bell3.jpg";
            bell.style.transform = "rotate(20deg)";
            setTimeout(() => {
                bell.src = "images/Bell1.png";
                bell.style.transform = "rotate(0deg)";
            }, 100);
        }, 100);
    }, 50);
}

// Dreamcatcher Logic
function triggerDreamcatcher() {
    if (dreamcatcherCooldown) return;
    dreamcatcherCooldown = true;

    const dc = document.getElementById('dreamcatcher');
    dc.classList.add('swirl-active');

    setTimeout(() => {
        dc.classList.remove('swirl-active');
        setTimeout(() => { dreamcatcherCooldown = false; }, 10000);
    }, 2000);
}

// Moon Logic
let moonClickCount = 0;
function triggerMoon() {
    if (moonCooldown) return;
    moonClickCount++;

    const createStar = () => {
        const star = document.createElement('div');
        star.className = 'shooting-star';
        star.style.left = Math.random() * 100 + "vw";
        star.style.top = Math.random() * 50 + "vh";
        document.body.appendChild(star);
        setTimeout(() => star.remove(), 1000);
    };

    if (moonClickCount >= 3) {
        moonCooldown = true;
        for (let i = 0; i < 15; i++) {
            setTimeout(createStar, i * 150);
        }
        setTimeout(() => {
            moonClickCount = 0;
            moonCooldown = false;
        }, 15000);
    } else {
        createStar();
    }
}

// Weather Engine
function setWeather(type) {
    const overlay = document.getElementById('weatherOverlay');
    const loop = document.getElementById('weatherLoop');
    overlay.innerHTML = '';
    
    if (type === 'Clear') {
        loop.pause();
        return;
    }

    loop.volume = 0.12;
    loop.play();

    for (let i = 0; i < 50; i++) {
        const drop = document.createElement('div');
        drop.className = type === 'Rain' ? 'raindrop' : 'particle'; // Simple reuse
        drop.style.left = Math.random() * 100 + "vw";
        drop.style.animationDuration = (Math.random() * 1 + 0.5) + "s";
        drop.style.animationDelay = Math.random() * 2 + "s";
        overlay.appendChild(drop);
    }
}

// Cursor Particles
document.addEventListener('mousemove', (e) => {
    const hour = new Date().getHours();
    
    // Pollen/Petals for Day/Sunset
    if (hour >= 7 && hour < 19) {
        if (Math.random() > 0.9) {
            const petal = document.createElement('div');
            petal.className = 'petal';
            petal.style.left = e.pageX + "px";
            petal.style.top = e.pageY + "px";
            document.body.appendChild(petal);
            setTimeout(() => petal.remove(), 4000);
        }
    } else {
        // Star Trail for Night
        const star = document.createElement('div');
        star.className = 'particle';
        star.style.position = 'absolute';
        star.style.width = '4px';
        star.style.height = '4px';
        star.style.left = e.pageX + "px";
        star.style.top = e.pageY + "px";
        star.style.pointerEvents = 'none';
        document.body.appendChild(star);
        setTimeout(() => star.remove(), 800);
    }
});

// Splash Screen
function bananaEnter(event) {
    document.getElementById('bgMusic').volume = 0.2;
    document.getElementById('bgMusic').play();
    
    const splash = document.getElementById('splashOverlay');
    splash.style.opacity = '0';
    setTimeout(() => { splash.style.display = 'none'; }, 800);
    
    updateTheme();
    checkHemisphere();
}

function bananaExit() {
    window.location.href = "https://archive.org/details/TFR234-Anti-Ben-AnOrgyOfCelestialSoundsAndBenHatred/03-DanceLikeABenlookLikeAQueer.mp3";
}

// Init
setInterval(updateTheme, 60000);

/*
 _
//\
V  \
 \  \_
  \,'.`-.
   |\ `. `.       
   ( \  `. `-.                         _,.-:\
    \ \   `.  `-._                __..--' ,-'; /
     \ `.   `-.   `-..___..---'   _.--'  ,'/
      `. `.    `-._        __..--'     ,' /
       `. `-_     ``--..''         _.-'  ,'
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

// Moon Phase
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

// Sunset Bell
function checkSunset() {
    const hour = new Date().getHours();
    const bell = document.getElementById('sunsetBell');
    bell.style.display = (hour >= 17 && hour <= 20) ? 'block' : 'none';
}
checkSunset();
setInterval(checkSunset, 60000);

// Character Magic Interactions
function moondropMagic(event) {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine'; osc.frequency.setValueAtTime(440, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.5);
    gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);
    osc.connect(gain); gain.connect(audioCtx.destination);
    osc.start(); osc.stop(audioCtx.currentTime + 0.5);
    alert("Moondrop has cast a protection spell over your browser!");
}

function stardropDream(event) {
    alert("Stardrop is weaving a dream for you... Sleep well tonight.");
}

// Splash Screen
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
        `. `-_     ``--..''         _.-','
          `-_ `-.___          __,--'  ,'
              `-.__  `----"""    __.-'
                   `--..____..--'
*/
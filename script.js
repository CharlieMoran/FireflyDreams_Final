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
    \ \   `.  `-._             __..--' ,-'; /
     \ `.   `-.   `-..___..---'   _.--'  ,'/
      `. `.    `-._        __..--'     ,' /
        `. `-_     ``--..''         _.-','
          `-_ `-.___          __,--'  ,'
              `-.__  `----"""    __.-'
                   `--..____..--'
*/
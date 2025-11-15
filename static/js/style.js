var loader = document.getElementById("preloader");

const startBtn = document.getElementById("startBtn");
const startScreen = document.getElementById("startScreen");
const bootScreen = document.getElementById("bootScreen");
const consoleBox = document.getElementById("console");
const progressBar = document.getElementById("progress");
const percentText = document.getElementById("percentText");
const pageContent = document.getElementById("pageContent");
const preloader = document.getElementById("preloader");

const pythonLines = [
  "Initializing Python Engine...",
  "import os",
  "Loading modules...",
  "Compiling project...",
  "Starting services...",
  "Running server...",
  "Final checks..."
];

startBtn.onclick = () => {
  startScreen.style.display = "none";
  bootScreen.style.display = "block";

  let i = 0, percent = 0;

  let codeTimer = setInterval(() => {
    if (i < pythonLines.length) {
      consoleBox.textContent += pythonLines[i] + "\n";
      i++;
    }
  }, 1300);

  let loadTimer = setInterval(() => {
    if (percent <= 100) {
      progressBar.style.width = percent + "%";
      percentText.textContent = percent + "%";
      percent++;
    } else {
      clearInterval(codeTimer);
      clearInterval(loadTimer);

      preloader.style.opacity = "0";
      setTimeout(() => {
        preloader.style.display = "none";
        pageContent.style.display = "block";
      }, 100);
    }
  }, 100);
};


function hamburgerMenu() {
    document.body.classList.toggle("stopscrolling");
    mobileTogglemenu.classList.toggle("show-toggle-menu");
    document.getElementById("burger-bar1").classList.toggle("hamburger-animation1");
    document.getElementById("burger-bar2").classList.toggle("hamburger-animation2");
    document.getElementById("burger-bar3").classList.toggle("hamburger-animation3");
}

function hidemenubyli() {
    document.body.classList.toggle("stopscrolling");
    mobileTogglemenu.classList.remove("show-toggle-menu");
    document.getElementById("burger-bar1").classList.remove("hamburger-animation1");
    document.getElementById("burger-bar2").classList.remove("hamburger-animation2");
    document.getElementById("burger-bar3").classList.remove("hamburger-animation3");
}

const sections = document.querySelectorAll("section"),
      navLi = document.querySelectorAll(".navbar .navbar-tabs .navbar-tabs-ul li"),
      mobilenavLi = document.querySelectorAll(".mobiletogglemenu .mobile-navbar-tabs-ul li");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(sec => {
        let top = sec.offsetTop;
        if (pageYOffset >= top - 200) {
            current = sec.getAttribute("id");
        }
    });

    mobilenavLi.forEach(li => {
        li.classList.remove("activeThismobiletab");
        if (li.classList.contains(current)) li.classList.add("activeThismobiletab");
    });

    navLi.forEach(li => { 
        li.classList.remove("activeThistab");
        if (li.classList.contains(current)) li.classList.add("activeThistab");
    });
});

console.log(
    "%c  Developed by Sakthi Velan ",
    "background-image: linear-gradient(90deg,#8000ff,#6bc5f8); color: white;font-weight:900;font-size:1rem; padding:20px;"
);

// Back to Top Button
let mybutton = document.getElementById("backtotopbutton");

function scrollFunction() {
    (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400)
        ? (mybutton.style.display = "block")
        : (mybutton.style.display = "none");
}

function scrolltoTopfunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

window.onscroll = function () {
    scrollFunction();
};

// Disable right-click on images
document.addEventListener("contextmenu", function(e) {
    if (e.target.nodeName === "IMG") e.preventDefault();
}, false);

// Eye movement effect
let Pupils = document.getElementsByClassName("footer-pupil"),
    pupilsArr = Array.from(Pupils),
    pupilXCenterOffset= -10,
    pupilYCenterOffset= -7.5,
    pupilRangeX = 20,
    pupilRangeY = 15,
    mouseXStartPoint = 0,
    mouseXEndPoint = window.innerWidth,
    currentXPosition = 0,
    fracXValue = 0,
    mouseYEndPoint = window.innerHeight,
    currentYPosition = 0,
    fracYValue = 0,
    mouseXRange = mouseXEndPoint - mouseXStartPoint;

const mouseMove = e => {
    fracXValue = (currentXPosition = e.clientX - mouseXStartPoint) / mouseXRange;
    fracYValue = (currentYPosition = e.clientY) / mouseYEndPoint;

    let x = pupilXCenterOffset + fracXValue * pupilRangeX,
        y = pupilYCenterOffset + fracYValue * pupilRangeY;

    pupilsArr.forEach(p => {
        p.style.transform = `translate(${x}px, ${y}px)`;
    });
};

const windowResize = () => {
    mouseXEndPoint = window.innerWidth;
    mouseYEndPoint = window.innerHeight;
    mouseXRange = mouseXEndPoint - mouseXStartPoint;
};

window.addEventListener("mousemove", mouseMove);
window.addEventListener("resize", windowResize);

document.querySelector(".bulb").style.opacity = "0.35";
document.querySelector(".bulb").style.opacity = "0";

const cards = document.querySelectorAll('.cert-card');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("reveal");
    }
  });
}, { threshold: 0.25 });

cards.forEach(card => observer.observe(card));
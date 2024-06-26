const rootPath =
  window.location.protocol +
  "//" +
  window.location.host +
  window.location.pathname;

console.log(rootPath);
console.log(window.location.pathname);
const body = document.querySelector("body");

// REVEAL

const ratio = 0.5;
const options = {
  root: null,
  rootMargin: "0px",
  threshold: ratio,
};

const handleIntersect = function (entries, observer) {
  entries.forEach(function (entry) {
    if (entry.intersectionRatio > ratio) {
      entry.target.classList.add("reveal-visible");
      observer.unobserve(entry.target);
    }
  });
};

const observer = new IntersectionObserver(handleIntersect, options);
document.querySelectorAll(".reveal").forEach(function (r) {
  observer.observe(r);
});

const btnMenuBurger = document.querySelector(".lottieMenuBurger");
const menuBurgerPlayer = document.querySelector(".lottieMenuBurger_player");

btnMenuBurger.addEventListener("click", toggleMenu);
const main = document.querySelector("main");
main.addEventListener("click", () => {
  if (document.querySelector("nav").classList.contains("open")) {
    toggleMenu();
  }
});

const btnNav = document.querySelectorAll(".btnNav");
btnNav.forEach((btn) => {
  btn.addEventListener("click", toggleMenu);
});

let direction = 1;

function toggleMenu() {
  document.querySelector("nav").classList.toggle("open");
  menuBurgerPlayer.setDirection(direction);
  menuBurgerPlayer.play();
  direction = -direction;
}

const typewriter = document.querySelector("#typewriter");

tinyTypewriter(typewriter, {
  items: ["Bienvenue", "Loïc Turpin", "Développeur Web", "HTML, CSS, JS, C#"],
});

const videos = document.querySelectorAll(".videoBox");
videos.forEach((video) => {
  video.addEventListener("mouseenter", playVideo);
  video.addEventListener("mouseleave", pauseVideo);
});

let videoPlaying;

function playVideo(ev) {
  if (!ev.target.classList.contains("videoBoxOpen")) {
    let video = ev.target.firstElementChild.firstElementChild;
    videoPlaying = video;
    video.play();
    console.log(ev.target.parentElement.parentElement);
    // ev.target.parentElement.parentElement.style.overflowX = "visible";
  }
}

function pauseVideo(ev) {
  if (!ev.target.classList.contains("videoBoxOpen")) {
    let video = ev.target.firstElementChild.firstElementChild;
    video.pause();
    // ev.target.parentElement.parentElement.style.overflowX = "auto";
  }
}

const btnMute = document.querySelectorAll(".btnMute");
btnMute.forEach((btn) => {
  btn.addEventListener("click", toggleMute);
});

function toggleMute(ev) {
  console.log(ev.target);
  if (videoPlaying.muted) {
    videoPlaying.muted = false;
    ev.target.src = rootPath + "/img/son.svg";
  } else {
    videoPlaying.muted = true;
    ev.target.src = rootPath + "/img/muet.svg";
  }

  console.log(ev.target.src);
}

// const videosContainer = document.querySelectorAll(".videosContainer");

// videosContainer.forEach(container => {
//     container.addEventListener("wheel", scrollHorizontal);
// })

// function scrollHorizontal(ev) {
//     ev.preventDefault();
//     ev.target.parentElement.scrollLeft += ev.deltaY * 3;
// }

let boxvideo;
const btnInfosPlus = document.querySelectorAll(".btnInfosVideo");

btnInfosPlus.forEach((btn) => {
  btn.addEventListener("click", openInfos);
});

function openInfos(ev) {
  let target = ev.target;
  let btnMute = target.parentElement.getElementsByClassName("btnMute")[0];
  let videoBox = ev.target.parentElement.parentElement.parentElement;

  // if (window.location.hash != "") {
  //     window.location.hash = "";
  // };

  console.log(target);
  console.log(videoBox);

  btnMute.classList.add("hidden");
  videoBox.classList.replace("videoBox", "videoBoxOpen");
  videoBox.firstElementChild.lastElementChild.classList.add("hidden");
  videoBox.firstElementChild.children[1].classList.add("hidden");
  console.log(videoBox.firstElementChild.children[1]);
  videoBox.parentElement.classList.add("videoBoxContainer");
  videoBox.lastElementChild.classList.replace("videoInfos", "videoInfosOpen");
  videoBox
    .getElementsByClassName("videoInfosPlus")[0]
    .classList.remove("hidden");
  console.log(target.src);
  target.src = rootPath + "/img/croix.svg";
  videoPlaying.controls = true;
  target.removeEventListener("click", openInfos);
  target.addEventListener("click", closeInfos);
  body.style.overflowY = "hidden";
}

function closeInfos(ev) {
  let target = ev.target;
  let btnMute = target.parentElement.getElementsByClassName("btnMute")[0];
  let videoBox = ev.target.parentElement.parentElement.parentElement;

  btnMute.classList.remove("hidden");
  videoBox.classList.replace("videoBoxOpen", "videoBox");
  videoBox.firstElementChild.lastElementChild.classList.remove("hidden");
  videoBox.firstElementChild.children[1].classList.remove("hidden");
  videoBox.parentElement.classList.remove("videoBoxContainer");
  videoBox.lastElementChild.classList.replace("videoInfosOpen", "videoInfos");
  videoBox.getElementsByClassName("videoInfosPlus")[0].classList.add("hidden");
  target.src = rootPath + "/img/plusInfos.svg";
  videoPlaying.controls = false;
  target.removeEventListener("click", closeInfos);
  target.addEventListener("click", openInfos);
  body.style.overflowY = "initial";
}

const imgDesignContainer = document.querySelectorAll(".designImgContainer");

imgDesignContainer.forEach((container) => {
  container.addEventListener("click", openImgFullscreen);
});

function openImgFullscreen(ev) {
  console.log(ev.target);

  if (ev.target.classList.contains("designImgContainer")) {
    ev.target.classList.replace("designImgContainer", "fullScreen");
    body.style.overflowY = "hidden";
  } else {
    ev.target.classList.replace("fullScreen", "designImgContainer");
    body.style.overflowY = "initial";
  }
}

const btnAccordion = document.querySelectorAll(".btnAccordion");
btnAccordion.forEach((btn) => {
  btn.addEventListener("click", toggleAccordion);
});

function toggleAccordion(ev) {
  body
    .getElementsByClassName("accordionOpen")[0]
    .classList.remove("accordionOpen");

  let accordion = ev.target.parentElement.lastElementChild;
  accordion.classList.toggle("accordionOpen");
  console.log(accordion);
}

// On cache le loader après le chargement de la page
window.addEventListener("load", () => {
  let loader = document.querySelector(".loaderPage");
  loader.classList.add("invisible");
  setTimeout(() => {
    document.querySelector("#contenus").classList.remove("invisible");
  }, 1000);
});

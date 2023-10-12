// Globle variable for pointer 
var timeout;

// Loco motion scroll 
const scroll = new LocomotiveScroll({
  el: document.querySelector("#main-content"),
  smooth: true,
});

// Hero page animation 
function mainpageAni() {
  let tl = gsap.timeline();

  tl.from("#navbar", {
    y: "-10",
    opacity: 0,
    duration: 1.5,
    ease: Expo.easeInOut,
  })

    .to(".animationelem", {
      y: 0,
      duration: 2,
      delay: -1,
      ease: Expo.easeInOut,
      stagger: 0.2,
    })

    .from("#hero-footer", {
      y: "-10",
      duration: 2,
      opacity: 0,
      ease: Expo.easeInOut,
      delay: -1,
    });
}

// for skew of pointer circle 
function pointercircleSkew() {
  var xscale = 1;
  var yscale = 1;

  var xprev = 0;
  var yprev = 0;

  window.addEventListener("mousemove", function (val) {
    clearTimeout(timeout);

    xscale = gsap.utils.clamp(0.7, 1.3, val.clientX - xprev);
    yscale = gsap.utils.clamp(0.7, 1.3, val.clientY - yprev);

    xprev = val.clientX;
    yprev = val.clientY;

    pointerCircle(xscale, yscale);

    timeout = setTimeout(() => {
      document.querySelector(
        "#pointer-circle"
      ).style.transform = `translate(${val.clientX}px, ${val.clientY}px) scale(1, 1)`;
    }, 100);
  });
}

// cursor pointer circle 
let pointerCircle = (xscale, yscale) => {
  window.addEventListener("mousemove", (val) => {
    document.querySelector(
      "#pointer-circle"
    ).style.transform = `translate(${val.clientX}px, ${val.clientY}px) scale(${xscale}, ${yscale})`;
  });
};

// Image animation 
document.querySelectorAll(".context").forEach(function (context) {
    var rotate = 0;
    var Xdiff = 0;
  
    context.addEventListener("mousemove", function (val) {
      var contextDiff = val.clientY - context.getBoundingClientRect().top;
      var Xdiff = val.clientX - rotate;
      rotate = val.clientX;
      gsap.to(context.querySelector("img"), {
        opacity: 1,
        ease: Power2,
        top: contextDiff,
        left: val.clientX,
        rotate: gsap.utils.clamp(-20, 20, Xdiff),
      });
    });
  });
  
// Image animation - clear
document.querySelectorAll(".context").forEach(function (context) {
  context.addEventListener("mouseleave", function (val) {
    gsap.to(context.querySelector("img"), {
      opacity: 0,
      ease: Power2,
    });
  });
});




pointercircleSkew();
pointerCircle();
mainpageAni();

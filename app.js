let controller;
let slideScene;
let pageScene;
const burger = document.querySelector(".burger");
const logo = document.querySelector("#logo img");
const navLinks = Array.from(document.querySelector(".nav-links").children);
const people = document.querySelectorAll(".people");
const testimonies = document.querySelectorAll(".testimony");

function animateSlides() {
    //init controller
    controller = new ScrollMagic.Controller();
    //select some things
    const sliders = document.querySelectorAll(".slide");
    const nav = document.querySelector(".nav-header");
    //loop over each slide
    sliders.forEach((slide, index, slides) => {
        const revealImg = slide.querySelector(".reveal-img");
        const img = slide.querySelector("img");
        const revealText = slide.querySelector(".reveal-text");
        //GSAP
        const slideTl = gsap.timeline({ defaults: { duration: 1, ease: "power2.inOut" } });
        slideTl.fromTo(revealImg, { x: "0%" }, { x: "100%" });
        slideTl.fromTo(img, { scale: 2 }, { scale: 1 }, "-=1");
        slideTl.fromTo(revealText, { x: "0%" }, { x: "100%" }, "-=0.75");
        slideTl.fromTo(nav, { y: "-100%" }, { y: "0%" }, "-=0.5");
        //create scene
        slideScene = new ScrollMagic.Scene({
            triggerElement: slide,
            triggerHook: 0.25,
            reverse: false
        })
            .setTween(slideTl)
            .addTo(controller);
        //new anim
        const pageTl = gsap.timeline();
        let nextSlide = slides.length - 1 === index ? "end" : slides[index + 1];
        pageTl.fromTo(nextSlide, { y: "0%" }, { y: "50%" });
        pageTl.fromTo(slide, { opacity: 1, scale: 1, filter: "blur(0px)" }, { opacity: 0, scale: 0.5, filter: "blur(4px)" });
        pageTl.fromTo(nextSlide, { y: "50%" }, { y: "0%" }, "-=0.5");
        //new scene
        pageScene = new ScrollMagic.Scene({
            triggerElement: slide,
            duration: "100%",
            triggerHook: 0
        })
            .setPin(slide, { pushFollowers: false })
            .setTween(pageTl)
            .addTo(controller)
    });
}

function animateCards() {
    controller = new ScrollMagic.Controller();
    const sliders = document.querySelectorAll(".slide");
    const cardTl = gsap.timeline({ default: { duration: 1.5, ease: "power2.inOut" } });
    cardTl.staggerFromTo(".card", 1, { y: 500, opacity: 0 }, { y: 0, opacity: 1 }, 0.1);
    cardScene = new ScrollMagic.Scene({
        triggerElement: sliders[1],
        triggerHook: 0.25
    })
        .setTween(cardTl)
        .addTo(controller);
}

function animateDesignItems() {
    controller = new ScrollMagic.Controller();
    const sliders = document.querySelectorAll(".slide");
    const designTl = gsap.timeline({ default: { duration: 3, ease: "power2.inOut" } });
    designTl.staggerFromTo(".design-item", 1, { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1 }, 0.3);
    cardScene = new ScrollMagic.Scene({
        triggerElement: sliders[2],
        triggerHook: 0.25
    })
        .setTween(designTl)
        .addTo(controller);
}

function navToggle(e) {
    if (!e.target.classList.contains("active")) {
        e.target.classList.add("active");
        gsap.to(".nav-bar", 1, { clipPath: "circle(2500px at 100% -10%" });
        gsap.to(".line1", 0.5, { rotate: "45", y: 5, background: "white" });
        gsap.to(".line2", 0.5, { rotate: "-45", y: -5, background: "white" });
        gsap.to("#logo", 1, { color: "black" });
        logo.setAttribute("src", "./img/logo_blanc.svg");
        document.body.classList.add("hide");
    } else {
        e.target.classList.remove("active");
        gsap.to(".nav-bar", 1, { clipPath: "circle(50px at 100% -10%" });
        gsap.to(".line1", 0.5, { rotate: "0", y: 0, background: "linear-gradient(to left, var(--primary-color), var(--secondary-color))" });
        gsap.to(".line2", 0.5, { rotate: "0", y: 0, background: "linear-gradient(to left, var(--primary-color), var(--secondary-color))" });
        gsap.to("#logo", 1, { color: "white" });
        logo.setAttribute("src", "./img/logo.svg");
        document.body.classList.remove("hide");
    }
}

burger.addEventListener("click", navToggle);
navLinks.forEach(navLink => {
    navLink.addEventListener("click", function () {
        if (!burger.classList.contains("active")) {
            burger.classList.add("active");
            gsap.to(".nav-bar", 1, { clipPath: "circle(2500px at 100% -10%" });
            gsap.to(".line1", 0.5, { rotate: "45", y: 5, background: "white" });
            gsap.to(".line2", 0.5, { rotate: "-45", y: -5, background: "white" });
            gsap.to("#logo", 1, { color: "black" });
            logo.setAttribute("src", "./img/logo_blanc.svg");
            document.body.classList.add("hide");
        } else {
            burger.classList.remove("active");
            gsap.to(".nav-bar", 1, { clipPath: "circle(50px at 100% -10%" });
            gsap.to(".line1", 0.5, { rotate: "0", y: 0, background: "linear-gradient(to left, var(--primary-color), var(--secondary-color))" });
            gsap.to(".line2", 0.5, { rotate: "0", y: 0, background: "linear-gradient(to left, var(--primary-color), var(--secondary-color))" });
            gsap.to("#logo", 1, { color: "white" });
            logo.setAttribute("src", "./img/logo.svg");
            document.body.classList.remove("hide");
        }
    });
});

people.forEach(single => {
    single.addEventListener("click", function (e) {
        testimonies.forEach(testimony => {
            testimony.classList.remove("active");
        });
        people.forEach(single => {
            single.classList.remove("active");
        });
        e.target.classList.add("active");
        let selectedPeople = e.target.id;
        let testimonyToSelect = document.querySelector(`.testimony[data-testi="${selectedPeople}"]`);
        testimonyToSelect.classList.add("active");
    });
});

animateSlides();
animateCards();
animateDesignItems();
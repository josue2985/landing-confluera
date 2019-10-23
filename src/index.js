import "./assets/scss/global.scss";
import $ from 'jquery';
// import ScrollMagic from 'scrollmagic';
import { TweenMax, Power3, Expo } from "gsap";
import * as ScrollMagic from 'scrollmagic';

const controller = new ScrollMagic.Controller();
const long = document.getElementById('mevoy');

const myScene = new ScrollMagic.Scene({
    triggerElement: long,
    triggerHook: "onLeave"
})
//.setClassToggle('#features-approach', 'chao')
.setClassToggle('#intro-laptop', 'show')
.addTo(controller);


new IntersectionObserver(function(e, o) {
  if (e[0].intersectionRatio > 0) {
    document.documentElement.removeAttribute("class");
  } else {
    document.documentElement.setAttribute("class", "stuck");
  }
}).observe(document.querySelector(".trigger"));

$(document).ready(function () {
    var timeInterval, tabCount = 0, currnetIndex = 1;
    tabCount = $("ul#tabs").find("li a").length;
    var tabContentObj = $(".tabContent");
    changeTabIndex();
    timeInterval = setInterval(function () { changeTabIndex(); }, 4 * 1000);

    function changeTabIndex() {
        if (currnetIndex > tabCount) {
            currnetIndex = 1;
        }
        tabContentObj.hide();
        $("ul#tabs").find("li.selected").removeClass("selected");
        var currentAncorObj = $("ul#tabs").find("li a").eq(currnetIndex - 1);
        currentAncorObj.parent().addClass("selected");
        $(currentAncorObj.attr("href")).show();
        currnetIndex++;
    };

    $("#tabs li").mouseenter(function () {
        clearInterval(timeInterval);
    }).mouseleave(function () {
        timeInterval = setInterval(function () { changeTabIndex(); }, 4 * 100000);
    });

    $("#tabs li a").click(function () {
        tabContentObj.hide();
        $("ul#tabs").find("li.selected").removeClass("selected");
        var currentAncorObj = $(this);
        currnetIndex = $("ul#tabs").find("li a").index($(this)) + 1;
        currentAncorObj.parent().addClass("selected");
        $(currentAncorObj.attr("href")).show();
        currnetIndex++;

        //return false;
    });
});

var TxtRotate = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
  };
  
TxtRotate.prototype.tick = function() {
var i = this.loopNum % this.toRotate.length;
var fullTxt = this.toRotate[i];

if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
} else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
}

this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

var that = this;
var delta = 300 - Math.random() * 100;

if (this.isDeleting) { delta /= 2; }

if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
} else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
}

setTimeout(function() {
    that.tick();
}, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('txt-rotate');
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-rotate');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
        new TxtRotate(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
    document.body.appendChild(css);

    document.getElementById("intro-laptop").addEventListener("ended",myHandler,false);
    function myHandler(e) {
        // document.getElementById("intro-section").classList.add("show");
        TweenMax.to(".intro-laptop", 1, {opacity: 0.5, ease: Expo.easeOut});
        TweenMax.to(".intro-title-line1", 0.8, {opacity: 1, y:0, ease: Expo.easeOut});
        TweenMax.to(".intro-title-line2", 1.5, {opacity: 1, y:0, delay:0.3, ease: Expo.easeOut});
    };
};



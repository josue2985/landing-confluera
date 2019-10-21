import "./assets/scss/global.scss";
import ScrollMagic from 'scrollmagic';
import $ from 'jquery';
import { TweenMax, Power3, Expo } from "gsap";

// TweenMax.to("h1", 1, { x:100 });

window.onload = function() {
    document.getElementById("intro-laptop").addEventListener("ended",myHandler,false);
    function myHandler(e) {
        // document.getElementById("intro-section").classList.add("show");
        TweenMax.to(".intro-laptop", 1, {opacity: 0.5, ease: Expo.easeOut});
        TweenMax.to(".intro-title-line1", 0.8, {opacity: 1, y:0, ease: Expo.easeOut});
        TweenMax.to(".intro-title-line2", 1.5, {opacity: 1, y:0, delay:0.3, ease: Expo.easeOut});
    };
}

// $(document).ready(function () {
//         var introVideo = document.getElementById("intro-laptop");
//         document.getElementById("intro-laptop").play();
// });




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

//$(function() {

    // cache a reference to the tabs
    //var tabs = $('#myTab li a');

     //$( "#myTab li a" ).first().addClass( "active show" );

    //on click to tab, turn it on, and turn previously-on tab off
    // tabs.click(function() { $(this).addClass('active show').siblings('.show').removeClass('active show'); });

    //auto-rotate every 5 seconds
    // setInterval(function() {

    //         //get currently-on tab
    //     var onTab = tabs.filter('.active');

    //         //click either next tab, if exists, else first one
    //     var nextTab = onTab.index() < tabs.length-1 ? onTab.next() : tabs.first();
    //     nextTab.click();
    // }, 5000);
//});
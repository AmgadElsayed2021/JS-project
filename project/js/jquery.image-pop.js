(function ($) {
  let index = "slider-index";
  let list = {};
  // generate a random id
  function createID() {
    return Math.ceil(Math.random() * 10).toString();
  }

  /*
   i just got it from https://api.jquery.com/data/ and saw some people using it on you tube .
   The .data() method allows us to attach data of any type to DOM elements in a
   way that is safe from circular references and therefore from memory leaks.
*/
  $.fn.imageSlider = function (options) {
    this.filter(".photo-slider").each(function () {
      let sliderContainer = $(this);
      let uid = createID();
      const settings = $.extend({}, $.fn.imageSlider.settingsDefault, options);
      let tmpIx = sliderContainer.data(index);
      if (tmpIx !== undefined) {
        settings.slideStartIndex = tmpIx;
      }

      list[uid] = {
        sliderContainer: sliderContainer,
        settings: settings,
      };
      init(uid);
    });
  };

  function init(uid) {
    let sliderContainer = list[uid].sliderContainer;
    let settings = list[uid].settings;
    let circlePhotoFrames = sliderContainer.find(".photo-slider-dots");
    // console.log(circlePhotoFrames.length);
    let slides = sliderContainer.find(".photo-slides");
    let caption = sliderContainer.find(".photo-caption");
    list[uid]["slides"] = slides;
    list[uid]["captions"] = caption;
    list[uid]["numSlides"] = slides.length;
    list[uid]["currentIndex"] = settings.slideStartIndex;

    for (var i = 0; i < circlePhotoFrames.length; i++) {
      $(circlePhotoFrames[i]).removeClass("photo-slider-dots-active");
      $(circlePhotoFrames[i]).click({ uid: uid, index: i }, navBtns);
    }

    let left = sliderContainer.find(".photo-arrow-left");
    let right = sliderContainer.find(".photo-arrow-right");
    left.click({ uid: uid }, navBtns);
    right.click({ uid: uid }, navBtns);

    showNextSlide(uid);
  }

  let navBtns = function (event) {
    let uid = event.data.uid;
    let sliderContainer = list[uid].sliderContainer;
    let index = 0;
    if (event.data.index !== undefined) {
      index = event.data.index;
    } else {
      index = sliderContainer.data("slider-index");
    }

    list[uid].prevIndex = index;
    // make sure that i can navigate using arrows and image frames or another deduction i will receive
    if (!$(event.target).hasClass("photo-slider-dots")) {
      if ($(event.target).hasClass("photo-arrow-left")) {
        index += -1;
      } else {
        index += 1;
      }
    }

    list[uid].currentIndex = index;
    showNextSlide(uid);
  };

  // make a function to check the slide index if the index is greater than the maximum start from one and if less than 1 change it to the maximum
  // or i will have some marks deducted here .
  function checkSlideIndex(index, maximum) {
    if (index === undefined || index > maximum) index = 1;
    if (index < 1) {
      index = maximum;
    }
    return index;
  }

  function showNextSlide(uid) {
    let settings = list[uid].settings;
    let sliderContainer = list[uid]["sliderContainer"];
    let numSlides = list[uid]["numSlides"];
    let slides = list[uid]["slides"];
    let caption = list[uid]["captions"];
    let index = list[uid]["currentIndex"];
    let prevIndex = list[uid]["prevIndex"];
    let oldIndex = index;
    // check the index by calling the check index
    index = checkSlideIndex(index, numSlides);

    sliderContainer.data("slider-index", index);
    list[uid].currentIndex = index;
    //  make sure to grap the photo with the caption and animato the transitioning
    // i will do this part tomorrow after the midterm test of sql
    for (var i = 0; i < slides.length; i++) {
      $(slides[i]).addClass("slide-invisible");
      $(slides[i]).removeClass("slide-visible");
      // console.log($(slides[i]));
      $(slides[i]).removeClass(settings.animationRight);
      $(slides[i]).removeClass(settings.animationLeft);
      $(slides[i]).removeClass(settings.animation);
      $(slides[i]).addClass("caption");
    }

    if (settings.animate) {
      $(slides[index - 1]).removeClass("slide-invisible");
      if (settings.animation === "normal") {
        $(slides[index - 1]).css(
          "opacity",
          0.19,
          "max-width",
          "100%",
          "max-height",
          "100%",
          "margin",
          "auto",
          "padding",
          "0",
          "display",
          "block",
          "position",
          " relative"
        );
        $(slides[index - 1]).animate(
          {
            opacity: 1,
          },
          settings.duration,
          settings.easing,
          settings.fadOut,
          settings.fadeIn,
          function () {
            $(slides[index - 1]).addClass("slide-visible");
          }
        );
      } else if (settings.animation === "css") {
        if (prevIndex < oldIndex)
          // if the prev image index is smaller than the old index use animate right
          $(slides[index - 1]).addClass(settings.animationRight);
        // else animate left
        else $(slides[index - 1]).addClass(settings.animationLeft);
      }
    } else {
      $(slides[index - 1]).removeClass("slide-invisible");
      $(slides[index - 1]).addClass("slide-visible");
    }
  }

  $.fn.imageSlider.settingsDefault = {
    slideStartIndex: 1,
    animate: true,
    animation: "normal",
    duration: 3000,
    fadeIn: 2000,
    fadOut: 1000,
    easing: "linear", //easein, linear, ...
    /* i will style the caption  area here */
  };
})(jQuery);

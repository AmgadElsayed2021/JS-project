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
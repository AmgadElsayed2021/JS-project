(function ($) {
  $.fn.imagePopup = function (options) {
    let settings = $.extend(
      {
        overlay: "rgba(0,0,0,0.5)",
        closeButton: {
          src: null,
          width: "30px",
          height: "30px",
        },

        imageBorder: "5px solid #ffffff",
        borderRadius: "5px",
        imageWidth: "500px",
        imageHeight: "400px",
        imageCaption: {
          exist: true,
          color: "#fffffff",
          fontSize: "20px",
        },
        RightNavBtn: {
          src: null,
          width: "50px",
          height: "50px",
        },
        LeftNavBtn: {
          src: null,
          width: "50px",
          height: "50px",
        },
        open: null,
        close: null,
        right: null,
        left: null,
      },
      options
    );
    /**
     * Iterating through each image of gallery
     */
    return this.each(function () {
      // declaring new element variable
      let $overLay,
        $closeButton,
        $image,
        $imageCaption,
        $RightNavBtn,
        $LeftNavBtn;
      //   call the functions

      setOverLayProperties();
      setCloseBtnProperties();
      setImageProperties();

      $(this)
        .find("a")
        .on("click", function (event) {
          event.preventDefault();
          const imageSrc = $(this).children("img").attr("src");
          $image.attr("src", imageSrc);
          if (settings.imageCaption.exist == true) {
            const caption = $(this).children("img").attr("alt");
            $imageCaption.text(caption);
          }
          if ($.isFunction(settings.open)) {
            settings.open.call(this);
          }
          $overLay.css({ opacity: 0.1 }).show().animate({ opacity: 1 });
        });

      function setImageProperties() {
        setLeftNavBtnProperties();

        $image = $("<img>");
        $image.css({
          width: settings.imageWidth,
          height: settings.imageHeight,
          border: settings.imageBorder,
          "border-radius": settings.borderRadius,
        });
        $overLay.append($image);
        setRightNavBtnProperties();

        if (settings.imageCaption.exist == true) {
          $imageCaption = $("<p></p>");
          $imageCaption.css({
            color: settings.imageCaption.color,
            "font-size": settings.imageCaption.fontSize,
          });
          $overLay.append($imageCaption);
        }
      }

      function setOverLayProperties() {
        $overLay = $("<div></div>");
        $overLay.css({
          background: settings.overlay,
          position: "absolute",
          top: "0px",
          left: "0px",
          display: "none",
          "text-align": "center",
          width: "100%",
          height: "100%",
          "padding-top": "5%",
        });
        $("body").append($overLay);
      }

      function setCloseBtnProperties() {
        const prop = {
          color: "white",
          cursor: "pointer",
          "font-size": "20px",
          width: settings.closeButton.width,
          height: settings.closeButton.height,
          position: "absolute",
          top: "5px",
          right: "5px",
          border: "0px",
          "z-index": "1",
        };
        if (settings.closeButton.src) {
          $closeButton = $("<img>");
          $closeButton.attr("src", settings.closeButton.src);
        } else {
          $closeButton = $("<span>X</span>");
        }
        $closeButton.css(prop);
        $overLay.append($closeButton);
      }
      $closeButton.click(function () {
        if ($.isFunction(settings.close)) {
          settings.close.call(this);
        }
        $overLay.animate({ opacity: 0.1 }, function () {
          $overLay.hide();
        });
      });
      function setRightNavBtnProperties() {
        const prop = {
          color: "white",
          cursor: "pointer",
          "font-size": "20px",
          width: settings.RightNavBtn.width,
          height: settings.RightNavBtn.height,
          position: "center",
          top: "5px",
          right: "5px",
          border: "0px",
          "z-index": "1",
        };
        if (settings.RightNavBtn.src) {
          $RightNavBtn = $("<img>");
          $RightNavBtn.attr("src", settings.RightNavBtn.src);
        } else {
          $RightNavBtn = $("<span>></span>");
        }
        $RightNavBtn.css(prop);
        $overLay.append($RightNavBtn);
      }
      $RightNavBtn.click(function () {
        if ($.isFunction(settings.right)) {
          settings.right.call(this);
        }
        $overLay.animate({ opacity: 0.1 }, function () {
          $overLay.hide();
        });
      });
      function setLeftNavBtnProperties() {
        const prop = {
          color: "white",
          cursor: "pointer",
          "font-size": "20px",
          width: settings.LeftNavBtn.width,
          height: settings.LeftNavBtn.height,
          position: "center",
          top: "5px",
          right: "5px",
          border: "0px",
          "z-index": "1",
        };
        if (settings.LeftNavBtn.src) {
          $LeftNavBtn = $("<img>");
          $LeftNavBtn.attr("src", settings.LeftNavBtn.src);
        } else {
          $LeftNavBtn = $("<span><</span>");
        }
        $LeftNavBtn.css(prop);
        $overLay.append($LeftNavBtn);
      }
      $LeftNavBtn.click(function () {
        // event.preventDefault();
        const imageSrc = $(this).children("img").prev().attr("src");
        const next = imageSrc.next();
        console.log(next.attr("alt"));
        $image.attr("src", imageSrc);
        if (settings.imageCaption.exist == true) {
          const caption = $(this).children("img").prev().attr("alt");
          $imageCaption.text(caption);
        }
        if ($.isFunction(settings.open)) {
          settings.open.call(this);
        }
        $overLay.css({ opacity: 0.1 }).show().animate({ opacity: 1 });
      });
    });
  };
})(jQuery);

$("#images").imagePopup({
  overlay: "rgba(0,100,0,0.5)",
  closeButton: {
    src: "images/close.png",
    width: "40px",
    height: "40px",
  },
  LeftNavBtn: {
    src: "images/left.png",
    width: "120px",
    height: "120px",
  },
  RightNavBtn: {
    src: "images/right.png",
    width: "120px",
    height: "120px",
  },
  imageBorder: "15px solid #554455",
  borderRadius: "10px",
  imageWidth: "500px",
  imageHeight: "400px",
  imageCaption: {
    exist: true,
    color: "#883319",
    fontSize: "80px",
  },
  open: function () {
    console.log("opened");
  },
  close: function () {
    console.log("closed");
  },
});

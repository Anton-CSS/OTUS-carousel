import "./scss/style.scss";
import Carousel from "./js/carousel";

const carousel = new Carousel({
  main: "div",
  wrap: "ul",
  slideToShow: 4,
  infinity: true,
  responsive: [
    {
      breakpoint: 1024,
      slideToShow: 3,
    },
    {
      breakpoint: 768,
      slideToShow: 2,
    },
    {
      breakpoint: 576,
      slideToShow: 1,
    },
  ],
});

carousel.init();

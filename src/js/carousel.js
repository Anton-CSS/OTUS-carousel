export default class Carousel {
  constructor({
    main,
    wrap,
    next,
    previous,
    position = 0,
    slideToShow = 3,
    infinity = false,
    responsive = [],
  }) {
    this.main = document.querySelector(main);
    if (!main || !wrap) {
      console.wrap(
        "slider-carousel: Необходимо передать 2 свойства main b wrap"
      );
    }
    this.main = document.querySelector(main);
    this.wrap = document.querySelector(wrap);
    this.next = document.querySelector(next);
    this.previous = document.querySelector(previous);
    this.slideToShow = slideToShow;
    this.sliders = [...this.wrap.children];
    this.responsive = responsive;
    this.options = {
      position,
      widthSlide: Math.floor(100 / this.slideToShow),
      infinity,
      maxPosition: this.sliders.length - this.slideToShow,
    };
  }

  addClass() {
    this.main.classList.add("slider-carousel");
    this.wrap.classList.add("slider-carousel__wrap");
    this.sliders.forEach((item) => item.classList.add("slider-carousel__item"));
  }

  addStyle() {
    let style = document.getElementById("style");
    if (!style) {
      style = document.createElement("style");
      style.id = "style";
    }
    style.textContent = `
         .slider-carousel{
           position:relative;
           overflow: hidden !Important;
         }
        .slider-carousel__wrap{
         display: flex !Important;
         transition: transform 0.5s linear !Important;
         will-change: transform !Important;
         }

        .slider-carousel__item{
         display: flex;
         align-items: center;
         justify-content: center;
         margin: 0 auto !Important;
         flex: 0 0 ${this.options.widthSlide}% !Important;
         }
         .slider__prev, .slider__next{
         position: absolute;
         top: 50%;
         z-index:3;
         transform: translateY(-50%);
         border: 20px solid transparent;
         background: transparent;
         outline: none;
         cursor: pointer;
         }
         
         .slider__next{
         right: 5%;
         border-left-color: #19b5fe;
         }
         
         .slider__prev{
         left: 5%;
         border-right-color: #19b5fe;
         }
        `;
    document.head.append(style);
  }

  controlSlider() {
    this.previous.addEventListener("click", this.prevSlider.bind(this));
    this.next.addEventListener("click", this.nextSlider.bind(this));
  }

  prevSlider() {
    if (this.options.infinity || this.options.position > 0) {
      --this.options.position;
      if (this.options.position < 0) {
        this.options.position = this.options.maxPosition;
      }
      this.wrap.style.transform = `translateX(-${
        this.options.position * this.options.widthSlide
      }%)`;
    }
  }

  nextSlider() {
    if (
      this.options.infinity ||
      this.options.position < this.options.maxPosition
    ) {
      ++this.options.position;
      console.log(this.options.position);
      if (this.options.position > this.options.maxPosition) {
        this.options.position = 0;
      }
      this.wrap.style.transform = `translateX(-${
        this.options.position * this.options.widthSlide
      }%)`;
    }
  }

  addArrow() {
    this.previous = document.createElement("button");
    this.next = document.createElement("button");
    this.previous.className = "slider__prev";
    this.next.className = "slider__next";
    this.main.append(this.previous);
    this.main.append(this.next);
  }

  responsiveInit() {
    const sliderToShowDefault = this.slideToShow;
    const allResponsive = this.responsive.map((item) => item.breakpoint);
    const MaxResponsive = Math.max(...allResponsive);
    const checkResponsive = () => {
      const widthWindow = document.documentElement.clientWidth;
      if (widthWindow < MaxResponsive) {
        for (let i = 0; i < allResponsive.length; i++) {
          if (widthWindow < allResponsive[i]) {
            this.slideToShow = this.responsive[i].slideToShow;
            this.options.maxPosition = this.sliders.length - this.slideToShow;
            this.options.widthSlide = Math.floor(100 / this.slideToShow);
            this.addStyle();
            console.log(this.slideToShow);
          }
        }
      } else {
        this.slideToShow = sliderToShowDefault;
        this.options.maxPosition = this.sliders.length - this.slideToShow;
        this.options.widthSlide = Math.floor(100 / this.slideToShow);
        this.addStyle();
      }
    };
    checkResponsive();
    window.addEventListener("resize", checkResponsive);
  }

  init() {
    if (this.previous && this.next) {
      this.controlSlider();
    } else {
      this.addArrow();
      this.controlSlider();
    }
    this.addStyle();
    this.addClass();
    if (this.responsive) this.responsiveInit();
  }
}

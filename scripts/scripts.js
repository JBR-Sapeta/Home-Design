//----------------------------  SLIDER ----------------------------//

const allSlides = document.getElementsByClassName("slider__item");

const totalSlides = allSlides.length;

const goToSlide = (currentSlide, slides) => {
  for (let slide of slides) {
    slide.classList.remove("slider__item--active");
  }
  slides[currentSlide].classList.add("slider__item--active");
};

const initSlide = (slideNumbers, slides) => {
  let slideCounter = 0;

  setInterval(function () {
    let currentSlide = slideCounter % slideNumbers;
    goToSlide(currentSlide, slides);
    slideCounter++;
  }, 10000);
};

initSlide(totalSlides, allSlides);

//----------------------------  MOBILE NAVIGATION ----------------------------//

const navButton = document.querySelector(".mobile-navigation__button");
const headerContainer = document.querySelector(".header");
const navigationList = document.querySelector(".navigation");

let navIsOpen = false;

navButton.addEventListener("click", function (event) {
  navIsOpen = !navIsOpen;
  if (navIsOpen) {
    document.querySelector("body").style.overflow = "hidden";
  } else {
    document.querySelector("body").style.overflow = "scroll";
  }
  headerContainer.classList.toggle("header--open");
});

navigationList.addEventListener("click", function (event) {
  if (event.target.classList.contains("navigation__link")) {
    headerContainer.classList.remove("header--open");
    document.querySelector("body").style.overflow = "scroll";
    navIsOpen = false;
  }
});

//-------------------------  STICKY NAVIGATION -------------------------//

const featuresSection = document.querySelector(".home");
const headerHeight = headerContainer.getBoundingClientRect().height;
const optionsNav = {
  root: null,
  threshold: 0,
  rootMargin: `-${headerHeight}px`,
};

const stickyNavigation = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    headerContainer.classList.add("sticky");
  } else {
    headerContainer.classList.remove("sticky");
  }
};

const headerObserver = new IntersectionObserver(stickyNavigation, optionsNav);

headerObserver.observe(featuresSection);

//----------------------------  Gallery  ----------------------------//

const gallery = document.querySelector(".gallery__container");
const galleryImages = document.querySelectorAll(".gallery__image");
const galleryViev = document.querySelector(".gallery__view");
const galleryShadow = document.querySelector(".gallery__shadow");
const galleryVievImage = document.querySelector(".gallery__view-img");
const galleryExitBtn = document.querySelector(".btn--exit");

galleryImages.forEach((galleryImage, index) => {
  galleryImage.setAttribute("index", `${index}`);
});

let currentImageIndex = 0;
const gallerySize = galleryImages.length;

gallery.addEventListener("click", function (even) {
  even.preventDefault();
  document.querySelector("body").style.overflow = "hidden";
  headerContainer.classList.remove("sticky");

  if (even.target.classList.contains("gallery__image")) {
    const imageSrc = even.target.src;
    galleryVievImage.src = imageSrc;
    galleryShadow.classList.add("gallery--active");
    galleryViev.classList.add("gallery--active");
    const index = even.target.getAttribute("index");
    currentImageIndex = +index;
  }
});

galleryExitBtn.addEventListener("click", function (even) {
  even.preventDefault();
  galleryShadow.classList.remove("gallery--active");
  galleryViev.classList.remove("gallery--active");
  document.querySelector("body").style.overflow = "scroll";
  headerContainer.classList.add("sticky");
});

const nextImage = () => {
  if (currentImageIndex === gallerySize - 1) {
    currentImageIndex = 0;
  } else {
    currentImageIndex++;
  }
  const imageSrc = galleryImages[currentImageIndex].src;
  galleryVievImage.src = imageSrc;
};

const prevImage = () => {
  if (currentImageIndex === 0) {
    currentImageIndex = gallerySize - 1;
  } else {
    currentImageIndex--;
  }
  const imageSrc = galleryImages[currentImageIndex].src;
  galleryVievImage.src = imageSrc;
};

const galleryPrevBtn = document.querySelector(".btn--prev");
const galleryNextBtn = document.querySelector(".btn--next");

galleryPrevBtn.addEventListener("click", prevImage);
galleryNextBtn.addEventListener("click", nextImage);

//----------------------------  Footer - year  ----------------------------//

const yearElement = document.querySelector(".year");

const currentYear =  new Date().getFullYear();
yearElement.textContent = currentYear;

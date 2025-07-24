// SLIDER
const swiper = new Swiper('.swiper', {
  direction: 'horizontal',
  slidesPerView: 4,
  slidesPerGroup: 3,
  spaceBetween: 25,
  speed: 800,
  // centeredSlides: true,

  rewind: true,

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  breakpoints: {
    320: {
      slidesPerView: 1,
    },

    500: {
      slidesPerView: 2,
    },

    640: {
      slidesPerView: 2,
    },

    768: {
      slidesPerView: 3,
    },

    1115: {
      slidesPerView: 4,
    },
  },
});



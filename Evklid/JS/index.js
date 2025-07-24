  // BURGER-MENU
  window.addEventListener('DOMContentLoaded', function() {
      document.querySelector('#burger').addEventListener('click', function() {
          document.querySelector('#nav_panel').classList.add('header__nav-panel__active')
      })
  });
  window.addEventListener('DOMContentLoaded', function() {
      document.querySelector('.header__nav-panel__close-button').addEventListener('click', function() {
          document.querySelector('#nav_panel').classList.remove('header__nav-panel__active')
      })
  });

  // SEARCH - FORM
  document.querySelector(".header__search-toggle").addEventListener("click", function() {
      document.querySelector(".header__search-form").classList.add('nav__form-active');
      this.classList.add("active");
  })

  document.querySelector(".header__search-form__close-button").addEventListener("click", function() {
      document.querySelector(".header__search-form").classList.remove('nav__form-active');
      this.classList.remove("active");
  })

  window.addEventListener('DOMContentLoaded', function() {
      document.querySelector('#search_x').addEventListener('click', function() {
          document.querySelector(".header__search-toggle").classList.remove("active")
      })
  });


  window.addEventListener('DOMContentLoaded', function() {
      document.querySelector('#search').addEventListener('click', function() {
          document.querySelector('#nav_form').classList.add('nav__form-active')
      })
  });
  window.addEventListener('DOMContentLoaded', function() {
      document.querySelector('#search_x').addEventListener('click', function() {
          document.querySelector('#nav_form').classList.remove('nav__form-active')
      })
  });


  // Swiper HERO-BLOCK
  document.addEventListener('DOMContentLoaded', function() {
      const swiper = new Swiper('.swiper-container', {
          speed: 1000,
          loop: true,
          pagination: {
              el: '.swiper-pagination',
              clickable: true
          },

          a11y: {
              enabled: true,
              prevSlideMessage: 'предыдущий слайд',
              nextSlideMessage: 'следующий слайд',
              containerMessage: 'Слайдер'
          },
      });
  });

  // Tabs STEPS-BLOCK
  document.addEventListener("DOMContentLoaded", function() {
      document.querySelectorAll('.tabs_btn').forEach(function(tabsBtn) {
          tabsBtn.addEventListener('click', function(Event) {
              const path = Event.currentTarget.dataset.path
              document.querySelectorAll('.tabs_btn').forEach(item => item.classList.remove("btn-active"))
              document.querySelectorAll('.tabs_content').forEach(function(tabsContent) {
                  tabsContent.classList.remove('tabs_content_active')
              })
              tabsBtn.classList.add("btn-active");
              document.querySelector(`[data-target="${path}"]`).classList.add('tabs_content_active')
          });
      });
  });

  // Accordeon FAQ-BLOCK
  $(function() {
      $("#accordion").accordion({
          icons: false,
          heightStyle: "content",
          collapsible: true,
          active: false
      });
  });

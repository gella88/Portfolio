// Get the modal
function openModal(modalId) {
  document.getElementById(modalId).style.display = "block";
  // Disable scrolling on the body
  document.body.classList.add('modal-open'); // Use a class for easier media query control
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = "none";
  // Enable scrolling on the body
  document.body.classList.remove('modal-open');
}

// Close the modal if the user clicks outside of it
window.onclick = function (event) {
  if (event.target.classList.contains('modal')) {  // Using classList
    const modals = document.getElementsByClassName('modal');
    for (let i = 0; i < modals.length; i++) {
      modals[i].style.display = "none";
    }
    // Enable scrolling on the body when closing via outside click
    document.body.classList.remove('modal-open');
  }
}

// TOOGLE ACCORDION
        const accordionButtons = document.querySelectorAll(".accordion__button");

        accordionButtons.forEach(button => {
            button.addEventListener("click", function () {
                // Закрываем все открытые элементы
                accordionButtons.forEach(otherButton => {
                    if (otherButton !== this) {
                        otherButton.classList.remove("accordion__button--active");
                        let otherContent = otherButton.nextElementSibling;
                        otherContent.style.maxHeight = null;
                    }
                });

                // Переключаем текущий элемент
                this.classList.toggle("accordion__button--active");
                let content = this.nextElementSibling;
                
                if (content.style.maxHeight) {
                    content.style.maxHeight = null;
                } else {
                    content.style.maxHeight = content.scrollHeight + "px";
                }
            });
        });

        // Дополнительное исправление для мобильных устройств
function fixAccordionMobile() {
    if (window.innerWidth <= 1200) {
        const contents = document.querySelectorAll(".accordion__content");
        contents.forEach(content => {
            if (content.style.maxHeight) {
                content.style.maxHeight = "none";
            }
        });
    }
}

// Вызываем при загрузке и изменении размера окна
window.addEventListener('load', fixAccordionMobile);
window.addEventListener('resize', fixAccordionMobile);

// Burger menu
const burgerMenu = document.querySelector('.burger');
const menu = document.querySelector('.header__menu');

burgerMenu.addEventListener('click', () => {
  burgerMenu.classList.toggle('change');
  menu.classList.toggle('open');
});

document.addEventListener('click', (event) => {
  if (!burgerMenu.contains(event.target) && !menu.contains(event.target) && menu.classList.contains('open')) {
    burgerMenu.classList.remove('change');
    menu.classList.remove('open');
  }
});


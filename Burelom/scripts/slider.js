document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const slider = document.querySelector('.slider');
    const slideGroupsContainer = document.querySelector('.slider');
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');
    const lightbox = document.querySelector('.lightbox');
    const lightboxContent = document.querySelector('.lightbox-content');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    const lightboxCounter = document.querySelector('.lightbox-counter');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    let currentGroup = 0;
    let currentIndex = 0;
    let allMediaItems = Array.from(galleryItems);
    let filteredMediaItems = [];
    let autoSlideInterval;
    let currentFilter = 'all';
    let itemsPerGroup = 4;

    // Определяем количество элементов в группе в зависимости от ширины экрана
    function getItemsPerGroup() {
        const width = window.innerWidth;
        if (width <= 600) return 1;
        if (width <= 768) return 2;
        if (width <= 1200) return 3;
        return 4;
    }

    // Функция создания групп слайдов
    function createSlideGroups(items) {
        // Очищаем контейнер слайдера
        slider.innerHTML = '';
        
        itemsPerGroup = getItemsPerGroup();
        
        // Создаем группы
        for (let i = 0; i < items.length; i += itemsPerGroup) {
            const group = document.createElement('div');
            group.className = 'slide-group';
            
            // Добавляем элементы в группу
            const groupItems = items.slice(i, i + itemsPerGroup);
            groupItems.forEach(item => {
                group.appendChild(item.cloneNode(true));
            });
            
            slider.appendChild(group);
        }
        
        // Обновляем обработчики событий
        updateEventListeners();
        // Переходим к первой группе
        goToGroup(0);
    }

    // Функция фильтрации
    function filterGallery(filterType) {
        currentFilter = filterType;
        
        // Обновляем активную кнопку
        filterBtns.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-filter') === filterType);
        });

        // Фильтруем элементы
        filteredMediaItems = allMediaItems.filter(item => {
            const itemType = item.getAttribute('data-type');
            return filterType === 'all' || itemType === filterType;
        });

        // Создаем группы слайдов
        createSlideGroups(filteredMediaItems);
    }

    // Обновление обработчиков событий после фильтрации
    function updateEventListeners() {
        const newGalleryItems = document.querySelectorAll('.gallery-item');
        
        newGalleryItems.forEach((item, index) => {
            item.addEventListener('click', function() {
                currentIndex = Array.from(newGalleryItems).indexOf(this);
                openLightbox(currentIndex);
            });
        });
    }

        // Функция перехода к группе
    function goToGroup(index) {
        const slideGroups = document.querySelectorAll('.slide-group');
        if (slideGroups.length === 0) return;
        
        currentGroup = (index + slideGroups.length) % slideGroups.length;
        slider.style.transform = `translateX(-${currentGroup * 100}%)`;
        
    }

    // Обработчики для кнопок фильтров
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filterType = this.getAttribute('data-filter');
            filterGallery(filterType);
        });
    });
    
    // Навигация стрелками
    nextArrow.addEventListener('click', () => {
        const slideGroups = document.querySelectorAll('.slide-group');
        goToGroup(currentGroup + 1);
    });
    
    prevArrow.addEventListener('click', () => {
        const slideGroups = document.querySelectorAll('.slide-group');
        goToGroup(currentGroup - 1);
    });
    
    // Автопрокрутка с паузой при наведении
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            const slideGroups = document.querySelectorAll('.slide-group');
            goToGroup(currentGroup + 1);
        }, 5000);
    }
    
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }
    
    slider.addEventListener('mouseenter', stopAutoSlide);
    slider.addEventListener('mouseleave', startAutoSlide);
    
    // Обработчик изменения размера окна
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            filterGallery(currentFilter);
        }, 250);
    });

    // Открытие лайтбокса
    function openLightbox(index) {
        if (filteredMediaItems.length === 0) return;

        const item = filteredMediaItems[index];
        const isVideo = item.getAttribute('data-type') === 'video';
        const kinescopeId = item.getAttribute('data-kinescope-id');
        
        // Очищаем предыдущий контент (кроме навигации и закрытия)
        const elementsToKeep = ['lightbox-close', 'lightbox-nav', 'lightbox-counter'];
        const children = Array.from(lightboxContent.children);
        
        children.forEach(child => {
            if (!elementsToKeep.some(className => child.classList.contains(className))) {
                child.remove();
            }
        });
        
        // Создаем медиа-элемент
        let mediaElement;
        if (isVideo && kinescopeId) {
            mediaElement = document.createElement('iframe');
            mediaElement.className = 'kinescope-iframe';
            mediaElement.src = `https://kinescope.io/embed/${kinescopeId}?autoplay=1&muted=0&loop=0&autopause=1`;
            mediaElement.allow = 'autoplay; fullscreen; picture-in-picture; encrypted-media; gyroscope; accelerometer; clipboard-write; screen-wake-lock;';
            mediaElement.allowFullscreen = true;
            // iframe.setAttribute('allow', 'fullscreen');
            mediaElement.setAttribute('frameborder', '0');
        } else {
            mediaElement = document.createElement('img');
            const imgSrc = item.querySelector('img').src;
            mediaElement.src = imgSrc;
            mediaElement.alt = item.querySelector('img').alt;
        }
        
        // Вставляем медиа-элемент перед кнопкой закрытия
        lightboxContent.insertBefore(mediaElement, lightboxClose);
        
        // Обновляем счетчик
        lightboxCounter.textContent = `${index + 1} / ${filteredMediaItems.length}`;
        
        // Показываем лайтбокс
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Закрытие лайтбокса
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        // Останавливаем видео
        const iframe = lightboxContent.querySelector('iframe');
        if (iframe) {
            iframe.src = '';
        }
    }
    
    // Навигация в лайтбоксе
    lightboxPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        navigateLightbox(-1);
    });
    
    lightboxNext.addEventListener('click', (e) => {
        e.stopPropagation();
        navigateLightbox(1);
    });
    
    function navigateLightbox(direction) {
        if (filteredMediaItems.length === 0) return;

        // Закрываем текущее видео перед переходом
        const currentIframe = lightboxContent.querySelector('iframe');
        if (currentIframe) {
            currentIframe.src = '';
        }
        
        currentIndex = (currentIndex + direction + filteredMediaItems.length) % filteredMediaItems.length;
        openLightbox(currentIndex);
    }
    
    // Клавиатура
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            navigateLightbox(-1);
        } else if (e.key === 'ArrowRight') {
            navigateLightbox(1);
        }
    });

    // Инициализация
    filteredMediaItems = Array.from(allMediaItems);
    createSlideGroups(filteredMediaItems);
    startAutoSlide();
});
//disabled link
document.querySelector('.b-menu__link_disabled').onclick = e => e.preventDefault()

//lang select


//burger
const burger = document.querySelector('.b-burger')
const menu = document.querySelector('.b-menu')
burger.addEventListener('click', () => {
    burger.classList.toggle('active-burger')
    if (!menu.classList.contains('active-block') && !menu.classList.contains('active-menu')) {
        menu.classList.add('active-block')
        setTimeout(() => {
            menu.classList.add('active-menu')
        }, 100);
        document.body.classList.add('b-fixed')
    }
    if (menu.classList.contains('active-block') && menu.classList.contains('active-menu')) {
        menu.classList.remove('active-menu')
        setTimeout(() => {
            menu.classList.remove('active-block')
        }, 400);
        document.body.classList.remove('b-fixed')
    }
})

//ACCORDEON
const accordeonBtn = document.querySelectorAll('[data-accordeon-btn]');
const accordeonContent = document.querySelectorAll('[data-accordeon-content]');

accordeonBtn.forEach(el => {
    el.addEventListener('click', event => {
        if (!el.classList.contains('active')) {
            cleanActivBtns()
            el.classList.add('active');
            const target = event.currentTarget.getAttribute('data-accordeon-btn');
            hideAccordeons()
            let currentAccordeon = document.querySelector(`[data-accordeon-content="${target}"]`);
            var accordeonChild = currentAccordeon.firstElementChild.scrollHeight;
            currentAccordeon.style.height = `calc(${accordeonChild}px + 10.6vw)`;
            currentAccordeon.classList.add('active')
        } else if (el.classList.contains('active')) {
            cleanActivBtns()
            hideAccordeons()
        }


        function hideAccordeons() {
            accordeonContent.forEach(el => {
                el.style.height = '0';
                el.classList.remove('active')
            })
        }

        function cleanActivBtns() {
            accordeonBtn.forEach(el => {
                el.classList.remove('active')
            })
        }
    })
})

//sliders
const swiper = new Swiper(".mySwiper", {
    spaceBetween: 100,
    effect: "fade",
    fadeEffect: {
        crossFade: true,
    },
    pagination: {
        el: ".swiper-pagination",
        type: 'custom',
        renderCustom: function (swiper, current, total) {
            if (current < 10) {
                total = '0' + total
            }
            if (total < 10) {
                current = '0' + current
            }
            return current + ' ... ' + (total);
        }
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});
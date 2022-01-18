//disabled link
document.querySelector('.b-menu__link_disabled').onclick = e => e.preventDefault()

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
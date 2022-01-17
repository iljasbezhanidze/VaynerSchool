//disabled link
document.querySelector('.b-menu__link_disabled').onclick = e => e.preventDefault()

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
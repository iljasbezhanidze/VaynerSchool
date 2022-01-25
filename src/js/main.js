//quiz
const quiz = {
    questions: [{
            condition: 'Заполните пропуски и ответьте на вопрос по тексту',
            text: "If you match these criteria, contact your manager because you qualify for a salary (1)_____ :",
            responses: [{
                    text: 'Upgrade',
                    correct: true,
                },
                {
                    text: 'Grows'
                },
                {
                    text: 'Raise'
                },
            ]
        },
        {
            condition: 'Condition 2',
            text: "Question 2",
            responses: [{
                    text: 'answer 1',
                },
                {
                    text: 'answer 2',
                    correct: true,
                },
                {
                    text: 'answer 3'
                },
            ]
        },
        {
            condition: 'Condition 3',
            text: "Question 3",
            responses: [{
                    text: 'answer 1',
                },
                {
                    text: 'answer 2'
                },
                {
                    text: 'Raise 3',
                    correct: true,
                },
            ]
        },
        {
            condition: 'Condition 4',
            text: "Question 4",
            responses: [{
                    text: 'answer 1',
                    correct: true,
                },
                {
                    text: 'answer 2'
                },
                {
                    text: 'answer 3'
                },
            ]
        },
        {
            condition: 'Condition 5',
            text: "Question 5",
            responses: [{
                    text: 'answer 15',
                    correct: true,
                },
                {
                    text: 'answer 42'
                },
                {
                    text: 'answer 38'
                },
            ]
        }
    ],
}

const test = new Vue({
    el: "#app",
    data: {
        quiz: quiz,
        questionIndex: 0,
        userResponses: Array(quiz.questions.length).fill(false),
        text: `А это значит, что вам есть куда стремится.
        Осталось подтянуть совсем немного и вы освоите язык!`
    },
    methods: {
        handleRadio(value) {
            this.userResponses[this.questionIndex] = value ? value : false
        },
        next: function () {
            this.questionIndex++
        },
        score: function () {
            return this.userResponses.filter(function (val) {
                return val
            }).length;
        }
    },
})






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


//LOAD VIDEO from link after click 'play'
const videos = document.querySelectorAll('.b-video');
let generateUrl = function (id) {
    let query = '?rel=0&showinfo=0&autoplay=1';
    return 'https://www.youtube.com/embed/' + id + query;
};
let createIframe = function (id) {
    let iframe = document.createElement('iframe');
    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('allow', 'autoplay; encrypted-media');
    iframe.setAttribute('src', generateUrl(id));
    return iframe;
};
videos.forEach((el) => {
    let videoHref = el.getAttribute('data-video');
    let deletedLength = 'https://youtu.be/'.length;
    let videoId = videoHref.substring(deletedLength, videoHref.length);
    let img = el.querySelector('img');
    let youtubeImgSrc = 'https://i.ytimg.com/vi/' + videoId + '/maxresdefault.jpg';
    img.setAttribute('src', youtubeImgSrc);
    el.addEventListener('click', (e) => {
        e.preventDefault();
        let iframe = createIframe(videoId);
        el.querySelector('img').remove();
        el.appendChild(iframe);
        el.querySelector('button').remove();
    });
});

//---MODALS---
//hide all modals
const modalOpen = document.querySelectorAll('[data-modal-open]')
const modals = document.querySelectorAll('[data-modal]')
const moadalInner = document.querySelectorAll('.b-modal')
const closeModal = document.querySelectorAll('[data-modal-close]')

function hideModals() {
    modals.forEach(elem => {
        elem.classList.remove('b-show');
    });
};

//find & open current modal, close rest & block scroll
modalOpen.forEach(elem => {
    elem.addEventListener('click', event => {
        event.preventDefault()
        let target = event.currentTarget.getAttribute('data-modal-open');
        hideModals()
        document.body.classList.add('b-blockScroll')
        let targetModal = document.querySelector(`[data-modal="${target}"]`);
        targetModal.classList.add('b-show');
        let currentVideo = document.querySelector('video')
        if (targetModal.contains(currentVideo)) {
            currentVideo.play()
            currentVideo.setAttribute('data-play', '')
        }
    });
});

//close btn active 
closeModal.forEach(el => el.onclick = () => {
    hideModals();
    document.body.classList.remove('b-blockScroll');
});

//close to click overlay 
window.addEventListener('click', function (e) {
    modals.forEach(el => {
        if (el == e.target && e.target != moadalInner) {
            document.body.classList.remove('b-blockScroll')
            hideModals();
            closeVideo();
        };
    });
});

function closeVideo() {
    currentPlayVideo.forEach(el => {
        el.pause();
        el.currentTime = 0;
    })
}

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
window.addEventListener('DOMContentLoaded', function () {

    'use strict';
    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }
    hideTabContent(1);

    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    info.addEventListener('click', function (event) {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });

    //TIMER

    let deadline = '2019-04-01';

    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()),
            seconds = Math.floor((t / 1000) % 60),
            minutes = Math.floor((t / 1000 / 60) % 60),
            hours = Math.floor((t / (1000 * 60 * 60)));
        return {
            'total': t,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function setClock(id, endtime) {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),

            timeInterval = setInterval(updateClock, 1000);

        function updateClock() {
            let t = getTimeRemaining(endtime);
            hours.textContent = t.hours;
            minutes.textContent = t.minutes;
            seconds.textContent = t.seconds;

            if (t.hours < 10) {
                hours.textContent = '0' + t.hours;
            }
            if (t.minutes < 10) {
                minutes.textContent = '0' + t.minutes;
            }
            if (t.seconds < 10) {
                seconds.textContent = '0' + t.seconds;
            }
            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }
    setClock('timer', deadline);

    //Add Text
    let timer = document.querySelector('.timer'),
        text = document.createTextNode('Таймер обратного отсчета'),
        div = document.createElement('div');

    // document.timer.removeChild('timer-title');

    div.classList.add('timer-action');
    timer.appendChild(div);
    div.appendChild(text);
    //    

    function ModalOkno() {
        let more = document.querySelector('.more'),
            overlay = document.querySelector('.overlay'),
            close = document.querySelector('.popup-close'),
            btn = document.querySelector('.description-btn');

        more.addEventListener('click', function () {
            overlay.style.display = 'block';
            this.classList.add('more-splash');
            document.body.style.overflow = 'hidden';
        });

        close.addEventListener('click', function () {
            overlay.style.display = 'none';
            this.classList.remove('more-splash');
            document.body.style.overflow = '';
        });

        btn.addEventListener('click', function () {
            overlay.style.display = 'block';
            this.classList.add('more-splash');
            // document.body.style.overflow = 'hidden';
        });

    }
    ModalOkno();
    
    //Form
    // let message = {
    //     loading: 'Zagruska',
    //     success: 'Spasibo! Skoro s vami ... !',
    //     failure: 'Opyat ne to poshlo!'
    // };

    // let form = document.querySelector('.main-form'),
    //     input = form.getElementsByTagName('input'),
    //     statusMessage = document.createElement('div');

    //     statusMessage.classList.add('status');

    //     form.addEventListener('submit', function(event) {
    //         event.preventDefault();
    //         form.appendChild(statusMessage);

    //         let request = new XMLHttpRequest();

    //         request.open('POST', 'server1.php');
    //         request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    //         let formData = FormData(form);
    //         request.send(formData);
    //     });


    let message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся!',
        failure: 'Что-то пошла не так...'
    };

    let form = document.querySelector('.main-form'),
        input = form.getElementsByTagName('input'),
        statusMessage = document.createElement('div');

        statusMessage.classList.add('status');


    form.addEventListener('submit', function(event) {
        event.preventDefault(); 
        form.appendChild(statusMessage);

        let request = new XMLHttpRequest();
        request.open('POST', 'server1.php');
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        
        //FormData
        let formData = new FormData(form);
        request.send(formData);

        request.addEventListener('readystatechange', function () {
            if (request.readyState < 4) {
                statusMessage.innerHTML = message.loading;
            } else if (request.readyState === 4 && request.status == 200) {
                statusMessage.innerHTML = message.success;
            } else {
                statusMessage.innerHTML = message.failure;
            }
        });
        for (let i = 0; i < input.length; i++) {
            input[i].value = '';
        }
    });


    class options {
        constructor(height, width, bg, fontSize, textAlign) {
            this.height = height;
            this.width = width;
            this.bg = bg;
            this.fontSize = fontSize;
            this.textAlign = textAlign;

        }
    }
});
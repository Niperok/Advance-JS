'use strict';

class Valid {
    constructor() {
        this.name = document.querySelector('.name');
        this.nameErr = document.querySelector('.name-err');
        this.phone = document.querySelector('.phone');
        this.phoneErr = document.querySelector('.phone-err');
        this.mail = document.querySelector('.mail');
        this.mailErr = document.querySelector('.mail-err');
        this.btn = document.querySelector('.btn');
        this.addEventListeners();
    }

    addEventListeners() {
        this.name.addEventListener('input', () => {
            this.nameTest(this.name.value);
        })
        this.phone.addEventListener('click', () => {
            if (this.phone.value === '') {
                this.phone.value = '+7(';
            }
        })
        this.phone.addEventListener('input', () => {
            this.phoneTest(this.phone.value);
        })
        this.mail.addEventListener('input', () => {
            this.mailTest(this.mail.value);
        })
        this.btn.addEventListener('click', () => {
            this.nameTest(this.name.value);
            this.phoneTest(this.phone.value);
            this.mailTest(this.mail.value);
        })
    }

    nameTest(text) {
        if (/[^a-zA-zа-яА-яёЁ]/i.test(text)) {
            this.name.classList.remove('green');
            this.name.classList.add('red');
            this.nameErr.textContent = 'Имя должно содержать только буквы';
        } else {
            this.name.classList.remove('red');
            this.name.classList.add('green');
            this.nameErr.textContent = '';
            if (text === '') {
                this.name.classList.remove('green');
                this.name.classList.add('red');
                this.nameErr.textContent = 'Имя должно содержать только буквы';
            }
        }
    }

    phoneTest(text) {
        if (/\+7\(\d{0,2}$/.test(text)) {
            this.phone.classList.remove('red');
        } else if (/\+7\(\d{3}$/.test(text)) {
            this.phone.value += ')';
        } else if (/\+7\(\d{3}\)\d{0,2}$/.test(text)) {
            this.phone.classList.remove('red');
        } else if (/\+7\(\d{3}\)\d{3}$/.test(text)) {
            this.phone.value += '-';
        } else if (/\+7\(\d{3}\)\d{3}-\d{0,3}$/.test(text)) {
            this.phone.classList.remove('red');
        } else if (/\+7\(\d{3}\)\d{3}-\d{4}$/.test(text)) {
            this.phone.classList.remove('red');
            this.phone.classList.add('green');
            this.phoneErr.textContent = '';
        } else {
            this.phone.classList.remove('green');
            this.phone.classList.add('red');
            this.phoneErr.textContent = 'Формат номера: +7(000)000-0000';
        }
        if (text === '') {
            this.phone.classList.remove('green');
            this.phone.classList.add('red');
            this.phoneErr.textContent = 'Формат номера: +7(000)000-0000';
        }
    }

    mailTest(text) {
        if (/[^a-zA-Z0-9_\-\.@]/.test(text)) {
            this.mail.classList.remove('green');
            this.mail.classList.add('red');
            this.mailErr.textContent = 'Формат адреса: mymail@mail.ru';
        } else if (/\w+\.?-?\w+@\w+\.\w+$/i.test(text)) {
            this.mail.classList.remove('red');
            this.mail.classList.add('green');
            this.mailErr.textContent = '';
        } else {
            this.mail.classList.remove('green');
            this.mail.classList.remove('red');
        }
        if (text === '') {
            this.mail.classList.remove('green');
            this.mail.classList.add('red');
            this.mailErr.textContent = 'Формат адреса: mymail@mail.ru';
        }
    }

}

let valid = new Valid();

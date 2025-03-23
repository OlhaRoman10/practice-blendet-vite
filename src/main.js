// Перед вами форма для авторизації на сайті (правильні дані для входу збережені в обʼєкті USER_DATA)

// Розбийте код на кілька файлів:
// storage.js - функції для роботи зі сховищем;
// refs.js - посилання на всі потрібні елементи в html;
// main.js - головний файл, де вся основна логіка додатка.
// Ви маєте додати перевірку введених даних при сабміті:
// Якщо введені дані не збігаються зі збереженими, викликайте аlert і
// повідомляйте про помилку.

// Якщо імейл і пароль користувача збігаються, зберігайте дані з форми
// у локальне сховище і змінюйте кнопку Login на Logout, також робіть поля введення
// недоступними для змін.
// При перезавантаженні сторінки, якщо користувач авторизован, ми маємо бачити logout-кнопку
// та недоступні для зміни поля з даними користувача.
// Клік по кнопці logout повертає все до початкового вигляду і видаляє дані користувача
// з локального сховища.
//import "./js/modul-10";
import iziToast from 'izitoast';
import { refs } from './js/refs';
import { saveData, getData, clearData } from './js/storage';

import 'izitoast/dist/css/iziToast.min.css';

import iconError from './img/javascript.svg';

const LS_KEY = 'user-data';
const USER_DATA = {
  email: 'user@mail.com',
  password: 'secret',
};
const userData = getData(LS_KEY);
if (userData) {
  refs.email.value = userData.email ?? '';
  refs.password.value = userData.password ?? '';
  refs.button.textContent = 'Logout';
  refs.email.setAttribute('readonly', true);
  refs.password.setAttribute('readonly', true);
}

const onFormSubmit = event => {
  event.preventDefault();
  const emailValue = refs.email.value.trim();
  const passwordValue = refs.password.value.trim();

  if (refs.button.textContent === 'Logout') {
    clearData(LS_KEY);
    refs.form.reset();
    refs.email.removeAttribute('readonly');
    refs.password.removeAttribute('readonly');
    refs.button.textContent = 'Login';
    return;
  }

  if (emailValue === '' || passwordValue === '') {
    iziToast.warning({
      message: 'Fill all fields',
      iconUrl: iconError,
      position: 'topLeft',
    });
    return;
  }
  if (emailValue !== USER_DATA.email || passwordValue !== USER_DATA.password) {
    iziToast.error({
      message: 'Incorrect Data',
      iconUrl: iconError,
      position: 'topRight',
    });
    return;
  }

  saveData(LS_KEY, { email: emailValue, password: passwordValue });
  refs.button.textContent = 'Logout';
  refs.email.setAttribute('readonly', true);
  refs.password.setAttribute('readonly', true);
};

refs.form.addEventListener('submit', onFormSubmit);

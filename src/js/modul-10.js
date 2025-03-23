// Додай відображення дати і часу в реальному часі

const spanTextContent = document.querySelector('.date span');

spanTextContent.textContent = new Date().toLocaleString();

setInterval(
  () => (spanTextContent.textContent = new Date().toLocaleString()),
  1000
);

// - Використовуй prompt та повертай значення звідти.
// - Створи функцію, яка буде набувати значення з prompt і повертатиме проміс.
// Якщо значення не є числом, відхиляй проміс та логіруй "error".
// Якщо значення парне, вирішуй проміс та повертай "even" через 1 секунду.
// Якщо значення не парне, вирішуй проміс та повертай "odd" через 2 секунди.

const answer = prompt('Enter something');

function checkAnswer(answer) {
  let promise = new Promise((resolve, reject) => {
    const numberAnswer = Number(answer);
    if (isNaN(numberAnswer)) {
      reject('error');
    }
    if (numberAnswer % 2 === 0) {
      setTimeout(() => resolve('even'), 1000);
    }
    if (numberAnswer % 2 !== 0) {
      setTimeout(() => resolve('odd'), 2000);
    }
  });
  return promise;
}

checkAnswer(answer)
  .then(answer => {
    console.log(answer);
  })
  .catch(error => {
    console.log(error);
  });
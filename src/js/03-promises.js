import Notiflix from 'notiflix';

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

document.querySelector('.form').addEventListener('submit', event => {
  event.preventDefault();

  const form = event.target;
  const firstDelay = parseInt(form.elements.delay.value);
  const step = parseInt(form.elements.step.value);
  const amount = parseInt(form.elements.amount.value);

  for (let i = 0; i < amount; i++) {
    const delay = firstDelay + step * i;
    createPromise(i + 1, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
});

/*
Пример работы скрипта:

Пользователь заполняет форму значениями: First delay = 1000, Delay step = 500, Amount = 5.
При сабмите формы, скрипт создает 5 промисов с задержками 1000, 1500, 2000, 2500 и 3000 миллисекунд соответственно.
Каждый промис выполняется либо отклоняется через заданное время и выводит соответствующее уведомление с использованием библиотеки Notiflix.
*/

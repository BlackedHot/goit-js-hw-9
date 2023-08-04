function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    return new Promise(resolve =>
      setTimeout(resolve, delay, { position, delay })
    );
  } else {
    return new Promise((resolve, reject) =>
      setTimeout(reject, delay, { position, delay })
    );
  }
}

document.querySelector('.form').addEventListener('submit', event => {
  event.preventDefault();

  const delayInput = document.querySelector('input[name="delay"]');
  const stepInput = document.querySelector('input[name="step"]');
  const amountInput = document.querySelector('input[name="amount"]');

  const firstDelay = Number(delayInput.value);
  const step = Number(stepInput.value);
  const amount = Number(amountInput.value);

  for (let i = 1; i <= amount; i++) {
    const delay = firstDelay + (i - 1) * step;

    createPromise(i, delay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
});

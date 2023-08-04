function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`;
}

let intervalId;

function startChangingColor() {
  const body = document.querySelector('body');
  intervalId = setInterval(function () {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);

  document.querySelector('[data-start]').disabled = true;
}

function stopChangingColor() {
  clearInterval(intervalId);
  document.querySelector('[data-start]').disabled = false;
}

document
  .querySelector('[data-start]')
  .addEventListener('click', startChangingColor);
document
  .querySelector('[data-stop]')
  .addEventListener('click', stopChangingColor);

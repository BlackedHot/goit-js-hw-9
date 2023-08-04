import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

const datetimePicker = flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate <= new Date()) {
      window.alert('Please choose a date in the future');
      document.querySelector('[data-start]').disabled = true;
    } else {
      document.querySelector('[data-start]').disabled = false;
    }
  },
});

document.querySelector('[data-start]').addEventListener('click', () => {
  const selectedDate = datetimePicker.selectedDates[0];
  const currentDate = new Date();
  let timeRemaining = selectedDate - currentDate; // Use 'let' instead of 'const'

  if (timeRemaining > 0) {
    const timerElements = {
      days: document.querySelector('[data-days]'),
      hours: document.querySelector('[data-hours]'),
      minutes: document.querySelector('[data-minutes]'),
      seconds: document.querySelector('[data-seconds]'),
    };

    const updateTimer = () => {
      const time = convertMs(timeRemaining);

      timerElements.days.textContent = addLeadingZero(time.days);
      timerElements.hours.textContent = addLeadingZero(time.hours);
      timerElements.minutes.textContent = addLeadingZero(time.minutes);
      timerElements.seconds.textContent = addLeadingZero(time.seconds);

      timeRemaining -= 1000;

      if (timeRemaining < 0) {
        clearInterval(intervalId);
        document.querySelector('[data-start]').disabled = true;
      }
    };

    updateTimer();
    const intervalId = setInterval(updateTimer, 1000);
  }
});
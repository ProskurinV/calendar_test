let monthNav = 0;
let clicked = null;
let events = localStorage.getItem('events')
  ? JSON.parse(localStorage.getItem('events'))
  : [];

const calendar = document.querySelector('.calendar');
const newEventModal = document.querySelector('.newEventModal');
const deleteEventModal = document.querySelector('.deleteEventModal');
const backDrop = document.querySelector('.modalBackDrop');
// const form = document.querySelector('form');
// const inputs = document.querySelector('.form').elements;
const input = document.querySelector('input');

const weekdays = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

// function openEventModal() {}

// function openEditModal(events) {
//   clicked = events;

//   const newEvent = events.find(event => event.events === clicked);

//   if (newEvent) {
//     console.log('Event is already exist');
//   } else {
//     newEventModal.style.display = 'block';
//   }

//   backDrop.style.display = 'block';
// }

function openModal(date) {
  clicked = date;

  const newEvent = events.find(event => event.date === clicked);

  if (newEvent) {
    document.getElementById('eventText').innerText = newEvent.title;
    deleteEventModal.style.display = 'block';
  } else {
    newEventModal.style.display = 'block';
  }

  backDrop.style.display = 'block';
}

function load() {
  const date = new Date();

  if (monthNav !== 0) {
    date.setMonth(new Date().getMonth() + monthNav);
  }

  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 0);
  const dateString = firstDayOfMonth.toLocaleDateString('en-uk', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);

  document.querySelector('.monthSelect').innerText = `${date.toLocaleDateString(
    'en-uk',
    {
      month: 'long',
    }
  )} ${year}`;

  calendar.innerHTML = '';

  for (let i = 0; i <= paddingDays + daysInMonth; i += 1) {
    const dayOfWeek = document.createElement('div');
    dayOfWeek.classList.add('day');

    if (i > paddingDays) {
      dayOfWeek.innerText = i - paddingDays;
      dayOfWeek.addEventListener('click', () =>
        openModal(`${month + 1}/${i - paddingDays}/${year}`)
      );
    } else {
      dayOfWeek.classList.add('padding');
    }

    calendar.appendChild(dayOfWeek);
  }

  console.log(paddingDays);
  console.log(dateString);
  console.log(firstDayOfMonth);
  console.log(daysInMonth);
  console.log(day, month, year);
}

// document.querySelector('btn-event').addEventListener('click', () => {
//   openEventModal();
// });

// function openEventModal() {
//   document.querySelector('.btn-event').addEventListener('click', () => {
//     openEditModal();
//   });
// }

function saveEvent() {
  //   const formData = new FormData(form);
  //   console.log(formData);
  if (input.value) {
    input.classList.remove('error');

    events.push({
      date: clicked,
      title: input.elements.value,
    });

    localStorage.setItem('events', JSON.stringify(events));
  } else {
    input.classList.add('error');
  }
}

function closeModal() {
  input.classList.remove('error');
  newEventModal.style.display = 'none';
  backDrop.style.display = 'none';
  form.reset();
  clicked = null;
  load();
}

function initButton() {
  document.querySelector('.btn-next').addEventListener('click', () => {
    monthNav += 1;
    load();
  });

  document.querySelector('.btn-back').addEventListener('click', () => {
    monthNav -= 1;
    load();
  });

  document.querySelector('.btnSave').addEventListener('click', saveEvent);
  document.querySelector('.btnCancel').addEventListener('click', closeModal);
}

initButton();

load();

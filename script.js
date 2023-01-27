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
// const input = document.querySelector('input');
const eventTitleInput = document.getElementById('eventTitleInput');

const weekdays = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

function openModal(date) {
  clicked = date;

  const newEvent = events.find(event => event.events === clicked);

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

  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const dateString = firstDayOfMonth.toLocaleDateString('en-uk', {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
  const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);

  document.querySelector(
    '.monthDisplay'
  ).innerText = `${date.toLocaleDateString('en-us', {
    month: 'long',
  })} ${year}`;

  calendar.innerHTML = '';

  for (let i = 1; i <= paddingDays + daysInMonth; i += 1) {
    const dayInCalendar = document.createElement('div');
    dayInCalendar.classList.add('day');

    const dayString = `${month + 1}/${i - paddingDays}/${year}`;

    if (i > paddingDays) {
      dayInCalendar.innerText = i - paddingDays;
      const eventForDay = events.find(e => e.date === dayString);

      if (i - paddingDays === day && monthNav === 0) {
        dayInCalendar.id = 'currentDay';
      }

      if (eventForDay) {
        const eventDiv = document.createElement('div');
        eventDiv.classList.add('event');
        eventDiv.innerText = eventForDay.title;
        dayInCalendar.appendChild(eventDiv);
      }

      dayInCalendar.addEventListener('click', () => openModal(dayString));
    } else {
      dayInCalendar.classList.add('padding');
    }

    calendar.appendChild(dayInCalendar);
  }
}

function closeModal() {
  eventTitleInput.classList.remove('error');
  newEventModal.style.display = 'none';
  deleteEventModal.style.display = 'none';
  backDrop.style.display = 'none';
  eventTitleInput.value = '';
  clicked = null;
  load();
}

function saveEvent() {
  if (eventTitleInput.value) {
    eventTitleInput.classList.remove('error');

    events.push({
      date: clicked,
      title: eventTitleInput.value,
    });

    localStorage.setItem('events', JSON.stringify(events));
    closeModal();
  } else {
    eventTitleInput.classList.add('error');
  }
}

function deleteEvent() {
  events = events.filter(e => e.date !== clicked);
  localStorage.setItem('events', JSON.stringify(events));
  closeModal();
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

  // document.querySelector('.btnSave').addEventListener('click', saveEvent);
  // document.querySelector('.btnCancel').addEventListener('click', closeModal);

  document.getElementById('saveButton').addEventListener('click', saveEvent);
  document.getElementById('cancelButton').addEventListener('click', closeModal);
  document
    .getElementById('deleteButton')
    .addEventListener('click', deleteEvent);
  document.getElementById('closeButton').addEventListener('click', closeModal);
}

initButton();

load();

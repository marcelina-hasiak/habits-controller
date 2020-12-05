const days = ["Sun", "Mon", "Thues", "Wd", "Thur", "Fri", "Sat"];
const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const renderCalendarButtons = (habitContainer, applicationContent) => {
  habitContainer.classList.remove("application__body--hidden");
  applicationContent.classList.remove("application__content--mini");

  const buttons = `
  <div class="calendar-buttons">
    <button class="calendar-buttons__button calendar-buttons__button--js calendar-buttons__button--prev">
      <img src="src/img/button.svg" alt=""/>
    prev </button>
    <button class="calendar-buttons__button calendar-buttons__button--js calendar-buttons__button--next"> next
      <img src="src/img/button.svg" alt=""/>
    </button>
  </div>`;
  habitContainer.insertAdjacentHTML("beforeend", buttons);
};

export const renderCalendar = (habitContainer, newHabit) => {
  const {currentMonth, currentYear} = newHabit;
  const totalDaysInMonth = newHabit.calendarData[newHabit.fullDate].length;
  if (habitContainer.children.length > 1) {
    habitContainer.removeChild(habitContainer.lastElementChild);
  }
  const tableHead = `
  <table class="calendar">
    <thead class="calendar__header">
      <tr class="calendar__heading">
        <th class="calendar__data">${month[currentMonth]}, ${currentYear}</th>
        <th class="calendar__stats calendar__stats--js">0/${totalDaysInMonth}</th>
      </tr>
    </thead>
    <tbody class="calendar__body">
    </tbody>
  </table>
  `;
  habitContainer.insertAdjacentHTML("beforeend", tableHead);

  const tableBody = document.querySelector(".calendar__body");

  for (let i = 0; i < totalDaysInMonth; i++) {
    const tableBodyRow = `
    <tr class="calendar__day">
      <td class="calendar__day-of-week">${i + 1}, ${days[(newHabit.getFirstDayInMonth() + i) % 7]}</td>
      <td class="calendar__checker">
        <label class="habit-checkbox">
          <input class="habit-checkbox__input habit-checkbox__input--js" type="checkbox" data-index=${i} ${newHabit.isChecked(i)}/>
          <span class="habit-checkbox__tick"></span>
        </label>
      </td>
    </tr>
    `;
    tableBody.insertAdjacentHTML("beforeend", tableBodyRow);
  }
};

export const renderSavedHabits = (datalist, savedHabitsNames) => {
  if (datalist.children.length > 0) {
    const options = datalist.querySelectorAll('.search-form__habit-option--js');
    options.forEach(option => option.remove());
  }
  for (const habitName of savedHabitsNames) {
    const option = `
    <option class="search-form__habit-option search-form__habit-option--js">${habitName}</option>`;
    datalist.insertAdjacentHTML("beforeend", option);
  }
};

export const renderStats = (newHabit) => {
  const stats = document.querySelector(".calendar__stats--js");
  stats.textContent = `${newHabit.countCheckedChechboxes()}/${newHabit.calendarData[newHabit.fullDate].length}`;
};

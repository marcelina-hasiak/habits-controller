import { HabitsStorage } from "./habits-storage.js";
import { AppStorage } from "./storage.js";
import {
  toggleClasses,
  changeHabitTitle,
  renderCalendarButtons,
  renderCalendar,
  renderSavedHabits,
  renderStats,
  deleteCalendar,
  renderHabitHeading,
  hideCalendarAnimation,
} from "./view.js";

const storage = new AppStorage();
const habitsStorage = new HabitsStorage(storage);

const applicationContent = document.querySelector(".application__content--js");

const habitContainer = document.querySelector(".application__body--js");
const saveHabitButton = document.querySelector(
  ".search-form__add-habit-button--js"
);
const deleteHabitButton = document.querySelector(
  ".search-form__delete-habit-button--js"
);
const habitInput = document.querySelector(".search-form__habit-input--js");
const datalist = document.querySelector(".search-form__habit-list--js");

const initState = {
  isCalendarRendered: false,
};

function init() {
  if (habitsStorage.names.length > 0) {
    renderSavedHabits(datalist, habitsStorage.names);
  }

  habitInput.addEventListener("click", clearInput);

  habitInput.addEventListener("keyup", (event) => {
    if (event.keyCode === 13) {
      createNewCalendar();
    }
  });

  saveHabitButton.addEventListener("click", createNewCalendar);

  deleteHabitButton.addEventListener("click", () => {
    const calendarTitle = document.querySelector(
      ".calendar-title__habit-title--js"
    );
    const habitName = habitInput.value;
    if (habitName || calendarTitle) {
      calendarTitle
        ? habitsStorage.removeHabitName(calendarTitle.textContent)
        : habitsStorage.removeHabitName(habitName);

      habitInput.value = "";
      renderSavedHabits(datalist, habitsStorage.names);
      deleteCalendar(habitContainer);
      toggleClasses(habitContainer, applicationContent);
      initState.isCalendarRendered = false;
    }
  });
}

function clearInput(event) {
  event.target.value = "";
}

function createNewCalendar() {
  if (habitInput.value) {
    const habitName = habitInput.value;
    const newHabit = habitsStorage.loadHabit(habitName);

    if (!initState.isCalendarRendered) {
      renderCalendarButtons(habitContainer, applicationContent);
      renderHabitHeading(habitContainer, habitName);
      toggleClasses(habitContainer, applicationContent);
      initState.isCalendarRendered = true;
    }

    changeHabitTitle(habitName);
    renderCalendar(habitContainer, newHabit);
    buttonHandler(newHabit, habitName);
    inputHandler(newHabit, habitName);
  }
}

const buttonHandler = (habit, habitName) => {
  const calendarButtons = document.querySelectorAll(
    ".calendar-buttons__button--js"
  );

  calendarButtons.forEach((button) =>
    button.addEventListener("click", (event) => {
      event.currentTarget.classList.contains("calendar-buttons__button--prev")
        ? habit.prevMonth()
        : habit.nextMonth();

      renderCalendar(habitContainer, habit);
      inputHandler(habit, habitName);
    })
  );
};

const inputHandler = (habit, habitName) => {
  const chechboxes = document.querySelectorAll(".habit-checkbox__input--js");

  chechboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", (event) => {
      checkboxHandler(event.target, habit);
      habitsStorage.addNewHabitName(habitName);
      renderSavedHabits(datalist, habitsStorage.names);
    });
  });
};

const checkboxHandler = (target, habit) => {
  habit.updateCheckboxes(target.dataset.index, target);
  const { calendarData, fullDate } = habit;
  const totalDaysInMonth = calendarData[fullDate].length;
  renderStats(habit, totalDaysInMonth);
  habitsStorage.saveHabit(habit);
};

init();

import { Habit } from "./habit.js";
import { SavedHabits } from "./saved-habits.js";
import { AppStorage } from "./storage.js";
import { renderCalendarButtons } from "./view.js";
import { renderCalendar } from "./view.js";
import { renderSavedHabits } from "./view.js";
import { renderStats } from "./view.js";

const habitsStorage = new AppStorage();
const savedHabits = new SavedHabits(habitsStorage)

const applicationContent = document.querySelector(".application__content--js")
const habitContainer = document.querySelector(".application__body--js");
const saveHabitButton = document.querySelector(".search-form__habit-button--js");
const habitName = document.querySelector(".search-form__habit-input--js");
const datalist = document.querySelector(".search-form__habit-list--js")

if (savedHabits.names.length > 0) {
  renderSavedHabits(datalist, savedHabits);
}

const initState = {
  isCalendarButtonsRendered: false,
}

habitName.addEventListener("click", (event) => {
  event.target.value = "";
});

saveHabitButton.addEventListener("click", () => {
  if (habitName.value) {
    const name = habitName.value;
    const newHabit = new Habit(name, habitsStorage);
    savedHabits.addNewHabitName(name);
    renderSavedHabits(datalist, savedHabits);

    if (!initState.isCalendarButtonsRendered) {
      renderCalendarButtons(habitContainer, applicationContent);
      initState.isCalendarButtonsRendered = true;
    }

    renderCalendar(habitContainer, newHabit);
    buttonHandler(newHabit);
    inputHandler(newHabit);
  };
});

const buttonHandler = (newHabit) => {
  const calendarButtons = document.querySelectorAll(".calendar-buttons__button--js");

  calendarButtons.forEach(button => button.addEventListener('click', (e) => {
    e.currentTarget.classList.contains("calendar-buttons__button--prev")
      ? newHabit.prevMonth()
      : newHabit.nextMonth();

      if (!newHabit.calendarData[newHabit.fullDate]) {
        newHabit.createNewCalendarCard();
      }
      renderCalendar(habitContainer, newHabit);
      inputHandler(newHabit);
  }));
};

const inputHandler = (newHabit) => {
  const chechboxes = document.querySelectorAll(".habit-checkbox__input--js");

  chechboxes.forEach(checkbox => {
    checkbox.addEventListener("change", (e) => {
      newHabit.updateCheckboxes(e.target.dataset.index, e.target);
      renderStats(newHabit);
      newHabit.saveState();
    });
  });
};

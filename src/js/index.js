import { HabitsStorage } from "./habits-storage.js";
import { AppStorage } from "./storage.js";
import { renderCalendarHeading } from "./view.js";
import { renderCalendar } from "./view.js";
import { renderSavedHabits } from "./view.js";
import { renderStats } from "./view.js";

const storage = new AppStorage();
const habitsStorage = new HabitsStorage(storage)

const applicationContent = document.querySelector(".application__content--js")
const habitContainer = document.querySelector(".application__body--js");
const saveHabitButton = document.querySelector(".search-form__habit-button--js");
const habitName = document.querySelector(".search-form__habit-input--js");
const datalist = document.querySelector(".search-form__habit-list--js")

if (habitsStorage.names.length > 0) {
  renderSavedHabits(datalist, habitsStorage.names);
}

const initState = {
  isCalendarHeadingRendered: false,
}

habitName.addEventListener("click", (event) => {
  event.target.value = "";
});

saveHabitButton.addEventListener("click", () => {
  if (habitName.value) {
    const name = habitName.value;
    const newHabit = habitsStorage.loadHabit(name);
    habitsStorage.addNewHabitName(name);
    renderSavedHabits(datalist, habitsStorage.names);

    if (!initState.isCalendarHeadingRendered) {
      renderCalendarHeading(habitContainer, applicationContent);
      initState.isCalendarHeadingRendered = true;
    }

    renderCalendar(habitContainer, newHabit);
    renderStats(newHabit);
    buttonHandler(newHabit);
    inputHandler(newHabit);
  };
});

const buttonHandler = (newHabit) => {
  const calendarButtons = document.querySelectorAll(".calendar-buttons__button--js");

  calendarButtons.forEach(button => button.addEventListener('click', (event) => {
    event.currentTarget.classList.contains("calendar-buttons__button--prev")
      ? newHabit.prevMonth()
      : newHabit.nextMonth();

      renderCalendar(habitContainer, newHabit);
      renderStats(newHabit);
      inputHandler(newHabit);
  }));
};

const inputHandler = (newHabit) => {
  const chechboxes = document.querySelectorAll(".habit-checkbox__input--js");

  chechboxes.forEach(checkbox => {
    checkbox.addEventListener("change", (event) => {
      newHabit.updateCheckboxes(event.target.dataset.index, event.target);
      renderStats(newHabit);
      habitsStorage.saveHabit(newHabit);
    });
  });
};

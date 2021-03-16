import { HabitsStorage } from "./habits-storage.js";
import { AppStorage } from "./storage.js";
import { renderCalendarButtons, renderCalendar, renderSavedHabits, renderStats } from "./view.js";

const storage = new AppStorage();
const habitsStorage = new HabitsStorage(storage)

const applicationContent = document.querySelector(".application__content--js")
const habitContainer = document.querySelector(".application__body--js");
const saveHabitButton = document.querySelector(".search-form__add-habit-button--js");
const deleteHabitButton = document.querySelector(".search-form__delete-habit-button--js")
const habitName = document.querySelector(".search-form__habit-input--js");
const datalist = document.querySelector(".search-form__habit-list--js")

if (habitsStorage.names.length > 0) {
  renderSavedHabits(datalist, habitsStorage.names);
}

const initState = {
  isCalendarButtonsRendered: false,
}

habitName.addEventListener("click", (event) => {
  event.target.value = "";
});

habitName.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    habitHandler()
  }
});

saveHabitButton.addEventListener("click", () => {
  habitHandler()
});

deleteHabitButton.addEventListener("click", () => {
  if (habitName.value) {
    const name = habitName.value;
    habitsStorage.deleteHabit(name)
    habitsStorage.removeHabitName(name);
  }
})

const habitHandler = () => {
  if (habitName.value) {
    const name = habitName.value;
    const habit = habitsStorage.loadHabit(name);
    habitsStorage.addNewHabitName(name);
    renderSavedHabits(datalist, habitsStorage.names);

    if (!initState.isCalendarButtonsRendered) {
      renderCalendarButtons(habitContainer, applicationContent);
      initState.isCalendarButtonsRendered = true;
    }

    renderCalendar(habitContainer, habit);
    renderStats(habit);
    buttonHandler(habit);
    inputHandler(habit);
  };
}

const buttonHandler = (habit) => {
  const calendarButtons = document.querySelectorAll(".calendar-buttons__button--js");

  calendarButtons.forEach(button => button.addEventListener('click', (event) => {
    event.currentTarget.classList.contains("calendar-buttons__button--prev")
      ? habit.prevMonth()
      : habit.nextMonth();

      renderCalendar(habitContainer, habit);
      renderStats(habit);
      inputHandler(habit);
  }));
};

const inputHandler = (habit) => {
  const chechboxes = document.querySelectorAll(".habit-checkbox__input--js");

  chechboxes.forEach(checkbox => {
    checkbox.addEventListener("change", (event) => {
      checkboxHandler(event.target, habit)
    });
  });
};

const checkboxHandler = (target, habit) => {
  habit.updateCheckboxes(target.dataset.index, target);
  renderStats(habit);
  habitsStorage.saveHabit(habit);
}

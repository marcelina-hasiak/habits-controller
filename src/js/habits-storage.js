import { Habit } from "./habit.js";

export class HabitsStorage {
  constructor(storage) {
    this.storage = storage;
    this.names = this.getHabitsNames() || [];
  }
  addNewHabitName(name) {
    if (!this.names.includes(name)) {
      this.names.push(name);
    }
    this.saveHabitsNames();
  }
  saveHabitsNames() {
    this.storage.set("savedHabits", this.names);
  }
  getHabitsNames() {
    return this.storage.get("savedHabits");
  }
  loadHabit(name) {
    const calendar = this.storage.get(name) || [];
    return new Habit(name, calendar)
  }
  saveHabit(habit) {
    this.storage.set(habit.name, habit.calendarData);
  }
}

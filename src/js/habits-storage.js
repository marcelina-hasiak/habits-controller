import { Habit } from "./habit.js";

export class HabitsStorage {
  constructor(storage) {
    this.storage = storage;
    this.names = this.loadHabitsNames() || [];
  }
  addNewHabitName(name) {
    if (!this.names.includes(name)) {
      this.names.push(name);
    }
    this.saveHabitsNames();
  }
  removeHabitName(name) {
    if (this.names.includes(name)) {
      const indexToRemove = this.names.indexOf(name)
      this.names.splice(indexToRemove, 1);
    }
    this.names.length <= 0 ? this.deleteHabit("savedHabits") : this.saveHabitsNames();
  }
  saveHabitsNames() {
    this.storage.set("savedHabits", this.names);
  }
  loadHabitsNames() {
    return this.storage.get("savedHabits");
  }
  loadHabit(name) {
    const calendar = this.storage.get(name) || {};
    return new Habit(name, calendar)
  }
  saveHabit(habit) {
    this.storage.set(habit.name, habit.calendarData);
  }
  deleteHabit(name) {
    this.storage.remove(name)
  }
}

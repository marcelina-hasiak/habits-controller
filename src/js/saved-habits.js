export class SavedHabits {
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
}

export class Habit {
  constructor(name, storage) {
    this.storage = storage;
    this.name = name;
    this.calendarData = this.getState() || {};
    this.newDate();
    this.createNewCalendarCard();
  }
  newDate() {
    const date = new Date();
    this.currentMonth = date.getMonth();
    this.currentYear = date.getFullYear();
  }
  get fullDate() {
    return `${this.currentYear}_${this.currentMonth}`;
  }
  nextMonth() {
    this.currentMonth++;
    if (this.currentMonth === 12) {
      this.currentMonth = 0;
      this.currentYear++;
    }
  }
  prevMonth() {
    this.currentMonth--;
    if (this.currentMonth === -1) {
      this.currentMonth = 11;
      this.currentYear--;
    }
  }
  createNewCalendarCard() {
    if (!this.calendarData[this.fullDate]) {
      this.calendarData[this.fullDate] = new Array(this.getTotalDaysInMonth()).fill(0);
    }
  }
  getTotalDaysInMonth() {
    return new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
  }
  getFirstDayInMonth() {
    const temporaryDate = new Date(this.currentYear, this.currentMonth, 1);
    return temporaryDate.getDay();
  }
  updateCheckboxes(index, input) {
    if (input.checked) {
      this.calendarData[this.fullDate][index] = 1;
    } else {
      this.calendarData[this.fullDate][index] = 0;
    }
  }
  isChecked(index) {
    if (this.calendarData[this.fullDate][index] === 1) {
      return "checked";
    }
  }
  countCheckedChechboxes() {
    return this.calendarData[this.fullDate].reduce((acc, cur) => acc + cur);
  }
  saveState() {
    this.storage.set(this.name, this.calendarData);
  }
  getState() {
    return this.storage.get(this.name);
  }
}

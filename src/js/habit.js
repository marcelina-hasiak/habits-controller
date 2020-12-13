export class Habit {
  static TASK_CHECKED = "checked"
  constructor(name, calendarData) {
    this.name = name;
    this.calendarData = calendarData
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
    this.createNewCalendarCard()
  }
  prevMonth() {
    this.currentMonth--;
    if (this.currentMonth === -1) {
      this.currentMonth = 11;
      this.currentYear--;
    }
    this.createNewCalendarCard()
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
    this.calendarData[this.fullDate][index] = input.checked ? 1 : 0
  }
  isChecked(index) {
    if (this.calendarData[this.fullDate][index] === 1) {
      return Habit.TASK_CHECKED;
    }
  }
  countCheckedChechboxes() {
    return this.calendarData[this.fullDate].reduce((acc, cur) => acc + cur);
  }
}

Date.prototype.addDays = addDays;
Date.prototype.addMonths = addMonths;
Date.prototype.subtractDays = subtractDays;
Date.prototype.subtractMonths = subtractMonths;
Date.prototype.biggerThan = biggerThan;
Date.prototype.lowerThan = lowerThan;
Date.prototype.getWeekDay = getWeekDay;
Date.prototype.equalThan = equalThan;
Date.prototype.setTimeFrom = setTimeFrom;
Date.prototype.daysBetween = daysBetween;
Date.prototype.daysInMonth = daysInMonth;
Date.prototype.getCompleteDate = getCompleteDate;
Date.prototype.getCompleteTime = getCompleteTime;
Date.prototype.getCompleteDateTime = getCompleteDateTime;
Date.prototype.getStringDay = getStringDay;
Date.prototype.getStringMonth = getStringMonth;
Date.prototype.getStringDate = getStringDate;

const weekDays = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

interface Date {
  addDays: typeof addDays;
  addMonths: typeof addMonths;
  subtractDays: typeof subtractDays;
  subtractMonths: typeof subtractMonths;
  biggerThan: typeof biggerThan;
  lowerThan: typeof lowerThan;
  getWeekDay: typeof getWeekDay;
  getCompleteDate: typeof getCompleteDate;
  getCompleteTime: typeof getCompleteTime;
  getStringDay: typeof getStringDay;
  getStringMonth: typeof getStringMonth;
  getStringDate: typeof getStringDate;
  getCompleteDateTime: typeof getCompleteDateTime;
  equalThan: typeof equalThan;
  setTimeFrom: typeof setTimeFrom;
  daysBetween: typeof daysBetween;
  daysInMonth: typeof daysInMonth;
}

function getStringDay() {
  return weekDays[this.getDay()];
}

function getStringMonth() {
  return months[this.getMonth()];
}

function getStringDate() {
  return this.getStringDay() + ' ' +
    (this.getDate() + 1) + ' de ' + 
    this.getStringMonth() + ' del ' + 
    this.getFullYear();
}

function addDays(days: number) {
  this.setDate(this.getDate() + days);
}

function addMonths(months: number) {
  this.setMonth(this.getMonth() + months);
}

function subtractDays(days: number) {
  this.setDate(this.getDate() - days);
}

function subtractMonths(months: number) {
  this.setMonth(this.getMonth() - months);
}

function biggerThan(date: Date) {
  return date === undefined ? false : this > date;
}

function lowerThan(date: Date) {
  return date === undefined ? false : this < date;
}

function equalThan(date: Date) {
  return date === undefined ? false : +this === +date;
}

function getWeekDay(): string {
  return weekDays[this.getDay()];
}

function getCompleteDate() {
  return this.getFullYear() + '-' + padNumber(this.getMonth() + 1) + '-' + this.getDate();
}

function getCompleteTime() {
  return padNumber(this.getHours()) + ':' + padNumber(this.getMinutes()) + ':' + padNumber(this.getSeconds());
}

function getCompleteDateTime() {
  return this.getCompleteDate() + ' ' + this.getCompleteTime();
}

function daysBetween(date: Date): number {
  this.setTimeFrom(date);

  const t1 = this.getTime();
  const t2 = date.getTime();

  return (t2 - t1) / (24 * 3600 * 1000);
}

function daysInMonth() {
    return new Date(this.getFullYear(), this.getMonth() + 1, 0).getDate();
}

/**
 * Sets the hours, minutes, seconds and millisecons from date given.
 * It can be usefull to compare to date that it is not neccessary to know the time.
 *
 * @param date Date to set from
 */
function setTimeFrom(date: Date) {
  this.setHours(date.getHours());
  this.setMinutes(date.getMinutes());
  this.setSeconds(date.getSeconds());
  this.setMilliseconds(date.getMilliseconds());
}

// extra methods
function padNumber(number: string) {
  return ('00' + number).slice(-2);
}

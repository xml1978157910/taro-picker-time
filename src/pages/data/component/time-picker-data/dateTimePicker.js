var getDaysInOneMonth = function (year, month) {
  let _month = parseInt(month, 10);
  let d = new Date(year, _month, 0);
  return d.getDate();
}
var dateDate = function (date) {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  return {
    year, month, day, hours, minutes
  }
}
var dateTimePicker = function (startyear, endyear) {
  // 获取date time  年份，月份，天数，小时，分钟推后30分
  const years = [];
  for (let i = startyear; i <= endyear; i++) {
    years.push({
      name: i + '年',
      id: i
    });
  }
  return function (_year, _month, _day, _hour, _minute) {
    const months = [];
    const days = [];
    const hours = [];
    const minutes = [];
    _year = parseInt(_year);
    _month = parseInt(_month);
    _day = parseInt(_day);
    _hour = parseInt(_hour);
    _minute = parseInt(_minute);
    //获取月份
    for (let i = _month; i <= 12; i++) {
      if (i < 10) {
        i = "0" + i;
      }
      months.push({
        name: i + '月',
        id: i
      });
    }
    //获取日期
    for (let i = _day; i <= getDaysInOneMonth(_year, _month); i++) {
      if (i < 10) {
        i = "0" + i;
      }
      days.push({
        name: i + '日',
        id: i
      });
    }
    //获取小时
    for (let i = _hour; i < 24; i++) {
      if (i < 10) {
        i = "0" + i;
      }
      hours.push({
        name: i + '时',
        id: i
      });
    }
    //获取分钟
    for (let i = _minute; i < 60; i++) {
      if (i < 10) {
        i = "0" + i;
      }
      minutes.push({
        name: i + '分',
        id: i
      });
    }
    return [years, months, days, hours, minutes];
  }
}
export {
  dateTimePicker,
  getDaysInOneMonth,
  dateDate
}
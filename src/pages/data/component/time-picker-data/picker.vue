<template>
  <picker
    mode="multiSelector"
    :range-key="'name'"
    :value="timeIndex"
    :range="activityArray"
    :disabled="disabled"
    @change="bindMultiPickerChange"
    @columnChange="bindMultiPickerColumnChange"
  >
    <slot />
  </picker>
</template>
<script>
import { dateTimePicker, dateDate } from "./dateTimePicker.js";
export default {
  props: {
    startTime: {
      type: [Object,Date],
      default: new Date(),
    },
    endTime: {
      type: [Object,Date],
      default: new Date(),
    },
    defaultTime: {
      type: [Object,Date],
      default: new Date(),
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      timeIndex: [0, 0, 0, 0, 0],
      activityArray: [],
      year: 0,
      month: 1,
      day: 1,
      hour: 0,
      minute: 0,
      datePicker: "",
    };
  },
  computed: {
    timeDate() {
      const { startTime, endTime } = this;
      return { startTime, endTime };
    },
  },
  watch: {
    timeDate() {
      this.initData();
    },
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      let startTime = this.startTime;
      let endTime = this.endTime;
      this.datePicker = dateTimePicker(
        startTime.getFullYear(),
        endTime.getFullYear()
      );
      this.setDateData(this.startTime);
      // 初始时间
      this.initTime();
      // 初始索引
    },
    initTime() {
      this.year = this.activityArray[0][0].id;
      this.month = this.activityArray[1][0].id;
      this.day = this.activityArray[2][0].id;
      this.hour = this.activityArray[3][0].id;
      this.minute = this.activityArray[4][0].id;
    },
    setDateData(_date) {
      let _data = dateDate(_date);
      this.activityArray = this.datePicker(
        _data.year,
        _data.month,
        _data.day,
        _data.hours,
        _data.minutes
      );
      // console.log(this.activityArray);
    },
    bindMultiPickerChange(e) {
      console.log("picker发送选择改变，携带值为", e.detail.value);
      let activityArray = JSON.parse(JSON.stringify(this.activityArray)),
        { value } = e.detail,
        _result = [];
      for (let i = 0; i < value.length; i++) {
        _result[i] = activityArray[i][value[i]].id;
      }
      this.$emit("result", _result);
    },
    bindMultiPickerColumnChange(e) {
      console.log("修改的列为", e.detail.column, "，值为", e.detail.value);
      let _data = JSON.parse(JSON.stringify(this.activityArray)),
        timeIndex = JSON.parse(JSON.stringify(this.timeIndex)),
        { column, value } = e.detail,
        _value = _data[column][value].id,
        _year = this.startTime.getFullYear(),
        _endYear = this.endTime.getFullYear(),
        _month = parseInt(this.startTime.getMonth() + 1),
        _day = parseInt(this.startTime.getDay()),
        _minute = parseInt(this.startTime.getMinutes());
      switch (e.detail.column) {
        case 0:
          this.year = _value;
          if (value === 0) {
            //选择第一年 注意初始时间
            this.setDateData(this.startTime);
          } else if (value === _data[0].length - 1) {
            // 选择最后一年设置截止时间
            this.setDateData(this.endTime);
          } else {
            this.activityArray = this.datePicker(_value, 1, 1, 0, 0);
          }
          timeIndex = [value, 0, 0, 0, 0];
          this.timeIndex = timeIndex;
          break;
        case 1:
          // 月份选择器 当年份为第一年和最后一年的时候需要注意
          this.month = _value;
          this.timeIndex = JSON.parse(
            JSON.stringify([timeIndex[0], value, 0, 0, 0])
          );
          if (this.year == _year && value === 0) {
            this.setDateData(this.startTime);
          } else if (this.year == _endYear && value === 0) {
            this.setDateData(this.endTime);
          } else {
            _data[2] = this.datePicker(this.year, this.month, 1, 0, 0)[2];
            _data[3] = this.datePicker(this.year, this.month, 1, 0, 0)[3];
            _data[4] = this.datePicker(this.year, this.month, 1, 0, 0)[4];
            this.activityArray = _data;
          }
          break;
        case 2:
          this.day = _value;
          this.timeIndex = JSON.parse(
            JSON.stringify([timeIndex[0], timeIndex[1], value, 0, 0])
          );
          if (this.year == _year && this.month == _month && value === 0) {
            this.setDateData(this.startTime);
          } else if (
            this.year == _endYear &&
            this.month == _month &&
            value === 0
          ) {
            this.setDateData(this.endTime);
          } else {
            _data[3] = this.datePicker(
              this.year,
              this.month,
              this.day,
              0,
              0
            )[3];
            _data[4] = this.datePicker(
              this.year,
              this.month,
              this.day,
              0,
              0
            )[4];
            this.activityArray = _data;
          }
          break;
        case 3:
          this.hour = _value;
          timeIndex[3] = value;
          timeIndex[4] = 0;
          this.timeIndex = timeIndex;

          if (
            this.year == _year &&
            this.month == _month &&
            this.day == _day &&
            value === 0
          ) {
            this.setDateData(this.startTime);
          } else if (
            this.year == _endYear &&
            this.month == _month &&
            this.day == _day &&
            value === 0
          ) {
            this.setDateData(this.endTime);
          } else {
            _data[4] = this.datePicker(
              this.year,
              this.month,
              this.day,
              this.hour,
              0
            )[4];
            this.activityArray = _data;
          }
          break;
        case 4:
          timeIndex[4] = value;
          this.timeIndex = timeIndex;
          break;
      }
    },
  },
};
</script>
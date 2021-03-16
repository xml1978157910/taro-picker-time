<template>
  <view class="page-body">
    <view class="page-section">
      <text>时间日期选择器-有默认</text>
      <view>
        <timePickerColumn
          :start-time="startTime"
          :end-time="endTime"
          :default-time="defaultTime"
          @result="onResult"
        >
          <input
            placeholder="请选择"
            :value="time"
          >
        </timePickerColumn>
      </view>
    </view>
  </view>
</template>

<script>
import timePickerColumn from "./component/time-picker-column/picker";
export default {
  components:{
    timePickerColumn
  },
  data() {
    return {
      time:'',
      startTime: new Date(),
      endTime: new Date(),
      default:new Date(),
    };
  },
  created(){
     this.startTime = this.getTime("min", 1);
      this.endTime = this.getTime("year", 2);
      this.defaultTime = this.getTime("min", 30);
  },
  methods: {
      getTime(key, number, date) {
      let _date = date ? new Date(date) : new Date();
      if (key === "min") {
        _date.setMinutes(_date.getMinutes() + number);
      }
      if (key === "hour") {
        _date.setHours(_date.getHours() + number);
      }
      if (key === "year") {
        _date.setFullYear(_date.getFullYear() + number);
      }
      return _date;
    },
    onResult(arr) {
      let time =
        arr[0] + "-" + arr[1] + "-" + arr[2] + " " + arr[3] + ":" + arr[4];
        this.time = time;
    },
  },
};
</script>
<style lang="less">
@import url('./index.less');
</style>
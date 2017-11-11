<template>
  <div class="uk-width-1-1 container">
    <div class="uk-float-left uk-width-1-10 left">
      Legend View
    </div>
    <div class="uk-float-right uk-width-9-10 right">
      <div class="uk-width-1-1 timelineTop">
      </div>
      <div class="uk-width-1-1 timelineBottom">
      </div>
    </div>
  </div>
</template>
<script>
//  import {month, sensor, chemical, factory} from '../vuex/getters'
//  import {switchMonth, switchChemical, switchFactory, switchSensor, addSCTChart, addDiffChart, addSCTCharts} from '../vuex/actions'
//  import config from '../commons/config'
  import $ from 'jquery'
  import * as d3 from 'd3'
  // import barchart from '../../plugins/barchart.js'
  import {daysta, minutesta, curtime, slidingwindowsize, timelineTopRange} from '../vuex/getters'
  import { setTimelineTopRange, setCurtime, setSlidingwindowsize } from '../vuex/actions'
  import barchart from '../charts/BarChart'
  export default {
    vuex: {
      getters: { daysta, minutesta, curtime, slidingwindowsize, timelineTopRange },
      actions: { setTimelineTopRange, setCurtime, setSlidingwindowsize }
    },
    watch: {
      daysta: {
        deep: true,
        handler () {
//          console.log(111, this.daysta[0])
          let data = this.changeDataFormat(this.daysta)
//          console.log(data)
//          console.log(this.curtime)
//          console.log(this.slidingwindowsize)
//          console.log('this.timelineTopRange', this.timelineTopRange)
          this.initParamBottom('timelineBottom', this.timelineTopRange, data)
        }
      },
      minutesta: {
        deep: true,
        handler () {
          let data = this.dataFilter(this.minutesta, this.timelineTopRange)
          data = this.changeDataFormat(data)
          this.initParamTop('timelineTop', [this.timelineTopRange[0] - this.slidingwindowsize, this.timelineTopRange[0]], data)
        }
      },
      timelineTopRange: {
        deep: true,
        handler () {
//          console.log('this.timelineTopRange', this.timelineTopRange)
          let data = this.dataFilter(this.minutesta, this.timelineTopRange)
          data = this.changeDataFormat(data)
          this.initParamTop('timelineTop', [this.timelineTopRange[0] - this.slidingwindowsize, this.timelineTopRange[0]], data)
        }
      }
    },
    data () {
      return {
      }
    },
    methods: {
      init () {
        console.log(111, this.daysta)
        window.d3 = d3
      }
    },
    ready () {
      this.init()
    }
  }
</script>
<style lang="less" scoped>
  .container {
    height: 100%;
    width: 100%;
    border: 1px solid #9e9c9c;
    .left {
      height: 100%;
    }
    .right {
      height: 100%;
    }
    .element {
      position: relative;
      color: white !important;
    }

    .timelineTop {
      height: 50%;
      color:red;
      border: 1px solid #9e9c9c;
    }
    .timelineBottom {
      height: 50%;
      border: 1px solid #9e9c9c;
      /*text {*/
        /*font-family: Arial, Helvetica, sans-serif;*/
        /*font-size: 12px;*/
        /*color: white !important;*/
        /*fill: white !important;*/
      /*}*/
      /*path, line {*/
        /*stroke: #999;*/
      /*}*/
      /*.axis text{*/
        /*fill: white !important;*/
      /*}*/
    }

  }
</style>

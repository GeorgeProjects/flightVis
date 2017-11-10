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
  import barchart from '../charts/BarChart'
  export default {
    vuex: {
      getters: { daysta, minutesta, curtime, slidingwindowsize, timelineTopRange }
      // actions: { switchMonth, switchChemical, switchFactory, switchSensor, addSCTChart, addDiffChart, addSCTCharts }
    },
    watch: {
      daysta: {
        deep: true,
        handler () {
          console.log(111, this.daysta[0])
          let data = this.changeDataFormat(this.daysta)
          console.log(data)
          console.log(this.curtime)
          console.log(this.slidingwindowsize)
          console.log('this.timelineTopRange', this.timelineTopRange)
          this.initParam('timelineBottom', this.timelineTopRange, data)
        }
      },
      minutesta: {
        deep: true,
        handler () {
          console.log('this.minutesta', this.minutesta)
          let data = this.dataFilter(this.minutesta, this.timelineTopRange)
          data = this.changeDataFormat(data)
          console.log('data', data)
          this.initParam('timelineTop', [this.timelineTopRange[0] - this.slidingwindowsize, this.timelineTopRange[0]], data)
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
      },
      dataFilter (data, timelineTopRange) {
        let sTime = timelineTopRange[0]
        let eTime = timelineTopRange[1]
        let filterData = []
        for (var i = 0; i < data.length; i++) {
          if (data[i].time >= sTime && data[i].time < eTime) {
            filterData.push(data[i])
          }
        }
        return filterData
      },
      changeDataFormat (data) {
        return data.map(function (d) {
          return {
            x: d.time,
            y1: d.arrNum,
            y2: d.arrTrajNum,
            y3: d.arrCDMNum,
            y4: d.depNum,
            y5: d.depTrajNum,
            y6: d.depCDMNum
          }
        })
      },
      initParam (content, timelineTopRange, data) {
        self.content = '.' + content
        let height = $(self.content).outerHeight()
        let width = $(self.content).outerWidth()

        let barchart1 = barchart()
          .width(width) // svg width
          .height(height) // svg height
          .start_brush_range(timelineTopRange) // the initial sliding window range
          .yTickNum(3) // x-tick interval number
          .xTickNum(10) // x-tick interval number
          // .xLabel('#time') // x-axis title
          .bar_color(['#d14745', '#fb6a4a', '#fcae91', '#29aae3', '#9ecae1', '#c6dbef'])
          // .yLabel('#flight') // y=axis tiltle
//          .bar_interval(0.5) // the interval pixel number between bars
          .enable_brush(true) // whether add brushing bar function
          .brush_trigger(function(brush_range) {
            console.log(brush_range)
          })

        let svg = d3.select(self.content)
          .append('svg')
          .attr('width', width)
          .attr('height', height)

        let g1 = svg.append('g')
          .data([data])
          .call(barchart1)
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

    /*path.area {*/
      /*fill: #e7e7e7;*/
    /*}*/
    /*.axis {*/
      /*shape-rendering: crispEdges;*/
    /*}*/
    /*.x.axis .minor {*/
      /*stroke-opacity: 0.5;*/
    /*}*/
    /*.x.axis path {*/
      /*display: none;*/
    /*}*/
    /*.y.axis line,*/
    /*.y.axis path {*/
      /*fill: none;*/
      /*stroke: #000;*/
    /*}*/
  }
</style>

<template>
  <div class="uk-width-1-1 container">
    <div class="uk-float-left uk-width-1-10 left">
      <div id = 'timelineControl'>
        <div id = 'controlBtn'>
          <div id ="timePlay">
            <button type="button" id="button_play" class="btn btn-xs" >
              <i class="fa fa-play fa-lg"></i>
            </button>
          </div>
          <div class="dropdown" id = 'playSpeedDropdown' style="z-index:1">

            <button class="btn btn-default dropdown-toggle btn-xs" type="button" style="z-index:1000" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
              x 500
              <span class="caret"></span>
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
              <li><a value = "1">x 1</a></li>
              <li><a value = "5">x 5</a></li>
              <li><a value = "20">x 20</a></li>
              <li><a value = "100">x 100</a></li>
              <li><a value = "500">x 500</a></li>
            </ul>
          </div>
          <div class="dropdown" display="none" id = "slidingWindowSizeDropdown" style="z-index:1">
            <button class="btn btn-default dropdown-toggle btn-xs" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
              30Min
              <span class="caret"></span>
            </button>
            <ul class="dropdown-menu col-xs-12" aria-labelledby="dropdownMenu1">
              <li ><a value = "0.0001">0Min</a></li>
              <li ><a  value = "10">10Min</a></li>
              <li ><a  value = "20">20Min</a></li>
              <li ><a  value = "30">30Min</a></li>
              <!-- <li ><a  value = "1440">全部</a></li> -->
            </ul>
          </div>
        </div>
        <div id = 'legend' style="z-index:-1">
        </div>
        <div id = 'fontBtn' style="z-index:-1">
          <button type="button" id="button_week_backward" class="btn btn-xs" >
            <i class="glyphicon glyphicon-fast-backward"></i>
          </button>

          <button type="button" id="button_day_backward" class="btn btn-xs" >
            <i class="glyphicon glyphicon-step-backward"></i>
          </button>

          <button type="button" id="button_day_forward" class="btn btn-xs" >
            <i class="glyphicon glyphicon-step-forward"></i>
          </button>

          <button type="button" id="button_week_forward" class="btn btn-xs" >
            <i class="glyphicon glyphicon-fast-forward"></i>
          </button>

        </div>
      </div>
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
//  import '../../plugins/bootstrap/css/bootstrap.css'
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
      initParamTop (content, timelineTopRange, data) {
        let self = this
        content = '.' + content
        $(content).empty()
        let height = $(content).outerHeight()
        let width = $(content).outerWidth()

        let barchart1 = barchart()
          .width(width) // svg width
          .height(height) // svg height
          .start_brush_range(timelineTopRange) // the initial sliding window range
          .yTickNum(3) // x-tick interval number
          .xTickNum(10) // x-tick interval number
          // .xLabel('#time') // x-axis title
          .bar_color(['#d14745', '#fb6a4a', '#fcae91', '#29aae3', '#9ecae1', '#c6dbef'])
          // .yLabel('#flight') // y=axis tiltle
          // .bar_interval(0.5) // the interval pixel number between bars
          .enable_brush(true) // whether add brushing bar function
          .brush_trigger(function(brush_range) {
            console.log('brush_range', brush_range)
            self.setCurtime(brush_range[1])
            self.setSlidingwindowsize(brush_range[1] - brush_range[0])

          })
        let svg = d3.select(content)
          .append('svg')
          .attr('width', width)
          .attr('height', height)
        svg.append('g')
          .data([data])
          .call(barchart1)
      },
      initParamBottom (content, timelineTopRange, data) {
        let self = this
        content = '.' + content
        let height = $(content).outerHeight()
        let width = $(content).outerWidth()

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
            self.setTimelineTopRange(brush_range)
          })
        let svg = d3.select(content)
          .append('svg')
          .attr('width', width)
          .attr('height', height)
        svg.append('g')
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
      width:8em;
      height: 100%;
    }
    .right {
      width: calc(~"100% - 8em");
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
    }
    #timelineControl{
      position:absolute;
      /*top:calc(~"50% - 5.5em");*/
      left:1em;
      height:100%;
      width:8em;
      float:left;
      #controlBtn{
        position:absolute;
        top:0em;
        left:0.7em;
        height:4em;
        width:100%;
        #timeplay{
          position: absolute;
          top:0px;
          left:0em;
        }
        #playSpeedDropdown{
          position: absolute;
          top:0px;
          left:2.1em;
        }
        #slidingWindowSizeDropdown{
          position: absolute;
          top:2em;
          left:1em;
        }
      }
      #legend{
        position:absolute;
        top:4em;
        height:5em;
        width:100%;
        text{
          font-size:0.8em
        }

      }
      #fontBtn{
        position:absolute;
        top:9.2em;
        left:0em;
        height:2em;
        width:100%;

        #button_week_backward{
          position: absolute;
          top:0px;
          left:0;
        }
        #button_day_backward{
          position: absolute;
          top:0px;
          left:2.1em;
        }
        #button_day_forward{
          position: absolute;
          top:0px;
          left:4.2em;
        }
        #button_week_forward{
          position: absolute;
          top:0px;
          left:6.3em;
        }

      }
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

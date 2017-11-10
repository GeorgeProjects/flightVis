<template>
    <!--<div class="loading" id = 'loading'>-->
        <!--<div class="back"></div>-->
        <!--<div class="logo">-->
            <!--<i class="fa fa-spinner fa-spin fa-lg"></i>-->
            <!--<span> Loading ...</span>-->
        <!--</div>-->
    <!--</div>-->
    <div id="App"
         class="uk-width-1-1"
         namespace="App">
        <!--<div class="uk-navbar uk-width-1-1">
          <b class="uk-navbar-brand app-title">Air Traffic Control Visual Analysis System</b>
        </div>-->
        <div class="uk-float-left uk-width-1-2" id="layoutLeft">
            <div class="app-top">
                <div class="uk-float-left app-title">
                    Air Traffic Control Visual Analysis System
                </div>
                <div class="area-map uk-width-1-1">
                    <!--<area-map></area-map>-->
                </div>
            </div>
            <div class="app-bottom">
                <time-line></time-line>
            </div>
        </div>
        <div class="uk-float-right uk-width-1-2" id="layoutRight">
            <div class="uk-float-left uk-width-1-5" id="fligtlistView">
                Flight List View
            </div>
            <div class="uk-float-left uk-width-2-5" id="containter1">
                <div id="pc-overviewView">
                    Parallel Coordinates & Overview View
                </div>
                <div id="projectionView">
                    High Dimensional Projection View
                </div>
            </div>
            <div class="uk-float-right uk-width-3-5" id="analysisView">
                <div id="glyph_view">
                    Glyph View
                </div>
                <div id="ganttaView">
                    Gantta Analysis View
                </div>
                <div id="significanceView">
                    Significance Analysis View
                </div>
            </div>
        </div>
    </div>
</template>
<!--<div class="time-line uk-width-1-1 uk-panel">-->
<!--  <area-map></area-map>
  <!--<div class= "{{ style['area']}}" id="{{ style['area-map']}}">
    <area-map :map-option="mapOption"></area-map>
  </div>-->
<!--</div>
<!--<div class="uk-width-1-1 full-height">
  <component :is="activeCal.comp"></component>
</div>-->
<!--</div>
<!--<div class="iso-map uk-width-1-2">
  <iso-map></iso-map>
</div>-->
<!--<div class="distribute uk-width-1-6 uk-panel-box">-->
<!--<distribute-view></distribute-view>-->
<!--</div>-->


<!--<div class="project uk-width-1-3 uk-panel">
  <project></project>
</div>
<div class="time-line uk-width-2-3 uk-panel">
  <time-line></time-line>
</div>-->

<!--::-webkit-scrollbar {-->
<!--width: @scrollbar-width;-->
<!--height: @scrollbar-height;-->
<!--}-->
<!--::-webkit-scrollbar-thumb {-->
<!--background: @scrollbar-fg-color;-->
<!--}-->
<!--::-webkit-scrollbar-track-piece {-->
<!--background: @scrollbar-bg-color;-->
<!--}-->
<!--<div id="SkyeyeTooltip"></div>-->

<script>
  import TimeLine from '../components/TimeLine.vue'
  import sensorData from '../data/sensor.json'
  import storage from '../commons/storage'
//  import Process from './dataProcess.worker'
  import banner from '../../assets/images/display.jpg'
  import {daySta, minuteSta, trajData, setSCTToken, setChemicalToken, setTimeToken, setCorrelation} from '../vuex/actions'
  import {selectedHour, timeLineState} from '../vuex/getters'
  import config from '../commons/config'

  let colorMap = config.colorMap

  export default{
    vuex: {
      actions: { daySta, minuteSta, trajData, setSCTToken, setChemicalToken, setTimeToken, setCorrelation },
      getters: {selectedHour, timeLineState}
    },
    components: { TimeLine },
    data () {
      return {
        banner,
        calenderView: [ {
          value: 'calendar',
          text: 'Calendar',
          comp: 'Calendar'
        }, {
          value: 'correlation',
          text: 'Correlation',
          comp: 'Correlation'
        } ],
        activeCal: {
          value: 'calendar',
          text: 'Calendar',
          comp: 'Calendar'
        },
        colorsArr: Object.keys(colorMap).map((d) => {
          return {
            name: d,
            color: colorMap[ d ]
          }
        })
      }
    },
    methods: {
      init () {
      },
      switchCalendar (op) {
        this.activeCal = op
      }
    },
    ready () {
      console.log('[APP]Analyze is ready !!!')
      this.$fLogs.info('[APP]Analyze is ready !!!')
//      if(loading)  {
//        //添加加载
//        $("#loading").removeClass("hidden");
//      }
//      else {
//        //去除加载
//        $("#loading").addClass("hidden");
//      }
    },
    init () {
      console.log('init')
    },
    created () {
//      let wk = new Process()
//      wk.postMessage({ sensorData })
//      wk.onmessage = (evt) => {
//        let { bySensor, byChemical, byTime, pearsonSameChemical, mdsArr, timesArr } = evt.data
//        mdsArr
//        timesArr
//        console.log(timesArr)
//        console.log(mdsArr)
//        let dataToken = storage.set(bySensor, 'sctData')
//        this.setSCTToken(dataToken)
//        let chemicalToken = storage.set(byChemical, 'byChemical')
//        this.setChemicalToken(chemicalToken)
//        let timeToken = storage.set(byTime, 'byTime')
//        this.setTimeToken(timeToken)
//
//        let pearsonToken = storage.set(pearsonSameChemical, 'pearsonSameChemical')
//        this.setCorrelation(pearsonToken)
//      }
      var self = this
      connectDB()
      getMonthSta(147525120000, 14832000000000)
      getDaySta('*')
      getCurtime(1481990400000, 1)

      function getCurtime(curtime, duration){
        /*
            Get current time traj number
            curtime: current time(13 bit timestamp)
            duration: duration time
        */
        var self = this
        var constraint = {};
        var formData = new FormData();
        constraint['databasetype'] = 'mongodb';
        constraint['datasetname'] = 'trajectory';
        constraint['curtime'] = curtime;
        constraint['duration'] = duration
        constraint=JSON.stringify(constraint)
        //console.log(constraint)

        //console.log('getCurtime sTime', new Date(curtime))
        //console.log('getCurtime eTime', new Date(curtime + duration*3600*1000))

        formData.append("constraint", constraint);

        var successGetPoints = function(response){
          console.log('get curtime trajectory');
          var data = response.data
          data = JSON.parse(data)
          console.log(data)
          window.CurtimeTrajData=data
          console.log(window.CurtimeTrajData)
        }

        //var start = new Date().getTime();
        sendUrl('POST', 'query/curtime', formData, 'curtimedata', '');
        //var end = new Date().getTime();//接受时间
        //return readCurtimeTrajData
        // console.log((end - start)+"ms");//返回函数执行需要时间
      }
      function getMonthSta (airport) {
        /*
            Get month sta. data
            stTime: start time(13 bit timestamp)
            enTime: end time(13 bit timestamp)
        */
        var constraint = {}
        var formData = new FormData()
        constraint['databasetype'] = 'mongodb'
        constraint['datasetname'] = 'dayStaMulti'
        constraint['airport'] = airport
        // constraint['enTime'] = enTime
        constraint = JSON.stringify(constraint)

        formData.append('constraint', constraint)

        var successGetPoints = function (response) {
          console.log('get MonthSta')
          var monthSta = JSON.parse(response.data)
          window.MonthSta = monthSta
          console.log(window.MonthSta)
        }

        sendUrl('POST', 'query/monthsta', formData, 'monthsta', '')
      }
      function getDaySta (dateTime) {
        /*
            Get day sta. data
            dateTime: day time(13 bit timestamp)
        */
        var constraint = {}
        var formData = new FormData()
        constraint['databasetype'] = 'mongodb'
        constraint['datasetname'] = 'minuteStaMulti'
        constraint['dateTime'] = dateTime
        constraint = JSON.stringify(constraint)
        formData.append('constraint', constraint)
        var successGetPoints = function (response) {
          console.log('get daySta')
          var daySta = JSON.parse(response.data)
          window.DaySta = daySta
          console.log(window.DaySta)
        }
        sendUrl('POST', 'query/daysta', formData, 'daysta', '')
      }

      function connectDB () {
        var formData = new FormData()
        formData.append('databasetype', 'mongodb')
        formData.append('dbName', 'flight')
        formData.append('port', 27066)
        formData.append('host', '192.168.10.9')
        var successFunc = function (response) {
          console.log('connect to DB')
        }
        sendUrl('POST', 'db/connect', formData, successFunc)
      }

      function sendUrl (PostType, Url, formData, v_id, v_task){
        Url = 'http://127.0.0.1:22028/' + Url

        if (PostType === 'GET') {

          if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest()
          } else{
            // code for IE6, IE5
            xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
          }

          xmlhttp.onreadystatechange = function(){
            // self.successPaperState(self);
            successPaperState();
          }
          xmlhttp.open(PostType, Url, true);
          xmlhttp.send(null);

        }else{
          $.ajax({
            url: Url,
            type: 'POST',
            dataType: 'JSON',
            data: formData,
            crossDomain: true,
            processData: false,
            contentType: false,
            success: function (response) {
              // console.warn(response.data)
              var data = response.data
              if (data) {
                if (v_id === 'cdm' || v_id === 'curtimedata' || v_id === 'curtimedatahistogram' || v_id === 'filterCircle' || v_id === 'callsign'){
                  // console.log(data)
                  data = JSON.parse(data.replace(/\bNaN\b/g, 'null'))
                  // data = JSON.parse(data)
                }
                else {
                  data = JSON.parse(data)
                }
                console.log('receive '+ v_id + ': ', data)
                switch(v_id){
                  case 'monthsta':
                    self.daySta(data['PEK'])
                    break
                  case 'daysta':
                    self.minuteSta(data['PEK'])
                    break
                  case 'curtimedata':
                    let trajData = data['trajData']
                    let airportSelected = 'PEK'
                    let arrTrajs = []
                    let depTrajs = []
                    trajData.forEach(function (d) {
                      try {
                        var origin = d['origin']['code']['iata']
                        var destination = d['destination']['code']['iata']
                        if (origin == airportSelected) {
                          depTrajs.push(d)
                        }
                        if (destination == airportSelected) {
                          arrTrajs.push(d)
                        }
                      } catch (e) {
                        if (airportSelected == 'PEK') {
                          if (d['arr'] == 1) {
                            arrTrajs.push(d)
                          }
                          if (d['arr'] ==0 ) {
                            depTrajs.push(d)
                          }
                        }
                      }
                    })
                    trajData = {'arrTrajs': arrTrajs, 'depTrajs': depTrajs}
                    console.log(trajData)
                    self.trajData(trajData)
                    break
                }

                // data = JSON.parse(data.replace(/\bNaN\b/g, "null"));
                // console.log('v_id',data)
                // self.trigger("dataCenter_DataReady", {data: data, id: v_id, task: v_task});
              }
            },
            error: function (jqXHR, textStatus, errorMessage) {
              console.log('errorMessage') // Optional
            }
          })
        }
      }
    }
  }
</script>
<style lang="less">
    @import "../commons/base.less";
    @import "../commons/base.vars.less";
    @title-h: 40px;
    @body-top-h: 80%;
    .hidden{
       display:none;
    }
    .loading{
        position:absolute;
        width:100%;
        height:100%;
        .back{
            position:absolute;
            width:100%;
            height:100%;
            background-color:black;
            opacity:0.1;
        }
        .logo{
            position:absolute;
            margin:50px auto;
            font-size:30px;
            text-align: center;
            left:45%;
            top:40%;
        }
    }
    #App {
        height: 100%;
        width: 200%;
        background-color: #111;
        color: white;
        overflow: hidden;
        #layoutLeft {
            height: 100%;
            .app-top {
                height: 80%;
                .app-title{
                    padding: 10px;
                }
                .area-map{
                    height:100%;
                }
            }
            .app-bottom {
                height: 20%;
            }
        }
        #layoutRight {
            height: 100%;
            border: 2px solid #9e9c9c;
            #fligtlistView {
                height: 100%;
                border: 1px solid #9e9c9c;
            }
            #containter1 {
                height: 100%;
                border: 1px solid #9e9c9c;
                .pc-overviewView {
                    height: 50%;
                }
                glyph_view {
                    height: 30%;
                }
                .projectionView {
                    height: 30%;
                }
                .significanceView {
                    height: 40%;
                }
            }
            #analysisView {
                height: 100%;
                border: 1px solid #9e9c9c;
                .ganttaView {

                }
            }
        }
        // .app-down {
        //   margin-top: 8px;
        //   height: calc(~"39% - 20px - " @title-h);
        // }
        // .app-bottom-top {
        //   margin-top: calc(~"-38% + 40px");
        //   height: 100%;
        //   background: #fff;
        // }
        .clear-grid-margin {
            margin-left: 0;
        }
        .app-title {
            height: @title-h;
            width:auto;
            height:auto;
            color: #999;
            font-size: 1.5em;
            background: #000;
        }
        .full-height {
            height: 100%;
        }
        .legend {
            width: 550px;
            margin-top: 10px;
            .legend-item {
                height: 100%;
                width: 30px;
                border-radius: 10px;
            }
        }
    }
    #SkyeyeTooltip {
        position: fixed;
        z-index: 1010;
        line-height: @font-size-l;
        font-weight: bold;
        padding: @margin-m;
        color: #fff;
        border: 1px solid @color-bd;
        background: @color-card-bg;
    }
</style>

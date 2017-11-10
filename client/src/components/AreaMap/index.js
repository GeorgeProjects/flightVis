import style from './style.less'
import template from './template.html'
import d3 from 'd3'
import '../../../node_modules/leaflet/dist/leaflet.css'
// import D3SvgOverlay from '../../../node_modules/leaflet-d3-svg-overlay/L.D3SvgOverlay'
import 'leaflet'
import 'leaflet-d3-svg-overlay'
import '../../../node_modules/leaflet.heat/dist/leaflet-heat.js'
// import 'L.D3SvgOverlay'
// import D3SvgOverlay from '../../../node_modules/leaflet-d3-svg-overlay/node_modules/leaflet/dist/leaflet.js'
// import '../../../node_modules/leaflet-d3-svg-overlay/node_modules/leaflet/dist/leaflet.css'
// import '../../../node_modules/leaflet-d3-svg-overlay/node_modules/leaflet/dist/leaflet-src.js'

const L = window.L
console.log(window.L)
export default {
  template,
  // props: [ 'mapOption' ],
  data () {
    return {
      style,
      elId: `AreaMap-${(+new Date())}-${Math.random() * 100 * 1000 * 1000}`,
      mapOption: true
    }
  },
  watch: {
    mapOption () {
      // this.render()
      // this.initMap()
    }
  },
  methods: {
    render () {
      if (this.mapOption) {
        let latlng = L.latLng(40.076805, 116.588355) // location of Beijing
        // let svgLayers = {} // key is md5 or traj laycontainer
        let map = L.map(this.elId,
          {
            center: latlng,
            zoom: 4,
            attributionControl: false, // 不显示右下角的标记
            zoomControl: true, // 不显示放大缩小的按钮
            minZoom: 2,
            maxBounds: [[-90, -20], [90, 340]]
          })
        // let map = L.map(this.elId, { center: [ 40.076805, 116.588355 ], zoom: 8 })
        let accessToken = 'pk.eyJ1IjoieWV0YW5nemhpIiwiYSI6ImNpajFrdmJ1aDAwYnF0b2x6cDA2bndybjgifQ.g9phAioL8kT5ik4jGg6kNQ'
        let style = 'dark' // emerald,light,dark
        let tileLayer = L.tileLayer('https://api.mapbox.com/v4/mapbox.' + style + '/{z}/{x}/{y}.png?access_token=' + accessToken).addTo(map)
        tileLayer.addTo(map)
        console.log(tileLayer)
        console.log(this.elId)
      }
    },
    initMap () {
      let latlng = L.latLng(40.076805, 116.588355) // location of Beijing
      // let svgLayers = {} // key is md5 or traj laycontainer
      let map = L.map('.map',
        {
          center: latlng,
          zoom: 8,
          attributionControl: false, // 不显示右下角的标记
          zoomControl: true, // 不显示放大缩小的按钮
          minZoom: 2,
          maxBounds: [[-90, -20], [90, 340]]
        })
      let accessToken = 'pk.eyJ1IjoieWV0YW5nemhpIiwiYSI6ImNpajFrdmJ1aDAwYnF0b2x6cDA2bndybjgifQ.g9phAioL8kT5ik4jGg6kNQ'
      let style = 'dark' // emerald,light,dark
      let tileLayer = L.tileLayer('https://api.mapbox.com/v4/mapbox.' + style + '/{z}/{x}/{y}.png?access_token=' + accessToken)
      tileLayer.addTo(map)
      map.scrollWheelZoom.disable()
    }
  },
  ready () {
    this.render()
  }
}


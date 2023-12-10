<script setup>
import HeatJson from '@/assets/testData/T.json'
import {onMounted, ref} from "vue";
import IconDropDown from "@/components/IconDropDown.vue";
import IconTime from "@/components/IconTime.vue";
import icon0 from "@/assets/png/whiteIcon/icon0.png";
import icon1 from "@/assets/png/whiteIcon/icon1.png";
import icon2 from "@/assets/png/whiteIcon/icon2.png";
import icon3 from "@/assets/png/whiteIcon/icon3.png";
import temperature0 from "@/assets/png/whiteIcon/Vector@2x(4).png"
import temperature1 from "@/assets/png/whiteIcon/Vector@2x(4).png"
import precipitation0 from "@/assets/png/whiteIcon/Vector@2x.png"
import precipitation1 from "@/assets/png/whiteIcon/Vector@2x.png"
import windSpeed0 from "@/assets/png/whiteIcon/Vector@2x(1).png"
import windSpeed1 from "@/assets/png/whiteIcon/Vector@2x(1).png"
import humidity0 from "@/assets/png/whiteIcon/Vector@2x(2).png"
import humidity1 from "@/assets/png/whiteIcon/Vector@2x(2).png"
import visibility0 from "@/assets/png/whiteIcon/Vector@2x(3).png"
import visibility1 from "@/assets/png/whiteIcon/Vector@2x(3).png"
import dataR0 from "@/assets/png/whiteIcon/dataR.png";
import dataR1 from "@/assets/png/whiteIcon/dataR.png";
import qiehuan0 from "@/assets/png/whiteIcon/qiehuan1.png";
import qiehuan1 from "@/assets/png/whiteIcon/qiehuan1.png";
import daqiya0 from "@/assets/png/whiteIcon/大气压力.png";
import daqiya1 from "@/assets/png/whiteIcon/大气压力.png";
import zhenfeng0 from "@/assets/png/whiteIcon/阵风.png";
import zhenfeng1 from "@/assets/png/whiteIcon/阵风.png";
import {getServerData} from "@/axios/api";
import {output_windData} from "@/tools.js";

const VW = (w) => {
  return (w / 16) + 'em'
}
const VH = (h) => {
  return (h / 16) + 'em'
}

let map = ref(null)

const controlList = [
  {
    id: 0, icon: icon0, iconW: VW(20), iconH: VH(15.5), fn: () => {
    }
  },
  {id: 1, icon: icon1, iconW: VW(20), iconH: VH(20), fn: () => exitFullscreenOrFullscreen()},
  {id: 2, icon: icon2, iconW: VW(20), iconH: VH(20), fn: () => zoomControl('+')},
  {id: 3, icon: icon3, iconW: VW(20), iconH: VH(4), fn: () => zoomControl('-')},
]
const optionsList = ref([
  {
    id: 0,
    name: '多源设备数据融合',
    icon0: dataR0,
    icon1: dataR1,
    iconW: VW(20),
    iconH: VH(20),
    typeName: '',
    value: '',
    defaultOption: 'X波段天气雷达',
    childrenOptionsList: [
      {
        value: 'X波段天气雷达',
        label: 'X波段天气雷达',
      },
      {
        value: 'S波段天气雷达',
        label: 'S波段天气雷达',
      },
      {
        value: '边界层风廊线雷达',
        label: '边界层风廊线雷达',
      },
      {
        value: '对流层风廓线雷达',
        label: '对流层风廓线雷达',
      },
      {
        value: '毫米波云雷达',
        label: '毫米波云雷达',
      },
      {
        value: '毫米波测风雷达',
        label: '毫米波测风雷达',
      },
      {
        value: '激光测风雷达',
        label: '激光测风雷达',
      },
      {
        value: '自动气象站',
        label: '自动气象站',
      },
      {
        value: '风云四号卫星',
        label: '风云四号卫星',
      },
      {
        value: '葵花八号卫星',
        label: '葵花八号卫星',
      },
      {
        value: '探空',
        label: '探空',
      },
      {
        value: '机载X波段气象雷达',
        label: '机载X波段气象雷达',
      },
      {
        value: '机载Ka波段气象雷达',
        label: '机载Ka波段气象雷达',
      },
    ],
    fn: () => {
      // console.log('0')
    }
  },
  {
    id: 1,
    name: '预报技术',
    icon0: qiehuan0,
    icon1: qiehuan1,
    iconW: VW(20),
    iconH: VH(20),
    typeName: '',
    value: '',
    defaultOption: '',
    childrenOptionsList: [
      {
        value: '数值模式',
        label: '数值模式',
      },
      {
        value: '人工智能',
        label: '人工智能',
      },
    ],
    fn: () => {
      // console.log('0')
    }
  },
  {
    id: 2, name: '风速', icon0: windSpeed0, icon1: windSpeed1, iconW: VW(15), iconH: VH(14),
    typeName: '高度：',
    value: '',
    childrenOptionsList: [
      {
        value: '地上10米',
        label: '地上10米',
      },
      {
        value: '地上100米',
        label: '地上100米',
      },
      {
        value: '地上250米',
        label: '地上250米',
      },
      {
        value: '950百帕，500米',
        label: '950百帕，500米',
      },
      {
        value: '925百帕，750米',
        label: '925百帕，750米',
      },
      {
        value: '900百帕，1000米',
        label: '900百帕，1000米',
      },
      {
        value: '850百帕，1500米',
        label: '850百帕，1500米',
      },
      {
        value: '800百帕，2000米',
        label: '800百帕，2000米',
      },
      {
        value: '750百帕，2500米',
        label: '750百帕，2500米',
      },
      {
        value: '700百帕，3000米',
        label: '700百帕，3000米',
      },
      {
        value: '650百帕，3600米',
        label: '650百帕，3600米',
      },
      {
        value: '600百帕，4200米',
        label: '600百帕，4200米',
      },
      {
        value: '500百帕，5500米',
        label: '500百帕，5500米',
      },
      {
        value: '300百帕，9000米',
        label: '300百帕，9000米',
      },
      {
        value: '200百帕，12000米',
        label: '200百帕，12000米',
      },
      {
        value: '10 hPa, 30000 m',
        label: '10 hPa, 30000 m',
      },
    ], fn: () => {
      // console.log('2')
    }
  },
  {
    id: 3,
    name: '阵风',
    icon0: zhenfeng0,
    icon1: zhenfeng1,
    iconW: VW(20),
    iconH: VH(20),
    typeName: '',
    value: '',
    defaultOption: '',
    childrenOptionsList: [
      {
        value: '每小时',
        label: '每小时',
      },
      {
        value: '开始于10-10 02:00',
        label: '开始于10-10 02:00',
      },
    ],
    fn: () => {
      // console.log('0')
    }
  },
  {
    id: 4,
    name: '气压',
    icon0: daqiya0,
    icon1: daqiya1,
    iconW: VW(20),
    iconH: VH(20),
    typeName: '',
    value: '',
    defaultOption: '',
    childrenOptionsList: null,
    fn: () => {
      // console.log('0')
    }
  },
  {
    id: 5,
    name: '温度',
    icon0: temperature0,
    icon1: temperature1,
    iconW: VW(8),
    iconH: VH(16),
    typeName: '高度：',
    value: '',
    defaultOption: '',
    childrenOptionsList: [
      {
        value: '海面',
        label: '海面',
      },
      {
        value: '地上100厘米',
        label: '地上100厘米',
      },
      {
        value: '地上2米',
        label: '地上2米',
      },
      {
        value: '异常，2 m',
        label: '异常，2 m',
      },
      {
        value: '950百帕，500米',
        label: '950百帕，500米',
      },
      {
        value: '925百帕，750米',
        label: '925百帕，750米',
      },
      {
        value: '900百帕，1000米',
        label: '900百帕，1000米',
      },
      {
        value: '850百帕，1500米',
        label: '850百帕，1500米',
      },
      {
        value: '800百帕，2000米',
        label: '800百帕，2000米',
      },
      {
        value: '750百帕，2500米',
        label: '750百帕，2500米',
      },
      {
        value: '700百帕，3000米',
        label: '700百帕，3000米',
      },
      {
        value: '650百帕，3600米',
        label: '650百帕，3600米',
      },
      {
        value: '600百帕，4200米',
        label: '600百帕，4200米',
      },
      {
        value: '500百帕，5500米',
        label: '500百帕，5500米',
      },
      {
        value: '300百帕，9000米',
        label: '300百帕，9000米',
      },
      {
        value: '200百帕，12000米',
        label: '200百帕，12000米',
      },
      {
        value: '10 hPa, 30000 m',
        label: '10 hPa, 30000 m',
      },
      {
        value: '冻结高度',
        label: '冻结高度',
      },
    ],
    fn: () => {
      console.log('0')
    }
  },
  {
    id: 6, name: '湿度', icon0: humidity0, icon1: humidity1, iconW: VW(14.5), iconH: VH(15),
    typeName: '湿度：',
    value: '',
    childrenOptionsList: [
      {
        value: '地上2米',
        label: '地上2米',
      },
      {
        value: '900百帕，1000米',
        label: '900百帕，1000米',
      },
      {
        value: '850百帕，1500米',
        label: '850百帕，1500米',
      },
      {
        value: '700百帕，3000米',
        label: '700百帕，3000米',
      },
      {
        value: '露点',
        label: '露点',
      },
    ], fn: () => {
      console.log('3')
    }
  },
  {
    id: 7, name: '降水量', icon0: precipitation0, icon1: precipitation1, iconW: VW(10), iconH: VH(14.5),
    typeName: '累积：',
    value: '',
    childrenOptionsList: [
      {
        value: '每小时',
        label: '每小时',
      },
      {
        value: '每3个小时',
        label: '每3个小时',
      },
      {
        value: '开始于10-10 08:00',
        label: '开始于10-10 08:00',
      },
      {
        value: '每月异常',
        label: '每月异常',
      },
    ], fn: () => {
      console.log('1')
    }
  },
  {
    id: 8, name: '能见度', icon0: visibility0, icon1: visibility1, iconW: VW(15.5), iconH: VH(9),
    typeName: '范围：',
    value: '',
    // childrenOptionsList: [
    //   {
    //     value: '10米',
    //     label: '10米',
    //   },
    //   {
    //     value: '20米',
    //     label: '20米',
    //   },
    //   {
    //     value: '50米',
    //     label: '50米',
    //   },
    //   {
    //     value: '100米',
    //     label: '100米',
    //   },
    //   {
    //     value: '500米',
    //     label: '500米',
    //   },
    // ],
    childrenOptionsList: null,
    fn: () => {
      console.log('4')
    }
  },
])

const zoomControl = (type) => {
  if (type === '+') {
    map.zoomIn()
  } else {
    map.zoomOut()
  }
}
//全屏切换

const exitFullscreenOrFullscreen = () => {
  if (document.fullscreenElement) {
    document.exitFullscreen()
  } else {
    document.documentElement.requestFullscreen()
  }
}

function initDemoMap() {
  const Esri_WorldImagery = L.tileLayer(
      "http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      {
        // attribution:
        //     "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, " +
        //     "AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
      }
  );

  const Esri_DarkGreyCanvas = L.tileLayer(
      "http://{s}.sm.mapstack.stamen.com/" +
      "(toner-lite,$fff[difference],$fff[@23],$fff[hsl-saturation@20])/" +
      "{z}/{x}/{y}.png",
      {
        // attribution:
        //     "Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, " +
        //     "NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community"
      }
  );

  const BlackLayer = L.tileLayer(
      'http://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png',
      {
        // attribution: 'OSM & Carto',
        subdomains: 'abcd',
        maxZoom: 16,
        minZoom:3
      })

  const baseLayers = {
    Satellite: Esri_WorldImagery,
    "Grey Canvas": Esri_DarkGreyCanvas,
    "Black Style": BlackLayer
  }

  const data = output_windData()


  map = L.map('map', {
    //   center: [39.90403, 116.407526],
    attributionControl: false,//版权控件添加到地图中
    zoomControl: false, //缩放控件添加到地图中
    layers: [BlackLayer],
    zoom: 10,
  }).setView(data.latLon_Info.uInfo.center, 4)

  const layerControl = L.control.layers(baseLayers);
  //TODO layer控制器
  // layerControl.addTo(map);

  return {
    map: map,
    layerControl: layerControl
  };
}


//地图层 风场动画

onMounted(() => {

  const mapStuff = initDemoMap();
  const map = mapStuff.map;
  const layerControl = mapStuff.layerControl;

  map.on('click', function (e) {
    console.log("🚀 ~ name:e ", e)
    // console.log("🚀 ~ name:velocityLayer ", velocityLayer)
    let vector = e.latlng;
    // let v = vector.magnitude().toFixed(2);
    // let d = vector.directionTo().toFixed(0);
    let html = (`经度：${vector.lng.toFixed(6)}，纬度：${vector.lat.toFixed(6)}`);
    let popup = L.popup()
        .setLatLng(e.latlng)
        .setContent(html)
        .openOn(map);

    // let html = (`${v} m/s to ${d}&deg`);
    // let popup = L.popup()
    //     .setLatLng(e.latlng)
    //     .setContent(html)
    //     .openOn(map);
  });


  fetch("assets/testData/202307211200.json")
      .then(response => response.json())
      .then(data => {
        console.log(data[0]['data'].length)
        const velocityLayer = L.velocityLayer({
          displayValues: true,//在地图上显示风速和方向
          displayOptions: { //用于配置显示选项的参数，包括风速类型、位置和无数据时的显示信息
            velocityType: "AAAA",
            position: "bottomleft",
            emptyString: "No wind data"
          },
          data: data,
          maxVelocity: 15,
          colorScale: ["rgb(255,41,243)"]
        });

        layerControl.addOverlay(velocityLayer, "风 - 全球");
        velocityLayer.addTo(map);
      })
      .catch(error => console.error(error));

  // getServerData({})
  //     // .then(response => response.json())
  //     .then(data => {
  //       console.log("🚀 ~ name:data ", data)
  //       const velocityLayer = L.velocityLayer({
  //         displayValues: true,//在地图上显示风速和方向
  //         displayOptions: { //用于配置显示选项的参数，包括风速类型、位置和无数据时的显示信息
  //           velocityType: "AAAA",
  //           position: "bottomleft",
  //           emptyString: "No wind data"
  //         },
  //         data: data.data,
  //         maxVelocity: 15,
  //         colorScale: ["rgb(255,255,255)"]
  //       });
  //
  //       velocityLayer.addTo(map);
  //     })
  //     .catch(error => console.error(error));
})

// 热力图层
const testData = {
  max: Math.max(...HeatJson.map(i => i.count)),
  data: HeatJson
};

const cfg = {
  // radius should be small ONLY if scaleRadius is true (or small radius is intended)
  // if scaleRadius is false it will be the constant radius used in pixels
  "radius": 2,
  "maxOpacity": .2,
  // scales the radius based on map zoom
  "scaleRadius": true,
  // if set to false the heatmap uses the global maximum for colorization
  // if activated: uses the data maximum within the current map boundaries
  //   (there will always be a red spot with useLocalExtremas true)
  "useLocalExtrema": true,
  // which field name in your data represents the latitude - default "lat"
  latField: 'lat',
  // which field name in your data represents the longitude - default "lng"
  lngField: 'lon',
  // which field name in your data represents the data value - default "value"
  valueField: 'count'
};
onMounted(() => {
  const heatmapLayer = new window.HeatmapOverlay(cfg)
  // heatmapLayer.addTo(map)
  heatmapLayer.setData(testData);
})

let selectedID = ref(6)
const selected = (id) => {
  selectedID.value = id
}
const value = ref('')

const date = ref(new Date())

let selectedTime = ref()

let svg = null
let svgWidth = null
let xScale = null
let old_xScale = null
let xAxis = null
let progress = null
let progressWidth = null//进度条长度
let circle = null
// 定义时间范围
let startDate = new Date('2020-01-01');
let endDate = new Date('2020-01-02');
let cx
let newDate = startDate

function createSVGChart() {

//获取svg
  svg = d3.select('.axis')
  // .attr('preserveAspectRatio', 'xMidYMid meet')
  // .attr('viewBox', '0 0 400 400')
  // 获取svg宽度
  svgWidth = svg.node().getBoundingClientRect().width;
  // 初始化时间比例尺
  xScale = d3.scaleTime()
      .domain([startDate, endDate])
      .range([20, svgWidth - 20]);

  // 创建D3时间轴
  xAxis = d3.axisBottom(xScale)
      .tickFormat(d3.timeFormat('%H:%M'))
      .tickPadding(10)
      .tickSizeOuter(0)
  // .ticks(20); // ticks刻度值的个数


// 渲染D3时间轴
  svg.append('g')
      .attr('transform', 'translate(0, 38)')
      .call(xAxis)
      .select('.domain')
      .style('stroke-width', '10px')
      .style('stroke', 'rgba(0,255,0,0)')
      .style('pointer-events', 'auto')
      .style('cursor', 'pointer')


  //隐藏刻度线
  svg.selectAll("line").style("display", "none");
  //文本颜色
  svg.selectAll("text").style("color", 'white');


  // 获取svg高度
  const svgHeight = svg.node().getBoundingClientRect().height;
// 添加黑色背景
  svg.insert('rect', ':first-child')
      .attr('x', 0)
      .attr('y', 34.5)
      .attr('width', svgWidth)
      .attr('height', 10)
      .style('fill', 'rgba(0,0,0,0.333)')
      .style('pointer-events', 'none');

//添加进度条
  progress = svg.append('rect')
      .attr('x', xScale(startDate))
      .attr('y', 36.5)
      .attr('width', 0)
      .attr('height', 6)
      .style('fill', '#2F80ED')
      .style('pointer-events', 'none')
  // 添加提示刻度线
  const tooltipTick = svg.append('line')
      .attr('x1', 0)
      .attr('y1', 25)
      .attr('x2', 0)
      .attr('y2', 34.5)
      .style('stroke', 'rgba(0,0,0,0.333)')
      .style('stroke-width', 2)
      .style('opacity', 0);
  // 添加圆点
  circle = svg.append('circle')
      .attr('cx', xScale(startDate))
      .attr('cy', 40)
      .attr('r', 8)
      .style('fill', 'white')
      .style('cursor', 'e-resize')
  // .style('pointer-events', 'none');

  // 鼠标点击事件
  circle.on('click', function () {
    console.log("🚀 ~ name:111", '111')
  });

  circle.on('mousemove', function () {

  });

  //点击事件 更新圆点以及进度条
  svg.select('g')
      .on('click', function (event) {
        cx = d3.pointer(event)[0];//位置
        newDate = xScale.invert(cx);//计算日期
        circle.attr('cx', xScale(newDate));//更新位置
        console.log("🚀 ~ name:cx ", cx)


        progressWidth = cx - xScale(startDate);
        progress.attr('width', progressWidth);
      });


// 拖动事件 更新圆点以及进度条
  circle.call(d3.drag()
      .on('drag', function (event) {
        cx = event.x;
        cx = Math.max(Math.min(cx, svgWidth - 20), 20); // 限制拖动范围在时间轴范围内
        d3.select(this).attr('cx', cx)//更新圆点

        newDate = xScale.invert(cx);
        progressWidth = xScale(newDate) - xScale(startDate);
        progress.attr('width', progressWidth);//更新进度条
      })
  );

  // 添加提示框
  const tooltip = svg.append('g')
      .attr('transform', 'translate(0, 35)');

  const tooltipRect = tooltip.append('rect')
      .attr('width', 60)
      .attr('height', 20)
      .attr('y', 5)
      .attr('rx', 10) // 设置圆角半径
      .attr('ry', 10) // 设置圆角半径
      .attr('fill', 'rgba(0,0,0,0.333)')
      .style('opacity', 0);

  const tooltipText = tooltip.append('text')
      .attr('x', 30)
      .attr('y', 20)
      .attr('text-anchor', 'middle')
      .text('')
      .style('opacity', 0)
      .style('fill', 'white')

// 鼠标悬停事件
  svg.select('.domain').on('mousemove', function (event) {

    // 计算提示框位置
    const mouseX = d3.pointer(event)[0];
    const x = mouseX - 30;

    // 计算并显示对应时间
    const date = xScale.invert(mouseX);
    tooltipText.text(d3.timeFormat('%H:%M')(date));

    // 显示提示框
    tooltip.attr('transform', `translate(${x}, 0)`);
    tooltipRect.style('opacity', 1);
    tooltipText.style('opacity', 1);
    // 显示刻度线
    tooltipTick.style('opacity', 1)
        .attr('transform', `translate(${mouseX}, 0)`);
  }).on('mouseout', function () {
    // 隐藏提示框
    tooltipRect.style('opacity', 0);
    tooltipText.style('opacity', 0);
    // 隐藏刻度线
    tooltipTick.style('opacity', 0);
  });
}

function updateSVGChart() {
  svgWidth = svg.node().getBoundingClientRect().width;
  // old_xScale = xScale
  xScale.range([20, svgWidth - 20]);//更新比例尺
  xAxis.ticks(Math.floor(svgWidth / 100));//更新刻度值显示个数

  //TODO 目前存在更新后字体颜色变黑问题 暂时用此方法解决
  svg.selectAll("text").style("color", 'white');
  //隐藏刻度线
  svg.selectAll("line").style("display", "none");

  svg.select('g').call(xAxis);//更新时间轴
  svg.select('rect').attr('width', svgWidth);//更新背景色长度
  //TODO 更新进度条
  progressWidth = xScale(newDate) - xScale(startDate);
  progress.attr('width', progressWidth);
  //TODO 更新圆点
  circle.attr('cx', xScale(newDate));//更新位置
}

// createSVGChart();

window.addEventListener('resize', updateSVGChart);

// window.addEventListener('resize', function() {
//   // 获取新的svg宽度
//   svgWidth = svg.node().getBoundingClientRect().width;
//
//   // 更新时间比例尺的范围
//   xScale.range([20, svgWidth - 20]);
//
//   // 获取圆点当前的日期
//   const currentDate = xScale.invert(parseFloat(circle.attr('cx')));
//
//   // 更新时间比例尺的域
//   xScale.domain([startDate, currentDate]);
//
//   // 更新x轴
//   xAxis.scale(xScale);
//   svg.select('g').call(xAxis);
//
//   // 更新黑色背景的宽度
//   svg.select('rect').attr('width', svgWidth);
//
//   // 更新圆点的位置
//   circle.attr('cx', xScale(currentDate));
//
//   // 更新进度条的宽度
//   const progressWidth = xScale(currentDate) - xScale(startDate);
//   progress.attr('width', progressWidth);
// });


onMounted(() => {
  // value.value = optionsList.value[0].childrenOptionsList[1].value
  createSVGChart()
})
// 模拟数据
const data222 = [
  {time: new Date('2020-01-01 12:00'), value: 10},
  {time: new Date('2020-01-01 18:00'), value: 20},
  //...
];

// 点击回调函数
//   function onclick(d) {
//     selectedTime.value = d;
//     // filterData();
//     // updateAxis();
//     // updateMap();
//   }

// // Leaflet地图和热力图层
//   const map = L.map('map').setView([51.505, -0.09], 13);
//
//   const heatLayer = L.heatLayer(data, {radius: 20}).addTo(map);
//
// // 数据过滤
//   function filterData() {
//     heatLayer.setLatLngs(data.filter(d => d.time > selectedTime.value));
//   }
//
// // 地图更新
//   function updateMap() {
//     map.invalidateSize();
//   }
//
// // 时间轴高亮
//   function updateAxis() {
//     // 高亮代码
//     svg.selectAll('.tick')
//         .attr('font-weight', d => d > selectedTime.value ? 'bold' : 'normal');
//   }
</script>

<template>
  <div class="heatmapWrapper">
    <canvas id="heatmap"></canvas>
  </div>
  <div id="map"></div>

  <div class="left-wrapper">
    <div class="item" :class="{ active: item.id ===selectedID  }" @click="selected(item.id);item.fn()"
         v-for="item in optionsList"
         :key="item.id">
      <div class="item_layout">
        <div class="icon-info">
          <img class="img" :style="{'width':item.iconW,'height':item.iconH}"
               :src="item.id ===selectedID?item.icon1:item.icon0" alt="">
        </div>
        <div class="bgColor">
          <span>{{ item.name }}</span>
        </div>
      </div>
      <div class="selectOptions" v-show="item.id ===selectedID&&item.childrenOptionsList">
        <div class="typeName"><span>{{ item.typeName }}</span></div>
        <!--                <el-select v-model="item.value" :placeholder="item.childrenOptionsList&&item.childrenOptionsList[0].value"-->
        <!--                           size="small" :suffix-icon="IconDropDown"-->
        <!--                >-->
        <!--                  <el-option-->
        <!--                      v-for="i in item.childrenOptionsList"-->
        <!--                      :key="i.value"-->
        <!--                      :label="i.label"-->
        <!--                      :value="i.value"-->
        <!--                  />-->
        <!--                </el-select>-->
        <el-select class="autoWidth-select" v-model="item.value"
                   :placeholder="item.childrenOptionsList&&item.childrenOptionsList[0].value"
                   :suffix-icon="IconDropDown"
        >
          <template slot="prefix">
            {{ (item.childrenOptionsList && item.childrenOptionsList.find(s => s.value === value) || {}).label }}
          </template>
          <el-option
              v-for="i in item.childrenOptionsList"
              :key="i.value"
              :label="i.label"
              :value="i.value">
          </el-option>
        </el-select>
      </div>
    </div>
  </div>

  <div class="right-wrapper">
    <div v-for="item in controlList" :key="item.id">
      <div class="item-wrapper" @click="item.fn()">
        <img class="img" :style="`width:${item.iconW};height:${item.iconH};`" :src="item.icon" alt="">
      </div>
    </div>
  </div>

  <div class="bottom-wrapper">
    <div class="playButton">
      <img class="img" src="@/assets/png/whiteIcon/Vector@2x(7).png" alt="">
      <span class="text">播放</span>
    </div>
    <div class="backButton">
      <img class="img" src="@/assets/png/whiteIcon/Vector@2x(5).png" alt="">
    </div>
    <div class="progressBar">
      <div id="dateBg" class="dateBg">
        <el-date-picker
            v-model="date"
            type="date"
            placeholder="请选择日期"
            :suffix-icon="IconTime"
        />
      </div>
      <div class="svg_container">
        <svg class="axis"></svg>
      </div>
    </div>
    <div class="gotoButton">
      <img class="img" src="@/assets/png/whiteIcon/Vector@2x(6).png" alt="">
    </div>
    <div id="settingButton" class="settingButton">
      <el-select v-model="value" class="m-2" placeholder="数值" placement="top" :suffix-icon="IconDropDown">
        <el-option
            v-for="item in [{value:'正常',label:'正常'},{value:'强',label:'强'},{value:'薄',label:'薄'},{value:'弱',label:'弱'},]"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
    </div>
  </div>
</template>

<style scoped lang="scss">
.heatmapWrapper {
  width: 100vw;
  height: 100vh;
  position: absolute;
  z-index: 999;
  opacity: 0.3;
}

#map {
  pointer-events: all;
  width: 100vw;
  height: 100vh;
}


.left-wrapper {
  cursor: pointer;
  z-index: 999;
  height: vh(500);
  position: absolute;
  //top: vh(285);
  top: 50vh;
  transform: translateY(-50%);
  left: vw(40);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 100%;

  .item {
    pointer-events: all;

    .item_layout {
      position: relative;

      .icon-info {
        position: absolute;
        width: vw(30);
        height: vh(30);
        border-radius: 50%;
        background: rgba(0, 0, 0, 0.5);
        //background: white;
        display: flex;
        justify-content: center;
        align-items: center;
        //position: relative;
        //z-index: 2;
        box-shadow: vh(3) 0 vh(5) vw(-3) rgba(0, 0, 0, .25);
      }

      .bgColor {
        //position: relative;
        //z-index: 1;
        //width: vw(105);
        //height: vh(30);
        box-shadow: 0 vw(1.5) vh(3) rgba(0, 0, 0, .25);
        text-shadow: vh(1) vw(1) vh(3) rgba(0, 0, 0, .4);
        background: rgba(0, 0, 0, 0.5);
        border-radius: vh(15);
        font-family: Microsoft YaHei-Regular, Microsoft YaHei;
        font-weight: 400;
        color: #FFFFFF;
        line-height: vh(14);
        letter-spacing: vw(1);
        //display: flex;
        //justify-content: center;
        //align-items: center;
        display: inline-block;
        padding: vh(8) vw(20) vh(8) vw(50);

        span {
          white-space: nowrap;
        }
      }

    }

    .selectOptions {
      width: vw(224);
      //display: inline-block;
      height: vh(32);
      background: rgba(0, 0, 0, 0.5);
      border-radius: rem(16);
      margin-top: vh(10);
      display: flex;
      font-size: rem(12);
      font-family: Microsoft YaHei-Regular, Microsoft YaHei;
      font-weight: 400;
      color: #FFFFFF;
      letter-spacing: vw(2);
      padding-left: vw(10);

      .typeName {
        //margin-right: vw(8);
        //margin-left: vw(10);
        font-size: rem(14);
        display: flex;
        align-items: center;
        white-space: nowrap;

        span {
          line-height: vh(14);
        }

      }

      ::v-deep(.el-input__wrapper) {
        background: #0000;
        //width: 140px;
        box-shadow: none;
      }

    }

    .bgColor:hover, .selectOptions:hover {
      background: rgba(0, 0, 0, 0.75);
    }
  }

  .item.active .icon-info {
    background: #1373eb;
  }

  .item.active .bgColor {
    background: rgba(19, 115, 235, 0.6);
  }
}


.right-wrapper {
  cursor: pointer;
  z-index: 999;
  position: absolute;
  top: vh(90);
  right: vw(40);
  width: vw(50);
  height: vh(332);
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .item-wrapper {
    pointer-events: all;
    width: vw(50);
    height: vh(50);
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;

    .img {
      width: vw(20);
      height: vh(20);
    }
  }
}

.bottom-wrapper {
  //width: vw(1840);
  width: 95.8333333333vw;
  cursor: pointer;
  pointer-events: all;
  z-index: 999;
  position: absolute;
  left: vw(40);
  bottom: vh(40);
  display: flex;
  //justify-content: space-between;
  align-items: center;

  .playButton {
    flex: none;
    width: vw(97);
    height: vh(30);
    background: rgba(0, 0, 0, 0.5);
    border-radius: vw(25);
    display: flex;
    align-items: center;
    margin-right: vw(69);
    box-shadow: 0 vw(1.5) vh(3) rgba(0, 0, 0, .25);

    .img {
      width: vw(16);
      height: vh(20);
      margin-left: vw(21);
      margin-right: vw(12);
    }

    .text {
      font-size: rem(12);
      font-family: Microsoft YaHei-Regular, Microsoft YaHei;
      font-weight: 400;
      color: white;
      line-height: vh(14);
      letter-spacing: vw(1);
    }
  }

  .backButton {
    flex: none;
    width: vw(30);
    height: vh(30);
    background: rgba(0, 0, 0, 0.5);
    border-radius: vw(25);
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: vw(69);
    box-shadow: 0 vw(1.5) vh(3) rgba(0, 0, 0, .25);

    .img {
      width: vw(13);
      height: vh(20);
    }
  }

  .progressBar {
    flex: 1;
    width: vw(1266);
    height: vh(20);
    margin-right: vw(69);
    display: flex;
    align-items: center;

    .dateBg {
      width: vw(170);
      height: vh(20);
      background: rgba(0, 0, 0, 0.5);
      border-radius: vw(10);
      display: flex;
      align-items: center;
      box-shadow: 0 vw(1.5) vh(3) rgba(0, 0, 0, .25);

      ::v-deep(.el-input__wrapper) {
        background: #0000;
        width: vw(170);
        box-shadow: none;
      }

      //margin-right: 20px;
    }

    .svg_container {
      height: vh(80);
      display: inline-block;
      //border: 1px solid red;
      flex: 1;
      //background: #c5c0c0;

      .axis {
        width: 100%;
        height: 100%;
      }
    }
  }

  .gotoButton {
    flex: none;
    width: vw(30);
    height: vh(30);
    background: rgba(0, 0, 0, 0.5);
    border-radius: vw(25);
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: vw(69);
    box-shadow: 0 vw(1.5) vh(3) rgba(0, 0, 0, .25);

    .img {
      width: vw(13);
      height: vh(20);
    }
  }

  .settingButton {
    flex: none;
    width: vw(101);
    height: vh(30);
    background: rgba(0, 0, 0, 0.5);
    border-radius: vw(15);
    display: flex;
    align-items: center;
    box-shadow: 0 vw(1.5) vh(3) rgba(0, 0, 0, .25);

    ::v-deep(.el-input__wrapper) {
      background: #0000;
      width: vw(110);
      box-shadow: none;

    }
  }

  .settingButton:hover {
    background: rgba(0, 0, 0, 0.75);
  }
}


</style>
<style lang="scss">

.left-wrapper {
  .el-select {
    --el-select-input-focus-border-color: none;
    display: flex;
    align-items: center;
  }

  .el-input__inner::placeholder {
    color: white;
    font-size: rem(14);
  }

  .el-input__suffix {
    transform: translateX(vw(-10));
  }

  .el-select-dropdown__item {
    height: vh(34);
    line-height: vh(34);
  }
}

#settingButton {
  .el-input__inner {
    text-align: center;
    color: white;
    font-size: rem(12);
  }

  .el-input__inner::placeholder {
    color: white;
    font-size: rem(14);
  }

  .el-select {
    --el-select-input-focus-border-color: none;
    display: flex;
    align-items: center;
  }

  .el-input__wrapper:hover {
    box-shadow: 0 0 0 0 var(--el-input-hover-border-color) inset !important;
  }
}

#dateBg {
  .el-input__inner {
    text-align: center;
    color: white;
    font-size: rem(12);
  }
}

.selectOptions {
  .el-input__inner {
    text-align: center;
    color: white;
    font-size: rem(12);
  }

  .el-input {
    height: vh(24);
  }
}
</style>

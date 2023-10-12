<script setup>
import {onMounted} from "vue";
// const xScale = d3.scaleTime()
//     .domain([startDate, endDate])
//     .range([0, width]);
//
// const xAxis = d3.axisBottom(xScale)
//     .tickFormat(d3.timeFormat('%H:%M'));
let dataset1 = [1, 2, 3, 4, 5];
let dataset2 = [80, 100, 56, 120, 180, 30, 40, 120, 160];


onMounted(() => {
  d3.select('h1').style('color', 'red')
      .attr('class', 'heading')
      .text('newwwwwwwwwwwwwww')

  d3.selectAll('.inlineDiv').style('display', 'inline-block')

  d3.select('div').append('p').text('First Paragraph');
  d3.select('div').append('p').text('Second Paragraph');
  d3.select('div').append('p').text('Third Paragraph');

  d3.select('span')
      .selectAll('b')
      .data(dataset1)
      .enter()
      .append('p') // appends paragraph for each data element
      .text('D3 is awesome!!');
  //.text(function(d) { return d; });


  //SVG图表
  // 数据集
// 定义svg图形宽高，以及柱状图间距
  let svgWidth = 500, svgHeight = 300, barPadding = 20;
// 通过图形计算每个柱状宽度
  let barWidth = (svgWidth / dataset2.length);

// 绘制图形
  let svg = d3.select('svg')
      .attr("width", svgWidth)
      .attr("height", svgHeight)
      .style('border', '1px solid red')
      .style('margin-right', '20')

// rect，长方形
// 文档：http://www.w3school.com.cn/svg/svg_rect.asp

  let barChart = svg.selectAll("rect")
      .data(dataset2) //绑定数组
      .enter() // 指定选择集的enter部分
      .append("rect") // 添加足够数量的矩形
      .attr("y", d => svgHeight - d) // d为数据集每一项的值, 取y坐标
      .attr("height", d => d) // 设定高度
      .attr("width", barWidth - barPadding) // 设定宽度
      .attr("transform", (d, i) => {
        let translate = [barWidth * i, 0];
        return "translate(" + translate + ")";
      }); // 实际是计算每一项值的x坐标

  let text = svg.selectAll("text")
      .data(dataset2)
      .enter()
      .append("text")
      .text(d => d)
      .attr("y", (d, i) => svgHeight - d - 2)
      .attr("x", (d, i) => barWidth * i)
      .attr("fill", "#A64C38");

})
onMounted(() => {
  let svgWidth = 500, svgHeight = 300, barPadding = 20;
  let barWidth = (svgWidth / dataset1.length);


  let svg = d3.select('.svg2')
      .attr("width", svgWidth)
      .attr("height", svgHeight)
      .style('border', '1px solid blue')

  let yScale = d3.scaleLinear()
      .domain([0, d3.max(dataset1)])
      .range([0, svgHeight]);

  let barChart = svg.selectAll("rect")
      .data(dataset1)
      .enter()
      .append("rect")
      .attr("y", d => svgHeight - yScale(d))
      .attr("height", d => yScale(d))
      .attr("width", barWidth - barPadding)
      .attr("transform", (d, i) => {
        let translate = [barWidth * i, 0];
        return "translate(" + translate + ")";
      });

  // let text = svg.selectAll("text")
  //     .data(dataset1)
  //     .enter()
  //     .append("text")
  //     .text(d => d)
  //     .attr("y", (d, i) => svgHeight - yScale(d)-2)
  //     .attr("x", (d, i) => barWidth * i)
  //     .attr("fill", "#A64C38");
})
onMounted(() => {
  let svgWidth = 500, svgHeight = 300;
  let svg = d3.select('.svg3').attr('width', svgWidth).attr('height', svgHeight).style('border', '2px dashed red').style('margin-right', '20')

  //构建x轴坐标
  let xScale = d3.scaleLinear()
      .domain([0, d3.max(dataset2)])
      .range([0, svgWidth]);

  let yScale = d3.scaleLinear()
      .domain([0, d3.max(dataset2)])
      .range([svgHeight, 0])

  // 横轴的API使用
  let x_axis = d3.axisBottom()
      .scale(xScale);
  // 纵轴的API使用
  let y_axis = d3.axisLeft()
      .scale(yScale);

  svg.append("g")
      .attr("transform", "translate(50, 10)")
      .call(y_axis);

  let xAxisTranslate = svgHeight - 20;
  svg.append("g")
      .attr("transform", "translate(50, " + xAxisTranslate  +")")
      .call(x_axis);
})
onMounted(()=>{
  let svgWidth = 500, svgHeight = 300;
  let svg = d3.select('.svg4').attr('width', svgWidth).attr('height', svgHeight).style('border', '2px dashed blue')

  let line = svg.append("line")
      .attr("x1", 100)
      .attr("x2", 500)
      .attr("y1", 50)
      .attr("y2", 50)
      .attr("stroke", "red");

  let rect = svg.append("rect")
      .attr("x", 100)
      .attr("y", 100)
      .attr("width", 200)
      .attr("height", 100)
      .attr("fill", "#9B95FF");

  let circle = svg.append("circle")
      .attr("cx", 200)
      .attr("cy", 300)
      .attr("r", 80)
      .attr("fill", "#7CE8D5");
})
onMounted(()=>{
  let data = [
    {"platform": "Android", "percentage": 40.11},
    {"platform": "Windows", "percentage": 36.69},
    {"platform": "iOS", "percentage": 13.06}
  ];

  let svgWidth = 500, svgHeight = 300, radius =  Math.min(svgWidth, svgHeight) / 2;

  let svg = d3.select('.svg5').attr('width', svgWidth).attr('height', svgHeight).style('border', '2px dashed blue').style('margin-right','20')

  let g = svg.append("g")
      .attr("transform", "translate(" + radius + "," + radius + ")") ;

  // d3.scaleOrdinal() 序数比例尺
  // schemeCategory10, 颜色比例尺
  // D3提供了一些颜色比例尺，10就是10种颜色，20就是20种：
  let color = d3.scaleOrdinal(d3.schemeCategory10);

  let pie = d3.pie().value(d => d.percentage);

  let path = d3.arc()
      .outerRadius(radius)
      .innerRadius(0);

  let arc = g.selectAll("arc")
      .data(pie(data))
      .enter()
      .append("g");

  arc.append("path")
      .attr("d", path)
      .attr("fill", d => color(d.data.percentage));

  let label = d3.arc()
      .outerRadius(radius)
      .innerRadius(0);
  arc.append("text")
      .attr("transform",  d => `translate(${label.centroid(d)})`)
      .attr("text-anchor", "middle")
      .text(d => `${d.data.platform}:${d.data.percentage}%`);
})
onMounted(()=>{
  // 外部API,注意日期记得补零
  const api = 'https://api.coindesk.com/v1/bpi/historical/close.json?start=2019-03-31&end=2019-07-01';

  /**
   * dom内容加载完毕时，从API中加载数据
   */
  document.addEventListener("DOMContentLoaded", function(event) {
    fetch(api)
        .then(response => response.json())
        .then(data => {
          let parsedData = parseData(data);
          drawChart(parsedData);
        })
        .catch(err =>  console.log(err))
  });

  /**
   * 将数据解析为键值对
   */
  const parseData = data =>{
    let arr = [];
    for (let i in data.bpi) {
      arr.push({
        date: new Date(i), //date
        value: +data.bpi[i] //convert string to number
      });
    }
    return arr;
  }

  /**
   * 创建图表
   */
  const drawChart  = data => {
    let svgWidth = 600, svgHeight = 400;
    let margin = { top: 20, right: 20, bottom: 30, left: 50 };
    let width = svgWidth - margin.left - margin.right;
    let height = svgHeight - margin.top - margin.bottom;

    let svg = d3.select('.svg6')
        .attr("width", svgWidth)
        .attr("height", svgHeight)
        .style('border', '2px dashed blue')

    let g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    let x = d3.scaleTime()
        .rangeRound([0, width]);

    let y = d3.scaleLinear()
        .rangeRound([height, 0]);

    let line = d3.line()
        .x(d=> x(d.date))
        .y(d=> y(d.value))
    x.domain(d3.extent(data, function(d) { return d.date }));
    y.domain(d3.extent(data, function(d) { return d.value }));

    g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .select(".domain")
        .remove();

    g.append("g")
        .call(d3.axisLeft(y))
        .append("text")
        .attr("fill", "#000")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Price ($)");

    g.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5)
        .attr("d", line);
  }


})
let selectedTime = null
onMounted(()=>{
  // 定义时间范围
  const startDate = new Date('2020-01-01');
  const endDate = new Date('2020-01-02');

// 初始化时间比例尺
  const xScale = d3.scaleTime()
      .domain([startDate, endDate])
      .range([0, 500]);

// 创建D3时间轴
  const xAxis = d3.axisBottom(xScale)
      .tickFormat(d3.timeFormat('%H:%M'));

// 渲染D3时间轴
  const svg = d3.select('.svg7')
      .attr('width', 500)
      .attr('height', 50);

  svg.append('g')
      .attr('transform', 'translate(0, 30)')
      .call(xAxis);

// 模拟数据
  const data = [
    {time: new Date('2020-01-01 12:00'), value: 10},
    {time: new Date('2020-01-01 18:00'), value: 20},
    //...
  ];

// 点击回调函数
  function onclick(d) {
    selectedTime = d;
    // filterData();
    // updateAxis();
    // updateMap();
  }

// // Leaflet地图和热力图层
//   const map = L.map('map').setView([51.505, -0.09], 13);
//
//   const heatLayer = L.heatLayer(data, {radius: 20}).addTo(map);
//
// // 数据过滤
//   function filterData() {
//     heatLayer.setLatLngs(data.filter(d => d.time > selectedTime));
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
//         .attr('font-weight', d => d > selectedTime ? 'bold' : 'normal');
//   }
})


</script>

<template>
  <div>
    <h1>1231321</h1>
    <!--  (p>b{$})*10-->
    <div class="inlineDiv"><b>1</b></div>
    <div class="inlineDiv"><b>2</b></div>
    <div class="inlineDiv"><b>3</b></div>
    <div class="inlineDiv"><b>4</b></div>
    <div class="inlineDiv"><b>5</b></div>
    <span></span>

    <h1>Bar Chart using D3.js</h1>

    <svg class="bar-chart"></svg>
    <svg class="svg2"></svg>
    <svg class="svg3"></svg>
    <svg class="svg4"></svg>
    <svg class="svg5"></svg>
    <svg class="svg6"></svg>
    <div id="map"></div>
    <svg class="svg7"></svg>
  </div>

</template>

<style scoped>
div {
  pointer-events: all;

}
</style>

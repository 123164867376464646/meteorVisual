import wind_u from '@/assets/testData/wind_u.json'
import wind_v from '@/assets/testData/wind_v.json'

const dx_dy = 0.00039
const lo1_u = Math.min(...wind_u.map(i => i.lon))
const lo2_u = Math.max(...wind_u.map(i => i.lon))
const la1_u = Math.min(...wind_u.map(i => i.lat))
const la2_u = Math.max(...wind_u.map(i => i.lat))

const lo1_v = Math.min(...wind_v.map(i => i.lon))
const lo2_v = Math.max(...wind_v.map(i => i.lon))
const la1_v = Math.min(...wind_v.map(i => i.lat))
const la2_v = Math.max(...wind_v.map(i => i.lat))

const nx = Math.sqrt(125)
const ny = Math.sqrt(125)
const mergedData = [
    {
        "header": {
            "parameterUnit": "m.s-1",
            "parameterNumber": 2,
            "parameterNumberName": "eastward_wind",
            "dx": dx_dy,
            "dy": dx_dy,
            "parameterCategory": 2,
            "refTime": "2017-02-01 23:00:00",
            "lo1": lo1_u,
            "lo2": lo2_u,
            "la2": la1_u,
            "la1": la2_u,
            "nx": nx,//表示数据的经度和纬度方向的格点数，也就是数据的水平分辨率（nx * ny = wind_u.length ）
            "ny": ny
        },
        "data": wind_u.map(i => i.u)
    },
    {
        "header": {
            "parameterUnit": "m.s-1",
            "parameterNumber": 3,
            "parameterNumberName": "northward_wind",
            "dx": dx_dy,
            "dy": dx_dy,
            "parameterCategory": 2,
            "refTime": "2017-02-01 23:00:00",
            "lo1": lo1_v,
            "lo2": lo2_v,
            "la2": la1_v,
            "la1": la2_v,
            "nx": nx,
            "ny": ny
        },
        "data": wind_v.map(i => i.v)
    }
]

let latLon_Info = {
    uInfo: {
        center: [(la1_u + la2_u) / 2, (lo1_u + lo2_u) / 2],
        minLon: lo1_u,
        maxLon: lo2_u,
        minLat: la1_u,
        maxLat: la2_u,
    },
    vInfo: {
        center: [(la1_v + la2_v) / 2, (lo1_v + lo2_v) / 2],
        minLon: lo1_v,
        maxLon: lo2_v,
        minLat: la1_v,
        maxLat: la2_v,
    },
}
console.log("🚀 ~ name:lo1_u ", lo1_u)
console.log("🚀 ~ name:lo2_u ", lo2_u)

export function output_windData() {
    return {mergedData, latLon_Info}
}




export function createHeatmap(canvasId, data) {
    const canvas = document.getElementById(canvasId);
    const context = canvas.getContext('2d');
    const n = data.width;
    const m = data.height;
    const width = 1920;
    const height = Math.round(m / n * width);

    canvas.width = width;
    canvas.height = height;

    // d3.scaleSequential()函数来创建一个颜色比例尺，用于将数据值映射到颜色值。
    // 具体来说，d3.interpolateTurbo是一个颜色插值函数，用于生成从黄色到蓝色的颜色渐变，
    // d3.extent()函数用于获取数据值的最小值和最大值，然后将它们作为颜色比例尺的定义域（domain）。
    // 最后，使用.nice()函数对颜色比例尺的定义域进行扩展，使其更加美观和易于理解。
    const color = d3.scaleSequential(d3.interpolateTurbo).domain(d3.extent(data.values)).nice();
    const contours = d3.contours().size([n, m]);//D3.js库中的d3.contours()函数来创建一个等高线生成器，用于将二维数据转换为等高线的几何形状

    for (const [i, d] of color.ticks(50).entries()) {//一个循环来遍历颜色比例尺中的所有高度值
        const contour = contours.contour(data.values, d);//并为每个高度值生成一个等高线的几何形状
        if (contour) {
            context.beginPath();
            context.fillStyle = color(d);
            context.strokeStyle = "rgba(0,255,0,0)";
            context.lineWidth = 0;

            for (const polygon of contour.coordinates) {
                context.moveTo(polygon[0][0][0] * width / n, polygon[0][0][1] * height / m);
                for (const [x, y] of polygon[0].slice(1)) {
                    context.lineTo(x * width / n, y * height / m);
                }
                context.closePath();
            }

            context.fill();
            context.stroke();
        }
    }
}


import wind_u from "@/assets/testData/wind_u.json";
import wind_v from "@/assets/testData/wind_v.json";

const mergedData = [
    //U向量数据
    {
        "header": {
            "parameterUnit": "m.s-1",//参数的单位，这里是“米每秒”。
            "parameterNumber": 2,//表示气象产品中参数的编号，这里是 2。
            "parameterNumberName": "eastward_wind",//表示气象产品中参数的名称，这里是“东向风”。
            "dx": dx_dy,//表示数据的经度和纬度方向上的格距，即水平方向上的分辨率。
            "dy": dx_dy,
            "parameterCategory": 2,// 表示气象产品中参数的类别，这里是 2，表示温度、湿度、风等物理量。
            "refTime": "2017-02-01 23:00:00",//表示气象产品的参考时间，即气象预报的起始时间。
            "lo1": lo1_u,//表示数据的经纬度范围，其中 lo1 和 lo2 表示经度的起始和终止值，la1 和 la2 表示纬度的起始和终止值。
            "lo2": lo2_u,
            "la2": la1_u,
            "la1": la2_u,
            "nx": nx,//表示数据的经度和纬度方向上的格点数，即水平方向上的分辨率，其中 nx 表示经度方向上的格点数，ny 表示纬度方向上的格点数。
            "ny": ny
        },
        "data": wind_u.map(i => i.u)
    },
    //V向量数据
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

import wind_u from '@/assets/testData/wind_u.json'
import wind_v from '@/assets/testData/wind_v.json'

const mergedData = [
    {
        "header": {
            "parameterUnit": "m.s-1",
            "parameterNumber": 2,
            "parameterNumberName": "eastward_wind",
            "dx": 1.0,
            "dy": 1.0,
            "parameterCategory": 2,
            "refTime": "2017-02-01 23:00:00",
            "lo1": Math.min(...wind_u.map(i => i.lon)),
            "lo2": Math.max(...wind_u.map(i => i.lon)),
            "la1": Math.min(...wind_u.map(i => i.lat)),
            "la2": Math.max(...wind_u.map(i => i.lat)),
            "nx": wind_u.length,
            "ny": wind_u.length
        },
        "data": wind_u.map(i => i.u)
    },
    {
        "header": {
            "parameterUnit": "m.s-1",
            "parameterNumber": 3,
            "parameterNumberName": "northward_wind",
            "dx": 1.0,
            "dy": 1.0,
            "parameterCategory": 2,
            "refTime": "2017-02-01 23:00:00",
            "lo1": Math.min(...wind_u.map(i => i.lon)),
            "lo2": Math.max(...wind_u.map(i => i.lon)),
            "la1": Math.min(...wind_u.map(i => i.lat)),
            "la2": Math.max(...wind_u.map(i => i.lat)),
            "nx": wind_u.length,
            "ny": wind_u.length
        },
        "data": wind_v.map(i => i.v)
    }
]
let latSum = 0;
let lonSum = 0;

for (let i = 0; i < wind_u.length; i++) {
    latSum += wind_u[i].lat;
    lonSum += wind_u[i].lon;
}

let latCenter = latSum / wind_u.length;
let lonCenter = lonSum / wind_u.length;

for (let i = 0; i < wind_v.length; i++) {
    latSum += wind_v[i].lat;
    lonSum += wind_v[i].lon;
}
let latCenter_v = latSum / wind_v.length;
let lonCenter_v = lonSum / wind_v.length;

let center = {
    uCenter: [latCenter, lonCenter],
    vCenter: [latCenter_v, lonCenter_v]
}

function output_windData() {
    return {mergedData, center}
}

export default output_windData

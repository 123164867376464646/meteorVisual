<script setup>
import {onMounted} from "vue";
import data from "@/assets/testData/exp.json"

// onMounted(() => {
//   const map = L.map('map').setView([29.566887749040042, 106.54472351074219], 13);//{lat: 29.566887749040042, lng: 106.54472351074219}
//   L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     maxZoom: 19,
//     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//   }).addTo(map);
//
//   const marker = L.marker([29.566887749040042, 106.54472351074219]).addTo(map);
//
//   const marker2 = L.marker([30.482117, 103.84923]).addTo(map);
//
//   const circle = L.circle([29.53306390017987, 106.48180961608888], {//{lat: 29.53306390017987, lng: 106.48180961608888}
//     color: 'red',
//     fillColor: '#f03',
//     fillOpacity: 0.5,
//     radius: 1000
//   }).addTo(map);
//
//   const polygon = L.polygon([
//     [51.509, -0.08],
//     [51.503, -0.06],
//     [51.51, -0.047]
//   ]).addTo(map);
//
//   marker.bindPopup("<b>!!!!</b><br>popup").openPopup()
//   circle.bindPopup("石桥铺circle区域")
//   polygon.bindPopup("polygon区域")
//
//   //点击事件
//   const popup = L.popup();
//
//   function onMapClick(e) {
//     console.log("🚀 ~ name:e.latlng ", e.latlng)
//     popup
//         .setLatLng(e.latlng)
//         .setContent("You clicked the map at <br>" + e.latlng.toString())
//         .openOn(map);
//   }
//
//   map.on('click', onMapClick);
//
//   // const flowmapLayer = new L.CanvasFlowmapLayer({
//   //   data: data,
//   //   velocityScale: 0.005,
//   //   opacity: 0.5
//   // }).addTo(map);
//
//
//   d3.text('/Bay_U.asc', function(u) {
//     d3.text('/Bay_V.asc', function(v) {
//       console.log(L)
//       let vf = L.VectorField.fromASCIIGrids(u, v);
//       let layer = L.canvasLayer.vectorFieldAnim(vf).addTo(map);
//       map.fitBounds(layer.getBounds());
//
//       layer.on('click', function(e) {
//         if (e.value !== null) {
//           let vector = e.value;
//           let v = vector.magnitude().toFixed(2);
//           let d = vector.directionTo().toFixed(0);
//           let html = (`<span>${v} m/s to ${d}&deg</span>`);
//           let popup = L.popup()
//               .setLatLng(e.latlng)
//               .setContent(html)
//               .openOn(map);
//         }
//       });
//     });
//   });
// })


onMounted(() => {
  let map = L.map('map', {
    center: [39.90403, 116.407526],
    zoom: 10
  }).setView([39.90403, 116.407526], 10);//北京
  {
    /*高德*/
    L.tileLayer.chinaProvider('GaoDe.Normal.Map', {maxZoom: 18, minZoom: 3, subtitle: '高德地图'}).addTo(map);
    /* 黑色map */
    // let url = 'http://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png';
    // L.tileLayer(url, {
    //   attribution: 'OSM & Carto',
    //   subdomains: 'abcd',
    //   maxZoom: 19
    // }).addTo(map);
  }

  {
    /*此处采用promise获取uv,官网示例使用的d3会不生效*/
    const url_u = "/Bay_U.asc";
    const url_v = "/Bay_V.asc";
    const urls = [url_u, url_v];
    const promises = urls.map(url => fetch(url).then(r => r.text()));
    Promise.all(promises).then(function (arrays) {
      let vf = L.VectorField.fromASCIIGrids(arrays[0], arrays[1]);
      let layer = L.canvasLayer.vectorFieldAnim(vf).addTo(map);
      // map.fitBounds(layer.getBounds());//定位到此处

      layer.on('click', function (e) {
        if (e.value !== null) {
          let vector = e.value;
          let v = vector.magnitude().toFixed(2);
          let d = vector.directionTo().toFixed(0);
          let html = (`${v} m/s to ${d}&deg`);
          let popup = L.popup()
              .setLatLng(e.latlng)
              .setContent(html)
              .openOn(map);
        }
      });
    });
  }

})
</script>

<template>
  <div id="map"></div>
</template>

<style scoped>
#map {
  pointer-events: all;
  width: 100vw;
  height: 100vh;
}
</style>

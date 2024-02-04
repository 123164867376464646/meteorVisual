/**
 * 将地图视角聚焦到指定的地理范围。
 *
 * @param {Object} map - 必需，Leaflet 地图对象。
 * @param {Object} data - 必需，包含视图数据范围的对象，包括 la1、lo1、la2 和 lo2 四个属性。
 * @returns {void}
 */
export function fitBounds(map, data) {
    let corner1, corner2
    if (Array.isArray(data)) {
        corner1 = L.latLng(
            data[0]['header']['la1'],
            data[0]['header']['lo1']
        )
        corner2 = L.latLng(
            data[0]['header']['la2'],
            data[0]['header']['lo2']
        )
    } else {
        corner1 = L.latLng(
            data['header']['la1'],
            data['header']['lo1']
        )
        corner2 = L.latLng(
            data['header']['la2'],
            data['header']['lo2']
        )
    }


    const bounds = L.latLngBounds(
        corner1, corner2
    );
    map.fitBounds(bounds);
}


//返回其他要素格式数据
export const result = (sourceData) => {
    return sourceData.reduce((acc, cur,index) => {
        const {lat, lon, count} = cur
        if(index%2===0){
            acc.push([lat, lon, 0]);
        }else {
            acc.push([lat, lon, 1]);
        }

        return acc;
    }, []);
}

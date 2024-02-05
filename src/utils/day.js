const daysOfWeek = ['日', '一', '二', '三', '四', '五', '六'];
export const getDate = () => {
    const date = new Date();

    const dayOfWeek = daysOfWeek[date.getDay()];
    const month = date.getMonth() + 1; // 注意月份是从0开始的，所以要加1
    let dayOfMonth = date.getDate().toString()

    const _hours = date.getHours()

    if (dayOfMonth < 10) {
        dayOfMonth = '0' + dayOfMonth;
    }

    return {dayOfWeek, month, dayOfMonth, date, _hours}
}

export const initDays = (arr, string) => {
    const {dayOfWeek, month, dayOfMonth, date} = getDate()


// 添加空数据
    for (let i = 0; i < 3; i++) {
        arr.push({dayOfWeek: '', month: '', dayOfMonth: ''});
    }

//  前三天日期
    // 添加空数据
    for (let i = 3; i > 0; i--) {
        const prevDate = new Date();
        prevDate.setDate(date.getDate() - i);
        const prevDayOfWeek = daysOfWeek[prevDate.getDay()];
        const prevMonth = prevDate.getMonth() + 1;
        let prevDayOfMonth = prevDate.getDate().toString();
        if (prevDayOfMonth < 10) {
            prevDayOfMonth = '0' + prevDayOfMonth;
        }
        arr.push({dayOfWeek: prevDayOfWeek, month: prevMonth + '月-', dayOfMonth: prevDayOfMonth});
    }

//  当天时间
    arr.push({dayOfWeek, month: month + '月-', dayOfMonth});

    string.currentDay = dayOfMonth

// 添加后续两周日期数据
    for (let i = 1; i < 15; i++) {
        const nextDate = new Date();
        nextDate.setDate(date.getDate() + i);
        const nextDayOfWeek = daysOfWeek[nextDate.getDay()];
        const nextMonth = nextDate.getMonth() + 1;
        let nextDayOfMonth = nextDate.getDate().toString();
        if (nextDayOfMonth < 10) {
            nextDayOfMonth = '0' + nextDayOfMonth;
        }
        arr.push({dayOfWeek: nextDayOfWeek, month: nextMonth + '月-', dayOfMonth: nextDayOfMonth});
    }

// 添加空数据
    for (let i = 0; i < 3; i++) {
        arr.push({dayOfWeek: '', month: '', dayOfMonth: ''});
    }
    console.log("🚀 ~ name:arr ", arr)
    console.log("🚀 ~ name:string ", string)
}

export const initHours = (arr) => {
    const {hours} = getDate()

// 添加空数据
    for (let i = 0; i < 3; i++) {
        arr.push({hours: ''});
    }
// 3：第一天时刻：8、11、14~23（共计12个刻度）
    const item1_hourArr = [
        {hours: '08:00'},
        {hours: '11:00'},
        {hours: '14:00'},
        {hours: '15:00'},
        {hours: '16:00'},
        {hours: '17:00'},
        {hours: '18:00'},
        {hours: '19:00'},
        {hours: '20:00'},
        {hours: '21:00'},
        {hours: '22:00'},
        {hours: '23:00', hasBorder: true},
    ]
    arr.push(...item1_hourArr)

// 4~9：第二到第七天时刻：0~23（共计24个刻度）
    for (let i = 1; i < 7; i++) {
        for (let j = 0; j < 24; j++) {
            if (j < 10) j = '0' + j
            if(j===23){
                arr.push({hours: j + ':00',hasBorder: true})
            }else {
                arr.push({hours: j + ':00'})
            }
        }
    }

// 10~19
    let _hour = [2, 5, 8, 11, 14, 17, 20, 23];

    for (let i = 1; i < 11; i++) {
        for (let j = 0; j < _hour.length; j++) {
            let hourStr = _hour[j] < 10 ? '0' + _hour[j] : _hour[j];
            arr.push({hours: `${hourStr}:00`});
        }
    }

// 20
    arr.push(...[{hours: '02:00'}, {hours: '05:00'}, {hours: '08:00'}])

// 21~23
    // 添加空数据
    for (let i = 0; i < 3; i++) {
        arr.push({hours: ''});
    }
    console.log("🚀 ~ name:arr    ", arr)
}



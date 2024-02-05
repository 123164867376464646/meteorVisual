const daysOfWeek = ['日', '一', '二', '三', '四', '五', '六'];
export const getDate = () => {
    const date = new Date();

    const dayOfWeek = daysOfWeek[date.getDay()];
    const month = date.getMonth() + 1; // 注意月份是从0开始的，所以要加1
    let dayOfMonth = date.getDate().toString()

    if (dayOfMonth < 10) {
        dayOfMonth = '0' + dayOfMonth;
    }

    return {dayOfWeek, month, dayOfMonth, date}
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

//根据选择的时间将其居中到轴中心，并添加高亮颜色
// export const moveTheTimeline = (timeLine_X,time) => {
//     timeLine_X.style.transform = `translateX(${translateX_days.value}px)`
// }

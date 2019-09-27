const date = {}

date.transformToTime = function (date) {
  console.log(date, "!!")
  const year = date.getFullYear(),
    month = date.getMonth() + 1 > 10 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`,
    Datea = date.getDate() > 10 ? date.getDate() : `0${date.getDate()}`,
    hour = date.getHours() > 10 ? date.getHours() : `0${date.getHours()}`,
    minutes = date.getMinutes() > 10 ? date.getMinutes() : `0${date.getMinutes()}`,
    seconds = date.getSeconds() > 10 ? date.getSeconds() : `0${date.getSeconds()}`
  return `${year}-${month}-${Datea} ${hour}:${minutes}:${seconds}`;
}

function convertTimeToObject(date) {
  const year = date.getFullYear(),
    month = date.getMonth() + 1 > 10 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`,
    day = date.getDate() > 10 ? date.getDate() : `0${date.getDate()}`,
    hour = date.getHours() > 10 ? date.getHours() : `0${date.getHours()}`,
    minutes = date.getMinutes() > 10 ? date.getMinutes() : `0${date.getMinutes()}`,
    seconds = date.getSeconds() > 10 ? date.getSeconds() : `0${date.getSeconds()}`
  return {
    year,
    month,
    day,
    hour,
    minutes,
    seconds
  }
  
}

date.startTimeToEndTime = function (startStamp, endStamp) {
  let startDate = new Date(startStamp)
  let endDate = new Date(endStamp)
  let startObject = convertTimeToObject(startDate)
  let endObject = convertTimeToObject(endDate)
  console.log(startObject, endObject, 'haha')
  return `${startObject.year}/${startObject.month}/${startObject.day} ${startObject.hour}:${startObject.minutes} - ${ startObject.year !== endObject.year ? `${endObject.year}/` : ''}${ startDate.getDate() !== endDate.getDate() ? `${endObject.month}/${endObject.day}` : ''} ${endObject.hour}:${endObject.minutes}`;
}


date.format=(time,fmt)=>{
  //time 时间戳（毫秒）
  //fmt  string  (转换的格式---"yyyy年MM月dd日")
  let dateNow = new Date(time);
  let o = {
    "M+": dateNow.getMonth() + 1, //月份
    "d+": dateNow.getDate(), //日
    "h+": dateNow.getHours(), //小时
    "m+": dateNow.getMinutes(), //分
    "s+": dateNow.getSeconds(), //秒
    "q+": Math.floor((dateNow.getMonth() + 3) / 3), //季度
    "S": dateNow.getMilliseconds() //毫秒
  };
  if(/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (dateNow.getFullYear() + "").substr(4 - RegExp.$1.length));
  for(let k in o)
    if(new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
};

export default date;

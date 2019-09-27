import log from './util.log.js'
import date from './dateToTime.js'
import dataToFormData from './network.js'
import cookies from './util.cookies.js'
import utils from './utils.js'

export default {
  log,
  dateToTime: date.transformToTime,
  startTimeToEndTime: date.startTimeToEndTime,
  format:date.format,
  dataToFormData,
  cookies,
  date,
  getWindowWH:utils.getWindowWH
}

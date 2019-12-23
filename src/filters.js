import moment from 'moment'

export default{
  timeFormat (time, format = 'YYYY-MM-DD HH:mm:ss') {
    if(!time){
      return ''
    }
    if (Number(time) && String(time).length === 10) {
      time *= 1000
    }
    return moment(time).format(format)
  }

}

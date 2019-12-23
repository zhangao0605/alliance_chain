
// 发送验证码相关

export default class SendCode{
  /**
   * 构造函数
   * @param tipsBefore  例:'没有收到邮件?'
   * @param tipsAfter   例:'xxs后可以再次发送邮件'
   * @param countDownTimeAll
   */
  constructor (tipsBefore, tipsAfter, countDownTimeAll) {
    this.tips = tipsBefore
    this.tipsBefore = tipsBefore
    this.tipsAfter = tipsAfter
    this.countDownTimeAll = countDownTimeAll || 60
    this.countDownTime = 0
    this.interval = null
    this.btnCanBeClicked = true
  }

  changeBtnStatus (status) {
    this.btnCanBeClicked = status
  }

  // 倒计时结束会重置btnCanBeClicked
  changeTips () {
    this.changeBtnStatus(false)
    this.countDownTime = this.countDownTimeAll
    let that = this
    this.interval = setInterval(() => {
      if (that.countDownTime > 1) {
        that.countDownTime--
        that.tips = that.tipsAfter.replace('xx', that.countDownTime)
      } else {
        that.changeBtnStatus(true)
        that.tips = that.tipsBefore
        that.clearInterval()
      }
    }, 1000)
  }

  clearInterval () {
    clearInterval(this.interval)
    this.interval = null
  }
}

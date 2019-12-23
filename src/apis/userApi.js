import request from '../utils/request'
import { transformDataToFormData, getUuid } from '../utils/tools'
import md5 from 'js-md5'

export default {
  login (email, password) {
    password = md5(password)
    return request({
      url: '/v1/login/pwd',
      method: 'post',
      data: { email, password }
    })
  },
  logout () {
    return request({
      url: '/v1/logout',
      method: 'post',
    })
  },
  register (email, password, phone, code) {
    password = md5(password)
    return request({
      url: '/v1/register',
      method: 'post',
      data: { email, password, phone, code }
    })
  },
  getPermissions () {
    return request({
      url: '',
      method: 'get'
    })
  },
  /**
   * 获取手机验证码
   * @param phone
   * @param bizType 业务类型，1注册
   */
  getPhoneCode (phone, bizType = 1) {
    return request({
      url: '/v1/phone/check',
      method: 'post',
      data: { phone, bizType }
    })
  },

  /**
   * 从邮箱跳转进页面，获取用户信息
   */
  getAccountInfo () {
    return request({
      url: '/v1/account/info',
      method: 'post',
    })
  },


  /**
   * 提交账户注册信息
   * @param companyName 单位名称
   * @param companyType 单位类型
   * @param socialCreditCode 社会信用代码
   * @param legalPersonLocation 法定代表人归属地
   * @param submitterIdentity 填写人身份
   * @param businessLicense 营业执照
   * @param legalPersonIdCardFront 法定代表人身份证正面
   * @param legalPersonIdCardBack 法定代表人身份证反面
   * @param agentPersonIdCardFront 代理人身份证正面
   * @param agentPersonIdCardBack 代理人身份证反面
   * @param agentPersonProof 代理委托书
   */
  submitAccountInfo (companyName, companyType, socialCreditCode, legalPersonLocation,
    submitterIdentity, businessLicense, legalPersonIdCardFront, legalPersonIdCardBack,
    agentPersonIdCardFront, agentPersonIdCardBack, agentPersonProof) {
    let data = { companyName, companyType, socialCreditCode, legalPersonLocation,
      submitterIdentity, businessLicense, legalPersonIdCardFront, legalPersonIdCardBack,
      agentPersonIdCardFront, agentPersonIdCardBack, agentPersonProof }
      data = transformDataToFormData(data)
    return request({
      url: '/v1/companyApply/submit',
      method: 'post',
      companyType: 'multipart/form-data',
      data: data
    })
  },
  /**
   * 验证手机验证码
   * @param phoneNumber
   * @param code
   */
  checkPhoneCode (phoneNumber, code) {
    return request({
      url: '',
      method: 'post',
      data: { phoneNumber, code }
    })
  },
  /**
   * 获取图形验证码
   */
  getImgCode (uuid) {
    return request({
      url: '/v1/captcha',
      method: 'get',
      params: {key: uuid},
      responseType:'arraybuffer'
    })
  },
  /**
   * 账号，手机号检测
   * @param email
   * @param key
   * @param captcha
   */
  checkExist (email ,key, captcha) {
    return request({
      url: '/v1/checkExist',
      method: 'post',
      data: {email ,key, captcha}
    })
  },

  reSendEmail (email) {
    return request({
      url: '/v1/reSendEmail',
      method: 'post',
      data: {email}
    })
  },
  /**
   * 重置密码
   * @param type 1未登录 2已登陆
   * @param oldPassword
   * @param newPassword
   * @param email
   * @param code
   */
  resetPassword (type, oldPassword, newPassword, email, code) {
    newPassword = md5(newPassword);
    let data;
    if (type == '2' ) {
      oldPassword = md5(oldPassword);
      data = {type, oldPassword, newPassword}
    } else if(type == '1') {
      data = {type, newPassword, email, code}
    }
    return request({
      url: '/v1/resetPassword',
      method: 'post',
      data: data
    })
  },
  /**
  * 重置手机号
  * @param phone
  * @param code
  */
  resetPhone (phone,code) {
    return request({
      url: '/v1/resetPhone',
      method: 'post',
      data: { phone, code }
    })
  },

  /**
   * 验证邮箱验证码
   * @param email
   * @param code
   * @param bizType
   */
  verifyEmail (email, code, bizType = 2) {
    return request({
      url: '/v1/verifyEmail',
      method: 'post',
      data: { email, code, bizType }
    })
  }
}

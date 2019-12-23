import request from '../utils/request'

export default {
  /**
   * 获取资质审核列表
   * @param page
   * @param rows
   * @param status
   */
  getQualificationReviewList (page, rows, status) {
    return request({
      url: '/v1/companyApply/list',
      method: 'post',
      data: { page, rows, status }
    })
  },

  /**
   * 获取资质审核详情
   * @param company_apply_id
   */
  getQualificationReviewDetail (company_apply_id) {
    return request({
      url: '/v1/companyApply/detail',
      method: 'post',
      data: { company_apply_id }
    })
  },

  /**
   * 审核资质
   * @param id
   * @param type
   * @param rejectReason
   */
  reviewGetQualification (id, type, rejectReason = '') {
    return request({
      url: '/v1/companyApply/check',
      method: 'post',
      data: { id, type, rejectReason }
    })
  },

  /**
   * 获取联盟审核列表
   * @param page
   * @param rows
   * @param status
   */
  getAllianceReviewList (page, rows, status) {
    return request({
      url: '/v1/consortium/audit/list',
      method: 'post',
      data: { page, rows, status }
    })
  },

  /**
   * 获取联盟审核详情
   * @param consortium_id
   */
  getAllianceReviewDetail (consortium_id) {
    return request({
      url: '/v1/consortium/detail',
      method: 'post',
      data: { consortium_id }
    })
  },



  /**
   * 联盟审核
   * @param id
   * @param status
   */
  reviewAlliance (id, status) {
    return request({
      url: '/v1/consortium/audit',
      method: 'post',
      data: { id, status }
    })
  },



}

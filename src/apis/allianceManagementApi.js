import request from '../utils/request'

export default {

  /**
   * 获得联盟列表
   * @param status
   */
  getAlliances(status){
    return request({
      url: '/v1/consortium/list',
      method: 'post',
      data: { status }
    })
  },

  /**
   * 进入联盟
   * @param consortiumId
   */
  enterAlliance (consortiumId) {
    return request({
      url: '/v1/consortium/enter',
      method: 'post',
      data: { consortiumId }
    })
  },


  addAlliance (name, description, phone, vocation) {
    return request({
      url: '/v1/consortium/create',
      method: 'post',
      data: { name, description, phone, vocation }
    })
  },

  joinAlliance (companyConsortiumId) {
    return request({
      url: '/v1/consortium/join',
      method: 'post',
      data: { companyConsortiumId }
  })
}


}


import request from '../utils/request'

export default {
  /**
   * 获取节点
   * @param id
   * @param companyId
   * @param status
   * @param page
   * @param rows
   */
  getNodes (id, companyId, status, page, rows) {
    return request({
      url: '/v1/chain/node/list',
      method: 'post',
      data: { id, companyId, status, page, rows }
    })
  },

  /**
   * 获得公司列表
   * @param id
   */
  getCompanyList (id = '') {
    return request({
      url: '/v1/chain/node/company/list',
      method: 'post',
      data: { id }
    })
  },

  /**
   * 更改节点运行状态
   * @param id
   * @param status
   */
  changeNodeRunningStatus (id, status) {
    return request({
      url: '/v1/chain/node/status_update',
      method: 'post',
      data: { id, status }
    })
  },
  /**
   * 添加节点
   * @param name
   * @param deployedServer
   * @param type
   */
  addNode ( name, deployedServer, type, chainId ) {
    return request({
      url: '/v1/chain/node/add',
      method: 'post',
      data: { name, deployedServer, type, chainId}
    })
  }
}

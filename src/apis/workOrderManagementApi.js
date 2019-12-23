

import request from '../utils/request'

export default {
  getWorkOrderList  (page = 1, rows = 10, serialNo = '', startTime = '', endTime = '', type = '', consortiumHost = '', status = '') {
    return request({
      url: '/v1/work_order/list',
      method: 'post',
      data: { page, rows, serialNo, startTime, endTime, type, consortiumHost, status}
    })
  },


  auditWorkOrder (workOrderId, status, remark = '') {
    return request({
      url: '/v1/work_order/audit',
      method: 'post',
      data: {workOrderId, status, remark}
    })
  },

  workOrderDetail (workOrderId) {
    return request({
      url: '/v1/work_order/detail',
      method: 'post',
      data: { workOrderId }
    })
  }
}

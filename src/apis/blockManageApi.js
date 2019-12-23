import request from '../utils/request'

export default {
    /**
     * 获取区块信息列表
     * @param obj
     */
    getBlockDataList (obj) {
        return request({
            url: '/v1/chain/info/block/data',
            method: 'post',
            data: obj
        })
    },
    /**
     * 获取交易信息列表
     * @param obj
     */
    getTradeDataList (obj) {
        return request({
            url: '/v1/chain/info/block/txs',
            method: 'post',
            data: obj
        })
    },
    /**
     * 获取区块链管理主要信息
     */
    getChainStats (obj) {
        return request({
            url: '/v1/chain/info/node/stats',
            method: 'get',
        })
    },
    /**
     * 获取联盟消息
     */
    getAllianceMessageData (obj) {
        return request({
            url: '/v1/message/consortium/list',
            method: 'post',
            data: obj
        })
    },
    /**
     * 获取系统消息
     */
    getSystemMessageData (obj) {
      return request({
        url: '/v1/message/system/list',
        method: 'post',
        data: obj
      })
    },
    /**
     * 修改联盟消息中心数据
     */
    changeAllianceMessageStatus (obj) {
        return request({
            url: '/v1/message/consortium/status_update',
            method: 'post',
            data: obj
        })
    },

    /**
     * 修改系统消息中心数据
     */
    changeSystemMessageStatus (obj) {
      return request({
        url: '/v1/message/system/status_update',
        method: 'post',
        data: obj
      })
    },
}

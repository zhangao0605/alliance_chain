const state = {
    tradeDetailData: {}, //交易详情页参数
    blockDetailData: {},  //区块详情页参数
    taskChainId: '1',     //任务链id
}

const mutations = {
    SET_TRADE_DATA (state, data) {
        state.tradeDetailData = data
    },
    SET_BLOCK_DATA (state, data) {
        state.blockDetailData = data
    },
    SET_TASK_CHAINID (state, data) {
        state.taskChainId = data
    },
}

const actions = {
    setTradeDetail({commit}, data) {
        commit('SET_TRADE_DATA', data)
    },
    setBlockDetail({commit}, data) {
        commit('SET_BLOCK_DATA', data)
    },
    setTaskChainId({commit}, data) {
        commit('SET_TASK_CHAINID', data)
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}

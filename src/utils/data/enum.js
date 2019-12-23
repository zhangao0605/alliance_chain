import { freezeObj } from '../tools'


export const workOrderManagementEnum = {

  // 项目类型
  ObjectTypeEnum: {
    CONTRACT_UPGRADE : 1,   // 合约升级
    CONTRACT_DEPLOYMENT: 2, // 合约部署
    ADD_NODE: 3,            // 新增节点
    EXIT_ALLIANCE:4         // 退出联盟
  }
}

// 用户类型
export const UserTypeEnum = {
  COMMON: 0,     // 普通用户
  COMPANY: 1,    // 企业
  STAFF: 2,      // 员工
}

// 注册资质审核结果
export const RegistrationInfoReviewResultEnum = {
  NOT_SUBMITTED: -1,   // 未提交资质
  IN_REVIEWING: 0,     // 审核中
  APPROVED: 1,         // 审核通过
  REJECTED: 2          // 审核失败
}

// 注册审核结果（用于页面状态）
export const RegistrationReviewResultForPageEnum = {
  SUCCESS:    20000,        // 注册成功
  FAIL:       10000,        // 注册失败
  REVIEWING:  30003,        // 审核中
  INVALID:    50000         // 已失效
}


// 节点运行状态
export const NodeRunningStateEnum = {
  NOT_START: 0,     // 未启动
  IN_OPERATION: 1,  // 运行中
  STOPPED: 2,       // 已停止
  DO_EVIL: 3,       // 作恶节点
}

// 节点类型
export const NodeTypeEnum = {
  FULL_NODE: 1,          // 全节点
  CONSENSUS_NODE: 2,     // 共识节点
  DATA_NODE: 3,          // 数据节点
}

// 审批状态
export const ReviewStatusEnum = {
  NO_OPERATION: 0, //待审核
  APPROVED: 1,  //已批准
  REJECTED: 2,  //已驳回
  ALL: -1 ,     //全部
  OPERATED: 10  //已处理
}

// 是不是盟主
export const IsAllianceLeader = {
  YES: 1,
  NO: 0
}

// 联盟审核状态
export const AllianceReviewStatusEnum = {
  ALL: -1,          // 全部
  NO_OPERATION: 0,  // 待处理,申请中
  APPROVED: 1,      // 通过
  REJECTED: 2,      // 驳回
  OPERATED: 10      // 已处理
}

// 工单问题分类
export const WorkOrderQuestionClassEnum = {
  CONTRACT: 1,  //合约类
  NODE:2,       //节点类
}


// 工单处理状态
export const WorkOrderOperationStatusEnum = {
  NO_OPERATION: 0,  // 待处理
  APPROVED: 1,      // 通过
  REJECTED: 2,      // 驳回
  OPERATED: 10      // 已处理
}


// 资质审核处理状态
export const QualificationReviewStatusEnum = {
  ALL: -1,          // 全部
  NO_OPERATION: 0,  // 待处理
  APPROVED: 1,      // 通过
  REJECTED: 2,      // 驳回
  OPERATED: 10      // 已处理
}



freezeObj(workOrderManagementEnum)
freezeObj(NodeRunningStateEnum)
freezeObj(NodeTypeEnum)
freezeObj(ReviewStatusEnum)






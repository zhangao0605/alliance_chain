import request from "../utils/request";

// 用户拥有的权限
export function byUser(data) {
  return request({
    url: "/v1/auth/permission/list/byUser",
    method: "post",
    data: data
  });
}
// 获取所有权限
export function permissionList(data) {
  return request({
    url: "/v1/auth//permission/list",
    method: "post",
    data: data
  });
}

// 权限设置-角色列表
export function roleList(data) {
  return request({
    url: "/v1/auth/role/list",
    method: "post",
    data: data
  });
}
// 权限设置角色详情
export function roleDetail(data) {
  return request({
    url: "/v1/auth/role/detail/",
    method: "post",
    data: data
  });
}
// 权限设置添加角色
export function addRole(data) {
  return request({
    url: "/v1/auth/role/add",
    method: "post",
    data: data
  });
}
// 权限设置添加角色
export function roleUserEdit(data) {
  return request({
    url: "/v1/user/edit",
    method: "post",
    data: data
  });
}
// 取消授权-删除用户角色
export function cancelRole(data) {
  return request({
    url: "/v1/auth/role/cancel",
    method: "post",
    data: data
  });
}
// 成员管理-用户列表
export function memberList(data) {
  return request({
    url: "/v1/user/list",
    method: "post",
    data: data
  });
}
// 成员管理-新增角色
export function memberAdd(data) {
  return request({
    url: "/v1/user/add",
    method: "post",
    data: data
  });
}
// 成员管理-停用角色
export function memberDisableUser(data) {
  return request({
    url: "/v1/user/disableUser",
    method: "post",
    data: data
  });
}
// 成员管理-重置密码
export function memberResetPassword(data) {
  return request({
    url: "/v1/user/resetPassword",
    method: "post",
    data: data
  });
}

// 获取企业节点列表
export function getConsortiumnode(data) {
  return request({
    url: "/v1/consortium/company/node/list",
    method: "get",
    params: data
  });
}
// 退出企业节点列表
export function conConsortium(data) {
  return request({
    url: "/v1/consortium/quit",
    method: "post",
    data: data
  });
}
// 获取联盟
export function enterConsortium(data) {
  return request({
    url: "/v1/consortium/enter",
    method: "post",
    data: data
  });
}
// 获取联盟下的管理的账号
export function getcompanyaccount(data) {
  return request({
    url: "/v1/consortium/company/account/list",
    method: "get",
    params: data
  });
}
//  联盟管理员账号
export function delcompanyaccount(data) {
  return request({
    url: "/v1/consortium/company/account/del",
    method: "post",
    data: data
  });
}
// 邀请加入联盟
export function consortiumInvest(data) {
  return request({
    url: "/v1/consortium/invite",
    method: "post",
    data: data
  });
}
// 新增合约
export function contractAdd(data) {
  return request({
    url: "/v1/contract/add",
    method: "post",
    data: data
  });
}
// 新增合约链列表
export function chainList(data) {
  return request({
    url: "/v1/chain/list",
    method: "post",
    data: data
  });
}
// 合约列表
export function contractList(data) {
  return request({
    url: "/v1/contract/list",
    method: "post",
    data: data
  });
}
// 合约升级
export function contractUpgrade(data) {
  return request({
    url: "/v1/contract/upgrade",
    method: "post",
    data: data
  });
}
// 合约code详情
export function contractDetail(data) {
  return request({
    url: "/v1/contract/detail",
    method: "post",
    data: data
  });
}
// 合约部署
export function contractDeploy(data) {
  return request({
    url: "v1/contract/deploy",
    method: "post",
    data: data
  });
}
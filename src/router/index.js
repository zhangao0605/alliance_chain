import Vue from "vue";
import Router from "vue-router";
import Home from "../views/Home.vue";

Vue.use(Router);

export const constantRoutes = [
{
  path: '/', redirect: '/login'
},
{
  path: "/home",
  component: Home,
  name: "home",
  hidden: true,
  children: [
  {
    path: "/home",
    component: () => import("../views/homCon/index")
  },
  {
    path: "/allianceAdding",
    name: "allianceAdding",
    component: () => import("../views/homCon/allianceAdding")
  },
  {
    path: "/allianceManagement",
    name: "allianceManagement",
    component: () => import("../views/allianceManagement/index.vue")
  },
  {
    path: "/blockchainManagement",
    name: "blockchainManagement",
    component: () => import("../views/blockchainManagement/index.vue")
  },
  {
    path: "/blockInfoList",
    name: "blockInfoList",
    component: () =>
      import("../views/blockchainManagement/BlockInfoList.vue")
  },
  {
    path: "/tradeInfoList",
    name: "tradeInfoList",
    component: () =>
      import("../views/blockchainManagement/TradeInfoList.vue")
  },
  {
    path: "/tradeDetail",
    name: "tradeDetail",
    component: () => import("../views/blockchainManagement/TradeDetail.vue")
  },
  {
    path: "/blockDetail",
    name: "blockDetail",
    component: () => import("../views/blockchainManagement/BlockDetail.vue")
  },
  {
    path: "/memberManagement",
    name: "memberManagement",
    component: () => import("../views/memberManagement/index.vue")
  },
  {
    path: "/permissionSettings",
    name: "permissionSettings",
    component: () => import("../views/permissionSettings/index.vue")
  },
  {
    path: "/permissionDetails",
    name: "permissionDetails",
    component: () => import("../views/permissionSettings/details.vue")
  },
  {
    path: "/upgrade",
    name: "upgrade",
    component: () => import("../views/newContract/upgrade.vue")
  },
  {
    path: "/deploy",
    name: "deploy",
    component: () => import("../views/newContract/deploy.vue")
  },
  {
    path: "/allianceMessageCenter",
    name: "allianceMessageCenter",
    component: () =>
      import("../views/messageCenter/allianceMessageCenter.vue")
  },
  {
    path: "/accountManagement",
    name: "accountManagement",
    component: () => import("../views/accountManagement/index.vue")
  },
  {
    path: "/nodeManagement",
    name: "nodeManagement",
    component: () =>
      import(
        /* webpackChunkName: "nodeManagement" */
        "@/views/nodeManagement"
      )
  },
  {
    path: "/nodeAddition",
    name: "nodeAddition",
    component: () =>
      import(
        /* webpackChunkName: "nodeManagement" */
        "@/views/nodeManagement/nodeAddition"
      )
  },
  {
    path: "/checkWorkOrders",
    name: "checkWorkOrders",
    component: () =>
      import(
        /* webpackChunkName: "workOrderManagement" */
        "@/views/workOrderManagement/checkWorkOrders"
      )
  },
  {
    path: "/reviewWorkOrder/:workOrderId",
    name: "reviewWorkOrder",
    component: () =>
      import(
        /* webpackChunkName: "workOrderManagement" */
        "@/views/workOrderManagement/reviewWorkOrder"
      )
  },
  {
    path: "/workOrderDetail/:workOrderId",
    name: "workOrderDetail",
    component: () =>
      import(
        /* webpackChunkName: "workOrderManagement" */
        "@/views/workOrderManagement/workOrderDetail"
      )
  },
  {
    path: "/allianceReviewList",
    name: "allianceReviewList",
    component: () =>
      import(
        /* webpackChunkName: "backstageReview" */
        "@/views/backstageReview/allianceReviewList"
      )
  },
  {
    path: "/qualificationReviewList",
    name: "qualificationReviewList",
    component: () =>
      import(
        /* webpackChunkName: "backstageReview" */
        "@/views/backstageReview/qualificationReviewList"
      )
  },
  {
    path: "/qualificationReview/:id",
    name: "qualificationReview",
    component: () =>
      import(
        /* webpackChunkName: "backstageReview" */
        "@/views/backstageReview/qualificationReviewList/qualificationReview"
      )
  },
  {
    path: "/systemMessageCenter",
    name: "systemMessageCenter",
    component: () =>
      import("../views/messageCenter/systemMessageCenter.vue")
  },
  {
    path: "/contractSetting",
    name: "contractSetting",
    component: () => import("../views/contractSetting/index.vue")
  },
  {
    path: "/newContract",
    name: "newContract",
    component: () => import("../views/newContract/index.vue")
  },
  {
    path: "/contractEditor",
    name: "contractEditor",
    component: () => import("../views/contractEditor/index.vue")
  }]
},
{
  path: "/login",
  name: "login",
  component: () => import( /* webpackChunkName: "login" */ "@/views/login")
},
{
  path: "/register",
  name: "register",
  component: () => import( /* webpackChunkName: "login" */ "@/views/register")
},
{
  path: "/registerResult",
  name: "registerResult",
  component: () =>
    import( /* webpackChunkName: "login" */ "@/views/registerResult")
},
{
  path: "/passwordReset",
  name: "passwordReset",
  component: () =>
    import( /* webpackChunkName: "login" */ "@/views/passwordReset")
},
{
  path: "/allianceJoin",
  name: "allianceJoin",
  component: () =>
    import( /* webpackChunkName: "login" */ "@/views/allianceJoin")
}];

export const asyncRoutes = [];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;

import moment from 'moment'
// import CryptoJS from "crypto-js"
import BigNumber from "bignumber.js"
import Iban from '../assets/web3-eth-iban/src/index'
export default {
  install(Vue, opt) {
    Vue.prototype.tableHeaderColor = function ({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background-color:#ffffff ;color: #333;font-weight: 600;font-size: 15px;height:58px;'
      }
    }
    Vue.prototype.timestampToTime = function (timestamp) {
      let time = ''
      if (timestamp == '' || timestamp == null || timestamp == undefined) {
        time = ''
      } else {
        time = moment(timestamp * 1000).format('YYYY-MM-DD HH:mm:ss')
      }
      return time
    }
    Vue.prototype.timestampToTime_1 = function (timestamp) {
      let time = ''
      if (timestamp == '' || timestamp == null || timestamp == undefined) {
        time = ''
      } else {
        time = moment(timestamp * 1000).format('YYYY-MM-DD')
      }
      return time
    }
    Vue.prototype.timestampToTime_editor = function (timestamp) {
      let time = ''
      if (timestamp == '' || timestamp == null || timestamp == undefined) {
        time = ''
      } else {
        time = moment(timestamp * 1000).format('YYYY_MM_DD_HH_mm_ss')
      }
      return time
    }
    //   Vue.prototype.passwordEncryption = function (e) {
    //     let cipherText = CryptoJS.HmacSHA1(e, '87krsC!IPF@OBRPEOh#Uat9C').toString(CryptoJS.enc.Hex);
    //     return cipherText;

    //   }
    Vue.prototype.scientificCounting = function (e) {
      let num = 0
      if (e == 0 || e == '' || e == null || e == undefined || e == NaN) {
        num = 0
      } else {
        num = new BigNumber(`${e}`).div("1e+18").toString(10);
        // if(num.indexOf('.') !== -1 && num.split('.')[1].length > 6){
        //   num = parseFloat(num).toFixed(6)
        // }
      }
      return num
    }
    Vue.prototype.to_32_decimal = function (e) {
      let ban = Iban.toIban(e);
      return ban
    }
    Vue.prototype.to_16_decimal = function (e) {
      let ban = Iban.toAddress(e);
      return ban
    }
    Vue.prototype.permission_sort_navmenu = function (e, permissionList) {
      if(permissionList && permissionList.length) {
        e = e.filter((item) => {
          return permissionList.indexOf(item.permission) > -1
        })
      }
      let filter_arr;
      filter_arr = e.filter(item => item.parentId === 0);
      let new_arr = [];
      filter_arr.forEach((item, index, self) => {
        new_arr.push({ parent: item });
        let child = [];
        e.forEach((item_1, index_1, self_1) => {
          if (item_1.parentId != 0 && item_1.type === 1) {
            if (item_1.parentId == item.id) {
              child.push(item_1);
            }
          }
        });
        new_arr[index].child = child;
      });
      return new_arr;
    }
    Vue.prototype.permission_sort = function (e) {
      let filter_arr;
      filter_arr = e.filter(item => item.parentId === 0);
      let new_arr = [];
      filter_arr.forEach((item, index, self) => {
        new_arr.push({ parent: item });
        let child = [];
        e.forEach((item_1, index_1, self_1) => {
          if (item_1.parentId != 0) {
            if (item_1.parentId == item.id) {
              child.push(item_1);
            }
          }
        });
        new_arr[index].child = child;
      });
      return new_arr;
    }
    Vue.prototype.permission_sort_choose = function (e) {
      let filter_arr;
      filter_arr = e.filter(item => item.parentId === 0);
      let new_arr = [];
      console.log(filter_arr)
      filter_arr.forEach((item, index, self) => {
        item.ischeck = false
        new_arr.push({ parent: item });
        let child = [];
        e.forEach((item_1, index_1, self_1) => {
          if (item_1.parentId != 0) {
            if (item_1.parentId == item.id) {
              item_1.ischeck = false
              if (item_1.type === 0) {
                item_1.name = item_1.name + ' Api'
              }
              child.push(item_1);
            }
          }
        });
        new_arr[index].child = child;
      });
      console.log(new_arr)
      new_arr.forEach((item, index, self) => {
        item.child.forEach((item_1, index_1, self_1) => {
          e.forEach((item_2, index_2, self_2) => {
            if (item_1.id === item_2.parentId) {
              item_2.name = item_2.name + ' Api'
              item.child.push(item_2)
            }
          })
        })


      })
      console.log(new_arr)








      return new_arr;
    }

  }

}

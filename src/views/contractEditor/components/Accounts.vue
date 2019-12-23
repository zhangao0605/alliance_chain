<template>
  <div class="d-flex flex-column h-50 bg_edit bottom-separator">
    <div
      class="p-2 d-flex flex-horizontal justify-content-between align-items-center flex-shrink-0"
    >
      <h5 class="m-0 d-inline-block">账户</h5>
      <div>
        <!-- <button
          class="btn btn-primary btn-sm mr-1"
          @click="$refs.hostModal.show()"
          title="Change Ganache host"
        >
          更改Ganache主机
          <i class="icon host"></i>
        </button>-->
        <button class="btn btn-primary btn-sm" @click="updateAccounts()" title="Refresh">
          刷新
          <i class="icon refresh"></i>
        </button>
      </div>
    </div>
    <div class="table-container scrollable h-100">
      <table class="table table-striped table-fixed table-sm">
        <thead>
          <tr class>
            <th class="table-fit"></th>
            <th scope="col" class>账户</th>
            <th scope="col" class>余额</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(account, index) in accountManager.accounts" v-bind:key="account.address">
            <td class="align-middle text-center table-fit p-0">
              <div class="custom-control custom-radio">
                <input
                  type="radio"
                  class="align-middle m-0 custom-control-input"
                  name="active-account"
                  :id="'account-radio-' + index"
                  :value="index"
                  v-model="accountManager.selectedAccount"
                />
                <label class="custom-control-label" :for="'account-radio-' + index"></label>
              </div>
            </td>
            <td class="align-middle" :title="account.address">
              <div class="text-nowrap text-truncate">{{ account.address }}</div>
            </td>
            <td class="align-middle text-nowrap">{{ account.balance }} TUE</td>
          </tr>
        </tbody>
      </table>
    </div>

    <b-modal
      ref="hostModal"
      title="Change Ganache host"
      ok-title="Change"
      v-on:ok="changeHost"
      v-on:shown="$refs.hostInput.focus()"
      lazy
      content-class="bg-transparent"
      header-bg-variant="primary"
      header-text-variant="light"
      body-bg-variant="dark"
      body-text-variant="light"
      footer-bg-variant="dark"
      footer-text-variant="light"
      ok-variant="success"
      cancel-variant="primary"
      :ok-disabled="!hostValid"
    >
      <b-form-group label="Enter the URL of the Ganache host you want to use" label-for="hostInput">
        <b-form-input
          id="hostInput"
          ref="hostInput"
          v-model="host"
          trim
          placeholder="Host... (http://localhost:8585)"
          @keyup.enter.native="changeHost"
        />
      </b-form-group>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "accounts",
  data: function() {
    return {
      accountManager: window.accountManager,
      host: localStorage["ganache-host"] || "http://localhost:8545"
      // host: 'http://localhost:8545'
    };
  },
  computed: {
    hostValid: function() {
      return this.host.match(/http(s)?:\/\/(.+)/g) != null;
    }
  },
  methods: {
    // 刷新帐户
    refreshAccounts: function(accounts, callback) {
      if (accounts == "all") {
        this.updateAccounts(callback);
      } else {
        for (let i = 0; i < accounts.length; i++) {
          this.updateAccount(accounts[i], callback);
        }
      }
    },
    // 更新所有帐户
    updateAccounts: function(callback) {
      window.web3.eth
        .getAccounts()
        .then(accounts => {
          const temp = [];
          for (let key in accounts) {
            const account = accounts[key];
            const current = window.accountManager.find(account);
            temp.push({
              address: account,
              balance: current != null ? current.balance : 0
            });
            this.updateAccount(account);
          }
          if (window.accountManager.accounts.length == 0) {
            window.accountManager.selectedAccount = 0;
          }
          window.accountManager.accounts = temp;

          if (callback != undefined) {
            callback();
          }
        })
        .catch(error => {
          GlobalEvent.$emit("message", {
            severity: "error",
            formattedMessage: "Couldn't fetch accounts: " + error.message
          });
        });
    },
    // 更新账户
    updateAccount: function(account, callback) {
      // window.console.log('sssssssss',account,window.web3.thk.GetAccount('1',account))
      // window.web3.thk.GetAccount('1',account)
      window.web3.eth
        .getBalance(account)
        .then(balance => {
          window.accountManager.find(
            account
          ).balance = window.web3.utils
            .fromWei(balance.toString(), "ether")
            .toString();

          if (callback != undefined) {
            callback();
          }
        })
        .catch(error => {
          GlobalEvent.$emit("message", {
            severity: "error",
            formattedMessage:
              "Couldn't fetch account " + account + ": " + error.message
          });
        });
    },
    // 更改主机
    changeHost: function() {
      // window.web3 = window.web3.setProvider(new window.web3.providers.HttpProvider(this.host));
      window.web3 = new window.Web3(
        new window.Web3.providers.HttpProvider(this.host)
      );
      window.accountManager.accounts = [];
      localStorage.setItem("ganache-host", this.host);
      this.updateAccounts();
      GlobalEvent.$emit("clearMessages");
      GlobalEvent.$emit("ganacheHostChanged");
      this.$refs.hostModal.hide();
    }
  },
  mounted() {
    this.updateAccounts();
    GlobalEvent.$on("refreshAccounts", this.refreshAccounts);
  },
  beforeDestroy() {
    GlobalEvent.$off("refreshAccounts", this.refreshAccounts);
  }
};
</script>
<style scoped>
.balance-cell {
  width: 125px;
}
</style>

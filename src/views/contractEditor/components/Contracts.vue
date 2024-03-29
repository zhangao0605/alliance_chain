<template>
  <b-tabs
    v-bind:class="{'d-none': !contracts.length, 'd-flex': contracts.length }"
    class="w-100 bg_edit flex-column fit-parent"
    no-fade
  >
    <b-tab v-for="contract in contracts" :key="contract.id" class="container-fluid fit-parent">
      <template slot="title">
        <span>{{ contract.name + printDuplicateNumber(contract.duplicateNumber) }}</span>
        <button class="ml-1 close text-light" type="button" @click="dismiss(contract)">×</button>
      </template>
      <contract v-once v-bind:contract="contract.contract" v-bind:abi="contract.abi" />
    </b-tab>
  </b-tabs>
</template>

<script>
import Contract from "../components/Contract.vue";

export default {
  name: "contracts",
  components: {
    contract: Contract
  },
  data: function() {
    return {
      contracts: [],
      contractsCounters: {},
      counter: 0
    };
  },
  methods: {
    dismiss: function(contract) {
      this.contracts.splice(this.contracts.indexOf(contract), 1);
      this.updateContractsCounter(contract);

      if (this.contracts.length == 0) {
        setTimeout(() => {
          GlobalEvent.$emit("resizeEditor");
        }, 0);
      }
    },
    onContractCreated: function(contract) {
      contract.id = this.counter++;
      contract.duplicateNumber = this.getDuplicateNumber(contract);

      if (this.contracts.length == 0) {
        setTimeout(() => {
          GlobalEvent.$emit("resizeEditor");
        }, 0);
      }

      Object.freeze(contract);
      this.contracts.push(contract);
    },
    updateContractsCounter: function(contract) {
      for (let key in this.contracts) {
        if (this.contracts[key].name == contract.name) return;
      }
      this.contractsCounters[contract.name] = undefined;
    },
    getDuplicateNumber: function(contract) {
      if (this.contractsCounters[contract.name] != undefined) {
        this.contractsCounters[contract.name]++;
      } else {
        this.contractsCounters[contract.name] = 0;
      }
      return this.contractsCounters[contract.name];
    },
    printDuplicateNumber: function(number) {
      return number > 0 ? " (" + number + ")" : "";
    },
    onHostChanged: function() {
      this.contracts = [];
      this.contractsCounters = {};
      setTimeout(() => {
        GlobalEvent.$emit("resizeEditor");
      }, 0);
    }
  },
  mounted() {
    GlobalEvent.$on("contract", this.onContractCreated);
    GlobalEvent.$on("ganacheHostChanged", this.onHostChanged);
  },
  beforeDestroy() {
    GlobalEvent.$off("contract", this.onContractCreated);
    GlobalEvent.$off("ganacheHostChanged", this.onHostChanged);
  }
};
</script>

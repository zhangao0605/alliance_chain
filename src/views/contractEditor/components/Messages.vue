<template>
  <div class="d-flex flex-column h-50 bg_edit bottom-separator">
    <div
      class="p-2 d-flex flex-horizontal justify-content-between align-items-center flex-shrink-0"
    >
      <h5 class="m-0 d-inline-block">消息</h5>
      <div class="text-nowrap">
        <button class="btn btn-sm btn-primary mr-1" v-show="isSave" @click="saveContract()">保存合约</button>
        <button class="btn btn-sm btn-primary mr-1" @click="compile()">编译</button>
        <button class="btn btn-sm btn-primary" @click="deploy()">测试</button>
      </div>
    </div>
    <div class="flex scrollable flex-grow-1">
      <div class="col mb-2">
        <b-progress :value="100" :max="100" variant="success" animated v-if="processing"></b-progress>
      </div>
      <div class="col">
        <b-alert
          v-for="message in messages"
          :key="message.id"
          :variant="getVariant(message.severity)"
          show
          dismissible
          class="p-1 pr-4 mb-2"
          @dismissed="dismiss(message)"
        >
          <div class="w-100 overflow-auto monospace">{{ message.formattedMessage }}</div>
        </b-alert>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "messages",
  data: function() {
    return {
      messages: [],
      messageCount: 0,
      isSave: false,
      processing: false,
      requtUrl: ""
    };
  },
  methods: {
    compile: function() {
      GlobalEvent.$emit("compile");
    },
    deploy: function() {
      GlobalEvent.$emit("deploy");
    },
    dismiss: function(message) {
      this.messages.splice(this.messages.indexOf(message), 1);
    },
    getVariant: function(severity) {
      switch (severity) {
        case "error":
          return "danger";
        case "warning":
          return "warning";
        case "success":
          return "success";
        default:
          return "info";
      }
    },
    clearMessages: function() {
      this.messages = [];
    },
    addMessages: function(messages) {
      for (let i = 0; i < messages.length; i++) {
        this.addMessage(messages[i]);
      }
    },
    isShowSave: function(messages) {
      this.isSave = messages;
    },
    saveContract: function() {
      GlobalEvent.$emit("compile");
      const data = {};
      data.params = {
        root: localStorage["openDirectory"]
      };

      window.axios
        .get(this.requtUrl + "/directory", data)
        .then(
          function(response) {
            let save_all = {};
            save_all.save_all_code = [];
            save_all.save_all_name = [];
            let ishave = false;
            for (let key in response.data) {
              if (response.data[key].name === "Main.sol") {
                ishave = true;
              }
              let req_name = response.data[key].name;
              if (req_name != "build") {
                window.axios
                  .get(this.requtUrl + "/file", {
                    params: {
                      file: response.data[key].name
                    }
                  })
                  .then(
                    function(response) {
                      save_all.save_all_code.push(response.data);
                      save_all.save_all_name.push(req_name);
                      // let objs =
                      //   '{ "' + req_name + '": "' + response.data + '" }';
                      // save_all.push(objs);
                    }.bind(this)
                  );
              }
            }
            // 传输给后台

            if (ishave) {
              let path = this.get_contract_con().open_url;
              this.contract_con(1, "");
              console.log(save_all);
              this.set_conTract_list(save_all);
              this.$router.push({
                name: path,
                params: {
                  type: 1
                }
              });
              // console.log(this.$store.getters);
            } else {
              this.isSave = false;
              this.addMessage({
                formattedMessage:
                  "每个合约必须拥有必要文件Main.sol，请在左侧文件列表创建并编写！",
                severity: "error"
              });
            }
          }.bind(this)
        )
        .catch(function(error) {
          if (error.response != undefined) {
          } else {
          }
        });
    },
    addMessage: function(message) {
      // console.log(message);
      message.id = this.messageCount++;
      this.messages.push(message);
    },
    setProcessing: function(processing) {
      this.processing = processing;
    }
  },
  mounted() {
    GlobalEvent.$on("messages", this.addMessages);
    GlobalEvent.$on("isShowSave", this.isShowSave);
    GlobalEvent.$on("message", this.addMessage);
    GlobalEvent.$on("clearMessages", this.clearMessages);
    GlobalEvent.$on("processing", this.setProcessing);
    GlobalEvent.$on("browserRefresh", this.clearMessages);
  },
  beforeDestroy() {
    GlobalEvent.$off("messages", this.addMessages);
    GlobalEvent.$off("message", this.addMessage);
    GlobalEvent.$off("clearMessages", this.clearMessages);
    GlobalEvent.$off("processing", this.setProcessing);
    GlobalEvent.$off("browserRefresh", this.clearMessages);
  },
  created() {
    this.requtUrl = this.$store.getters.baseURL;
  }
};
</script>
<style scoped>
.alert {
  white-space: pre;
  font-size: 12px;
}
</style>

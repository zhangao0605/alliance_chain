<<template>
    <div>
        <div class="chain_manage_title">
            <div @click="goBackListPage" style="cursor: pointer;">交易信息</div>
            <div style="margin-left: 10px; margin-right:10px">></div>
            <div style="color: rgb(125, 70 ,245)">交易详情</div>
        </div>
        <!-- <div class="chain_info_row" style="margin-top:20px">
            <div></div>
            <div class="info_row_left" style="width: 500px">
                <el-input
                    size="medium"
                    placeholder="请输入交易哈希进行搜索"
                    suffix-icon="el-icon-search"
                    v-model="input1">
                </el-input>
                <el-button type="primary" style="margin-left: 20px;"
                @click="this.tradeInfoSearch"
                >搜索</el-button>
            </div>
        </div> -->
        <ul class="trade_wrap">
            <li class="data_row">
                <div class="li_left">交易哈希</div>
                <div class="li_right">{{detailData.hash}}</div>
            </li>
            <li class="data_row">
                <div class="li_left">时间戳</div>
                <div class="li_right">{{timestampToTime(detailData.timestamp)}}</div>
            </li>
            <li class="data_row">
                <div class="li_left">状态</div>
                <div v-show="detailData.status==1"  class="li_right">成功<img alt="img" class="img_size" src="../../assets/image/trade_suc.png"/></div>
                <div v-show="detailData.status==0"  class="li_right">失败<img alt="img" class="img_size" src="../../assets/image/trade_failed.png"/></div>
            </li>
            <li class="data_row">
                <div class="li_left">发起方</div>
                <div class="li_right">{{to_32_decimal(detailData.from)}}</div>
            </li>
            <li class="data_row">
                <div class="li_left">调用合约</div>
                <div class="li_right">{{detailData.contractName}}</div>
            </li>
            <li class="data_row">
                <div class="li_left">交易内容</div>
                <div class="li_right">{{detailData.content}}</div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'tradeDetail',
    data(){
        return {
            input1: '',
            detailData: {}
        }
    },
    created() {
        this.detailData = this.$store.getters.tradeDetailData
    },
    methods: {
        goBackListPage(){
            this.$router.push({path: '/tradeInfoList'})
        },
        tradeInfoSearch(){

        },
    }

    
}
</script>

<style scoped>
    .img_size{
        width: 20px;
        height: 20px;
        margin-left: 40px;
    }
    .li_right{
        width: 100%;
        text-align: left;
        margin-top: 10px;
        font-size: 14px;
        padding-bottom: 10px;
        color: #404040;
        border-bottom: 1px solid #E1E8F1;
    }
    .li_left{
        margin-top: 20px;
        color: #82859F;
        font-size: 14px;
        text-align: left;
    }
    .data_row{
        width: 100%;
    }
    .trade_wrap{
        background-color: #ffffff;
        width: 100%;
        margin: 0;
        min-height: 200px;
        margin-top: 20PX;
        padding: 20px 40px;
    }
    .info_row_left{
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .chain_info_row{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }
    .chain_manage_title{
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 40px;
        font-size: 18px;
        color: #333333;
    }
</style>
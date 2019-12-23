<<template>
    <div>
        <div class="chain_manage_title">
            <div @click="goBackListPage" style="cursor: pointer;">区块信息</div>
            <div style="margin-left: 10px; margin-right:10px">></div>
            <div style="color: rgb(125, 70 ,245)">区块详情</div>
        </div>
        <!-- <div class="chain_info_row" style="margin-top:20px">
            <div></div>
            <div class="info_row_left" style="width: 500px">
                <el-input
                    size="medium"
                    placeholder="请输入区块高度/区块哈希进行搜索"
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
                <div class="li_left">区块高度</div>
                <div class="li_right">{{`#${detailData.height}`}}</div>
            </li>
            <li class="data_row">
                <div class="li_left">时间戳</div>
                <div class="li_right">{{timestampToTime(detailData.timestamp)}}</div>
            </li>
            <li class="data_row">
                <div class="li_left">区块hash</div>
                <div class="li_right">{{detailData.hash}}</div>
            </li>
            <li class="data_row">
                <div class="li_left">交易数量</div>
                <div class="li_right">{{detailData.txtcount == null ? 0 : detailData.txtcount}}</div>
            </li>

            <li v-show="tradeList.length" class="data_row_list">
                <div class="li_left"
                    style="margin-bottom: 20px">交易列表</div>
                <el-table
                    :data="tradeList"
                    border
                    :show-header="false"
                    style="width: 100%">
                    <el-table-column
                    align="center"
                    label="哈希">
                        <template slot-scope="scope">
                        <span class="color_choose">{{scope.row.hash}}</span>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- <ul class="ul_right_list">
                    <li  class="li_right_list" v-for="item in tradeList" :key="item.id">
                        {{ item.hash }}
                    </li>
                </ul> -->
            </li>
        </ul>
    </div>
</template>
<script>
import blockApi from "../../apis/blockManageApi";
export default {
    name: 'blockDetail',
    data(){
        return {
            input1: '',
            detailData: {},
            tradeList: []
        }
    },
    created() {
        this.detailData = this.$store.getters.blockDetailData;
        let obj = {
            page: 1,
            pageSize: 10,
            height: this.detailData.height,
            hash: '',
            chainId: '',
            address: ''
        }
        blockApi.getBlockDataList(obj).then(response => {
            if(response.code == 200){
                this.tradeList = response.data.dataList
            }
        })
    },
    methods: {
        goBackListPage(){
            this.$router.push({path: '/blockInfoList'})
        },
        tradeInfoSearch(){
            if(this.input1){
                if(/^[0-9]*$/.test(this.input1)){
                    let obj = {
                        page: 1,
                        pageSize: 10,
                        height: this.input1,
                        hash: '',
                        chainId: '',
                        address: ''
                    }
                    blockApi.getBlockDataList(obj).then(response => {
                        if(response.code == 200){
                            this.block_data = response.data.dataList
                        }
                    })
                }else if(this.input1.substring(0,2)== '0x'){
                    let obj = {
                        page: 1,
                        pageSize: 3,
                        height: '',
                        hash: this.input1,
                        chainId: '',
                        address: ''
                    }
                    blockApi.getBlockDataList(obj).then(response => {
                        if(response.code == 200){
                            this.block_data = response.data.dataList
                        }
                    })
                }else {
                    alert('请输入正确格式的搜索条件')
                }
            }else {
                let obj = {
                    page: 1,
                    pageSize: 3,
                    height: '',
                    hash: '',
                    chainId: '',
                    address: ''
                }
                blockApi.getBlockDataList(obj).then(response => {
                    if(response.code == 200){
                        this.block_data = response.data.dataList
                    }
                })
            }
        },
    }

    
}
</script>

<style scoped>
    .left_wrap{
        position: absolute;
        width: 300px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #E1E8F1;
        border-top-width: 0;
    }
    .color_choose{
        color: #404040;
    }
    .data_row_list{
        width: 100%;
        position: relative;
        background-color: #ffffff;
    }
    .ul_right_list{
        flex: 1;
        margin: 0;
        margin-left: 300px;
        max-height: 400px;
        overflow: auto
    }
    .li_right_list{
        flex: 1;
        height: 50px;
        line-height: 50px;
        text-align: center;
        vertical-align: middle;
        border: 1px solid #E1E8F1;
        border-top-width: 0;
        border-left-width: 0;
    }
    .img_size{
        width: 24px;
        height: 24px;
        margin-right: 5px;
    }
    .li_havimg{
        display: flex;
        align-items: center;
        justify-content: center
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
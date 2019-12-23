<<template>
    <div>
        <!-- <div class="chain_manage_title">区块链管理</div> -->
        <div v-for="(item, index) in chainData" :key="index">
            <div class="chain_part">
                <div class="chain_part_item_left">
                    {{item.name}}
                </div>
                <div class="item_row">
                    <div class="chain_part_item">
                        <div class="chain_part_item_img chain_part_items">
                            <div class="chain_part_text">
                            {{item.allNode}}
                            </div>
                        </div>
                        <div class="chain_part_item_title">
                            全节点
                        </div>
                    </div>
                    <div class="chain_part_item">
                        <div class="chain_part_item_img_1 chain_part_items">
                            <div class="chain_part_text">
                            {{item.consensusNode}}
                            </div>
                        </div>
                        <div class="chain_part_item_title">
                            共识节点
                        </div>
                    </div>
                    <div class="chain_part_item">
                        <div class="chain_part_item_img_2 chain_part_items">
                            <div class="chain_part_text">
                            {{item.dataNode}}
                            </div>
                        </div>
                        <div class="chain_part_item_title">
                            数据节点
                        </div>
                    </div>
                    <div class="chain_part_item">
                        <div class="chain_part_item_img_3 chain_part_items">
                            <div class="chain_part_text">
                            {{item.height}}
                            </div>
                        </div>
                        <div class="chain_part_item_title">
                        区块高度
                        </div>
                    </div>
                    <div class="chain_part_item" v-show="item.chainId != 0">
                        <div class="chain_part_item_img_4 chain_part_items">
                            <div class="chain_part_text">
                            {{item.txCount}}
                            </div>
                        </div>
                        <div class="chain_part_item_title">
                        交易量
                        </div>
                    </div>
                </div>
               
            </div>
        </div>

        <div class="chain_info_row" style="margin-top:20px">
            <div class="info_row_left">
                <div class="chain_manage_title">
                    区块信息
                </div>
                <div
                class="div_but"
                @click="this.goMoreBlockInfo"
                >
                    查看更多>
                </div>
                <!-- <el-button type="primary" style="margin-left: 20px;"
                @click="this.goMoreBlockInfo"
                >查看更多</el-button> -->
            </div>
            <div class="info_row_left" style="width: 500px">
                <el-input
                    size="medium"
                    placeholder="请输入区块高度/区块哈希进行搜索"
                    suffix-icon="el-icon-search"
                    v-model="input1">
                </el-input>
                <el-button type="primary" style="margin-left: 20px;"
                @click="this.blockInfoSearch"
                >搜索</el-button>
            </div>
        </div>
        <el-table
            :data="block_data"
            border
            v-loading="blockLoading"
            style="width: 100%; margin-top: 20px;"
            :header-cell-style="this.tableHeaderColor"
            >
            <el-table-column
                label="时间戳"
                width="180"
                align="center">
                <template slot-scope="scope">
                <span>{{timestampToTime(scope.row.timestamp)}}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="区块高度"
                align="center">
                <template slot-scope="scope">
                <span class="to_tr color_choose" @click="clickHashOrHeight(scope.row,1)">{{`#${scope.row.height}`}}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="区块哈希"
                align="center">
                <template slot-scope="scope">
                <span class="to_tr color_choose" @click="clickHashOrHeight(scope.row,1)">{{scope.row.hash}}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="交易量"
                align="center">
                <template slot-scope="scope">
                <span class="to_tr color_choose" @click="clickHashOrHeight(scope.row,1)">{{scope.row.txtcount == null ? 0 : scope.row.txtcount}}</span>
                </template>
            </el-table-column>
        </el-table>
        <div class="chain_info_row" style="margin-top:20px">
            <div class="info_row_left">
                <div class="chain_manage_title">
                    交易信息
                </div>
                <div
                class="div_but"
                @click="this.goMoreTradeInfo"
                >
                    查看更多>
                </div>
                <!-- <el-button type="primary" style="margin-left: 20px;"
                @click="this.goMoreTradeInfo"
                >查看更多</el-button> -->
            </div>
            <div class="info_row_left" style="width: 500px">
                <el-input
                    size="medium"
                    placeholder="请输入交易哈希进行搜索"
                    suffix-icon="el-icon-search"
                    v-model="input2">
                </el-input>
                <el-button type="primary" style="margin-left: 20px;"
                @click="this.tradeInfoSearch"
                >搜索</el-button>
            </div>
        </div>
        <el-table
            :data="tr_data"
            border
            v-loading="tradLoading"
            style="width: 100%; margin-top: 20px;"
            :header-cell-style="this.tableHeaderColor"
            >
            <el-table-column
                label="时间戳"
                width="180"
                align="center">
                <template slot-scope="scope">
                <span>{{timestampToTime(scope.row.timestamp)}}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="交易哈希"
                align="center">
                <template slot-scope="scope">
                <span class="to_tr color_choose" @click="clickHashOrHeight(scope.row,2)">{{scope.row.hash}}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="发起方"
                align="center">
                <template slot-scope="scope">
                <span class="to_tr color_choose" @click="clickHashOrHeight(scope.row,2)">{{to_32_decimal(scope.row.from)}}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="调用合约名称"
                align="center">
                <template slot-scope="scope">
                <span class="to_tr color_choose" @click="clickHashOrHeight(scope.row,2)">{{scope.row.contractName}}</span>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import blockApi from "../../apis/blockManageApi";
export default {
    name: 'blockchainManagement',
    data(){
        return {
            chainData: {},
            input1: '',
            input2: '',
            tr_data: [
            ],
            block_data:[
            ],
            blockLoading: true,
            tradLoading: true,
            taskChainId: '1'
        }
    },
    created(){
        blockApi.getChainStats().then(response => {
            if(response.code == 200){
                this.chainData = response.data;
                let taskChain = this.chainData.find((item)=> item.chainId != '0')
                this.taskChainId = taskChain.chainId
                this.$store.dispatch('blockManagement/setTaskChainId', taskChain.chainId).then(() => {})   
                let obj = {
                    page: 1,
                    pageSize: 3,
                    height: '',
                    hash: '',
                    chainId: taskChain.chainId,
                    address: ''
                }
                blockApi.getBlockDataList(obj).then(response => {
                    this.blockLoading = false;
                    if(response.code == 200){
                        this.block_data = response.data.dataList
                    }else {
                        this.$message.error(response.msg);
                    }
                })
                blockApi.getTradeDataList(obj).then(response => {
                    this.tradLoading = false;
                    if(response.code == 200){
                        this.tr_data = response.data.dataList
                    }else {
                        this.$message.error(response.msg);
                    }
                })
            }
        })
    },
    methods: {
        clickHashOrHeight(data, type){
            if(type === 1){
                this.$store.dispatch('blockManagement/setBlockDetail', data).then(() => {
                    this.$router.push({path: '/blockDetail'})
                })  
            }else if(type === 2){
                this.$store.dispatch('blockManagement/setTradeDetail', data).then(() => {
                    this.$router.push({path: '/tradeDetail'})
                })    
            }
        },
        goMoreBlockInfo(){
            this.$router.push({path: '/blockInfoList'})
        },
        goMoreTradeInfo(){
            this.$router.push({path: '/tradeInfoList'})
        },
        blockInfoSearch(){
            if(this.input1){
                if(/^[0-9]*$/.test(this.input1)){
                    this.blockLoading = true;
                    let obj = {
                        page: 1,
                        pageSize: 3,
                        height: this.input1,
                        hash: '',
                        chainId: this.taskChainId,
                        address: ''
                    }
                    blockApi.getBlockDataList(obj).then(response => {
                        this.blockLoading = false;
                        if(response.code == 200){
                            this.block_data = response.data.dataList
                        }else {
                            this.$message.error(response.msg);
                        }
                    })
                }else if(this.input1.substring(0,2)== '0x'){
                    this.blockLoading = true;
                    let obj = {
                        page: 1,
                        pageSize: 3,
                        height: '',
                        hash: this.input1,
                        chainId: this.taskChainId,
                        address: ''
                    }
                    blockApi.getBlockDataList(obj).then(response => {
                        this.blockLoading = false;
                        if(response.code == 200){
                            this.block_data = response.data.dataList
                        }else {
                            this.$message.error(response.msg);
                        }
                    })
                }else {
                    this.$message({
                        message: '请输入正确格式的搜索条件',
                        type: 'warning'
                    });
                }
            }else {
                this.blockLoading = true;
                let obj = {
                    page: 1,
                    pageSize: 3,
                    height: '',
                    hash: '',
                    chainId: this.taskChainId,
                    address: ''
                }
                blockApi.getBlockDataList(obj).then(response => {
                    this.blockLoading = false;
                    if(response.code == 200){
                        this.block_data = response.data.dataList
                    }else {
                        this.$message.error(response.msg);
                    }
                })
            }
        },
        tradeInfoSearch(){
            if(this.input2){
                if(this.input2.substring(0,2)== '0x'){
                    this.tradLoading = true;
                    let obj = {
                        page: 1,
                        pageSize: 3,
                        height: '',
                        hash: this.input2,
                        chainId: this.taskChainId,
                        address: ''
                    }
                    blockApi.getTradeDataList(obj).then(response => {
                        this.tradLoading = false;
                        if(response.code == 200){
                            this.tr_data = response.data.dataList
                        }else {
                            this.$message.error(response.msg);
                        }
                    })
                }else {
                    this.$message({
                        message: '请输入正确格式的搜索条件',
                        type: 'warning'
                    });
                }
            }else {
                this.tradLoading = true;
                let obj = {
                    page: 1,
                    pageSize: 3,
                    height: '',
                    hash: '',
                    chainId: this.taskChainId,
                    address: ''
                }
                blockApi.getTradeDataList(obj).then(response => {
                    this.tradLoading =false;
                    if(response.code == 200){
                        this.tr_data = response.data.dataList
                    }else {
                        this.$message.error(response.msg);
                    }
                })
            }
        }
    }

    
}
</script>

<style scoped>
    .chain_info{
        width: 100%;
        margin-top: 20px;
    }
    .div_but{
        margin-left: 40px;
        font-size: 14px;
        color: #666666;
        cursor: pointer;
    }
    .to_tr{
        cursor: pointer;
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
    .color_choose {
        color: #666666;
        /* cursor: pointer; */
    }
    .item_row{
        width: 100%;
        display: flex;
        margin-top: 20px;
        margin-bottom: 20px;
        flex-direction: row;
        align-items: center
    }
    .chain_part {
        align-items: center
    }
    .chain_manage_title{
        font-size: 18px;
        color: #333333;
    }
    .chain_part_item_left{
        font-size: 18px;
    }
    .chain_part_text {
        width: 60px;
        text-align: center;
        word-wrap:break-word;
        font-size: 12px;
        color: #303133;
    }
    .chain_part_left_title{
        width: 200px;
        text-align: left;
        font-size: 14px;
        height: 20px;
    }
    .chain_part_item_title {
        font-size: 14px;
        height: 16px;
    }
    .chain_part_item {
        width: 180px;
        height: 140px;
        border-radius: 16px;
        margin-right: 30px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: #ffffff;
    }
    .chain_part_items {
        width: 80px;
        height: 80px;
        border-radius: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 10px;
    }
    .chain_part_item_img {
        background: url("../../assets/image/circle_1.png") no-repeat;
        background-size: 80px;
    }
    .chain_part_item_img_1 {
        background: url("../../assets/image/circle_2.png") no-repeat;
        background-size: 80px;
    }
    .chain_part_item_img_2 {
        background: url("../../assets/image/circle_3.png") no-repeat;
        background-size: 80px;
    }
    .chain_part_item_img_3 {
        background: url("../../assets/image/circle_4.png") no-repeat;
        background-size: 80px;
    }
    .chain_part_item_img_4 {
        background: url("../../assets/image/circle_5.png") no-repeat;
        background-size: 80px;
    }
</style>
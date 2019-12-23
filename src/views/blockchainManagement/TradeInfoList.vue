<<template>
    <div>
        <div class="chain_info_row">
            <div class="chain_manage_title">交易信息</div>
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
                <span class="to_tr color_choose" @click="tradeRowClick(scope.row)">{{scope.row.hash}}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="发起方"
                align="center">
                <template slot-scope="scope">
                <span class="to_tr color_choose" @click="tradeRowClick(scope.row)">{{to_32_decimal(scope.row.from)}}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="调用合约名称"
                align="center">
                <template slot-scope="scope">
                <span class="to_tr color_choose" @click="tradeRowClick(scope.row)">{{scope.row.contractName}}</span>
                </template>
            </el-table-column>
        </el-table>
        <div class="chain_info_row" style="margin-top:20px">
            <div></div>

            <el-pagination
            @current-change="pagesChange"
            background
            layout="total, prev, pager, next"
            :total="totalData.total||0">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import blockApi from "../../apis/blockManageApi";
export default {
    name: 'tradeInfoList',
    data(){
        return {
            input1: '',
            totalData: {},
            tr_data: [],
            tradLoading: true,
        }
    },
    created(){
        let obj = {
            page: 1,
            pageSize: 10,
            height: '',
            hash: '',
            chainId: this.$store.getters.taskChainId,
            address: ''
        }
        blockApi.getTradeDataList(obj).then(response => {
            this.tradLoading = false;
            if(response.code == 200){
                this.tr_data = response.data.dataList;
                this.totalData = response.data;
            }
        })
    },
    methods: {
        tradeInfoSearch(){
            if(this.input1){
                if(this.input1.substring(0,2)== '0x'){
                    this.tradLoading = true;
                    let obj = {
                        page: 1,
                        pageSize: 10,
                        height: '',
                        hash: this.input1,
                        chainId: this.$store.getters.taskChainId,
                        address: ''
                    }
                    blockApi.getTradeDataList(obj).then(response => {
                        this.tradLoading = false;
                        if(response.code == 200){
                            this.tr_data = response.data.dataList;
                            this.totalData = response.data;
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
                    pageSize: 10,
                    height: '',
                    hash: '',
                    chainId: this.$store.getters.taskChainId,
                    address: ''
                }
                blockApi.getTradeDataList(obj).then(response => {
                    this.tradLoading = false;
                    if(response.code == 200){
                        this.tr_data = response.data.dataList;
                        this.totalData = response.data;
                    }
                })
            }
        },
        tradeRowClick(row){
            this.$store.dispatch('blockManagement/setTradeDetail', row).then(() => {
                this.$router.push({path: '/tradeDetail'})
            })          
        },
        pagesChange(e){
            this.tradLoading = true;
            let obj = {
                page: e,
                pageSize: 10,
                height: '',
                hash: this.input1.substring(0,2)== '0x' ? this.input1 : '',
                chainId: this.$store.getters.taskChainId,
                address: ''
            }
            blockApi.getTradeDataList(obj).then(response => {
                this.tradLoading = false;
                if(response.code == 200){
                    this.tr_data = response.data.dataList;
                    this.totalData = response.data;
                }
            })
        }
    }

    
}
</script>

<style scoped>
    .info_row_left{
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .to_tr{
        cursor: pointer;
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
    .chain_manage_title{
        display: flex;
        flex-direction: row;
        align-items: center;
        font-size: 18px;
        color: #333333;
    }
</style>
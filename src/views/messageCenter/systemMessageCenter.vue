<<template>
    <div>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
            <el-menu-item index="1">系统通知</el-menu-item>
            <!-- <el-menu-item index="2">平台公告</el-menu-item> -->
        </el-menu>

        <div class="system_informs">
            <div class="top_row">
                <el-button type="primary" :disabled="!checkList.length"
                    @click="this.deleteItem"
                >删除</el-button>
                <el-button type="primary" :disabled="!checkList.length" style="margin-left: 20px;"
                    @click="this.markRead"
                >标记已读</el-button>
                <el-button type="primary" style="margin-left: 20px;"
                    @click="this.markReadAll"
                >已读所有消息</el-button>
            </div>

            <div class="center_list">
                <el-checkbox-group v-model="checkList" @change="handleCheckedList">
                    <el-collapse v-model="activeName" @change="clickCollRow">
                        <div class="check_row" v-for="item in messageList" v-bind:key="item.id">
                            <div class="check_wrap">
                                <el-checkbox :label="item.id" class="check_style">
                                    <div class="content_center" style="color: #303133" v-show="blackCheck==item.id">
                                        <img alt="img" class="img_size" src="../../assets/image/dot_black.png"/>{{item.title}}
                                    </div>
                                    <div class="content_center" style="color: #303133" v-show="item.status==0&&blackCheck!=item.id">
                                        <img alt="img" class="img_size" src="../../assets/image/dot_red.png"/>{{item.title}}
                                    </div>
                                    <div class="content_center" style="color: #cccccc" v-show="item.status==1&&blackCheck!=item.id">
                                        <img alt="img" class="img_size" src="../../assets/image/dot_gray.png"/>{{item.title}}
                                    </div>
                                </el-checkbox>
                            </div>
                            <el-collapse-item  :name="item.id" style="flex: 1; border-bottom: 1px solid #e9e9e9;margin-left:200px">
                                <div class="row_between"  slot="title">
                                    <div></div>
                                    <div :class="item.status==1&&blackCheck!=item.id ? 'time_style_gray' : 'time_style'">
                                        {{timestampToTime(item.createTime)}}
                                    </div>
                                </div>
                                <div class="content_style">{{item.description}}</div>
                            </el-collapse-item>
                        </div>
                    </el-collapse>
                </el-checkbox-group>
                <div class="chain_info_row" style="margin-top:20px">
                    <div></div>

                    <el-pagination
                    @current-change="pagesChange"
                    background
                    :current-page="currentPage"
                    layout="total, prev, pager, next"
                    :total="totalData.total||0">
                    </el-pagination>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
import blockApi from "../../apis/blockManageApi";
export default {
    name: 'systemMessageCenter',
    data(){
        return {
            activeIndex: '1',
            checkList: [],
            activeName: '-1',
            blackCheck: '',
            currentPage: 1,
            messageList: [],
            totalData: {}
        }
    },
    created(){
        let obj = {
            page: 1,
            rows: 10,
            status: ''
        }
        blockApi.getSystemMessageData(obj).then(response => {
            if(response.code == 200){
                this.messageList = response.data.data;
                this.totalData = response.data;
            }
        })
    },
    methods: {
        deleteItem(){
            if(this.checkList.length){
                let idStr = this.checkList.join(',');
                let obj = {
                    ids: idStr,
                    status: 2,
                    readAll: false
                }
                blockApi.changeSystemMessageStatus(obj).then(response => {
                    if(response.code == 200){
                        for(let i = 0; i < this.checkList.length; i++){
                            this.messageList.splice(this.messageList.findIndex((item)=> item.id == this.checkList[i]),1)
                        }
                        if(this.currentPage > 1){
                            let pages = this.currentPage;
                            if(!this.messageList.length){
                                this.currentPage = this.currentPage - 1;
                                pages = this.currentPage;
                            }
                            let obj = {
                                page: pages,
                                rows: 10,
                                status: ''
                            }
                            blockApi.getSystemMessageData(obj).then(response => {
                                if(response.code == 200){
                                    this.messageList = response.data.data;
                                    this.totalData = response.data;
                                }
                            })
                        }else {
                            let obj = {
                                page: 1,
                                rows: 10,
                                status: ''
                            }
                            blockApi.getSystemMessageData(obj).then(response => {
                                if(response.code == 200){
                                    this.messageList = response.data.data;
                                    this.totalData = response.data;
                                }
                            })
                        }
                        this.checkList = []
                    }
                })
            }
        },
        markRead(){
            if(this.checkList.length){
                let idStr = this.checkList.join(',');
                let obj = {
                    ids: idStr,
                    status: 1,
                    readAll: false
                }
                blockApi.changeSystemMessageStatus(obj).then(response => {
                    if(response.code == 200){
                        for(let i = 0; i < this.checkList.length; i++){
                            for(let j = 0; j < this.messageList.length; j++){
                                if(this.checkList[i] == this.messageList[j].id){
                                    this.messageList[j].status = 1;
                                }
                            }
                        }
                        this.checkList = []
                    }
                })
            }
        },
        markReadAll(){
            if(this.messageList.length){
                let argList = this.messageList.filter((item)=>item.status == 0);
                let idStr = '';
                for(let i = 0; i < argList.length; i++){
                    idStr = idStr ? idStr + ',' + argList[i].id : idStr + argList[i].id;
                }
                let obj = {
                    ids: idStr,
                    status: 1,
                    readAll: true
                }
                blockApi.changeSystemMessageStatus(obj).then(response => {
                    if(response.code == 200){
                        for(let j = 0; j < this.messageList.length; j++){
                            if(this.messageList[j].status != 1){
                                this.messageList[j].status = 1;
                            }
                        }
                    }
                })
            }
        },
        handleCheckedList(value){
        },
        clickCollRow(arg){
            this.activeName = this.activeName[this.activeName.length - 1];
            for(let i = 0; i < this.messageList.length; i++){
                if(this.messageList[i].id === this.activeName && this.messageList[i].status == 0){
                    let obj = {
                        ids: this.messageList[i].id.toString(),
                        status: 1,
                        readAll: false
                    }
                    blockApi.changeSystemMessageStatus(obj).then(response => {
                        if(response.code == 200){
                            this.blackCheck = this.messageList[i].id;
                            this.messageList[i].status = 1;
                        }
                    })
                    break;
                }else if(this.blackCheck === this.messageList[i].id){
                    this.blackCheck = '';
                    this.checkList.splice(this.checkList.indexOf(this.messageList[i].id),1)
                }
            }
        },
        pagesChange(e){
            this.currentPage = e
            let obj = {
                page: e,
                rows: 10,
                status: ''
            }
            blockApi.getSystemMessageData(obj).then(response => {
                if(response.code == 200){
                    this.messageList = response.data.data;
                    this.totalData = response.data;
                }
            })
        }
    }
}
</script>

<style scoped>
    .system_informs{
        width: 100%
    }
    .chain_info_row{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }
    .check_wrap{
        position: absolute;
        width: 200px;
        top:0;
        bottom: 0;
        background-color: #fff;
    }
    .content_style{
        width: 100%;
        padding-left: 50px;
        font-size: 14px;
        font-weight: normal;
    }
    .time_style{
        width: 200px;
        height: 50px;
        text-align: right;
        margin-right: 20px;
        color: #303133
    }
    .time_style_gray{
        width: 200px;
        height: 50px;
        text-align: right;
        margin-right: 20px;
        color: #cccccc
    }
    .check_style{
        margin-left: 20px;
        height: 50px;
        display: flex;
        flex-direction: row;
        align-items: center
    }
    .content_center{
        display: flex;
        flex-direction: row;
        align-items: center
    }
    .img_size{
        width: 24px;
        height: 24px;
    }
    .row_between{
        flex:1;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between
    }
    .check_row{
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        position: relative
    }
    .center_list{
        margin-top: 20px;
    }
    .top_row{
        margin-top: 20px;
        display: flex;
        flex-direction: row;
        align-items: center
    }
</style>

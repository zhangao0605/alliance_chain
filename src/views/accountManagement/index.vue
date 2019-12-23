<template>
    <div class="account_bg">
        <div></div>
        <div class="title_style">企业信息</div>
        <div class="text_style">企业名称：{{accountInfo.companyName}}</div>
        <div class="text_style">注册账户：{{accountInfo.enterpriseEmail}}</div>

        <div class="title_style">账户信息</div>
        <div class="text_style">登录邮箱：{{accountInfo.email}}</div>
        <div class="text_style">用户名：{{accountInfo.email}}</div>
        <div class="text_style">身份角色：{{accountInfo.roles[0].name}}</div>
        <div class="text_style_click">密码：******** <el-link class="link_style" type="primary" @click="dialogPassword = true">修改</el-link></div>
        <div class="text_style_click">手机号：{{accountInfo.phone}} <el-link class="link_style" type="primary" @click="dialogPhoneNum = true">修改</el-link></div>
        <div class="text_style">上次登录：{{timestampToTime(accountInfo.lastLoginInfo.createTime)}}</div>

        <div class="title_style">验证信息</div>
        <div class="text_style_click pubkey_style">公钥：{{accountInfo.publicKey}}
            <!-- <el-link class="link_style" type="primary" @click="resetPublickey">重置公钥</el-link> -->
        </div>
        <div class="text_style_click">私钥：<el-link class="link_style" type="primary" @click="downloadPrivatekey">下载私钥</el-link></div>

        <el-dialog :show-close="false" title="修改密码" :visible.sync="dialogPassword" center width="30%">
            <div class="input_wrap">
                <el-form :model="form" :rules="rules" status-icon ref="ruleFormPass" class="demo-ruleForm">
                    <el-form-item label="旧密码" label-width="70px" prop="oldpassword">
                        <el-input type="password" v-model="form.oldpassword" autocomplete="off" class="input_style"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" label-width="70px" prop="newpassword">
                        <el-input type="password" v-model="form.newpassword" autocomplete="off" class="input_style"></el-input>
                    </el-form-item>
                    <el-form-item label="再次确认" label-width="70px" prop="againnewpassword">
                        <el-input type="password" v-model="form.againnewpassword" autocomplete="off" class="input_style"></el-input>
                    </el-form-item>

                    <el-form-item class="button_style">
                        <el-button @click="giveUpChangePass('ruleFormPass')">放弃修改</el-button>
                        <el-button type="primary" @click="changePassword('ruleFormPass')">确认修改</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
        <el-dialog :show-close="false" title="修改绑定手机" :visible.sync="dialogPhoneNum" center width="30%">
            <div class="input_wrap">
                <el-form :model="form_phone" :rules="rules_phone" status-icon ref="ruleFormPhone" class="demo-ruleForm">
                    <el-form-item label="新手机号" label-width="70px" prop="phone">
                        <el-input v-model="form_phone.phone" autocomplete="off" class="input_style_phone"></el-input>
                    </el-form-item>
                    <el-form-item label="验证码" label-width="70px" prop="veriNum">
                        <el-input v-model="form_phone.veriNum" autocomplete="off" class="input_style_phone">
                            <div v-show="isClickVeri" slot="append" class="ver_button">{{`${time}后重试`}}</div>
                            <div v-show="!isClickVeri" slot="append" @click="getVeriClick('ruleFormPhone')" class="ver_button">获取验证码</div>
                        </el-input>
                    </el-form-item>

                    <el-form-item class="button_style">
                        <el-button @click="giveUpChangePass('ruleFormPhone')">放弃修改</el-button>
                        <el-button type="primary" @click="changePhoneNum('ruleFormPhone')">确认修改</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>

    </div>
</template>
<script>
import {validPassword} from '../../utils/validate'
import userapi from '../../apis/userApi'
export default {
    name: 'accountManagement',
    data(){
        let validateOldPass = (rule, value, callback) => {
            if (!value) {
                callback(new Error('请输入旧密码'));
            } else if(!validPassword(value)){
                callback(new Error('密码格式不正确'));
            }  else {
                callback();
            }
        };
        let validatePass = (rule, value, callback) => {
            if (!value) {
                callback(new Error('请输入新密码'));
            } else if(!validPassword(value)){
                callback(new Error('密码格式不正确'));
            } else {
                callback();
            }
        };
        let validatePass2 = (rule, value, callback) => {
            if (!value) {
                callback(new Error('请再次输入新密码'));
            } else if (value !== this.form.newpassword) {
                callback(new Error('两次输入密码不一致!'));
            } else if(!validPassword(value)){
                callback(new Error('密码格式不正确'));
            } else {
                callback();
            }
        };
        let validatePhone = (rule, value, callback) => {
            if (!value) {
                callback(new Error('请输入手机号'));
            } else if(!(/^1[3456789]\d{9}$/.test(value))){
                callback(new Error('手机号码有误，请重填'));
            } else {
                callback();
            }
        };
        return {
            accountInfo: {},
            dialogPassword: false,
            dialogPhoneNum: false,
            time: 59,
            isClickVeri: false,
            getVeriCodeButton: '获取验证码',
            form:{
                oldpassword: '',
                newpassword:'',
                againnewpassword: ''
            },
            form_phone: {
                phone: '',
                veriNum: ''
            },
            rules_phone: {
                phone: [
                    { validator: validatePhone, trigger: 'blur' }
                ]
            },
            rules: {
                oldpassword: [
                    { validator: validateOldPass, trigger: 'blur' }
                ],
                newpassword: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                againnewpassword: [
                    { validator: validatePass2, trigger: 'blur' }
                ],
            }
        }
    },
    created(){
        this.accountInfo = this.$store.getters.userInfo;
    },
    methods: {
        changePassword(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    userapi.resetPassword("2",this.form.oldpassword, this.form.newpassword).then(response => {
                        if(response.code == 200){
                            this.dialogPassword =false;
                            this.$message({
                                message: '密码修改成功',
                                type: 'success'
                            });
                        }else {
                            this.$message.error(response.msg);
                        }
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        clearIntervalData(){
            this.isClickVeri = false;
            this.time = 59;
            this.timer && clearInterval(this.timer)
        },
        giveUpChangePass(formName){
            this.$refs[formName].resetFields();
            this.dialogPassword = false;
            this.dialogPhoneNum = false;
            this.clearIntervalData()
        },
        changePhoneNum(formName){
            if(this.form_phone.veriNum){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        userapi.resetPhone(this.form_phone.phone, this.form_phone.veriNum).then((response) => {
                            if(response.code == 200){
                                this.$message({
                                    message: '手机号修改成功',
                                    type: 'success'
                                });
                                this.giveUpChangePass(formName)
                            }else {
                                this.$message.error(response.msg);
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }else {
                this.$message({
                    message: '请输入验证码',
                    type: 'warning'
                });
            }
        },
        getVeriClick(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.isClickVeri = true;
                    this.timer = setInterval(()=>{
                        if(this.time <= 0){
                            this.timer && clearInterval(this.timer)
                            this.isClickVeri = false;
                            this.time = 59;
                        }else {
                            this.time = this.time - 1;
                        }
                    },1000)
                    userapi.getPhoneCode(this.form_phone.phone, 3).then((response) => {
                        if(response.code == 200){
                            this.$message({
                                message: '验证码发送成功',
                                type: 'success'
                            });
                        }else {
                            this.$message.error(response.msg);
                        }
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetPublickey(){

        },
        downloadPrivatekey(){
            let blob = new Blob([this.accountInfo.privateKey], { type: 'text/plain' });
            var filename = "privateKey.txt";
            var a = document.createElement('a');
            var url = window.URL.createObjectURL(blob);
            a.href = url;
            a.download = filename;
            var body = document.getElementsByTagName('body')[0];
            body.appendChild(a);
            a.click();
            body.removeChild(a);
            window.URL.revokeObjectURL(url);
        },
    },
    beforeDestroy(){
        this.timer && clearInterval(this.timer)
    }
}
</script>

<style scoped>
    .link_style{
        margin-left: 16px
    }
    .account_bg{
        background-color: #ffffff;
        padding: 20px;
        padding-left: 30px;
        padding-right: 30px;
    }
    .ver_button{
       width: 80px;
       text-align: center
    }
    .button_style{
        display: flex;
        flex-direction: row;
        justify-content: center
    }
    .input_wrap{
        display: flex;
        align-items: center;
        justify-content: center
    }
    .input_style_phone{
        width: 300px
    }
    .input_style{
        width: 200px
    }
    .text_style_click{
        font-weight: normal;
        font-size: 14px;
        height: 50px;
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .pubkey_style{
        width: 100%;
        word-break:break-all
    }
    .text_style{
        vertical-align: middle;
        font-weight: normal;
        font-size: 14px;
        height: 50px;
        line-height: 50px;
    }
    .title_style{
        width: 100%;
        height: 50px;
        line-height: 50px;
        font-size: 16px;
        font-weight: bold;
        text-align: left;
        vertical-align: middle;
        border-bottom: 1px solid #cccccc
    }
</style>
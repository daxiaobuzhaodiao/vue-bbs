<template>
  <div class="row">
    <div class="col-md-4 col-md-offset-4 floating-box">
      <!-- 消息组件 -->
      <Message :show.sync="msgShow" :type="msgType" :msg="msg"/>
      <div class="panel panel-default">
        <div class="panel-heading">
          <h3 class="panel-title">请注册</h3>
        </div>
        <!-- data-validator-form 通过它获取所有验证项的父级元素 -->
        <div class="panel-body" data-validator-form>
          <div class="form-group">
            <label class="control-label">用户名</label>
            <input v-model.trim="username" v-validator:input.required="{ regex: /^[a-zA-Z]+\w*\s?\w*$/, error: '用户名要求以字母开头的单词字符' }" 
                    type="text" class="form-control" placeholder="请填写用户名">
          </div>
          <div class="form-group">
            <label class="control-label">密码</label>
            <input id="password" v-model.trim="password" v-validator.required="{ regex: /^\w{6,16}$/, error: '密码要求 6 ~ 16 个单词字符' }" 
                    type="password" class="form-control" placeholder="请填写密码">
          </div>
          <div class="form-group">
            <label class="control-label">确认密码</label>
            <input v-model.trim="cpassword" v-validator.required="{ target: '#password' }" 
                    type="password" class="form-control" placeholder="请填写确认密码">
          </div>
          <div class="form-group">
            <label class="control-label">图片验证码</label>
            <input v-model.trim="captcha" v-validator.required="{ title: '图片验证码' }" 
                    type="text" class="form-control" placeholder="请填写验证码">
          </div>
            <div class="thumbnail" title="点击图片重新获取验证码" @click="getCaptcha">
              <!-- 在下方的 div 中插入 4 个 span 标签， 构成验证码 -->
              <div class="captcha vcenter" v-html="captchaTpl"></div>
          </div>
          <button type="submit" class="btn btn-lg btn-success btn-block" @click="register">
            <i class="fa fa-btn fa-sign-in"></i> 注册
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import createCaptcha from '@/utils/createCaptcha'
import ls from '@/utils/localStorage'

export default {
  name: 'Register',
  data() {
    return {
      captchaTpl: '',   // 验证码模版 ==== 四个 span 标签
      username: '',
      password: '',
      cpassword: '',
      captcha: '',
      msg: '',          // 消息
      msgType: '',      // 消息类型
      msgShow: false    // 是否显示消息，默认不显示
    }
  },
  // created 在实例创建完成后被立即调用，此时我们已经能访问实例的数据对象和方法了
  created() {
    this.getCaptcha()
  },
  methods: {
    getCaptcha() {
      // tpl captcha 必须和 createCaptcha 返回的对象 {tpl, captcha} 对应起来
      const{tpl, captcha} = createCaptcha()
      this.captchaTpl = tpl
      this.localCaptcha = captcha
    },

    register(e) {
      // nextTick()   ====>    https://cn.vuejs.org/v2/api/#vm-nextTick     
      // 当我们点击注册按钮后，表单验证指令有为按钮添加一个 canSubmit 的属性，但 DOM 没有立即更新，所以我们需在 $nextTick 的延迟回调里，获取更新后的元素属性，此时的 canSubmit 才是正确的值。
      this.$nextTick(() => {
        // 下方判断是为了确保 target == button 节点对象 => https://wangdoc.com/javascript/events/event.html#eventcurrenttarget%EF%BC%8Ceventtarget
        const target = e.target.type === 'submit' ? e.target : e.target.parentElement
        if(target.canSubmit) {
          this.submit()
        }
      })
    },
    // 像 localStorage 提交数据
    submit() {
      // 检查验证项是否匹配
      if (this.captcha.toUpperCase() !== this.localCaptcha) {
        this.showMsg('验证码不正确')
        // 重新获取验证码
        this.getCaptcha()
      } else {
        // 表单里的用户信息
        const user = {
          name: this.username,
          password: this.password,
          // 根据用户名，从线上返回一张头像
          avatar: `https://api.adorable.io/avatars/200/${this.username}.png`
        }
        // 从 localStorage 获取用户信息
        const localUser = ls.getItem('user')

        if (localUser) {
          // 检查是否重名
          if (localUser.name === user.name) {
            this.showMsg('用户名已存在')
          } else {
            this.login(user)
          }
        } else {
          this.login(user)
        }
      }
    },
    // 登陆
    login(user) {
      // 保存用户信息
      ls.setItem('user', user)
      this.showMsg('注册成功', 'success')
    },
    // 弹窗提示
    showMsg(msg, type = 'warning') {
      this.msg = msg
      this.msgType = type
      this.msgShow = false

      this.$nextTick(() => {
        this.msgShow = true
      })
    }
  }
}
</script>

<style scoped>
  .thumbnail { width: 170px; margin-top: 10px; cursor: pointer;}
  .thumbnail .captcha { height: 46px; background: #E1E6E8;}
  .captcha { font-size: 24px; font-weight: bold; user-select: none;}
</style>
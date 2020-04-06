<template>
  <div id="app">
    <h1>{{ msg }}</h1>
    <icon-base name="loading" @click="ppp"></icon-base>
    <icon-base name="setting"></icon-base>

    <w-button @click="haha" >提交</w-button>
    <w-button @click="haha" disabled>提交</w-button>
    <w-button type="primary">提交</w-button>
    <w-button type="dashed">提交</w-button>
    <w-button type="danger">提交</w-button>

    <w-button type="danger" disabled>提交</w-button>


    <w-button :load="true" type="primary">提交</w-button> 
    <w-button :load="true" icon="setting">提交</w-button>
    <w-button icon="setting" position="right">提交</w-button>

    

    <w-button-group>
      <div>d</div>
      <w-button>上一页</w-button>
      <w-button>下一页</w-button>
    </w-button-group>
    <w-button-group>
      <w-button>上一页</w-button>
      <w-button type="primary">跳转</w-button>
      <w-button>下一页</w-button>
    </w-button-group>


    <w-button type="primary" block>提交</w-button>

    <w-input placeholder="你好" value="打算打算的"></w-input>
    <w-input  v-model="pp" @blur="kaka" />
    <w-input placeholder="你好" @input="kaka"></w-input>
    <w-input disabled placeholder="禁用"></w-input>

    <w-input>
      <icon-base slot="prefix" name="person"></icon-base>
    </w-input>
    <w-input>
      <icon-base slot="suffix" name="close"></icon-base>
    </w-input>

    <w-input  placeholder="禁用" :allowClear="true" ></w-input>

    

    <w-form ref="myform" :model="formData" :rules="reulsValidate">
      <w-form-item prop="name" label="用户名">
        <w-input  v-model="formData.name" placeholder="请输入" :allowClear="true" ></w-input>
      </w-form-item>
      <w-form-item prop="mail" label="邮箱">
        <w-input  v-model="formData.mail" placeholder="请输入" :allowClear="true" ></w-input>
      </w-form-item>
    </w-form>
    <w-button type="primary" block @click="submitFn">提交</w-button>


    
    <w-checkbox-group v-model="rr">
      <w-checkbox label="我是1" value="ww"></w-checkbox>
      <w-checkbox label="我是2" value="qq"></w-checkbox>
      <w-checkbox label="我是3" value="ff"></w-checkbox>
    </w-checkbox-group>
    {{rr}}

    <input type="checkbox" value="ff" v-model="rr"/>
  </div>
</template>

<script>

import getData from './util';
import IconBase from './components/IconBase.vue'
import Button from './components/Button.vue'
import ButtonGroup from './components/ButtonGroup.vue'
import WInput from './components/Input/index.js'
import wCheckbox from './components/checkbox/checkbox.vue'
import wCheckboxGroup from './components/checkbox/checkbox-group.vue'

import wForm from './components/form/form.vue'
import wFormItem from './components/form/form-item.vue'


export default {
  name: 'app',
  components:{
    IconBase,
    wButton:Button,
    wButtonGroup:ButtonGroup,
    WInput,
    wCheckbox,
    wCheckboxGroup,
    wForm,
    wFormItem
  },
  data () {
    return {
      rr:[],
      pp:'dddddd',
      msg: 'Welcome to Your Vue.js',
      kk:true,
      formData:{
        name:'',
        mail:''
      },
      reulsValidate:{
        name:[
          {
            required:true,message:'不能为空',trigger:'blur'
          }
        ],
        mail:[
          {
            required:true,message:'邮箱不能为空',trigger:'blur'
          },
          {
            type:"email",
            message:'邮箱格式不对',
            trigger:"blur"
          }
        ]
      }
    }
  },
  created() {
    this.fetchData();
    console.log(333,WInput) 
    
  },
  methods: {
    ppp(val){
      console.log(777,val)
    },
    kaka(val,e){
      console.log(999,val,e)
    },
     async fetchData() {
      const data = await getData();
      this.msg = data;
    },
    haha(e){
      console.log(22,e)
      this.rr = [];
      // this.$Alert.info({
      //   content:'我是信息',
      //   duration:3
      // })
    },
    submitFn(){
      this.rr = ['ff'];
      console.log(666,this)
      this.$refs.myform.validate(valid=>{
        console.log(3333,valid)
      })
    }
  }
}
</script>

<style lang="scss">

</style>
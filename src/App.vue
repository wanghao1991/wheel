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

    <w-checkbox v-model="kk" @change="ppp" >你好</w-checkbox>
  </div>
</template>

<script>

import getData from './util';
import IconBase from './components/IconBase.vue'
import Button from './components/Button.vue'
import ButtonGroup from './components/ButtonGroup.vue'
import WInput from './components/Input/index.js'
import wCheckbox from './components/checkbox/checkbox.vue'
export default {
  name: 'app',
  components:{
    IconBase,
    wButton:Button,
    wButtonGroup:ButtonGroup,
    WInput,
    wCheckbox
  },
  data () {
    return {
      pp:'dddddd',
      msg: 'Welcome to Your Vue.js',
      kk:true
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
      this.kk =false;
      // this.$Alert.info({
      //   content:'我是信息',
      //   duration:3
      // })
    }
  }
}
</script>

<style lang="scss">

</style>
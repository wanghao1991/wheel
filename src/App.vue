<template>
  <div id="app">
    <h1>{{ msg }}</h1>
    <icon-base name="loading"></icon-base>
    <icon-base name="setting"></icon-base>

    <w-button @click="haha" :disabled="true">提交</w-button>
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
  </div>
</template>

<script>

import getData from './util';
import IconBase from './components/IconBase.vue'
import Button from './components/Button.vue'
import ButtonGroup from './components/ButtonGroup.vue'

export default {
  name: 'app',
  components:{
    IconBase,
    wButton:Button,
    wButtonGroup:ButtonGroup
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js'
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
     async fetchData() {
      const data = await getData();
      this.msg = data;
    },
    haha(e){
      console.log(22,e)
    }
  }
}
</script>

<style lang="scss">

</style>
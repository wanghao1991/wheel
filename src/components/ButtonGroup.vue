<template>
  <div class="button-group">
      <slot></slot>
  </div>
</template>

<script>
import Button from './Button.vue'
export default {
    components:{
        wButton:Button
    },
    mounted(){
        console.log(323,this.$el.children)
        let child = this.$el.children;
        for(let node of child){
            let name = node.nodeName;
            console.log(33,name)
            if(name !== 'BUTTON'){
                console.warn(`w-button-group 中子元素必须为button,而你的包含${name}`)
            }
        }
    }
}
</script>

<style lang="scss">
    .button-group{
        display: inline-flex;
        vertical-align: middle;
        align-items: center;
        >button{
            margin-left: -1px;
            border-radius: 0;
            &:first-of-type{
                margin-left: 0;
                border-radius: 3px 0 0 3px;
            }
            &:last-of-type{
                border-radius: 0 3px 3px 0;
            }
            &:hover{
                position: relative;
                z-index: 1;
            }
        }
        

    }

</style>
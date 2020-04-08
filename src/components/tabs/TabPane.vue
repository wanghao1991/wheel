<template>
  <div :class="prefixCls" v-show="show" :style="contentStyle">
      <slot></slot>
  </div>
</template>

<script>
const prefixCls = 'w-tabs-tabpane';

export default {

    name:'TabPane',
    inject:['TabInstance'],
    props:{
        name:{
            type: String
        },
        label:{
            type:[String,Function],
            default:''
        },
        icon:{
            type:String
        },
        disabled:{
            type:Boolean,
            default: false
        },
        closable:{
            type:Boolean,
            default:null
        }
    },
    data(){
        return {
            prefixCls:prefixCls,
            show:true,
            currentName:this.name
        }
    },
    computed:{
        contentStyle(){
            return {
                visibility:this.TabInstance.activeKey !== this.currentName ? 'hidden' : 'visible'
            }
        }
    },
    methods:{
        updateNav(){
            this.TabInstance.updateNav();
        }
    },
    watch:{
        name(val){
            this.currentName = val;
            this.updateNav();
        },
        label(){
            this.updateNav();
        },
        icon(){
            this.updateNav();
        },
        disabled(){
            this.updateNav();
        }
    },
    mounted(){
        this.updateNav();
    },
    destroyed(){
        this.updateNav();
    }
}
</script>

<style>
    .w-tabs-tabpane{
        width: 100%;
        flex-shrink: 0;
        outline: 0;
        transition: opacity 0.3s;
        opacity: 1;
    }
</style>
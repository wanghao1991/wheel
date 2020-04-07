<template>
  <div :class="classes">
      <div :class="[prefixCls + '-bar']">
          <div 
            :class="[prefixCls + '-nav-container']"
            tabindex=0
            ref="navcontainer"
                
            >
                <div ref="navWrap" :class="[prefixCls + '-nav-wrap',scrollable ? prefixCls + '-nav-scrollable' : '']">
                    <div ref="navScroll" :class="[prefixCls + '-nav-scroll']">
                        <div ref="nav" :class="[prefixCls + '-nav']" :style="navStyle">
                            <div :class="barClasses" :style="barStyle"></div>
                            <div :class="tabCls(item)" v-for="(item,index) in navList" :key="index" @click="handleChange(index)">
                                <Render v-if="item.labelType === 'function'" :render="item.label"></Render>
                                <template v-else>{{item.label}}</template>
                            </div>
                        </div>
                    </div>
                </div>
          </div>
      </div>
      <div :class="contentClasses" :style="contentStyle" ref="panes">
          <slot></slot>
      </div>
  </div>
</template>

<script>
const prefixCls = 'ivu-tabs';
const transitionTime = 300; 

const getNextTab = (list,activeKey,direction,countDisabledAlso)=>{
    const currentIndex = list.findIndex(tab=>tab.name === activeKey);
    const nextIndex = (currentIndex + direction + list.length)%list.length;
    const nextTab = list[nextIndex];
    if(nextTab.disabled){
        return getNextTab(list,nextTab.name,direction,countDisabledAlso)
    }else{
        return nextTab
    }
}

const focusFirst = (element,root)=>{

}
export default {
    name:'Tabs',
    mixins:[ Emitter ],
    components:{
        Icon,Render
    },
    provide(){
        return {
            TabsInstance:this
        }
    },
    props:{
        value:{
            type:[String,Number]
        },
        type:{
            validator(value){
                return oneOf(value,['line','card'])
            },
            default:'line'
        },
        closable:{
            type:Boolean,
            default:false
        },
        custContentClass:{
            type:String,
            default:''
        },
        custContentStyle:{
            type:Object
        }
    },
    data(){
        return {
            prefixCls:prefixCls,
            navList:[],
            barWidth:0,
            barOffset:0,
            activeKey:this.value,
            focusKey:this.value,
            navStyle:{
                transform:''
            },
            scrollable:false,

        }
    },
    computed:{
        classes(){
            return [
                `${prefixCls}`,
                {
                    [`${prefixCls}-card`]:this.type === 'card'
                }
            ]
        },
        contentClass(){
            return [
                `${prefixCls}-content`,
                {
                    [`${prefixCls}-content-animated`]:this.animated
                },
                this.custContentClass
            ]
        },
        barClasses(){
            return [
                `${prefixCls}-ink-bar`,
                {
                    [`${prefixCls}-ink-bar-animated`]:this.animated
                }
            ]
        }
    }
}
</script>

<style>

</style>
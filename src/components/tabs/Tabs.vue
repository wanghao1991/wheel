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
                                <icon-base v-if="item.icon" :name="item.icon"></icon-base>
                                <!-- <Render v-if="item.labelType === 'function'" :render="item.label"></Render> -->
                                <template >{{item.label}}</template>
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
import IconBase from '../IconBase.vue'
import { findComponentsDownAll, oneOf }  from '../../util/assist.js'
import elementResizeDetectorMaker from 'element-resize-detector';
const prefixCls = 'w-tabs';
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
   
    components:{
        // Icon,Render
        IconBase
    },
    provide(){
        return {
            TabInstance:this
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
        },
        animated:{
            type:Boolean,
            default:true
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
            transitioning: false
        }
    },
    watch:{

        value(val){
            this.activeKey = val;
            this.focusKey = val;
        },
        activeKey(val){
            this.focusKey = val;
            this.updateBar();
            this.updateStatus();
            this.$nextTick(()=>{
                this.scrollToActiveTab();
            })
            const nextIndex = Math.max(this.getTabIndex(this.focusKey),0);
            this.updateVisibility(nextIndex);
        }
    },
    mounted(){
        this.observer = elementResizeDetectorMaker();
        this.observer.listenTo(this.$refs.navWrap,this.handleResize);

        const hiddenParentNode = this.isInsideHiddenElement();
        if(hiddenParentNode){
            this.mutationObserver = new MutationObserver(()=>{
                if(hiddenParentNode.style.display !== 'none'){
                    this.updateBar();
                    this.mutationObserver.disconnect();
                }
            });
            this.mutationObserver.observe(hiddenParentNode,{attributes:true,childList:true,characterData:true,attributeFilter:['style']})
        }
        this.updateVisibility(this.getTabIndex(this.activeKey));

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
        contentClasses(){
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
        },
        contentStyle(){
            const x = this.getTabIndex(this.activeKey);
            const p = x == 0 ? '0%' : `-${x}00%`;

            let style = {};
            if(x > -1){
                style = {
                    transform: `translateX(${p}) translateZ(0px)`
                }
            }
            const { custContentStyle } = this;
            if(custContentStyle){
                for(const key in custContentStyle){
                    style[key] = custContentStyle[key];
                }
            }
            return style;
        },
        barStyle(){
            let style = {
                visibility: 'hidden',
                width: `${this.barWidth}px`
            };
            if(this.type === 'line'){
                style.visibility = 'visible'
            }
            if(this.animated){
                style.transform = `translate3d(${this.barOffset}px,0px,0px)`
            }else{
                style.left = `${this.barOffset}px`
            }
            return style

        }
    },
    methods:{
        getTabs(){
            const allTabPanes = findComponentsDownAll(this,'TabPane');
            const TabPanes = [];

            allTabPanes.forEach(item=>{
                if(item.tab && item.name){
                    TabPanes.push(item);
                }else if(this.$children.includes(item)){
                    TabPanes.push(item)
                }
            });
            TabPanes.sort((a,b)=>{
                if(a.index && b.index){
                    return a.index > b.index ? 1:-1;
                }
            })
            return TabPanes;
        },
        updateNav(){
          
            this.navList = [];
            this.getTabs().forEach((pane,index)=>{
                this.navList.push({
                    labelType:typeof pane.label,
                    label: pane.label,
                    icon: pane.icon || '',
                    name: pane.currentName,
                    disabled: pane.disabled,
                    closable: pane.closable
                });
                if(!pane.currentName)pane.currentName = index;
                if(index == 0){
                    if(!this.activeKey) this.activeKey = pane.currentName || index;
                }
            })
            this.updateStatus();
            this.updateBar();
        },
        updateBar(){
            this.$nextTick(()=>{
               
                const index = this.getTabIndex(this.activeKey);
                if(!this.$refs.nav) return;
                const prevTabs = this.$refs.nav.querySelectorAll(`.${prefixCls}-tab`);
                const tab = prevTabs[index];
                console.log('bar',tab)
                this.barWidth = tab ? parseFloat(tab.offsetWidth) : 0;

                if(index > 0 ){
                    let offset = 0;
                    const gutter = 16;
                    for(let i = 0; i < index; i++){
                        offset += parseFloat(prevTabs[i].offsetWidth) + gutter;
                    }
                    this.barOffset = offset;
                }else{
                    this.barOffset = 0;
                }
                this.updateNavScroll();
            })
        },
        updateStatus(){
            const tabs = this.getTabs();
            tabs.forEach(tab=>{
                tab.show = (tab.currentName === this.activeKey) || this.animated
            })
        },
        tabCls(item){

            return [
                `${prefixCls}-tab`,
                {
                    [`${prefixCls}-tab-disabled`]: item.disabled,
                    [`${prefixCls}-tab-active`]: item.name === this.activeKey,
                    [`${prefixCls}-tab-focused`]: item.name === this.focusKey,
                }
            ]
        },
        handleChange(index){
            if(this.transitioning) return;
            this.transitioning = true;
            setTimeout(()=>{
                this.transitioning = false
            },transitionTime)
            const nav = this.navList[index];
            if(nav.disabled)return;
            this.activeKey = nav.name;
            this.$emit('input',nav.name);
            this.$emit('on-click',nav.name);
        },
        handleTabKeyNavigation(e){
            if(e.keyCode !== 37 && e.keyCode !== 39) return;
            const direction = e.keyCode === 39 ? 1 : -1;
            const nextTab = getNextTab(this.navList,this.focusKey,direction);
            this.focusKey = nextTab.name;
        },
        handleRemove(index){
            if(!this.beforeRemove){
                return this.handleRemoveTab(index);
            }
            const before = this.beforeRemove(index);
            if(before&&before.then){
                before.then(()=>{
                    this.handleRemoveTab(index);
                })
            }else{
                this.handleRemoveTab(index);
            }
        },
        handleRemoveTab(index){

            const tabs = this.getTabs();
            const tab = tabs[index];
            tab.$destroy();

            if(tab.currentName == this.activeKey){
                const newTabs = this.getTabs();
                let activeKey = -1;
                if(newTabs.length){
                    const leftNoDisabledTabs = tabs.filter((item,itemIndex)=>!item.disabled && itemIndex < index);
                    const rightNoDisabledTabs = tabs.filter((item,itemIndex)=>!item.disabled && itemIndex > index);
                    if(rightNoDisabledTabs.length){
                        activeKey = rightNoDisabledTabs[0].currentName;

                    }else if(leftNoDisabledTabs.length){
                        activeKey = leftNoDisabledTabs[leftNoDisabledTabs.length - 1].currentName;
                    }else{
                        activeKey = newTabs[0].currentName;
                    }
                }
                this.activeKey = activeKey;
                this.$emit('input',activeKey)
            }
            this.$emit('on-tab-remove',tab.currentName)
            this.updateNav();
        },
        showClose(item){
            if(this.type === 'card'){
                if(item.closable !== null){
                    return item.closable
                }else{
                    return this.closable
                }
            }else{
                return false;
            }
        },
        scrollPrev(){
            const containerWidth = this.$refs.navScroll.offsetWidth;
            const currentOffset = this.getCurrentScrollOffset();

            if(!currentOffset)return;
            let newOffset = currentOffset > containerWidth ? currentOffset - containerWidth : 0;
            this.setOffset(newOffset);
        },
        scrollNext(){

            const navWidth = this.$refs.nav.offsetWidth;
            const containerWidth = this.$refs.navScroll.offsetWidth;
            const currentOffset = this.getCurrentScrollOffset();

            if(navWidth - currentOffset <= containerWidth)return;

            let newOffset = navWidth-currentOffset > containerWidth * 2 ? currentOffset+containerWidth : (navWidth-containerWidth);

            this.setOffset(newOffset);
        },
        getCurrentScrollOffset(){
            const { navStyle } = this;
            return navStyle.transform ? Number(navStyle.transform.match(/translateX\(-(\d+(\.\d+)*)px\)/)[1]) : 0;
        },
        getTabIndex(name){
           
            return this.navList.findIndex(nav => nav.name === name)
        },
        setOffset(){
            this.navStyle.transform = `translateX(-${value}px)`;
        },
        scrollToActiveTab(){
            if(!this.scrollable) return;
            const nav = this.$refs.nav;
            const activeTab = this.$el.querySelector(`.${prefixCls}-tab-active`);
            if(!activeTab) return;

            const navScroll = this.$refs.navScroll;
            const activeTabBounding = activeTab.getBoundingClientRect();
            const navScrollBounding = navScroll.getBoundingClientRect();
            const navBounding = nav.getBoundingClientRect();
            const currentOffset = this.getCurrentScrollOffset();

            let newOffset = currentOffset;

            if(navBounding.right < navScrollBounding.right){
                newOffset = nav.offsetWidth - navScrollBounding.width;
            }

            if(activeTabBounding.left < navScrollBounding.left){
                newOffset = currentOffset-(navScrollBounding.left-activeTabBounding.left)
            }else if(activeTabBounding.right > navScrollBounding.right){
                newOffset = currentOffset + activeTabBounding.right - navScrollBounding.right
            }

            if(currentOffset !== newOffset){
                this.setOffset(Math.max(newOffset,0))
            }

        },
        updateNavScroll(){
            const navWidth = this.$refs.nav.offsetWidth;
            const containerWidth = this.$refs.navScroll.offsetWidth;
            const currentOffset = this.getCurrentScrollOffset();

            if(containerWidth < navWidth){
                this.scrollable = true;
                if(navWidth - currentOffset < containerWidth){
                    this.setOffset(navWidth - containerWidth)
                }
            }else{
                this.scrollable = false;
                if(currentOffset > 0 ){
                    this.setOffset(0)
                }
            }
        },
        handleResize(){
            this.updateNavScroll();
        },
        isInsideHiddenElement(){
            let parentNode = this.$el.parentNode;
            while(parentNode && parentNode !== document.body){
                if(parentNode.style && parentNode.style.display === 'none'){
                    return parentNode;
                }
                parentNode = parentNode.parentNode;
            }
            return false;
        },
        updateVisibility(index){
            [...this.$refs.panes.querySelectorAll(`.${prefixCls}-tabpane`)].forEach((el,i)=>{
                if(index == i){

                    // [...el.$children].filter(child=>child.classList.contains(`${prefixCls}-tabpane`)).forEach(child=>{
                    //     child.style.visibility = 'visible';
                    // })
                    // if(this.captureFocus){
                    //     setTimeout(() => {
                    //         focusFirst(el, el)
                    //     }, transitionTime);
                    // }
                }else{
                    // [...el.$children].filter(child=>child.classList.contains(`${prefixCls}-tabpane`)).forEach(child=>{
                    //         child.style.visibility = 'hidden';
                    //     })

                }
            })
        }

    }
}
</script>

<style>
    .w-tabs{
        position: relative;
        overflow: hidden;
        color: #515a6e;
    }
    .w-tabs-bar{
        border-bottom: 1px solid #dcdee2;
        margin-bottom: 16px;
        
    }
    .w-tabs-nav-container{
        position: relative;
        margin-bottom: -1px;
        overflow: hidden;
        white-space: nowrap;
        font-size: 14px;
        line-height: 1.5;
        outline: 0;
    }
    .w-tabs-nav-wrap{
        position: relative;
        overflow: hidden;
    }
    .w-tabs-nav-scroll{
        overflow: hidden;
        white-space: nowrap;
    }
    .w-tabs-nav .w-tabs-tab{
        position: relative;
        cursor: pointer;
        display: inline-block;
        height: 100%;
        padding: 8px 16px;
        margin-right: 16px;    
    }
    .w-tabs-nav .w-tabs-tab-disabled{
        color:#ccc;
        pointer-events: none;
    }
    .w-tabs-nav .w-tabs-tab-active{
        color:#2d8cf0;
    }
    .w-tabs-ink-bar{
        position: absolute;
        left:0;
        bottom: 0;
        height: 2px;
        z-index: 1;
        background: #2d8cf0;
        transition: transform .3s ease-in-out;
    }
    .w-tabs-content{
        display: flex;
        flex-direction: row;
        flex-wrap:nowrap;
        transition: transform .3s ease-in-out;
    }
</style>
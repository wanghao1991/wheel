<template>
  <Button class="w-button" :class="propClass" @click="clickFn" :disabled="disabled">
      <icon-base v-if="load" name="loading" class="icon iconload"></icon-base>
      <icon-base v-if="icon&&!load" :name="icon" class="icon" ></icon-base>
      <span class="content">
          <slot></slot>
      </span>   
  </Button>
</template>

<script>
import IconBase from './IconBase.vue'
export default {
    components:{
        IconBase
    },
    props:{
        icon:{
            type:String
        },
        position:{
            type:String,
            validator(val){
                return val === 'left' || val === 'right'
            }
        },
        load:{
            type:Boolean,
            default:false
        },
        type:{
            type:String,
            default:'default'
        },
        disabled:{
            type:Boolean,
            default:false
        },
        block:{
            type:Boolean,
            default:false
        }
    },
    computed:{
        propClass(){
            let { position, type, block } = this;
            return [
                position && `icon-${position}`,
                `w-button-${type}`,
                block && `w-button-block`
            ]
        }
    },  
    methods:{
        clickFn(event){
            this.$emit('click',event)
        }
    }
}
</script>

<style lang="scss">
    $button-primary-bg:#1890ff;
    .w-button{
        position:relative;
        font-size: var(--button-size);
        height:var(--button-height);
        background: var(--button-bg);
        padding: 0 15px;
        border-radius: var(--border-radius);
        border: 1px solid var(--border-color);
        display: inline-flex;
        justify-content: center;
        align-items: center;
        vertical-align: middle;
        outline: none;
        cursor: pointer;
        color: rgba(0, 0, 0, 0.65);
        border-color: #d9d9d9;
        box-shadow: 0 2px 0 rgba(0, 0, 0, 0.015);
        transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        &:focus{
            outline: none;
        }
        &:after{
            content: '';
            display: block;
            position: absolute;
            top:-6px;
            left:-6px;
            right:-6px;
            bottom:-6px;
            pointer-events: none;
            background-repeat: no-repeat;
            background-color: $button-primary-bg;
            background-position: 50%;
            opacity:0;
            transition: all 0.3s 
        }
        &:active:after{
            opacity:.3;
            top:0;
            left:0;
            right:0;
            bottom: 0;
            transition: 0s;
        }
        
        > .icon{
            margin-right:.3em;
        }
        .content{
            font-size: 14px;
        }
        &:hover{
            border: 1px solid var(--border-hover-color);
        }
        
        &.icon-right{
            .content{
                order: 1
            }
            .icon{
                order: 2;
                margin-right: 0;
                margin-left:.3em;
            }
        }
        > .iconload{
            animation: loading 2s infinite linear;
        }
        &.w-button-default{
            &:hover{
                color: $button-primary-bg;;
                border-color:  $button-primary-bg;
            }
            
        }
        &.w-button-primary{
            color:#fff;
            background: $button-primary-bg;
            border-color:  $button-primary-bg;
            text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
            box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
            &:hover{
                color: #fff;
                background-color: #40a9ff;
                border-color: #40a9ff;
            }
        }
        &.w-button-dashed{
            border-color: #d9d9d9;
            border-style: dashed;
            &:hover{
                color: $button-primary-bg;;
                border-color:  $button-primary-bg;
            }
        }
        &.w-button-danger{
            background: #f5f5f5;
            border: 1px solid #d9d9d9;
            color:#f5222d;
            &:hover{
                background: #f5222d;
                border-color:#f5222d;
                color:#fff;
            }
            &:after{
                background-color: #f5222d;
            }
        }
        &[disabled],&[disabled]:after,&[disabled]:hover,&[disabled]:focus,&[disabled]:active{
            color: rgba(0, 0, 0, 0.25);
            background-color: #f5f5f5;
            border-color: #d9d9d9;
            text-shadow: none;
            box-shadow: none;
            cursor: not-allowed;
        }
        &.w-button-block{
            display:flex;
            width: 100%;
        }
    }
    @keyframes loading {
        0%{
            transform: rotate(0deg);
        }
        100%{
            transform: rotate(360deg);
        }
    }
</style>
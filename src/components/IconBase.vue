<template>
  <svg :class="svgClass" aria-hidden="true" @click="clickFn">
      <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
export default {
    name:'svg-icon',
    props:{
        name:{
            type:String,
            required:true
        },
        className:{
            type:String
        },
        type:{
            type:String
        }
    },
    computed:{
        iconName(){
            return `#icon-${this.name}`
        },
        svgClass() {
            const {className,type} = this;
            return [
                `svg-icon`,
                className&&`svg-icon${className}`,
                type&&`svg-icon-${type}`
            ]
        }
 
    },
    methods:{
        clickFn(){
            this.$emit('click')
        }
    }
}
</script>

<style>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.svg-icon-button{
    cursor: pointer;
}
</style>  
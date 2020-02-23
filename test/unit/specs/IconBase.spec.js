import Vue from 'vue'
import IconBaseHello from '@/components/IconBase.vue'

describe('IconBase.vue',()=>{
    it('需要传name属性',()=>{

        const Constructor = Vue.extend(IconBaseHello);
        const vm = new Constructor({
            propsData:{
                name:'setting'
            }
        }).$mount();
        const useElement = vm.$el.querySelector('use');
        console.log(222,useElement)
        expect(useElement.getAttribute('xlink:href')).to.equal('#icon-setting')
    })
})
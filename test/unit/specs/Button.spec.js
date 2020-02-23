import Vue from 'vue';
import Button from '@/components/Button.vue';

describe('Button.vue',()=>{

    it('button click 事件触发',()=>{

        const Constructor = Vue.extend(Button);
        const vm = new Constructor().$mount();

        const callback = sinon.fake();
        vm.$on('click',callback);
        vm.$el.click();
        expect(callback).to.have.been.called;
    })
})
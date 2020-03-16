
import Vue from 'vue';
import App from './App.vue'
import './icons'
import '../style/common.scss';

import wMessage from './components/Message';

Vue.prototype.$Alert = wMessage;

const app = new Vue({
    el:"#app",
    template:'<App/>',
    components:{App}
})
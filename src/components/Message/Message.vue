<script>
import {Vue, Component, Watch} from 'vue-property-decorator'
import IconBase from '../IconBase.vue'

@Component({})
export default class Message extends Vue{
    fade = 'fade'
    showTag = false
    mounted () {
        setTimeout(()=>{
            this.$el.remove();
            this.$destroy();
        },3000)
        this.showTag = true;
    }
    render(){
        const { fade,showTag } = this;
        return (
            <transition name={fade}>
                {
                    showTag ?
                    (
                        <div class="wMessage">
                            {this.$slots.default}
                        </div>
                    ):null
                }
                
            </transition>
        )
    }
}
</script>

<style lang="scss" scoped>
    .wMessage{
        position: fixed;
        padding: 10px 16px;
        border-radius: 2px;
        box-shadow: 0 2px 8px rgba(0,0,0,.2);
        background: #fff;
        display: inline-block;
        top:40px;
        left: 50%;
       // transform: translateX(-50%);
        background: #fff;
    }
    
    .fade-enter-active{
        animation: bounceInDown .5s;
    }
    .fade-leave-active{
        animation: bounceInDown .5s reverse;
    }
    @keyframes bounceInDown {

        from,
  60%,
  75%,
  90%,
  to {
    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -3000px, 0);
    transform: translate3d(0, -3000px, 0);
  }

  60% {
    opacity: 1;
    -webkit-transform: translate3d(0, 25px, 0);
    transform: translate3d(0, 25px, 0);
  }

  75% {
    -webkit-transform: translate3d(0, -10px, 0);
    transform: translate3d(0, -10px, 0);
  }

  90% {
    -webkit-transform: translate3d(0, 5px, 0);
    transform: translate3d(0, 5px, 0);
  }

  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
    }
</style>
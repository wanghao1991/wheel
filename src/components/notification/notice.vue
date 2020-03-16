<script>
import {Vue, Component, Watch} from 'vue-property-decorator'
import IconBase from '../IconBase.vue'

let seed;

function getUuid(){
    return 'alert_' + (seed++);
}
@Component({
    props:{
        profixCls:{
            type:String,
            default:''
        },
        duration:{
            type:Number,
            default:1.5
        },
        type:{
            type:String
        },
        content:{
            type:String,
            default:''
        },
        name: {
            type: String,
            required: true
        },
        onClose: {
            type: Function
        },
        withIcon:Boolean,
        transitionName:{
            type:String
        },
        closable:{
            type:Boolean,
            default:false
        }
    }
})
export default class Notice extends Vue{
    notices = [];

    get baseClass(){
        return `${this.profixCls}-notice`
    }
    get classes(){

        return [
            this.baseClass,
            this.closable && `${this.baseClass}-closable`
        ]
    }

    clearCloseTimer(){
        if(this.closeTimer){
            clearTimeout(this.closeTimer);
            this.closeTimer = null;
        }
    }
    close(){
        this.clearCloseTimer();
        this.onClose();
        this.$parent.close(this.name)
    }
    mounted () {
        this.clearCloseTimer();
        if(this.duration !== 0){
            this.closeTimer = setTimeout(()=>{

                this.close()
            },this.duration*1000)
        }
    }
    beforeDestroy () {
        this.clearCloseTimer();
    }
    render(){
        const { type,closable,transitionName,classes,baseClass } = this;
        return (
            <transition name={transitionName}>
                <div class={classes}>
                {
                    type === 'message'
                    ?(
                        <div class={baseClass+'-content'} ref="content">
                            <div class={baseClass+'-content-text'} v-html="content"></div>
                            {
                                closable ? <icon-base name="setting"></icon-base> : null
                            }
                        </div>
                        
                    )
                    :null
                }
                </div>
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
        transform: translateX(-50%);
        background: #fff;
    }
    
</style>
<script>
import {Vue, Component, Watch} from 'vue-property-decorator'
import Notice from './notice.vue'
const prefixCls = 'w-notification'
let seed = 0;
const now = Date.now();

function getUuid(){
    return `wNotification_${now}_${seed++}`
}
@Component({
    props: {
        prefixCls:{
            type:String,
            default:prefixCls
        },
        content:{
            type:String
        },

    },
    components:{
        Notice
    }
})
export default class Notification extends Vue{
    notices = [];
    tIndex = 1;
    get classes(){
        return [
            `${this.prefixCls}`
        ]
    }
    add(notice){
        const name = notice.name || getUuid();
        let _notice = Object.assign({
            content:'',
            duration:1.5,
            closable:false,
            name:name
        },notice)
        this.notices.push(_notice);
    }
    close(name){
        const { notices } = this;
        for(let [index,val] of notices.entries()){
            if(val.name === name){
                notices.splice(index,1);
                break;
            }
        }
    }
    closeAll(){
        this.notices = [];
    }
    render(){
        const { notices } = this;
        return (
            <div class={classes}>
                {notices.map(notice=>{
                    <Notice
                        key={notice.name}
                        prefix-cls={prefixCls}
                        type={notice.type}
                        content={notice.content}
                        duration={notice.duration}
                        closable={notice.closable}
                        name={notice.name}
                        transition-name={notice.transitionName}
                        on-close={notice.onClose}
                        >
                    
                    </Notice>
                })}
            </div>
        )
    }
}
</script>

<style>

</style>
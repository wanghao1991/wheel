<script>
import {Vue, Component, Watch} from 'vue-property-decorator'

@Component({
    props:{
        disabled:{
            type:Boolean,
            default:false
        },
        value:{
            type:[String,Number,Boolean],
            default:false
        },
        trueValue:{
            type:[String,Number,Boolean],
            default:true
        },
        falseValue:{
            type:[String,Number,Boolean],
            default:false
        }
    }
    
})
export default class Checkbox extends Vue{
    currentValue = this.value

    @Watch('value')
    watchValue(newVal,oldVal){
        if(newVal === this.trueValue || newVal === this.falseValue){
            this.updateModel()
        }else{
            throw('Value should be trueValue orfalseValue. ')
        }
    }

    updateModel(){
        this.currentValue = this.value === this.trueValue
    }

    mounted () {
        console.log(456,this)
    }

    change(event){
        const {disabled,trueValue,falseValue} = this;
        if(disabled)return false;

        const checked = event.target.checked;
        this.currentValue = checked;

        const value = checked ? trueValue : falseValue;
        this.$emit('change',value)
    }
    render(){
        const {disabled,currentValue,change} = this;
        return (
            <label>
                <span>
                    <input type="checkbox" disabled={disabled} checked={currentValue} on-change={change}/>
                </span>
                {this.$slots.default}
            </label>
        )
    }
}
</script>

<style>

</style>
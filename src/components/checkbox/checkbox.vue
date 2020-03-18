<script>
import {Vue, Component, Watch} from 'vue-property-decorator'
import {findComponentUpward} from '../../util/assist.js'
@Component({
    name:'wCheckbox',
    props:{
        disabled:{
            type:Boolean,
            default:false
        },
        value:{
            type:[String,Number,Boolean],
            default:false
        },
        label:{
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
    group = false
    parent = null
    model = []

    @Watch('value')
    watchValue(newVal,oldVal){
        if(newVal === this.trueValue || newVal === this.falseValue){
            this.updateModel()
        }else{
            throw('Value should be trueValue or falseValue. ')
        }
    }

    updateModel(){
        this.currentValue = this.value === this.trueValue
    }

    mounted () {
        this.parent =  findComponentUpward(this,'wCheckboxGroup');
        if(this.parent){
            this.group = true;
        }
        if(this.group){
            this.parent.updateModel(true)
        }else{
            this.updateModel()
        }
    }

    change(event){
        const {disabled,trueValue,falseValue} = this;
        if(disabled)return false;

        const checked = event.target.checked;
        this.currentValue = checked;

        const value = checked ? trueValue : falseValue;
        const ppp = checked ? event.target.value: null

        if(this.group){
            if(checked){
                this.model.push(ppp)
            }else{
                this.model.splice(this.model.indexOf(ppp),1)
            }
            console.log(55,ppp)
            
            this.parent.change(this.model)
        }else{
            this.$emit('change',value)
            this.$emit('input',value)
        }
    }
    render(){
        const {disabled,currentValue,change,group,label,model,value} = this;
        return (
            <label>
                <span>
                    {group
                    ?(<input type="checkbox" disabled={disabled} value={value} on-change={change}/>)
                    :(<input type="checkbox" disabled={disabled} checked={currentValue} on-change={change}/>)} 
                </span>
                {label}
            </label>
        )
    }
}
</script>

<style>

</style>
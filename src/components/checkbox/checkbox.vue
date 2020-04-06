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
    checks = false
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
        const ppp = event.target.value

        if(this.group){
            if(checked && !this.model.includes(ppp)){
                this.model.push(ppp)
            }else{
                let index = this.model.indexOf(ppp)
                console.log(index,this.model,ppp)
                if(index>=0){
                    this.model.splice(index,1)
                }
                
            }
            console.log(55,ppp,this.model)
            
            this.parent.change(this.model)
        }else{
            this.$emit('change',value)
            this.$emit('input',value)
        }
    }
    ppp(){
        console.log(this.model)
        this.currentValue = this.model.includes(this.value)
    }

    render(){
        const {disabled,currentValue,change,group,label,model,value,checks} = this;
        return (
            <label>
                <span>
                    {group
                    ?(<span>
                        
                        <input type="checkbox" disabled={disabled}  checked={currentValue} value={value} on-change={change}/>
                    </span>)
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
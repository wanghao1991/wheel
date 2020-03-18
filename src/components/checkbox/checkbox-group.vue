<script>
import {Vue, Component, Watch} from 'vue-property-decorator'
import {findComponentsDownAll} from '../../util/assist.js'
import emitter from '../../util/index.js'

@Component({
    name:'wCheckboxGroup',
    props:{
        value:{
            type:Array,
            default(){
                return []
            }
        }
    }
})
export default class CheckboxGroup extends Vue{
    currentValue = this.value
    childrens = []

    @Watch('value')
    watchValue(newVal,oldVal){
        this.updateModel(true)
    }
    mounted(){
        this.updateModel(true)
    }

    updateModel(update){
        this.childrens = findComponentsDownAll(this,'wCheckbox')
        if(this.childrens){
            const { value } = this;
            this.childrens.forEach(child=>{
                child.model = value;
                if(update){
                    child.currentValue = value.indexOf(child.label) > 0;
                    child.group = true;
                }
            })
        }
    }

    change(data){
        console.log(2,data)
        this.currentValue = data;
        this.$emit('change',data)
        this.$emit('input',data)
    }
    render(){

        return (

            <div>
                {this.$slots.default}
            </div>
        )
    }
}
</script>

<style>

</style>
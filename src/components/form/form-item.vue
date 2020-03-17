<script>
import {Vue, Component, Watch, Inject} from 'vue-property-decorator'
import emitter from '../../util/index.js'
import schema from 'async-validator'
@Component({
    name:'wFormItem',
    inject:['form'],
    mixins:[emitter],
    props:{
        label:{
            type:String,
            default:''
        },
        prop:{
            type:String
        }
    }
})
export default class Form extends Vue{
    isRequired = false;
    validateState = '';
    validateMessage = '';

    get fieldValue(){
        return this.form.model[this.prop]
    }

    mounted(){
        if(this.prop){
            this.dispatch('wForm','on-form-item-add',this)
        }    
        this.initialValue = this.fieldValue;
        this.setRules(); 
    }
    beforeDestroy(){
        this.dispatch('wForm','on-form-item-remove',this)
    }
    setRules(){
        let rules = this.getRules();
        if(rules.length){
            rules.every(rule=>{
                this.isRequired = rule.required;
            })
        }
        this.$on('on-form-blur',this.onFieldBlur)
        this.$on('on-form-change',this.onFieldChange)
    }
    getRules(){
        let formRules = this.form.rules;
        formRules = formRules ? formRules[this.prop]:[];
        return [].concat(formRules || []);
    }
    getFilterRule(trigger){
        const rules = this.getRules();
        return rules.filter(rule=>{
            return !rule.trigger || rule.trigger.indexOf(trigger) !== -1
        })
    }
    resetField(){
        this.validateMessage = '';
        this.validateState = '';
        this.form.model[this.prop] = this.initialValue;
    }
    validate(trigger,callback = function(){}){
        let rules = this.getFilterRule(trigger);
        if(!rules || rules.length === 0){
            return true;
        }
        this.validateState = 'validating'

        let descriptor = {};
        descriptor[this.prop] = rules;

        const validator = new schema(descriptor);

        let model = {};
        model[this.prop] = this.fieldValue;

        validator.validate(model,{
           firstFields:true 
        },errors=>{
            this.validateState = !errors ? 'success' : 'error';
            this.validateMessage = errors ? errors[0]['message']:'';
            callback(this.validateMessage)
        })
    }
    onFieldBlur(){
        this.validate('blur')
    }
    onFieldChange(){
        this.validate('change')
    }
    render(){
        const { label, validateState, isRequired, validateMessage } = this;
        let requireClass = isRequired ? 'w-form-item-label-required':null
        return (
            <div>
                {
                    label?(<label class={requireClass}>{label}</label>):null
                }
                <div>
                    {this.$slots.default}
                    {
                        validateState == 'error'?
                        (
                            <div class='w-form-item-message'>
                                {validateMessage}
                            </div>
                        ):null
                    }
                    
                </div>
                
            </div>
        )
    }
    
}
</script>

<style>
.w-form-item-label-required:before {content: '*';color: red;  }
.w-form-item-message {color: red;  }
</style>
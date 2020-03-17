<script>
import {Vue, Component, Watch, Provide} from 'vue-property-decorator'

@Component({
    name:'wForm',
    provide(){
        return {
            form:this
        }
    },
    props:{
        model:{
            type:Object
        },
        rules:{
            type:Object
        }
    }
})
export default class Form extends Vue{
    fields = [];
    created(){
        this.$on('on-form-item-add',(field)=>{
            this.fields.push(field);
        })
        this.$on('on-form-item-remove',(field)=>{
            this.fields.splice(this.fields.indexOf(field),1);
        })
    }
    resetFields(){
        this.fields.forEach(field=>{
            field.resetField()
        })
    }
    validate(callback){
        console.log(999)
        return new Promise(resolve=>{
            let valid = true;
            let count = 0;
            this.fields.forEach(field=>{
                field.validate('',errors=>{
                    if(errors){
                        valid = false;
                    }
                    if(++count === this.fields.length){
                        resolve(valid);
                        if(typeof callback === 'function'){
                            callback(valid)
                        }
                    }
                })
            })
        })
    }
    render(){

        return (
            <form>
                {this.$slots.default}
            </form>
        )
    }
}
</script>

<style>

</style>
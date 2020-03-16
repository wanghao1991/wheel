<script>
import {Vue, Component, Watch} from 'vue-property-decorator'
import IconBase from '../IconBase.vue'
@Component({
  components: { IconBase },
  props:{
    disabled:{
      type:Boolean,
      default:false
    },
    value:{
      type:[String,Number],
      default:''
    },
    allowClear:{
      type:Boolean,
      default:false
    }
  },
})
export default class Input extends Vue{
  innerValue = '';

  created () {
    this.setValue(this.value)
  }
  mounted () {
    console.log(678,this.value)
  }

  @Watch('value')
  onChangeValue(newVal,oldVal){
    console.log('kaka',newVal)
    this.setValue(newVal)
  }

  get bindAttrs(){
    const { $attrs, disabled } = this;
    return {
      ...$attrs,
      disabled,
    }
  }
  get classes(){
    const {disabled} = this;
    return {
      'w-input':true,
      [`w-input-disabled`]:disabled
    }
  }

  onInput(e){
    const val = e.target.value;
    this.setValue(val);
    this.$emit('input',val,e)
  }
  onKeydown(e){
    if(e.keyCode === 13){
      this.$emit('pressenter', e);
    }
    this.$emit('keydown', e)
  }
  onBlur(e){
    this.$emit('blur', e)
  }
  setValue(value){
    console.log(8899,this)
    this.innerValue = value
  }
  getValue(){
    return this.innerValue
  }
  getSlotOrAttrVal(name){
    const { $slots } = this;

    const slotOrVal = $slots[name];
    if(slotOrVal) return slotOrVal;

    const attrVal = this[name];
    if(attrVal) return attrVal;

    return null;
  }

  onClear(){
    console.log(776666)
    this.setValue('');
    //this.focus();

  }

  renderClearIcon(){
    const { allowClear,innerValue, onClear } = this;
    if(!allowClear || innerValue == undefined || innerValue == '' || innerValue == null){
      
      return null;
    }
    return (
      <icon-base
        name="close"
        type="button"
        on-click = {onClear}
      >
      </icon-base>
    )
  }

  renderInput(){
    const {
      innerValue,
      onInput,
      onKeydown,
      onBlur,
      getSlotOrAttrVal,
      bindAttrs,
      classes,
      allowClear,
      renderClearIcon
    } = this;

    const prefix = getSlotOrAttrVal('prefix');
    const suffix = getSlotOrAttrVal('suffix');

    const on = {
      input:onInput,
      keydown:onKeydown,
      blur:onBlur,
    }

    const inputElement = (
      <input 
        {
          ...{
            class:classes,
            attrs:bindAttrs,
            domProps:{
              value:innerValue
            },
            on
          }
        }

      />
    )
    if(!prefix && !suffix && !allowClear){
      return inputElement;
    }

    const prefixElement = prefix ? <span class="w-input-prefix">{prefix}</span> : null;
    console.log(3332221122,renderClearIcon())
    const suffixElement = suffix || allowClear ? (
      <span class="w-input-suffix">
        {renderClearIcon()}
        {suffix}
      </span>
    ) : null;
    
    return (
      <span class="w-input-wrapper">
        {prefixElement}
        {inputElement}
        {suffixElement}
      </span>
    )

  }
  renderAddon(child){

    return child;
  }
  render(){
    const {renderAddon,renderInput} = this;
    return renderAddon(renderInput())
  }
}
</script>

<style scoped lang="scss">
.w-input-wrapper{
  display: inline-block;
  position: relative;
  font-size: 12px;
  line-height: 1.5;
  .w-input{
    position: static;
    padding: 0 30px;
  }
  .w-input-prefix,
  .w-input-suffix{
    position: absolute;
    top:50%;
    line-height: 0;
    display: inline-flex;
    align-items: center;
    transform:translateY(-50%);
  }
  .w-input-prefix{
    left:12px;
  }
  .w-input-suffix{
    right:12px;
  }
}
  .w-input{
    display: inline-block;
    padding: 4px 11px;
    width: 100%;
    height: 32px;
    font-size: 12px;
    line-height: 1.5;
    color: #333;
    background-color: #fff;
    background-image: none;
    border: 1px solid #d9d9d9;
    border-radius: 2px;
    outline: none;
    transition:all .3s;
    &:focus{
      box-shadow: 0 0 0 2px rgba(27,133,255,.2);
    }
    &:hover{
      border-color: #45a2ff;
    }
    &[disabled]{
      background-color: #f5f5f5;
      opacity: 1;
      cursor: not-allowed;
      color: #aaa;
    }
  }

</style>
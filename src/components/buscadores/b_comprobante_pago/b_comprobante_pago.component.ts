import { Vue, Component } from 'vue-property-decorator'
import axios from 'axios';
import { Loading } from 'element-ui';
import { Notification } from 'element-ui';
import router from '@/router';
import Global from '@/Global';
import {TipoComprobantePagoModel} from '@/modelo/maestro/tipocomprobantepago';
import comprobantepagoService from '@/components/service/tipocomprobantepago.service';

@Component({
  name: 'bcomprobantepago'
})
export default class  BComprobantepagoComponent extends Vue {
  public ComprobantePagoModel:Array<TipoComprobantePagoModel>[];
  public ComprobantePagoModel1:Array<TipoComprobantePagoModel>[];
  public ComprobantePagoSelectModel:TipoComprobantePagoModel=new TipoComprobantePagoModel();
  blnilterstrDocType_Cod:boolean=true;
  blnilterstrDocType_Desc:boolean=false;
  clickColumn:string='';
  Column:string='';
  inputAtributo:any;
  constructor() {
    super();
    this.loadComprobante();
    
  }
  loadComprobante(){
    comprobantepagoService.GetAllComprobante()
    .then(response=>{
      this.ComprobantePagoModel=response;        
      console.log(this.ComprobantePagoModel);
      
    }).catch(error=>{
      this.$message({
        showClose: true,
        type: 'error',
        message: 'No se pudo cargar Comprobante Pago'
      });
    })
  }

  handleCurrentChange(val:TipoComprobantePagoModel){
    this.ComprobantePagoSelectModel=val;
  }

  checkComprobantePago(){
    this.$emit('ComprobantePagoSeleccionado',this.ComprobantePagoSelectModel);
  }
  closeComprobantePago(){
    this.$emit('ComprobantePagoClose');
  }
  buscarComprobante(){
    var data=Global.like(this.ComprobantePagoModel1,this.clickColumn,this.inputAtributo)
    this.ComprobantePagoModel=[];
    this.ComprobantePagoModel=data;
  }
  headerclick(val){
    this.Column=val.label;
    this.clickColumn=val.property; 
    if(val.property=="strDocType_Cod"){
      this.clickColumn=val.property;  
      this.inputAtributo='';  
      this.blnilterstrDocType_Cod=true;
      this.blnilterstrDocType_Desc=false;
    }
    if(val.property=="strDocType_Desc"){
      this.clickColumn=val.property;
      this.inputAtributo='';
      this.blnilterstrDocType_Cod=false;
      this.blnilterstrDocType_Desc=true;
    }
  }
  filterstrDocType_Cod(h,{column,$index}){
    var column1 = column.label; 
    if(this.blnilterstrDocType_Cod){
      this.Column=column1;
      this.clickColumn=column.property;
      return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
      [  h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),
        h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
        , column.label),
       ])
    }
    else{
      return h('span',{style: 'padding-left: 5px;'}, column.label);
    } 
  }
  filterstrDocType_Desc(h,{column,$index}){
    if(this.blnilterstrDocType_Desc){
      return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
      [  h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),
        h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
        , column.label),
       ])
    }
    else{
      return h('span',{style: 'padding-left: 5px;'}, column.label);
    } 
  }
  data() {
    return {
        ComprobantePagoModel:[],
        ComprobantePagoModel1:[],
        inputAtributo:'',
        Column:'',
    };

  }
}

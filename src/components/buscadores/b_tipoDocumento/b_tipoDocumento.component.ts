import { Vue, Component } from 'vue-property-decorator'
import axios from 'axios';
import { Loading } from 'element-ui';
import Global from '@/Global';
import { Notification } from 'element-ui';
import router from '@/router';
import {TipoDocIdentidadModel} from '@/modelo/maestro/tipodocidentidad';
import tipodocidentidadService from '@/components/service/tipodocidentidad.service';
@Component({
  name: 'bdocumento'
})

export default class  BDocumentoComponent extends Vue {

    public TipoDoc:Array<TipoDocIdentidadModel>[];
    public TipoDoc1:Array<TipoDocIdentidadModel>[];
    public TipoSelect:TipoDocIdentidadModel=new TipoDocIdentidadModel();
    blnilterstrDocIdent_NO:boolean=true;
    blnilterstrDocIdent_Name:boolean=false;
    clickColumn:string='';
    Column:string='';
    inputAtributo:any;
  constructor() {
    super();
    this.GetAllTipoDocumento()
  }
  GetAllTipoDocumento(){      
    tipodocidentidadService.GetAllTipoDocumento()
    .then(response=>{
      this.TipoDoc=response;
      this.TipoDoc1=response;
    }).catch(error=>{
      this.$message({
        showClose: true,
        type: 'error',
        message: 'No se puede cargar lista de tipo de documento'
      });
    })
  } 
  checkTipo(){
    this.$emit('tipoSeleccionado',this.TipoSelect);
  }
  closeTipo(){
    this.$emit('closeTipo');
  }
  seleccionar(val:TipoDocIdentidadModel){
    this.TipoSelect=val;
    this.$emit('tipoSeleccionado',this.TipoSelect);
  }
  handleCurrentChange(val:TipoDocIdentidadModel){
    this.TipoSelect=val;
  }
  buscarTipod(){
    var data=Global.like(this.TipoDoc1,this.clickColumn,this.inputAtributo)
    this.TipoDoc=[];
    this.TipoDoc=data;
  }
  headerclick(val){
    this.Column=val.label;
    if(val.property=="strDocIdent_NO"){
      this.clickColumn=val.property;  
      this.inputAtributo='';  
      this.blnilterstrDocIdent_NO=true;
      this.blnilterstrDocIdent_Name=false;
    }
    if(val.property=="strDocIdent_Name"){
      this.clickColumn=val.property;
      this.inputAtributo='';
      this.blnilterstrDocIdent_NO=false;
      this.blnilterstrDocIdent_Name=true;
    }
  }
  filterstrDocIdent_NO(h,{column,$index}){
    var column1 = column.label; 
    if(this.blnilterstrDocIdent_NO){
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
  filterstrDocIdent_Name(h,{column,$index}){
    if(this.blnilterstrDocIdent_Name){
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
        TipoDoc:[],
        TipoDoc1:[],
        inputAtributo:''
    };
  }
}

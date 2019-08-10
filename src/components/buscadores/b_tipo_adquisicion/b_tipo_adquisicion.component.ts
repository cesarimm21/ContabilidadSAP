import { Vue, Component } from 'vue-property-decorator'
import axios from 'axios';
import { Loading } from 'element-ui';
import Global from '@/Global';
import { Notification } from 'element-ui';
import router from '@/router';
import {TipoAdquisicionModel} from '@/modelo/maestro/tipoadquisicion';
import tipoadquisicionService from '@/components/service/tipoaquisicion.service';
@Component({
  name: 'btipoadquisicion'
})

export default class  BTipoAdquisicionComponent extends Vue {

    public TipoAdquisicion:Array<TipoAdquisicionModel>[];
    public TipoAdquisicion1:Array<TipoAdquisicionModel>[];
    public TipoSelect:TipoAdquisicionModel=new TipoAdquisicionModel();
    blnfilterintTypeAdq_PDB_Cod:boolean=true;
    blnfilterstrTypeAdq_PDB_Desc:boolean=false;
    
    clickColumn:string='';
    Column:string='';
  
    public search:TipoAdquisicionModel=new TipoAdquisicionModel();
    inputAtributo:any;
    loading1:boolean=true;
  constructor() {
    super();
    setTimeout(() => {
      this.GetAllTipoDocumento();
    }, 400)
  }
  GetAllTipoDocumento(){      
    tipoadquisicionService.busquedaTipoAquisicion2()
    .then(response=>{
      this.TipoAdquisicion=response;
      this.TipoAdquisicion1=response;
      this.loading1=false;
    }).catch(error=>{
      this.$message({
        showClose: true,
        type: 'error',
        message: 'No se puede cargar lista de tipo de documento'
      });
      this.loading1=false;
    })
  } 
  checkTipo(){
    this.$emit('tipoadquisicionSeleccionado',this.TipoSelect);
  }
  closeTipo(){
    this.$emit('close');
  }
  seleccionar(val){
    this.TipoSelect=val;
    this.$emit('tipoadquisicionSeleccionado',this.TipoSelect);
  }
  handleCurrentChange(val){
    this.TipoSelect=val;
  }
  
  
  filterintTypeAdq_PDB_Cod(h,{column,$index}){
    debugger;
    var column1 = column.label; 
    if(this.blnfilterintTypeAdq_PDB_Cod){
      this.Column=column1;
      this.clickColumn=column.property;
      this.search=new TipoAdquisicionModel();
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
  filterstrTypeAdq_PDB_Desc(h,{column,$index}){
    debugger;
    var column1 = column.label; 
    if(this.blnfilterstrTypeAdq_PDB_Desc){
      this.Column=column1;
      this.clickColumn=column.property;
      this.search=new TipoAdquisicionModel();
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
  headerclick(val){
    this.Column=val.label;
    if(val.property=="intTypeAdq_PDB_Cod"){
      this.clickColumn=val.property;  
      this.search=new TipoAdquisicionModel();  
      this.inputAtributo='';  
      this.blnfilterintTypeAdq_PDB_Cod=true;
      this.blnfilterstrTypeAdq_PDB_Desc=false;
    }
    if(val.property=="strTypeAdq_PDB_Desc"){
      this.clickColumn=val.property;
      this.search=new TipoAdquisicionModel();
      this.inputAtributo='';
      this.blnfilterintTypeAdq_PDB_Cod=false;
      this.blnfilterstrTypeAdq_PDB_Desc=true;
    }
  }
  buscarfilter(){
    if(this.inputAtributo!=''){
      var data=Global.like(this.TipoAdquisicion1,this.clickColumn,this.inputAtributo)
      this.TipoAdquisicion=[];
      this.TipoAdquisicion=data;
    }
    else{
      this.TipoAdquisicion=[];
      this.TipoAdquisicion=this.TipoAdquisicion1;
    }
  }

  data() {
    return {
      TipoAdquisicion:[],
      TipoAdquisicion1:[],
      inputAtributo:'',
      loading1:true
    };
  }
}

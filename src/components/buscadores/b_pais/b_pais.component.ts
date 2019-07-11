import { Vue, Component } from 'vue-property-decorator'
import axios from 'axios';
import {PaisModel} from '@/modelo/maestro/pais';
import paisService from '@/components/service/pais.service';
import { Notification } from 'element-ui';
import router from '@/router';
import Global from '@/Global';

@Component({
  name: 'bpais'
})

export default class  BPaisComponent extends Vue {
  public paisModel:Array<PaisModel>=[];
  public paisSelectModel:PaisModel=new PaisModel();
  public searchPaisModel:PaisModel=new PaisModel();
  clickColumn:string='';
  Column:string='';
  inputAtributo:any;
  blnilterstrCountry_Cod:boolean=true;
  blnilterstrCountry_Name:boolean=false;
  loading1:boolean=true;
  constructor() {
    super();
    setTimeout(() => {      
      this.load();
    }, 600)    
  }
  load(){    
    paisService.GetAllPais()
    .then(response=>{
      this.paisModel=[];
      this.paisModel=response; 
      this.loading1=false;            
    }).catch(erorr=>{
      this.loading1=false;
    })
  }
  seleccionar(val:PaisModel){
    this.paisSelectModel=val;
    this.$emit('PaisSeleccionado',this.paisSelectModel);
  }
  handleCurrentChange(val:PaisModel){
    this.paisSelectModel=val;
  }
  checkPais(){
    this.$emit('PaisSeleccionado',this.paisSelectModel)
  }
  closePais(){
    this.$emit('closePais');
  }
  searchPais(){
    if(this.clickColumn=="strCountry_Cod"){  this.searchPaisModel.strCountry_Cod=this.inputAtributo; }
    if(this.clickColumn=="strCountry_Name"){ this.searchPaisModel.strCountry_Name=this.inputAtributo; }
    paisService.searchPais(this.searchPaisModel)
    .then(resp=>{
      this.paisModel=[];
      this.paisModel=resp;    
    })

  }
  headerclick(val){
    this.Column=val.label;
    if(val.property=="strCountry_Cod"){
      this.clickColumn=val.property;  
      this.searchPaisModel=new PaisModel();  
      this.inputAtributo='';  
      this.blnilterstrCountry_Cod=true;
      this.blnilterstrCountry_Name=false;
    }
    if(val.property=="strCountry_Name"){
      this.clickColumn=val.property;
      this.searchPaisModel=new PaisModel();
      this.inputAtributo='';
      this.blnilterstrCountry_Cod=false;
      this.blnilterstrCountry_Name=true;
    }
  }
  filterstrCountry_Cod(h,{column,$index}){
    debugger;
    var column1 = column.label; 
    if(this.blnilterstrCountry_Cod){
      this.Column=column1;
      this.clickColumn=column.property;
      this.searchPaisModel=new PaisModel();
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
  filterstrCountry_Name(h,{column,$index}){
    debugger;
    
    if(this.blnilterstrCountry_Name){
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
      monedaData:[],
      inputAtributo:'',
      loading1:true
    };
  }
}

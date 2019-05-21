import { Vue, Component } from 'vue-property-decorator'
import axios from 'axios';
import { Loading } from 'element-ui';
import { Notification } from 'element-ui';
import router from '@/router';
import {BancoModel} from '@/modelo/maestro/banco';
import bancoService from '@/components/service/banco.service';
import Global from '@/Global';
@Component({
  name: 'bbanco'
})

export default class  BBancoComponent extends Vue {
    gridBanco:BancoModel[];
    clickColumn:string='';
    editing:any= {
      row:'',
      column:''
    };
    Column:string='';
    inputAtributo:any;
    blnilterstrBank_Cod:boolean=true;
    blnilterstrBank_Name:boolean=false;
    public banco:BancoModel=new BancoModel();
    public bancoSearch:BancoModel=new BancoModel();
  constructor() {
    super();
    this.loadBanco();
  }
  loadBanco(){
    bancoService.GetAllBanco()
    .then(resp=>{
        this.gridBanco=[];
        this.gridBanco=resp.data;
    })
  }
  handleCurrentChange(val){
    this.banco=val;
  } 
  seleccionar(val:BancoModel){
    this.banco=val;
    this.$emit('bancoselecionado',this.banco);
    // if(Global.nameComponent=='pagos-individual'){
    //   this.$emit('bancoselecionado',this.banco);
    // }
    // if(Global.nameComponent=='crear-proveedor'){
    //   this.$emit('bancoselecionado',this.banco);
    // }
  }
  checkBanco(){
    this.$emit('bancoselecionado',this.banco);
    // if(Global.nameComponent=='pagos-individual'){
    //     this.$emit('bancoselecionado',this.banco);
    //   }
    //   if(Global.nameComponent=='crear-proveedor'){
    //     this.$emit('bancoselecionado',this.banco);
    //   }
  }

  closeBanco(){
    this.$emit('closeBanco');
  }
  searchBanco(){
    if(this.clickColumn=="strBank_Cod"){  this.bancoSearch.strBank_Cod=this.inputAtributo; }
    if(this.clickColumn=="strBank_Name"){  
      this.bancoSearch.strBank_Name=this.inputAtributo; }
    bancoService.searchBanco(this.bancoSearch)
    .then(resp=>{
      this.gridBanco=[];
      this.gridBanco=resp;     
    })

  }
  headerclick(val){
    this.Column=val.label;
    if(val.property=="strBank_Cod"){
      this.clickColumn=val.property;  
      this.bancoSearch=new BancoModel();  
      this.inputAtributo='';  
      this.blnilterstrBank_Cod=true;
      this.blnilterstrBank_Name=false;
    }
    if(val.property=="strBank_Name"){
      this.clickColumn=val.property;
      this.bancoSearch=new BancoModel();
      this.inputAtributo='';
      this.blnilterstrBank_Cod=false;
      this.blnilterstrBank_Name=true;
    }
  }
  filterstrBank_Cod(h,{column,$index}){
    debugger;
    var column1 = column.label; 
    if(this.blnilterstrBank_Cod){
      this.Column=column1;
      this.clickColumn=column.property;
      this.bancoSearch=new BancoModel();
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
  filterstrBank_Name(h,{column,$index}){
    debugger;
    
    if(this.blnilterstrBank_Name){
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
        gridBanco:[],
        inputAtributo:''
    };
  }
  
}

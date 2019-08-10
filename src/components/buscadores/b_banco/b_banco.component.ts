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
    gridBanco1:BancoModel[];
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
    loading1:boolean=true;
  constructor() {
    super();
    setTimeout(() => {
      this.loadBanco();
    }, 400)       
  }
  loadBanco(){
    bancoService.GetAllBanco2()
    .then(resp=>{
        this.gridBanco=[];
        this.gridBanco1=[];
        this.gridBanco=resp;
        this.gridBanco1=resp;
        this.loading1=false;
    }).catch(eroor=>{
      this.loading1=false;
    })
  }
  handleCurrentChange(val){
    this.banco=val;
  } 
  seleccionar(val:BancoModel){
    this.banco=val;
    this.$emit('bancoselecionado',this.banco);
  }
  checkBanco(){
    this.$emit('bancoselecionado',this.banco);
  }
  closeBanco(){
    this.$emit('closeBanco');
  }
  searchBanco(){
    if(this.inputAtributo!=''){
      var data=Global.like(this.gridBanco1,this.clickColumn,this.inputAtributo)
      this.gridBanco=[];
      this.gridBanco=data;
    }
    else{
      this.gridBanco=[];
      this.gridBanco=this.gridBanco;
    }
    
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
        gridBanco1:[],
        inputAtributo:'',
        loading1:true
    };
  }
  
}

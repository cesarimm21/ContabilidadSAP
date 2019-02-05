import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import contextMenu from 'vue-context-menu';
import Login from '@/components/login/login.vue';
import Roles from '@/components/roles/roles.vue';
import UsuarioService from '@/components/service/usuario.service';
import LoginService from '@/components/service/login.service';
import router from '@/router';
import ElementUI from 'element-ui';
import InfiniteScroll from 'vue-infinite-scroll';
import 'element-ui/lib/theme-default/index.css';
import ButtonsAccionsComponent from '@/components/buttonsAccions/buttonsAccions.vue';

import { Notification } from 'element-ui';
@Component({
  name: 'run-pagos',
  components: { contextMenu, 'buttons-accions':ButtonsAccionsComponent}
})
export default class RunComponent extends Vue {
    outerVisible:boolean=false;
    VisibleBanco:boolean=false;
    VisibleProveedor:boolean=false;
    dialogVisible:boolean=false;
    DocIngresados:any;
    DocDeudores:any;
    DateContabilizacion:any;
    url:string;
    DateExecution:any;
    RunPagoCodigo:any;
  constructor(){
    super();
  }
  viewMoneda(){
    this.dialogVisible=true; 
  }
  viewBanco(){
    this.VisibleBanco=true;
  }
  viewProveedor(){
    this.VisibleProveedor=true;
  }
  Propuesta(){

  }
  Ejecucion(){

  }
  DateSelected(){
    var selectedValue=this.DateExecution.split('-');
    var anioSelected=selectedValue[0];
    this.RunPagoCodigo=selectedValue[2]+''+selectedValue[1]+''+anioSelected[2]+''+anioSelected[3]; 
  }
  DateContabilizacionClick(){    
    var dateNew=new Date(this.DateContabilizacion);
    var newdate = new Date();

    newdate.setDate(dateNew.getDate());
    debugger;
    var dd = newdate.getDate();
    var mm = newdate.getMonth()+1;
    var y = newdate.getFullYear();
    var someFormattedDate;
    if(dd<11&&mm<11){
        someFormattedDate = y + '-0' + mm + '-0' + dd;
    }
    if(dd>=11&&mm<11){
        someFormattedDate = y + '-0' + mm + '-' + dd;
    }
    if(dd<11&&mm>=11){
        someFormattedDate = y + '-' + mm + '-0' + dd;
    }
    if(dd>11&&mm>11){
        someFormattedDate = y + '-' + mm + '-' + dd;
    }
    this.DocIngresados=someFormattedDate;
    this.DocDeudores=someFormattedDate;
}
  handleClickInParent(val){
    console.log('algo saldra');
  
  }  
  handleCloseMoneda(){
    this.$message('cerrar el popup ');
    this.dialogVisible=false;
  }
  handleCloseBanco(){
    this.$message('cerrar el popup ');
    this.VisibleBanco=false;
  }
  handleCloseProveedor(){
    this.$message('cerrar el popup de proveedor');
    this.VisibleBanco=false;
  }
  data(){
    return{
        gridData: [], 
        tableData:[],     
        outerVisible:false,
        DateExecution:'',
        RunPagoCodigo:'',
        dialogVisible:false,
        VisibleBanco:false,
        VisibleProveedor:false,
        DateContabilizacion:'',
        DocIngresados:'',
        DocDeudores:''
    }
  }
  
}

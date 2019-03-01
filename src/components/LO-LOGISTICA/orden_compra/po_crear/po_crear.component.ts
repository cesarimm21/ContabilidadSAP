import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import router from '@/router';
import ElementUI from 'element-ui';
import InfiniteScroll from 'vue-infinite-scroll';
import 'element-ui/lib/theme-default/index.css';
import ButtonsAccionsComponent from '@/components/buttonsAccions/buttonsAccions.vue';
import {RequisicionModel} from '@/modelo/maestro/requisicion';
import ordenCompraService from '@/components/service/ordencompra.service';

import Global from '@/Global';
@Component({
    name: 'crear-po',
    components:{
        'buttons-accions':ButtonsAccionsComponent,
    }
})
export default class CrearPOComponent extends Vue {
    sizeScreen:string = (window.innerHeight - 420).toString();//'0';
    sizeScreenwidth:string = (window.innerWidth-288 ).toString();//'0';
    btnactivarrequisicion:boolean=false;
    dialogRequisicion:boolean=false;
    fecha_ejecucion:string;
    valueInsert:string;
    tableData:any[];
    //**[REQUISICION] */
    requisicionData:Array<RequisicionModel>[];
    requisicionDetalle:any[];

    //**[PROVEEDORES] */
    dialogProveedor:boolean=false;
    btnactivarpro:boolean=false;
    valueProvee:string;

    provData:any[];
    constructor(){
        super();
        Global.nameComponent='crear-po';
        this.fecha_ejecucion=Global.getParseDate(new Date().toDateString()); 
    }
    //#region [REQUISICION]
    loadRequisicion(){
        this.dialogRequisicion=true;
    }
    searchRequisicion(){
        this.getRequisicion(this.valueInsert);
    }
    getRequisicion(codigo){
        debugger;
        ordenCompraService.getRequisicionByCod(codigo)
        .then(response=>{
            this.requisicionData=response;            
        })
    }
    closeDialogReq(){
        this.dialogRequisicion=false;
    }
    desactivar_requisicion(){
        if(this.dialogRequisicion){
            this.btnactivarrequisicion=false;      
        }   
    }
    checkSelectdbRequisicion(){

    }
    activar_requisicion(){
        setTimeout(() => {
            this.btnactivarrequisicion=true;
            this.btnactivarpro=false;
          }, 120)
    }
    //#endregion

    //#region [PROVEEDORES]
    desactivar_pro(){
        if(this.dialogProveedor){
            this.btnactivarpro=false;      
        }   
    }
    activar_pro(){
        setTimeout(() => {
            this.btnactivarpro=true; 
            this.btnactivarrequisicion=false;
          }, 120)
    }
    loadPro(){
        this.dialogProveedor=true;
    }
    searchProo(){

    }
    closeDialogPro(){

    }
    checkSelectdbProveedor(){

    }
    //#endregion
    data(){
        return{
            valueInsert:'',
            tableData:[],
            requisicionDetalle:[],
            requisicionData:[],
            provData:[],
            valueProvee:''
        }
      }
  }
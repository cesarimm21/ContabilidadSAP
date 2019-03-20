import Vue from 'vue';
import {Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import router from '@/router';
import ElementUI from 'element-ui';
import InfiniteScroll from 'vue-infinite-scroll';
import 'element-ui/lib/theme-default/index.css';
import Global from '@/Global';
import { Loading } from 'element-ui';
import hesService from '@/components/service/hes.service';
import { HESModel } from '@/modelo/maestro/hes';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import ButtonsAccionsComponent from '@/components/buttonsAccions/buttonsAccions.vue';
@Component({
    name:'aprobar-hes',
    components:{
        'buttons-accions':ButtonsAccionsComponent,
        'quickaccessmenu':QuickAccessMenuComponent,
      } ,
})
export default class AprobarHesComponent extends Vue{
    sizeScreen:string = (window.innerHeight - 420).toString();//'0';
    sizeScreenwidth:string = (window.innerWidth-288 ).toString();//'0';
    formBusqueda:any={
        'strHES_NO':'',
        'desde':new Date(),
        'hasta':new Date()
      }
    strHES_NO:string='';
    fechaHasta:any=new Date();
    fechaDesde:any=new Date();
    vifprogress:boolean=true;
    textosave:string='';
    iserror:boolean=false;
    issave:boolean=false;
    valuem=0;
    fecha_actual:string;
    selectrow:any;
    currentRow:any;
    public tableData:Array<HESModel>=[]; 
    tableData1:any=[
        {
          date:Global.getParseDate(new Date().toDateString()),
          categoriacuenta: '',
          categorialinea: '',
          cuentacontable: '',
          material:'',
          material_descripcion:'',
          cantidad:0,
          unidad_medida:'',
          proveedor:'',
          moneda:'',
          prioridad:'',
          fecha_estimada:Global.getParseDate(new Date().toDateString()),
          centrocosto:'',
        }
      ];
    constructor(){
        super();
    }
    handleCurrentChange(val) {
        debugger;
        if(val!=null){
          this.selectrow=val;
          this.currentRow = val;
        }
      }
    async Buscar(){
        debugger;
        var data:any=this.formBusqueda;
        if(this.strHES_NO==''){
          data.strHES_NO='*'
        }
        else{
          data.strHES_NO=this.strHES_NO
        }
        var hdate=new Date(this.fechaHasta);
        hdate.setDate(hdate.getDate()+1)
        data.desde=await Global.getDateString(this.fechaDesde)
        data.hasta= await Global.getDateString(hdate)
        for(var i=0;i<50;i++){
          this.valuem++; 
        }
        console.log(data);
        
        await hesService.busquedaHES(data)
        .then(res=>{
          debugger;
          for(var i=0;i<50;i++){
            this.valuem++; 
          }
          console.log(res);
          if(this.valuem>=100){
            setTimeout(() => {
              console.log('/****************Busqueda***************/')
              console.log(res)
              this.tableData=res;
              this.vifprogress=false;
            }, 600)
          }
        })
        .catch(error=>{
          console.log(error);
          
        })
      }
    data(){
        return{
                
        }
    }    
}
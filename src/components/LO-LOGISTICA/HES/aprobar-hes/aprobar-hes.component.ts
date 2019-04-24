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
import {HesDetalleModel} from '@/modelo/maestro/hesDetalle';
import { Alert } from '@/types';
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
    visualizar:boolean;
    public tableData:Array<HESModel>=[]; 
    public newHes:HESModel=new HESModel();
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
        Global.nameComponent='aprobar-hes';
        // for(var i=0;i<10;i++){
        //   var reqDetalle:HESModel=new HESModel();
        //   reqDetalle.chrStatus="A";
        //   this.tableData.push(reqDetalle);
        // }    
        setTimeout(() => {
          this.load();
        }, 200)
    }
    load(){
      var view = this.$route.query.vista;
      if(view==="visualizar"){
        this.visualizar=true;
        console.log('A');
        
      }
      else{
        this.visualizar=false;
        console.log('B');
        
      }
      hesService.GetAllHes()
      .then(response=>{
        this.tableData=response;
        
        var cont=this.tableData.length;        
        for(var i=0;i<this.tableData.length;i++){
          this.tableData[i].strModified_User=Global.getParseDate(this.tableData[i].dtmProcess_Date);
        }
        for(var i=0;i<10-cont;i++){
          this.tableData.push(this.newHes);
        }
      })
    }
    handleCurrentChange(val) {
        if(val!=null){
          this.selectrow=val;
          this.currentRow = val;
        }
      }
      async validarView(){
        debugger;
        if(this.selectrow!=undefined && this.selectrow!=null && this.selectrow.intIdHESH_ID!=undefined){
          this.vifprogress=true;
          this.valuem=0;
          await setTimeout(() => {
            for(var i=0;i<100;i++){
              this.valuem++; 
            }
          }, 200)
          await setTimeout(() => {
            console.log('----,,,',this.selectrow);
            if(this.selectrow!=undefined && this.selectrow!=null && this.selectrow.intIdHESH_ID!=undefined){
              router.push({ path: `/barmenu/LO-LOGISTICA/HES/view-hes`, query: { vista: 'aprobar',data:JSON.stringify(this.selectrow) }  })
            }
          }, 600)
        }
        else{
          this.vifprogress=false;
          this.textosave='Seleccione alguna salida. ';
          this.warningMessage(this.textosave);
        }
      }
      warningMessage(newMsg : string) {
        this.$message({
          showClose: true,
          message: newMsg,
          type: 'warning'
        });
      }
    async Buscar(){
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
        await hesService.busquedaHES(data)
        .then(res=>{
          this.tableData=res;
          var cont=this.tableData.length;
          for(var i=0;i<this.tableData.length;i++){
            this.tableData[i].strModified_User=Global.getParseDate(this.tableData[i].dtmProcess_Date);
          }
          for(var i=0;i<10-cont;i++){
            this.tableData.push(this.newHes);
          }
        })
        .catch(error=>{          
        })
      }
      backPage(){
        window.history.back();
      }
      reloadpage(){
        window.location.reload();
      }
      data(){
        return{
                
        }
    }    
}
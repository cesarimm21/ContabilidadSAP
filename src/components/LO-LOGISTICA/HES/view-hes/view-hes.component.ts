import Vue from 'vue';
import {Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import router from '@/router';
import 'element-ui/lib/theme-default/index.css';
import ButtonsAccionsComponent from '@/components/buttonsAccions/buttonsAccions.vue';
import hesService from '@/components/service/hes.service';
import BCategoriaLineaComponent from '@/components/buscadores/b_categoria_linea/b_categoria_linea.vue';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import BCentroCostoComponent from '@/components/buscadores/b_centro_costo/b_centro_costo.vue';
//**BUS */
import {OrdenCompraModel} from '@/modelo/maestro/ordencompra';
import {CategoriaLineaModel} from '@/modelo/maestro/categorialinea';
import {HESModel} from '@/modelo/maestro/hes';
import {HesDetalleModel} from '@/modelo/maestro/hesDetalle';
import {CentroCostosModel} from '@/modelo/maestro/centrocostos';
import Global from '@/Global';
import { Loading } from 'element-ui';

@Component({
    name:'view-hes',
    components:{'buttons-accions':ButtonsAccionsComponent,
    'bcategorialinea':BCategoriaLineaComponent,
    'quickaccessmenu':QuickAccessMenuComponent,
    }
})
export default class ViewHesComponent extends Vue{
    nameComponent:string;
    timer=0;
    valueSwtch:boolean=true;
    codigoCompania:string;
    sizeScreen:string = (window.innerHeight - 420).toString();//'0';
    sizeScreenwidth:string = (window.innerWidth-288 ).toString();//'0';
    fecha_ejecucion:string;
    fecha_since:string;
    fecha_until:string;
    vifprogress:boolean=true;
    valuem:number=0;
    issave:boolean=false;
    iserror:boolean=false;
    textosave='';
    montoaceptado:number;
    montopendiente:number;
    txtmodulo:string='';
    vifaprobarrechasar:boolean=false;
    visualizar:boolean=false;
    //**CENTRO COSTO */
    dialogOrdenC:boolean=false;
    dialogCentroCostos:boolean=false;
    cell_ocultar:string='transparent';
    public centrocosto:CentroCostosModel=new CentroCostosModel();
    //**CATEGORIA LINEA */
    public categoriaSelect:CategoriaLineaModel=new CategoriaLineaModel();
    //**ORDEN COMPRA */
    dialogHES:boolean=false;
    btnactivarHES:boolean=false;
    dialogOrdenD:boolean=false;
    dataOrdenCompra:any[];
    public ordenCompraModel:OrdenCompraModel =new OrdenCompraModel();  
    //activar colores
    isactivered:boolean=false;
    isactiveyellow:boolean=false;
    isactivegreen:boolean=false;  
    CodigoInput:string;
    //HES
    public hesModel:HESModel =new HESModel();
    gridhesModel:HESModel[];
    gridhesTemp:HESModel[];
    hesDetalleModel:any[];
    public TableIngreso:Array<HesDetalleModel>=[];
    constructor(){
        super();
        Global.nameComponent='view-hes';
        this.txtmodulo='Visualizar Aceptación Servicio';
        for(var i=0;i<10;i++){
        var reqDetalle:HesDetalleModel=new HesDetalleModel();
        reqDetalle.chrStatus="A";
        this.TableIngreso.push(reqDetalle);
        }
        setTimeout(() => {
          this.loadHESVIEW();
      }, 200)    
    }
       //#region [HES]
    searchHes(){
        debugger;
        if(this.CodigoInput==''){
            this.$message({
                showClose: true,
                type: 'info',
                message: 'Ingrese codigo aceptación servicio'
              });
        }
        else{
            hesService.busquedaHESByCod(this.CodigoInput)
            .then(response=>{
                this.gridhesTemp=response;
            for(var i=0;i<this.gridhesTemp.length;i++){
                if(this.gridhesTemp[i].strHES_Status=='00'){
                    this.gridhesTemp[i].strHES_Status='Pendiente Aceptación Servicio';
                }
                if(this.gridhesTemp[i].strHES_Status=='30'){
                    this.gridhesTemp[i].strHES_Status='Aceptación Servicio Parcial';
                }
                if(this.gridhesTemp[i].strHES_Status=='50'){
                    this.gridhesTemp[i].strHES_Status='Aceptación Full';
                }
                this.gridhesTemp[i].strPO_Item_Desc=Global.getParseDate(this.gridhesTemp[i].dtmProcess_Date);
                }
                this.gridhesModel=this.gridhesTemp;
            })
        }
       
    }
    loadAllHES(){
    let loadingInstance = Loading.service({
      fullscreen: true,
      text: 'Guargando...',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.8)'
      }
      );   
      hesService.GetAllHes()
      .then(response=>{
      this.gridhesTemp=response;
        for(var i=0;i<this.gridhesTemp.length;i++){
            if(this.gridhesTemp[i].strHES_Status=='00'){
                this.gridhesTemp[i].strModified_User='Pendiente Aceptación Servicio';
            }
            if(this.gridhesTemp[i].strHES_Status=='30'){
                this.gridhesTemp[i].strModified_User='Aceptación Servicio Parcial';
            }
            if(this.gridhesTemp[i].strHES_Status=='50'){
                this.gridhesTemp[i].strModified_User='Aceptación Full';
            }
            this.gridhesTemp[i].strPO_Item_Desc=Global.getParseDate(this.gridhesTemp[i].dtmProcess_Date);
        }
        this.gridhesModel=this.gridhesTemp;
        loadingInstance.close();
        this.dialogHES=true;
        }).catch(error=>{
        this.$message({
            showClose: true,
            type: 'error',
            message: 'no se pudo cargar aceptación servicio'
        });
        loadingInstance.close();
        this.dialogHES=false;
        })
  }
  selectdbOrdenCompra(){
    this.dialogHES=false;
  }
  selectHES(val:HESModel){    
    this.hesModel=val;    
    this.fecha_ejecucion=Global.getParseDate(this.hesModel.dtmProcess_Date);
    this.fecha_since=Global.getParseDate(this.hesModel.dtmSince_Date);
    this.fecha_until=Global.getParseDate(this.hesModel.dtmUntil_Date);
    this.montoaceptado=this.hesModel.fltTot_Value;
    this.montopendiente=this.hesModel.fltTot_Peding_Value;
    if(this.hesModel.strHES_Status=='00'){
      this.isactivered=true;
    }
    if(this.hesModel.strHES_Status=='30'){
      this.isactiveyellow=true;
    }
    if(this.hesModel.strHES_Status=='50'){
      this.isactivegreen=true;
    }
    this.hesModel.intChange_Count=Number(this.hesModel.intChange_Count)+1;
  }
  checkHES(){    
    this.dialogHES=false;
    this.loadHESDet(this.hesModel.intIdHESH_ID); 
    
  } 
  closehes(){    
    this.btnactivarHES=false;
    this.dialogHES=false;
    this.hesModel=new HESModel();
    return false;
  }
  loadHES(){
    this.loadAllHES();
  }
  checkOrdenC(){
    this.dialogOrdenC=false;
    this.btnactivarHES=false;
  }
  activar_HES(){
    setTimeout(() => {
      this.btnactivarHES=true;
    }, 120)
  }
  desactivar_HES(){
    if(this.dialogOrdenC){
      this.btnactivarHES=false;
    }
  }
  dbclickSelect(){
    this.dialogOrdenC=false;
  }
  loadHESDet(id){    
    hesService.GetHesDetalle(id)
    .then(response=>{
        this.hesDetalleModel=[];
        this.hesDetalleModel=response; 
        this.TableIngreso=[];
        var total=this.hesDetalleModel.length;
        var dataadd=10-total;
        for(var i=0;i<total;i++){
            this.TableIngreso.push(this.hesDetalleModel[i]); 
        }
        for(var i=0;i<dataadd;i++){
            var reqDetalle:HesDetalleModel=new HesDetalleModel();
            reqDetalle.chrStatus="A";
            reqDetalle.strCurrency=this.hesModel.strCurrency;
            this.TableIngreso.push(reqDetalle);   
        }        
    })
  }
  datesince(){
    let datenuevo=this.fecha_since;
    this.hesModel.dtmSince_Date=new Date(datenuevo); 
  }
  dateuntil(){
    let datenuevo=this.fecha_since;
    this.hesModel.dtmUntil_Date=new Date(datenuevo); 
  }
//#endregion
  //#region [GUARDAR HES]
  checkViewHES(){   
    this.hesModel=new HESModel();
    this.TableIngreso=[];
    for(var i=0;i<10;i++){
      var reqDetalle:HesDetalleModel=new HesDetalleModel();
      reqDetalle.chrStatus="A";
      this.TableIngreso.push(reqDetalle);
    } 
    this.categoriaSelect=new CategoriaLineaModel();
    this.hesModel=new HESModel();
    this.montoaceptado=0;
    this.montopendiente=0;
    this.fecha_ejecucion='';
    this.fecha_since='';
    this.fecha_until='';
    this.isactivered=false;
    this.isactiveyellow=false;
    this.isactivegreen=false;
    }
      
  //#endregion
  linksUser(comand){
    router.push('/barmenu/'+comand)
  }
  //#region [CATEGORIA LINEA]
  SeleccionadoCategoriaLinea(val:CategoriaLineaModel){
    this.categoriaSelect=val;
    this.hesModel.intIdCategLine_ID=this.categoriaSelect.intIdCategLine_ID;
    this.hesModel.strCategItem_Cod=this.categoriaSelect.strCategItem_Cod;  
  }
  //#endregion
    //#region [LOAD GET]
    loadHESVIEW(){
      debugger;
      var object = JSON.parse(this.$route.query.data);
      var modulo = this.$route.query.vista;
      this.hesModel=object;
      this.fecha_ejecucion=Global.getParseDate(this.hesModel.dtmProcess_Date);
      this.fecha_since=Global.getParseDate(this.hesModel.dtmSince_Date);
      this.fecha_until=Global.getParseDate(this.hesModel.dtmUntil_Date);
      this.montoaceptado=this.hesModel.fltTot_Value;
      this.montopendiente=this.hesModel.fltTot_Peding_Value;
      if(this.hesModel.strHES_Status=='00'){
        this.isactivered=true;
      }
      if(this.hesModel.strHES_Status=='30'){
        this.isactiveyellow=true;
      }
      if(this.hesModel.strHES_Status=='50'){
        this.isactivegreen=true;
      }
      this.loadHESDet(this.hesModel.intIdHESH_ID)
      if(modulo.toLowerCase()!='aprobar'){        
        this.vifaprobarrechasar=false;
        if(modulo.toLowerCase()!='visualizar'){
          this.visualizar=true;
        }
        else{
          this.visualizar=false;
        }
      }
      else{
          this.visualizar=true;
          if(this.hesModel.strHES_Status=='50'){
            this.vifaprobarrechasar=false;
            this.txtmodulo='Aceptado Servicio';
          }
          else{
            this.vifaprobarrechasar=true;
            this.txtmodulo='Aprobar Aceptación Servicio';
          }         
      }
    }
  async aprobar(){
      this.valuem=0;
      // this.OrdenCompra.strAuthsd_By='ADMINISTRADOR';
      // this.OrdenCompra.intIdPurReqH_ID=this.intIdPurReqH_ID;
      // this.OrdenCompra.intIdVendor_ID=this.intIdVendor_ID;
      // this.OrdenCompra.intIdTypeReq_ID=this.intIdTypeReq_ID;
      // this.OrdenCompra.intIdPurReqH_ID=this.intIdPurReqH_ID;
      // this.OrdenCompra.intIdWHS_ID=this.intIdWHS_ID;
      await setTimeout(() => {
          for(var i=0;i<100;i++){
          this.valuem++; 
          }
      }, 200)
      await hesService.aprobarHES(this.hesModel)
      .then(res=>{
          router.push({ path: `/barmenu/LO-LOGISTICA/HES/aprobar-hes`});
          this.$route.query.data='';
          this.hesModel=new HESModel();
          this.montoaceptado=0;
          this.montopendiente=0;
          this.hesModel.fltTot_QTY=0;
          this.hesModel.dtmSince_Date=new Date();
          this.hesModel.dtmUntil_Date=new Date();
          this.fecha_ejecucion='';
          this.fecha_since='';
          this.fecha_until='';
          this.isactivered=false;
          this.isactiveyellow=false;
          this.isactivegreen=false;
          this.textosave = 'Se Aprobó Correctamente ';
          this.textosave='Se aprobó correctamente. '+res.strHES_NO;
          this.openMessage('Se aprobó correctamente '+res.strHES_NO);
      })
      .catch(error=>{
          this.issave = false;
          this.iserror = true;
          this.textosave='Ocurrio un error inesperado. ';
      })
  }
  openMessage(newMsg : string) {
    this.$message({
      showClose: true,
      message: newMsg,
      type: 'success'
    });
  }
  backPage(){
    window.history.back();
  }
  reloadpage(){
    window.location.reload();
  }
    data(){
        return{
            nameComponent:'edit-hes',
            dialogTableVisible: false,
            codigoCompania:'',
            value:'',
            dataOrdenCompra:[],
            gridhesModel:[],
            valueSwtch:true,
            montoaceptado:0,
            montopendiente:0,
            hesDetalleModel:[],
            fecha_ejecucion:'',
            fecha_since:'',
            fecha_until:'',
            CodigoInput:''
        }
    }

}
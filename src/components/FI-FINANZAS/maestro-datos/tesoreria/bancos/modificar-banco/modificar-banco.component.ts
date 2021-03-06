import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import { Loading } from 'element-ui';
import BGrupoProcesoComponent from '@/components/buscadores/b_grupo_proceso/b_grupo_proceso.vue';
import BMonedaComponent from '@/components/buscadores/b_moneda/b_moneda.vue';
import BImpuestoComponent from '@/components/buscadores/b_impuesto/b_impuesto.vue';
import BPaisComponent from '@/components/buscadores/b_pais/b_pais.vue';
import BCuentaContableComponent from '@/components/buscadores/b_cuenta_contable/b_cuenta_contable.vue';
import BCategoriaCentroCostoComponent from '@/components/buscadores/b_categoria_centrocosto/b_categoria_centrocosto.vue';
import router from '@/router';
import ElementUI from 'element-ui';
import InfiniteScroll from 'vue-infinite-scroll';
import 'element-ui/lib/theme-default/index.css';
import Global from '@/Global';
import ButtonsAccionsComponent from '@/components/buttonsAccions/buttonsAccions.vue';
//***Modelos */
import {MonedaModel} from '@/modelo/maestro/moneda';
import {BancoModel} from '@/modelo/maestro/banco';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import BDocumentoTransaccionComponent from '@/components/buscadores/b_documento_transaccion/b_documento_transaccion.vue';
import { Notification } from 'element-ui';
import {DepartamentoModel} from '@/modelo/maestro/departamento';
import departamentoService from '@/components/service/departamento.service';
import bancoService from '@/components/service/banco.service';
import { CuentaBancariaModel } from '@/modelo/maestro/cuentaBancaria';
@Component({
  name: 'crear-banco',
  components:{
  'buttons-accions':ButtonsAccionsComponent,
  'bmoneda':BMonedaComponent,
  'bimpuesto':BImpuestoComponent,
  'quickaccessmenu':QuickAccessMenuComponent,
  'bgrupoproceso':BGrupoProcesoComponent,
  'bcategoriacentrocosto':BCategoriaCentroCostoComponent,
  'bcuentacontable':BCuentaContableComponent,
  'bdocumentotransaccion':BDocumentoTransaccionComponent,
  'bpais':BPaisComponent
  }
})
export default class ModificarBancoComponent extends Vue {
  nameComponent:string;
  habilitar:boolean=false;
  habilitarPane:boolean=true;
  timer=0;
  codigoCompania:string;
  descripcionCompania:string;
  sizeScreen:string = (window.innerHeight - 420).toString();
  TableIngreso:any[];
  periodoData:Date;
  totalUnidad:number;
  totalDinero:number;
  salidaUnidad:string;
  salidaDinero:string;
  totalDolars:string;
  TotalPagarS:string;
  TotalPagarD:string;
  voucher:string;
  fechavencida:string;
  public bancoModel:BancoModel=new BancoModel();
  
  //**Compania */
  btnactivarpais:boolean=false;
  strpais_Cod:string='';
  strpais_Desc:string='';
  btndocumentotransaccion:boolean=false;
  dialogDocumentoTransaccion:boolean=false;
  dialogGrupoProceso:boolean=false;
  btnactivarGrupoProceso:boolean=false;
  dialogGrupoArea:boolean=false;
  dialogPais:boolean=false;
  btnactivarGrupoArea:boolean=false;
  dialogCategoriaCentroCosto:boolean=false;
  btnactivarCategoriaCentroCosto:boolean=false;
  btnactivarCuentaContableDebe:boolean=false;
  dialogCuentaContableDebe:boolean=false;
  btnactivarCuentaContableHaber:boolean=false;
  dialogCuentaContableHaber:boolean=false;
  
  btnactivarCentroCosto:boolean=false;
  dialogCentroCosto:boolean=false;
  //**Orden compra */
  dialogOrdenCompra:boolean=false;
  btnactivarOrdenCompra:boolean=false;
  dataOrdenCompra:any[];
  selectData:string;
  tabletipo:any=[{}]
  
  pagina: number =1;
  RegistersForPage: number = 10;
  totalRegistros: number = 10;

  //**Documento */
  strlevel:string='';
  dtmStart_Date:Date=new Date();
  dtmEnd_Date:Date=new Date();
  //**Moneda */
  dialogMoneda:boolean=false;
  btnactivarMoneda:boolean=false;
  dataMoneda:any[];
  public moneda:MonedaModel=new MonedaModel();
  issave:boolean=false;
  iserror:boolean=false;
  textosave:string='';

  strCompany_Cod:any;
  strCompany_Desc:any;
  strDaily_Cod:any;
  Period:Date=new Date();
  Doc_Trans_Cod:any;
  Posting_Date:Date=new Date();
  Autoreverse:boolean=false;
  Doc_Date:Date=new Date();
  Currency_Cod:any;
  Currency_Cod_Desc:any;
  OrigenDocum_NO:any;
  Desc_Header:any;
  intIdCountry_ID:any;
  strDaily_Cod_Desc:any;
  Doc_Trans_Cod_Desc:any;
  cell_ocultar:string='transparent';
  selectcolumn:any;
  dialogCategoriaCuenta:boolean=false;
  bln_tbl_categoria_cuenta:boolean=false;
  bln_tbl_cuenta_contable:boolean=false;
  bln_tbl_centro_costo:boolean=false;
  dialogCuentaContable:boolean=false;
  bln_tbl_descripcion:boolean=false;
  bln_tbl_cantidad_debe:boolean=false;
  bln_tbl_cantidad_haber:boolean=false;
  blncuentacontable:boolean=false;
  bln_tbl_cuenta_bancaria:boolean=false;
  bln_tipobanco:boolean=false;
  tableCuentaBancaria:CuentaBancariaModel[];

  editing:any= {
    row:'',
    column:''
  };

  //**Departamento */
  public DepartamentoGrid:Array<DepartamentoModel>[];
  btnactivardepartamento:boolean=false;
  departVisible:Boolean=false;
  departEnabled:boolean=true;
  public selectDepartamento:DepartamentoModel=new DepartamentoModel();
  public searchDepartamento:DepartamentoModel=new DepartamentoModel();
  clickColumn:string='';
  Column:string='';
  inputAtributo:any;
  blnilterstrRegion_Cod:boolean=true;
  blnilterstrRegion_Desc:boolean=false;
  Departamento_Desc:string='';
  bln_tbl_cuenta_cci:boolean=false;
  bln_tbl_cuenta_branch:boolean=false;
  bln_tbl_swift_cod:boolean=false;
  nameuser:any;
  txtviewmodulo:string;
  txtmodulo:string;
  visualizar:boolean=false;
  constructor(){    
    super();    
    Global.nameComponent='viewandedit-banco';  
    this.strCompany_Cod=localStorage.getItem('compania_cod');
    this.strCompany_Desc=localStorage.getItem('compania_name'); 
    this.tableCuentaBancaria=[];
    setTimeout(() => {      
      for(var i=0;i<10;i++){
        var item:CuentaBancariaModel=new CuentaBancariaModel();
        this.tableCuentaBancaria.push(item);
      }
    }, 500)
    this.cargarTodo();
  }
  cargarTodo(){
    this.bancoModel= JSON.parse(this.$route.query.data);
    var modulo = this.$route.query.vista;
    this.txtviewmodulo=modulo;
    if(modulo.toLowerCase()!='visualizar'){
      this.txtmodulo='Modificar Banco';
      this.visualizar=false;
    }
    else{
      this.txtmodulo='Visualizar Banco';
      this.visualizar=true;
    }
    this.cargar(this.bancoModel.strBank_Cod);
  }
  async cargar(code){
    await bancoService.GetOnlyOneBanco(code)
    .then(response=>{
     this.bancoModel= response;
     this.strlevel=this.bancoModel.strBank_Type;
     if(this.strlevel=='P'){
      this.bln_tipobanco=true;
     }
     else{
      this.bln_tipobanco=false;
     }     
     this.strpais_Cod=this.bancoModel.strCountry;
     this.Currency_Cod=this.bancoModel.strBank_Curr;
     this.strpais_Desc=this.bancoModel.strCountry_Desc;
     this.Currency_Cod_Desc=this.bancoModel.strBank_Curr_Desc;
     this.Departamento_Desc=this.bancoModel.strBank_Region_Desc;     
    }).catch(error=>{
      this.$message({
        showClose: true,
        type: 'error',
        message: 'No se puede cargar lista de banco'
      });
      this.departVisible=false;
    })
}
LoadCategoriaCuenta(row,column){
  this.selectcolumn=column;
  this.dialogCategoriaCuenta=true;
}

clickmaterialdescripcion(event,edit,column){
  this.bln_tbl_descripcion=true;
  event.edit=!edit;
  this.editing.row=event;
  this.editing.column=column;
}

clickcantidadDebe(event,edit,column){
  this.bln_tbl_cantidad_debe=true;
  event.edit=!edit;
  this.editing.row=event;
  this.editing.column=column;
}
clickcantidadHaber(event,edit,column){
  this.bln_tbl_cantidad_haber=true;
  event.edit=!edit;
  this.editing.row=event;
  this.editing.column=column;
}

clickBankAccount(event,edit,column){
  this.bln_tbl_cuenta_bancaria=true;
  event.edit=!edit;
  this.editing.row=event;
  this.editing.column=column;
}

clickcci(event,edit,column){
  this.bln_tbl_cuenta_cci=true;
  event.edit=!edit;
  this.editing.row=event;
  this.editing.column=column;
}
clickbranch(event,edit,column){
  this.bln_tbl_cuenta_branch=true;
  event.edit=!edit;
  this.editing.row=event;
  this.editing.column=column;
}
clickswiftcode(event,edit,column){
  this.bln_tbl_swift_cod=true;
  event.edit=!edit;
  this.editing.row=event;
  this.editing.column=column;
}
loadDocumentoTransaccion(){
  this.dialogDocumentoTransaccion=true;
}
closeCategoriaCuenta(){
  return false;
}
  //#region [COMPANIA]
  loadPais(){
    this.dialogPais=true;
  }
  activar_CuentaContableHaber(){
    setTimeout(() => {
      this.btnactivarCuentaContableHaber=true;
      this.btnactivarMoneda=false;
      this.btnactivarOrdenCompra=false;
    }, 120)
  }
  desactivar_CuentaContableHaber (){
    if(this.dialogCuentaContableHaber){
      this.btnactivarCuentaContableHaber=false;      
    }
  }
  LoadCuentaContable(row){
    this.dialogCuentaContable=true;
  }
  closeDialogCuentaContableHaber(){
    this.dialogCuentaContableHaber=false;
    this.dialogCuentaContable=false;
  }
  cuentacontableselecionadohaber(val,dialog:boolean){
    this.dialogCuentaContable=false; 
  }

  activar_CuentaContableDebe(){
    setTimeout(() => {
      this.btnactivarCuentaContableDebe=true;
      this.btnactivarMoneda=false;
      this.btnactivarOrdenCompra=false;
    }, 120)
  }
  desactivar_CuentaContableDebe (){
    if(this.dialogCuentaContableDebe){
      this.btnactivarCuentaContableDebe=false;      
    }
  }
  loadCuentaContableDebe()
  {
    this.dialogCuentaContableDebe=true;
  }
  closeDialogCuentaContableDebe(){
    this.dialogCuentaContableDebe=false;
  }
  cuentacontableselecionadodebe(val,dialog:boolean){
    this.dialogCuentaContableDebe=false;  
  }

  activar_CategoriaCentroCosto(){
    setTimeout(() => {
      this.btnactivarCategoriaCentroCosto=true;
      this.btnactivarMoneda=false;
      this.btnactivarOrdenCompra=false;
    }, 120)
  }
  desactivar_CategoriaCentroCosto(){
    if(this.dialogCategoriaCentroCosto){
      this.btnactivarCategoriaCentroCosto=false;      
    }
  }
  loadCategoriaCentroCosto()
  {
    this.dialogCategoriaCentroCosto=true;
  }
  closeDialogCategoriaCentroCosto(){
    this.dialogCategoriaCentroCosto=false;
  }
  categoriacentrocostoseleccionado(val,dialog:boolean){
    this.dialogCategoriaCentroCosto=false;  
  }

  
  activar_CentroCosto(){
    setTimeout(() => {
      this.btnactivarCentroCosto=true;
      this.btnactivarMoneda=false;
      this.btnactivarOrdenCompra=false;
    }, 120)
  }
  desactivar_CentroCosto(){
    if(this.dialogCentroCosto){
      this.btnactivarCentroCosto=false;      
    }
  }
  loadCentroCosto()
  {
    this.dialogCentroCosto=true;
  }
  
  clickcentrocosto(event,edit,column){
    this.bln_tbl_centro_costo=true;
    event.edit=!edit;
    this.editing.row=event;
    this.editing.column=column;
  }
  closeDialogCentroCosto(){
    this.dialogCentroCosto=false;
  }
  centrocostoseleccionado(val,dialog:boolean){
    this.dialogCentroCosto=false;  
  }

  activar_GrupoProceso(){
    setTimeout(() => {
      this.btnactivarGrupoProceso=true;
      this.btnactivarMoneda=false;
      this.btnactivarOrdenCompra=false;
    }, 120)
  }
  desactivar_GrupoProceso(){
    if(this.dialogGrupoProceso){
      this.btnactivarGrupoProceso=false;      
    }
  }
  loadGrupoProceso()
  {
    this.dialogGrupoProceso=true;
  }
  closeDialogGrupoProceso(){
    this.dialogGrupoProceso=false;
  }
  grupoprocesoseleccionado(val,dialog:boolean){
    this.dialogGrupoProceso=false;  
  }

  activar_documentoTransacional(){
    setTimeout(() => {
      this.btndocumentotransaccion=true;
      this.btnactivarMoneda=false;
      this.btnactivarOrdenCompra=false;
    }, 120)
  }
  documentotransaccionselecionado(val){
    this.Doc_Trans_Cod=val.strDoc_Trans_Cod;
    this.Doc_Trans_Cod_Desc=val.strDoc_Trans_Desc;
    this.dialogDocumentoTransaccion=false;  
  }

  activar_compania(){
    setTimeout(() => {
      this.btnactivarMoneda=false;
      this.btnactivarOrdenCompra=false;
    }, 120)
  }
  
  activar_pais(){
    setTimeout(() => {
      this.btnactivarpais=true;
    }, 120)
  }
  desactivar_pais(){
    if(this.dialogPais){
      this.btnactivarpais=false;   
      this.departEnabled=false; 
    }
  }
  activar_Departamento(){
    setTimeout(() => {
      this.btnactivardepartamento=true;
      this.btnactivarpais=false;
    }, 120)
  }
  desactivar_Departamento(){
    if(this.departVisible){
      this.btnactivardepartamento=false;
    }
  }
  departDialog(){
    this.GetAllDepartamento(this.intIdCountry_ID);
  }
  GetAllDepartamento(val){
    departamentoService.GetAllDepartamentoByPais(val)
    .then(response=>{
      this.DepartamentoGrid=[];
      this.DepartamentoGrid=response;
      this.departVisible=true;
      
    }).catch(error=>{
      this.$message({
        showClose: true,
        type: 'error',
        message: 'No se puede cargar lista de departamento'
      });
      this.departVisible=false;
    })
  }
  //#endregion
  //#region [MONEDA]
  loadMoneda(){
    this.dialogMoneda=true;
  }
  
  closeDialogMoneda(){
    this.btnactivarMoneda=false;
    this.dialogMoneda=false;
  }
  activar_Moneda(){
    setTimeout(() => {
      this.btnactivarMoneda=true;
      this.btnactivarOrdenCompra=false;
    }, 120)
  }
  desactivar_Moneda(){
    if(this.dialogMoneda){
      this.btnactivarMoneda=false;
    }
  }
  
  checkSelectMoneda(val){
    this.moneda.strCurrency_Cod=val.codigo
  }
  MonedaSeleccionado(val:MonedaModel){
    this.moneda=val
    this.Currency_Cod=this.moneda.strCurrency_Cod;
    this.Currency_Cod_Desc=this.moneda.strCurrency_Desc;
    this.dialogMoneda=false;
  }

  closeMoneda(){
    this.moneda=new MonedaModel();
    this.dialogMoneda=false;
  }
  //#endregion
  
  clickcategoriacuenta (event,edit,column){
      this.bln_tbl_categoria_cuenta=true;
      event.edit=!edit;
      this.editing.row=event;
      this.editing.column=column;
  }
  clickcuentacontable(event,edit,column){
    this.bln_tbl_cuenta_contable=true;
    event.edit=!edit;
    this.editing.row=event;
    this.editing.column=column;
  }
  //#region [Factura] 
  created(){
    
  }  
  guardarTodo(){
    if(this.txtviewmodulo=='modificar'){
        if(this.bancoModel.strBank_Cod==''){ this.$message('Complete los campos obligatorios')}
        if(this.bancoModel.strBank_Name==''){ this.$message('Complete los campos obligatorios')}
        if(this.strlevel==''){ this.$message('Complete los campos obligatorios')}
        else{
          let loadingInstance = Loading.service({
            fullscreen: true,
            text: 'Guardando...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.8)'
            }
            );  

          this.bancoModel.strCountry=this.strpais_Cod;
          this.bancoModel.strCountry_Desc=this.strpais_Desc;
          this.bancoModel.strBank_Region_Desc=this.Departamento_Desc;
          this.bancoModel.strBank_Curr_Desc=this.Currency_Cod_Desc;
          this.bancoModel.strCompany_Cod=this.strCompany_Cod;
          this.bancoModel.strCompany_Desc=this.strCompany_Desc;
          this.bancoModel.strBank_Type=this.strlevel;
          this.bancoModel.strBank_Curr=this.Currency_Cod;
          this.nameuser=localStorage.getItem('User_Usuario');
          this.bancoModel.strCreation_User=this.nameuser;
          debugger;
          for(var i=0;i<this.tableCuentaBancaria.length;i++){
            if(this.tableCuentaBancaria[i].strAcc_Local_NO!=''){
              var item=this.tableCuentaBancaria[i];
              this.bancoModel.listaCuentaBancaria.push(item);
            }
          }
          bancoService.updateBanco(this.bancoModel)
          .then(response=>{
            loadingInstance.close();
            this.openMessageSuccess('Se guardo correctamente ');
            this.textosave = 'Se guardo correctamente '+response.strBank_Cod;
            this.issave=true;
            this.iserror=false;
          })
          .catch(e =>{      
            this.openMessageError('Error guardar cliente');
            loadingInstance.close();
            this.textosave = 'No se guardo el banco.';
            this.issave=false;
            this.iserror=true;
          })    
        }
      }
      else{
          this.$message({
              showClose: true,
              type: 'warning',
              message: 'Accion no permitida'
            });
      }
      
  }
  limpiar(){
    this.bancoModel=new BancoModel();
    this.strpais_Cod='';
    this.strpais_Desc='';
    this.Currency_Cod='';
    this.Currency_Cod_Desc='';
    this.Departamento_Desc='';
    
    this.tableCuentaBancaria=new Array<CuentaBancariaModel>();
    for(var i=0;i<this.totalRegistros;i++){
      var item:CuentaBancariaModel=new CuentaBancariaModel();
      this.tableCuentaBancaria.push(item);
    }
  }
  openMessageSuccess(strMessage:string){
    this.$message({
        showClose: true,
        type: 'success',
        message: strMessage
      });
  }
  openMessageError(strMessage:string){
    this.$message({
        showClose: true,
        type: 'error',
        message: strMessage
      });
  }
  //#endregion

  PaisSeleccionado(val){
    this.intIdCountry_ID=val.intIdCountry_ID;
    this.strpais_Cod=val.strCountry_Cod;
    this.strpais_Desc=val.strCountry_Name;
    this.dialogPais=false;
    this.departEnabled=false;
  }
  handleCloseDepart(){
    this.departVisible=false;
    this.selectDepartamento=new DepartamentoModel();
  }
  searchDepa(){
    this.searchDepartamento.intIdCountry_ID=this.intIdCountry_ID;
    if(this.clickColumn=="strRegion_Cod"){  this.searchDepartamento.strRegion_Cod=this.inputAtributo; }
    if(this.clickColumn=="strRegion_Desc"){ this.searchDepartamento.strRegion_Desc=this.inputAtributo; }
        
    departamentoService.searchDepartamento(this.searchDepartamento)
    .then(resp=>{
      this.DepartamentoGrid=[];
      this.DepartamentoGrid=resp; 
    })

  }
  headerclick(val){
    this.Column=val.label;
    if(val.property=="strRegion_Cod"){
      this.clickColumn=val.property;  
      this.searchDepartamento=new DepartamentoModel();  
      this.inputAtributo='';  
      this.blnilterstrRegion_Cod=true;
      this.blnilterstrRegion_Desc=false;
    }
    if(val.property=="strRegion_Desc"){
      this.clickColumn=val.property;
      this.searchDepartamento=new DepartamentoModel();
      this.inputAtributo='';
      this.blnilterstrRegion_Cod=false;
      this.blnilterstrRegion_Desc=true;
    }
  }
  departChosseCheck(){
    this.departVisible=false;
  }
  departSelect(val:DepartamentoModel){
    this.selectDepartamento=val;
    this.bancoModel.strBank_Region=this.selectDepartamento.strRegion_Cod;
    this.Departamento_Desc=this.selectDepartamento.strRegion_Desc;
  } 
  filterstrRegion_Cod(h,{column,$index}){
    var column1 = column.label; 
    if(this.blnilterstrRegion_Cod){
      this.Column=column1;
      this.clickColumn=column.property;
      this.searchDepartamento=new DepartamentoModel();
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
  filterstrRegion_Desc(h,{column,$index}){
    if(this.blnilterstrRegion_Desc){
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
  departChosseClose(){
    this.departVisible=false;
    this.selectDepartamento=new DepartamentoModel();
  }
  closePais(){

  }
  documentotransaccionClose(){
    
  }
  cambiarTipoBanco(val){
    if(val=="P"){
      this.bln_tipobanco=true;
    }
    else{
      this.bln_tipobanco=false;
    }
  }
  backPage(){
    window.history.back();
  }
  reloadpage(){
    window.location.reload();
  }
  data(){
    return{
      nameComponent:'crear-ingreso-comprobante',
      fechavencida:'',
      dialogTableVisible: false,
      periodoData:'',
      selectData:'',
      selectType:'',
      dataProveedor:[],
      griddiarioModel:[],
      tabletipo:[{
        strType_Cod:"P",
        strType_Desc:"Pagador"
      },
      {
        strType_Cod:"N",
        strType_Desc:"No Pagador"
      }],
      tableData:[],
      ordencompraDetalle:[],
      
      codigoCompania:'001',
      totalDinero:0,
      totalUnidad:0,
      salidaUnidad:'',
      salidaDinero:'',
      totalDolars:'',
      TotalPagarS:'',
      TotalPagarD:'',
      voucher:'',
      habilitar:false,
      habilitarPane:true,
      inputAtributo:'',
      DepartamentoGrid:[],
      Currency_Cod:'',
      Currency_Cod_Desc:''
    }
  }
  
}




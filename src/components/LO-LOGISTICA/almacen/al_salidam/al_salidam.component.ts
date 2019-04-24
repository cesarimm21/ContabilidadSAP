import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import router from '@/router';
import ElementUI from 'element-ui';
import InfiniteScroll from 'vue-infinite-scroll';
import 'element-ui/lib/theme-default/index.css';
import BCompaniaComponent from '@/components/buscadores/b_compania/b_compania.vue';
import BTipoMovimientoComponent from '@/components/buscadores/b_tipo_movimiento/b_tipo_movimiento.vue';
import BCentroCostoComponent from '@/components/buscadores/b_centro_costo/b_centro_costo.vue';
import BPrioridadComponent from '@/components/buscadores/b_prioridad/b_prioridad.vue';
import BUnidadMedidaComponent from '@/components/buscadores/b_unidad_medida/b_unidad_medida.vue';
import BCuentaContableComponent from '@/components/buscadores/b_cuenta_contable/b_cuenta_contable.vue';
import BMaterialComponent from '@/components/buscadores/b_material/b_material.vue';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
// import BProveedorComponent from '@/components/buscadores/b_proveedor/b_proveedor.vue';
// import BCategoriaCuentaComponent from '@/components/buscadores/b_categoria_cuenta/b_categoria_cuenta.vue';
// import BCategoriaLineaComponent from '@/components/buscadores/b_categoria_linea/b_categoria_linea.vue';
// import BAlmacenComponent from '@/components/buscadores/b_almacen/b_almacen.vue';
// import BMaterialComponent from '@/components/buscadores/b_material/b_material.vue';
// import BUnidadMedidaComponent from '@/components/buscadores/b_unidad_medida/b_unidad_medida.vue';
// import BMonedaComponent from '@/components/buscadores/b_moneda/b_moneda.vue';
// import BPrioridadComponent from '@/components/buscadores/b_prioridad/b_prioridad.vue';
// import BCentroCostoComponent from '@/components/buscadores/b_centro_costo/b_centro_costo.vue';


import ButtonsAccionsComponent from '@/components/buttonsAccions/buttonsAccions.vue';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css';
import axios from 'axios';
import { Loading } from 'element-ui';
import { mixin as focusMixin }  from 'vue-focus';
// import '../../../../assets/css/excel-2007.scss';
import documentService from '@/components/service/documents.service';
import msmsendService from '@/components/service/msnSend.service';
import historialService from '@/components/service/historial.service';
import diarioGeneralService from '@/components/service/diarioGeneral.service';
import inicioService from '@/components/service/inicio.service';
import salidaService from '@/components/service/salida.service';
import BAlmacenComponent from '@/components/buscadores/b_almacen/b_almacen.vue';

import Handsontable from 'handsontable-pro';

import {SalidaMaterialModel} from '@/modelo/maestro/salidamaterial';
import {SalidaModel} from '@/modelo/maestro/salida';
import {SalidaDetalleModel} from '@/modelo/maestro/salidadetalle';
import {DiarioGeneralModel} from '@/modelo/maestro/diariogeneral';

import { Notification } from 'element-ui';
import Global from '@/Global';
import productoService from '@/components/service/producto.service';
import { ProductoModel } from '@/modelo/maestro/producto';
import { Producto } from '@/modelo/producto';
import jsPDF from 'jspdf';
import { Base64 } from 'js-base64';
import autoTable from 'jspdf-autotable';
import 'jspdf-autotable';

Vue.directive('focus', {
  inserted: function(el) {
    el.focus()
  }
})
var EditableColumn = {
  template: '#editable-column-content',
  props: ['is-editing', 'scope', 'editing', 'on-blur', 'on-enter', 'property']
}
@Component({
  name: 'salidam-pr',
  components:{
    'buttons-accions':ButtonsAccionsComponent,
    'bcompania':BCompaniaComponent,
    'btipomovimiento':BTipoMovimientoComponent,
    'bcentrocosto':BCentroCostoComponent,
    'bprioridad':BPrioridadComponent,
    'bunidadmedida':BUnidadMedidaComponent,
    'bcuentacontable':BCuentaContableComponent,
    'bmaterial':BMaterialComponent,
    'quickaccessmenu':QuickAccessMenuComponent,
    'balmacen':BAlmacenComponent,
  } ,
  // components:{
  //   'bcompania':BCompaniaProveedor,
  //   'bproveedor':BProveedorComponent,
  //   'balmacen':BAlmacenComponent,
  //   'buttons-accions':ButtonsAccionsComponent,
  //   'bcategoriacuenta':BCategoriaCuentaComponent,
  //   'bcategorialinea':BCategoriaLineaComponent,
  //   'bcuentacontable':BCuentaContableComponent,
  //   'bmaterial':BMaterialComponent,
  //   'bunidadmedida':BUnidadMedidaComponent,
  //   'bmoneda':BMonedaComponent,
  //   'bprioridad':BPrioridadComponent,
  //   'bcentrocosto':BCentroCostoComponent
  // } ,
})
export default class ModificarSalidaMaterialComponent extends Vue {
  timer=0;
  sizeScreen:string = (window.innerHeight - 420).toString();//'0';
  sizeScreenwidth:string = (window.innerWidth-288 ).toString();//'0';
  
  hours:number;
  minutos:number;
  seconds:number;
  user:any;
  tiempoagotado:any;
  contador:any=0;
  _10min:boolean=false;
  ocultarConfig:boolean = true;
  nameuser:string;
  namecomplete:string;
  accesosUser:any=[];
  ocultar:boolean=false;
  dialogVisible:boolean=false;
  SendDocument:boolean=false;
  vifCantidadDesp:boolean=false;

  /*dialog*/
  dialogCompania:boolean=false;
  dialogTipoMovimiento:boolean=false;
  dialogProveedor:boolean=false;
  dialogAlmacen:boolean=false;
  dialogCategoriaCuenta:boolean=false;
  dialogCategoriaLinea:boolean=false;
  dialogCuentaContable:boolean=false;
  dialogMaterial:boolean=false;
  dialogUnidadMedida:boolean=false;
  dialogMoneda:boolean=false;
  dialogPrioridad:boolean=false;
  dialogCentroCostos:boolean=false;

  public salidaModel:SalidaModel=new SalidaModel();
  public diarioGeneralModel:DiarioGeneralModel=new DiarioGeneralModel();
  /*input*/
  btnactivarcompania:boolean=false;
  btnactivartipomovimiento:boolean=false;
  btnactivarproveedor:boolean=false;
  btnactivaralmacen:boolean=false;
  btnactivarmaterial:boolean=false;
  btnactivarunidadmedida:boolean=false;
  btnactivarmoneda:boolean=false;
  btnactivarprioridad:boolean=false;
  btnactivarcentrocosto:boolean=false;

  /*bolean_tabla_dinamica*/
  bln_tbl_categoria_cuenta:boolean=false;
  bln_tbl_categoria_linea:boolean=false;
  bln_tbl_cuenta_contable:boolean=false;
  bln_tbl_material:boolean=false;
  bln_tbl_material_descripcion:boolean=false;
  bln_tbl_cantidad:boolean=false;
  bln_tbl_unidad_medida:boolean=false;
  bln_tbl_proveedor:boolean=false;
  bln_tbl_moneda:boolean=false;
  bln_tbl_prioridad:boolean=false;
  bln_tbl_fecha_estimada:boolean=false;
  bln_tbl_centro_costo:boolean=false;

  descompania:string='';
  destipomovimiento:string='';
  code_compania:string='';
  desalmacen:string='';
  code_almacen:string='';
  cell_ocultar:string='transparent';
  value: string='';
  vifprogress:boolean=true;
  vifguardar:boolean=false;
  textosave:string='';
  iserror:boolean=false;
  issave:boolean=false;
  public tableData1:Array<SalidaDetalleModel>=[];  
  /*tabla*/
  editing:any= {
    row:'',
    column:''
  };
  fecha_actual:string;
  selectrow:SalidaDetalleModel;
  selectcolumn:any;
  blntiporequisicion:boolean=true;
  tiporequisicion:string='';
  visualizar:boolean=false;
  
  vifaprobarrechasar:boolean=false;
  txtmodulo:string='';
  txtviewmodulo:string='';
  valuem:number=0;
  tiporequisicionant:string='';
  vifdespacho:boolean=false;
  vifcomprobarapro:boolean=false;
  vifimprimir:boolean=false;
  
  constructor(){
    super();
    this.fecha_actual=Global.getParseDate(new Date().toDateString());
    debugger;
    this.tiporequisicion="A";
    for(var i=0;i<10;i++){
      var item:any={
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
      this.tableData1.push(item);
    }
    console.log(this.tableData1);
    setTimeout(() => {
      this.load();
    }, 200)
  }
  load(){
    debugger;
    var object = JSON.parse(this.$route.query.data);
    var modulo = this.$route.query.vista;
    this.txtviewmodulo=modulo;
    if(modulo.toLowerCase()!='aprobar'){
      if(modulo.toLowerCase()!='despacho'){
        if(modulo.toLowerCase()!='visualizar'){
          this.vifaprobarrechasar=false;
          this.txtmodulo='Modificar Salida';
          this.visualizar=false;
        }
        else{
          this.txtmodulo='Visualizar Salida';
          this.visualizar=true;
          this.vifaprobarrechasar=false;
        }
      }
      else{
        this.txtmodulo='Despacho Material';
        this.vifaprobarrechasar=false;
        this.visualizar=true;
        this.vifdespacho=true;
        this.vifCantidadDesp=true;
        this.vifimprimir=true;
      }
      
    }
    else{
        this.visualizar=true;
        this.vifaprobarrechasar=true;
        this.txtmodulo='Aprobar Salida';
        console.log('Aprobar',object.strIssueAjust_NO);
        
    }
    this.cargar(object.strIssueAjust_NO);
  }

  Eliminar(){
    this.valuem=0;
    let loading = Loading.service({
      fullscreen: true,
      text: 'Cargando...',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.8)'
      }
    );
    for(var i=0;i<50;i++){
      this.valuem=this.valuem+1; 
    }
    salidaService.cancelarSalida(this.salidaModel)
    .then(res=>{
      loading.close();
      for(var i=0;i<50;i++){
        this.valuem=this.valuem+1; 
      }
      setTimeout(() => {
        this.vifprogress=false;
        this.issave=true;
        this.textosave='Se eliminó correctamente.'
        this.openMessage('Se eliminó correctamente');
      }, 300)
    })
    .catch(error=>{
      loading.close();
      this.$message({
        showClose: true,
        type: 'error',
        message: 'No se pudo guardar salida'
      });
    })
  }

  bodyRows(rowCount) {
    rowCount = rowCount || 10;
    let body = [{}];
    for (var j = 1; j <= rowCount; j++) {
        body.push({
            id: j,
            name: 'name'+j,
            email: 'email'+j,
            city: 'city'+j,
        });
    }
    return body;
  }

  headRows() {
      return [{id: 'ID', name: 'Name', email: 'Email', city: 'City', expenses: 'Sum'}];
  }
  columns() {
    return [
        {header: 'ID', dataKey: 'id'},
        {header: 'Name', dataKey: 'name'},
        {header: 'Email', dataKey: 'email'},
        {header: 'City', dataKey: 'city'},
        {header: 'Exp', dataKey: 'expenses'},
    ]
  }

  ExportarPDF1(){
    var doc = new jsPDF('p', 'pt');
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.setFontStyle('bold');
    doc.text('Rowspan and colspan', 40, 50);

    let body = this.bodyRows(40);
    for (var i = 0; i < body.length; i++) {
        var row = body[i];
        if (i % 5 === 0) {
            row['id'] = {rowSpan: 5, content: i / 5 + 1, styles: {valign: 'middle', halign: 'center'}};
        }
    }
    console.log(body);

    // }
    let head = this.headRows();
    // head[0]['id'] = {content: 'People', colSpan: 5, styles: {halign: 'center', fillColor: [22, 160, 133]}};
    
    doc.autoTable({
        startY: 60,
        head: head,
        body: body,
        theme: 'grid'
    });
    
    var blob = doc.output('blob');
    console.log('/////////////////////////////')
    console.log(blob);
    console.log('/////////////////////////////')
    doc.save('test.pdf');

  }
  ExportarPDF(){
    let doc = new jsPDF('p', 'pt');
    let marginleft=30;
    let comienzo=30;
    doc.setFontType('bold');
    doc.setFontSize(13);
    doc.text(marginleft, comienzo, 'VALE DE SALIDA ALMACEN');
    
    var tam=doc.internal.pageSize.height;
    var tamW=doc.internal.pageSize.width;
    
    debugger;
    var imgData = 'data:image/jpeg;base64,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';
    doc.addImage(imgData, 'jpeg', 470, 15, 90, 50);
    
    doc.setFontSize(10);
    doc.text(marginleft, comienzo+15, 'PE01 MMG Perú Las Bambas Mine');
    doc.setFontSize(9);
    doc.text(marginleft, comienzo+40, 'Nro Vale Salida:');
    doc.text(marginleft, comienzo+55, 'Fecha:');
    doc.setFontType('normal');
    doc.text(marginleft+80, comienzo+40, this.salidaModel.strIssueAjust_NO);
    doc.text(marginleft+40, comienzo+55, this.salidaModel.dtmApproved_Date);
    
    var mitad=tam/2;
    
    let columns = [
      {title:"Nro",dataKey:"index"},
      {title:"Código",dataKey:"strStock_Cod"},
      {title:"Material",dataKey:"strStock_Desc"},
      {title:"Stock",dataKey:"fltQuantity"},
      {title:"Unidad Medida",dataKey:"strUM_Cod"},
      {title:"Cant.Solicitada",dataKey:"fltIssueRequest_QTY"},
      {title:"Cant.Despachada",dataKey:"fltIssueDelivery_QTY"},
      {title:"Centro Costos",dataKey:"strCostCenter_NO"},
      {title:"Cuenta Contable",dataKey:"strAcc_NO_Local"},
    ];
    for(var i=0 ;i<this.tableData1.length;i++){
      this.tableData1[i].index=i+1;
    }
    for(var i=0 ;i<10;i++){
      this.tableData1.push(this.tableData1[i])
    }
    doc.autoTable(columns, this.tableData1,{
      theme: 'striped',
      startY: 100,
      startX: marginleft,
      margin: marginleft,
      headerStyles: {
        fillColor: [215, 215, 215],
        textColor: "#000000",
        fontSize:7,
        lineWidth: 0.1,
        lineColor:"#b3b3b3", //Silver gray
        fontStyle: 'bold',
        halign: 'center', //'center' or 'right'
      },  
      bodyStyles:{
        fontSize:7,  
        lineWidth: 0.1,
        lineColor:"#b3b3b3", //Silver gray
      }
      });
      
      var paragraph="Este documento (incluidas las páginas siguientes) es confidencial, este puede ser leído, copiado y utilizado solamente para fines respectivos.  Si Usted recibe este documento por error, por favor notifíquelo inmediatamente. No comparta su información a ninguna persona y destrúyalo. Muchas gracias. ";
      let columnsf = [
        {title:"Footer",dataKey:"footer"},
      ]
      let row=[
        {
          'footer':paragraph
        }
      ]
      doc.autoTable(columnsf, row,{
        startY: mitad-60,
        startX: marginleft,
        margin: marginleft,
        theme: 'plain',
        headerStyles: {
          fillColor: "#FFFFFF",
          textColor: "#FFFFFF",
          fontSize:1,
          
        },
        bodyStyles:{
          fillColor: "#FFFFFF",
          textColor:"#d0d0d0",
          fontSize:9,  
        }
      })
     
      doc.setLineDash([3, 3, 1, 3], 10);
      doc.setLineWidth(0.5);
      doc.line(marginleft, mitad, 580, mitad)
      
      doc.setLineDash(0, 0);
      doc.setLineWidth(0.5);
      
      doc.textColor=250;
      doc.setDrawColor(0, 0, 0);
      doc.line(80, mitad-65, 195, mitad-65)
      doc.line(tamW/2+80, mitad-65, tamW/2+75+130, mitad-65)
      
      doc.setFontSize(7);
      doc.text(90, mitad-55, "Nombre y firma de quien recibe");
      doc.text(tamW/2+90, mitad-55, "Nombre y firma de quien entrega");
   
///////////////////////////////////////////////////////////////////////////////////
    doc.setFontType('bold');
    doc.setFontSize(13);
    comienzo=comienzo+mitad;
    doc.text(marginleft, comienzo , 'VALE DE SALIDA ALMACEN');

    var tam=doc.internal.pageSize.height;
    var tamW=doc.internal.pageSize.width;

    debugger;
    var imgData = 'data:image/jpeg;base64,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';
    doc.addImage(imgData, 'jpeg', 470, comienzo-20, 90, 50);

    doc.setFontSize(10);
    doc.text(marginleft, comienzo+15, 'PE01 MMG Perú Las Bambas Mine');
    doc.setFontSize(9);
    doc.text(marginleft, comienzo+40, 'Nro Vale Salida:');
    doc.text(marginleft, comienzo+55, 'Fecha:');
    doc.setFontType('normal');
    doc.text(marginleft+80, comienzo+40, this.salidaModel.strIssueAjust_NO);
    doc.text(marginleft+40, comienzo+55, this.salidaModel.dtmApproved_Date);
   
    doc.autoTable(columns, this.tableData1,{
      theme: 'striped',
      startY: 100+mitad,
      startX: marginleft,
      margin: marginleft,
      headerStyles: {
        fillColor: [215, 215, 215],
        textColor: "#000000",
        fontSize:7,
        lineWidth: 0.1,
        lineColor:"#b3b3b3", //Silver gray
        fontStyle: 'bold',
        halign: 'center', //'center' or 'right'
      },  
      bodyStyles:{
        fontSize:7,  
        lineWidth: 0.1,
        lineColor:"#b3b3b3", //Silver gray
      }
      });
      doc.autoTable(columnsf, row,{
        startY: tam-55,
        startX: marginleft,
        margin: {
          left: marginleft,
          bottom:2
        },
        theme: 'plain',
        headerStyles: {
          fillColor: "#FFFFFF",
          textColor: "#FFFFFF",
          fontSize:1,
        },
        bodyStyles:{
          fillColor: "#FFFFFF",
          textColor:"#d0d0d0",
          fontSize:9,  
        }
      })
      
      doc.textColor=250;
      doc.setDrawColor(0, 0, 0);
      doc.line(80, tam-65, 195, tam-65)
      doc.line(tamW/2+80, tam-65, tamW/2+75+130, tam-65)
      
      doc.setFontSize(7);
      doc.text(90, tam-55, "Nombre y firma de quien recibe");
      doc.text(tamW/2+90, tam-55, "Nombre y firma de quien entrega");
      
      var blob = doc.output('blob');
      console.log('/////////////////////////////')
      console.log(blob);
      console.log('/////////////////////////////')
      doc.save('Vale Salida VAL0001.pdf');

      
  }
  cargar(code){
    salidaService.getSalidaId(code)
    .then(res=>{
      if(res!=undefined){
        console.log('cargarData1',res)
        salidaService.getSalidaDetalleId(res[0].intIssueAjustH_ID)
        .then(resd=>{
          this.salidaModel=res[0];
          var almacen=res[0].intIdWHS_ID;
          if(almacen!=undefined){
            var planta=almacen.intPlant_ID;
            this.salidaModel.strPlant_Cod=planta.strPlant_Cod;
            console.log('strPlant_Cod',this.salidaModel.strPlant_Cod)
          }
          var data:Array<SalidaDetalleModel>=[];  
          for(var i=0;i<resd.length;i++){
            if(resd[i].intIdInvStock_ID!=undefined){
              var item=resd[i].intIdInvStock_ID;
              resd[i].fltQuantity=item.fltQuantity;
            }
            data.push(resd[i]);
          }
          this.tableData1=data;
          console.log('cargarData2',resd,this.tableData1)
        })
        .catch(error=>{
          console.log('error',error)
        })     
      }
    })
    .catch(error=>{
      console.log('error',error)
    })
  }
  fnOcultar(){
    this.ocultar=!this.ocultar;
  }
  guardar(){
    this.SendDocument=true;
  }
  async guardarTodo(){
    debugger;
    if(this.vifguardar){
      debugger;
      this.textosave='Este vale de salida ya se ha cerrado.';
      Notification.warning(this.textosave);
    }
    if(this.txtviewmodulo=='despacho' && !this.vifguardar){
      this.salidaModel.listaDetalle=this.tableData1;
      let loading = Loading.service({
        fullscreen: true,
        text: 'Cargando...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.8)'
        }
      );
      for(var i=0;i<50;i++){
        this.valuem=this.valuem+1; 
      }
      console.log("--///",this.salidaModel)
      salidaService.despachoSalida(this.salidaModel)
      .then(res=>{
        debugger;
        for(var i=0;i<50;i++){
          this.valuem++; 
        }
        console.log(this.valuem);
        loading.close();
        if(this.valuem>=100){
          setTimeout(() => {
            salidaService.inventarioSalida(this.salidaModel)
            .then(resiv=>{
              this.vifguardar=true;
              if(resiv!=undefined){
                var producto:ProductoModel =new ProductoModel()
                producto.strStock_Cod=resiv.strStock_Cod;
                producto.fltQuantity=resiv.fltQuantity_Balance;
                console.log("producto",producto);
                productoService.UpdateStock(this.salidaModel)
                .then(resstock=>{
                  setTimeout(() => {
                    this.vifprogress=false;
                    this.issave=true;
                    this.textosave='Se despacho correctamente.'
                    this.openMessage('Se despacho correctamente');
                  
                    // setTimeout(() => {
                    //   router.push('/barmenu/LO-LOGISTICA/almacen/salida/al_salidadespacho');
                    // }, 300)
                  }, 600)
                })
                .catch(error=>{
                  this.textosave='Ocurrio un error inesperado. ';
                })
              }
              else{
                this.vifprogress=false;
                this.issave=false;
                this.iserror=true;
                this.textosave='No se pudo actualizar el stock.'
                this.openMessage('No se pudo actualizar el stock');
              }
            })
            .catch(error=>{
              this.textosave='Ocurrio un error inesperado. ';
            })
          }, 300)
        }
      })
      .catch(error=>{
        loading.close();
        this.$message({
          showClose: true,
          type: 'error',
          message: 'No se pudo guardar salida'
        });
      })  
    }
    if(this.txtviewmodulo=='modificar' && !this.vifguardar){
      this.salidaModel.listaDetalle=this.tableData1;
      let loading = Loading.service({
        fullscreen: true,
        text: 'Cargando...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.8)'
        }
      );
      for(var i=0;i<50;i++){
        this.valuem=this.valuem+1; 
      }
      salidaService.modificarSalida(this.salidaModel)
      .then(res=>{
        debugger;
        for(var i=0;i<50;i++){
          this.valuem++; 
        }
        console.log(this.valuem);
        loading.close();
        if(this.valuem>=100){
          setTimeout(() => {
            this.vifprogress=false;
            this.issave=true;
            this.textosave='Se modifico correctamente.'
            this.openMessage('Se modifico correctamente');
          }, 2000)
        }
      })
      .catch(error=>{
        loading.close();
        this.$message({
          showClose: true,
          type: 'error',
          message: 'No se pudo modificar salida'
        });
      })
    }
   
  }
  
  openMessage(newMsg : string) {
    this.$message({
      showClose: true,
      message: newMsg,
      type: 'success'
    });
  }
  openMessageError(strMessage:string){
    this.$message({
        showClose: true,
        type: 'error',
        message: strMessage
      });
  }
  linkLogout(){
   localStorage.clear();
   window.sessionStorage.clear();
    router.push('/')
  }
  confirmaraceptar(){
    this.SendDocument=false;
  }
  linksUser(comand){
    router.push('/barmenu/'+comand)
  }
  linksLogin(){
    router.push('/inicio')
  }
  linkRoute(route){
    router.push(route)
  }
  redirectLogin(msg){
    Notification.warning(msg)
    localStorage.clear();
    router.push('/')
  }
  calcular(temp){
    if(temp < 600){
      return { rojo: true,}
    }
    else{
      return { verde: true, }
    }
  }
  loadCompania(){
    this.dialogCompania=true;
  }
  loadTipoMovimiento(){
    this.dialogTipoMovimiento=true;
  }
  
  LoadAlmacen(){
    this.dialogAlmacen=true;
  }
  handleClose(){
    // this.$confirm('This will permanently delete the file. Continue?', 'Warning', {
    //     confirmButtonText: 'OK',
    //     cancelButtonText: 'Cancel',
    //     type: 'warning'
    //   }).then(() => {
    //     this.$message({
    //       type: 'success',
    //       message: 'Delete completed'
    //     });
    //   }).catch(() => {
    //     this.$message({
    //       type: 'info',
    //       message: 'Delete canceled'
    //     });          
    //   });
  }
  tableRowClassName(row, rowIndex) {
      debugger;
    // if (row === undefined || row.EstadoAprobacion === undefined) return '';
    // if (row.EstadoAprobacion === 'R'){
    //   return 'rechazado-row';
    // } else if (row.EstadoAprobacion === 'A') {
    //   return 'aprobado-row';
    // } else if (row.EstadoAprobacion === 'M'){
    //   return 'modificado-row';
    // }
    // return '';
  }
  handleCurrentChange(val) {
    debugger;
    if(val.date){
        return 'selected-row';
    }
  }
  /*Compania imput*/
  activar_compania(){
    setTimeout(() => {
      this.btnactivarcompania=true;
      this.btnactivaralmacen=false;
      this.btnactivarproveedor=false;
      this.btnactivartipomovimiento=false;
    }, 120)
  }
  activar_tipo_movimiento(){
    setTimeout(() => {
      this.btnactivartipomovimiento=true;
      this.btnactivarcompania=false;
    }, 120)
  }
  desactivar_compania(){
    debugger;
    if(this.dialogCompania){
      this.btnactivarcompania=false;
    }
  }
  desactivar_tipo_movimiento(){
    debugger;
    if(this.dialogTipoMovimiento){
      this.btnactivartipomovimiento=false;
    }
  }
  closeCompania(){
    debugger;
    this.btnactivarcompania=false;
    return false;
  }

  /*Proveedor imput*/
  activar_proveedor(){
    setTimeout(() => {
      this.btnactivarproveedor=true;
      this.btnactivarcompania=false;
      this.btnactivaralmacen=false;
    }, 120)
  }
  desactivar_proveedor(){
    debugger;
    if(this.dialogProveedor){
      this.btnactivarproveedor=false;
    }
  }
  closeProveedor(){
    debugger;
    this.btnactivarproveedor=false;
    return false;
  }

  /*Almacen imput*/
  activar_almacen(){
    setTimeout(() => {
      console.log("activar_almacen");
      this.btnactivaralmacen=true;
      this.btnactivarcompania=false;
      this.btnactivarproveedor=false;
    }, 120)
  }
  desactivar_almacen(){
    debugger;
    if(this.dialogAlmacen){
      this.btnactivaralmacen=false;
    }
  }
  closeAlmacen(){
    debugger;
    console.log("closeAlmacen");
    this.btnactivaralmacen=false;
    return false;
  }
  activar_descripcion(){
    this.btnactivaralmacen=false;
    this.btnactivarproveedor=false;
    this.btnactivarcompania=false
  }
  activar_tipo_requisicion(value){
    debugger;
    console.log("activar_tipo_requisicion");
    this.tiporequisicion=value;
    if(value=='N'){
      this.cell_ocultar='transparent';
      this.blntiporequisicion=true;
    }
    else{
      this.cell_ocultar='#e4e2e2';        
      this.blntiporequisicion=false;
    }
    this.btnactivaralmacen=false;
    this.btnactivarproveedor=false;
    this.btnactivarcompania=false
  }

  /*tabla metodos*/
  handleBlur(event) {
    debugger;
    this.bln_tbl_categoria_cuenta=false;
    event.edit=false;
    this.editing.row='';
    this.editing.column='';
    console.log('blur');
  }
  isEditing() {
    return this.editing !== null
  }
  onCellBlur(row, column, cell, event) {
    debugger;
    this.editing = null
    console.log('onCellBlur',row, column, cell, event);
  }
  onCellClick(row, column, cell, event) {
    this.editing = {
      row,
      column,
      cell
    }
  }  
  LoadCategoriaCuenta(row,column){
    this.selectrow=row;
    this.selectcolumn=column;
    console.log(row);
    this.dialogCategoriaCuenta=true;
  }
  LoadCategoriaLinea(row){
    this.selectrow=row;
    this.dialogCategoriaLinea=true;
  }
  LoadCuentaContable(row){
    this.selectrow=row;
    this.dialogCuentaContable=true;
  }
  LoadMaterial(row){
    this.selectrow=row;
    this.dialogMaterial=true;
  }
  LoadUnidadMedida(row){
    this.selectrow=row;
    this.dialogUnidadMedida=true;
  }
  LoadProveedor(row){
    this.selectrow=row;
    this.dialogProveedor=true;      
  }
  LoadMoneda(row){
    this.selectrow=row;
    this.dialogMoneda=true;      
  }
  LoadPrioridad(row){
    this.selectrow=row;
    this.dialogPrioridad=true;      
  }
  LoadCentroCosto(row){
    this.selectrow=row;
    this.dialogCentroCostos=true;
  }
  alerta(event,edit,column){
    debugger;
    this.bln_tbl_categoria_cuenta=true;
    event.edit=!edit;
    this.editing.row=event;
    this.editing.column=column;
  }
  clickcategorialinea(event,edit,column){
    debugger;
    if(!this.visualizar){
    this.bln_tbl_categoria_linea=true;
    event.edit=!edit;
    this.editing.row=event;
    this.editing.column=column;
    }
  }
  clickcuentacontable(event,edit,column){
    debugger;
    if(!this.visualizar){
    this.bln_tbl_cuenta_contable=true;
    event.edit=!edit;
    this.editing.row=event;
    this.editing.column=column;
    }
  }
  clickmaterial(event,edit,column){
    debugger;
    if(!this.visualizar){
      this.bln_tbl_material=true;
      event.edit=!edit;
      this.editing.row=event;
      this.editing.column=column;
    }
  }
  clickmaterialdescripcion(event,edit,column){
    debugger;
    if(!this.visualizar){
    this.bln_tbl_material_descripcion=true;
    event.edit=!edit;
    this.editing.row=event;
    this.editing.column=column;
    }
  }
  clickcantidad(event,edit,column){
    debugger;
    if(!this.visualizar){
    event.edit=!edit;
    this.editing.row=event;
    this.editing.column=column;
    }
  }
  clickstock(event,edit,column){
    debugger;
    if(!this.visualizar){
    event.edit=!edit;
    this.editing.row=event;
    this.editing.column=column;
    }
  }
  clickunidadmedida(event,edit,column){
    debugger;
    if(!this.visualizar){
    this.bln_tbl_unidad_medida=true;
    event.edit=!edit;
    this.editing.row=event;
    this.editing.column=column;
    }
  }
  clickproveedor(event,edit,column){
    debugger;
    if(!this.visualizar){
    this.bln_tbl_proveedor=true;
    event.edit=!edit;
    this.editing.row=event;
    this.editing.column=column;
    }
  }
  clickmoneda(event,edit,column){
    debugger;
    if(!this.visualizar){
    this.bln_tbl_moneda=true;
    event.edit=!edit;
    this.editing.row=event;
    this.editing.column=column;
    }
  }
  clickprioridad(event,edit,column){
    debugger;
    if(!this.visualizar){
    this.bln_tbl_prioridad=true;
    event.edit=!edit;
    this.editing.row=event;
    this.editing.column=column;
    }
  }
  clickfechaestimada(event,edit,column){
    debugger;
    if(!this.visualizar){
    this.bln_tbl_fecha_estimada=true;
    event.edit=!edit;
    this.editing.row=event;
    this.editing.column=column;
    }
  }
  clickcentrocosto(event,edit,column){
    debugger;
    if(!this.visualizar){
    this.bln_tbl_centro_costo=true;
    event.edit=!edit;
    this.editing.row=event;
    this.editing.column=column;
    }
  }
  getParseDate(fecha){
    return Global.getParseDate(fecha);
  }
  
  SeleccionadoAlmacen(val){
    console.log('traer',val);
    this.code_almacen=val.CODIGO;
    this.desalmacen=val.DESCRIPCION;
    this.dialogAlmacen=false;
  }
  // SeleccionadoCategoriaCuenta(val){
  //   this.selectrow.categoriacuenta=val.CODIGO;
  //   this.dialogCategoriaCuenta=false;
  // }
  // SeleccionadoCategoriaLinea(val){
  //   debugger;
  //   this.selectrow.categorialinea=val.CODIGO;
  //   this.dialogCategoriaLinea=false;
  // }
  SeleccionadoCentroCosto(val){
    debugger;
    this.selectrow.strCostCenter_NO=val.strCostCenter_NO;
    this.dialogCentroCostos=false;
  }
  SeleccionadoCuentaContable(val){
    debugger;
    this.selectrow.strAcc_NO_Local=val.strAcc_NO_Local;
    this.dialogCuentaContable=false;
  }
  SeleccionadoMaterial(val){
    debugger;
    this.selectrow.strStock_Cod='';
    this.selectrow.strStock_Desc='';
    this.selectrow.strUM_Cod='';
    this.selectrow.strAcc_NO_Local='';

    this.selectrow.strStock_Cod=val.strStock_Cod;
    this.selectrow.strStock_Desc=val.strStock_Desc;
    this.selectrow.strUM_Cod=val.strUM_Cod;
    this.selectrow.strAcc_NO_Local=val.strExp_Acct;
    this.selectrow.fltQuantity=parseFloat(val.fltQuantity);
    
    this.dialogMaterial=false;
  }
  SeleccionadoUnidadMedida(val){
    debugger;
    this.selectrow.strUM_Cod=val.strUM_Cod;
    this.dialogUnidadMedida=false;
  }
  // SeleccionadoProveedor(val){
  //   debugger;
  //   this.selectrow.str=val.Vendor_NO;
  //   this.dialogProveedor=false;
  // }
  // SeleccionadoMoneda(val){
  //   debugger;
  //   this.selectrow.moneda=val.CODIGO;
  //   this.dialogMoneda=false;
  // }
  SeleccionadoPrioridad(val){
    debugger;
    this.selectrow.strPriority_Cod=val.strPriority_Cod;
    this.dialogPrioridad=false;
  }
  cambioTipoRequisicion(selected){
    if(this.tiporequisicion!=selected){
      this.tiporequisicion=selected;
    }
    console.log('select',selected);
  }

  /*prioridad*/
  closePrioridad(){
    this.btnactivarcompania=false;
    return false;
  }
  prioridadClose(){
    this.dialogPrioridad=false;
  }

  centrocostoClose(){
    this.dialogCentroCostos=false;
  }
  cuentacontableClose(){
    this.dialogCuentaContable=false;
  }
  unidadmedidaClose(){
    this.dialogUnidadMedida=false;
  }
  tipomovimientoSelecionado(val){
    this.salidaModel.strTypeMov_Cod=val.strTypeMov_Cod
    this.destipomovimiento=val.strTypeMov_Desc;
   
    this.dialogTipoMovimiento=false;
  }
  companiaSeleccionado(val){
    debugger;
    this.salidaModel.strCompany_Cod=val.strCompany_Cod
    this.descompania=val.strCompany_Desc;
   
    this.dialogCompania=false;
  }
  async comprobar(){
    debugger;
    this.vifcomprobarapro=false;
    var comprobante=false;
    salidaService.getSalidaDetalleId(this.salidaModel.intIssueAjustH_ID)
    .then(resd=>{
      debugger;
      for(var i=0;i<resd.length;i++){
        for(var j=0;j<this.tableData1.length;j++){
          if(resd[i].strStock_Cod==this.tableData1[j].strStock_Cod){
            var stock=resd[i].intIdInvStock_ID;
            if(stock!=undefined && stock!=null){
              var isr :any= this.tableData1[j].fltIssueRequest_QTY;
              if(parseFloat(stock.fltQuantity_Virtual) < parseFloat(isr)){
                comprobante=true;
              }
            }
          }
        }
      }
      if(!comprobante){
        console.log('aprobar',this.salidaModel);
        salidaService.aprobarSalida(this.salidaModel)
        .then(res=>{
          debugger;
          console.log(this.valuem);
          this.salidaModel.listaDetalle=this.tableData1;
          productoService.UpdateStockVirtual(this.salidaModel)
          .then(resp=>{
            this.vifprogress=false;
            this.issave=true;
            this.textosave='Se aprobó correctamente. '+res.strIssueAjust_NO;
            this.openMessage('Se aprobó correctamente '+res.strIssueAjust_NO);
          })
          .catch(error=>{
            this.textosave='Ocurrio un error inesperado. ';
          })
        }) 
        .catch(error=>{
          this.textosave='Ocurrio un error inesperado. ';
        })
      }
      else{
        this.vifcomprobarapro=true;
        this.vifprogress=false;
        this.issave=false;
        this.iserror=true;
        this.textosave='Compruebe el stock de los items. ';
        this.openMessageError('Compruebe el stock de los items. ');
      }
    })
    .catch(error=>{
      this.textosave='Ocurrio un error inesperado. ';
    })
  }
  async aprobar(){
    this.valuem=0;
    this.vifcomprobarapro=false;
    this.salidaModel.strApproved_User='ADMINISTRADOR';
    await setTimeout(() => {
      for(var i=0;i<100;i++){
        this.valuem++; 
      }
    }, 200)
    debugger;
    var res=await this.comprobar();
    console.log(res);
  }
  getCantidadVirtual(row){
    var stock=row.intIdInvStock_ID;
    debugger;
    if(stock!=undefined){
      row.fltQuantity=stock.fltQuantity_Virtual;
      return stock.fltQuantity_Virtual;
    }
    return 0;
  }
  getCantidadReal(row){
    var stock=row.intIdInvStock_ID;
    if(stock!=undefined){
      row.fltQuantityR =stock.fltQuantity;
      return stock.fltQuantity;
    }
    return 0;
  }
  async rechasar(){
    this.valuem=0;
    this.salidaModel.strApproved_Status='ADMINISTRADOR';
    await setTimeout(() => {
      for(var i=0;i<100;i++){
        this.valuem++; 
      }
    }, 200)
    await salidaService.rechasarSalida(this.salidaModel)
    .then(res=>{
      debugger;
      console.log(this.valuem);
      setTimeout(() => {
        this.vifprogress=false;
        this.issave=true;
        this.textosave='Se rechazó correctamente. '+res.strIssueAjust_NO;
        this.openMessage('Se rechazó correctamente '+res.strIssueAjust_NO);
      }, 600)
    })
    .catch(error=>{
      this.textosave='Ocurrio un error inesperado. ';
    })
  }
  
  almacenseleccionado(val){
    this.salidaModel.strWHS_Cod=val.strWHS_Cod;
    this.salidaModel.intIdWHS_ID=val.intIdWHS_ID;
    this.salidaModel.strWHS_Desc=val.strWHS_Desc;
    this.dialogAlmacen=false;
    //this.validate();
  }
  backPage(){
    window.history.back();
  }
  reloadpage(){
    window.location.reload();
  }
  data(){
    return{
      dialogTableVisible: false,
      dialogVisible:false,
      tableDataServicio:[{}],
      item:{
        date: '',
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
        fecha_estimada:'',
        centrocosto:'',
      },
      tableData: [{
        date: '0001',
        categoriacuenta: 'Ferreyros',
        categorialinea: 'Ferreyros',
        cuentacontable: 'Ferreyros',
        material:'piedra',
        material_descripcion:'chancada',
        cantidad:1,
        unidad_medida:'Kg',
        proveedor:'Juan Toledo',
        moneda:'PEN',
        prioridad:'urgente',
        fecha_estimada:'12/02/2019',
        centrocosto:'6302071000',
      }, {
        date: '0002',
        categoriacuenta: 'Yura SAC',
        categorialinea: 'Ferreyros',
        cuentacontable: 'Ferreyros',
        material:'piedra',
        material_descripcion:'chancada',
        cantidad:1,
        unidad_medida:'Kg',
        proveedor:'Juan Toledo',
        moneda:'PEN',
        prioridad:'urgente',
        fecha_estimada:'12/02/2019',
        centrocosto:'6302071000',
      }, {
        date: '0003',
        categoriacuenta: 'Signal company',
        categorialinea: 'Ferreyros',
        cuentacontable: 'Ferreyros',
        material:'piedra',
        material_descripcion:'chancada',
        cantidad:1,
        unidad_medida:'Kg',
        proveedor:'Juan Toledo',
        moneda:'PEN',
        prioridad:'urgente',
        fecha_estimada:'12/02/2019',
        centrocosto:'6302071000',
      }, {
        date: '0004',
        categoriacuenta: 'Cruz del Sur',
        categorialinea: 'Ferreyros',
        cuentacontable: 'Ferreyros',
        material:'piedra',
        material_descripcion:'chancada',
        cantidad:1,
        unidad_medida:'Kg',
        proveedor:'Juan Toledo',
        moneda:'PEN',
        prioridad:'urgente',
        fecha_estimada:'12/02/2019',
        centrocosto:'6302071000',
      }
      , {
        date: '0005',
        categoriacuenta: 'Tisur',
        categorialinea: 'Ferreyros',
        cuentacontable: 'Ferreyros',
        material:'piedra',
        material_descripcion:'chancada',
        cantidad:1,
        unidad_medida:'Kg',
        proveedor:'Juan Toledo',
        moneda:'PEN',
        prioridad:'urgente',
        fecha_estimada:'12/02/2019',
        centrocosto:'6302071000',
      }, {
        date: '0006',
        categoriacuenta: 'Seguro',
        categorialinea: 'Ferreyros',
        cuentacontable: 'Ferreyros',
        material:'piedra',
        material_descripcion:'chancada',
        cantidad:1,
        unidad_medida:'Kg',
        proveedor:'Juan Toledo',
        moneda:'PEN',
        prioridad:'urgente',
        fecha_estimada:'12/02/2019',
        centrocosto:'6302071000',
      }, {
        date: '0007',
        categoriacuenta: 'Cruz del Sur',
        categorialinea: 'Ferreyros',
        cuentacontable: 'Ferreyros',
        material:'piedra',
        material_descripcion:'chancada',
        cantidad:1,
        unidad_medida:'Kg',
        proveedor:'Juan Toledo',
        moneda:'PEN',
        prioridad:'urgente',
        fecha_estimada:'12/02/2019',
        centrocosto:'6302071000',
      }, {
        date: '0008',
        categoriacuenta: 'Cruz del Sur',
        categorialinea: 'Ferreyros',
        cuentacontable: 'Ferreyros',
        material:'piedra',
        material_descripcion:'chancada',
        cantidad:1,
        unidad_medida:'Kg',
        proveedor:'Juan Toledo',
        moneda:'PEN',
        prioridad:'urgente',
        fecha_estimada:'12/02/2019',
        centrocosto:'6302071000',
      }, {
        date: '0009',
        categoriacuenta: 'Cruz del Sur',
        categorialinea: 'Ferreyros',
        cuentacontable: 'Ferreyros',
        material:'piedra',
        material_descripcion:'chancada',
        cantidad:1,
        unidad_medida:'Kg',
        proveedor:'Juan Toledo',
        moneda:'PEN',
        prioridad:'urgente',
        fecha_estimada:'12/02/2019',
        centrocosto:'6302071000',
      }, {
        date: '0010',
        categoriacuenta: 'Linea',
        categorialinea: 'Ferreyros',
        cuentacontable: 'Ferreyros',
        material:'piedra',
        material_descripcion:'chancada',
        cantidad:1,
        unidad_medida:'Kg',
        proveedor:'Juan Toledo',
        moneda:'PEN',
        prioridad:'urgente',
        fecha_estimada:'12/02/2019',
        centrocosto:'6302071000',
      }, {
        date: '0011',
        categoriacuenta: 'Cruz del Sur',
        categorialinea: 'Ferreyros',
        cuentacontable: 'Ferreyros',
        material:'piedra',
        material_descripcion:'chancada',
        cantidad:1,
        unidad_medida:'Kg',
        proveedor:'Juan Toledo',
        moneda:'PEN',
        prioridad:'urgente',
        fecha_estimada:'12/02/2019',
        centrocosto:'6302071000',
      }],
      user: {
        authenticated: false
      },
      data:{
        Usuario:localStorage.getItem('User_Nombre'),
      },
      options: [{
        value: 'A',
        label: 'Almacenable'
      }, {
        value: 'N',
        label: 'No Almacenable'
      }
      ],
      value: '',
      accesosUser: [],
      hours: 0,
      minutos:0,
      seconds:0
    }
  }
  
}

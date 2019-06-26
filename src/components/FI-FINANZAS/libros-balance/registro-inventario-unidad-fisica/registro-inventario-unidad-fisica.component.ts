import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import router from '@/router';
import ElementUI from 'element-ui';
import InfiniteScroll from 'vue-infinite-scroll';
//import 'element-ui/lib/theme-default/index.css';
import BCompaniaProveedor from '@/components/buscadores/b_compania/b_compania.vue';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';

import FileSaver from 'file-saver';
import ButtonsAccionsComponent from '@/components/buttonsAccions/buttonsAccions.vue';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css';
import axios from 'axios';
import { Loading } from 'element-ui';

import salidaService from '@/components/service/salida.service';
import libroBalanceService from '@/components/service/libroBalances.service';



//***Modelos */
import {ProductoModel} from '@/modelo/maestro/producto';

import { Notification } from 'element-ui';
import Global from '@/Global';
import companiaService from '@/components/service/compania.service';
import productoService from '@/components/service/producto.service';
import balancecuentaService from '@/components/service/balancecuenta.service';
import kardexvaloradoService from '@/components/service/kardexvalorado.service';
import XLSX from "xlsx"

// import * as XLSX from '@/assets/js/xlsx.full.min.js'
// import * as  XLSX from "http://rawgit.com/protobi/js-xlsx/master/dist/xlsx.full.min.js";
// import * as saveAs from 'http://cdn.jsdelivr.net/g/filesaver.js';

import { saveAs } from 'file-saver';
import { SalidaModel } from '@/modelo/maestro/salida';
import { BalanceCuentaModel } from '@/modelo/maestro/balancecuentas';
import { KardexValoradoModel } from '@/modelo/maestro/tblkardexvalorado';


import jsPDF from 'jspdf'
import { Base64 } from 'js-base64'; 
import autoTable from 'jspdf-autotable';
import 'jspdf-autotable';
import BCuentaContableComponent from '@/components/buscadores/b_cuenta_contable/b_cuenta_contable.component';
// import  Excel from 'exceljs';
// import  officegen from 'officegen';
//import fs from 'fs';

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
  name: 'al-crear',
  components:{
    'buttons-accions':ButtonsAccionsComponent,
    'bcompania':BCompaniaProveedor,
    'quickaccessmenu':QuickAccessMenuComponent,
    'bcuentacontable':BCuentaContableComponent
  } ,
 
})
export default class RegistroInventarioUnidadFisicaComponent extends Vue {
  sizeScreen:string = (window.innerHeight - 250).toString();//'0';
  sizeScreenwidth:string = (window.innerWidth-288 ).toString();//'0';
  formBusqueda:any={
    'cod_company':'',
    'feci':new Date(),
    'fecf':new Date(),
  }
  nameuser:string;
  namecomplete:string;
  SendDocument:boolean=false;
  vmaterial:string='';
  /*dialog*/
  dialogCompania:boolean=false;
  dialogCuentaContable:boolean=false;
  /*input*/
  btnactivarcompania:boolean=false;
  /*Model*/
  public productoModel:ProductoModel=new ProductoModel();
  
  descompania:string='';
  code_compania:string='';
  strAcc_Local_NO:string='';

  fecha_actual:string;
  selectrow:any;
  selectcolumn:any;
  blntiporequisicion:boolean=true;
  tiporequisicion:string='';
  issave:boolean=false;
  iserror:boolean=false;
  textosave:string='';
  public tableData:any=[]; 
  fechaHasta:any=new Date();
  fechaDesde:any=new Date();
  vifprogress:boolean=true;
  valuem=0;  
  currentRow:any;
  dialogTipoMovimiento:boolean=false;
  btnactivartipomovimiento:boolean=false;
  blnstrAcct_Loc:boolean=false;
  balCuentas:BalanceCuentaModel=new BalanceCuentaModel();
  strTypeMov_Cod:string='';
  sums:any = [];
  sums1:number=0;
  sums2:number=0;
  sums3:number=0;
  sums4:number=0;
  rsums1:number=0;
  rsums2:number=0;
  rsums3:number=0;
  rsums4:number=0;
  fltsaldofinald:number=0;
  fltsaldofinala:number=0;
  fltsaldofinalba:number=0;
  fltsaldofinalbd:number=0;

  constructor(){
    super();
    this.fecha_actual=Global.getParseDate(new Date().toDateString());
    var desc:any=localStorage.getItem('compania_name');
    var cod:any=localStorage.getItem('compania_cod');
    var id:any=localStorage.getItem('compania_ID');
    this.balCuentas.strCompany_Desc=desc; 
    this.balCuentas.strCompany_Cod=cod;
    this.tiporequisicion="A";
    setTimeout(() => {
      this.load();
    }, 200)
  }
  load(){
    this.cargar();
  }
  async validarView(){
    if(this.selectrow!=undefined && this.selectrow!=null && this.selectrow.intIssueAjustH_ID!=-1){
      this.vifprogress=true;
      this.valuem=0;
      await setTimeout(() => {
        for(var i=0;i<100;i++){
          this.valuem++; 
        }
      }, 200)
      await setTimeout(() => {
        debugger;
        if(this.selectrow!=undefined && this.selectrow!=null && this.selectrow.intIssueAjustH_ID!=-1){
          router.push({ path: `/barmenu/LO-LOGISTICA/almacen/al_salidam`, query: { vista: 'visualizar',data:JSON.stringify(this.selectrow) }  })
        }
      }, 600)
    }
    else{
      this.vifprogress=false;
      this.textosave='Seleccione alguna salida. ';
      this.warningMessage('Seleccione  alguna salida. ');
    }
  }
   
  warningMessage(newMsg : string) {
    this.$message({
      showClose: true,
      message: newMsg,
      type: 'warning'
    });
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
  loadCompania(){
    this.dialogCompania=true;
  }
  handleCurrentChange(val) {
    if(val!=null){
      this.selectrow=val;
      this.currentRow = val;
    }
  }
  /*Compania imput*/
  activar_compania(){
    setTimeout(() => {
      this.limpiarBotones();
      this.btnactivarcompania=true;
    }, 120)
  }
  desactivar_compania(){
    if(this.dialogCompania){
      this.btnactivarcompania=false;
    }
  }
  closeCompania(){
    this.btnactivarcompania=false;
    return false;
  }
 
  
  getParseDate(fecha){
    return Global.getParseDate(fecha);
  }
  companiaSeleccionado(val){
    console.log('traer',val);
    this.productoModel.strCompany_Cod=val.strCompany_Cod
    this.descompania=val.strCompany_Desc;
   
    this.dialogCompania=false;
  }
  companiaClose(val){
    this.dialogCompania=false;
  }
  limpiarBotones(){
      this.btnactivarcompania=false;     
  }
  borrarCompania(){
    this.descompania='';
    this.dialogCompania=false;
    this.btnactivarcompania=false;
  }
  enterCompania(code){
    //alert('Bien'+code);
    console.log('compania_enter_1',code);
    companiaService.GetOnlyOneCompania(code)
    .then(response=>{
      if(response!=undefined){
        if(response.length>0){
          this.productoModel.strCompany_Cod=response[0].strCompany_Cod
          this.descompania=response[0].strCompany_Desc;
          this.dialogCompania=false;
          this.btnactivarcompania=false;
        }
      }
      //this.unidadmedidaModel=response;       
    }).catch(error=>{
      this.$message({
        showClose: true,
        type: 'error',
        message: 'No se pudo cargar compañia'
      });
    })
  }
  // validarView(){
  //   Global.codematerial=this.productoModel.strStock_Cod;
  //   router.push({ path: `/barmenu/LO-LOGISTICA/almacen/al_salidam`, query: { vista: 'visualizar' }  })
  // }
  created() {
    if(typeof window != 'undefined') {
      // this.getAccesos();
      this.vmaterial=Global.vmmaterial;
    }
  }
  getfunctiond(val){
    if(val>0){
      var t=Math.abs(val);
      return t;
    }
    return 0;
  }
  getfunctiona(val){
    if(val<0){
      var t=Math.abs(val);
      return t;
    }
    return 0;
  }
  cargar2(){
    console.log('suma total',this.sums);
  }
  async cargar(){
    this.sums1=0;
    this.sums2=0;
    this.sums3=0;
    this.sums4=0;
    this.rsums1=0;
    this.rsums2=0;
    this.rsums3=0;
    this.rsums4=0;
    for(var i=0;i<50;i++){
      this.valuem++; 
    }
    //debugger;
    console.log(this.fechaDesde);
    this.balCuentas.intYear=this.fechaDesde.getFullYear();
    this.balCuentas.strCompany_Cod=this.balCuentas.strCompany_Cod==undefined?'*':this.balCuentas.strCompany_Cod;
    
    await kardexvaloradoService.GetKardexUnidadFisica(this.balCuentas.strCompany_Cod,this.balCuentas.intYear,this.fechaDesde.getMonth()+1,this.fechaHasta.getMonth()+1)
    .then(res=>{
      //debugger;
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
        }, 200)
      }
    })
    .catch(error=>{
      
    })
  }
  async Buscar(){
    //debugger;
    this.tableData=[];
    var data:any=this.formBusqueda;
    var primerDia = new Date(this.fechaDesde.getFullYear(), this.fechaDesde.getMonth(), 1);
    var ultimoDia = new Date(this.fechaHasta.getFullYear(), this.fechaHasta.getMonth() + 1, 0);
    
    ultimoDia.setDate(ultimoDia.getDate()+1)
    data.feci=await Global.getDateString(primerDia)
    data.fecf= await Global.getDateString(ultimoDia)
 
    data.cod_company='*'
    for(var i=0;i<50;i++){
      this.valuem++; 
    }
    await libroBalanceService.GetLibroDiario(data)
    .then(res=>{
      //debugger;
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
        }, 200)
      }
    })
    .catch(error=>{
      
    })

  }
  ExportarTxt(){
    var texto='';
    for(var i=0;i<this.tableData.length;i++){
      texto+=this.tableData[i].periodo==undefined?'':this.tableData[i].periodo+"\t|"
      texto+=this.tableData[i].correlativo==undefined?'':this.tableData[i].correlativo+"\t|"
      texto+=this.tableData[i].strReferDocum_NO==undefined?'':this.tableData[i].strReferDocum_NO+"\t|"
      texto+=this.tableData[i].item_strAcc_Local_NO==undefined?'':this.tableData[i].item_strAcc_Local_NO+"\t|"
      texto+="|"
      texto+="|"
      texto+=this.tableData[i].item_strCurrency_Cod==undefined?'':this.tableData[i].item_strCurrency_Cod+"\t|"
      texto+=this.tableData[i].pro_strDocIdent_NO==undefined?'':this.tableData[i].pro_strDocIdent_NO+"\t|"
      texto+=this.tableData[i].pro_strDocIdent_Name==undefined?'':this.tableData[i].pro_strDocIdent_Name+"\t|"
      
      texto+=this.tableData[i].item_strType_Doc==undefined?'':this.tableData[i].item_strType_Doc+"\t|"
      texto+=this.tableData[i].item_strSerie_Doc==undefined?'':this.tableData[i].item_strSerie_Doc+"\t|"
      texto+=this.tableData[i].item_strDocument_NO==undefined?'':this.tableData[i].item_strDocument_NO+"\t|"
      texto+=this.tableData[i].item_dtmPosting_Date==undefined?'':this.tableData[i].item_dtmPosting_Date+"\t|"
      texto+="|"
      texto+=this.tableData[i].item_dtmDoc_Date==undefined?'':this.tableData[i].item_dtmDoc_Date+"\t|"
      texto+=this.tableData[i].item_strDaily_Desc==undefined?'':this.tableData[i].item_strDaily_Desc+"\t|"
      texto+="|"
      texto+=this.tableData[i].debe==undefined?'':this.tableData[i].debe+"\t|"
      texto+=this.tableData[i].haber==undefined?'':this.tableData[i].haber+"\t|"
      texto+="|"
      
      texto+="\r\n"
    }
    var blob = new Blob([texto], {type: "text/plain;charset=utf-8"});
    FileSaver.saveAs(blob, "Diario_PLE_"+this.getParseDate(new Date())+".txt");
  }

  ExportarExcel(){
       /* generate workbook object from table */
			var wb = XLSX.utils.table_to_book(document.getElementById('out-table'));
      /* generate file and force a download*/
      XLSX.writeFile(wb, "Formato 12.1 Registro Del Inventario Permanente En Unidades Físicas "+ this.getParseDate(new Date())+".xlsx");
  }

  ExportarPDF(){
  //   let doc = new jsPDF('landscape');
  //   let marginleft=5;
  //   let comienzo=5;
  //   doc.setFontSize(13);
  //   doc.setFontStyle('bold');
  //   doc.text('PER105 SUNAT Formato 5.1 Libro Diario Reporte', doc.internal.pageSize.width/2, 10, null, null, 'center'); 
  //   doc.text('20538428524 - Minera Las Bambas S.A.', doc.internal.pageSize.width/2, 15, null, null, 'center'); 
  //   console.log(this.fechaDesde.getMonth());
  //   var txt=Global.getNombreMes(this.fechaDesde.getMonth()+1)+' '+this.fechaDesde.getFullYear()+' - '+Global.getNombreMes(this.fechaHasta.getMonth()+1)+' '+this.fechaHasta.getFullYear();
  //   doc.text(txt, doc.internal.pageSize.width/2, 20, null, null, 'center'); 
    
  //    //doc.text('The text', doc.internal.pageSize.width, 50, null, null, 'center');
  // //   doc.text(marginleft, comienzo, 
  // //   'PER105 SUNAT Formato 5.1 Libro Diario Reporte ');
  // //  //20538428524 - Minera Las Bambas S.A.Enero 2017');
    
  //   var tam=doc.internal.pageSize.height;
  //   var tamW=doc.internal.pageSize.width;
    
  //   debugger;
     
  //   // doc.setFontSize(10);
  //   // doc.text(marginleft, comienzo+15, 'PE01 MMG Perú Las Bambas Mine');
  //   // doc.setFontSize(9);
  //   // doc.text(marginleft, comienzo+40, 'Nro Vale Salida:');
  //   // doc.text(marginleft, comienzo+55, 'Fecha:');
  //   // doc.setFontType('normal');
  //   // doc.text(marginleft+80, comienzo+40, this.salidaModel.strIssueAjust_NO);
  //   // doc.text(marginleft+40, comienzo+55, this.salidaModel.dtmApproved_Date);
    
  //   var mitad=tam/2;
    
  //   let columns = [
  //     {title:"Periodo Contable ",dataKey:"periodo"},
  //     {title:"Número Correlativo del Asiento ó Código unico de la operación",dataKey:"correlativo"},
  //     {title:"Número correlativo del asiento contable identificado",dataKey:"strReferDocum_NO"},
  //     {title:"Cuenta Contable Perú",dataKey:"item_strAcc_Local_NO"},
  //     {title:"Moneda del documento",dataKey:"item_strCurrency_Cod"},
  //     {title:"Fecha Contabilización",dataKey:"item_dtmPosting_Date"},
  //     {title:"Fecha de Registro",dataKey:"item_dtmDoc_Date"},
  //     {title:"Glosa o Descripción de la Operación",dataKey:"item_strDaily_Desc"},
  //     {title:"Movimientos del Debe",dataKey:"debe"},
  //     {title:"Movimientos del Haber",dataKey:"haber"},
  //   ];
   
  //   var result:any = this.tableData.reduce(function (r, a) {
  //     r[a.correlativo] = r[a.correlativo] || [];
  //     r[a.correlativo].push(a);
  //     return r;
  //   }, []);
  //   console.log('------bbbb-----',result);
  //   debugger;
  //   var sumdata:any=[{}];
  //   var dataTotal:any=[{}];
  //   for (const prop in result) {
  //     var item=result[prop];
  //     var items={
  //       correlativo: '',
  //       debe:'',
  //       haber: '',
  //       item_dtmDoc_Date: '',
  //       item_dtmPosting_Date: '',
  //       item_fltAmount_Local: '',
  //       item_intDoc_No: '',
  //       item_strAccDocum_NO: '',
  //       item_strAcc_Local_NO: '',
  //       item_strCurrency_Cod:'Sub Total',
  //       item_strDaily_Desc: '',
  //       item_strDocument_NO: '',
  //       item_strOrigenDocum_NO: '',
  //       item_strSerie_Doc: '',
  //       item_strType_Doc: '',
  //       periodo: '',
  //       pro_strDocIdent_NO: '',
  //       pro_strTax_ID: '',
  //       strReferDocum_NO: ''
  //     }
  //     var msgTotal_debe = item.reduce(function(prev, cur) {
  //       return prev + parseFloat(cur.debe);
  //     }, 0);
  //     var msgTotal_haber = item.reduce(function(prev, cur) {
  //       return prev + parseFloat(cur.haber);
  //     }, 0);
  //     items.debe=msgTotal_debe;
  //     items.haber=msgTotal_haber;
  //     for(var j=0;j<item.length;j++){
  //       dataTotal.push(item[j]);
  //     }
  //     dataTotal.push(items);
  //     //sumdata.push(items);
  //     //console.log( 'total'+item[0].correlativo,msgTotal)
      
  //   }

  //   console.log('------fin-----',dataTotal);

  //   doc.autoTable(columns, dataTotal,{
      
  //     startY: 30,
  //     startX: marginleft,
  //     margin: marginleft,
  //     headerStyles: {
  //       fillColor: [215, 215, 215],
  //       textColor: "#000000",
  //       fontSize:7,
  //       lineWidth: 0.1,
  //       lineColor:"#b3b3b3", //Silver gray
  //       fontStyle: 'bold',
  //       halign: 'center', //'center' or 'right'
  //     },  
  //     bodyStyles:{
  //       fontSize:7,  
  //       lineWidth: 0.1,
  //       lineColor:"#b3b3b3", //Silver gray
  //     },
        
  //      theme: 'striped',
  //     //theme: 'plain',
  //     columnStyles: {
  //       periodo:{columnWidth: 30},
  //       correlativo: {columnWidth: 30},
  //       strReferDocum_NO: {columnWidth: 20},
  //       item_strAcc_Local_NO: {columnWidth: 20},
  //       item_strCurrency_Cod: {columnWidth: 20},
  //       item_dtmPosting_Date: {columnWidth: 20},
  //       item_dtmDoc_Date: {columnWidth: 20},
  //       item_strDaily_Desc: {columnWidth: 80},
  //       debe:{columnWidth: 20},
  //       haber:{columnWidth: 20},
  //     },
  //     drawRow: function (row, data) {
  //       if (row.index === data.table.rows.length - 1) {
  //           doc.setFontStyle('bold');
  //       }
  //   },
  //     });
      
  //     var paragraph="Este documento (incluidas las páginas siguientes) es confidencial, este puede ser leído, copiado y utilizado solamente para fines respectivos.  Si Usted recibe este documento por error, por favor notifíquelo inmediatamente. No comparta su información a ninguna persona y destrúyalo. Muchas gracias. ";
  //     let columnsf = [
  //       {title:"Footer",dataKey:"footer"},
  //     ]
  //     let row=[
  //       {
  //         'footer':paragraph
  //       }
  //     ]
     
  //   //   doc.setLineDash([3, 3, 1, 3], 10);
  //   //   doc.setLineWidth(0.5);
  //   //   doc.line(marginleft, mitad, 580, mitad)
      
  //   //   doc.setLineDash(0, 0);
  //   //   doc.setLineWidth(0.5);
      
  //   //   doc.textColor=250;
  //   //   doc.setDrawColor(0, 0, 0);
  //   //   doc.line(80, mitad-65, 195, mitad-65)
  //   //   doc.line(tamW/2+80, mitad-65, tamW/2+75+130, mitad-65)
      
  //   //   doc.setFontSize(7);
  //   //   doc.text(90, mitad-55, "Nombre y firma de quien recibe");
  //   //   doc.text(tamW/2+90, mitad-55, "Nombre y firma de quien entrega");
  //   doc.save("Libro_Diario_"+ this.getParseDate(new Date())+".pdf");

  }
  tipomovimientoSelecionado(val){
    this.strTypeMov_Cod=val.strTypeMov_Cod;
    this.btnactivartipomovimiento=false;
    this.dialogTipoMovimiento=false;
  }
  activar_tipo_movimiento(){
    setTimeout(() => {
      this.btnactivartipomovimiento=true;      
    }, 120)
  }
  loadTipoMovimiento(){
    this.dialogTipoMovimiento=true;
  }
  desactivar_tipo_movimiento(){
    //debugger;
    if(this.dialogTipoMovimiento){
      this.btnactivartipomovimiento=false;
    }
  }
  cuentacontableselecionado(val){
    this.balCuentas.strAcc_Local_NO=val.strAcc_Local_NO;
    this.dialogCuentaContable=false;
  }
  closeDialogCuentaContable(){
    
  }
  loadCuentaContable(){
    //debugger;
    this.dialogCuentaContable=true;
  }
  desactivar_CuentaContable(){
   // 
    if(this.dialogCuentaContable){
      this.blnstrAcct_Loc=false;
    }
  }
  activar_CuentaContable(){
      this.blnstrAcct_Loc=true;
  }
  getSaldoFinaldd(row){
    debugger;
    var saldoini=row.fltOpening_Balance;
    var total=Number(saldoini)+Number(row.fltDebit_Acc)-Number(row.fltCredit_Acc);
    if(total>0){
      total=Math.abs(total);
      total=Math.round(total*100)/100;
      row.fltOpening_Balanced=Math.abs(Number(saldoini));
      row.fltClosing_Balanced=total;
      return total;
    }
    row.fltOpening_Balanced=0;
    row.fltClosing_Balanced=0;
    return 0;
    
  }
  getSaldoFinalaa(row){
    debugger;
    var saldoini=row.fltOpening_Balance;
    var total=Number(saldoini)+Number(row.fltDebit_Acc)-Number(row.fltCredit_Acc);
    if(total<0){
      total=Math.abs(total);
      total=Math.round(total*100)/100;
      row.fltOpening_Balancea=Math.abs(Number(saldoini));
      row.fltClosing_Balancea=total;
      return total;
    }
    row.fltOpening_Balancea=0;
    row.fltClosing_Balancea=0;
    return 0;
  }
  getSaldoFinald(row){
    debugger;
    var saldoini=row.fltOpening_Balance;
    var total=Number(saldoini)+Number(row.fltDebit_Acc)-Number(row.fltCredit_Acc);
    if(total>0){
      total=Math.abs(total);
      total=Math.round(total*100)/100;
      row.fltClosing_Balancesd=total;
      return total;
    }
    row.fltClosing_Balancesd=0;
    return 0;
  }
  getSaldoFinala(row){
    debugger;
    var saldoini=row.fltOpening_Balance;
    var total=Number(saldoini)+Number(row.fltDebit_Acc)-Number(row.fltCredit_Acc);
    if(total<0){
      total=Math.abs(total);
      total=Math.round(total*100)/100;
      row.fltClosing_Balancesa=total;
      return total;
    }
    row.fltClosing_Balancesa=0;
    return 0;
  }
  
  getSummaries(param) {
    const { columns, data } = param;
    
    columns.forEach((column, index) => {
      if (index === 0) {
        this.sums[index] = ' ';
        return;
      }
      const values = data.map(item => Number(item[column.property]));
      if (!values.every(value => isNaN(value))) {
        this.sums[index] = ' ' + values.reduce((prev, curr) => {
          const value = Number(curr);
          if( value==-110.6){
            console.log('***00',column.property);
            console.log('***11',values);
            console.log('***22',curr);
            
          }
          if (!isNaN(value)) {
            var res=Math.round((prev + curr)*100)/100;
            if(index==6){
              this.sums1=  res;
            }
            if(index==7){
              this.sums2=  res;
            }
            if(index==8){
              this.sums3=  res;
            }
            if(index==9){
              this.sums4=  res;
            }
            return res;
          } else {
            return prev;
          }
        }, 0);
        
      } else {
        this.sums[index] = ' ';
      }
    });

    return this.sums;
  }

  CambiarSaldoFinalD(val){
    this.rsums1=Math.round((Number(this.sums1)+Number(val))*100)/100;
  }
  CambiarSaldoFinalA(val){
    this.rsums2=Math.round((Number(this.sums2)+Number(val))*100)/100;
  }
  CambiarSaldoFinalBA(val){
    this.rsums4=Math.round((Number(this.sums4)+Number(val))*100)/100;
  }
  CambiarSaldoFinalBD(val){
    this.rsums3=Math.round((Number(this.sums3)+Number(val))*100)/100;
  }

  export_table_to_excel() {
    var wb = {
      "SheetNames": [
        "Main"
      ],
      "Sheets": {
        "Main": {
          "!merges": [
            {
              "s": {
                "c": 0,
                "r": 0
              },
              "e": {
                "c": 2,
                "r": 1
              }
            }
          ],
          "A1": {
            "v": "This is a submerged cell",
            "s": {
              "border": {
                "left": {
                  "style": "thick",
                  "color": {
                    "auto": 1
                  }
                },
                "top": {
                  "style": "thick",
                  "color": {
                    "auto": 1
                  }
                },
                "bottom": {
                  "style": "thick",
                  "color": {
                    "auto": 1
                  }
                }
              }
            },
            "t": "s"
          },
          "B1": {
            "v": "Pirate ship",
            "s": {
              "border": {
                "top": {
                  "style": "thick",
                  "color": {
                    "auto": 1
                  }
                },
                "bottom": {
                  "style": "thick",
                  "color": {
                    "auto": 1
                  }
                }
              }
            },
            "t": "s"
          },
          "C1": {
            "v": "Sunken treasure",
            "s": {
              "border": {
                "right": {
                  "style": "thick",
                  "color": {
                    "auto": 1
                  }
                },
                "top": {
                  "style": "thick",
                  "color": {
                    "auto": 1
                  }
                },
                "bottom": {
                  "style": "thick",
                  "color": {
                    "auto": 1
                  }
                }
              }
            },
            "t": "s"
          },
          "A2": {
            "v": "Blank",
            "t": "s",
            "s":{
              "border": {
                "left": {
                  "style": "thick",
                  "color": {
                    "auto": 1
                  }
                },
                "top": {
                  "style": "thick",
                  "color": {
                    "auto": 1
                  }
                },
                "bottom": {
                  "style": "thick",
                  "color": {
                    "auto": 1
                  }
                }
              }
            }
          },
          "B2": {
            "v": "Red",
            "s": {
              "fill": {
                "fgColor": {
                  "rgb": "FFFF0000"
                }
              },

              "border": {

                "bottom": {
                  "style": "thick",
                  "color": {
                    "auto": 1
                  }
                }
              }
            },
            "t": "s"
          },
          "C2": {
            "v": "Green",
            "s": {
              "fill": {
                "fgColor": {
                  "rgb": "FF00FF00"
                }
              },
              "border": {

                "bottom": {
                  "style": "thick",
                  "color": {
                    "auto": 1
                  }
                },
                "right": {
                  "style": "thick",
                  "color": {
                    "auto": 1
                  }
                }
              }

            },
            "t": "s"
          },
          "D2": {
            "v": "Blue",
            "s": {
              "fill": {
                "fgColor": {
                  "rgb": "FF0000FF"
                }
              }
            },
            "t": "s"
          },
          "E2": {
            "v": "Theme 5",
            "s": {
              "fill": {
                "fgColor": {
                  "theme": 5
                }
              }
            },
            "t": "s"
          },
          "F2": {
            "v": "Theme 5 Tint -0.5",
            "s": {
              "fill": {
                "fgColor": {
                  "theme": 5,
                  "tint": -0.5
                }
              }
            },
            "t": "s"
          },
          "A3": {
            "v": "Default",
            "t": "s"
          },
          "B3": {
            "v": "Arial",
            "s": {
              "font": {
                "name": "Arial",
                "sz": 24,
                "color": {
                  "theme": "5"
                }
              }
            },
            "t": "s"
          },
          "C3": {
            "v": "Times New Roman",
            "s": {
              "font": {
                "name": "Times New Roman",
                bold: true,
                underline: true,
                italic: true,
                strike: true,
                outline: true,
                shadow: true,
                vertAlign: "superscript",
                "sz": 16,
                "color": {
                  "rgb": "FF2222FF"
                }
              }
            },
            "t": "s"
          },
          "D3": {
            "v": "Courier New",
            "s": {
              "font": {
                "name": "Courier New",
                "sz": 14
              }
            },
            "t": "s"
          },
          "A4": {
            "v": 0.618033989,
            "t": "n"
          },
          "B4": {
            "v": 0.618033989,
            "t": "n"
          },
          "C4": {
            "v": 0.618033989,
            "t": "n"
          },
          "D4": {
            "v": 0.618033989,
            "t": "n",
            "s": {
              "numFmt": "0.00%"
            }
          },
          "E4": {
            "v": 0.618033989,
            "t": "n",
            "s": {
              "numFmt": "0.00%",
              "fill": {
                "fgColor": {
                  "rgb": "FFFFCC00"
                }
              }
            }
          },
          "A5": {
            "v": 0.618033989,
            "t": "n",
            "s": {
              "numFmt": "0%"
            }
          },
          "B5": {
            "v": 0.618033989,
            "t": "n",
            "s": {
              "numFmt": "0.0%"
            }
          },
          "C5": {
            "v": 0.618033989,
            "t": "n",
            "s": {
              "numFmt": "0.00%"
            }
          },
          "D5": {
            "v": 0.618033989,
            "t": "n",
            "s": {
              "numFmt": "0.000%"
            }
          },
          "E5": {
            "v": 0.618033989,
            "t": "n",
            "s": {
              "numFmt": "0.0000%"
            }
          },
          "F5": {
            "v": 0,
            "t": "n",
            "s": {
              "numFmt": "0.00%;\\(0.00%\\);\\-;@",
              "fill": {
                "fgColor": {
                  "rgb": "FFFFCC00"
                }
              }
            }
          },
          "A6": {
            "v": "Sat Mar 21 2015 23:47:34 GMT-0400 (EDT)",
            "t": "s"
          },
          "B6": {
            "v": 42084.99137416667,
            "t": "n"
          },
          "C6": {
            "v": 42084.99137416667,
            "s": {
              "numFmt": "d-mmm-yy"
            },
            "t": "n"
          },
          "A7": {
            "v": "left",
            "s": {
              "alignment": {
                "horizontal": "left"
              }
            },
            "t": "s"
          },
          "B7": {
            "v": "center",
            "s": {
              "alignment": {
                "horizontal": "center"
              }
            },
            "t": "s"
          },
          "C7": {
            "v": "right",
            "s": {
              "alignment": {
                "horizontal": "right"
              }
            },
            "t": "s"
          },
          "A8": {
            "v": "vertical",
            "s": {
              "alignment": {
                "vertical": "top"
              }
            },
            "t": "s"
          },
          "B8": {
            "v": "vertical",
            "s": {
              "alignment": {
                "vertical": "center"
              }
            },
            "t": "s"
          },
          "C8": {
            "v": "vertical",
            "s": {
              "alignment": {
                "vertical": "bottom"
              }
            },
            "t": "s"
          },
          "A9": {
            "v": "indent",
            "s": {
              "alignment": {
                "indent": "1"
              }
            },
            "t": "s"
          },
          "B9": {
            "v": "indent",
            "s": {
              "alignment": {
                "indent": "2"
              }
            },
            "t": "s"
          },
          "C9": {
            "v": "indent",
            "s": {
              "alignment": {
                "indent": "3"
              }
            },
            "t": "s"
          },
          "A10": {
            "v": "In publishing and graphic design, lorem ipsum is a filler text commonly used to demonstrate the graphic elements of a document or visual presentation. ",
            "s": {
              "alignment": {
                "wrapText": 1,
                "horizontal": "right",
                "vertical": "center",
                "indent": 1
              }
            },
            "t": "s"
          },
          "A11": {
            "v": 41684.35264774306,
            "s": {
              "numFmt": "m/d/yy"
            },
            "t": "n"
          },
          "B11": {
            "v": 41684.35264774306,
            "s": {
              "numFmt": "d-mmm-yy"
            },
            "t": "n"
          },
          "C11": {
            "v": 41684.35264774306,
            "s": {
              "numFmt": "h:mm:ss AM/PM"
            },
            "t": "n"
          },
          "D11": {
            "v": 42084.99137416667,
            "s": {
              "numFmt": "m/d/yy"
            },
            "t": "n"
          },
          "E11": {
            "v": 42065.02247239584,
            "s": {
              "numFmt": "m/d/yy"
            },
            "t": "n"
          },
          "F11": {
            "v": 42084.99137416667,
            "s": {
              "numFmt": "m/d/yy h:mm:ss AM/PM"
            },
            "t": "n"
          },
          "A12": {
            "v": "Apple",
            "s": {
              "border": {
                "top": {
                  "style": "thin"
                },
                "left": {
                  "style": "thin"
                },
                "right": {
                  "style": "thin"
                },
                "bottom": {
                  "style": "thin"
                }
              }
            },
            "t": "s"
          },
          "C12": {
            "v": "Apple",
            "s": {
              "border": {
                "diagonalUp": 1,
                "diagonalDown": 1,
                "top": {
                  "style": "dashed",
                  "color": {
                    "auto": 1
                  }
                },
                "right": {
                  "style": "medium",
                  "color": {
                    "theme": "5"
                  }
                },
                "bottom": {
                  "style": "hair",
                  "color": {
                    "theme": 5,
                    "tint": "-0.3"
                  }
                },
                "left": {
                  "style": "thin",
                  "color": {
                    "rgb": "FFFFAA00"
                  }
                },
                "diagonal": {
                  "style": "dotted",
                  "color": {
                    "auto": 1
                  }
                }
              }
            },
            "t": "s"
          },
          "E12": {
            "v": "Pear",
            "s": {
              "border": {
                "diagonalUp": 1,
                "diagonalDown": 1,
                "top": {
                  "style": "dashed",
                  "color": {
                    "auto": 1
                  }
                },
                "right": {
                  "style": "dotted",
                  "color": {
                    "theme": "5"
                  }
                },
                "bottom": {
                  "style": "mediumDashed",
                  "color": {
                    "theme": 5,
                    "tint": "-0.3"
                  }
                },
                "left": {
                  "style": "double",
                  "color": {
                    "rgb": "FFFFAA00"
                  }
                },
                "diagonal": {
                  "style": "hair",
                  "color": {
                    "auto": 1
                  }
                }
              }
            },
            "t": "s"
          },
          "A13": {
            "v": "Up 90",
            "s": {
              "alignment": {
                "textRotation": 90
              }
            },
            "t": "s"
          },
          "B13": {
            "v": "Up 45",
            "s": {
              "alignment": {
                "textRotation": 45
              }
            },
            "t": "s"
          },
          "C13": {
            "v": "Horizontal",
            "s": {
              "alignment": {
                "textRotation": 0
              }
            },
            "t": "s"
          },
          "D13": {
            "v": "Down 45",
            "s": {
              "alignment": {
                "textRotation": 135
              }
            },
            "t": "s"
          },
          "E13": {
            "v": "Down 90",
            "s": {
              "alignment": {
                "textRotation": 180
              }
            },
            "t": "s"
          },
          "F13": {
            "v": "Vertical",
            "s": {
              "alignment": {
                "textRotation": 255
              }
            },
            "t": "s"
          },
          "A14": {
            "v": "Font color test",
            "s": {
              "font": {
                "color": {
                  "rgb": "FFC6EFCE"
                }
              }
            },
            "t": "s"
          },
          "!ref": "A1:F14"
        }
      }
    }
    var wbout = XLSX.write(wb, {bookType:'xlsx', bookSST:true, type: 'binary'});
    var fname =   'testas.xlsx';
    try {
      saveAs(new Blob([this.s2ab(wbout)],{type:"application/octet-stream"}), fname);
    } catch(e) { if(typeof console != 'undefined') console.log(e, wbout); }
    return wbout;
  }
  s2ab(s) {
    if(typeof ArrayBuffer !== 'undefined') {
      var buf = new ArrayBuffer(s.length);
      var view = new Uint8Array(buf);
      for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
      return buf;
    } else {
      var buf2 = new Array(s.length);
      for (var i=0; i!=s.length; ++i) buf2[i] = s.charCodeAt(i) & 0xFF;
      return buf2;
    }
  }
  cambiarmes(fecha){
    var anio:any=new Date(this.fechaDesde);
    anio=anio.getFullYear();
    var anios:any=new Date(fecha);
    anios=anios.getFullYear();
    if(anios==anio){
      var mes:any=new Date(this.fechaDesde);
      mes=mes.getMonth();
      var mess:any=new Date(fecha);
      mess=mess.getMonth();
      if(mess<mes){
        alert('Ingrese periodo correctamente');
        this.fechaHasta=new Date();
      }
    }
    else{
      alert('Ingrese periodo correctamente');
      this.fechaHasta=new Date();
      return new Date();
    }
    
  }
  data(){
    return{
      dialogTableVisible: false,
      dialogVisible:false,
      tableDataServicio:[{}],
      user: {
        authenticated: false
      },
    }
  }
  mounted() {
    let recaptchaScript = document.createElement('script')
    recaptchaScript.setAttribute('src', 'http://rawgit.com/protobi/js-xlsx/master/dist/xlsx.full.min.js')
    document.head.appendChild(recaptchaScript)
  }
  
}

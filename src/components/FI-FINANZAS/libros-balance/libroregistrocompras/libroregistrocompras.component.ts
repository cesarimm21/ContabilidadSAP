import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import router from '@/router';
import ElementUI from 'element-ui';
import InfiniteScroll from 'vue-infinite-scroll';
import 'element-ui/lib/theme-default/index.css';
import BCompaniaProveedor from '@/components/buscadores/b_compania/b_compania.vue';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
// import XLSX from 'xlsx';
import FileSaver from 'file-saver';

import ButtonsAccionsComponent from '@/components/buttonsAccions/buttonsAccions.vue';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css';
import axios from 'axios';
import { Loading } from 'element-ui';

import salidaService from '@/components/service/salida.service';
import libroRegistroCompra from '@/components/service/libroRegistroCompra.service';



//***Modelos */
import {ProductoModel} from '@/modelo/maestro/producto';

import { Notification } from 'element-ui';
import Global from '@/Global';
import companiaService from '@/components/service/compania.service';
import productoService from '@/components/service/producto.service';

import { SalidaModel } from '@/modelo/maestro/salida';


import jsPDF from 'jspdf'
import { Base64 } from 'js-base64'; 
import autoTable from 'jspdf-autotable';
import 'jspdf-autotable';
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
  name: 'libro-registro-compras',
  components:{
    'buttons-accions':ButtonsAccionsComponent,
    'bcompania':BCompaniaProveedor,
    'quickaccessmenu':QuickAccessMenuComponent,
  } ,
 
})
export default class LibroRegistroCompraComponent extends Vue {
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
 
  /*input*/
  btnactivarcompania:boolean=false;
   
  /*Model*/
  public productoModel:ProductoModel=new ProductoModel();

  descompania:string='';
  code_compania:string='';

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

  strTypeMov_Cod:string='';
  constructor(){
    super();
    this.fecha_actual=Global.getParseDate(new Date().toDateString());
    debugger;
    this.tiporequisicion="A";
    setTimeout(() => {
      this.load();
    }, 200)
  }
  load(){
    this.cargar();
  }
  async validarView(){
    debugger;
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
    debugger;
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
    debugger;
    if(this.dialogCompania){
      this.btnactivarcompania=false;
    }
  }
  closeCompania(){
    debugger;
    this.btnactivarcompania=false;
    return false;
  }
 
  
  getParseDate(fecha){
    return Global.getParseDate(fecha);
  }
  companiaSeleccionado(val){
    debugger;
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
    debugger;
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
    debugger;
    if(typeof window != 'undefined') {
      // this.getAccesos();
      debugger;
      this.vmaterial=Global.vmmaterial;
    }
  }
  
  async cargar(){
    var list:any=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    var countsd =list.Where(ad => ad % 2 == 1).Count();        
    console.log("cargar",countsd);
    var data:any=this.formBusqueda;
    data.cod_company='*'
    data.feci='*'
    data.fecf= '*'
    for(var i=0;i<50;i++){
      this.valuem++; 
    }
    await libroRegistroCompra.GetLibro(data)
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
        }, 200)
      }
    })
    .catch(error=>{
      
    })
  }
  async Buscar(){
    debugger;
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
    await libroRegistroCompra.GetLibro(data)
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
        }, 200)
      }
    })
    .catch(error=>{
      
    })

  }
  

  ExportarExcel(){
      
      /* generate workbook object from table */
			// var wb = XLSX.utils.table_to_book(document.getElementById('out-table'));
			// /* generate file and force a download*/
      // XLSX.writeFile(wb, "Libro_Registro_Compras_"+ this.getParseDate(new Date())+".xlsx");
    
  }
  ExportarTxt(){
    var texto='';
    for(var i=0;i<this.tableData.length;i++){
      texto+=this.tableData[i].periodo==undefined?'':this.tableData[i].periodo+"\t|"
      texto+=this.tableData[i].item_strVoucher_NO==undefined?'':this.tableData[i].item_strVoucher_NO+"\t|"
      //texto+=this.tableData[i].cuo+"\t|"
      texto+="|"
      texto+=this.tableData[i].item_dtmDoc_Date==undefined?'':this.tableData[i].item_dtmDoc_Date+"\t|"
      texto+=this.tableData[i].item_dtmDue_Date==undefined?'':this.tableData[i].item_dtmDue_Date+"\t|"
      texto+=this.tableData[i].item_strType_Doc==undefined?'':this.tableData[i].item_strType_Doc+"\t|"
      texto+=this.tableData[i].item_strSerie_Doc==undefined?'':this.tableData[i].item_strSerie_Doc+"\t|"
      //texto+=this.tableData[i].year+"\t|"
      texto+="|"
      texto+=this.tableData[i].item_strDocument_NO==undefined?'':this.tableData[i].item_strDocument_NO+"\t|"
      texto+="|"
      texto+=this.tableData[i].pro_strCat_Person==undefined?'':this.tableData[i].pro_strCat_Person+"\t|"
      texto+=this.tableData[i].pro_strTax_ID==undefined?'':this.tableData[i].pro_strTax_ID+"\t|"
      texto+=this.tableData[i].item_strVendor_Desc==undefined?'':this.tableData[i].item_strVendor_Desc+"\t|"
      texto+=this.tableData[i].item_fltValue_Local==undefined?'':this.tableData[i].item_fltValue_Local+"\t|"
      texto+=this.tableData[i].item_fltValue_Tax_Local==undefined?'':this.tableData[i].item_fltValue_Tax_Local+"\t|"
      texto+="|"
      texto+="|"
      texto+="|"
      texto+="|"
      texto+=this.tableData[i].item_fltOperation_NoTax_Local==undefined?'':this.tableData[i].item_fltOperation_NoTax_Local+"\t|"
      texto+=this.tableData[i].item_fltISC_Local==undefined?'':this.tableData[i].item_fltISC_Local+"\t|"
      texto+=this.tableData[i].item_fltOther_WH_Local==undefined?'':this.tableData[i].item_fltOther_WH_Local+"\t|"
      texto+=this.tableData[i].item_fltNetValue_Doc_Local==undefined?'':this.tableData[i].item_fltNetValue_Doc_Local+"\t|"
      texto+=this.tableData[i].item_strCurrency_Doc==undefined?'':this.tableData[i].item_strCurrency_Doc+"\t|"
      texto+=this.tableData[i].item_fltExchange_Rate==undefined?'':this.tableData[i].item_fltExchange_Rate+"\t|"
      texto+=this.tableData[i].item_dtmDoc_Date_Ref==undefined?'':this.tableData[i].item_dtmDoc_Date_Ref+"\t|"
      texto+=this.tableData[i].item_strType_Doc_Ref==undefined?'':this.tableData[i].item_strType_Doc_Ref+"\t|"
      texto+=this.tableData[i].item_strSerie_Doc_Ref==undefined?'':this.tableData[i].item_strSerie_Doc_Ref+"\t|"
      texto+="|"
      texto+=this.tableData[i].item_fltDocument_NO_Ref==undefined?'':this.tableData[i].item_fltDocument_NO_Ref+"\t|"
      texto+=this.tableData[i].item_dtmDetrac_Date==undefined?'':this.tableData[i].item_dtmDetrac_Date+"\t|"
      texto+=this.tableData[i].item_strDetrac_Cod==undefined?'':this.tableData[i].item_strDetrac_Cod+"\t|"
      texto+=this.tableData[i].Affected_Reten==undefined?'':this.tableData[i].Affected_Reten+"\t|"
      texto+="|"
      texto+="|"
      texto+="|"
      texto+="|"
      texto+="|"
      texto+="|"
      texto+=this.tableData[i].sunat==undefined?'':this.tableData[i].sunat+"\t|"
      texto+="\r\n"
    }
    var blob = new Blob([texto], {type: "text/plain;charset=utf-8"});
    FileSaver.saveAs(blob, "RC_PLE_"+this.getParseDate(new Date())+".txt");
  }

  ExportarPDF(){
    let doc = new jsPDF('landscape');
    let marginleft=5;
    let comienzo=5;
    doc.setFontSize(13);
    doc.setFontStyle('bold');
    doc.text('PER105 SUNAT Formato 5.1 Libro Diario Reporte', doc.internal.pageSize.width/2, 10, null, null, 'center'); 
    doc.text('20538428524 - Minera Las Bambas S.A.', doc.internal.pageSize.width/2, 15, null, null, 'center'); 
    console.log(this.fechaDesde.getMonth());
    var txt=Global.getNombreMes(this.fechaDesde.getMonth()+1)+' '+this.fechaDesde.getFullYear()+' - '+Global.getNombreMes(this.fechaHasta.getMonth()+1)+' '+this.fechaHasta.getFullYear();
    doc.text(txt, doc.internal.pageSize.width/2, 20, null, null, 'center'); 
    
     //doc.text('The text', doc.internal.pageSize.width, 50, null, null, 'center');
  //   doc.text(marginleft, comienzo, 
  //   'PER105 SUNAT Formato 5.1 Libro Diario Reporte ');
  //  //20538428524 - Minera Las Bambas S.A.Enero 2017');
    
    var tam=doc.internal.pageSize.height;
    var tamW=doc.internal.pageSize.width;
    
    debugger;
     
    // doc.setFontSize(10);
    // doc.text(marginleft, comienzo+15, 'PE01 MMG Perú Las Bambas Mine');
    // doc.setFontSize(9);
    // doc.text(marginleft, comienzo+40, 'Nro Vale Salida:');
    // doc.text(marginleft, comienzo+55, 'Fecha:');
    // doc.setFontType('normal');
    // doc.text(marginleft+80, comienzo+40, this.salidaModel.strIssueAjust_NO);
    // doc.text(marginleft+40, comienzo+55, this.salidaModel.dtmApproved_Date);
    
    var mitad=tam/2;
    
    let columns = [
      {title:"Periodo Contable ",dataKey:"periodo"},
      {title:"Número Correlativo del Asiento o Codigo unico de la operacion",dataKey:"correlativo"},
      {title:"Número correlativo del asiento contable identificado",dataKey:"strReferDocum_NO"},
      {title:"Cuenta Contable Perú",dataKey:"item_strAcc_Local_NO"},
      {title:"Moneda del documento",dataKey:"item_strCurrency_Cod"},
      {title:"Fecha Contabilizacion",dataKey:"item_dtmPosting_Date"},
      {title:"Fecha de Registro",dataKey:"item_dtmDoc_Date"},
      {title:"Glosa o Descripcion de la Operacion",dataKey:"item_strDaily_Desc"},
      {title:"Movimientos del Debe",dataKey:"debe"},
      {title:"Movimientos del Haber",dataKey:"haber"},
    ];
   
    var result:any = this.tableData.reduce(function (r, a) {
      r[a.correlativo] = r[a.correlativo] || [];
      r[a.correlativo].push(a);
      return r;
    }, []);
    console.log('------bbbb-----',result);
    debugger;
    var sumdata:any=[{}];
    var dataTotal:any=[{}];
    for (const prop in result) {
      var item=result[prop];
      var items={
        correlativo: '',
        debe:'',
        haber: '',
        item_dtmDoc_Date: '',
        item_dtmPosting_Date: '',
        item_fltAmount_Local: '',
        item_intDoc_No: '',
        item_strAccDocum_NO: '',
        item_strAcc_Local_NO: '',
        item_strCurrency_Cod:'Sub Total',
        item_strDaily_Desc: '',
        item_strDocument_NO: '',
        item_strOrigenDocum_NO: '',
        item_strSerie_Doc: '',
        item_strType_Doc: '',
        periodo: '',
        pro_strDocIdent_NO: '',
        pro_strTax_ID: '',
        strReferDocum_NO: ''
      }
      var msgTotal_debe = item.reduce(function(prev, cur) {
        return prev + parseFloat(cur.debe);
      }, 0);
      var msgTotal_haber = item.reduce(function(prev, cur) {
        return prev + parseFloat(cur.haber);
      }, 0);
      items.debe=msgTotal_debe;
      items.haber=msgTotal_haber;
      for(var j=0;j<item.length;j++){
        dataTotal.push(item[j]);
      }
      dataTotal.push(items);
      //sumdata.push(items);
      //console.log( 'total'+item[0].correlativo,msgTotal)
      
    }

    console.log('------fin-----',dataTotal);

    doc.autoTable(columns, dataTotal,{
      
      startY: 30,
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
      },
        
       theme: 'striped',
      //theme: 'plain',
      columnStyles: {
        periodo:{columnWidth: 30},
        correlativo: {columnWidth: 30},
        strReferDocum_NO: {columnWidth: 20},
        item_strAcc_Local_NO: {columnWidth: 20},
        item_strCurrency_Cod: {columnWidth: 20},
        item_dtmPosting_Date: {columnWidth: 20},
        item_dtmDoc_Date: {columnWidth: 20},
        item_strDaily_Desc: {columnWidth: 80},
        debe:{columnWidth: 20},
        haber:{columnWidth: 20},
      },
      drawRow: function (row, data) {
        if (row.index === data.table.rows.length - 1) {
            doc.setFontStyle('bold');
        }
    },
      });
      
      var paragraph="Este documento (incluidas las páginas siguientes) es confidencial, este puede ser leído, copiado y utilizado solamente para fines respectivos.  Si Usted recibe este documento por error, por favor notifíquelo inmediatamente. No comparta su informacion a ninguna persona y destrúyalo. Muchas gracias. ";
      let columnsf = [
        {title:"Footer",dataKey:"footer"},
      ]
      let row=[
        {
          'footer':paragraph
        }
      ]
     
    //   doc.setLineDash([3, 3, 1, 3], 10);
    //   doc.setLineWidth(0.5);
    //   doc.line(marginleft, mitad, 580, mitad)
      
    //   doc.setLineDash(0, 0);
    //   doc.setLineWidth(0.5);
      
    //   doc.textColor=250;
    //   doc.setDrawColor(0, 0, 0);
    //   doc.line(80, mitad-65, 195, mitad-65)
    //   doc.line(tamW/2+80, mitad-65, tamW/2+75+130, mitad-65)
      
    //   doc.setFontSize(7);
    //   doc.text(90, mitad-55, "Nombre y firma de quien recibe");
    //   doc.text(tamW/2+90, mitad-55, "Nombre y firma de quien entrega");
    doc.save('libro.pdf');

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
    debugger;
    if(this.dialogTipoMovimiento){
      this.btnactivartipomovimiento=false;
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
  
}

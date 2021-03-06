import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import router from '@/router';
import ElementUI from 'element-ui';
import InfiniteScroll from 'vue-infinite-scroll';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';

import FileSaver from 'file-saver';
import ButtonsAccionsComponent from '@/components/buttonsAccions/buttonsAccions.vue';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css';
import axios from 'axios';
import { Loading } from 'element-ui';
import salidaService from '@/components/service/salida.service';

import { Notification } from 'element-ui';
import Global from '@/Global';
import balancecuentaService from '@/components/service/balancecuenta.service';
import XLSX from 'xlsx';
import jsPDF from 'jspdf'
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
  name: 'al-crear',
  components:{
    'buttons-accions':ButtonsAccionsComponent,
    'quickaccessmenu':QuickAccessMenuComponent
  } ,
 
})
export default class CajaBancosComponent extends Vue {
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
  codigoCompania:any;
  descripcionCompania:any;

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
    this.codigoCompania=localStorage.getItem('compania_cod');
    this.descripcionCompania=localStorage.getItem('compania_name');
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
  
  
  async cargar(){
    
    
  }
  async Buscar(){
   
    this.tableData=[];
    var data:any=this.formBusqueda;
    var primerDia = new Date(this.fechaDesde.getFullYear(), this.fechaDesde.getMonth(), 1);
    var ultimoDia = new Date(this.fechaHasta.getFullYear(), this.fechaHasta.getMonth() + 1, 0);
    
    ultimoDia.setDate(ultimoDia.getDate()+1)
    data.feci=await Global.getDateString(primerDia)
    data.fecf= await Global.getDateString(ultimoDia)
 

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
      
      XLSX.writeFile(wb, "Libro_Diario_"+ this.getParseDate(new Date())+".xlsx");
      
    // var animals= [
    //   {"name": "cat", "category": "animal"}
    //   ,{"name": "dog", "category": "animal"}
    //   ,{"name": "pig", "category": "animal"}
    // ]
    // var pokemons= [
    //   {"name": "pikachu", "category": "pokemon"}
    //   ,{"name": "Arbok", "category": "pokemon"}
    //   ,{"name": "Eevee", "category": "pokemon"}
    // ]
    // var animalWS = XLSX.utils.json_to_sheet(animals) 
    // var pokemonWS = XLSX.utils.json_to_sheet(pokemons) 

    // // A workbook is the name given to an Excel file
    // var wb = XLSX.utils.book_new() // make Workbook of Excel

    // // add Worksheet to Workbook
    // // Workbook contains one or more worksheets
    // XLSX.utils.book_append_sheet(wb, animalWS, 'animals') // sheetAName is name of Worksheet
    // XLSX.utils.book_append_sheet(wb, pokemonWS, 'pokemons')   

    // var worksheet_name = "SheetJS";
    // var workbook = XLSX.utils.book_new();

    // complete Report Data is a 2D array of floats
    //var ws = XLSX.utils.aoa_to_sheet(animalsWS);
      
    // animalWS['A2'].s = {
    //     fill: {
    //     patternType: "none", // none / solid
    //     fgColor: {rgb: "FF000000"},
    //     bgColor: {rgb: "FFFFFFFF"}
    //       },
    //       font: {
    //     name: 'Times New Roman',
    //     sz: 16,
    //     color: {rgb: "#FF000000"},
    //     bold: true,
    //     italic: false,
    //     underline: false
    //       },
    //       border: {
    //     top: {style: "thin", color: {auto: 1}},
    //     right: {style: "thin", color: {auto: 1}},
    //     bottom: {style: "thin", color: {auto: 1}},
    //     left: {style: "thin", color: {auto: 1}}
    //       }
    //   };
    // XLSX.utils.book_append_sheet(workbook, animalWS, worksheet_name);
    // var filename = "REPORTJSONNAME.xlsx";
    // XLSX.writeFile(workbook, filename);
    
// var first_sheet_name = workbook.SheetNames[0];
// var address_of_cell = 1
// var worksheet = workbook.Sheets[first_sheet_name];
// animalWS[address_of_cell].s = {
// fill: {
// type:'pattern',
// pattern: "solid", // none / solid
// fgColor: { argb: "FF1c4587" },
// bgColor: { argb: "FF1c4587" }
// }
// }
// worksheet[address_of_cell].v = 1;
// XLSX.writeFile(workbook, 'book.xlsx');
    // animalWS.Cells["A1:V2"].Style.Fill.PatternType = ExcelFillStyle.Solid;
    // wb.Cells["A1:V2"].Style.Fill.BackgroundColor.SetColor(colFromHex);
    // export Excel file
   // XLSX.writeFile(wb, 'book.xlsx')

  //  let xlsx = officegen('xlsx')

  //   let sheet = xlsx.makeNewSheet()
  //   sheet.name = 'Officegen Excel'

  //   // Add data using setCell:

  //   sheet.setCell('E7', 42)
  //   sheet.setCell('I1', -3)
  //   sheet.setCell('I2', 3.141592653589)
  //   sheet.setCell('G102', 'Hello World!')

  //   // The direct option - two-dimensional array:

  //   sheet.data[0] = []
  //   sheet.data[0][0] = 1
  //   sheet.data[1] = []
  //   sheet.data[1][3] = 'some'
  //   sheet.data[1][4] = 'data'
  //   sheet.data[1][5] = 'goes'
  //   sheet.data[1][6] = 'here'
  //   sheet.data[2] = []
  //   sheet.data[2][5] = 'more text'
  //   sheet.data[2][6] = 900
  //   sheet.data[6] = []
  //   sheet.data[6][2] = 1972

    // Let's generate the Excel document into a file:

   // let out = fs.createWriteStream('example.xlsx')

    // out.on('error', function(err) {
    //   console.log(err)
    // })

      // // Async call to generate the output file:
      // xlsx.generate(out)
      // var Heading = [
      //   ["Employee Details"],
      //   ["Emp Name", "Emp Sal"]
      // ];
      // var Data = [
      //   {name:"xyz", sal:1000},
      //   {name:"abc", sal:2000}
      // ];
      // var ws = XLSX.utils.aoa_to_sheet(Heading);
     
      // XLSX.utils.sheet_add_json(ws, Data, {
      //   header:["name", "sal"],
      //   skipHeader:true,
      //   origin:-1
      //  });
       
      // var cell = ws['A1'];
      // cell.s = { 
      //   alignment: { textRotation: 90 }, 
      //   font: { sz: 16, bold: true, color: '#FF00FF' }, 
      //   fill: { bgColor: '#FFFFFF' } 
      // }   
      
      
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
  //     {title:"Número Correlativo del Asiento o Codigo unico de la operacion",dataKey:"correlativo"},
  //     {title:"Número correlativo del asiento contable identificado",dataKey:"strReferDocum_NO"},
  //     {title:"Cuenta Contable Perú",dataKey:"item_strAcc_Local_NO"},
  //     {title:"Moneda del documento",dataKey:"item_strCurrency_Cod"},
  //     {title:"Fecha Contabilizacion",dataKey:"item_dtmPosting_Date"},
  //     {title:"Fecha de Registro",dataKey:"item_dtmDoc_Date"},
  //     {title:"Glosa o Descripcion de la Operacion",dataKey:"item_strDaily_Desc"},
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
      
  //     var paragraph="Este documento (incluidas las páginas siguientes) es confidencial, este puede ser leído, copiado y utilizado solamente para fines respectivos.  Si Usted recibe este documento por error, por favor notifíquelo inmediatamente. No comparta su informacion a ninguna persona y destrúyalo. Muchas gracias. ";
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
  
  data(){
    return{
      dialogTableVisible: false,
      dialogVisible:false,
      codigoCompania:'',
      descripcionCompania:'',
      tableDataServicio:[{}],
      user: {
        authenticated: false
      },
    }
  }
  
}

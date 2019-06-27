import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import router from '@/router';
import 'element-ui/lib/theme-default/index.css';
import ButtonsAccionsComponent from '@/components/buttonsAccions/buttonsAccions.vue';
import { OrdenCompraModel } from '@/modelo/maestro/ordencompra';
import { OrdenCompraDetalleModel } from '@/modelo/maestro/ordencompradetalle';
import { ProveedorModel } from '@/modelo/maestro/proveedor';
import ordenCompraService from '@/components/service/ordencompra.service';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import { Loading } from 'element-ui';
import Global from '@/Global';
import ordencompraService from '@/components/service/ordencompra.service';
import proveedorService from '@/components/service/proveedor.service';
import jsPDF from 'jspdf'
import { Base64 } from 'js-base64'; 
import autoTable from 'jspdf-autotable';
import 'jspdf-autotable';
@Component({
    name: 'imprimir-po',
    components: {
        'buttons-accions': ButtonsAccionsComponent,
        'quickaccessmenu': QuickAccessMenuComponent,
    }
})
export default class ImprimirPOComponent extends Vue {
    nameComponent: string = 'imprimir-po';
    sizeScreen: string = (window.innerHeight - 420).toString();//'0';
    sizeScreenwidth: string = (window.innerWidth - 288).toString();//'0';
    textTitle:string;
    codigoCompania:any;
    descripcionCompania:any;
    options = {  day: '2-digit',month: '2-digit', year: 'numeric' };
    valuem:number=0;
    textosave:string='';
    clickColumn:string='';
    txtbuscar:string='';
    Column:string='';
    vifprogress:boolean=false;
    issave:boolean=false;
    iserror:boolean=false;
    blnilterstrPO_NO:boolean=false;
    blnilterstrRequis_NO:boolean=false;
    blnilterstrPO_Desc:boolean=false;
    blnilterstrVendor_Desc:boolean=false;
    blnilterdtmProcess_Date:boolean=false;
    blnilterfltTotal_Val:boolean=false;
    //**[ORDEN COMPRA] */
    public OrdenCompra: Array<OrdenCompraModel>;
    tableData:OrdenCompraDetalleModel[];
    tableData1:OrdenCompraDetalleModel[];
    public proveedor:ProveedorModel=new ProveedorModel();
    public opSelect: OrdenCompraModel=new OrdenCompraModel();
    constructor() {
        super();
        Global.nameComponent = 'imprimir-po';           
        setTimeout(() => {
            this.loadPO();
        }, 200)
    }
   loadPO(){
    this.codigoCompania=localStorage.getItem('compania_cod');
    this.descripcionCompania=localStorage.getItem('compania_name');
    this.textTitle='Visualizar'
    ordencompraService.GetOCView(this.codigoCompania)
    .then(resp=>{
        this.OrdenCompra=[];
        this.OrdenCompra=resp;
    })
   }
   handleCurrentChange(val:OrdenCompraModel){
    this.opSelect=val;   
    proveedorService.getProveedorOne(this.opSelect.strVendor_NO)
    .then(response=>{
      this.proveedor=response;
    })
    ordencompraService.getPODetalleId(this.opSelect.intIdPOH_ID)
    .then(resp=>{
      this.tableData=[];
      this.tableData1=[];
      this.tableData=resp;
      this.tableData1=resp;
    })
   }
   getDateString(fecha:any){
    var dateString = new Date(fecha);
    var dia = dateString.getDate();
        var mes = (dateString.getMonth()<12) ? dateString.getMonth()+1 : mes = dateString.getMonth();
        var yyyy = dateString.getFullYear();
        var dd = (dia<10) ? '0'+dia : dd=dia;
        var mm = (mes<10) ? '0'+mes : mm=mes;
        return dd+'.'+mm+'.'+yyyy;
    }
    async validarView(){
      this.warningMessage('Accion no permitida. ');
      }
      validad(){
        this.warningMessage('Accion no permitida. ');
      }
      warningMessage(newMsg : string) {
        this.$message({
          showClose: true,
          message: newMsg,
          type: 'warning'
        });
      }
      Limpiar(){

      }
      Buscar(){

      }
    headerclick(val){    
        this.Column=val.label;
        Global.setColumna(this.Column);
        if(val.property=="strPO_NO"){
            this.clickColumn="strPO_NO";
            this.blnilterstrPO_NO=true;
            this.blnilterstrRequis_NO=false;
            this.blnilterstrPO_Desc=false;
            this.blnilterstrVendor_Desc=false;
            this.blnilterdtmProcess_Date=false;
            this.blnilterfltTotal_Val=false;
        }
        if(val.property=="strRequis_NO"){
            this.clickColumn="strRequis_NO";
            this.blnilterstrPO_NO=false;
            this.blnilterstrRequis_NO=true;
            this.blnilterstrPO_Desc=false;
            this.blnilterstrVendor_Desc=false;
            this.blnilterdtmProcess_Date=false;
            this.blnilterfltTotal_Val=false;
        }
        if(val.property=="strPO_Desc"){
            this.clickColumn="strPO_Desc";
            this.blnilterstrPO_NO=false;
            this.blnilterstrRequis_NO=false;
            this.blnilterstrPO_Desc=true;
            this.blnilterstrVendor_Desc=false;
            this.blnilterdtmProcess_Date=false;
            this.blnilterfltTotal_Val=false;
        }
        if(val.property=="strVendor_Desc"){
            this.clickColumn="strVendor_Desc";
            this.blnilterstrPO_NO=false;
            this.blnilterstrRequis_NO=false;
            this.blnilterstrPO_Desc=false;
            this.blnilterstrVendor_Desc=true;
            this.blnilterdtmProcess_Date=false;
            this.blnilterfltTotal_Val=false;
        }
        if(val.property=="dtmProcess_Date"){
            this.clickColumn="dtmProcess_Date";
            this.blnilterstrPO_NO=false;
            this.blnilterstrRequis_NO=false;
            this.blnilterstrPO_Desc=false;
            this.blnilterstrVendor_Desc=false;
            this.blnilterdtmProcess_Date=true;
            this.blnilterfltTotal_Val=false;
        }
        if(val.property=="fltTotal_Val"){
            this.clickColumn="fltTotal_Val";
            this.blnilterstrPO_NO=false;
            this.blnilterstrRequis_NO=false;
            this.blnilterstrPO_Desc=false;
            this.blnilterstrVendor_Desc=false;
            this.blnilterdtmProcess_Date=false;
            this.blnilterfltTotal_Val=true;
        }
    }
    filterstrPO_NO(h,{column,$index}){
        if(this.blnilterstrPO_NO){
          return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
          [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
            , column.label)])
        }
        else{
          return h('span',{style: 'padding-left: 5px;'}, column.label);
        } 
      }
      filterstrRequis_NO(h,{column,$index}){
        
        if(this.blnilterstrRequis_NO){
          return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
          [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
            , column.label)])
        }
        else{
          return h('span',{style: 'padding-left: 5px;'}, column.label);
        } 
      }
      filterstrPO_Desc(h,{column,$index}){
        
        if(this.blnilterstrPO_Desc){
          return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
          [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
            , column.label)])
        }
        else{
          return h('span',{style: 'padding-left: 5px;'}, column.label);
        } 
      }
      filterstrVendor_Desc(h,{column,$index}){
        if(this.blnilterstrVendor_Desc){
          return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
          [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
            , column.label)])
        }
        else{
          return h('span',{style: 'padding-left: 5px;'}, column.label);
        } 
      }
      filterdtmProcess_Date(h,{column,$index}){
        
        if(this.blnilterdtmProcess_Date){
          return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
          [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
            , column.label)])
        }
        else{
          return h('span',{style: 'padding-left: 5px;'}, column.label);
        } 
      }
      filterfltTotal_Val(h,{column,$index}){
        
        if(this.blnilterfltTotal_Val){
          return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
          [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
            , column.label)])
        }
        else{
          return h('span',{style: 'padding-left: 5px;'}, column.label);
        } 
      }

    backPage(){
        window.history.back();
      }
      reloadpage(){
        window.location.reload();
      }
      guardarTodo(){
        this.$message({
          showClose: true,
          message: 'Accion no permitida',
          type: 'warning'
        });
      }
      ExportarPDF(){
        if(this.opSelect.strPO_NO!=undefined){
          let doc = new jsPDF();
          doc.page = 1; 
          var totalPages = 5; 
          // HEADER
          var dateString = new Date();
          var dia = dateString.getDate();
          var mes = (dateString.getMonth()<12) ? dateString.getMonth()+1 : mes = dateString.getMonth();
          var yyyy = dateString.getFullYear();
          var dd = (dia<10) ? '0'+dia : dd=dia;
          var mm = (mes<10) ? '0'+mes : mm=mes;
          var anio=new Date().getFullYear();
          var altura=doc.internal.pageSize.height;
          var ancho=doc.internal.pageSize.width; 
          // doc.setFontSize(14);
          doc.setFontSize(20);
          doc.setFontStyle('bold');
            doc.text("ORDEN DE COMPRA", 8, 20);
            doc.setFontSize(12);
            doc.text(this.codigoCompania+"  "+this.descripcionCompania, 8, 26);
            doc.setFontSize(10);
            doc.text("Orden de Compra:  ", 8, 31);
            doc.text("Fecha:  ", 8, 36);
            doc.setFontSize(10);
            doc.setFontStyle('normal');
            doc.text(this.opSelect.strPO_NO,40,31)
            doc.text(dd+'.'+mm+'.'+anio,20,36)
          doc.setFontSize(10);
          doc.setTextColor(40);
          doc.setFontStyle('bold');
          //figura 1
          doc.line(8, 38, ancho/2-1, 38);
          doc.line(8, 38, 8, 63);
          doc.line(8, 63, ancho/2-1, 63);
          doc.line(ancho/2-1, 38, ancho/2-1, 63);
          doc.text("Codigo de Proveedor: ", 10, 43);        
          doc.text("Datos: ", 10, 48);              
          doc.text("ATT: ", 10, 62);    
          //[TEXTO 1 INPUT]   FIGURA 1
          doc.setFontStyle('normal');
          doc.text(this.proveedor.strVendor_NO, 50, 43);        
          doc.text(this.proveedor.strVendor_Desc+" "+this.proveedor.strLastName+" "+this.proveedor.strSurName, 25, 48);        
          doc.text(this.proveedor.strAddress, 25, 53);        
          doc.text(this.proveedor.strCountry+" "+this.proveedor.strProvince, 25, 58);        
          doc.text(localStorage.getItem('User_Usuario'), 25, 62);   
          //[TEXTO 1 INPUT]  FIGUR 2
          doc.text("Camilo Espinoza", ancho/2+43,43 );  
          //[TEXTO 1 INPUT]  FIGURA 3
          doc.text("RANSA COMERCIAL CALLAO ", 35, 70);        
          doc.text("AVENIDA NESTOR GAMBETTA KM 11.5", 30, 75);        
          doc.text("CALLAO-CALLAO", 30, 80);        
          doc.text("+51990314239 ", 30, 85);        
          doc.text("+51990314239 ", 30, 90);        
          doc.text("+51990314239 ", 30, 95);        
          doc.text("mineria@ransa.net", 30, 100);        
          doc.text("Observaciones sobre la empresa ", 10, 110); 
          //[TEXTO 1 INPUT]  FIGURA 4
          doc.text(this.proveedor.intDayToPay+" Días Fecha de Vencimiento ", ancho/2+35, 75);        
          doc.text(this.proveedor.strCurrency_Cod, ancho/2+30, 80);
          //[TEXTO 1 INPUT]  FIGURA 5
          doc.text("apqueries@mmg.com", ancho/2+3, 114);
          doc.setFontSize(8);
          doc.text(this.descripcionCompania, ancho/2+3, 99); 
          doc.text("AV. EL DERBY 055,TORRE 3 PISO 09,SANTIAGO DE SURCO,LIMA", ancho/2+3, 104); 
          doc.setFontSize(10);
          doc.setFontStyle('bold');
            //figura 2
          doc.line(ancho/2+1, 38, ancho-8, 38);
          doc.line(ancho/2+1, 38, ancho/2+1, 63);
          doc.line(ancho/2+1, 63, ancho-8, 63);
          doc.line(ancho-8, 38, ancho-8, 63);
          doc.text("Contacto en Compras:", ancho/2+3,43 );        
          doc.text("E: ", ancho/2+3, 48);        
          doc.text("T: ", ancho/2+3, 53);
          doc.text("F: ", ancho/2+3, 58);
          //figura 3
          doc.line(8, 65, ancho/2-1, 65);
          doc.line(8, 65, 8, 115);
          doc.line(8, 115, ancho/2-1, 115);
          doc.line(ancho/2-1, 65, ancho/2-1, 115);
          doc.text("Direccion de ", 10, 70);        
          doc.text("Entregas: ", 10, 75);        
          doc.text("Teléfono: ", 10, 85);        
          doc.text("Celular: ", 10, 90);        
          doc.text("Fax: ", 10, 95);        
          doc.text("Email: ", 10, 100);        
          doc.text("Observaciones: ", 10, 105);        
            //figura 4
          doc.line(ancho/2+1, 65, ancho-8, 65);
          doc.line(ancho/2+1, 65, ancho/2+1, 82);
          doc.line(ancho/2+1, 82, ancho-8, 82);
          doc.line(ancho-8, 65, ancho-8, 82);
          doc.text("Incoterms:", ancho/2+3,70 );        
          doc.text("Términos de Pago: ", ancho/2+3, 75);        
          doc.text("Moneda: ", ancho/2+3, 80);
          //figura 5
          doc.line(ancho/2+1, 84, ancho-8, 84);
          doc.line(ancho/2+1, 84, ancho/2+1, 115);
          doc.line(ancho/2+1, 115, ancho-8, 115);
          doc.line(ancho-8, 84, ancho-8, 115);
          doc.setFontSize(9);
          doc.text("Las facturas deben hacer referencia a una orden de compra:", ancho/2+3,94);        
          doc.text("válida y relevante. Direccion de Facturacion: ", ancho/2+3, 89);        
          doc.text("Para consultas financiero-contables contactar: ", ancho/2+3, 109);
          doc.setFontSize(10);
          let columns = [
            {title:"Nro Item",dataKey:"intPO_Item_NO"},
            {title:"Descripcion",dataKey:"strPO_Item_Desc"},
            {title:"Cantidad",dataKey:"fltPO_QTY_I"},
            {title:"UM",dataKey:"strUM_Cod"},
            {title:"Valor Unitario (Sin IGV)",dataKey:"fltPO_Net_PR_I"},
            {title:"Fecha de Entrega",dataKey:"dmModified_Date"},
            {title:"Ind. Imp.",dataKey:"strCategItem_Cod"},
            {title:"Valor Total (Sin IGV)",dataKey:"fltCurr_Net_PR_P"},
          ];
          doc.autoTable(columns, this.tableData1,{
            theme: 'striped',
            startY: 120,
            startX: 10,
            margin: 10,
            headerStyles: {
              fillColor: [215, 215, 215],
              textColor: "#000000",
              fontSize:7,
              lineWidth: 0.1,
              lineColor:"#b3b3b3", 
              fontStyle: 'bold',
              halign: 'center', 
            },  
            bodyStyles:{
              textColor: "#000000",
              fontSize:7,  
              lineWidth: 0.1,
              fontStyle: 'normal',
              lineColor:"#b3b3b3", 
            },
              columnStyles: {
                intPO_Item_NO:{columnWidth: 10},
                strPO_Item_Desc: {columnWidth: 40},
                fltPO_QTY_I: {columnWidth: 20},
                strUM_Cod: {columnWidth: 10},
                fltPO_Net_PR_I: {columnWidth: 20},
                dmModified_Date: {columnWidth: 20},
                strCategItem_Cod: {columnWidth: 10},
                fltCurr_Net_PR_P: {columnWidth: 20},
              },
            });
          doc.setFontSize(10);
          var finalY=doc.autoTable.previous.finalY;
          doc.line(ancho*(3/4)-1, finalY, ancho-10, finalY);
          doc.line(ancho*(3/4)-1,finalY, ancho*(3/4)-1, finalY+10);
          doc.line(ancho*(3/4)-1, finalY+10, ancho-10, finalY+10);
          doc.line(ancho-10, finalY, ancho-10, finalY+10);

          doc.text("Total: ", ancho*(3/4), finalY + 5);
          doc.text(this.opSelect.fltTotal_Val, ancho-30, finalY + 5); 
          for(var i=0;i<totalPages;i++){            
            doc.setFontSize(10);
            var imgData = 'data:image/jpeg;base64,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';
            doc.addImage(imgData, 'jpeg', (ancho*3/4)+15, 5, 30, 15);
            doc.setFontStyle('bold');
            doc.setFontSize(8);
            var str = "Página " + doc.page  + " de " +  totalPages;
            doc.text(str, ancho-25, altura - 5);
            doc.page ++;
            var totales=doc.page-1;
            if(totales<totalPages){
              doc.addPage();
            }           
            if(doc.page==2){
              doc.setFontSize(15);
              doc.setFontStyle('bold');
              doc.text(this.descripcionCompania,(ancho/2)-30,18);
              doc.setLineWidth(0.5); 
              doc.setDrawColor(0, 0, 0);
              doc.line(10, 25, ancho-10, 25);
              doc.setFontSize(13);
              doc.text("ORDEN DE SERVICIO NRO. "+this.opSelect.strPO_NO,(ancho/2)-40,30);
              doc.setFontSize(10);
              doc.text("Version :",10,35);
              doc.text("Fecha Orden : ",10,40);
              doc.text("Tipo de Orden: ",ancho/2,35);
              doc.text("Términos de Pago : ",ancho/2,40);
              doc.setFontStyle('normal');
              doc.text("0001",40,35);
              doc.text(this.getDateString(this.opSelect.dtmProcess_Date),40,40);
              doc.text(this.opSelect.strTipReq_Desc,(ancho/2)+40,35);
              doc.text(this.proveedor.intDayToPay+" Días",(ancho/2)+40,40);
              doc.setLineWidth(0.3); 
              doc.line(10, 42, ancho-10, 42);
              doc.setFontStyle('bold');
              doc.text("Términos y Condiciones de la Orden de Compra (O/C) - "+this.opSelect.strTipReq_Desc,(ancho/4),47)
              doc.line(10, 49, ancho-10, 49);
              //texto TERMINOS Y CONDIGCIONES pagina 2 A
              doc.setFontSize(7);
              doc.text("1. DEFINICIONES ",10,54);
              doc.setFontStyle('normal');
              doc.text("En el presente Contrato: ",10,58);
              doc.setFontStyle('bold');
              doc.text("Contrato",10,62);
              doc.setFontStyle('normal');
              doc.text("significa los términos y condiciones incluidos en el presente documento ",21,62);
              doc.text("y la O/C (incluyendo cualquier condicion especial de la O/C y cualquier anexo o ",10,66);
              doc.text("listado).  ",10,70);
              doc.setFontStyle('bold');
              doc.text("Crédito Fiscal del IVF/IVA",10,74);
              doc.setFontStyle('normal');
              doc.text("significa un crédito que un contribuyente tiene",41,74);
              doc.text("derecho a reclamar para compensar su obligacion de pagar el IVF/IVA, de",10,78);
              doc.text("acuerdo con la Ley del IVF/IVA pertinente de la jurisdiccion aplicable.",10,82);
              doc.setFontStyle('bold');
              doc.text("Disposiciones Legislativas",10,86);
              doc.setFontStyle('normal');
              doc.text(" incluye cualquier:",42,86);
              doc.text("(a) ley, ordenanza, reglamento, orden, fallo y proclamacion nacional,",20,90);
              doc.text("(regional, municipal o local, o cualquier ley emitida por cualquier",30,94);
              doc.text("autoridad competente; y ",30,98);
              doc.text("(b) certificado, licencia, consentimiento, permiso, aprobacion y requisito de ",20,102);
              doc.text("organizaciones que tengan jurisdiccion con relacion a la prestacion ",30,106);
              doc.text("de los Servicios.  ",30,110);
              doc.setFontStyle('bold');
              doc.text("Evento de Incumplimiento del Contratista",10,114);
              doc.setFontStyle('normal');
              doc.text("significa cada uno de los siguientes",(ancho/4)+ 8,114);
              doc.text("supuestos: ",10,118);
              doc.text("(a) Incumplimiento del Contratista con ejecutar los Servicios de",20,122);
              doc.text("conformidad con el presente Contrato, incluyendo la provision de ",30,126);
              doc.text("Servicios defectuosos;",30,130);
              doc.text("(b) Que cualquier declaracion o garantía otorgada por el Contratista en",20,134);
              doc.text("virtud de la cláusula 12 carezca de veracidad o sea engañosa en ",30,138);
              doc.text("cualquier aspecto significativo; y  ",30,142);
              doc.text("(c) que el Contratista incumpla cualquiera de sus obligaciones en virtud del ",20,146);
              doc.text("presente Contrato.  ",20,150);
            } 
          }
          
          doc.save("Orden Compra_"+this.opSelect.strPO_NO+".pdf");
        }
        else{
          this.$message({
            showClose: true,
            message: 'Seleccione Orden Compra',
            type: 'warning'
          });
        }
      }
    data() {
        return {
            nameComponent: 'crear-po',
            tableData:[],
            tableData1:[],
            textTitle:'',
            OrdenCompra:[],
            codigoCompania:'',
            descripcionCompania:''
        }
    }
}
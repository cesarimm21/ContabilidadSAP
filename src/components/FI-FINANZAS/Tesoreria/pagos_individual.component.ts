import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';

import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import ButtonsAccionsComponent from '@/components/buttonsAccions/buttonsAccions.vue';
import BMonedaComponent from '@/components/buscadores/b_moneda/b_moneda.vue';
import BProveedorComponent from '@/components/buscadores/b_proveedor/b_proveedor.vue';
import BBancoComponent from '@/components/buscadores/b_banco/b_banco.vue';
import {PagosModel} from '@/modelo/maestro/Pagos';
import {PagosDetelleModel} from '@/modelo/maestro/pagosDetalle';
import {MonedaModel} from '@/modelo/maestro/moneda'
import {BancoModel} from '@/modelo/maestro/banco';
import {PeriodoModel} from '@/modelo/maestro/periodo';
import {ProveedorModel} from '@/modelo/maestro/proveedor';
import {FacturaModel} from '@/modelo/maestro/factura';
import {MedioPagoModel} from '@/modelo/maestro/medioPago';
import MonedaService from '@/components/service/moneda.service'
import RunPagosService from '@/components/service/runpagos.service';
import mediopagoService from '@/components/service/mediopago.service';
import FacturaService from '@/components/service/factura.service'
import periodoService from '@/components/service/periodo.service';
import bancoService from '@/components/service/banco.service';
import { Loading } from 'element-ui';
import jsPDF from 'jspdf'
import 'jspdf-autotable';
import Global from '@/Global';
import proveedorService from '@/components/service/proveedor.service';
import documentsService from '@/components/service/documents.service';
@Component({
    name: 'pagos-individual',
    components: { 
    'quickaccessmenu':QuickAccessMenuComponent,
    'bmoneda':BMonedaComponent,
    'bbanco':BBancoComponent,
    'bproveedor':BProveedorComponent,
    'buttons-accions':ButtonsAccionsComponent,
}
})
export default class PagosIndividualesComponent extends Vue {
    sizeScreen:string = (window.innerHeight - 420).toString();//'0';
    sizeScreenwidth:string = (window.innerWidth-288 ).toString();//'0';
    // public compania:CompaniaModel=new CompaniaModel();
    public pago:PagosModel=new PagosModel();
    public pagodetalle:PagosDetelleModel=new PagosDetelleModel();
    fecha_ejecucion:string='';
    fecha_ejecucion1:string='';
    CodigoGen:string;
    DateContabilizacion:any;
    DocIngresados:any;
    DocDeudores:any;
    dialogVisible:boolean=false;
    VisibleBanco:boolean=false;
    VisibleProveedor:boolean=false;
    btnactivarmoneda:boolean=false;
    btnactivarbanco:boolean=false;
    gridPago:any[];
    gridBanco:any[];
    gridProveedor:ProveedorModel[];
    gridProData:any[];
    multipleSelection: any[];
    gridFactura:FacturaModel[];
    gridFactura1:FacturaModel[];
    gridFactura2:FacturaModel[];
    issave:boolean=false;
    iserror:boolean=false;
    textosave='';
    //**Moneda */
    public moneySelect:MonedaModel=new MonedaModel();
    public bancoSelect:BancoModel=new BancoModel();
    public periodo:PeriodoModel=new PeriodoModel();
    gridMedioPago:MedioPagoModel[];
    public mediopago:MedioPagoModel=new MedioPagoModel();
    codigoCompania:any;
    descripcionCompania:any;
    fechaHasta:any=new Date();
    public proselect:ProveedorModel=new ProveedorModel();
    public provee:ProveedorModel=new ProveedorModel();
    public tableData:any=[]; 

    clickColumn:string='';
    editing:any= {
      row:'',
      column:''
    };
    Column:string='';
    inputAtributo:any;
    blnilterstrBank_Cod:boolean=true;
    blnilterstrBank_Name:boolean=false;
    public bancoSearch:BancoModel=new BancoModel();

    dialogMediopago:boolean=false;
    btnactivarmediopago:boolean=false;
    tempro:string='';
    constructor(){                
        super();
        Global.nameComponent = 'pagos-individual';        
        setTimeout(() => {
            this.DateSelected();
          }, 200)
        
    }
    DateSelected(){ 
        this.fecha_ejecucion = (new Date()).toString();
        this.fecha_ejecucion1 = (new Date()).toString();
        this.DateContabilizacion=(new Date()).toString();
        this.codigoCompania=localStorage.getItem('compania_cod');
        this.descripcionCompania=localStorage.getItem('compania_name');
        this.moneySelect.strCurrency_Cod='0';
        this.loadCodigo(); 
        this.loadPeriodo();
        this.loadmediopago();
        this.LoadBanco();
        this.loadProveedor();
        // this.DateContabilizacionClick();
    }
    loadProveedor(){
      proveedorService.GetProveedoresCompany(this.codigoCompania)
      .then(respo=>{
        this.gridProData=[];
        this.gridProData=respo;
      })
    }
    loadPeriodo(){
        periodoService.GetAllPeriodoLast()
        .then(response=>{  
            this.periodo=response;
        })
    }

    //#region [MEDIO PAGO]
    viewMedioPago(){
      this.dialogMediopago=true;
    }
    loadmediopago(){
        mediopagoService.GetMedioPago()
        .then(response=>{
          this.gridMedioPago=[];
          this.gridMedioPago=response;
            // this.mediopago=response[0];
        })
    }
    handleMedioPago(val){
      this.mediopago=val;
    }
    SelectMedioPago(val){
      this.pago.intIdPayWay_ID=this.mediopago.intIdPayWay_ID;
      this.pago.strPayWay_Cod=this.mediopago.strPayWay_Cod;
      this.dialogMediopago=false;
    }
    closeMedioPago(){
      this.dialogMediopago=false;
    }
    desactivar_mediopago(){
      if(this.dialogMediopago){
        this.btnactivarmediopago=false;
      }
    }
    activar_mediopago(){
        setTimeout(() => {
          this.btnactivarmoneda=false;
          this.btnactivarbanco=false;
          this.btnactivarmediopago=true;
      }, 120)
    }
    //#endregion

    loadCodigo(){
        this.CodigoGen=this.getDateString(this.fecha_ejecucion);
        // var selectedValue=this.fecha_ejecucion.split('-');
        // var anioSelected=selectedValue[0];
        // this.CodigoGen=selectedValue[2]+''+selectedValue[1]+''+anioSelected[2]+''+anioSelected[3];
        if(this.pago.strPayRun_Curr!=''){
            this.runPagosGet(this.CodigoGen)
        }
    }
    getDateString(fecha:string){
        var dateString = new Date(fecha);
        var dia = dateString.getDate();
            var mes = (dateString.getMonth()<12) ? dateString.getMonth()+1 : mes = dateString.getMonth();
            var yyyy = dateString.getFullYear();
            var dd = (dia<10) ? '0'+dia : dd=dia;
            var mm = (mes<10) ? '0'+mes : mm=mes;
            return dd+mm+yyyy;
    }
    getDateStringView(fecha:string){
        var dateString = new Date(fecha);
        var dia = dateString.getDate();
            var mes = (dateString.getMonth()<12) ? dateString.getMonth()+1 : mes = dateString.getMonth();
            var yyyy = dateString.getFullYear();
            var dd = (dia<10) ? '0'+dia : dd=dia;
            var mm = (mes<10) ? '0'+mes : mm=mes;
            return dd+'.'+mm+'.'+yyyy;
        }
    DateContabilizacionClick(){         
        this.DocIngresados=Global.getParseDate(this.DateContabilizacion);
        
        this.DocDeudores=Global.getParseDate(this.DateContabilizacion);
        this.pago.dtmPayRun_Date=this.DocIngresados;
        
        this.gridFactura=[];
        this.gridFactura1=[];
        this.gridFactura2=[];
        FacturaService.GetFacturaDate(this.pago.dtmPayRun_Date,this.moneySelect.strCurrency_Cod)
        .then(res=>{            
            this.gridFactura=res;
            this.gridFactura1=res;
            this.gridFactura2=res;
            
        })
    }

    Filtro(){
        var data=this.like(this.gridFactura1,'strCurrency_Doc',this.moneySelect.strCurrency_Cod)
        this.gridFactura=[];
        this.gridFactura2=[];
        this.gridFactura2=data;
        this.gridFactura=data;
      }
      Filtro1(){
        this.gridFactura=[];
        this.gridProveedor.forEach(element => {
          var data=this.like(this.gridFactura2,'strVendor_NO',element.strVendor_NO)          
          this.gridFactura=this.gridFactura.concat(data);
        });
       
      }
      like(array, key,keyword) {
    
        var responsearr:any = []
        for(var i=0;i<array.length;i++) {
            if(array[i][key].toString().indexOf(keyword) > -1 ) {
              responsearr.push(array[i])
          }
        }
        return responsearr
      }

    viewMoneda(){
        this.dialogVisible=true; 
    }
    closeMoneda(){
        this.dialogVisible=false;
    }
    SeleccionadoMoneda(val){
        this.moneySelect=val;
        this.pago.strPayRun_Curr=this.moneySelect.strCurrency_Cod;
        this.pago.strPayRun_Curr_Desc=this.moneySelect.strCurrency_Desc;
        this.dialogVisible=false;
        this.runPagosGet(this.CodigoGen);
        this.Filtro();
        
    }
    proveDelete(val){
      this.tempro=val.strVendor_NO;      
    }
    deleteRow(index, rows) {
        rows.splice(index, 1);  
        if(this.gridProveedor.length==0){
          this.gridFactura=this.gridFactura1;
        }
        else{
          this.gridFactura=[];
          this.gridProveedor.forEach(element => {
          var data=this.like(this.gridFactura1,'strVendor_NO',element.strVendor_NO)          
          this.gridFactura=this.gridFactura.concat(data);
        });
        }

      }
    handleCurrentChange(val){
      this.bancoSelect=val;
    }
    SeleccionadoBanco(val){        
        this.pago.strBank_Cod=this.bancoSelect.strBank_Cod;
        this.pago.strBank_Name=this.bancoSelect.strBank_Name;
        // this.pago.
        this.VisibleBanco=false;
    }
    desactivar_moneda(){
        if(this.dialogVisible){
          this.btnactivarmoneda=false;
        }
      }  
      activar_moneda(){
        setTimeout(() => {
            this.btnactivarmoneda=true;
            this.btnactivarbanco=false;
        }, 120)
      }
      //#region [BANCO]
    LoadBanco(){
      bancoService.GetAllBancoType()
      .then(response=>{
        this.gridBanco=[];
        this.gridBanco=response;
      })
    }
    desactivar_banco(){
        if(this.VisibleBanco){
          this.btnactivarmoneda=false;
        }
      }  
      activar_banco(){
        setTimeout(() => {
            this.btnactivarmoneda=false;
            this.btnactivarbanco=true;
        }, 120)
      }
    viewBanco(){
        this.VisibleBanco=true;
    }
    closeBanco(){
        this.VisibleBanco=false;
    }
    bancoChosseCheck(){
        this.VisibleBanco=false;
    }
    searchBanco(){
      if(this.clickColumn=="strBank_Cod"){  this.bancoSearch.strBank_Cod=this.inputAtributo; }
      if(this.clickColumn=="strBank_Name"){  
        this.bancoSearch.strBank_Name=this.inputAtributo; }
      bancoService.searchBanco(this.bancoSearch)
      .then(resp=>{
        this.gridBanco=[];  
        this.gridBanco=resp;     
      })
  
    }
    headerclick(val){
      this.Column=val.label;
      if(val.property=="strBank_Cod"){
        this.clickColumn=val.property;  
        this.bancoSearch=new BancoModel();  
        this.inputAtributo='';  
        this.blnilterstrBank_Cod=true;
        this.blnilterstrBank_Name=false;
      }
      if(val.property=="strBank_Name"){
        this.clickColumn=val.property;
        this.bancoSearch=new BancoModel();
        this.inputAtributo='';
        this.blnilterstrBank_Cod=false;
        this.blnilterstrBank_Name=true;
      }
    }
    filterstrBank_Cod(h,{column,$index}){
      var column1 = column.label; 
      if(this.blnilterstrBank_Cod){
        this.Column=column1;
        this.clickColumn=column.property;
        this.bancoSearch=new BancoModel();
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
    filterstrBank_Name(h,{column,$index}){
      
      if(this.blnilterstrBank_Name){
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
    //#endregion
    //#region [PROVEEDOR]
    SeleccionadoProveedor(val){
        this.proselect=val;
        this.gridProveedor.push(this.proselect);
        this.Filtro1();
        this.VisibleProveedor=false;
    }
    closeProveedor(){
        this.VisibleProveedor=false;
    }
    viewProveedor(){
        this.VisibleProveedor=true;
    }
    //#endregion

    //#region [ACCION TABLE]
    handleSelectionChange(val){
        this.multipleSelection = val;
    }
    guardarRun(){
        this.pago.intIdPayRun_Period=this.periodo.intIdPayRun_Period;
        this.pago.strPeriod_NO=this.periodo.strPeriod_NO;
        this.pago.dtmPeriod=this.periodo.dtmPeriod;
        
        this.pago.fltAmount_Total=0;
        this.pago.strPayRun_Status='00';
        // this.ExportarPDF();
        if(this.multipleSelection.length>0){
            for(var i=0;i<this.multipleSelection.length;i++){
                this.pago.fltAmount_Total+=Number(this.multipleSelection[i].fltNetValue_Doc_Local)
                
            }
            this.pago.listaDetalle=this.multipleSelection;
            let loadingInstance = Loading.service({
                fullscreen: true,
                text: 'Guargando...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.8)'
            }
            );
            RunPagosService.CreateRunPagos(this.pago) 
            .then(response=>{
                setTimeout(() => {
                    this.DateSelected();
                  }, 200)
                this.issave = true;
                this.iserror = false;
                this.fecha_ejecucion = (new Date()).toString();
                this.fecha_ejecucion1 = (new Date()).toString();
                this.DateContabilizacion=(new Date()).toString();
                this.pago=new PagosModel();
                this.mediopago=new MedioPagoModel();
                this.bancoSelect=new BancoModel();
                this.DocIngresados=Global.getParseDate(this.DateContabilizacion);        
                this.DocDeudores=Global.getParseDate(this.DateContabilizacion);
                this.openMessageSuccess('Se guardo correctamente '+response);
                this.textosave = 'Se guardo correctamente. '+response;
                this.ExportarPDF(response);
                loadingInstance.close();
                this.DateContabilizacionClick();
                

            }) 
            .catch(response=>{
                loadingInstance.close();
                this.issave = false;
                this.iserror = true;
                this.textosave = 'Error al guardar.';
                this.openMessageError('Error al guardar.');
            })      

        }
        else{
            this.$message({
                showClose: true,
                type: 'warning',
                message: 'Debe seleccionar al menos un documento'
              });
        }
    }

    //#endregion
    //#region [REPORTE]
    returnProveedor(strVendor_NO){
      proveedorService.GetOnlyOneProveedor(strVendor_NO)
      .then(respo=>{
        this.provee=respo;
        }).catch();
    }
    ExportarPDF(codigo){

        let doc = new jsPDF('landscape');
        let marginleft=20;
        let comienzo=30;
        doc.setFontSize(10);
        doc.setFontStyle('bold');
        var dateString = new Date();
        var dia = dateString.getDate();
        var mes = (dateString.getMonth()<12) ? dateString.getMonth()+1 : mes = dateString.getMonth();
        var yyyy = dateString.getFullYear();
        var dd = (dia<10) ? '0'+dia : dd=dia;
        var mm = (mes<10) ? '0'+mes : mm=mes;
        var dia=new Date().getDay();
        var anio=new Date().getFullYear();
        var hour=new Date().getHours();
        var hh = (hour<10) ? '0'+hour : hh=hour;
        var minute=new Date().getMinutes();
        var min = (minute<10) ? '0'+minute : min=minute;
        var second=new Date().getSeconds();
        var ss = (second<10) ? '0'+second : ss=second;
        let pageInfo = doc.internal.getCurrentPageInfo();
        var tamW=doc.internal.pageSize.width;                 
        var tam=doc.internal.pageSize.height;
        var mitad=tam/2;
        doc.text(20, 10, this.descripcionCompania+'  Payment settlement list for payment run  '+this.pago.strPayRun_NO+'  '+dd+'.'+mm+'.'+anio+' / '+hh+':'+min+':'+ss);
        doc.text(20, 15, 'AREQUIPA ');
        doc.text(tamW/2, 15,'Usuario: '+ localStorage.getItem('User_Usuario'));
        doc.text(20, 20, 'Codigo Compañia - '+this.codigoCompania);           
        doc.text(tamW/2, 20, 'Pagina: '+pageInfo.pageNumber); 
        doc.setLineDash([3, 3, 1, 3], 10);
        doc.setLineWidth(0.2);
        doc.line(20, 25, tamW-20, 25)
        this.multipleSelection.forEach(element => {
          var data=this.like(this.gridProData,'strVendor_NO',element.strVendor_NO)
          var provedata=data[0];            
            doc.text(20,comienzo,'PROVEEDOR: ')//1
            doc.text(45,comienzo,provedata.strVendor_NO)
            doc.text(tamW/2,comienzo,'DETALLE DE BANCO')//2
            doc.text(45,comienzo+5,provedata.strVendor_Desc+' '+provedata.strSurName+' '+provedata.strLastName)
            doc.text(tamW/2,comienzo+5,this.bancoSelect.strBank_Name)
            doc.text(45,comienzo+10,provedata.strAddress)
            doc.text(tamW/2,comienzo+10,'SWIFT CODE: '+this.bancoSelect.strSwift_Cod)
            doc.text(45,comienzo+15,provedata.strProvince)
            doc.text(tamW/2,comienzo+15,'NUMERO BANCO: '+this.bancoSelect.strBank_Cod)
            doc.text(45,comienzo+20,provedata.intIdCountry_ID.strCountry_Name)
            doc.text(tamW/2,comienzo+20,'NUMERO CUENTA: '+this.bancoSelect.strBank_Account )
            doc.setLineDash([3, 3, 1, 3], 10);
            doc.setLineWidth(0.2);
            doc.line(20, comienzo+25, tamW-20, comienzo+25)
            doc.text(45,comienzo+30,codigo)  
            doc.text(tamW/4,comienzo+30,'BBV01')
            doc.text(tamW/4+30,comienzo+30,this.pago.strPayRun_Curr)
            doc.text(tamW/2,comienzo+30,provedata.strVendor_Desc+' '+provedata.strSurName+' '+provedata.strLastName)
            doc.text(tamW/2+100,comienzo+30,provedata.fltValue_Local+'-'+this.pago.strPayRun_Curr)
            let columns = [
            {title:"Compañia ",dataKey:"strCompany_Cod"},
            {title:"NO Voucher",dataKey:"strVoucher_NO"},
            {title:"Tipo Contable",dataKey:"strType_Doc"},
            {title:"Fecha Emisión FT",dataKey:"dtmDue_Date"},
            {title:"Valor por Documento",dataKey:"fltValue_Local"},
            {title:"Retenciones",dataKey:"fltValue_WH_Retention"},
            {title:"Pago total por Documento",dataKey:"fltNetValue_Doc_Local"},
            {title:"Moneda",dataKey:"strCurrency_Doc"},
            {title:"NO de Factura",dataKey:"strDocument_NO"},
            {title:"Codigo del Vendor",dataKey:"strVendor_NO"},
              ];

              doc.autoTable(columns, this.multipleSelection,{
              
              startY: comienzo+40,
              startX: 45,
              margin: 45,
              headerStyles: {
                fillColor: [215, 215, 215],
                textColor: "#d31010",
                fontSize:8,
                lineWidth: 0.1,
                lineColor:"#9fd5d1", 
                fontStyle: 'bold',
                halign: 'center', 
              },  
              bodyStyles:{
                fontSize:7,  
                lineWidth: 0.1,
                lineColor:"#9fd5d1", 
              },
                
              theme: 'striped',
              columnStyles: {
                strCompany_Cod:{columnWidth: 20},
                strVoucher_NO: {columnWidth: 20},
                strType_Doc: {columnWidth: 20},
                dtmDue_Date: {columnWidth: 20},
                fltValue_Local: {columnWidth: 30},
                fltValue_WH_Retention: {columnWidth: 20},
                fltNetValue_Doc_Local: {columnWidth: 30},
                strCurrency_Doc: {columnWidth: 20},
                strDocument_NO:{columnWidth: 30},
                strVendor_NO:{columnWidth: 20},
              },
              drawRow: function (row, data) {
                if (row.index === data.table.rows.length - 1) {
                    doc.setFontStyle('bold');
                }
            },
              });
              doc.setLineDash([3, 3, 1, 3], 10);
              doc.setLineWidth(0.2);
              doc.line(20, comienzo+80, tamW-20, comienzo+80)
        });
        var result:any = this.tableData.reduce(function (r, a) {
          r[a.correlativo] = r[a.correlativo] || [];
          r[a.correlativo].push(a);
          return r;
        }, []);
        var sumdata:any=[{}];
        var dataTotal:any=[{}];
          
          var paragraph="Este documento (incluidas las páginas siguientes) es confidencial, este puede ser leído, copiado y utilizado solamente para fines respectivos.  Si Usted recibe este documento por error, por favor notifíquelo inmediatamente. No comparta su información a ninguna persona y destrúyalo. Muchas gracias. ";
          let columnsf = [
            {title:"Footer",dataKey:"footer"},
          ]
          let row=[
            {
              'footer':paragraph
            }
          ]
         
          
          
          // doc.setLineDash(0, 0);
          // doc.setLineWidth(0.5);
          
          // doc.textColor=250;
          // doc.setDrawColor(0, 0, 0);
          // doc.line(80, mitad-65, 195, mitad-65)
          // doc.line(tamW/2+80, mitad-65, tamW/2+75+130, mitad-65)
          
          // doc.setFontSize(7);
          // doc.text(90, mitad-55, "Nombre y firma de quien recibe");
          // doc.text(tamW/2+90, mitad-55, "Nombre y firma de quien entrega");
        doc.save("Run_Pagos_"+ this.pago.strPayRun_NO+".pdf");    
      }
    //#endregion
    //#region [RUNPAGOS]
    runPagosGet(val){
        RunPagosService.getPagoDataCod(val)
        .then(res=>{
            if(res.strPayRun_NO==undefined){
                this.pago.strPayRun_NO=this.CodigoGen+'-'+1+'-'+this.pago.strPayRun_Curr;
            }
            else{
                var datos=res.strPayRun_NO.split('-');
                if(datos[2]===this.pago.strPayRun_Curr){
                    var contador=Number(datos[1])+1;
                    this.pago.strPayRun_NO=datos[0]+'-'+contador+'-'+this.pago.strPayRun_Curr;
                }
                else{
                    this.pago.strPayRun_NO=this.CodigoGen+'-'+datos[1]+'-'+this.pago.strPayRun_Curr;
                }
            }                    
        }).catch(error=>{
        })
    }
    //#endregion
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
    backPage(){
        window.history.back();
      }
      reloadpage(){
        window.location.reload();
      }
    data(){
        return{
            gridMoney:[],
            tableData:[],
            gridPago:[],
            CodigoGen:'',
            val:'',
            DateContabilizacion:'',
            DocIngresados:'',
            DocDeudores:'',
            gridFactura:[],
            gridFactura1:[],
            gridFactura2:[],
            codigoCompania:'',
            descripcionCompania:'',
            gridProveedor:[],
            multipleSelection:[],
            gridBanco:[],
            inputAtributo:'',
            gridMedioPago:[],
            gridProData:[]
        }
    }
}
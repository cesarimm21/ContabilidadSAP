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
import { Loading } from 'element-ui';
import jsPDF from 'jspdf'
import 'jspdf-autotable';
import Global from '@/Global';
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
    gridProveedor:ProveedorModel[];
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
    public mediopago:MedioPagoModel=new MedioPagoModel();
    codigoCompania:any;
    descripcionCompania:any;
    fechaHasta:any=new Date();
    public proselect:ProveedorModel=new ProveedorModel();
    public tableData:any=[]; 
    constructor(){                
        super();
        Global.nameComponent = 'pagos-individual';        
        setTimeout(() => {
            this.DateSelected();
          }, 200)
        
    }
    DateSelected(){ 
        this.fecha_ejecucion = (new Date()).toString();
        this.DateContabilizacion=(new Date()).toString();
        this.codigoCompania=localStorage.getItem('compania_cod');
        this.descripcionCompania=localStorage.getItem('compania_name');
        this.moneySelect.strCurrency_Cod='0';
        this.loadCodigo(); 
        this.loadPeriodo();
        this.loadmediopago();
        // this.DateContabilizacionClick();
    }
    loadPeriodo(){
        periodoService.GetAllPeriodoLast()
        .then(response=>{
            console.log(response);        
            this.periodo=response;
        })
    }
    loadmediopago(){
        mediopagoService.GetMedioPago()
        .then(response=>{
            this.mediopago=response[0];
        })
    }
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
        var data=this.like(this.gridFactura2,'strVendor_NO',this.proselect.strVendor_NO)
        this.gridFactura=[];
        this.gridFactura=data;
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
        this.runPagosGet(this.CodigoGen);
        this.Filtro();
        this.dialogVisible=false;
    }
    deleteRow(index, rows) {
        rows.splice(index, 1);        
      }
    SeleccionadoBanco(val){
        this.bancoSelect=val;
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
        this.pago.intIdPayWay_ID=this.mediopago.intIdPayWay_ID;
        this.pago.strPayWay_Cod=this.mediopago.strPayWay_Cod;
        this.pago.fltAmount_Total=0;
        this.pago.strPayRun_Status='00';
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
                this.openMessageSuccess('Se guardo correctamente '+response);
                this.textosave = 'Se guardo correctamente. '+response;
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
    ExportarPDF(){
        let doc = new jsPDF('landscape');
        let marginleft=5;
        let comienzo=5;
        doc.setFontSize(13);
        doc.setFontStyle('bold');
        doc.text('RUN PAGOS Reporte '+this.pago.strPayRun_NO, doc.internal.pageSize.width/2, 10, null, null, 'center'); 
        doc.text('RUC - '+this.codigoCompania+' '+this.descripcionCompania, doc.internal.pageSize.width/2, 15, null, null, 'center'); 
        var txt=Global.getNombreMes(Global.getNombreMes(this.fechaHasta.getMonth()+1)+' '+this.fechaHasta.getFullYear());
        doc.text(txt, doc.internal.pageSize.width/2, 20, null, null, 'center'); 
        
         //doc.text('The text', doc.internal.pageSize.width, 50, null, null, 'center');
      //   doc.text(marginleft, comienzo, 
      //   'PER105 SUNAT Formato 5.1 Libro Diario Reporte ');
      //  //20538428524 - Minera Las Bambas S.A.Enero 2017');
        
        var tam=doc.internal.pageSize.height;
        var tamW=doc.internal.pageSize.width;
         
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
          {title:"Número Correlativo del Asiento ó Código unico de la operación",dataKey:"correlativo"},
          {title:"Número correlativo del asiento contable identificado",dataKey:"strReferDocum_NO"},
          {title:"Cuenta Contable Perú",dataKey:"item_strAcc_Local_NO"},
          {title:"Moneda del documento",dataKey:"item_strCurrency_Cod"},
          {title:"Fecha Contabilización",dataKey:"item_dtmPosting_Date"},
          {title:"Fecha de Registro",dataKey:"item_dtmDoc_Date"},
          {title:"Glosa o Descripción de la Operación",dataKey:"item_strDaily_Desc"},
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
          
          var paragraph="Este documento (incluidas las páginas siguientes) es confidencial, este puede ser leído, copiado y utilizado solamente para fines respectivos.  Si Usted recibe este documento por error, por favor notifíquelo inmediatamente. No comparta su información a ninguna persona y destrúyalo. Muchas gracias. ";
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
        }
    }
}
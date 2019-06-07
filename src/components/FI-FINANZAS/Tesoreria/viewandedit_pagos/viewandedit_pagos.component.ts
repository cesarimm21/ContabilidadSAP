import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import  ElTable from 'src/types/table'
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import ButtonsAccionsComponent from '@/components/buttonsAccions/buttonsAccions.vue';
import BProveedorComponent from '@/components/buscadores/b_proveedor/b_proveedor.vue';
import BBancoComponent from '@/components/buscadores/b_banco/b_banco.vue';
import {PagosModel} from '@/modelo/maestro/pagos';
import {PagosDetelleModel} from '@/modelo/maestro/pagosDetalle';
import {MonedaModel} from '@/modelo/maestro/moneda'
import {BancoModel} from '@/modelo/maestro/banco';
import {ProveedorModel} from '@/modelo/maestro/proveedor';
import {MedioPagoModel} from '@/modelo/maestro/medioPago';
import {CuentaBancariaModel} from '@/modelo/maestro/cuentaBancaria';
import RunPagosService from '@/components/service/runpagos.service';
import mediopagoService from '@/components/service/mediopago.service';
import bancoService from '@/components/service/banco.service';
import { Loading } from 'element-ui';
import jsPDF from 'jspdf'
import 'jspdf-autotable';
import Global from '@/Global';
import proveedorService from '@/components/service/proveedor.service';
import runpagosService from '@/components/service/runpagos.service';
@Component({
    name: 'pagos-individual',
    components: { 
    'quickaccessmenu':QuickAccessMenuComponent,
    'bbanco':BBancoComponent,
    'bproveedor':BProveedorComponent,
    'buttons-accions':ButtonsAccionsComponent,
}
})
export default class ViewAndEditPagosComponent extends Vue {
    sizeScreen:string = (window.innerHeight - 300).toString();
    sizeScreenwidth:string = (window.innerWidth-188 ).toString();
    nameFuncion:string;
    impDisabled:boolean=false;
    public pago:PagosModel=new PagosModel();
    public pagodetalle:PagosDetelleModel=new PagosDetelleModel();
    fecha_ejecucion:any;
    fecha_ejecucion1:any;
    CodigoGen:string;
    DateContabilizacion:any;
    DocIngresados:any;
    DocDeudores:any;
    VisibleBanco:boolean=false;
    VisibleCuenta:boolean=false;
    VisibleProveedor:boolean=false;
    btnactivarbanco:boolean=false;
    vifaprobarrechasar:boolean=false;
    vifveraprobar:boolean=false;
    gridPago:any[];
    gridBanco:any[];
    gridProveedor:ProveedorModel[];
    gridProData:any[];
    gridPagosDetalle:PagosDetelleModel[];
    gridPagosDetalle1:PagosDetelleModel[];
    gridPagosDetalle2:PagosDetelleModel[];
    issave:boolean=false;
    iserror:boolean=false;
    textosave='';
    //**Moneda */
    public moneySelect:MonedaModel=new MonedaModel();
    public bancoSelect:BancoModel=new BancoModel();
    tipoMoney:string;
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

    // [CUENTA]
    gridCuenta:CuentaBancariaModel[];
    public cuenta:CuentaBancariaModel=new CuentaBancariaModel();

    tempro:string='';
    constructor(){                
        super();
        Global.nameComponent = 'viewandedit-pagos';        
        setTimeout(() => {
            this.DateSelected();
          }, 200)        
        this.loadmediopago();
        this.LoadBanco();
        this.loadProveedor();
        
    }
    DateSelected(){         
        this.pago= JSON.parse(this.$route.query.data);
        
        this.DocIngresados=this.pago.dtmPayRunExpired_Date;
        this.fecha_ejecucion =this.pago.dtmPayRun_Date;
        this.DateContabilizacion=this.pago.dtmPayRunPay_Date;
        this.codigoCompania=this.pago.strCompany_Cod;
        this.descripcionCompania=this.pago.strCompany_Desc;
        if(this.pago.strPayRun_Curr=='PEN'){
          this.tipoMoney='S/';
        }
        if(this.pago.strPayRun_Curr=='USD'){
          this.tipoMoney='US$'
        }
        var vista=this.$route.query.vista;
        this.moneySelect.strCurrency_Cod='0';
        if(vista=='Modificar'){
          this.nameFuncion='Modificar Pago';
          this.impDisabled=false;
          this.vifveraprobar=true;
      }
      if(vista=='Visualizar'){
          this.nameFuncion='Visualizar Pago';
          this.impDisabled=true;
          this.vifveraprobar=false;
      }
      if(vista=='Aprobar'){
          var object = JSON.parse(this.$route.query.data); 
          this.nameFuncion='Aprobar Pago';
          this.vifaprobarrechasar=true;
          this.impDisabled=true;
          this.vifveraprobar=false;
      }
      this.loadPagosDetalle(this.pago.intIdPayRunH_ID);    
    }
    loadPagosDetalle(intIdPayRunH_ID){
      runpagosService.GetPagosDetalle(intIdPayRunH_ID)
      .then(response=>{
        this.gridPagosDetalle=[];
        this.gridPagosDetalle1=[];
        this.gridPagosDetalle2=[];
        this.gridPagosDetalle=response;
        this.gridPagosDetalle1=response;
        this.gridPagosDetalle2=response;
        for(var i=0;i<this.gridPagosDetalle.length;i++){
          this.gridPagosDetalle[i].blnCheck=true;
          this.gridPagosDetalle1[i].blnCheck=true;
          this.gridPagosDetalle2[i].blnCheck=true;
        }
      })
    }
    loadProveedor(){
      proveedorService.GetProveedoresCompany(this.codigoCompania)
      .then(respo=>{
        this.gridProData=[];
        this.gridProData=respo;
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
          this.btnactivarbanco=false;
          this.btnactivarmediopago=true;
      }, 120)
    }
    //#endregion

    //#region [CUENTA BANCARIA]
    
    closeCuenta(){
      this.VisibleCuenta=false;
    }
    SeleccionadoCuenta(){
      this.VisibleCuenta=false;
    }
    handleCuenta(val){
      this.cuenta=val;
    }
    //#endregion

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
    Filtro(){
        var data=this.like(this.gridPagosDetalle1,'strCurrency_Doc',this.moneySelect.strCurrency_Cod)
        this.gridPagosDetalle=[];
        this.gridPagosDetalle2=[];
        this.gridPagosDetalle2=data;
        this.gridPagosDetalle=data;
      }
      Filtro1(){
        this.gridPagosDetalle=[];
        this.gridProveedor.forEach(element => {
          var data=this.like(this.gridPagosDetalle2,'strVendor_NO',element.strVendor_NO)          
          this.gridPagosDetalle=this.gridPagosDetalle.concat(data);
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
    proveDelete(val){
      this.tempro=val.strVendor_NO;      
    }
    deleteRow(index, rows) {
        rows.splice(index, 1);  
        if(this.gridProveedor.length==0){
          this.gridPagosDetalle=this.gridPagosDetalle1;
        }
        else{
          this.gridPagosDetalle=[];
          this.gridProveedor.forEach(element => {
          var data=this.like(this.gridPagosDetalle1,'strVendor_NO',element.strVendor_NO)          
          this.gridPagosDetalle=this.gridPagosDetalle.concat(data);
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
        this.VisibleCuenta=true;
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
        this.btnactivarbanco=false;
      }
    }  
      activar_banco(){
        setTimeout(() => {
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
    guardarRun(){        
      var vista=this.$route.query.vista;
      var user:any=localStorage.getItem('User_Usuario');
        this.pago.strModified_User=user;        
      if(vista=='Modificar'){
        this.pago.listaDetalle=this.gridPagosDetalle;
        // if(this.multipleSelection.length>0){            
            let loadingInstance = Loading.service({
                fullscreen: true,
                text: 'Guardando...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.8)'
            }
            );
            RunPagosService.UpdateRunPagos(this.pago) 
            .then(response=>{
                setTimeout(() => {
                    this.DateSelected();
                  }, 200)
                this.issave = true;
                this.iserror = false;
                this.openMessageSuccess('Se actualizo correctamente '+response);
                this.textosave = 'Se actualizo correctamente. '+response;
                // this.ExportarPDF('28052019-1-PEN');
                this.loadPagosDetalle(this.pago.intIdPayRunH_ID);   
                loadingInstance.close();
            }) 
            .catch(response=>{
                loadingInstance.close();
                this.issave = false;
                this.iserror = true;
                this.textosave = 'Error al actualizar.';
                this.openMessageError('Error al actualizar.');
            })      

        // }
        // else{
        //     this.$message({
        //         showClose: true,
        //         type: 'warning',
        //         message: 'Debe seleccionar al menos un documento'
        //       });
        // }
      }
      if(vista=='Visualizar'){
        this.$message({
          showClose: true,
          type: 'warning',
          message: 'Accion no permitida'
        });
      }
      if(vista=='Aprobar'){
        this.$message({
          showClose: true,
          type: 'warning',
          message: 'Accion no permitida'
        });
      }
       
    }
    aprobar(){
      this.pago.listaDetalle=this.gridPagosDetalle2;
       let loadingInstance = Loading.service({
                fullscreen: true,
                text: 'Guardando...',
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
                this.openMessageSuccess('Se aprobo correctamente '+response);
                this.textosave = 'Se aprobo correctamente. '+response;
                // this.ExportarPDF(response);
                loadingInstance.close();
            }) 
            .catch(response=>{
                loadingInstance.close();
                this.issave = false;
                this.iserror = true;
                this.textosave = 'Error al aprobar.';
                this.openMessageError('Error al aprobar.');
            })      
    }
    //#endregion
    clickCheck(event,edit,column){
      debugger;
    event.edit=!edit;
    this.editing.row=event;
    this.editing.column=column;
    // this.totalPrice=0;
    // this.totalItems=0;
    // for(var i=0;i< this.multipleSelection.length;i++){
    //     if(this.multipleSelection[i].blnCheck==true){                
    //         this.totalPrice=this.totalPrice +Math.round(Number((this.multipleSelection[i].fltUnitPrice)*(this.multipleSelection[i].fltQuantity)*(this.multipleSelection[i].intConv_Factor))* 100)/100;
    //         this.totalItems+=Number(this.multipleSelection[i].fltQuantity);
    //     }               
    // }                
  }
    toggleSelection(rows){

      // if (rows) {
      //   rows.forEach(row => {
      //     this.$refs.missionTable.toggleRowSelection(row);
      //   });
      // } else {
      //   this.$refs.missionTable.clearSelection();
      // }
    }
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
        doc.text(20, 10, this.descripcionCompania)
        doc.text(tamW/2,10,this.pago.strPayRun_NO+'  '+dd+'.'+mm+'.'+anio+' / '+hh+':'+min+':'+ss)
        doc.text(20, 15, 'AREQUIPA ');
        doc.text(tamW/2, 15,'Usuario: '+ localStorage.getItem('User_Usuario'));
        doc.text(20, 20, 'Codigo Compañia - '+this.codigoCompania);           
        doc.text(tamW/2, 20, 'Pagina: '+pageInfo.pageNumber);       
        var resutl:any=[];
        // this.gridPagosDetalle=this.multipleSelection;
        this.gridPagosDetalle.forEach(element => {
          var data=this.like(this.gridProData,'strVendor_NO',element.strVendor_NO)
          var provedata=data[0];            
            doc.text(20,comienzo,'PROVEEDOR: ')//1
            doc.text(45,comienzo,provedata.strVendor_NO)
            doc.text(tamW/2,comienzo,'DETALLE DE BANCO')//2
            comienzo=comienzo+5;
            doc.text(45,comienzo,provedata.strVendor_Desc+' '+provedata.strSurName+' '+provedata.strLastName)
            doc.text(tamW/2,comienzo,this.bancoSelect.strBank_Name)
            comienzo=comienzo+5;
            doc.text(45,comienzo,provedata.strAddress)
            doc.text(tamW/2,comienzo,'SWIFT CODE: '+this.bancoSelect.strSwift_Cod)
            comienzo=comienzo+5;
            doc.text(45,comienzo,provedata.strProvince)
            doc.text(tamW/2,comienzo,'NUMERO BANCO: '+this.bancoSelect.strBank_Cod)
            comienzo=comienzo+5;
            doc.text(45,comienzo,provedata.intIdCountry_ID.strCountry_Name)
            doc.text(tamW/2,comienzo,'NUMERO CUENTA: '+this.bancoSelect.strBank_Account )
            doc.line(20, comienzo, tamW-20, comienzo)
            comienzo=comienzo+5;
            doc.text(45,comienzo,codigo)  
            doc.text(tamW/4,comienzo,'BBV01')
            doc.text(tamW/4+30,comienzo,this.pago.strPayRun_Curr)
            doc.text(tamW/2,comienzo,provedata.strVendor_Desc+' '+provedata.strSurName+' '+provedata.strLastName)
            doc.text(tamW/2+100,comienzo,provedata.fltValue_Local+'-'+this.pago.strPayRun_Curr)
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

              doc.autoTable(columns, this.gridPagosDetalle,{
              
              startY: comienzo+5,
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
        doc.save("Run_Pagos_"+ this.pago.strPayRun_NO+".pdf");    
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
            tipoMoney:'',
            val:'',
            DateContabilizacion:'',
            DocIngresados:'',
            DocDeudores:'',
            gridPagosDetalle:[],
            gridPagosDetalle1:[],
            gridPagosDetalle2:[],
            codigoCompania:'',
            descripcionCompania:'',
            gridProveedor:[],
            gridBanco:[],
            inputAtributo:'',
            gridMedioPago:[],
            gridProData:[],
            gridCuenta:[],
            nameFuncion:'',
            impDisabled:false,fecha_ejecucion:''
        }
    }
}
import { Vue, Component } from 'vue-property-decorator';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css';
import axios from 'axios';
import * as CONFIG from '../../Config';
import GLOBAL from '../../Global';
import { Notification } from 'element-ui';
import { Loading } from 'element-ui';

import documentService from '@/components/service/documents.service';
import msmsendService from '@/components/service/msnSend.service';
import historialService from '@/components/service/historial.service';
import inicioService from '@/components/service/aprobacionDocs.service';
import trumbowyg from 'vue-trumbowyg';
import 'trumbowyg/dist/ui/trumbowyg.css';
import VueChart from 'vue-chart-js';
import aprobacionDocs from '@/components/service/aprobacionDocs.service';
import { debug } from 'util';
@Component({
   name: 'aprobacionDocs',
   components: { trumbowyg,VueChart}
})
export default class AprobacionDocsComponent extends Vue {
    public TextTitle:string ="Aprobación de documentos pendientes";
    gridData : any;
    dataComplet:any;
    options = {  day: '2-digit',month: '2-digit', year: 'numeric' };
    pagina:number=1;
    ViewOpcions:boolean=false;
    paginaNumero:number =1;
    RegistersForPage:number = 8;
    totalRegistros:number = this.RegistersForPage;
    TextResponse:any;
    modalVisualizar = false;
    loading2:boolean=true;
    loadingGet:boolean=false;
    codfiletitle:any;
    selecionado: { titulo: string, codigo: string, comentario:string,CodTitulo: string} = {
      titulo: "nulo",
      codigo: "####",
      comentario: "",
      CodTitulo:""
    }

    constructor(){
        super();
        this.ChechAccess();
        this.GetAllDocumento();
    }
    MessageSuccess(response){
      this.$message({
        showClose: true,
        type: 'success',
        message: response
      });
    }
  MessageConfirm(accion, callback_sussess){
    this.$confirm('¿Desea '+accion+' el documento?', 'Mensaje', {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'success'
    }).then(() => {
      this.loadingGet=true;
      callback_sussess()
      this.GetAllDocumento();
      this.ViewOpcions=false;
      this.selecionado.comentario="";
    }).catch(() => {
      this.$message({
        type: 'info',
        message: 'accion '+accion+' cancelada',
      });
      this.selecionado.comentario="";
    });
  }
  MessageConfirmModificar(accion, callback_sussess){
    this.$confirm('¿Desea enviar a '+accion+' el documento?', 'Mensaje', {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning'
    }).then(() => {
      this.loadingGet=true;
      callback_sussess()
      this.GetAllDocumento();
      this.ViewOpcions=false;
      this.selecionado.comentario="";
    }).catch(() => {
      this.$message({
        type: 'info',
        message: 'accion '+accion+' cancelada'
      });
      this.selecionado.comentario="";
    });
  }
  MessageConfirmRechazar(accion, callback_sussess){
    this.$confirm('¿Desea '+accion+' el documento?', 'Mensaje', {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'error'
    }).then(() => {
      this.loadingGet=true;
      callback_sussess()
      this.GetAllDocumento();
      this.ViewOpcions=false;
      this.selecionado.comentario="";
    }).catch(() => {
      this.$message({
        type: 'info',
        message: 'accion '+accion+' cancelada'
      });
      this.selecionado.comentario="";
    });
  }
    ChechAccess(){
        var lista:any = localStorage.getItem('usuario_accesos');
        if(lista === null){
          this.$router.push('/');
        }
        else{
          var listaAccesos:any = JSON.parse(lista).Data;
          var flag:boolean = false;
          for(var i=0; i<listaAccesos.length; i++){
            if(listaAccesos[i].strNombre === 'Versiones'){
              flag=true;
              break;
            }
          }
          if (flag == false){
            if(listaAccesos.length === 0) {
              this.$router.push('/');
            }
            else{
              Notification.warning('No tiene permisos para acceder a esta página')
              this.$router.push('/barmenu/inicio');
            }
          }
        }
      }
    GetAllDocumento(){
      aprobacionDocs.GetAllDocByUser()
        .then(response => {
          debugger;
          this.dataComplet = response;    
          this.totalRegistros=this.dataComplet.Count;
          var data=this.dataComplet.Data;      
          //this.gridData = this.dataComplet.Data;
          this.gridData = data.slice(this.RegistersForPage*(this.paginaNumero-1), this.RegistersForPage*(this.paginaNumero));
          this.loading2=false;
          // this.loadingGet=false;
        })
        .catch(e =>{
          this.openMessageError('Error al cargar documentos');
          this.loading2=false;
          // this.loadingGet=false;
        })
      }
      openMessageError(strMessage:string){
        this.$message({
            showClose: true,
            type: 'error',
            message: strMessage
          });
      }
      cambioPagina(){
        var data1=this.dataComplet.Data;
        this.gridData = data1.slice(this.RegistersForPage*(this.paginaNumero-1), this.RegistersForPage*(this.paginaNumero));
      }
      getDateString(fecha:string){
        var dateString = new Date(fecha).toLocaleDateString('es-PE', this.options)
        return dateString;
    }

      AprobarDocumento(){
        debugger;
        var dato = {
          "codDocumento": this.selecionado.codigo,
          "Comentario": this.selecionado.comentario
        }
        aprobacionDocs.AprobarDocumento(dato)
          .then(response=>{            
            var str=response;
            var splitted1 = str.split("-"); 
            this.gridData=[];
            this.GetAllDocumento();
            this.MessageSuccess(splitted1[1]) 
            this.loadingGet=false;
            this.selecionado.comentario="";
          }).catch(e =>{
            this.openMessageError('Error al aprobar documento');
            this.loadingGet=false;
            this.selecionado.comentario="";
          })
      }

      ModificarDocumento() {
        debugger;
        var dato = {
          "codDocumento": this.selecionado.codigo,
          "Comentario": this.selecionado.comentario
        }
        aprobacionDocs
          .ModificarDocumento(dato)
          .then(this.MessageSuccess)
          this.loadingGet=false;
      }

    RechazarDocumento() {
      debugger;
      var dato = {
        "codDocumento": this.selecionado.codigo,
        "Comentario": this.selecionado.comentario
      }
      aprobacionDocs
        .RechazarDocumento(dato)
        .then(this.MessageSuccess)
        this.loadingGet=false;
    }

    Confirmacion(accion){
      if (accion === 'aprobar')
        this.MessageConfirm(accion, this.AprobarDocumento);
      else if (accion ==='modificar')
        this.MessageConfirmModificar(accion, this.ModificarDocumento);
      else if (accion ==='rechazar')
        this.MessageConfirmRechazar(accion, this.RechazarDocumento);
      else
        console.error('accion no valida');
    }

    SeleccionarRow(index, row){
      this.codfiletitle=row.strTitle;
        this.selecionado.titulo = row.strTitle;
        this.selecionado.codigo = row.strCodDocumento;
        this.selecionado.CodTitulo=row.CodDocumentoGenerado;
    }
    GetRowData(index, row) {
        this.SeleccionarRow(index, row);
        this.ViewOpcions=true;
    }
    OpenVisualizar(index, row){
      debugger;
        this.SeleccionarRow(index, row);
        this.modalVisualizar = true;
    }
    getPdfUrl() {
      debugger;
      var PdfText0 = this.selecionado.CodTitulo;
      return CONFIG.Local_PathPdfNews + PdfText0 + ".pdf";
    }
    filterHandler(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    }
    data() {
      return {
          gridData: [],
          totalRegistros:0,
          ViewOpcions:false,
          TextResponse:'',
          loading2: true
          }
    }
}

import { Vue, Component } from 'vue-property-decorator';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css';
import axios from 'axios';
import * as CONFIG from '../../Config';
import GLOBAL from '../../Global';
import { Notification } from 'element-ui';
import { Loading } from 'element-ui';
import { mixin as focusMixin }  from 'vue-focus';
import '../../assets/css/excel-2007.scss';
import documentService from '@/components/service/documents.service';
import msmsendService from '@/components/service/msnSend.service';
import historialService from '@/components/service/historial.service';
import inicioService from '@/components/service/inicio.service';
import trumbowyg from 'vue-trumbowyg';
import 'trumbowyg/dist/ui/trumbowyg.css';
import Handsontable from 'handsontable-pro';
Vue.directive('focus', {
  inserted: function(el) {
    el.focus()
  }
})
var EditableColumn = {
  template: '#editable-column-content',
  props: ['is-editing', 'scope', 'editing', 'on-blur', 'on-enter', 'property']
}
import VueChart from 'vue-chart-js';
@Component({
   name: 'inicio',
   components: { trumbowyg,VueChart,Handsontable,'editable-column-content': EditableColumn }
})
export default class InicioComponent extends Vue {
   msg: string;
   gridDataNew:any;
   gridDataNewHist:any=[];
   gridDataPublishList:any=[];
   FormNew:any;
   gridDataNewTitle:any;
   gridDataPublish:any;
   PdfText0:any;
   intDocID:any;
   instance:any;
   value:any;
   FormAgregar : any;
   SendDocument:any;
   dataDocumentSelect:any;
   selectDataEmails:any=[];
   gridDataGraphic:any=[];
   chartData:any;
   options = {  day: '2-digit',month: '2-digit', year: 'numeric' };
   ViewHistorial:boolean=false;
   ViewHistorialPublish:boolean=false;
   Descargarfile:boolean=false;
   DescargarfileAprobado:boolean=false;
   modalVisualizarPdf:boolean=false;
   codfile:any;
   temp:any;
   codfiletitle:any;
   video:any='https://www.youtube.com/watch?v=P0Xlf6qTuNQ';
   type:any='video/mp4';
   efectoinput:boolean=false;
   editing:any= {
     row:'',
     column:''
   };
   editingb:boolean=false;
   EditableColumn:any={
    template: '#editable-column-content',
    props: ['is-editing', 'scope', 'editing', 'on-blur', 'on-enter', 'property']
  } ;
constructor (){
  super()
  this.msg='';
  // this.loadingDataNewDocuments();
  // this.loadingDataPublishDocuments();
  // this.getEmail();
  // this.statisticsGraphic();
}
loadingDataNewDocuments(){
  inicioService.loadingDataNewDocuments()
  .then(response=>{
    this.gridDataNew=response;
  })
}
AgregarMsnEnviado(FormAgregar){
  debugger;
  let loadingInstance = Loading.service({
    fullscreen: true,
    text: 'Enviando...',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.8)'
    }
    );
  this.FormAgregar.strCodDocumento=this.intDocID;
  this.FormAgregar.strTitle=this.gridDataNewTitle.strTitle;
  msmsendService.AgregarMsnEnviado(this.FormAgregar)
  .then(response =>{
    this.openMessage('Mensaje enviado correctamente. ')
    loadingInstance.close(); 
    this.cancelData();
  })
  .catch(e =>{
    this.openMessageError('Error al enviar mensaje');
    loadingInstance.close(); 
    console.log(e)
  })
  this.SendDocument=false;
}
  getEmail(){
    msmsendService.getEmail()
    .then(response => {
      this.dataDocumentSelect = response;
      for(var i=0;i<this.dataDocumentSelect.Data.length ; i++){          
      }
    })
    .catch(e =>{
      this.openMessageError('Error al cargar lista de documentos');
      console.log(e);
    })
  }
  cancelData(){
    this.selectDataEmails=[];
    this.SendDocument = false;
    this.FormAgregar.strAsunto='';
    this.FormAgregar.strMensaje='';
  }
openMessage(newMsg : string) {
  this.$message({
    showClose: true,
    message: newMsg,
    type: 'success'
  });
}
getImageUrl(strCodDocumento){
  return CONFIG.Local_PathImage+strCodDocumento+".jpg";
}
getPdfUrl(){
  return CONFIG.Local_PathPdfNews+this.PdfText0+".pdf";
}
getPdfUrlAprobado(){
  return CONFIG.Local_PathPdfApproved+this.PdfText0+".pdf";
}
viewpdf(strCodDocumento,strTitle,int){
  debugger;
  this.modalVisualizarPdf=true;
  this.temp=int;
  this.codfile=strCodDocumento;
  this.codfiletitle=strTitle;
}
getPdfview(){
  debugger;
  if(this.temp==1){
    return CONFIG.Local_PathPdfNews+this.codfile+".pdf";
  }
  if(this.temp==2){
    return CONFIG.Local_PathPdfApproved+this.codfile+".pdf";
  }  
}

get(event){
  debugger;
  this.PdfText0=event.CodDocumentoGenerado;
  this.intDocID=event.strCodDocumento;
  this.FormNew.strCodDocumento=event.strCodDocumento;
  this.gridDataNewTitle.strTitle=event.strTitle;
}
loadingDataPublishDocuments(){
  inicioService.loadingDataPublishDocuments()
  .then(response=>{
    debugger;
    this.gridDataPublish=response;
  })
}

updateValue(value) {
  this.$emit('input', value)
}

handleChangeEdit(value, direction, movedKeys) {
  this.FormAgregar.lststrEmails=[];
  for(let i=0;i<value.length;i++){
    this.FormAgregar.lststrEmails.push({
      intEmail:i,
      strEmail:value[i]
    })
  }
} 
deleteDocumentsNew(intDocID) {
      debugger;
      this.$confirm('El documento sera eliminado: "'+this.gridDataNewTitle.strTitle+'". Continuar?', 'Eliminando', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        documentService.deleteDocumentsNew(this.intDocID)
        .then(response => {
          debugger;
          this.loadingDataNewDocuments();
        })
        .catch(e =>{
          this.openMessageError('Error al eliminar documento');
          console.log(e);
        })
        this.$message({
        type: 'success',
        message: 'Eliminacion completado'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Eliminacion cancelado'
        });          
      });
    }
    deleteDocumentsPublish(intDocID) {
      debugger;
      this.$confirm('El documento sera eliminado: "'+this.gridDataNewTitle.strTitle+'". Continuar?', 'Eliminando', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        documentService.deleteDocumentsPublish(this.intDocID)
        .then(response => {
          debugger;
          this.loadingDataPublishDocuments();
        })
        .catch(e =>{
          this.openMessageError('Error al eliminar documento');
          console.log(e);
        })
        this.$message({
        type: 'success',
        message: 'Eliminacion completado'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Eliminacion cancelado'
        });          
      });
    }
    statisticsGraphic(){
      msmsendService.statisticsGraphic()
      .then(response=>{
        this.gridDataGraphic[1]=response.Data["0"].NUEVOS;
        this.gridDataGraphic[2]=response.Data["0"].APROBADOS;
        this.gridDataGraphic[3]=response.Data["0"].ELIMINADOS;
        this.chartData.datasets.push(
          {
                  label: 'Cantidad de documentos',
                  backgroundColor: '#f87979',
                  pointBackgroundColor: 'white',
                  borderWidth: 1,
                  pointBorderColor: '#249EBF',                
                  data:[this.gridDataGraphic[1],this.gridDataGraphic[2],this.gridDataGraphic[3]]          
        })
      })
    }
    historialNew(FormNew){
        historialService.historialNuevo(this.FormNew)
        .then(response=>{
          this.gridDataNewTitle.strTitle=response.Data["0"].strTitle;
          this.gridDataNewHist=response.Data;
          this.ViewHistorial=true;
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Error en cargar historial'
          });          
        });
    }
    historialPublishAndNew(FormNew){
      debugger;
      historialService.historialNuevo(this.FormNew)
        .then(response=>{
          this.gridDataNewTitle.strTitle=response.Data["0"].strTitle;
          this.gridDataNewHist=response.Data;
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Error en cargar historial'
          });          
        });
        historialService.historialAprobado(this.FormNew)
        .then(response=>{
          this.gridDataPublishList=response.Data;
          this.ViewHistorialPublish=true;
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Error en cargar historial'
          });          
        });
    }

downloadDoc(){
  this.Descargarfile=true;
}
downloadDocApro(){
  this.DescargarfileAprobado=true;
}
openMessageError(strMessage:string){
  this.$message({
    showClose: true,
    type: 'error',
    message: strMessage
  });
}
getDateString(fecha:string){
  var dateString = new Date(fecha).toLocaleDateString('es-PE', this.options)
  return dateString;
}
   open(): void {
      this.$alert('This is a message', 'Title', {
         confirmButtonText: 'OK',
         callback: action => {
            this.$message({
               type: 'info',
               message: `action: ${action}`
            })
         }
      })
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
  handleBlur(event) {
    debugger;
    this.editingb=false;
    event.edit=false;
    this.editing.row='';
    this.editing.column='';
    console.log('blur');
  }
  alerta2(){
    alert("hola");
  }
  // alerta(event){
  //   console.log('alerta',event);
  //  } 
   alerta(event,edit,column){
    debugger;
    this.editingb=true;
    event.edit=!edit;
    this.editing.row=event;
    this.editing.column=column;
    console.log('alerta',event,edit);
   }
   data() {
    return {
      hotSettings: {
        startRows: 5,
        startCols: 5,
        colHeaders: true,
        stretchH: 'all'
      },
      id: 'my-custom-id',
      className: 'my-custom-classname',
      style: 'width: 300px; height: 142px; overflow: hidden; border: 1px solid red;',
      gridDataNew:[],
      gridDataNewHist:[],
      gridDataPublishList:[],
      gridDataNewTitle:{
        strTitle:''
      },
      codfiletitle:'',
      gridDataPublish:[],
      dataDocumentSelect:[],
      selectDataEmails:[],
      gridDataGraphic:[],
      PdfText0:'',
      intDocID:'',
      FormNew:{
        strCodDocumento:''
      },
      modalJerarquia:false,
      modalVisualizar:false,
      modalVisualizarPdf:false,
      modalVisualizarAprobado:false,
      SendDocument:false,
      ViewHistorial:false,
      ViewHistorialPublish:false,
      Descargarfile:false,
      DescargarfileAprobado:false,
      data : '',
      instance: null,
      value:'',
      formM:{
        content:''
      },
      FormSearch:{
        strEmail:''
      },
      FormAgregar: {
        strCodDocumento:'',
        strCodUsuarioDe: localStorage.getItem('User_CodUsuario'),
        strAsunto : '',
        strMensaje: '',
        strEmail:localStorage.getItem('User_Mail'),
        strTitle:'',
        lststrEmails:[]
      },
      chartData:{
        labels: ['Documentos nuevos', 'Documentos aprobados', 'Documentos eliminados'],
        datasets:[]
      },
      tableData: [{
        date: '2016-05-03',
        name: 'andre',
        edit: false,
        address: 'No. 189, Grove St, Los Angeles'
      }, {
        date: '2016-05-02',
        name: 'Tom',
        edit: false,
        address: 'No. 189, Grove St, Los Angeles'
      }, {
        date: '2016-05-04',
        name: 'Tom',
        edit: false,
        address: 'No. 189, Grove St, Los Angeles'
      }, {
        date: '2016-05-01',
        name: 'Tom',
        edit: false,
        address: 'No. 189, Grove St, Los Angeles'
      }],
      datacollection: {
        //Data to be represented on x-axis
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: '#249EBF',
            //Data to be represented on y-axis
            data: [40, 20, 30, 50, 90, 10, 20, 40, 50, 70, 90, 100]
          }
        ]
      }
    }
  }
}

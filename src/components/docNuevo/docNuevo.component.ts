import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import router from '../../router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import InfiniteScroll from 'vue-infinite-scroll';
import '../../assets/css/docNuevo.scss';
import contextMenu from 'vue-context-menu';
import Jerarquia from '@components/jerarquia/jerarquia.vue';
import MessageBox from 'vue-msgbox';
import swal from 'sweetalert'
import VueSweetAlert from 'vue-sweetalert';
import {Pagination, PaginationEvent} from 'vue-pagination-2';
import Modal from 'modal-vue';
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import * as CONFIG from '../../Config';
import axios from 'axios';
import { Notification } from 'element-ui';
import { Loading } from 'element-ui';
import trumbowyg from 'vue-trumbowyg';
import 'trumbowyg/dist/ui/trumbowyg.css';
import docNuevoService from '@/components/service/docNuevo.service';
import documentService from '@/components/service/documents.service';
import msmsendService from '@/components/service/msnSend.service';
import historialService from '@/components/service/historial.service';
import ButtonsAccionsComponent from '@/components/buttonsAccions/buttonsAccions.vue';
Vue.use(BootstrapVue);

@Component({
   name: 'docNuevo',
   components: { contextMenu,Pagination,Modal,trumbowyg,'buttons-accions':ButtonsAccionsComponent }
})
export default class DocNuevoComponent extends Vue {
  public griddinamicang:string ="row listadinamica nav nav-tabs";
  isActive:boolean;
  isCollapse:boolean;
  BuscarNuevo: any;
  SearchForm:any;
  gridDataSearch:any;
  VisualizarUsuario:any;
  dataUsuarioPagina:any;
  dataDocumentSelect:any;
  DataUsuario:any;
  FormSearchUsu:any;
  SendDocument:any;
  selectDataEmails:any=[];
  pagina:number=1;
  RegistersForPage2:number=5;
  totalRegistros1:number=(this.RegistersForPage2);
  gridData: any;
  gridUnidad:any;
  gridTipoAprobacion:any;
  PdfText0:any;
  intDocID:any;
  FormSearch:any;
  rowSelectedEdit:any;
  FormAgregar : any;
  codfiletitle:any;
  codfile:any;
  //datos para historial
  FormNew:any;
  gridDataNewTitle:any;
  gridDataNewHist:any=[];
  options = {  day: '2-digit',month: '2-digit', year: 'numeric' };
  ViewHistorial:boolean=false;
  Descargarfile:boolean=false;
  loadingGet:boolean=true;
  modalVisualizar:boolean=false;
  constructor(){
    super();
    // this.ChechAccess();
    this.isActive=true;
    this.isCollapse=false;
    // this.loadingData(); 
    // this.loadUnidad();   
    // this.loadTipoAprobacion();
    // this.getEmail();  
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
        if(listaAccesos[i].strNombre === 'Dominio'){
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
  handleClick() {
    console.log('click');
  }
  AgregarMsnEnviado(FormAgregar){
    let loadingInstance = Loading.service({
      fullscreen: true,
      text: 'Enviando...',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.8)'
      }
      );
    this.FormAgregar.strCodDocumento=this.intDocID;
    this.FormAgregar.strTitle=this.PdfText0;
    msmsendService.AgregarMsnEnviado(this.FormAgregar)
    .then(response =>{
      this.openMessage('Mensaje enviado correctamente. ');
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
    handleChangeEdit(value, direction, movedKeys) {
      this.FormAgregar.lststrEmails=[];
      debugger;
      for(let i=0;i<value.length;i++){
        this.FormAgregar.lststrEmails.push({
          intEmail:i,
          strEmail:value[i]
        })
      }
    } 
    viewpdf(strCodDocumento,strTitle){
      debugger;
      this.modalVisualizar=true;
      this.codfile=strCodDocumento;
      this.codfiletitle=strTitle;
    }
  clickHamburger () {
    this.isActive = !this.isActive
    this.isCollapse = !this.isCollapse
  }
  links(){
    router.push('/barmenu/jerarquia')
  }
  links2(){
    router.push('/barmenu/docComparador')
  }
  getImageUrl(CodDocumentoGenerado){
    return CONFIG.Local_PathImage+CodDocumentoGenerado+".jpg";
  }
  getPdfUrl(){
    return CONFIG.Local_PathPdfNews+this.codfile+".pdf";
  }
  get(event){
    //this.PdfText0=event.strTitle.replace(" ","_");
    this.PdfText0=event.CodDocumentoGenerado;
    this.intDocID=event.strCodDocumento;
    this.FormNew.strCodDocumento=event.strCodDocumento;
    this.gridDataNewTitle.strTitle=event.strTitle;

  }
  searchNuevo(BuscarNuevo){
    debugger;
    if(BuscarNuevo.strQuery==''){
      this.openMessageAlert('No se inserto ningún texto');
    }
    else{
      docNuevoService.searchNuevo(BuscarNuevo)
      .then(response=>{
        if(response.Count!=0){
          this.gridData=response;
        }
        else{
          this.openMessage('No se encontraron coencidencias');
          this.gridData=[];
        }
      })
      .catch(e =>{
        this.openMessageError('Error al Buscar coencidencias');
        this.gridData=[];
        console.log(e)
      })
    }
    
  }
  searchDocumento(SearchForm){
    debugger;
    docNuevoService.searchDocumento(SearchForm)
    .then(response=>{
      if(response.Count!=0){
        this.gridData=response;
      }
      else{
        this.openMessage('No se encontraron coencidencias');
        this.gridData=[];
      }
    })
    .catch(e =>{
      this.openMessageError('Error al Buscar coencidencias');
      this.gridData=[];
      console.log(e)
    })
  }
  loadingData(){
    debugger;
    docNuevoService.loadingData()
    .then(response => {
      this.dataUsuarioPagina = response;
      this.totalRegistros1=this.dataUsuarioPagina.Count;
      var data=this.dataUsuarioPagina.Data;      
      this.DataUsuario = data.slice(this.RegistersForPage2*(this.pagina-1), this.RegistersForPage2*(this.pagina));
      this.loadingGet=false;
      this.searchDocumento(this.SearchForm);
    })
    .catch(e =>{
      this.openMessageError('Error al cargar Versiones de Documentos');
      console.log(e);
    })
  }
  SearchUsuarios(FormSearchUsu){
    this.loadingGet=true;
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    docNuevoService.SearchUsuarios(FormSearchUsu)
    .then(response =>{
      this.dataUsuarioPagina = response;      
      this.totalRegistros1=this.dataUsuarioPagina.Count;
      var data=this.dataUsuarioPagina.Data;      
      this.DataUsuario = data.slice(this.RegistersForPage2*(this.pagina-1), this.RegistersForPage2*(this.pagina));
      this.loadingGet=false;
    })
    .catch(e =>{
      this.openMessageError('Error al consultar usuarios');
      console.log(e)
    })
  }
  clearDataUsuario(){
    this.loadingGet=true;
    this.FormSearchUsu.intCodUsuario='';
    this.FormSearchUsu.strDominio='';
    this.FormSearchUsu.strUsuario='';
    this.FormSearchUsu.Nombres='';
    this.FormSearchUsu.ApellidoPaterno='';
    this.FormSearchUsu.ApellidoMaterno='';
    this.FormSearchUsu.strTitle='';
    this.FormSearchUsu.strCodDocumento='';
    this.loadingData();
  }
  searchDocumentoClean(){
    debugger;
    this.SearchForm.strTitle='';
    this.SearchForm.CodTipoAprobacion='';
    this.SearchForm.strUniDescripcion='';
    this.SearchForm.strCodDocumento='';
    this.SearchForm.intCodUsuario='';
    this.SearchForm.strUsuario='';
    this.SearchForm.strNombres='';
    this.SearchForm.strApellidoPat='';
    this.SearchForm.strApellidoMat='';
    this.SearchForm.CodPersona=localStorage.getItem('User_CodPersona');
    this.SearchForm.strQuery='';
    this.gridData=[];
    this.loadingData();
  }
  GetRowData(index,row,SearchForm){
    this.rowSelectedEdit = row;
    this.SearchForm=row;
    this.SearchForm.intCodUsuario=row.intCodUsuario,
    this.SearchForm.strUsuario=row.strUsuario,
    this.SearchForm.strNombres=row.Nombres,
    this.SearchForm.strApellidoPat=row.ApellidoPaterno,
    this.SearchForm.strApellidoMat=row.ApellidoMaterno,
    this.SearchForm.strTitle='',
    this.SearchForm.CodPersona=localStorage.getItem('User_CodPersona');
    this.SearchForm.CodTipoAprobacion='',
    this.SearchForm.strUniDescripcion='',
    this.SearchForm.strCodDocumento='',
    this.SearchForm.strQuery='',
    this.VisualizarUsuario=false;
    
  }
  historialNew(FormNew){
    debugger;
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
downloadDoc(){
  this.Descargarfile=true;
}
getDateString(fecha:string){
  var dateString = new Date(fecha).toLocaleDateString('es-PE', this.options)
  return dateString;
}
  cambioPaginaUsuario(){
    var data2=this.dataUsuarioPagina.Data;
      this.DataUsuario = data2.slice(this.RegistersForPage2*(this.pagina-1), this.RegistersForPage2*(this.pagina));
    }
  openMessage(newMsg : string) {
    this.$message({
      showClose: true,
      message: newMsg,
      type: 'success'
    });
  }

  loadUnidad(){
    debugger;
    docNuevoService.loadUnidad()
    .then(response=>{

      this.gridUnidad=response.Data;
    })
  }
  loadTipoAprobacion(){
    debugger;
    docNuevoService.loadTipoAprobacion()
    .then(response=>{
      this.gridTipoAprobacion=response.Data;
    })
  }
  openMessageError(strMessage:string){
    this.$message({
      showClose: true,
      type: 'error',
      message: strMessage
    });
  }
  openMessageAlert(strMessage:string){
    this.$message({
      showClose: true,
      type: 'info',
      message: strMessage
    });
  }
  data() {
    return {
      gridData: [],
      gridUnidad:[],
      gridTipoAprobacion:[],
      DataUsuario:[],
      totalRegistros1:0 ,
      gridDataNewTitle:{
        strTitle:''
      },
      FormNew:{
        strCodDocumento:''
      },
      gridDataNewHist:[],
      rowSelectedEdit:[],
      formLabelWidth: '120px',
      PdfText0:'',
      intDocID:'',
      BuscarNuevo: {
        CodPersona:localStorage.getItem('User_CodPersona'),
        strQuery:''             
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
      dataDocumentSelect:[],
      SendDocument:false,
      selectDataEmails:[],
      SearchForm:{
        strQuery:'',
        CodPersona:localStorage.getItem('User_CodPersona'),
        strTitle:'',
        CodTipoAprobacion:'',
        strUniDescripcion:'',
        strCodDocumento:'',
        intCodUsuario:'',
        strUsuario:'',
        strNombres:'',
        strApellidoPat:'',
        strApellidoMat:''
      },
      FormSearchUsu:{
        intCodUsuario:'',
        strDominio : '',
        strUsuario: '',
        Nombres:'',
        ApellidoPaterno:'',
        ApellidoMaterno:'',
        strTitle:'',
        strCodDocumento:''
      },
      value: '',   
      dialogTableVisible: false,
      modalVisualizar:false,
      modalHistorial:false,
      modalJerarquia:false,
      Descargarfile:false,
      dialogVisible: false,
      dialogRowVisible: false,
      modalShow: false,
      VisualizarUsuario:false
    }
  }

  defaultProps: {
    children: 'children',
    label: 'label'
  }

  openAlert(){
    swal({
      title: 'sdfgsdfgsdfgsd!'
    })
  }

  deleteDocumentsNew(intDocID) {
    debugger;
    this.$confirm('El documento sera eliminado: "'+ this.gridDataNewTitle.strTitle+'" ? '+'Continuar.', 'Eliminando', {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning'
    }).then(() => {
      debugger;
    documentService.deleteDocumentsNew(this.intDocID)
    .then(response => {
      console.log(response);
      this.searchDocumento(this.SearchForm);      
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
        message: 'Eliminacion Cancelado'
      });          
    });
  }

  download() {
    this.$confirm('Desea descargar el documento. Continuar?', 'Descarga de Documento', {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning'
    }).then(() => {
      this.$message({
        type: 'success',
        message: 'Descarga completado'
      });
    }).catch(() => {
      this.$message({
        type: 'info',
        message: 'Descarga Cancelado'
      });          
    });
  }

  open3() {
    this.$prompt('Ingrese e-mail', 'Share', {
      confirmButtonText: 'Compartir',
      cancelButtonText: 'Cancel',
      inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
      inputErrorMessage: 'Invalido E-mail'
    }).then(value => {
      this.$message({
        type: 'success',
        message: 'Compartido con:' + value
      });
    }).catch(() => {
      this.$message({
        type: 'warning',
        message: 'Compartir cancelado'
      });       
    });
  }
}
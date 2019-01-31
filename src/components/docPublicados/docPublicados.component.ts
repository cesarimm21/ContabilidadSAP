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
import docPublicadosService from '@/components/service/docPublicados.service';
import documentService from '@/components/service/documents.service';
import msmsendService from '@/components/service/msnSend.service';
import historialService from '@/components/service/historial.service';
Vue.use(BootstrapVue);

@Component({
   name: 'docNuevo',
   components: { contextMenu,Pagination,Modal,trumbowyg }
})
export default class DocPublicadosComponent extends Vue {
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
  PdfText0:any;
  intDocID:any;
  FormSearch:any;
  rowSelectedEdit:any;
  FormAgregar : any;
  //datos para historial
  FormNew:any;
  gridDataNewTitle:any;
  gridDataNewHist:any=[];
  gridDataAproHist:any=[];
  gridDataPubliHist:any=[];
  options = {  day: '2-digit',month: '2-digit', year: 'numeric' };
  ViewHistorial:boolean=false;
  Descargarfile:boolean=false;
  constructor(){
    super();
    this.ChechAccess();
    this.isActive=true;
    this.isCollapse=false;
    this.loadingData();
    this.getEmail();  
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
      text: 'Enviando Mensaje...',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.8)'
      }
      );
    this.FormAgregar.strCodDocumento=this.intDocID;
    this.FormAgregar.strTitle=this.PdfText0;
    debugger;
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
  getImageUrl(strCodDocumento){
    return CONFIG.Local_PathImage+strCodDocumento+".jpg";
  }
  getPdfUrl(){
    return CONFIG.Local_PathPdf+this.PdfText0+".pdf";
  }
  get(event){
    //this.PdfText0=event.strTitle.replace(" ","_");
    debugger;
    this.PdfText0=event.strCodDocumento;
    this.intDocID=event.strCodDocumento;
    this.FormNew.strCodDocumento=event.strCodDocumento;
    this.gridDataNewTitle.strTitle=event.strTitle;
  }
  searchDocumento(SearchForm){
    docPublicadosService.searchDocumento(SearchForm)
    .then(response=>{
      if(response.Count!=0){
        this.gridData=response;
      }
      else{
        this.openMessage('No se encontraron documentos');
      }
    })
    .catch(e =>{
      this.openMessageError('Error al Buscar Documento');
      console.log(e)
    })
  }
  loadingData(){
    docPublicadosService.loadingData()
    .then(response => {
      this.dataUsuarioPagina = response;
      this.totalRegistros1=this.dataUsuarioPagina.Count;
      var data=this.dataUsuarioPagina.Data;      
      this.DataUsuario = data.slice(this.RegistersForPage2*(this.pagina-1), this.RegistersForPage2*(this.pagina));
    })
    .catch(e =>{
      this.openMessageError('Error al cargar Versiones de Documentos');
      console.log(e);
    })
  }
  SearchUsuarios(FormSearchUsu){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    docPublicadosService.SearchUsuarios(FormSearchUsu)
    .then(response =>{
      this.dataUsuarioPagina = response;      
      this.totalRegistros1=this.dataUsuarioPagina.Count;
      var data=this.dataUsuarioPagina.Data;      
      this.DataUsuario = data.slice(this.RegistersForPage2*(this.pagina-1), this.RegistersForPage2*(this.pagina));
    })
    .catch(e =>{
      this.openMessageError('Error al consultar usuarios');
      console.log(e)
    })
  }
  clearDataUsuario(){
    this.FormSearchUsu.intCodUsuario='';
    this.FormSearchUsu.strDominio='';
    this.FormSearchUsu.strUsuario='';
    this.FormSearchUsu.strNombres='';
    this.FormSearchUsu.strApellidoPat='';
    this.FormSearchUsu.strApellidoMat='';
    this.FormSearchUsu.strTitle='';
    this.FormSearchUsu.strCodDocumento='';
    this.loadingData();
  }
  searchDocumentoClean(){
    this.SearchForm.strTitle='';
    this.SearchForm.strTipoDocDescripcion='';
    this.SearchForm.strUniDescripcion='';
    this.SearchForm.strCodDocumento='';
    this.SearchForm.intCodUsuario='';
    this.SearchForm.strUsuario='';
    this.SearchForm.strNombres='';
    this.SearchForm.strApellidoMat='';
    this.SearchForm.strApellidoPat='';
    this.gridData=[];
    this.loadingData();
  }
  GetRowData(index,row,SearchForm){
    this.rowSelectedEdit = row;
    this.SearchForm=row;
    this.SearchForm.intCodUsuario=row.intCodUsuario,
    this.SearchForm.strUsuario=row.strUsuario,
    this.SearchForm.strNombres=row.strNombres,
    this.SearchForm.strApellidoPat=row.strApellidoPat,
    this.SearchForm.strApellidoMat=row.strApellidoMat,
    this.SearchForm.strTitle='',
    this.SearchForm.strTipoDocDescripcion='',
    this.SearchForm.strUniDescripcion='',
    this.SearchForm.strCodDocumento='',
    this.VisualizarUsuario=false;
  }
  historialNew(FormNew){
    debugger;
    historialService.historialNuevo(this.FormNew)
    .then(response=>{
      this.gridDataNewTitle.strTitle=response.Data["0"].strTitle;
      this.gridDataNewHist=response.Data;
      this.historialPublish(FormNew);
      this.ViewHistorial=true;
    }).catch(() => {
      this.$message({
        type: 'info',
        message: 'Error en cargar historial'
      });          
    });
}
historialPublish(FormNew){
  historialService.historialPublish(this.FormNew)
  .then(response=>{
    this.gridDataPubliHist=response.Data;
    // this.ViewHistorial=true;
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

  openMessageError(strMessage:string){
    this.$message({
      showClose: true,
      type: 'error',
      message: strMessage
    });
  }
  data() {
    return {
      gridData: [],
      DataUsuario:[],
      totalRegistros1:0 ,
      gridDataNewTitle:{
        strTitle:''
      },
      FormNew:{
        strCodDocumento:''
      },
      gridDataNewHist:[],
      gridDataAproHist:[],
      gridDataPubliHist:[],
      rowSelectedEdit:[],
      formLabelWidth: '120px',
      PdfText0:'',
      intDocID:'',
      BuscarNuevo: {
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
        strTitle:'',
        strTipoDocDescripcion:'',
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
        strNombres:'',
        strApellidoPat:'',
        strApellidoMat:'',
        strTitle:'',
        strCodDocumento:''
      },
      options: [{
        value: 'Option1',
        label: 'Option1'
        }, {
        value: 'Option2',
        label: 'Option2'
        }, {
        value: 'Option3',
        label: 'Option3'
        }, {
        value: 'Option4',
        label: 'Option4'
        }, {
        value: 'Option5',
        label: 'Option5'
      }],
      tableData2:  [{
        codigo:'0000000001',
        descripcion: 'Acta de reunion',
        version: 'V01',
        autor:'AREVALO LOPEZ, JAVIER',
        fecha: '10/6/2017 9:36 PM'
        }, {
        codigo:'0000000002',
        descripcion: 'agregando solo interfaz de dominio',
        version: 'V03',
        autor:'ARIAS HERNANDEZ, ROSARIO',
        fecha: '10/5/2017 5:35 PM'
        }, {
        codigo:'0000000003',
        descripcion: 'lista de proveedores de antapacay',
        version: 'V04',
        autor:'ARROYO RAMÍREZ, EFRAÍN ',
        fecha: '10/5/2017 5:13 PM'
        }, {
        codigo:'0000000004',
        descripcion: 'Acta de reunion de ventas',
        version: 'V05',
        autor:'ALOCEN BARRERA, MARCO TULIO',
        fecha: '10/5/2017 5:01 PM'
        },{
        codigo:'0000000055',
        descripcion: 'Modificacion de Roles',
        version: 'V066',
        autor:'BAIOCCHI URETA, CESAR',
        fecha: '10/6/2017 9:33 PM'
        },{
        codigo:'0000000006',
        descripcion: 'Acta de reunion',
        version: 'V045',
        autor:'BAYLÓN ROJAS, ISELA FLOR',
        fecha: '10/4/2017 8:15 PM'
      }],
      value: '',
      options1: [{
        value: 'A',
        label: 'A'
        }, {
        value: 'B',
        label: 'B'
        }, {
        value: 'C',
        label: 'C'
        }, {
        value: 'D',
        label: 'D'
        }, {
        value: 'E',
        label: 'E'
      }],
      data2: [{
        id: 1,
        label: 'ACEVEDO JHONG, DANIEL',
        children: [{
          id: 4,
          label: 'AGURTO RONDOY, MIGUELVICENTE',
          children: [{
            id: 9,
            label: 'ALCALÁ NEGRÓN, CHRISTIAN NELSON',
            children: [{
              id: 10,
              label: 'ALMORA HERNANDEZ, RAUL EDUARDO'
              },{
              id:11,
              label:'CHANCOS MENDOZA, ZARITA'
              },{
              id:11,
              label:'CHIRINOS LACOTERA, CARLOS'
              },{
              id:11,
              label:'CORES MORENO, DORIS'
              },{
              id:11,
              label:'CORTEZ LOZANO, MARIBEL CORINA'
              },{
              id:11,
              label:'CRISPIN QUISPE, ANGEL'
              },{
              id:11,
              label:'DE LOAYZA CONTERNO, ANTONIO '
            }]
          }]
        }]
        }, {
        id: 2,
        label: 'ALVA CAMPOS, VICTOR',
        children: [{
          id: 5,
          label: 'BAIOCCHI URETA, CESAR'
          }, {
          id: 6,
          label: 'BEDREGAL CANALES, LUZ MARINA'
        }]
        }, {
        id: 3,
        label: 'CALLE BETANCOURT, CIELITO MERCEDES',
        children: [{
          id: 7,
          label: 'CARAZA VILLEGAS, ISABEL FLORISA'
          }, {
          id: 8,
          label: 'CARRIÓN NEIRA, JORGE AUGUSTO'
        }]
        },{
        id: 4,
        label: 'DIAZ SALINAS, ANA MARIA'
        },{
        id: 5,
        label: 'DUEÑAS ARISTISABAL, ANTONIO '
      }],
      value8: '',
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

  deleteDocumentsPublish(intDocID) {
    debugger;
    this.$confirm('El documento sera eliminado: "'+this.gridDataNewTitle.strTitle+'". Continuar?', 'Eliminando', {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning'
    }).then(() => {
      debugger;
    documentService.deleteDocumentsPublish(this.intDocID)
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
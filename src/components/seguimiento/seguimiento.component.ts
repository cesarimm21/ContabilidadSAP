import {Component} from 'vue-property-decorator'
import Vue from 'vue'
import 'font-awesome/css/font-awesome.css';
import {Pagination, PaginationEvent} from 'vue-pagination-2';
import * as CONFIG from '../../Config';
import '../../assets/css/versiones.scss';
import Modal from 'modal-vue';
import axios from 'axios';
import { Notification } from 'element-ui';
import { DatePicker, Message } from '@/typings';
import versionesService from '@/components/service/versiones.service';
import documentsService from '@/components/service/documents.service';
@Component({
  name: 'versiones',
  components: { Pagination,Modal}
})
export default class Versiones extends Vue {
  gridData : any;
  gridDataVersion:any;
  rowSelected:any;
  FormSearch:any;
  EstadoDoc:any;
  dialogEditarVisible:any;
  modalVisualizar:any;
  DataUsuario:any;
  FormSearchUsu:any;
  currentRow:any;
  rowselectedTable:any;
  rowSelectedEdit:any;
  options = {  day: '2-digit',month: '2-digit', year: 'numeric' };
  pagina:number=1;
  RegistersForPage2:number=6;
  totalRegistros1:number=(this.RegistersForPage2);
  paginaNumero:number =1;
  RegistersForPage:number = 6;
  totalRegistros:number = this.RegistersForPage;
  dataComplet:any;
  dataUsuarioPagina:any;
  loadingGet:boolean=true;
  constructor(){
    super();

    this.ChechAccess();
    this.GetAllVersion();
    this.loadingData();
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

  GetAllVersion(){
    debugger;
    documentsService.getAllEstadoDocumentos()
    .then(response => {
      debugger;
      this.dataComplet = response;    
      this.totalRegistros=this.dataComplet.Count;
      var data=this.dataComplet.Data;      
      this.gridData = data.slice(this.RegistersForPage*(this.paginaNumero-1), this.RegistersForPage*(this.paginaNumero));
      this.loadingGet=false;
    })
    .catch(e =>{
      debugger;
      this.openMessageError('Error al cargar versiones');
    })
  }
  SearchEstadoDocumento(FormSearch){
    this.loadingGet=true;
    debugger;
    if(this.FormSearch.dtmFechaCrea==''){
        console.log(this.FormSearch.dtmFechaCrea);
    }
    else{
      this.FormSearch.dtmFechaCrea=this.FormSearch.dtmFechaCrea.toLocaleDateString('es-PE', this.options);
    }    
    console.log(this.FormSearch.dtmFechaCrea);
    
    documentsService.SearchEstadoDocumento(FormSearch)
    .then(response =>{
      this.dataComplet=response;
      // console.log(response);
      
      this.totalRegistros=this.dataComplet.Count;
      var data=this.dataComplet.Data;
      this.gridData = data.slice(this.RegistersForPage*(this.paginaNumero-1), this.RegistersForPage*(this.paginaNumero));
      this.loadingGet=false;
    })
    .catch(e =>{
      this.openMessageError('Error al consultar Estado de Documentos');
      console.log(e)
    })
    }
  loadingData(){
    versionesService.loadingData()
    .then(response => {
      this.dataUsuarioPagina = response;
      this.totalRegistros1=this.dataUsuarioPagina.Count;
      var data=this.dataUsuarioPagina.Data;      
      this.DataUsuario = data.slice(this.RegistersForPage2*(this.pagina-1), this.RegistersForPage2*(this.pagina));
      this.loadingGet=false;
    })
    .catch(e =>{
      this.openMessageError('Error al cargar Usuarios');
      console.log(e);
    })
  }
  SearchVersiones(FormSearch){    
    if(this.FormSearch.dtmInic!=''&&this.FormSearch.dtmFin!=''){ 
      try{
        this.FormSearch.dtmInic=this.FormSearch.dtmInic.toLocaleDateString('es-PE', this.options); 
        this.FormSearch.dtmFin=this.FormSearch.dtmFin.toLocaleDateString('es-PE', this.options);
      }
      catch(e){
        if(e.message=="this.FormSearch.dtmInic.toLocaleDateString is not a function"){
          this.FormSearch.dtmInic=this.FormSearch.dtmInic,
          this.FormSearch.dtmFin=this.FormSearch.dtmFin.toLocaleDateString('es-PE', this.options);
        }
        else{
          this.FormSearch.dtmFin=this.FormSearch.dtmFin;
        }
      }     
    } 
    else if((this.FormSearch.dtmInic==''&&this.FormSearch.dtmFin!='')||(this.FormSearch.dtmInic!=''&&this.FormSearch.dtmFin=='')){
      if(this.FormSearch.dtmInic==''){
        this.FormSearch.dtmInic='01/01/2000'
      }
      else if(this.FormSearch.dtmFin==''){
        this.FormSearch.dtmFin=='01/01/2050'
      }
    }
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    versionesService.SearchVersiones(FormSearch)
    .then(response =>{
     this.dataComplet = response;     
      this.totalRegistros=this.dataComplet.Count;
      var data=this.dataComplet.Data;      
      this.gridData = data.slice(this.RegistersForPage*(this.paginaNumero-1), this.RegistersForPage*(this.paginaNumero));      
    })
    .catch(e =>{
      this.openMessageError('Error al buscar versiones');
      console.log(e)
    })
  }
  SearchUsuarios(FormSearchUsu){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    versionesService.SearchUsuarios(FormSearchUsu)
    .then(response =>{
      // this.DataUsuario = JSON.parse(JSON.stringify(response.data));
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
  clearDataSearch(){
    this.loadingGet=true;
    this.FormSearch.CodDocumento='';
    this.FormSearch.strTitle='';
    this.FormSearch.dtmFechaCrea='';
    this.FormSearch.EstadoAprobacion='';
    this.GetAllVersion();
  }
  GetRowData(index,row,FormSearch){
    this.rowSelectedEdit = row;
    this.FormSearch=row;
    this.FormSearch.intCodUsuario=row.intCodUsuario,
    this.FormSearch.strUsuario=row.strUsuario,
    this.FormSearch.strNombres=row.strNombres,
    this.FormSearch.strApellidoPat=row.strApellidoPat,
    this.FormSearch.strApellidoMat=row.strApellidoMat,
    this.FormSearch.strTitle='',
    this.FormSearch.strCodDocumento='',
    // this.FormSearch.dtmInic='',
    // this.FormSearch.dtmFin='',
    this.modalVisualizar=false;
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
  cambioPaginaUsuario(){
      var data2=this.dataUsuarioPagina.Data;
        this.DataUsuario = data2.slice(this.RegistersForPage2*(this.pagina-1), this.RegistersForPage2*(this.pagina));
      }
  getDateString(fecha:string){
      var dateString = new Date(fecha).toLocaleDateString('es-PE', this.options)
      return dateString;
  }
  getEstadoString(estado:string){
    if(estado=="A"){
      return "APROBADO"
    }
    else if(estado=="M"){
      return "MODIFICADO"
    }
    else if(estado=="P"){
      return "PENDIENTE"
    }
    else if(estado=="R"){
      return "RECHAZADO"
    }
    else {return "";}

    // var dateString = new Date(fecha).toLocaleDateString('es-PE', this.options)
    // return dateString;
}


  tableRowClassName(row, rowIndex) {
    if (row === undefined || row.EstadoAprobacion === undefined) return '';
    if (row.EstadoAprobacion === 'R'){
      return 'rechazado-row';
    } else if (row.EstadoAprobacion === 'A') {
      return 'aprobado-row';
    } else if (row.EstadoAprobacion === 'M'){
      return 'modificado-row';
    }
    return '';
  }

  data(){
    return{
        activeName:'first',
        formLabelWidth: '120px',
        modalVisualizar:false,
        currentRow: null,
        rowselectedTable:null,
        rowSelectedEdit:[],
        value2:'',
        gridData: [],
        gridDataVersion:[],
        DataUsuario:[],
        rowSelected:[],
        value3:'',
        FormSearch:{
          CodDocumento:'',
          strTitle:'',
          dtmFechaCrea:'',
          EstadoAprobacion:''     
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
        value: '' ,
        totalRegistros:0,
        totalRegistros1:0,
        EstadoDoc: [{
          value: 'A',
          label: 'APROBADO'
        }, {
          value: 'M',
          label: 'MODIFICADO'
        },{
          value:'P',
          label:'PENDIENTE'
        },{
          value:'R',
          label:'RECHAZADO'
        }],    
    }
}
}

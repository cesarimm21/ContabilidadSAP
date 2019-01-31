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
@Component({
  name: 'versiones',
  components: { Pagination,Modal}
})
export default class Versiones extends Vue {
  gridData : any;
  gridDataVersion:any;
  rowSelected:any;
  FormSearch:any;
  FormVersion:any;
  dialogEditarVisible:any;
  modalVisualizar:any;
  DataUsuario:any;
  FormSearchUsu:any;
  currentRow:any;
  rowselectedTable:any;
  rowSelectedEdit:any;
  options = {  day: '2-digit',month: '2-digit', year: 'numeric' };
  pagina:number=1;
  RegistersForPage2:number=5;
  totalRegistros1:number=(this.RegistersForPage2);
  paginaNumero:number =1;
  RegistersForPage:number = 5;
  totalRegistros:number = this.RegistersForPage;
  dataComplet:any;
  dataUsuarioPagina:any;
  loadingGet:boolean=false;
  loadingTable1:boolean=true;
  loadingTable2:boolean=true;
  modalVisualizarPdf:boolean=false;
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
    versionesService.GetAllVersion()
    .then(response => {
      this.dataComplet = response;    
      this.totalRegistros=this.dataComplet.Count;
      var data=this.dataComplet.Data;      
      this.gridData = data.slice(this.RegistersForPage*(this.paginaNumero-1), this.RegistersForPage*(this.paginaNumero));
      this.loadingTable1=false;
    })
    .catch(e =>{
      this.openMessageError('Error al cargar versiones');
      this.loadingTable1=false;
    })
  }

  viewer(){
    debugger;
    
    if(this.FormVersion.Archivo=="W"){      
      return CONFIG.Local_PathVersiones+this.FormVersion.CodDocumentoGenerado+"_"+this.FormVersion.intVersion+".pdf";
    }
    if(this.FormVersion.Archivo=="E"){
      return CONFIG.Local_PathVersiones+this.FormVersion.CodDocumentoGenerado+"_"+this.FormVersion.intVersion+".pdf";
    }   
  }
  OpenVisualizarVersiones(index, rows){
    debugger;
    this.loadingGet=true;
    this.FormVersion.Archivo=rows.Archivo;
    this.FormVersion.CodDocumentoGenerado=rows.CodDocumentoGenerado;
    this.FormVersion.intVersion=rows.intVersion;
    versionesService.VersionesView(this.FormVersion)
    .then(response=>{
      if(response=="correcto"){
        this.modalVisualizarPdf=true;
        this.loadingGet=false;
      }
    }).catch(e=>{
      this.openMessageError('Error al generar documento');
      this.loadingGet=false;
    })
  }

  loadingData(){
    versionesService.loadingData()
    .then(response => {
      this.dataUsuarioPagina = response;
      this.totalRegistros1=this.dataUsuarioPagina.Count;
      var data=this.dataUsuarioPagina.Data;      
      this.DataUsuario = data.slice(this.RegistersForPage2*(this.pagina-1), this.RegistersForPage2*(this.pagina));
      this.loadingTable2=false;
    })
    .catch(e =>{
      this.openMessageError('Error al cargar Usuarios');
      console.log(e);
      this.loadingTable2=false;
    })
  }
  SearchVersiones(FormSearch){ 
       this.loadingTable1=true;
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
    debugger;
    versionesService.SearchVersiones(FormSearch)
    .then(response =>{
     this.dataComplet = response;     
      this.totalRegistros=this.dataComplet.Count;
      var data=this.dataComplet.Data;      
      this.gridData = data.slice(this.RegistersForPage*(this.paginaNumero-1), this.RegistersForPage*(this.paginaNumero));      
      this.loadingTable1=false;
    })
    .catch(e =>{
      this.openMessageError('Error al buscar versiones');
      this.loadingTable1=false;
      
    })
  }
  SearchUsuarios(FormSearchUsu){
    this.loadingTable2=true;
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    versionesService.SearchUsuarios(FormSearchUsu)
    .then(response =>{
      // this.DataUsuario = JSON.parse(JSON.stringify(response.data));
      this.dataUsuarioPagina = response;
      this.totalRegistros1=this.dataUsuarioPagina.Count;
      var data=this.dataUsuarioPagina.Data;      
      this.DataUsuario = data.slice(this.RegistersForPage2*(this.pagina-1), this.RegistersForPage2*(this.pagina));
      this.loadingTable2=false;
    })
    .catch(e =>{
      this.openMessageError('Error al consultar usuarios');
      console.log(e)
      this.loadingTable2=false;
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
    this.FormSearchUsu.CodDocumentoGenerado='';
    this.loadingData();
  }
  clearDataSearch(){
    this.FormSearch.intCodUsuario='';
    this.FormSearch.strApellidoPat='';
    this.FormSearch.strApellidoMat='';
    this.FormSearch.strNombres='';
    this.FormSearch.strTitle='';
    this.FormSearch.strUsuario='';
    this.FormSearch.CodDocumentoGenerado='';
    this.FormSearch.dtmInic='';
    this.FormSearch.dtmFin='';
    this.GetAllVersion();
  }
  GetRowData(index,row,FormSearch){
    debugger;
    this.rowSelectedEdit = row;
    this.FormSearch.intCodUsuario=row.intCodUsuario,
    this.FormSearch.strUsuario=row.strUsuario,
    this.FormSearch.strNombres=row.Nombres,
    this.FormSearch.strApellidoPat=row.ApellidoPaterno,
    this.FormSearch.strApellidoMat=row.ApellidoMaterno,
    this.FormSearch.strTitle='',
    this.FormSearch.CodDocumentoGenerado='',
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
  data(){
    return{
        activeName:'first',
        formLabelWidth: '120px',
        modalVisualizar:false,
        currentRow: null,
        rowselectedTable:null,
        modalVisualizarPdf:false,
        rowSelectedEdit:[],
        value2:'',
        gridData: [],
        gridDataVersion:[],
        DataUsuario:[],
        rowSelected:[],
        value3:'',
        FormSearch:{
          CodPersona:'',
          strApellidoPat:'',
          strApellidoMat:'',
          strNombres:'',
          strTitle: '', 
          strUsuario: '',
          CodDocumentoGenerado:'',
          dtmInic:'',
          dtmFin:''         
        },
        FormSearchUsu:{
          intCodUsuario:'',
          strDominio : '',
          strUsuario: '',
          Nombres:'',
          ApellidoPaterno:'',
          ApellidoMaterno:'',
          strTitle:'',
          CodDocumentoGenerado:''
        },
        FormVersion:{
          Archivo:'',
          CodDocumentoGenerado:'',
          intVersion:''
        },
        value: '' ,
        totalRegistros:0,
        totalRegistros1:0      
    }
}
}

import {Component} from 'vue-property-decorator'
import Vue from 'vue'
import 'font-awesome/css/font-awesome.css';
import {Pagination, PaginationEvent} from 'vue-pagination-2';
import * as CONFIG from '../../Config';
import '../../assets/css/versiones.scss';
import Modal from 'modal-vue';
import axios from 'axios';
import { Notification } from 'element-ui';
@Component({
  name: 'versiones',
  components: { Pagination,Modal}
})
export default class ReportesComponent extends Vue {
  gridData : any;
  gridDataVersion:any;
  rowSelected:any;
  FormSearch:any;
  dialogEditarVisible:any;
  modalVisualizar:any;
  DataUsuario:any;
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
    this.$router.push('/barmenu/inicio');
    // axios.get(CONFIG.API_URL+'versiones/get/all')
    // .then(response => {
    //   this.dataComplet = JSON.parse(JSON.stringify(response.data));    
    //   this.totalRegistros=this.dataComplet.Count;
    //   var data=this.dataComplet.Data;      
    //   this.gridData = data.slice(this.RegistersForPage*(this.paginaNumero-1), this.RegistersForPage*(this.paginaNumero));
    // })
    // .catch(e =>{
    //   this.openMessageError('Error al cargar versiones');
    // })
  }
  loadingData(){
    this.$router.push('/barmenu/inicio');
    // axios.get(CONFIG.API_URL+'usuario/get/all')
    // .then(response => {
    //   // this.DataUsuario = JSON.parse(JSON.stringify(response.data));
    //   this.dataUsuarioPagina = JSON.parse(JSON.stringify(response.data));
    //   this.totalRegistros1=this.dataUsuarioPagina.Count;
    //   var data=this.dataUsuarioPagina.Data;      
    //   this.DataUsuario = data.slice(this.RegistersForPage2*(this.pagina-1), this.RegistersForPage2*(this.pagina));
    //   // console.log(this.totalRegistros1);
      
    // })
    // .catch(e =>{
    //   this.openMessageError('VERSION PRUEBA (INTERFAZ DE REPORTES)');
    //   console.log(e);
    // })
  }
  SearchVersiones(FormSearch){
    // var headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    // axios.post(CONFIG.API_URL+'versiones/search', FormSearch)
    // .then(response =>{
    //  this.dataComplet = JSON.parse(JSON.stringify(response.data));
    //   this.totalRegistros=this.dataComplet.Count;
    //   var data=this.dataComplet.Data;      
    //   this.gridData = data.slice(this.RegistersForPage*(this.paginaNumero-1), this.RegistersForPage*(this.paginaNumero));      
    // })
    // .catch(e =>{
    //   this.openMessageError('Error al buscar versiones');
    //   console.log(e)
    // })
  }
  SearchUsuarios(FormSearchUsu){
    // console.log(FormSearchUsu)
    // var headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    // axios.post(CONFIG.API_URL+'usuario/search', FormSearchUsu)
    // .then(response =>{
    //   // this.DataUsuario = JSON.parse(JSON.stringify(response.data));
    //   this.dataUsuarioPagina = JSON.parse(JSON.stringify(response.data));
    //   this.totalRegistros1=this.dataUsuarioPagina.Count;
    //   var data=this.dataUsuarioPagina.Data;      
    //   this.DataUsuario = data.slice(this.RegistersForPage2*(this.pagina-1), this.RegistersForPage2*(this.pagina));
    // })
    // .catch(e =>{
    //   this.openMessageError('Error al consultar usuarios');
    //   console.log(e)
    // })
  }
  GetRowData(index,row,FormSearch){
    // this.rowSelectedEdit = row;
    // console.log(row);
    // this.FormSearch=row;
    // this.FormSearch.intCodUsuario=row.intCodUsuario,
    // this.FormSearch.strUsuario=row.strUsuario,
    // this.FormSearch.strNombres=row.strNombres,
    // this.FormSearch.strApellidoPat=row.strApellidoPat,
    // this.FormSearch.strApellidoMat=row.strApellidoMat,
    // this.FormSearch.strTitle='',
    // this.FormSearch.Codigo='',
    // this.modalVisualizar=false;
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
        rowSelectedEdit:[],
        value2:'',
        gridData: [],
        gridDataVersion:[],
        DataUsuario:[],
        rowSelected:[],
        value3:'',
        FormSearch:{
          intCodUsuario:'',
          strApellidoPat:'',
          strApellidoMat:'',
          strNombres:'',
          strTitle: '', 
          strUsuario: '',
          Codigo:''         
        },
        FormSearchUsu:{
          intCodUsuario:'',
          strDominio : '',
          strUsuario: '',
          strNombres:'',
          strApellidoPat:'',
          strApellidoMat:'',
          strTitle:'',
          Codigo:''
        },
        value: '' ,
        totalRegistros:0,
        totalRegistros1:0      
    }
}
}

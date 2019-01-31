import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import router from '../../router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import InfiniteScroll from 'vue-infinite-scroll';
import Dominio from '@components/dominio/dominio.vue';
import '../../assets/css/dominio.scss';
import * as CONFIG from '../../Config';
import GLOBAL from '../../Global';
import axios from 'axios';
import { Notification } from 'element-ui';
import dominioService from '@/components/service/dominio.service';
@Component({
   name: 'dominio',

})
export default class DominioComponent extends Vue {
  gridData : any;
  FormAgregar : any;
  dialogTableVisible:any;
  rowSelectedEdit :any;
  dialogEditarVisible: boolean = false;
  dialogAgregarVisible:boolean=false;
  paginaNumero:number =1;
  RegistersForPage:number = 5;
  totalRegistros:number = this.RegistersForPage;
  dataComplet:any;
  loadingGet:boolean=true;
  options = {  day: '2-digit',month: '2-digit', year: 'numeric' };
  constructor(){
    super()
    this.ChechAccess();
    this.loadingData();
    this.dialogTableVisible=false;
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

  loadingData(){    
    console.log(this.FormAgregar);
    debugger;
    dominioService.loadingData()
    .then(response => {
      this.dataComplet = response;    
      this.totalRegistros=this.dataComplet.Count;
      var data=this.dataComplet.Data;      
      this.gridData = data.slice(this.RegistersForPage*(this.paginaNumero-1), this.RegistersForPage*(this.paginaNumero));
      this.loadingGet=false;
    })
    .catch(e =>{
      console.log('Error: '+e)
    })
  }
  AgregarDominio(FormAgregar){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    dominioService.AgregarDominio(this.FormAgregar)
    .then(response =>{
      this.openMessage('Dominio guardado correctamente: '+response)
      this.loadingData();
    })
    .catch(e =>{
      console.log(e)
      if(e.response.status === 401){ // token no valido
        this.redirectLogin(e.response.statusText+', Vuelva a Iniciar Sesion');
      }
      else{
        this.openMessageError('Error al agregar usuario');
      }
    })
    this.dialogAgregarVisible = false;
    this.dialogTableVisible = false;    
  }
  EditarDominio(){
    this.rowSelectedEdit.strUsuarioModif = localStorage.getItem('User_Usuario');
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    dominioService.EditarDominio(this.rowSelectedEdit)
    .then(response =>{
      this.openMessage('Dominio modificado correctamente: '+response)
      this.loadingData();
    })
    .catch(e =>{
      console.log(e);
      if(e.response.status === 401){ // token no valido
        this.redirectLogin(e.response.statusText+', Vuelva a Iniciar Sesion');
      }
      else{
        this.openMessageError('Error al eliminar dominio');
      }
    })
    this.dialogEditarVisible = false;
  }
  EliminarDominio(row){
    dominioService.EliminarDominio(row)
    .then(response => {
      this.openMessage('Dominio eliminado correctamente: '+response);
      this.loadingData();
    })
    .catch(e =>{
      console.log(e)
      if(e.response.status === 401){ // token no valido
        this.redirectLogin(e.response.statusText+', Vuelva a Iniciar Sesion');
      }
      else{
        this.openMessageError('Error al editar dominio');
      }
    })
    this.dialogEditarVisible = false;
  }
  handleAgregar(){
    this.dialogAgregarVisible = true
  }
  handleEdit(index, row){
    this.rowSelectedEdit = row;
    this.dialogEditarVisible = true
  }

  handleDelete(index, row){
    this.$confirm('Desea Eliminar el Dominio: '+row.strDescripcion +' ?', 'Eliminar', {
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      type: 'warning'
    }).then(() => {
      this.EliminarDominio(row);
    }).catch(() => {
    });
  }
  openMessage(strMessage : string) {
    this.$message({
      showClose: true,
      message: strMessage,
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
  cambioPagina(){
    var data1=this.dataComplet.Data;
    this.gridData = data1.slice(this.RegistersForPage*(this.paginaNumero-1), this.RegistersForPage*(this.paginaNumero));
  }
  getDateString(fecha:string){
    var dateString = new Date(fecha).toLocaleDateString('es-PE', this.options)
    return dateString;
  }
  redirectLogin(msg){
    Notification.warning(msg)
    window.sessionStorage.clear();
    router.push('/')
  }
  data() {

    return {
      gridData: [],
      FormAgregar: {
        strDescripcion:'',
        strUsuarioCrea:localStorage.getItem('User_Usuario')
      },  
      rowSelectedEdit:[],
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: '120px'
    };
  }
}
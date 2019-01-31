import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import router from '../../router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import InfiniteScroll from 'vue-infinite-scroll';
import Usuario from '@components/usuario/usuario.vue';
import '../../assets/css/usuario.scss';
import * as CONFIG from '../../Config';
import { Notification } from 'element-ui';
import { Loading } from 'element-ui';
import usuarioService from '@/components/service/usuario.service';

@Component({
   name: 'usuario',

})
export default class UsuarioComponent extends Vue {
  gridData : any;
  gridDataPersonas : any;
  dataDominios :any;
  dataRoles : any;
  // dataJerarquia:any;
  // dataTipoPersona:any;
//load personas
  dataPersonaPagina:any;
  DataPersona:any;
  RegistersForPage2:number=10;
  totalRegistros1:number=(this.RegistersForPage2);
  FormSearchPers:any;
  //------
  FormAgregar : any;
  FormSearch:any;
  rowSelectedEdit :any;
  dialogTableVisible: boolean = false;
  dialogEditarVisible: boolean = false;
  VisualizarPersonas:boolean=false;
  pagina:number=1;
  totalRegistros:number=5;
  RegistersForPage:number=5;
  dataComplet:any;
  loadingGet:boolean=true;
  loadingGetPersona:boolean=true;
  constructor(){
    super()
    this.ChechAccess();
    this.getDominios();
    this.getRoles();
    this.loadingData();
    this.loadingDataPersona();
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
        if(listaAccesos[i].strNombre === 'Usuarios'){
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
    debugger;
    usuarioService.loadingData()
    .then(response => {
      this.dataComplet=response;
      this.totalRegistros=this.dataComplet.Count;
      var data=this.dataComplet.Data;
      this.gridData = data.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
      this.loadingGet=false;

    })
    .catch(e =>{
      this.openMessageError('Error al cargar usuarios');
      console.log(e);
      this.loadingGet=false;
    })
  }
  loadingDataPersona(){
    debugger;
    usuarioService.loadingDataPersona()
    .then(response => {
      this.dataPersonaPagina=response;
      this.totalRegistros1=this.dataPersonaPagina.Count;
      var data=this.dataPersonaPagina.Data;
      this.gridDataPersonas = data.slice(this.RegistersForPage2*(this.pagina-1), this.RegistersForPage2*(this.pagina));
      this.loadingGetPersona=false;
    })
    .catch(e =>{
      this.openMessageError('Error al cargar Personas');
      console.log(e);
      this.loadingGetPersona=false;
    })
  }
  getDominios(){
    usuarioService.getDominios()
    .then(response => {
      this.dataDominios = response;
    })
    .catch(e =>{
      this.openMessageError('Error al cargar dominios');
      console.log(e);
    })
  }
  getRoles(){
    usuarioService.getRoles()
    .then(response => {
      this.dataRoles = response;
      
    })
    .catch(e =>{
      this.openMessageError('Error al cargar roles');
      console.log(e);
    })
  }
  AgregarUsuario(FormAgregar){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    debugger;
    if(this.FormAgregar.Nombres==''){
      this.$message({
        type: 'info',
        message: 'Llene los campos necesarios'
      });
    }
    if(this.FormAgregar.Nombres==''){
      this.$message({
        type: 'info',
        message: 'Llene los campos necesarios'
      });
    }
    if(this.FormAgregar.ApellidoPaterno==''){
      this.$message({
        type: 'info',
        message: 'Llene los campos necesarios'
      });
    }
    if(this.FormAgregar.ApellidoMaterno==''){
      this.$message({
        type: 'info',
        message: 'Llene los campos necesarios'
      });
    }
    if(this.FormAgregar.Email==''){
      this.$message({
        type: 'info',
        message: 'Llene los campos necesarios'
      });
    }
    if(this.FormAgregar.strPassword==''){
      this.$message({
        type: 'info',
        message: 'Llene los campos necesarios'
      });
    }
    else{
      usuarioService.AgregarUsuario(this.FormAgregar)
      .then(response =>{
        this.openMessage('Usuario guardado correctamente: '+response)
        this.loadingData();
        this.FormAgregar.Nombres='',
        this.FormAgregar.ApellidoPaterno='',
        this.FormAgregar.ApellidoMaterno='',
        this.FormAgregar.strDominio='',
        this.FormAgregar.strUsuario='',
        this.FormAgregar.CodPersona='',
        this.FormAgregar.strPassword='',
        this.FormAgregar.strCargo='',
        this.FormAgregar.Email=''
      })
      .catch(e =>{
        this.openMessageError('Error al agregar usuario');
        console.log(e)
      })
      this.dialogTableVisible = false;
    }
    
  }
  EliminarUsuario(row){
    usuarioService.EliminarUsuario(row)
    .then(response => {
      this.openMessage('Usuario eliminado correctamente: '+response);
      this.loadingData();
    })
    .catch(e =>{
      this.openMessageError('Error al eliminar usuario');
      console.log(e);
    })
  }
  EditarUsuario(){
    debugger;
    this.rowSelectedEdit.strUsuarioModif = localStorage.getItem('User_Usuario');
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    usuarioService.EditarUsuario(this.rowSelectedEdit)
    .then(response =>{
      this.openMessage('Usuario modificado correctamente: '+response)
      this.loadingData();
    })
    .catch(e =>{
      this.openMessageError('Error al editar usuario');
      console.log(e)
    })
    this.dialogEditarVisible = false;
  }
  ConsultarUsuarios(FormSearch){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    usuarioService.ConsultarUsuarios(FormSearch)
    .then(response =>{
      this.dataComplet=response;
      this.totalRegistros=this.dataComplet.Count;
      var data=this.dataComplet.Data;
      this.gridData = data.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
    })
    .catch(e =>{
      this.openMessageError('Error al consultar usuarios');
      console.log(e)
    })
  }
  LimpiarUsuarios(){
    this.FormSearch.intCodUsuario='',
    this.FormSearch.strDominio='',
    this.FormSearch.strUsuario='',
    this.FormSearch.strNombres='',
    this.FormSearch.strApellidoPat='',
    this.FormSearch.strApellidoMat='',
    this.loadingData();
  }
  GetRowData(index,row,FormSearchPers){
    debugger;
    this.FormAgregar.CodPersona=row.CodPersona,
    this.FormAgregar.Nombres=row.Nombres,
    this.FormAgregar.ApellidoPaterno=row.ApellidoPaterno,
    this.FormAgregar.ApellidoMaterno=row.ApellidoMaterno,
    this.FormAgregar.Email=row.Email,
    this.VisualizarPersonas=false
  }
  handleAgregar(){
    this.getDominios();
    this.getRoles();
    this.dialogTableVisible = true
  }
  handleEdit(index, row){
    debugger;
    this.getDominios();
    this.getRoles();
    this.rowSelectedEdit = row;
    this.dialogEditarVisible = true
  }
  SearchPersonas(FormSearchPers){
    this.loadingGetPersona=true;
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    usuarioService.SearchPersonas(FormSearchPers)
    .then(response =>{
      this.dataPersonaPagina = response;        
      this.totalRegistros1=this.dataPersonaPagina.Count;
      var data=this.dataPersonaPagina.Data;      
      this.gridDataPersonas = data.slice(this.RegistersForPage2*(this.pagina-1), this.RegistersForPage2*(this.pagina));
      this.loadingGetPersona=false;
    })
    .catch(e =>{
      this.openMessageError('Error al consultar usuarios');
      console.log(e)
      this.loadingGetPersona=false;
    })
  }
  handleDelete(index, row){
    this.$confirm('Desea Eliminar el Usuario: '+row.strUsuario +' ?', 'Eliminar', {
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      type: 'warning'
    }).then(() => {
      this.EliminarUsuario(row);
    }).catch(() => {
    });
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
cambioPagina(){
  var data1=this.dataComplet.Data;
    this.gridData = data1.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
  }
  cambioPagina1(){
    var data1=this.dataPersonaPagina.Data;
      this.gridDataPersonas = data1.slice(this.RegistersForPage2*(this.pagina-1), this.RegistersForPage2*(this.pagina));
    }
  removeDomain(item) {
    var index = this.FormAgregar.domains.indexOf(item);
    if (index !== -1) {
      this.FormAgregar.domains.splice(index, 1);
    }
  }
  addDomain() {
    this.FormAgregar.domains.push({
      key: Date.now(),
      value: ''
    });
  }
  cancelAdd(){
    this.dialogTableVisible = false,
    this.FormAgregar.Nombres='',
    this.FormAgregar.ApellidoPaterno='',
    this.FormAgregar.ApellidoMaterno='',
    this.FormAgregar.strDominio='',
    this.FormAgregar.strUsuario='',
    this.FormAgregar.CodPersona='',
    this.FormAgregar.strPassword='',
    this.FormAgregar.strCargo='',
    this.FormAgregar.Email=''
  }
  data() {

    return {
      gridData: [],
      gridDataPersonas:[],
      dataDominios:[],
      dataRoles : [],
      // dataJerarquia:[],
      // dataTipoPersona:[],
      rowSelectedEdit:[],
      loading2: true,
      VisualizarPersonas:false,
      tipo: [{
        value: 'B',
        label: 'B'
      }, {  
        value: 'W',
        label: 'W'
      }],
      FormAgregar: {
        Nombres:'',
        ApellidoPaterno:'',
        ApellidoMaterno:'',
        strDominio : '',
        strUsuario: '',
        CodPersona:'',
        strPassword:'',
        strCargo: '',
        // strCodPosicion:'',
        // intCodTipoPersona:'',
        chrTipoLogeo:'',
        strUsuarioCrea:localStorage.getItem('User_Usuario'),
        Email:'',
        domains: [{
          key: 1,
          value: ''
        }],
      },
      FormSearch:{
        intCodUsuario:'',
        strDominio : '',
        strUsuario: '',
        Nombres:'',
        ApellidoPaterno:'',
        ApellidoMaterno:''
      },
      FormSearchPers:{
        CodPersona:'',
        Nombres:'',
        ApellidoPaterno:'',
        ApellidoMaterno:'',
        NroDocumento:''
      },
      loadingGet:true,
      loadingGetPersona:true,
      formLabelWidth: '120px'
    };
  }
}

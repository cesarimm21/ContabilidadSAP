import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import router from '../../router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import InfiniteScroll from 'vue-infinite-scroll';
import Roles from '@components/roles/roles.vue';
import '../../assets/css/roles.scss';
import * as CONFIG from '../../Config';
import { Notification } from 'element-ui';
import rolesService from '@/components/service/roles.service';

@Component({
   name: 'roles',
})
export default class RolesComponent extends Vue {
  gridData : any;
  FormAgregar : any;
  FormSearch:any;
  listaAccesos:any;
  RolAccesoSelected:any
  rowSelectedEdit :any;  
  defaultSelectAdd:any=[];
  defaultSelectEdit:any = [];
  dialogAgregarVisible: boolean = false;
  dialogEditarVisible: boolean = false;
  paginaNumero:number =1;
  RegistersForPage:number = 5;
  totalRegistros:number = this.RegistersForPage;
  dataComplet:any;
  valueLista :any;
  loadingGet:boolean=true;
  options = {  day: '2-digit',month: '2-digit', year: 'numeric' };
  Accesos:{
    intCodAcceso:'',
    strDescripcion:''
  }

  constructor(){
    super()
    this.ChechAccess();
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
        if(listaAccesos[i].strNombre === 'Rol'){
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
    rolesService.loadingData()
    .then(response => {
      this.dataComplet = response;    
      this.totalRegistros=this.dataComplet.Count;
      var data=this.dataComplet.Data;      
      this.gridData = data.slice(this.RegistersForPage*(this.paginaNumero-1), this.RegistersForPage*(this.paginaNumero));
      this.loadingGet=false;
    })
    .catch(e =>{
      this.openMessageError('Error al cargar roles');
      console.log(e);
    })
  }
  getAccesos(){
    rolesService.getAccesos()
    .then(response => {
      this.listaAccesos = response;
    })
    .catch(e =>{
      this.openMessageError('Error al cargar Accesos');
      console.log(e);
    })
  }
  getRolAcceso(intRol){
    rolesService.getRolAcceso(intRol)
    .then(response => {
      this.RolAccesoSelected = [];
      this.RolAccesoSelected = response;
      this.defaultSelectEdit = [];
      for (let i = 0; i < this.RolAccesoSelected.Count; i++) {
        this.defaultSelectEdit.push(this.RolAccesoSelected.Data[i].intCodAcceso);
      }
    })
    .catch(e =>{
      this.openMessageError('Error al cargar Rol-Acceso');
      console.log(e);
    })
  }

  AgregarRol(FormAgregar){
    debugger;
    rolesService.AgregarRol(this.FormAgregar)
    .then(response =>{
      this.openMessage('Rol guardado correctamente: '+response)
      this.loadingData();
      this.defaultSelectAdd=[0],
      this.FormAgregar.strRolDescripcion=''
    })
    .catch(e =>{
      this.openMessageError('Error al agregar rol');
      console.log(e)
    })
    this.dialogAgregarVisible = false;
  }
  CancelRol(){
    this.defaultSelectAdd=[0],
    this.FormAgregar.strRolDescripcion='',
    this.dialogAgregarVisible = false;    
  }
  EditarRol(){
    if(this.rowSelectedEdit.lstAccesos == null){
      this.rowSelectedEdit.lstAccesos = this.RolAccesoSelected.Data;
    }
    debugger;
    this.rowSelectedEdit.strUsuarioModif = localStorage.getItem('User_Usuario');
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    rolesService.EditarRol(this.rowSelectedEdit)
    .then(response =>{
      this.openMessage('Rol Actualizado correctamente: '+response)
      this.loadingData();
    })
    .catch(e =>{
      this.openMessageError('Error al Actualizar rol');
      console.log(e)
    })
    this.dialogEditarVisible = false;
  }
  EliminarRol(row){
    debugger;
    rolesService.EliminarRol(row)
    .then(response => {
      this.openMessage('Rol eliminado correctamente: '+row.strRolDescripcion);
      this.loadingData();
    })
    .catch(e =>{
      this.openMessageError('Error al eliminar rol');
      console.log(e);
    })
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

  handleAgregar(){
    this.getAccesos();
    this.dialogAgregarVisible = true
  }
  handleEdit(index, row){
    this.getAccesos();
    this.getRolAcceso(row.intCodRol);
    this.rowSelectedEdit = [];
    this.rowSelectedEdit = row;
    this.dialogEditarVisible = true
  }
  handleDelete(index, row){ 
    this.$confirm('Desea Eliminar el Rol: '+row.strRolDescripcion +' ?', 'Eliminar', {
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      type: 'warning'
    }).then(() => {
      this.EliminarRol(row);
    }).catch(() => {
    });
  }
  handleChange(value, direction, movedKeys) {
    this.FormAgregar.lstAccesos = [];
    for (let i = 0; i < value.length; i++) {
      this.FormAgregar.lstAccesos.push({
        intCodAcceso: value[i],
        strNombre: localStorage.getItem('User_Usuario')
      });
    }
    //this.FormAgregar.lstAccesos.intCodAcceso = value;
  }
  handleChangeEdit(value, direction, movedKeys) {
    debugger;
    this.rowSelectedEdit.lstAccesos = [];
    for (let i = 0; i < value.length; i++) {
      this.rowSelectedEdit.lstAccesos.push({
        intCodAcceso: value[i],
        strNombre: localStorage.getItem('User_Usuario')
      });
    }
    //this.FormAgregar.lstAccesos.intCodAcceso = value;
  }
  ConsultarRol(FormSearch){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    rolesService.ConsultarRol(FormSearch)
    .then(response =>{
      //this.gridData = JSON.parse(JSON.stringify(response.data));
      this.dataComplet = response;    
      this.totalRegistros=this.dataComplet.Count;
      var data=this.dataComplet.Data;      
      this.gridData = data.slice(this.RegistersForPage*(this.paginaNumero-1), this.RegistersForPage*(this.paginaNumero));
      
    })
    .catch(e =>{
      this.openMessageError('Error al consultar roles');
      console.log(e)
    })
    
  }
  LimpiarRol(){
    this.FormSearch.strRolDescripcion='',
    this.FormSearch.strUsuarioCrea='',
    this.loadingData();
  }
  cambioPagina(){
    var data1=this.dataComplet.Data;
    this.gridData = data1.slice(this.RegistersForPage*(this.paginaNumero-1), this.RegistersForPage*(this.paginaNumero));
  }
  getDateString(fecha:string){
    var dateString = new Date(fecha).toLocaleDateString('es-PE', this.options)
    return dateString;
  }
  data() {
    return {
      gridData: [],
      listaAccesos:[],
      valueLista:[],
      tituloAccesos : ['Lista Accesos', 'Accesos Seleccionados'],
      rowSelectedEdit:[],
      defaultSelectEdit:[],

      FormAgregar: {
        strRolDescripcion:'',
        lstAccesos:[],
        strUsuarioCrea : localStorage.getItem('User_Usuario')
      },
      FormSearch:{
        strRolDescripcion:'',
        strUsuarioCrea:''
      },
      formLabelWidth: '120px',
      defaultSelectAdd:[0],
      
    };
  }
}

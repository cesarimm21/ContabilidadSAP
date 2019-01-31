import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import router from '../../router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import InfiniteScroll from 'vue-infinite-scroll';
import Directorios from '@components/directorios/directorios.vue';
import '../../assets/css/directorios.scss';
import * as CONFIG from '../../Config';
import { Notification } from 'element-ui';
import { Loading } from 'element-ui';
import directoriosService from '@/components/service/directorios.service';
@Component({
    name: 'directorio',
 
 })
 export default class DirectoriosComponent extends Vue {
    public TextTitle:string ="Configuración de Directorios";
    gridData : any;
    FormAgregar : any;
    codigoUrl:any;
    VisualizarEditar:any;
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
        directoriosService.loadingData()
        .then(response => {
          // this.gridData = JSON.parse(JSON.stringify(response.data));
          this.gridData = response;
          this.codigoUrl=this.gridData.Data[0].intCodUrlFolder;
          this.FormAgregar.strUrlPagina=this.gridData.Data[0].strUrlPagina
            
        })
        .catch(e =>{
          this.openMessageError('Error al cargar Directorios');
          console.log(e);
        })
      }
      handChange(){
          if(this.codigoUrl==null){
            this.VisualizarEditar=true
          }
          else{
            this.VisualizarEditar=false
          }
      }
      AgregarDirectorio(FormAgregar){
        // var headers = new Headers();
        // headers.append('Content-Type', 'application/json');
        debugger;
        directoriosService.AgregarDirectorio(this.FormAgregar)
        .then(response =>{
          this.openMessage('Mensaje: '+response)
          this.loadingData();
        })
        .catch(e =>{
          this.openMessageError('Error al agregar directorio');
          console.log(e)
        })
      }
      EditarDirectorio(FormAgregar){
        debugger;
        this.FormAgregar.intCodUrlFolder=this.codigoUrl;
        this.FormAgregar.strUsuarioCrea = localStorage.getItem('User_Usuario');
        // var headers = new Headers();
        // headers.append('Content-Type', 'application/json');
        directoriosService.EditarDirectorio(this.FormAgregar)
        .then(response =>{
          this.openMessage('Directorio modificado correctamente: '+response)
          this.loadingData();
        })
        .catch(e =>{
          this.openMessageError('Error al editar usuario');
          console.log(e)
        })
        this.VisualizarEditar = false;
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
          codigoUrl:'',
          FormAgregar: {
            intCodUrlFolder:'',
            strUrlPagina : '',
            strUsuarioCrea:''
        },
        rules: {
            name: [
              { required: true, message: 'Por Favor Ingrese Directorios', trigger: 'blur' }
            ]
        },
        VisualizarAgregar:false,
        VisualizarEditar:false
        }
    }
 }
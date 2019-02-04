import { Vue, Component } from 'vue-property-decorator';
import Router from 'vue-router';
import '../../assets/css/login.scss';
import 'font-awesome/css/font-awesome.css';
import '../../assets/css/slider.scss';
import { Notification } from 'element-ui';
import * as CONFIG from '../../Config';
import axios from 'axios';
import { Loading } from 'element-ui';
import LogComponent from '@/components/log/log.component';
import GLOBAL from '../../Global';
import usuarioService from '@/components/service/usuario.service';
import accesoDocumentService from '@/components/service/accesoDocument.service';

@Component({
   name: 'login'
})
export default class AccesoDocument extends Vue {
  FormLogin:any;
  gridData: any;
  gridDataUser:any;
  FormSearchPers:any;
  FormSearch:any;
  FormSearchAcceso:any;
  index:any;
  user:any;
  dataComplet:any;
  dataUser:any;
  dataPersona:any;
  GridPersona:any;
  totalRegistros:number=5;
  totalRegistros1:number=5;
  totalRegistros2:number=5;
  RegistersForPage2:number=5;
  RegistersForPage1:number=5;
  RegistersForPage:number=5;
  pagina:number=1;
  pagina1:number=1;
  pagina2:number=1;
  loadingGet:boolean=true;
  loadingGet1:boolean=true;
  loadingGet2:boolean=false;
  loadingGet4:boolean=false;
  VisualizarPersonas:boolean=false;
  VisualizarPersonasAll:boolean=false;
  CodDocumento:any;
  CodPersona:any;
  title:any;
  options = {  day: '2-digit',month: '2-digit', year: 'numeric' };
  constructor(){
    super();    
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
        if(listaAccesos[i].strNombre === 'Accesos de Documentos'){
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
    accesoDocumentService.loadingData()
    .then(response => {
        this.dataComplet=response;
        this.totalRegistros=this.dataComplet.Count;
        var data=this.dataComplet.Data;
        this.gridData = data.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));        
        this.loadingGet=false;
    })
    .catch(e =>{
      this.openMessageError('Error al cargar Documentos');
      console.log(e);
      this.loadingGet=false;
    })
  }
  SearchEmpty(){

    this.FormSearch.CodPersona='',
    this.FormSearch.Nombres='',
    this.FormSearch.ApellidoPaterno='',
    this.FormSearch.ApellidoMaterno='',
    this.FormSearch.intCodTipoPersona='',
    this.GridPersona=[],
    this.totalRegistros2=5;
  }
  SearchPersonasForm(FormSearch){
    this.loadingGet2=true;
    accesoDocumentService.SearchPersonasForm(this.CodDocumento,FormSearch)
    .then(response=>{
      this.dataPersona=response;
      this.totalRegistros2=this.dataPersona.Count;
      var data=this.dataPersona.Data;
      this.GridPersona = data.slice(this.RegistersForPage2*(this.pagina2-1), this.RegistersForPage2*(this.pagina2));        
      this.loadingGet2=false;
    })
    .catch(e=>{
      this.openMessageError('Error al cargar Personas');
      console.log(e);
      this.loadingGet2=false;
    })
  }
  handleEdit(index, row){
    this.title='Acceso a: '+row.strTitle
    this.VisualizarPersonas=true;
    this.loadingGet1=true;
    debugger;
    this.CodDocumento=row.Codigo;
    accesoDocumentService.loadingUserDocumento(row.Codigo)
    .then(response=>{
        this.dataUser=response;
        this.totalRegistros1=this.dataUser.Count;
        var data=this.dataUser.Data;
        this.gridDataUser = data.slice(this.RegistersForPage1*(this.pagina1-1), this.RegistersForPage1*(this.pagina1));        
        this.loadingGet1=false;
    })
    .catch(e=>{
        this.openMessageError('Error al cargar Usuarios del documento');
      console.log(e);
      this.loadingGet1=false;
    })
  }
  InsertUsuarioAcceso(index,row,FormSearch){
    this.$confirm('Desea Agregar el usuario: '+row.ApellidoPaterno +' '+row.ApellidoMaterno+', '+row.Nombres+' ?', 'Agregar', {
      confirmButtonText: 'Agregar',
      cancelButtonText: 'Cancelar',
      type: 'success'
    }).then(() => {
      this.loadingGet4=true;
      this.CodPersona=row.CodPersona;
      debugger;
      accesoDocumentService.InsertUsuarioAcceso(this.CodPersona,this.CodDocumento)
      .then(response=>{
        this.openMessage('EL USUARIO '+response);
        this.SearchPersonasForm(this.FormSearch);
        accesoDocumentService.loadingUserDocumento(this.CodDocumento)
        .then(response=>{
            this.dataUser=response;
            this.totalRegistros=this.dataUser.Count;
            var data=this.dataUser.Data;
            this.gridDataUser = data.slice(this.RegistersForPage1*(this.pagina1-1), this.RegistersForPage1*(this.pagina1));        
            this.loadingGet1=false;
        })
        .catch(e=>{
            this.openMessageError('Error al cargar Usuarios del documento');
          console.log(e);
          this.loadingGet1=false;
        })
        this.loadingGet4=false;
    })
    .catch(e=>{
        this.openMessageError('Error al Agregar usario al acceso de documento');
        console.log(e);
        this.loadingGet4=false;
    })
    }).catch(() => {
      this.openMessageAdvert('Se cancelo la Agregación');
    });
    
  }

  GetRowData(index,row){
    this.$confirm('Desea Eliminar el usuario: '+row.ApellidoPaterno +' '+row.ApellidoMaterno+', '+row.Nombres+' ?', 'Eliminar', {
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
        type: 'warning'
      }).then(() => {
        accesoDocumentService.EliminarUsuarioAcceso(row,this.CodDocumento)
        .then(response => {
            this.openMessage('Persona Acceso eliminado correctamente: '+response);
            accesoDocumentService.loadingUserDocumento(this.CodDocumento)
                .then(response=>{
                    this.dataUser=response;
                    this.totalRegistros1=this.dataUser.Count;
                    var data=this.dataUser.Data;
                    this.gridDataUser = data.slice(this.RegistersForPage1*(this.pagina1-1), this.RegistersForPage1*(this.pagina1));        
                    this.loadingGet1=false;
                })
                .catch(e=>{
                    this.openMessageError('Error al cargar Usuarios del documento');
                console.log(e);
                this.loadingGet1=false;
                })
          })
          .catch(e =>{
            console.log(e)
              this.openMessageError('Error al Eliminar Usuario');
          })
      }).catch(() => {
        this.openMessageAdvert('Se cancelo la eliminación');
      });
  }
  SearchPersonas(FormSearchPers){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    accesoDocumentService.SearchPersonas(this.CodDocumento,FormSearchPers)
    .then(response =>{
      this.dataUser=response;
        this.totalRegistros1=this.dataUser.Count;
        var data=this.dataUser.Data;
        this.gridDataUser = data.slice(this.RegistersForPage1*(this.pagina1-1), this.RegistersForPage1*(this.pagina1));        
     })
    .catch(e =>{
      this.openMessageError('Error al consultar usuarios');
      console.log(e)
    })
  }

  SearchDocumentoAcceso(FormSearchAcceso){ 
    debugger;
       this.loadingGet=true;
    if(this.FormSearchAcceso.dtmInic!=''&&this.FormSearchAcceso.dtmFin!=''){ 
      try{
        this.FormSearchAcceso.dtmInic=this.FormSearchAcceso.dtmInic.toLocaleDateString('es-PE', this.options); 
        this.FormSearchAcceso.dtmFin=this.FormSearchAcceso.dtmFin.toLocaleDateString('es-PE', this.options);
      }
      catch(e){
        if(e.message=="this.FormSearch.dtmInic.toLocaleDateString is not a function"){
          this.FormSearchAcceso.dtmInic=this.FormSearchAcceso.dtmInic,
          this.FormSearchAcceso.dtmFin=this.FormSearchAcceso.dtmFin.toLocaleDateString('es-PE', this.options);
        }
        else{
          this.FormSearchAcceso.dtmFin=this.FormSearchAcceso.dtmFin;
        }
      }     
    } 
    else if((this.FormSearchAcceso.dtmInic==''&&this.FormSearchAcceso.dtmFin!='')||(this.FormSearchAcceso.dtmInic!=''&&this.FormSearchAcceso.dtmFin=='')){
      if(this.FormSearchAcceso.dtmInic==''){
        this.FormSearchAcceso.dtmInic='01/01/2000'
      }
      else if(this.FormSearchAcceso.dtmFin==''){
        this.FormSearchAcceso.dtmFin=='01/01/2050'
      }
    }
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    accesoDocumentService.SearchDocumentoAcceso(FormSearchAcceso)
    .then(response =>{
     this.dataComplet = response;     
      this.totalRegistros=this.dataComplet.Count;
      var data=this.dataComplet.Data;      
      this.gridData = data.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));      
      this.loadingGet=false;
    })
    .catch(e =>{
      this.openMessageError('Error al buscar versiones');
      this.loadingGet=false;
      
    })
  }
  AgregarUsuario(){
    this.VisualizarPersonasAll=true;
  }
  handleSelectionChange(val){
    this.CodPersona=val.CodPersona;
    debugger;
  }
  cambioPagina(){
    var data1=this.dataComplet.Data;
      this.gridData = data1.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
    }
    cambioPagina1(){
        var data1=this.dataUser.Data;
          this.gridDataUser= data1.slice(this.RegistersForPage1*(this.pagina1-1), this.RegistersForPage1*(this.pagina1));
        }
        cambioPagina2(){
          var data1=this.dataPersona.Data;
            this.GridPersona= data1.slice(this.RegistersForPage2*(this.pagina2-1), this.RegistersForPage2*(this.pagina2));
          }
    getDateString(fecha:string){
        var dateString = new Date(fecha).toLocaleDateString('es-PE', this.options)
        return dateString;
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
  openMessageAdvert(strMessage : string) {
    this.$message({
      showClose: true,
      message: strMessage,
      type: 'warning'
    });
  }
  data() {
    return {
        gridData: [],
        gridDataUser: [],
        GridPersona:[],
        FormSearchAcceso:{
          CodPersona: localStorage.getItem('User_CodPersona'),
          strCodDocumento:'',
          strTitle: '', 
          dtmInic:'',
          dtmFin:''         
        },
        FormSearchPers:{
            CodPersona:'',
            Nombres:'',
            ApellidoPaterno:'',
            ApellidoMaterno:'',
            Email:''
          },
          FormSearch:{
            CodPersona:'',
            Nombres:'',
            ApellidoPaterno:'',
            ApellidoMaterno:'',
            intCodTipoPersona:''
          },
        CodPersona:'',
        VisualizarPersonas:false,
        VisualizarPersonasAll:false,
        formLabelWidth: '120px',
        CodDocumento:'',
        tipo: [{
          value: '1',
          label: 'Antapaccay'
        }, {  
          value: '2',
          label: 'Contratistas'
        }]
    };
  }
}

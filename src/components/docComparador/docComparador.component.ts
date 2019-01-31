import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import router from '../../router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import InfiniteScroll from 'vue-infinite-scroll';
import '../../assets/css/docComparador.scss';
import * as CONFIG from '../../Config';
import axios from 'axios';
import { Notification } from 'element-ui';
import LogComponent from '@/components/log/log.component';
import docComparadorService from '@/components/service/docComparador.service';
import docNuevoService from '@/components/service/docNuevo.service';
@Component({
   name: 'docComparador'
})
export default class DocComparadorComponent extends Vue {
  dataDocumentSelect:any;
  dataVersionCompare:any;
  titleCompare1:any;
  titleCompare3:any;
  SearchForm:any;
  SearchFormNext:any;
  SearchFormCompare:any;
  value:any;
  value1:any;
  textpdf0:any;
  textpdf1:any;
  flag:any;
  loadingGet:boolean=false;
  gridUnidad:any;
  gridTipoAprobacion:any;
  modalVisualizar:boolean=false;
  modalVisualizar1:boolean=false;
  temp:any;
    constructor(){
        super();
        this.ChechAccess();
        // this.getDocumentsSelect();
        this.loadUnidad();
        this.loadTipoAprobacion();
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
          if(listaAccesos[i].strNombre === 'Comparador'){
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
    loadUnidad(){
      debugger;
      docNuevoService.loadUnidad()
      .then(response=>{
  
        this.gridUnidad=response.Data;
        console.log("Next value tiene que ser");
        console.log(this.gridUnidad);
        
      }).catch(e=>{
        console.log("falla");
      })
    }
    loadTipoAprobacion(){
      debugger;
      docNuevoService.loadTipoAprobacion()
      .then(response=>{
        this.gridTipoAprobacion=response.Data;
      })
    }
    // getDocumentsSelect(){
    //   debugger;
    //   docComparadorService.getDocumentsSelect()
    //   .then(response => {
    //     this.dataDocumentSelect = response;
    //     for(var i=0;i<this.dataDocumentSelect.Data.length ; i++){          
    //     }
    //   })
    //   .catch(e =>{
    //     this.openMessageError('Error al cargar lista de documentos');
    //     console.log(e);
    //   })
    // }
    ChangeData(value){
      debugger;
      this.value1.intVersion='';
      this.SearchFormNext.intVersion=this.SearchForm.intVersion;
      this.SearchFormNext.CodDocumentoGenerado=value;
      docComparadorService.SeachDocumentNext(this.SearchFormNext)
      .then(response=>{
        this.dataVersionCompare = response;
      })
      // this.getVersionCompare(value);      
    }
    // getVersionCompare(value){
    //   debugger;
    //   this.flag="change";
    //   docComparadorService.getVersionCompare(value)
    //   .then(response => {
    //     this.dataVersionCompare = response;        
    //   })
    //   .catch(e =>{
    //     console.log(e);
    //   })
    // }
    redirectLogin(msg){
      Notification.warning(msg)
      window.sessionStorage.clear();
      router.push('/')
    }
    handleClose(){
      this.temp=0;
      this.modalVisualizar=false;
      this.SearchFormCompare.CodDocumentoGenerado=this.SearchFormNext.CodDocumentoGenerado;
      this.SearchFormCompare.intVersion=this.SearchFormNext.intVersion;
      this.SearchFormCompare.intVerNew=this.value1.intVersion;
      docComparadorService.ComparadorClear(this.SearchFormCompare)
      .then(response=>{
      })
      .catch(ex=>{
        this.openMessageAdvertencia('No hay archivos que limpiar');
      })
    }
    getPdfUrllast(){
      if(this.temp==0){
        return "../../images/iconopdf.png";
      }
      if(this.temp==1){
        console.log("count ENTRADAS "+Date().toLocaleString());   
        console.log(CONFIG.Local_PathComparer+ this.SearchFormCompare.CodDocumentoGenerado+"_Version_"+this.SearchFormCompare.intVersion+".pdf");
        
        return CONFIG.Local_PathComparer+ this.SearchFormCompare.CodDocumentoGenerado+"_Version_"+this.SearchFormCompare.intVersion+".pdf";
      }
      
    }
    getPdfUrlNew(){
      if(this.temp==0){
        return "../../images/iconopdf.png";
      }
      if(this.temp==1){
        console.log("count SALIDAS "+Date().toLocaleString());
        console.log(CONFIG.Local_PathComparer+ this.SearchFormCompare.CodDocumentoGenerado+"_Version_"+this.SearchFormCompare.intVerNew+".pdf");      
        return CONFIG.Local_PathComparer+ this.SearchFormCompare.CodDocumentoGenerado+"_Version_"+this.SearchFormCompare.intVerNew+".pdf";
      }
      
    }
    ComparadorButton(){
      debugger;
     
      this.SearchFormCompare.CodDocumentoGenerado=this.SearchFormNext.CodDocumentoGenerado;
      this.SearchFormCompare.intVersion=this.SearchFormNext.intVersion;
      this.SearchFormCompare.intVerNew=this.value1.intVersion;
      if(this.SearchFormCompare.intVersion!=""&&this.SearchFormCompare.intVerNew!=""&&this.SearchFormCompare.CodDocumentoGenerado!=""){
        this.modalVisualizar1=true;
        this.loadingGet=true;        
       docComparadorService.ComparadorButton(this.SearchFormCompare)
       .then(response=>{
        this.loadingGet=true;  
         if(response=="BIEN"){    
           this.loadingGet=false;
           this.modalVisualizar1=false;
           this.modalVisualizar=true;
           this.temp=1;
         }   
         if(response=="MAL"){
          this.modalVisualizar1=false;
          this.loadingGet=false;
          this.openMessageError('No se puede comparar los documentos seleccionados');
         }     
       })
       .catch(e=>{
         console.log(e);
         this.openMessageError('No se puede comparar los documentos seleccionados');
         this.loadingGet=false;
       })
      }
      else{
        this.openMessageAdvertencia('Debe seleccionar un documento');
        this.loadingGet=false;
      }
    }   
    clearPageDate(){
      if(this.titleCompare1==''){
        this.titleCompare1='',
        this.titleCompare3=''
      }
      else{
        this.textpdf0='',
        this.textpdf1=''
      }
    }
    SeachDocument(SearchForm){
      debugger;
      this.dataDocumentSelect=[];
      docComparadorService.SeachDocument(this.SearchForm)
      .then(response=>{
        this.dataDocumentSelect = response;
      })
    }
    openMessage(newMsg : string) {
      this.$message({
        showClose: true,
        message: newMsg,
        type: 'success'
      });
    }
    openMessageAdvertencia(newMsg : string) {
      this.$message({
        showClose: true,
        message: newMsg,
        type: 'warning'
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
          dataDocumentSelect:[],
          dataVersionCompare:[],
          gridUnidad:[],
          gridTipoAprobacion:[],
          flag:'',
          SearchFormNext: 
          {
            CodDocumentoGenerado:'',
            intVersion:''
          },
          SearchFormCompare: 
          {
            CodDocumentoGenerado:'',
            intVersion:'',
            intVerNew:''
          },
          SearchForm:{
            CodPersona:localStorage.getItem('User_CodPersona'),
            strTitle:'',
            CodTipoAprobacion:'',            
            strUniDescripcion:'',
            CodDocumentoGenerado:'',
            intVersion:''
          },
          value1: {
            intVersion:''
            },
          textpdf0:'',
          textpdf1:'',
          titleCompare1:'',
          titleCompare3:'',
          formLabelWidth:'120px',
          modalVisualizar:false,
          modalVisualizar1:false,
          temp:0
        }

      }
      
}

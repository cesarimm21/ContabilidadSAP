import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'element-ui/lib/theme-default/index.css';
import '../../assets/css/roles.scss';
import { Notification } from 'element-ui';
import plantillaService from '@/components/service/plantilla.service';
import * as CONFIG from '../../Config';
@Component({
   name: 'plantilla',
})
export default class Plantilla extends Vue {

  listaAccesos:any;
  modalVisualizarImage:boolean=false;
  input:any;
  imagen:any;
  src:any;
  imageLogo:any;
  filesUpload:any;
  loadingGet:boolean=false;
  fileList:any;
  fileAll:any;
  tipoDocumento:any;
  imageUrl:any;
  dialogImageUrl:any;
  dialogImageUrl1:any;
  dialogVisible:any;
  valor:boolean=true;
  valor1:boolean=false;
  VerBoton:boolean=true;
  constructor(){
    super()
    this.ChechAccess();
    this.loadingImage();
  }
  ChechAccess(){
    debugger;
    var lista:any = localStorage.getItem('usuario_accesos');
    if(lista === null){
      this.$router.push('/');
    }
    else{
      var listaAccesos:any = JSON.parse(lista).Data;
      var flag:boolean = false;
      for(var i=0; i<listaAccesos.length; i++){
        if(listaAccesos[i].strNombre === 'Plantilla'){
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
  upload(){
    this.loadingGet=true;
    debugger;
    let formData = new FormData();
    formData.append("image", this.filesUpload.raw,this.filesUpload.raw.name);
    console.log(this.filesUpload);    
    plantillaService.PutPlantilla(formData)
    .then(response =>{
      this.MessageSuccess(response);
      this.loadingGet=false;      
      this.valor=true;
      this.valor1=false;
      this.VerBoton=true;
      this.imageLogo='';
      this.imageLogo=this.loadingImage();
    }).catch(e =>{
      this.openMessageError("No se pudo insertar la imagen a la plantilla");
      this.loadingGet=false;
    })
}
loadingImage(){
  // this.imageLogo=CONFIG.Local_Image+'/logo.jpg';
  return CONFIG.Local_Image+'/logo.jpg';
  // console.log(this.imageLogo+'ALGO VA AQUI');
  
}
handleAvatarSuccess(res,file){
  debugger;
  if(file.length==1){
    this.valor=false;
    this.valor1=true;
    this.filesUpload=file[0];
    this.dialogImageUrl1 = URL.createObjectURL(file[0].raw);
    this.VerBoton=false;
  }  
}
handleRemoveImage(file) {
  debugger;
  this.valor=true;
  this.valor1=false;
  this.VerBoton=true;  
}
handlePictureCardPreview(file) {
  debugger;
  this.dialogImageUrl =this.dialogImageUrl1;// URL.createObjectURL(file.raw);
  this.dialogVisible = true;
}
handleExceed(files, fileList){
  this.$message.warning(`Carge 1 imagen, haz cargado ${files.length} archivos esta vez, añade hasta ${files.length + fileList.length}`);
}
// lista de documento para insertar
handleChange(file, fileList) {
  this.fileAll=fileList;
  debugger;
  console.log(file,fileList);
  
}
handleRemove(file, fileList) {
  this.fileAll=fileList;
  debugger;
  console.log(file, fileList);
}
submitUpload(file) {
  debugger;  
  if(this.fileAll.length==0){
    this.openMessageAlert("No hay documentos seleccionados")
  }
  if(this.tipoDocumento==''){
    this.openMessageAlert("Seleccione un tipo de documento")
  }
  else{
    this.fileAll.forEach(element => {
      let formData = new FormData();
      formData.append("file",element.raw,element.raw.name);
      plantillaService.PutFiles(formData,this.tipoDocumento)
      .then(response=>{
        this.MessageSuccess("Se inserto correctamente");
      }).catch(response=>{
        this.openMessageError("No se pudo cargar plantilla");
      })      
    });
    this.fileList=[];
    this.fileAll=[];
  }
}
openMessageError(strMessage:string){
  this.$message({
      showClose: true,
      type: 'error',
      message: strMessage
    });
}
openMessageAlert(strMessage:string){
  this.$message({
      showClose: true,
      type: 'warning',
      message: strMessage
    });
}
MessageSuccess(response){
  this.$message({
    showClose: true,
    type: 'success',
    message: response
  });
}
  data() {
    return {
      input:'',
      modalVisualizarImage:false,
      src: '',
      filesUpload:'',
      imageUrl: '',
      dialogImageUrl:'',
      dialogImageUrl1:'',
      dialogVisible: false,
      imageLogo:this.loadingImage(),
      fileList:[],
      fileAll:[],
      options: [{
        value: '00.01',
        label: 'Manual de Gestión'
      },
      {
        value: '00.02',
        label: 'Normas de Gestión'
      },
      {
        value: '00.03',
        label: 'Norma Operativa'
      },
      {
        value: '00.04',
        label: 'Estándar para actividad de alto riesgo'
      },
      {
        value: '00.05',
        label: 'Guias'
      },
      {
        value: '00.06',
        label: 'Reguistro'
      },
      {
        value: '00.07',
        label: 'PET'
      },
      {
        value: '00.08',
        label: 'Manual General'
      },],
      tipoDocumento:'',
      VerBoton:true
    };
  }
}

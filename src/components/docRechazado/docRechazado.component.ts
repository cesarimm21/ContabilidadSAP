import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import router from '../../router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import InfiniteScroll from 'vue-infinite-scroll';
import '../../assets/css/docRechazado.scss';

import Jerarquia from '@components/jerarquia/jerarquia.vue';
import MessageBox from 'vue-msgbox';
import swal from 'sweetalert'
import VueSweetAlert from 'vue-sweetalert';
import Modal from 'modal-vue';
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import * as CONFIG from '../../Config';
import axios from 'axios';
import { Notification } from 'element-ui';
Vue.use(BootstrapVue);

@Component({
   name: 'docRechazado',
   components: { Modal }
})
export default class DocRechazadoComponent extends Vue {
  public griddinamicang:string ="row listadinamica nav nav-tabs";
  isActive:boolean;
  isCollapse:boolean;
  BuscarRechazado: any;
  gridData: any;
  textpdf0:any;
  constructor(){
    super();
    this.ChechAccess();
    this.isActive=true;
    this.isCollapse=false;
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
        if(listaAccesos[i].strNombre === 'Documentos Rechazados'){
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
  handleClick() {
    console.log('click');
  }

  clickHamburger () {
    this.isActive = !this.isActive
    this.isCollapse = !this.isCollapse
  }
  links(){
    router.push('/barmenu/jerarquia')
  }
  links2(){
    router.push('/barmenu/docComparador')
  }
  getImageUrl(title){
    return CONFIG.Local_PathImage+title+".png";
  }
  getPdfUrl(){
    return CONFIG.Local_PathPdf+this.textpdf0+".pdf";
  }
  get(event){
    this.textpdf0=event.strTitle;
  }
  searchRechazado(BuscarRechazado){
    //console.log(BuscarTermino);
    axios.post(CONFIG.API_URL+'query/irRechazado', BuscarRechazado)
    .then(response =>{
      this.gridData = JSON.parse(JSON.stringify(response.data));
    })
    .catch(e =>{
      this.openMessageError('Error al consultar terminos');
      console.log(e)
    })
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
      textpdf0:'',
      BuscarRechazado: {
        strQuery:''             
      },
      options: [{
        value: 'Option1',
        label: 'Option1'
        }, {
        value: 'Option2',
        label: 'Option2'
        }, {
        value: 'Option3',
        label: 'Option3'
        }, {
        value: 'Option4',
        label: 'Option4'
        }, {
        value: 'Option5',
        label: 'Option5'
      }],
      tableData2:  [{
        codigo:'0000000001',
        descripcion: 'Acta de reunion',
        version: 'V01',
        autor:'AREVALO LOPEZ, JAVIER',
        fecha: '10/6/2017 9:36 PM'
        }, {
        codigo:'0000000002',
        descripcion: 'agregando solo interfaz de dominio',
        version: 'V03',
        autor:'ARIAS HERNANDEZ, ROSARIO',
        fecha: '10/5/2017 5:35 PM'
        }, {
        codigo:'0000000003',
        descripcion: 'lista de proveedores de antapacay',
        version: 'V04',
        autor:'ARROYO RAMÍREZ, EFRAÍN ',
        fecha: '10/5/2017 5:13 PM'
        }, {
        codigo:'0000000004',
        descripcion: 'Acta de reunion de ventas',
        version: 'V05',
        autor:'ALOCEN BARRERA, MARCO TULIO',
        fecha: '10/5/2017 5:01 PM'
        },{
        codigo:'0000000055',
        descripcion: 'Modificacion de Roles',
        version: 'V066',
        autor:'BAIOCCHI URETA, CESAR',
        fecha: '10/6/2017 9:33 PM'
        },{
        codigo:'0000000006',
        descripcion: 'Acta de reunion',
        version: 'V045',
        autor:'BAYLÓN ROJAS, ISELA FLOR',
        fecha: '10/4/2017 8:15 PM'
      }],
      value: '',
      options1: [{
        value: 'A',
        label: 'A'
        }, {
        value: 'B',
        label: 'B'
        }, {
        value: 'C',
        label: 'C'
        }, {
        value: 'D',
        label: 'D'
        }, {
        value: 'E',
        label: 'E'
      }],
      data2: [{
        id: 1,
        label: 'ACEVEDO JHONG, DANIEL',
        children: [{
          id: 4,
          label: 'AGURTO RONDOY, MIGUELVICENTE',
          children: [{
            id: 9,
            label: 'ALCALÁ NEGRÓN, CHRISTIAN NELSON',
            children: [{
              id: 10,
              label: 'ALMORA HERNANDEZ, RAUL EDUARDO'
              },{
              id:11,
              label:'CHANCOS MENDOZA, ZARITA'
              },{
              id:11,
              label:'CHIRINOS LACOTERA, CARLOS'
              },{
              id:11,
              label:'CORES MORENO, DORIS'
              },{
              id:11,
              label:'CORTEZ LOZANO, MARIBEL CORINA'
              },{
              id:11,
              label:'CRISPIN QUISPE, ANGEL'
              },{
              id:11,
              label:'DE LOAYZA CONTERNO, ANTONIO '
            }]
          }]
        }]
        }, {
        id: 2,
        label: 'ALVA CAMPOS, VICTOR',
        children: [{
          id: 5,
          label: 'BAIOCCHI URETA, CESAR'
          }, {
          id: 6,
          label: 'BEDREGAL CANALES, LUZ MARINA'
        }]
        }, {
        id: 3,
        label: 'CALLE BETANCOURT, CIELITO MERCEDES',
        children: [{
          id: 7,
          label: 'CARAZA VILLEGAS, ISABEL FLORISA'
          }, {
          id: 8,
          label: 'CARRIÓN NEIRA, JORGE AUGUSTO'
        }]
        },{
        id: 4,
        label: 'DIAZ SALINAS, ANA MARIA'
        },{
        id: 5,
        label: 'DUEÑAS ARISTISABAL, ANTONIO '
      }],
      value8: '',
      dialogTableVisible: false,
      modalVisualizar:false,
      modalHistorial:false,
      modalJerarquia:false,
      dialogVisible: false,
      dialogRowVisible: false,
      modalShow: false
    }
  }

  defaultProps: {
    children: 'children',
    label: 'label'
  }

  openAlert(){
    swal({
      title: 'sdfgsdfgsdfgsd!'
    })
  }

  open2() {
    this.$confirm('El documento sera eliminado. Continuar?', 'Eliminando', {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning'
    }).then(() => {
      this.$message({
      type: 'success',
      message: 'Eliminacion completado'
      });
    }).catch(() => {
      this.$message({
        type: 'info',
        message: 'Eliminacion Cancelado'
      });          
    });
  }

  download() {
    this.$confirm('Desea descargar el documento. Continuar?', 'Descarga de Documento', {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning'
    }).then(() => {
      this.$message({
        type: 'success',
        message: 'Descarga completado'
      });
    }).catch(() => {
      this.$message({
        type: 'info',
        message: 'Descarga Cancelado'
      });          
    });
  }

  open3() {
    this.$prompt('Ingrese e-mail', 'Share', {
      confirmButtonText: 'Compartir',
      cancelButtonText: 'Cancel',
      inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
      inputErrorMessage: 'Invalido E-mail'
    }).then(value => {
      this.$message({
        type: 'success',
        message: 'Compartido con:' + value
      });
    }).catch(() => {
      this.$message({
        type: 'warning',
        message: 'Compartir cancelado'
      });       
    });
  }
}
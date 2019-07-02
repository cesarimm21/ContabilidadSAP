import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';

import Login from '@/components/login/login.vue';
import Roles from '@/components/roles/roles.vue';
import UsuarioService from '@/components/service/usuario.service';
import LoginService from '@/components/service/login.service';
import router from '@/router';
import ElementUI from 'element-ui';
import InfiniteScroll from 'vue-infinite-scroll';
import 'element-ui/lib/theme-default/index.css';
import Global from '@/Global';
import { Notification } from 'element-ui';
@Component({
  name: 'buttons-accions',
  
})
export default class ButtonsAccionsComponent extends Vue { 
  filter:boolean=false;
  falseortrue:boolean;
  falseortruePO:boolean;
  constructor(){
    super();
    switch(Global.nameComponent){
      case 'imprimir-po': this.falseortruePO=true;
      break;
      case 'factura':this.falseortrue=true;
      break;
      default:
      this.falseortrue=false;
      this.falseortruePO=false;
    }
    // if(Global.nameComponent=='imprimir-po'){
    //   this.falseortruePO=true;
    // }
    // if(Global.nameComponent=='factura'){
    //   this.falseortrue=true;
    // }
    // else{
    //   this.falseortrue=false;
    //   this.falseortruePO=false;
    // }
  } 
  
  BuscarSome(){
    this.$emit('handleClickInParent');
    if(Global.nameComponent==='aprobar-hes'){
      this.$emit('handleSearchHes',Global.nameComponent);
    }
  }
  changeIcon(){
    if(Global.nameComponent=='factura'){      
      this.$emit('changeIcon',Global.nameComponent);
    }    
  }
  ActivaCheck(){
    this.$emit('ActivaCheck');
  }
  ExportarPDF(){
    this.$emit('ExportarPDF');
  }
  ValidarItem(){
    this.$emit('validarView');
  }
  EliminarItem(){
    this.$emit('EliminarItem');
  }
  siguiente(){
    this.$emit('siguiente');
  }
  anterior(){
    this.$emit('anterior');
  }
  AscItem(){
    this.$emit('AscItem');
  }
  DscItem(){
    this.$emit('DscItem');
  }
  Buscar(){
    this.filter=true;
    this.$emit('Buscar');
  }
  Buscar2(){
    this.filter=false;
    alert('ddd')
  }
  Print(){
    this.$emit('Print');
  }
  Limpiar(){
    this.filter=false;
    this.$emit('Limpiar');
  }
  data(){
    return{
      dialogTableVisible: false,
      user: {
        authenticated: false
      },
      // falseortrue:Global.falseortrue,
      imagenLoad:'',
      data:{
        // Usuario:localStorage.getItem('User_Nombre'),
      },
      accesosUser: [],
      hours: 0,
      minutos:0,
      seconds:0,
      falseortruePO:false
    }
  }
  
}

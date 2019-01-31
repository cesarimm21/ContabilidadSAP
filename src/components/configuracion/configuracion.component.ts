import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import router from '../../router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import InfiniteScroll from 'vue-infinite-scroll';
import Configuracion from '@components/configuracion/configuracion.vue';
import '../../assets/css/configuracion.scss';

@Component({
   name: 'configuracion',

})
export default class ConfiguracionComponent extends Vue {

  constructor(){
    super()

  }
}

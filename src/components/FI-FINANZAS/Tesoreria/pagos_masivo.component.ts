import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';

import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import {PagosModel} from '@/modelo/maestro/Pagos';
import {PagosDetelleModel} from '@/modelo/maestro/pagosDetalle';
@Component({
    name: 'pagos-masivo',
    components: { 
        'quickaccessmenu':QuickAccessMenuComponent,}
})
export default class PagosMasivoComponent extends Vue {
    constructor(){
        super();
    }
    data(){
        return{
            val:''
        }
    }
}
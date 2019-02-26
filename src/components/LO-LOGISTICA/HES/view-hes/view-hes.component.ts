import Vue from 'vue';
import {Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import router from '@/router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import {bus} from '../../../../main';
import Global from '@/Global';

@Component({
    name:'view-hes',
    components:{}
})
export default class ViewHesComponent extends Vue{
    nameComponent:string;
    dialogHes:boolean=false;
    btnactivarHes:boolean=false;
    constructor(){
        super();
        Global.nameComponent='view-hes';
    }
    
    desactivar_Hes(){
        if(this.dialogHes){
            this.btnactivarHes=false;
        }
    }
    activar_Hes(){
        setTimeout(() => {
            this.btnactivarHes=true;
        }, 120);
    }
    loadHes(){

    }
    created(){
        bus.$on('ViewHes',(data)=>{
            this.$message({
                showClose:true,
                type:'info',
                message:'View Hes'
            })
        })
        bus.$on('ValViewHes',(data)=>{
            if(data===this.nameComponent){
                this.$message({
                    showClose:true,
                    type:'info',
                    message:'Comando no permitido'
                })
            }
          })
    }
    data(){
        return{
            nameComponent:'view-hes',
            dialogHes:false
        }
    }

}
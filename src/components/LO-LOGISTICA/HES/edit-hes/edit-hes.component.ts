import Vue from 'vue';
import {Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import router from '@/router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import {bus} from '../../../../main';
import Global from '@/Global';

@Component({
    name:'edit-hes',
    components:{}
})
export default class EditHesComponent extends Vue{
    nameComponent:string;
    dialogHes:boolean=false;
    btnactivarHes:boolean=false;
    constructor(){
        super();
        Global.nameComponent='edit-hes';
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
        bus.$on('EditHes',(data)=>{
            this.$message({
                showClose:true,
                type:'success',
                message:'Save HES'
            })
        })
        bus.$on('ValEditHes',(data)=>{
            if(data===this.nameComponent){
                this.$message({
                    showClose:true,
                    type:'info',
                    message:'Edit hes'
                })
            }
        })
    }
    data(){
        return{
            nameComponent:'edit-hes'
        }
    }

}
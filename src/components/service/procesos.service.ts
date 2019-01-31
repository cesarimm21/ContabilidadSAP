import axios from 'axios';
import * as CONFIG from '../../Config';
import GLOBAL from '../../Global';
export default{
  headers : {'Authorization': 'Bearer '+GLOBAL.getToken()},
  GetAllTipoAprobacion(){
    return axios.get(CONFIG.API_URL+'aprobar/get/alltipoaprobacion',{headers:  {'Authorization': 'Bearer '+window.sessionStorage.getItem('usuario_token')}})
    .then(response =>{
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetAllPlantilla(){
    return axios.get(CONFIG.API_URL+'aprobar/get/allplantilla',{headers:  {'Authorization': 'Bearer '+window.sessionStorage.getItem('usuario_token')}})
    .then(response =>{
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  AgregarTipoApro(addTipe){
    return axios.post(CONFIG.API_URL+'aprobar/put/tipoaprobacion', addTipe,{headers: {'Authorization': 'Bearer '+window.sessionStorage.getItem('usuario_token')}})
    .then(response =>{
        return response.data;
      })
  },
  AgregarProceso(addProceso){
    return axios.post(CONFIG.API_URL+'aprobar/put/proceso', addProceso,{headers: {'Authorization': 'Bearer '+window.sessionStorage.getItem('usuario_token')}})
    .then(response =>{
        return response.data;
      })
  },
  EliminarProceso(row){
    debugger;
    return axios.delete(CONFIG.API_URL+'aprobar/delete/'+row.CodProceso+'/'+row.CodTipoAprobacion+'/'+localStorage.getItem('User_Usuario'),{headers: this.headers})
    .then(response => {
      return response.data
    })
  },
  DeleteTipoAprobacion(deleteTipApro){
    debugger;
    return axios.delete(CONFIG.API_URL+'aprobar/delete/tipo/'+deleteTipApro.CodTipoAprobacion+'/'+deleteTipApro.UsuarioModif,{headers: this.headers})
    .then(response => {
      return response.data
    })
  },
  GetJerarquia(jerarquiaForm){
    return axios.post(CONFIG.API_URL+'aprobar/get/jerarquiatipo', jerarquiaForm,{headers: {'Authorization': 'Bearer '+window.sessionStorage.getItem('usuario_token')}})
    .then(response =>{
        return response.data;
      })
  },
  GetProceso(CodTipoAprobacion){
    return axios.get(CONFIG.API_URL+'aprobar/get/proceso/'+CodTipoAprobacion,{headers:  {'Authorization': 'Bearer '+window.sessionStorage.getItem('usuario_token')}})
    .then(response =>{
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  AgregarColado(addColado){
    return axios.post(CONFIG.API_URL+'aprobar/put/colado', addColado,{headers: {'Authorization': 'Bearer '+window.sessionStorage.getItem('usuario_token')}})
    .then(response =>{
        return response.data;
      })
  },
}
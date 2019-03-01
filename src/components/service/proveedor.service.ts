import axios from 'axios';
import * as CONFIG from '../../Config';
import GLOBAL from '../../Global';
export default{
  headers : {'Authorization': 'Bearer '+GLOBAL.getToken()},
  GetAllProveedor(){
    return axios.get(CONFIG.API_URL+'proveedor')
    .then(response =>{
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  putProveedor(Proveedor){
    return axios.post(CONFIG.API_URL+'proveedor', Proveedor)
    .then(response =>{
        return response.data;
      })
  },
  UpdateProveedor(Proveedor){
    return axios.post(CONFIG.API_URL+'proveedor/update', Proveedor)
    .then(response =>{
        return response.data;
      })
  },
  getProveedorID(id){
    return axios.get(CONFIG.API_URL+'proveedor/'+id)
    .then(response => {
      return response.data
    })
  },
  DeleteProveedor(id){
    return axios.delete(CONFIG.API_URL+'proveedor/delete/'+id)
    .then(response => {
      return response.data
    })
  }
}
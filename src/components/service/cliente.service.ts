import axios from 'axios';
import * as CONFIG from '../../Config';
import GLOBAL from '../../Global';
export default{
  headers : {'Authorization': 'Bearer '+GLOBAL.getToken()},
  GetAllCliente(){
    return axios.get(CONFIG.API_URL+'cliente')
    .then(response =>{
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  putCliente(Proveedor){
    return axios.post(CONFIG.API_URL+'cliente', Proveedor)
    .then(response =>{
        return response.data;
      })
  },
  UpdateCliente(Cliente){
    return axios.post(CONFIG.API_URL+'cliente/update', Cliente)
    .then(response =>{
        return response.data;
      })
  },
  getClienteID(id){
    return axios.get(CONFIG.API_URL+'cliente/'+id)
    .then(response => {
      return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetOnlyOneCliente(code){
    return axios.get(CONFIG.API_URL+'cliente/'+code)
    .then(response =>{
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetClientesCompany(strCompany_cod){
    return axios.get(CONFIG.API_URL+'clienteByCompania/'+strCompany_cod)
    .then(response =>{
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  DeleteClientes(strCod,strUser){
    return axios.get(CONFIG.API_URL+'cliente/delete/'+strCod+'/'+strUser)
    .then(response =>{
        return JSON.parse(JSON.stringify(response.data));
    })
  }
}
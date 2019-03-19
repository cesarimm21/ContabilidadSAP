import axios from 'axios';
import * as CONFIG from '../../Config';
import * as APIConstant from '../../core/api.constant';
import GLOBAL from '../../Global';
export default{
  headers : {'Authorization': 'Bearer '+GLOBAL.getToken()},
  GetAllOrdenCompra(){      
    return axios.get(CONFIG.API_URL+'ordencompra')
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  CreateOrdenCompra(ordencompraModel){    
    return axios.post(CONFIG.API_URL+'ordencompra',ordencompraModel)
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetAllOrdenDetalle(idHeader){
    return axios.get(CONFIG.API_URL+'ordencompradetalle/'+idHeader)
    .then(response=>{
      return JSON.parse(JSON.stringify(response.data));
    })
  },
  aprobarPO(data){
    return axios.post(CONFIG.API_URL+'ordencompra/aprobar',data)
    .then(response =>{
      return JSON.parse(JSON.stringify(response.data));
    })
  },
  inventarioPO(data){
    return axios.post(CONFIG.API_URL+'ordencompra/aprobar/inventario',data)
    .then(response =>{
      return JSON.parse(JSON.stringify(response.data));
    })
  },
  busquedaPO(data){
    return axios.get(CONFIG.API_URL+'busqueda/ordencompra/'+data.strPO_NO+'/'+data.strVendor_NO+'/'+data.desde+'/'+data.hasta)
    .then(response =>{
      return JSON.parse(JSON.stringify(response.data));
    })
  },
  busquedaRPO(data){
    return axios.get(CONFIG.API_URL+'busqueda/recepcion/ordencompra/'+data.strPO_NO+'/'+data.strVendor_NO+'/'+data.desde+'/'+data.hasta)
    .then(response =>{
      return JSON.parse(JSON.stringify(response.data));
    })
  },
  getPOId(code){
    return axios.get(CONFIG.API_URL+'ordencompra/'+code)
    .then(response =>{
      return JSON.parse(JSON.stringify(response.data));
    })
  },
  getPODetalleId(code){
    return axios.get(CONFIG.API_URL+'ordencompradetalle/'+code)
    .then(response =>{
      return JSON.parse(JSON.stringify(response.data));
    })
  },
  recepcionar(data){
    return axios.post(CONFIG.API_URL+'ordencompra/recepcion',data)
    .then(response =>{
      return JSON.parse(JSON.stringify(response.data));
    })
  }
}

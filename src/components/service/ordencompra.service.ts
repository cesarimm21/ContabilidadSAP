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
  GetAllOrdenDetalle(idHeader){
    return axios.get(CONFIG.API_URL+'ordencompradetalle/'+idHeader)
    .then(response=>{
      return JSON.parse(JSON.stringify(response.data));
    })
  },
  getRequisicionByCod(cod){
    return axios.get(CONFIG.API_URL+'requisicionByCod/'+cod)
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
  busquedaPO(data){
    return axios.get(CONFIG.API_URL+'busqueda/ordencompra/'+data.strPO_NO+'/'+data.strVendor_NO+'/'+data.desde+'/'+data.hasta)
    .then(response =>{
      return JSON.parse(JSON.stringify(response.data));
    })
  },
}

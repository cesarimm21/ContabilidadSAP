import axios from 'axios';
import * as CONFIG from '../../Config';
import * as APIConstant from '../../core/api.constant';
import GLOBAL from '../../Global';
export default {
  headers : {'Authorization': 'Bearer '+GLOBAL.getToken()},
  GetAllClaseMaterial(){  
    return axios.get(CONFIG.API_URL+'clasematerial')
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  busquedaProducto(strCodClaseMaterial,desde,hasta){
    return axios.get(CONFIG.API_URL+'busqueda/clasematerial/'+strCodClaseMaterial+'/'+desde+'/'+hasta)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetOnlyOneClaseMaterial(code){
    return axios.get(CONFIG.API_URL+'clasematerial/'+code)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },

  GetTypeClaseMaterial(code){
    return axios.get(CONFIG.API_URL+'clasematerial/type/'+code)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  CreateClaseMaterial(data){
    return axios.post(CONFIG.API_URL+'clasematerial',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  update(data)
  {
    return axios.post(CONFIG.API_URL+'update/clasematerial',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  }
}
  
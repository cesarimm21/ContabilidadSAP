import axios from 'axios';
import * as CONFIG from '../../Config';
import * as APIConstant from '../../core/api.constant';
import GLOBAL from '../../Global';
export default{
  headers : {'Authorization': 'Bearer '+GLOBAL.getToken()},
  GetAllMoneda(){   
    return axios.get(CONFIG.API_URL+'moneda')
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetAllMonedaView(){   
    return axios.get(CONFIG.API_URL+'moneda/view')
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetOnlyOneMoneda(code){
    return axios.get(CONFIG.API_URL+'moneda/'+code)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  deleteMoneda(intIdCurrency_ID){
    return axios.get(CONFIG.API_URL+'moneda/delete/'+intIdCurrency_ID)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  searchMoneda(data){
    return axios.post(CONFIG.API_URL+'moneda/search',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  createtblMoneda(data){
    return axios.post(CONFIG.API_URL+'moneda/create',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  updatetblMoneda(data){
    return axios.post(CONFIG.API_URL+'moneda/update',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  inactivartblMoneda(documento){
    return axios.post(CONFIG.API_URL+'moneda/inactivar',documento)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  activartblMoneda(documento){
    return axios.post(CONFIG.API_URL+'moneda/activar',documento)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },

}
  
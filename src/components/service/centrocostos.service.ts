import axios from 'axios';
import * as CONFIG from '../../Config';
import * as APIConstant from '../../core/api.constant';
import GLOBAL from '../../Global';
export default {
  headers : {'Authorization': 'Bearer '+GLOBAL.getToken()},
  GetAllCentroCostos(){  
    return axios.get(CONFIG.API_URL+'centrocosto')
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetOnlyOneCentroCostos(code){  
    return axios.get(CONFIG.API_URL+'centrocosto/'+code)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  CreateCentroCosto(data){
    return axios.post(CONFIG.API_URL+'centrocosto',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetBusquedaCentroCostos(strCodigo:any,desde:any,hasta:any){
    return axios.get(CONFIG.API_URL+'busqueda/centrocosto/'+strCodigo+'/'+desde+'/'+hasta)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetCentroCostosID(code:any){
    return axios.get(CONFIG.API_URL+'centrocosto/'+code)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  UpdateCentroCostosID(data:any){
    return axios.put(CONFIG.API_URL+'centrocosto/'+data.intIdCostCenter_ID, data)
    .then(response =>{
        return response.data;
      })
  },
}
  
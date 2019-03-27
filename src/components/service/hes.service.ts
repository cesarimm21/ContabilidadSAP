import axios from 'axios';
import * as CONFIG from '../../Config';
import * as APIConstant from '../../core/api.constant';
import GLOBAL from '../../Global';
export default{
  headers : {'Authorization': 'Bearer '+GLOBAL.getToken()},
  GetAllHes(){      
    return axios.get(CONFIG.API_URL+'hes')
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  CreateHes(hesModel){    
    return axios.post(CONFIG.API_URL+'hes',hesModel)
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  UpdateHes(hesModel){    
    return axios.post(CONFIG.API_URL+'hes/update',hesModel)
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetHesDetalle(intIdHESH_ID){      
    return axios.get(CONFIG.API_URL+'hesdetalle/'+intIdHESH_ID)
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  busquedaHES(data){
    return axios.get(CONFIG.API_URL+'busqueda/hes/'+data.strHES_NO+'/'+data.desde+'/'+data.hasta)
    .then(response =>{
      return JSON.parse(JSON.stringify(response.data));
    })
  },
  busquedaHESByCod(data){
    return axios.get(CONFIG.API_URL+'busquedaByCod/hes/'+data)
    .then(response =>{
      return JSON.parse(JSON.stringify(response.data));
    })
  },
  aprobarHES(data){
    debugger;
    return axios.post(CONFIG.API_URL+'hes/aprobar',data)
    .then(response =>{
      return JSON.parse(JSON.stringify(response.data));
    })
  },
}
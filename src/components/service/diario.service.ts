import axios from 'axios';
import * as CONFIG from '../../Config';
import * as APIConstant from '../../core/api.constant';
import GLOBAL from '../../Global';
export default{
  headers : {'Authorization': 'Bearer '+GLOBAL.getToken()},
  GetAllDiarios(){   
    return axios.get(CONFIG.API_URL+'diario')
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  deleteDiarios(intDaily_ID){   
    return axios.get(CONFIG.API_URL+'diario/delete/'+intDaily_ID)
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  CreateDiarios(comprobante){
    return axios.post(CONFIG.API_URL+'diario/create', comprobante)
    .then(response =>{
        return JSON.parse(JSON.stringify(response.data));
      })
  },
  UpdateDiarios(comprobante){
    return axios.post(CONFIG.API_URL+'diario/update', comprobante)
    .then(response =>{
        return JSON.parse(JSON.stringify(response.data));
      })
  }
}
  
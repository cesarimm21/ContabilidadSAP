import axios from 'axios';
import * as CONFIG from '../../Config';
import * as APIConstant from '../../core/api.constant';
import GLOBAL from '../../Global';
export default{
  headers : {'Authorization': 'Bearer '+GLOBAL.getToken()},
  GetAllPais(){    
    return axios.get(CONFIG.API_URL+'pais')
    .then(response =>{            
        return JSON.parse(JSON.stringify(response));
    })
  },
  GetOnlyOnePais(code){
    return axios.get(CONFIG.API_URL+'pais/'+code)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  }
}

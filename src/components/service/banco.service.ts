import axios from 'axios';
import * as CONFIG from '../../Config';
import * as APIConstant from '../../core/api.constant';
import GLOBAL from '../../Global';
export default{
  headers : {'Authorization': 'Bearer '+GLOBAL.getToken()},
  GetAllBanco(){      
    return axios.get(CONFIG.API_URL+'banco')
    .then(response =>{            
        return JSON.parse(JSON.stringify(response));
    })
  },
  GetOnlyOneBanco(code){
    return axios.get(CONFIG.API_URL+'banco/'+code)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  }

}
  
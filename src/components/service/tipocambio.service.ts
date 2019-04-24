import axios from 'axios';
import * as CONFIG from '../../Config';
import * as APIConstant from '../../core/api.constant';
import GLOBAL from '../../Global';
export default{
  headers : {'Authorization': 'Bearer '+GLOBAL.getToken()},
  GetAllTipoCambio(date){    
    return axios.get(CONFIG.API_URL+'tipocambioByDate/'+date)
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetAllTipoCambio1(){
    return axios.get(CONFIG.API_URL+'tipocambiotoday')
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  }
}

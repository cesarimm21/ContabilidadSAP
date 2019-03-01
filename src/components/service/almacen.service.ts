import axios from 'axios';
import * as CONFIG from '../../Config';
import * as APIConstant from '../../core/api.constant';
import GLOBAL from '../../Global';
export default {
  headers : {'Authorization': 'Bearer '+GLOBAL.getToken()},
  GetAllAlmacen(){  
    return axios.get(CONFIG.API_URL+'almacen')
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetOnlyOneAlmacen(code){
    console.log(CONFIG.API_URL+'almacenid/'+code);
    return axios.get(CONFIG.API_URL+'almacenid/'+code)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  }
}
  
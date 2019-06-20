import axios from 'axios';
import * as CONFIG from '../../Config';
import * as APIConstant from '../../core/api.constant';
import GLOBAL from '../../Global';
export default {
  headers : {'Authorization': 'Bearer '+GLOBAL.getToken()},
  GetAlltipoproducto(){  
    return axios.get(CONFIG.API_URL+'tipoproducto')
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetOnlyOnetipoproducto(code){
    return axios.get(CONFIG.API_URL+'tipoproducto/'+code)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  Creartipoproducto(data){
    return axios.post(CONFIG.API_URL+'tipoproducto',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  Updatetipoproducto(data){
    return axios.post(CONFIG.API_URL+'tipoproducto/update',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  Eliminartipoproducto(data){
    return axios.post(CONFIG.API_URL+'tipoproducto/eliminar',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
}
  
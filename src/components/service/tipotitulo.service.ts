import axios from 'axios';
import * as CONFIG from '../../Config';
import * as APIConstant from '../../core/api.constant';
import GLOBAL from '../../Global';
export default {
  headers : {'Authorization': 'Bearer '+GLOBAL.getToken()},
  GetAlltipotitulo(){  
    return axios.get(CONFIG.API_URL+'tipotitulo')
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetOnlyOnetipotitulo(code){
    return axios.get(CONFIG.API_URL+'tipotitulo/'+code)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  Creartipotitulo(data){
    return axios.post(CONFIG.API_URL+'tipotitulo',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  Updatetipotitulo(data){
    return axios.post(CONFIG.API_URL+'tipotitulo/update',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  Eliminartipotitulo(data){
    return axios.post(CONFIG.API_URL+'tipotitulo/eliminar',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  activar(data){
    return axios.post(CONFIG.API_URL+'tipotitulo/activar',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  }
}
  
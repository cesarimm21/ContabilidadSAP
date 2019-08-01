import axios from 'axios';
import * as CONFIG from '../../Config';
import * as APIConstant from '../../core/api.constant';
import GLOBAL from '../../Global';
export default {
  headers : {'Authorization': 'Bearer '+GLOBAL.getToken()},
  GetAllPrioridad(){  
    return axios.get(CONFIG.API_URL+'prioridad')
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetAllPrioridad2(){  
    return axios.get(CONFIG.API_URL+'prioridad2')
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetOnlyOnePrioridad(code){  
    return axios.get(CONFIG.API_URL+'prioridad/'+code)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  Crearprioridad(data){
    return axios.post(CONFIG.API_URL+'prioridad/create',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  Updateprioridad(data){
    return axios.post(CONFIG.API_URL+'prioridad/update',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  desactivarprioridad(data){
    return axios.post(CONFIG.API_URL+'prioridad/desactivar',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  activar(data){
    return axios.post(CONFIG.API_URL+'prioridad/activar',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
}
  
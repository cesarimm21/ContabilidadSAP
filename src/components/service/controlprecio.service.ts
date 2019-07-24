import axios from 'axios';
import * as CONFIG from '../../Config';
import * as APIConstant from '../../core/api.constant';
import GLOBAL from '../../Global';
export default {
  headers : {'Authorization': 'Bearer '+GLOBAL.getToken()},
  GetAllControlPrecio(){  
    return axios.get(CONFIG.API_URL+'controlprecio')
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetAllControlPrecio2(){  
    return axios.get(CONFIG.API_URL+'controlprecio2')
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetOnlyOneControlPrecio(code){
    return axios.get(CONFIG.API_URL+'controlprecio/'+code)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  
  Crearcontrolprecio(data){
    return axios.post(CONFIG.API_URL+'controlprecio',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  Updatecontrolprecio(data){
    return axios.post(CONFIG.API_URL+'controlprecio/update',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  Eliminarcontrolprecio(data){
    return axios.post(CONFIG.API_URL+'controlprecio/eliminar',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  Activarcontrolprecio(data){
    return axios.post(CONFIG.API_URL+'controlprecio/activar',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
}
  
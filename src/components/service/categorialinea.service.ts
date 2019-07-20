import axios from 'axios';
import * as CONFIG from '../../Config';
import * as APIConstant from '../../core/api.constant';
import GLOBAL from '../../Global';
export default{
  headers : {'Authorization': 'Bearer '+GLOBAL.getToken()},
  GetAllCategoriaLinea(){      
    debugger;
    return axios.get(CONFIG.API_URL+'categorialinea')
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetAllCategoriaLineaView(){ 
    return axios.get(CONFIG.API_URL+'categorialinea/view')
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  CrearCategoriaLinea(data){      
    debugger;
    return axios.post(CONFIG.API_URL+'categorialinea',data)
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  UpdateCategoriaLinea(data){      
    debugger;
    return axios.post(CONFIG.API_URL+'categorialinea/update',data)
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetOneCategoriaLinea(code){      
    debugger;
    return axios.get(CONFIG.API_URL+'categorialinea/'+code)
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  EliminarCategoriaLinea(data){      
    debugger;
    return axios.post(CONFIG.API_URL+'categorialinea/eliminar',data)
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  inactivarCategoriaLinea(documento){
    return axios.post(CONFIG.API_URL+'categorialinea/inactivar',documento)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  activarCategoriaLinea(documento){
    return axios.post(CONFIG.API_URL+'categorialinea/activar',documento)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
}
  
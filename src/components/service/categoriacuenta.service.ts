import axios from 'axios';
import * as CONFIG from '../../Config';
import * as APIConstant from '../../core/api.constant';
import GLOBAL from '../../Global';
export default{
  headers : {'Authorization': 'Bearer '+GLOBAL.getToken()},
  GetAllCategoriaCuenta(){      
    debugger;
    return axios.get(CONFIG.API_URL+'categoriacuenta')
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetAllCategoriaCuenta2(){      
    debugger;
    return axios.get(CONFIG.API_URL+'categoriacuenta2')
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetAllCategoriaCuentaView(){      
    return axios.get(CONFIG.API_URL+'categoriacuenta/view')
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetOnlyOneCategoriaCuenta(code){
    return axios.get(CONFIG.API_URL+'categoriacuenta/'+code)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  
  Crearcategoriacuenta(data){
    return axios.post(CONFIG.API_URL+'categoriacuenta',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  Updatecategoriacuenta(data){
    return axios.post(CONFIG.API_URL+'categoriacuenta/update',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  Eliminarcategoriacuenta(data){
    return axios.post(CONFIG.API_URL+'categoriacuenta/eliminar',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  inactivarcategoriacuenta(documento){
    return axios.post(CONFIG.API_URL+'categoriacuenta/inactivar',documento)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  activarcategoriacuenta(documento){
    return axios.post(CONFIG.API_URL+'categoriacuenta/activar',documento)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
}
  
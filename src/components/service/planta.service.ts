import axios from 'axios';
import * as CONFIG from '../../Config';
import * as APIConstant from '../../core/api.constant';
import GLOBAL from '../../Global';
export default{
  headers : {'Authorization': 'Bearer '+GLOBAL.getToken()},
  GetAllPlanta(){      
    debugger;
    return axios.get(CONFIG.API_URL+'planta')
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetOnlyOneplanta(code){  
    return axios.get(CONFIG.API_URL+'planta/'+code)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  }
  ,
  Crearplanta(data){
    return axios.post(CONFIG.API_URL+'planta',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  Updateplanta(data){
    return axios.post(CONFIG.API_URL+'planta/update',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  Eliminarplanta(data){
    return axios.post(CONFIG.API_URL+'planta/eliminar',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
}

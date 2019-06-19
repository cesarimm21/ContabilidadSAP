import axios from 'axios';
import * as CONFIG from '../../Config';
import * as APIConstant from '../../core/api.constant';
import GLOBAL from '../../Global';
export default{
  headers : {'Authorization': 'Bearer '+GLOBAL.getToken()},
  GetAllPeriodo(){ 
    return axios.get(CONFIG.API_URL+'periodo')
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetAllPeriodoLast(periodo){ 
    return axios.post(CONFIG.API_URL+'periodolast',periodo)
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  ConsulaLista(year){ 
    return axios.get(CONFIG.API_URL+'periodo/lista/'+year)
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  ConsulaPeriodo(year){ 
    return axios.get(CONFIG.API_URL+'periodo/cosulta/'+year)
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  CreatePeriodo(anio,usuario){ 
    return axios.get(CONFIG.API_URL+'periodo/create/'+anio+'/'+usuario)
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  updatePeriodo(tblPeriodo){
    return axios.post(CONFIG.API_URL+'periodo/update',tblPeriodo)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  }
}

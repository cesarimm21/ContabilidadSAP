import axios from 'axios';
import * as CONFIG from '../../Config';
import * as APIConstant from '../../core/api.constant';
import GLOBAL from '../../Global';
export default{
  headers : {'Authorization': 'Bearer '+GLOBAL.getToken()},
  GetAllIdioma(){ 
    return axios.get(CONFIG.API_URL+'idioma')
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetAllIdiomaView(){    
    return axios.get(CONFIG.API_URL+'idioma/view')
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetOnlyOneAllIdioma(intLenguaje_ID){
    return axios.get(CONFIG.API_URL+'idioma/'+intLenguaje_ID)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  inactivarIdioma(documento){
    return axios.post(CONFIG.API_URL+'idioma/inactivar',documento)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  activarIdioma(documento){
    return axios.post(CONFIG.API_URL+'idioma/activar',documento)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  createtblIdioma(data){
    return axios.post(CONFIG.API_URL+'idioma/create',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  updatetblIdioma(data){
    return axios.post(CONFIG.API_URL+'idioma/update',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  
}

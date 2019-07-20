import axios from 'axios';
import * as CONFIG from '../../Config';
import * as APIConstant from '../../core/api.constant';
import GLOBAL from '../../Global';
export default{
  headers : {'Authorization': 'Bearer '+GLOBAL.getToken()},
  GetAllTipoDocumento(){  
    return axios.get(CONFIG.API_URL+'tipodocidentidad')
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetAllTipoDocumentoView(){  
    return axios.get(CONFIG.API_URL+'tipodocidentidad/view')
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetOnlyOneTipoDocumento(code){
    return axios.get(CONFIG.API_URL+'tipodocidentidad/'+code)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  deleteTipoDocumento(intIdDocIdent_ID){
    return axios.get(CONFIG.API_URL+'tipodocidentidad/delete/'+intIdDocIdent_ID)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  CreateTipoDocumento(documento){
    return axios.post(CONFIG.API_URL+'tipodocidentidad/create', documento)
    .then(response =>{
        return JSON.parse(JSON.stringify(response.data));
      })
  },
  UpdateTipoDocumento(documento){
    return axios.post(CONFIG.API_URL+'tipodocidentidad/update', documento)
    .then(response =>{
        return JSON.parse(JSON.stringify(response.data));
      })
  },
  inactivarTipoDocumentoa(documento){
    return axios.post(CONFIG.API_URL+'tipodocidentidad/inactivar',documento)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  activarTipoDocumento(documento){
    return axios.post(CONFIG.API_URL+'tipodocidentidad/activar',documento)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
}
  
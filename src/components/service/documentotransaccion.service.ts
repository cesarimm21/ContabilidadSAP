import axios from 'axios';
import * as CONFIG from '../../Config';
import * as APIConstant from '../../core/api.constant';
import GLOBAL from '../../Global';
export default{
  headers : {'Authorization': 'Bearer '+GLOBAL.getToken()},
  GetAllDocumentoTransaccion(){   
    return axios.get(CONFIG.API_URL+'documentotransaccion')
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetAllDocumentoTransaccion2(){   
    return axios.get(CONFIG.API_URL+'documentotransaccion2')
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetOnlyOneDocumentoTransaccion(code){
    return axios.get(CONFIG.API_URL+'documentotransaccion/'+code)
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetOnlyOneDocumentoTransaccion2(code){
    return axios.get(CONFIG.API_URL+'documentotransaccion2/'+code)
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  CrearDocumentoTransaccion(data){
    return axios.post(CONFIG.API_URL+'documentotransaccion',data)
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  UpdateDocumentoTransaccion(data){
    return axios.post(CONFIG.API_URL+'documentotransaccion/update',data)
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  EliminarDocumentoTransaccion(data){
    return axios.post(CONFIG.API_URL+'documentotransaccion/eliminar',data)
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  inactivarDocumentoTransaccion(documento){
    return axios.post(CONFIG.API_URL+'documentotransaccion/inactivar',documento)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  activarDocumentoTransaccion(documento){
    return axios.post(CONFIG.API_URL+'documentotransaccion/activar',documento)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
}
  
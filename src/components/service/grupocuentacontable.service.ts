import axios from 'axios';
import * as CONFIG from '../../Config';
import * as APIConstant from '../../core/api.constant';
import GLOBAL from '../../Global';
export default {
  headers : {'Authorization': 'Bearer '+GLOBAL.getToken()},
  GetAllGrupoCuentaContable(strCompany_Cod){  
    return axios.get(CONFIG.API_URL+'grupocuentacontable/view/'+strCompany_Cod)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetAllGrupoCuentaContable2(strCompany_Cod){  
    return axios.get(CONFIG.API_URL+'grupocuentacontable2/'+strCompany_Cod)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  inactivarGrupoCuentaContable(data){
    return axios.post(CONFIG.API_URL+'grupocuentacontable/inactivar',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  activarGrupoCuentaContable(data){
    return axios.post(CONFIG.API_URL+'grupocuentacontable/activar',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  CrearGrupoCuenta(data){
    return axios.post(CONFIG.API_URL+'grupocuentacontable/create',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  UpdateGrupoCuenta(data){
    return axios.post(CONFIG.API_URL+'grupocuentacontable/update',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  Eliminar(data){
    return axios.post(CONFIG.API_URL+'grupocuentacontable/eliminar',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  getBusqueda(strCompany_Cod,strGrpAcctCont_Cod){
    return axios.get(CONFIG.API_URL+'grupocuentacontable/'+strGrpAcctCont_Cod+'/'+strCompany_Cod)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  }
}
  
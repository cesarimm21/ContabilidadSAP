import axios from 'axios';
import * as CONFIG from '../../Config';
import * as APIConstant from '../../core/api.constant';
import GLOBAL from '../../Global';
export default{
  headers : {'Authorization': 'Bearer '+GLOBAL.getToken()},
  GetAllPlanCuenta(){ 
    return axios.get(CONFIG.API_URL+'plancuentas')
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetAllPlanCuenta2(strCompany_Cod){ 
    return axios.get(CONFIG.API_URL+'planconlocal/'+strCompany_Cod)
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetAllPlanConLocal(){    
    return axios.get(CONFIG.API_URL+'planconlocal')
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetAllPlanConLocalView(strCompany_Cod){    
    return axios.get(CONFIG.API_URL+'planconlocal/view/'+strCompany_Cod)
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetOnlyOneAllPlanConLocal(intIdChartAcct_L_ID){
    return axios.get(CONFIG.API_URL+'planconlocal/'+intIdChartAcct_L_ID)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  inactivarPlanConLocal(documento){
    return axios.post(CONFIG.API_URL+'planconlocal/inactivar',documento)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  activarPlanConLocal(documento){
    return axios.post(CONFIG.API_URL+'planconlocal/activar',documento)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  createtblPlanConLocal(data){
    return axios.post(CONFIG.API_URL+'planconlocal/create',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  updatetblPlanConLocal(data){
    return axios.post(CONFIG.API_URL+'planconlocal/update',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  
}

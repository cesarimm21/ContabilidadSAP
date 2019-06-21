import axios from 'axios';
import * as CONFIG from '../../Config';
import * as APIConstant from '../../core/api.constant';
import GLOBAL from '../../Global';
export default{
  headers : {'Access-Control-Allow-Origin':'*'},
  GetBalance(datar){
    return axios.get(CONFIG.API_URL+'balancecuenta/'+datar.strCompany_Cod+'/'+datar.intYear+'/'+datar.strAcc_Local_NO)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetBalanceComprabacion(datar){
    return axios.get(CONFIG.API_URL+'balancecuenta/comprobacion/'+datar.strCompany_Cod+'/'+datar.intYear+'/'+datar.strAcc_Local_NO)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  CreateBalance(data){
    return axios.post(CONFIG.API_URL+'balancecuenta',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  }
}
  
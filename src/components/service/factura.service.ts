import axios from 'axios';
import * as CONFIG from '../../Config';
import * as APIConstant from '../../core/api.constant';
import GLOBAL from '../../Global';
export default{
  headers : {'Authorization': 'Bearer '+GLOBAL.getToken()},
  CreateFactura(FacturaModel){    
    return axios.post(CONFIG.API_URL+'factura',FacturaModel)
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetFacturaId(Factura){ 
    debugger;   
    return axios.get(CONFIG.API_URL+'factura/'+Factura)
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetFacturaDate(dtmDue_Date){ 
    return axios.get(CONFIG.API_URL+'factura/payrun/'+dtmDue_Date+'T00:00:00.000Z')
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },

}
  
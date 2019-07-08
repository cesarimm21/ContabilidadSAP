//var intCodUsuario;
export default {
    token:'',
    isActive:false,
    isCollapse:false,
    vmmaterial:'',
    codematerial:'',
    nameComponent:'',
    filter:false,
    columna:'',
    routeInicio:'',
    routeLogin:'',
    falseortrue:false,
    limpiarDatosSession(){
      this.token='';
    },
    setColumna(val){
      this.columna=val;
    },
    getColumna(){
      return this.columna;
    },
    getActive(){
      return this.isActive;
    },
    getFilter(){
      return this.filter;
    },
    setActive(isActive){
      return this.isActive=isActive;
    },
    getCollapse(){
      return this.isCollapse;
    },
    setCollapse(isCollapse){
      this.isCollapse=isCollapse;
    },
    setToken(token){
      this.token=token;
      window.sessionStorage.setItem('usuario_token',token);
    },
    getToken(){
      if(this.token ===''){
        return window.sessionStorage.getItem('usuario_token');
      }
      else{
        return this.token;
      }
    },
    getParseDate(fecha){
      if(fecha!=undefined){
        var Datef=new Date(fecha);
        var dia = Datef.getDate();
        var mes = (Datef.getMonth()<12) ? Datef.getMonth()+1 : mes = Datef.getMonth();
        var yyyy = Datef.getFullYear();
        var dd = (dia<10) ? '0'+dia : dd=dia;
        var mm = (mes<10) ? '0'+mes : mm=mes;
        return yyyy+'-'+mm+'-'+dd;
      }
      else{
        return '';
      }
    },
    getNombreMes(mes){
      if(mes==1)return "Enero"
      if(mes==2)return "Febrero"
      if(mes==3)return "Marzo"
      if(mes==4)return "Abril"
      if(mes==5)return "Mayo"
      if(mes==6)return "Junio"
      if(mes==7)return "Julio"
      if(mes==8)return "Agosto"
      if(mes==9)return "Septiembre"
      if(mes==10)return "Octubre"
      if(mes==11)return "Noviembre"
      if(mes==12)return "Diciembre"
    },
    getDate(fecha){
      var Datef=new Date(fecha);
      var dia = Datef.getDate();
      var mes = (Datef.getMonth()<12) ? Datef.getMonth()+1 : mes = Datef.getMonth();
      var yyyy = Datef.getFullYear();
      var dd = (dia<10) ? '0'+dia : dd=dia;
      var mm = (mes<10) ? '0'+mes : mm=mes;
      // return yyyy+'/'+mm+'/'+dd+;
      return mm+'/'+yyyy;
    },
    getDateVencidaForView(fecha){
      var Datef=new Date(fecha);
      var dia = Datef.getDate();
      var mes = (Datef.getMonth()<12) ? Datef.getMonth()+1 : mes = Datef.getMonth();
      var yyyy = Datef.getFullYear();
      var dd = (dia<10) ? '0'+dia : dd=dia;
      var mm = (mes<10) ? '0'+mes : mm=mes;
      // return yyyy+'/'+mm+'/'+dd+;
      return yyyy+'-'+mm+'-'+dd;
    },
    getDateVencida(fecha,val){      
      
      var Datef=new Date(fecha);
      Datef.setDate(Datef.getDate()+parseInt(val)+1);
      var dia = Datef.getDate()+val;
      var mes = (Datef.getMonth()<12) ? Datef.getMonth()+1 : mes = Datef.getMonth();
      var yyyy = Datef.getFullYear();
      var dd = (dia<10) ? '0'+dia : dd=dia;
      var mm = (mes<10) ? '0'+mes : mm=mes;
      return Datef;
    },
    getDateString(fecha){     
      var Datef=new Date(fecha);
      Datef.setDate(Datef.getDate());
      var dia = Datef.getDate();
      var mes = (Datef.getMonth()<12) ? Datef.getMonth()+1 : mes = Datef.getMonth();
      var yyyy = Datef.getFullYear();
      var dd = (dia<10) ? '0'+dia : dd=dia;
      var mm = (mes<10) ? '0'+mes : mm=mes;
      return yyyy+'-'+mm+'-'+dd;
    },
      DateEnd(fecha){     
      var Datef=new Date(fecha);
      var dia=Datef.getDay();
      var mes=Datef.getMonth();
      var year=Datef.getFullYear();
      // Datef.setDate(Datef.getDate());
      // var dia = Datef.getDay();
      // var mes = (Datef.getMonth()<12) ? Datef.getMonth()+1 : mes = Datef.getMonth();
      // var yyyy = Datef.getFullYear();
      var dd = (dia<10) ? '0'+dia : dd=dia;
      var mm = (mes<10) ? '0'+mes : mm=mes;
      return year+'-'+mm+'-'+dd;
    },
    like(array, key,keyword) {    
      var responsearr:any = []
      for(var i=0;i<array.length;i++) {
          if(array[i][key].toString().toLowerCase().indexOf(keyword.toLowerCase()) > -1 ) {
            responsearr.push(array[i])
        }
      }
      return responsearr
    }
}

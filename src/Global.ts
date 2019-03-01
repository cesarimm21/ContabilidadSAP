//var intCodUsuario;
export default {
    token:'',
    isActive:false,
    isCollapse:false,
    vmmaterial:'',
    codematerial:'',
    limpiarDatosSession(){
      this.token='';
    },
    getActive(){
      return this.isActive;
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
      debugger;
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
      var Datef=new Date(fecha);
      var dia = Datef.getDate();
      var mes = (Datef.getMonth()<12) ? Datef.getMonth()+1 : mes = Datef.getMonth();
      var yyyy = Datef.getFullYear();
      var dd = (dia<10) ? '0'+dia : dd=dia;
      var mm = (mes<10) ? '0'+mes : mm=mes;
      return yyyy+'-'+mm+'-'+dd;
    },
}

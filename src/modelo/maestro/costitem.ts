export class CostItemModel {
    intCost_Item_Cod:number;
    strCompany_Cod:string;
    strCompany_Desc:string;
    strCost_Item_Cod:string;
    strCost_Item_Pos1:string;
    strCost_Item_Desc1:string;
    strCost_Item_Pos2:string;
    strCost_Item_Desc2:string;
    strCost_Item_Pos3:string;
    strCost_Item_Desc3:string;
    strCreation_User:string;
    dtmCreation_Date:Date;
    strModified_User:string;
    dtmModified_Date:Date;
    chrStatus:string;
    constructor(){
        this.intCost_Item_Cod=-1;
        this.strCompany_Cod='';
        this.strCompany_Desc='';
        this.strCost_Item_Cod='';
        this.strCost_Item_Pos1='';
        this.strCost_Item_Desc1='';
        this.strCost_Item_Pos2='';
        this.strCost_Item_Desc2='';
        this.strCost_Item_Pos3='';
        this.strCost_Item_Desc3='';
        this.strCreation_User='';
        this.strModified_User='';
        this.dtmCreation_Date=new Date();
        this.dtmModified_Date=new Date();
        this.chrStatus='';
    }
}
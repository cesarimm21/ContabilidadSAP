export class AccesoModel {
    intIdRolAcc_ID:number;
    strName: string;
    strDescription:string;
    strAcceso_Cod:string;
    strLink:string;
    intLevel:number;
    intLevel2:number;
    strIndex:string;
    intFather:number;
    strClick_Name:number;
    strIcon_Name:number;
    strCreation_User:string;
    dtmCreation_Date:Date;
    strModified_User:string;
    dtmModified_Date:Date;
    chrStatus:string;
    childLevel1:AccesoModel[];
}
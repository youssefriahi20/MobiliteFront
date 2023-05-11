import { Publication } from "./Publication";
import { User } from "./User";

export class Commentaires{
    idComment:number;
    contenu:string;
    dateCmnt:Date;
    publication:Publication;
    user:User;
}
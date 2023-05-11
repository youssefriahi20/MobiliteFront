import { Commentaires } from "./Commentaires";
import { Favoris } from "./Favoris";
import { User } from "./User";

export class Publication{
     idPub:number;
    title:string;
    contenu:string;
    path:string;
    user:User;
    bloquercmnt:boolean;
    favoris:Favoris
    commentaires:Commentaires[];
}
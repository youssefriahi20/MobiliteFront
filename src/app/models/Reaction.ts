import { Commentaires } from "./Commentaires";
import { Publication } from './Publication';

export class Reaction{
    idReact:number;
    ReactType:string;
    commentaire:Commentaires;
    publication:Publication;
}
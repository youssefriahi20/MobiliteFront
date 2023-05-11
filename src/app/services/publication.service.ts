import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Publication } from '../models/Publication';
import { Observable } from 'rxjs';
import { Commentaires } from '../models/Commentaires';
import { Reaction } from '../models/Reaction';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  private baseURL = "http://localhost:8099/MobiliteInternationale/publication/add-publication";
  private baseURL1 = "http://localhost:8099/MobiliteInternationale/publication/retrieve-all-Publication";
  private baseURL2 = "http://localhost:8099/MobiliteInternationale/publication/retrieve-Publication";
  
  private baseURL3 = "http://localhost:8099/MobiliteInternationale/Commentaire/retrieve-all-Commentaire";
  private baseURL4 = "http://localhost:8099/MobiliteInternationale/Commentaire/add-Commentaire";
  private baseURL5 = "http://localhost:8099/MobiliteInternationale/Reaction/add-Reaction";
  private baseURL6 = "http://localhost:8099/MobiliteInternationale/publication/add-Favoris-publication";
   private baseURL7 = "http://localhost:8099/MobiliteInternationale/publication/Favoris-PublicationCheck";
   private baseURL8="http://localhost:8099/MobiliteInternationale/publication/Update_Last_Time_Seen"
   private baseURL9="http://localhost:8099/MobiliteInternationale/publication/Favoris-Publication"
   private baseURL10="http://localhost:8099/MobiliteInternationale/publication/Publication-Similaires"
  constructor(private HttpClient: HttpClient) { }

  create(data: Publication): Observable<Object> {
    return this.HttpClient.post(`${this.baseURL}`, data);

  }

  findAll():Observable<Publication[]>{
    return this.HttpClient.get<Publication[]>(`${this.baseURL1}`);
  }

  FindPubSimilaires(idUser:number,id: number): Observable<Publication[]>{
    return this.HttpClient.get<Publication[]>(`${this.baseURL10}/${idUser}/${id}`);
  }

  updateLastTimeSeen(idUser:number,id: number): Observable<Publication>{
    return this.HttpClient.get<Publication>(`${this.baseURL8}/${idUser}/${id}`);
  }



  getPubById(id: number): Observable<Publication>{
    return this.HttpClient.get<Publication>(`${this.baseURL2}/${id}`);
  }
  FavCheck(idUser:number,idPub:number): Observable<any>{
    return this.HttpClient.get<any>(`${this.baseURL7}/${idUser}/${idPub}`);
  }
  addPubToFavoris(idUser:number,idPub:number): Observable<Object>{
    return this.HttpClient.post(`${this.baseURL6}/${idUser}/${idPub}`,{});
  }

  findAllCommentaires():Observable<Commentaires[]>{
    return this.HttpClient.get<Commentaires[]>(`${this.baseURL3}`);
  }
  GetUnseenComments(idUser:number,idPub:number):Observable<Commentaires[]>{
    return this.HttpClient.get<Commentaires[]>(`${this.baseURL9}/${idUser}/${idPub}`);
  }
  createCommentaire(data: Commentaires,idUser: number,idPub:number): Observable<Object>{
    return this.HttpClient.post(`${this.baseURL4}/${idUser}/${idPub}`, data);
  }

  React(data: Reaction,idCmnt: number): Observable<Object>{
    return this.HttpClient.post(`${this.baseURL5}/${idCmnt}`, data);
  }
}

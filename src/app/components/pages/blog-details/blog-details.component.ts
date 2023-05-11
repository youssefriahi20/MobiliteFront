import { Publication } from './../../../models/Publication';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PublicationService } from 'src/app/services/publication.service';
import { Commentaires } from '../../../models/Commentaires';
import { HttpResponse } from '@angular/common/http';

import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss']
})
export class BlogDetailsComponent implements OnInit {
id:number;
isFavorite: boolean;
pub:Publication;
PublSimilaires:Publication[];
liked:number;
Dislike:number;

alert:number;
commentaire:Commentaires = new Commentaires();
  constructor(private route: ActivatedRoute,
    private service:PublicationService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.liked=0;
    this.id = this.route.snapshot.params['id'];
    this.pub=new Publication();
    // find by id publication 
    this.service.getPubById(this.id).subscribe(
      data => {
        this.pub = data;
        // Favoris 
       this.service.FavCheck(2,data.idPub).subscribe(data=>{
        this.isFavorite=data;
        console.log(this.isFavorite);

        
        
       })
       // find les commentaires non vus 
       this.service.GetUnseenComments(2,data.idPub).subscribe(data=>{
        console.log(data)
        this.alert=data.length;
        if (this.alert>0)
        // notifications commentaires non vus 
        this.toastr.success('This publication has '+ this.alert +' new comments.', 'Information', { timeOut: 4000 });
        console.log(this.alert);
       })
       // apres avoir consulter la publication , tout les commentaires sont consultés 
       this.service.updateLastTimeSeen(2,data.idPub).subscribe(data=>{

       })
        // pour afficher les publications similaires 
       this.service.FindPubSimilaires(1,data.idPub).subscribe(data=>{
this.PublSimilaires=data;
       })
      });
      

  
    }

    // find comments 
  getCommentaires(){
    this.service.findAllCommentaires().subscribe( data => {
      console.log("azeaze"+data.length); 
this.pub.commentaires=data;

    });
  }

  // add comments 
  addCommentaire(){
    this.service.createCommentaire(this.commentaire,2,this.pub.idPub).subscribe((data) => {
      console.log('Commentaire added successfully', data);
    }, (error) => {
      console.error('Error adding Commentaire', error);
    });
    // pour naviguer a une autre page 
    this.router.navigate(['blog']);
  }

 

  addFavoris(){
    this.service.addPubToFavoris(2,this.pub.idPub).subscribe(
    
      error => console.error(error)
    );
    
    // rafraichir la fenetre 
    window.location.reload();
  }

  // like dislike 
 Reaction(type:string,idUser:number,idPub:number){
  this.service.React(this.pub.idPub,type,this.pub.user.id).subscribe((data)=>{
    console.log(data.idReact);
      if (type=='Dislike')
      {
        this.liked=0;
      }
      else{
        this.liked=1;
      }
      console.log("like ="+this.liked+"Dislike ="+this.Dislike)
  });
 }
  
}

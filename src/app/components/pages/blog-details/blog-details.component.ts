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

alert:number;
commentaire:Commentaires = new Commentaires();
  constructor(private route: ActivatedRoute,
    private service:PublicationService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    
    this.id = this.route.snapshot.params['id'];
    this.pub=new Publication();
    this.service.getPubById(this.id).subscribe(
      data => {
        this.pub = data;
       this.service.FavCheck(2,data.idPub).subscribe(data=>{
        this.isFavorite=data;
        console.log(this.isFavorite);

        
        
       })
       this.service.GetUnseenComments(2,data.idPub).subscribe(data=>{
        console.log(data)
        this.alert=data.length;
        if (this.alert>0)
        this.toastr.success('This publication has '+ this.alert +' new comments.', 'Information', { timeOut: 4000 });
        console.log(this.alert);
       })
       this.service.updateLastTimeSeen(2,data.idPub).subscribe(data=>{

       })

       this.service.FindPubSimilaires(1,data.idPub).subscribe(data=>{
this.PublSimilaires=data;
       })
      });
      

  
    }

  getCommentaires(){
    this.service.findAllCommentaires().subscribe( data => {
      console.log("azeaze"+data.length); 
this.pub.commentaires=data;

    });
  }

  addCommentaire(){
    this.service.createCommentaire(this.commentaire,2,this.pub.idPub).subscribe((data) => {
      console.log('Commentaire added successfully', data);
    }, (error) => {
      console.error('Error adding Commentaire', error);
    });
    this.router.navigate(['blog']);
  }

 

  addFavoris(){
    this.service.addPubToFavoris(2,this.pub.idPub).subscribe(
    
      error => console.error(error)
    );
    
    window.location.reload();
  }

 
  
}

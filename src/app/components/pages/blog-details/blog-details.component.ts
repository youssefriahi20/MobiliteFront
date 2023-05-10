import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Publication } from 'src/app/models/Publication';
import { PublicationService } from 'src/app/services/publication.service';
import { Commentaires } from '../../../models/Commentaires';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss']
})
export class BlogDetailsComponent implements OnInit {
id:number;
pub:Publication;
likes =0;
dislikes=0;
commentaire:Commentaires = new Commentaires();
  constructor(private route: ActivatedRoute,
    private service:PublicationService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.pub=new Publication();
    this.service.getPubById(this.id).subscribe(
      data => {
        this.pub = data;
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
  }

  like() {
    this.likes++;
    this.dislikes--;
  }

  dislike() {
    this.dislikes++;
    this.likes--;
  }


}

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreatePubPopUpComponent } from '../create-pub-pop-up/create-pub-pop-up.component';
import { PublicationService } from '../../../services/publication.service';
import { Publication } from 'src/app/models/Publication';
import { Router } from '@angular/router';
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  publications: Publication[];
  constructor(private dialogRef:MatDialog,
    private service:PublicationService ,
    private router: Router) { }
    
 openDialog() {
  this.dialogRef.open(CreatePubPopUpComponent);

 }
  ngOnInit(): void {
  this.getPublications();
  
    
  }

  getPublications(){
    this.service.findAll().subscribe( data => {
      console.log(data.length); 
this.publications=data;
    });
  }

  PubDetails(id: number){
    console.log("azeaeaz")
    this.router.navigate(['blog-details', id]);
  }
}

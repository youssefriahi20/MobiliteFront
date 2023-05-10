import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import {MatDialog} from "@angular/material/dialog";
import { Publication } from '../../../models/Publication';
import { PublicationService } from 'src/app/services/publication.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-create-pub-pop-up',
  templateUrl: './create-pub-pop-up.component.html',
  styleUrls: ['./create-pub-pop-up.component.scss']
})
export class CreatePubPopUpComponent implements OnInit {
  isChecked: boolean = false;
  pub:Publication=new Publication();
  constructor(private service:PublicationService,
  private dialogRef:MatDialogRef<CreatePubPopUpComponent>) { }

  ngOnInit(): void {
  }

  add() {
    this.pub.user=new User();
    this.pub.user.id=1;
    this.pub.bloquercmnt=this.isChecked;
  this.service.create(this.pub).subscribe(data=>this.dialogRef.close())
 }
 onCheckboxChange(event: any) {
  console.log('Checkbox value changed: ', this.isChecked);
}
}

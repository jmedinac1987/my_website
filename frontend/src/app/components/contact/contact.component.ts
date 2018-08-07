import { Component, OnInit } from '@angular/core';
import { EmailService } from '../../services/email.service';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  public form = {
  	email: null,
  	name: null,
  	asunto: null,
  	content: null
  }

  constructor(private emailService: EmailService, private notify: SnotifyService) { }

  ngOnInit() {
  }

  onSubmit(){
  	this.emailService.sendEmailWebsite(this.form).subscribe(data => {
      this.handleData(data);
      console.log(data);
    },error => {
      this.handleError(error);
      console.log(error);
    });
  }

  handleError(error){  
    if (error.status === 0) {
      this.notify.error('Lo sentimos en este momento no podemos procesar su solicitud', {timeout:2000});  
    }else{      
      this.notify.error(error.error.message, {timeout:2000});  
      
    }
  }

  handleData(data){
    this.notify.success(data.message, {timeout:5000});          
    this.form = {
      email: null,
      name: null,
      asunto: null,
      content: null
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { EmailService } from '../../services/email.service';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  showSpinner: boolean;

  public form = {
  	email: null,
  	name: null,
  	asunto: null,
  	content: null
  }

  private timeout = {
    timeout: 5000
  }

  private list_white_server_email: String[] = ["gmail", "hotmail", "yahoo", "outlook"];  

  constructor(private emailService: EmailService, private notify: SnotifyService) { }

  ngOnInit() {
  }

  onSubmit(){
    this.showSpinner = true;
    if (this.validateEmail(this.form.email)){
      this.emailService.sendEmailWebsite(this.form).subscribe(data => {
        this.handleData(data);        
      },error => {
        this.handleError(error);        
      });
    }else{      
      this.showSpinner = false;
      let message = "Lo sentimos :S, por favor suministre una cuenta email valida";
      this.notify.error(message, this.timeout);  
    }
  }

  handleError(error){          
    this.showSpinner = false;  
    if (error.status === 0) {        
      this.notify.error('Lo sentimos en este momento no podemos procesar su solicitud',this.timeout);  
    }else{           
      this.notify.error(error.error.message,this.timeout);        
    }
  }

  handleData(data){
    this.showSpinner = false;  
    this.notify.success(data.message,this.timeout);          
    this.form = {
      email: null,
      name: null,
      asunto: null,
      content: null
    }
  }

  validateEmail (email) {
    let regular_expression = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (regular_expression.test(email)) {
        let emailString = email.split('@');
        let servidor_email = emailString[1].split('.');
        return (this.list_white_server_email.indexOf(servidor_email[0])) > -1 ? true : false;
    } else {
        return false;
    }
  }
}
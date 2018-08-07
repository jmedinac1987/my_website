import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

public form = {
	email: null,
	name: null,
	password: null,
	asunto: null,
	content: null
}
  constructor() { }

  ngOnInit() {
  }

  onSubmit(){
  	console.log('funciona');
  }
}

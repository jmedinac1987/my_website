import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit { 
    
  constructor(private router: Router) { }

  ngOnInit() {    
    
  }

  hideMenu(){    
    if(document.querySelectorAll('#navbarNav')[0].attributes[1].value === "navbar-collapse collapse show"){      
      document.querySelectorAll('#navbarNav')[0].attributes[1].value = "navbar-collapse collapse";
    };
  }

}

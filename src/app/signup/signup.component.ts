import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(private renderer: Renderer2) {
    this.renderer.addClass(document.body, 'register-page');
  }

  ngOnInit(): void {}
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
    readonly username: string = "sir bumi";

  constructor() {
    this.username = "sir bumi";
    console.log(this.username)
  }

  ngOnInit(): void {
  }

  test(){
    console.log("asd");
  }

}

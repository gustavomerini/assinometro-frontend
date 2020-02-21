import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-children',
  templateUrl: './children.component.html',
})
export class ChildrenLoginComponent implements OnInit {

  constructor() { 
    console.log("login children bootstrap");
  }

  ngOnInit(): void {
  }

}

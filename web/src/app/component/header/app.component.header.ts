/**
 * Created by mayanklohani on 07/03/17.
 */
import {Component, OnInit} from "@angular/core";

// css imports
import './app.component.header.sass'

@Component({
  selector   : 'app-header-component',
  templateUrl: './app.component.header.html',
})
export class AppHeaderComponent extends OnInit {

  constructor() {
    super();
  }

  ngOnInit() {

  }
}
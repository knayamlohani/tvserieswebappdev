/**
 * Created by mayanklohani on 12/03/17.
 */

import {Component, Input, OnInit} from "@angular/core";
import {CastMember} from "../../model/app.model.cast_member";
import {LoggerService} from "../../service/app.service.logger";

// css imports
import './app.component.cast_member.sass'

@Component({
  selector   : 'cast-member-component',
  templateUrl: './app.component.cast_member.html',
})
export class CastMemberComponent extends OnInit {
  @Input("tvSeriesCastMember") castMember: CastMember;

  constructor(private logger: LoggerService) {
    super();
  }


  ngOnInit(): void {

  }
}
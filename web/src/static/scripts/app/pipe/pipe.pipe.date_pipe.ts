/**
 * Created by mayanklohani on 13/03/17.
 */


import {Pipe, PipeTransform} from "@angular/core";
import {DATE_CONSTANTS} from "../constant/app.constant.date_constants";
import {LoggerService} from "../service/app.service.logger";

@Pipe({
  name: 'datePipe'
})
export class DatePipe implements PipeTransform {
  monthNames: String [] = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];


  constructor(private logger: LoggerService) {
  }

  transform(date: any, type: DATE_CONSTANTS): any {
    try {
      date  = new Date(date);
      this.logger.info(`${date}, ${type}, ${DATE_CONSTANTS.SHORT_DATE}`);
      switch (type) {
        case DATE_CONSTANTS.SHORT_DATE:
          return `${this.monthNames[date.getMonth()].slice(0,3)} ${date.getDate()}, ${date.getFullYear()}`;
        default:
          return date;
      }
    } catch (e) {
      throw new Error("Please provide a valid date/date string")
    }
  }
}
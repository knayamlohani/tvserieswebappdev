/**
 * Created by mayanklohani on 08/03/17.
 */

import {Injectable} from "@angular/core";

@Injectable()
export class LoggerService {
  info (message: any)  { console.log('info:', message) }
  warm (message: any)  { console.warn('warn:', message) }
  error (message: any) { console.error('error:', message) }

}
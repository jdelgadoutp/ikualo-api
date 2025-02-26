import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHome(): {} {
    return { 
      Api: "Ikualo API",
      Version: '0.1',
      Description: "API REST sistema financiero",  
    };
  }
}

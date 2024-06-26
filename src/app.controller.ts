import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('leads')
  async getLeads(@Query('query') query: string): Promise<string> {
    return await this.appService.getLeads(query);
  }
}

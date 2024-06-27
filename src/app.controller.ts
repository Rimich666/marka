import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { LeadType } from './types/lead-type';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('leads')
  async getLeads(@Query('query') query: string): Promise<LeadType[]> {
    return await this.appService.getLeads(query);
  }
}

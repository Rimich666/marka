import {Injectable} from '@nestjs/common';
import {HttpService} from '@nestjs/axios';
import {LeadType} from './types/lead-type';
import convertLeads from './helpers/convert-leads';

const BASE_URL = 'https://89179699365.amocrm.ru/api/v4';
const HEADERS = {
  Authorization:
    'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjMyYTQ1MDc0ZDY1YTMwYThiNmUzNWE4ZGQxNDkzNTZmOGFkZDliNmVkMmNhNWVmOWE3MWIxOWJhNTg4MjkyMGVjOTFiYmI4MmMxNzJiOWRhIn0.eyJhdWQiOiI0YTg0ZGM1OS1kNmZlLTQ4MzEtYTk2Zi00YWVjMTdjZjk5NzIiLCJqdGkiOiIzMmE0NTA3NGQ2NWEzMGE4YjZlMzVhOGRkMTQ5MzU2ZjhhZGQ5YjZlZDJjYTVlZjlhNzFiMTliYTU4ODI5MjBlYzkxYmJiODJjMTcyYjlkYSIsImlhdCI6MTcxOTQyMzQxMCwibmJmIjoxNzE5NDIzNDEwLCJleHAiOjE3MTk3MDU2MDAsInN1YiI6IjExMjA2MDU0IiwiZ3JhbnRfdHlwZSI6IiIsImFjY291bnRfaWQiOjMxODIwNDUwLCJiYXNlX2RvbWFpbiI6ImFtb2NybS5ydSIsInZlcnNpb24iOjIsInNjb3BlcyI6WyJjcm0iLCJmaWxlcyIsImZpbGVzX2RlbGV0ZSIsIm5vdGlmaWNhdGlvbnMiLCJwdXNoX25vdGlmaWNhdGlvbnMiXSwiaGFzaF91dWlkIjoiYzQ5NDllYzktYjViNy00NDNlLTg0MzQtMWQ0ZjE3MGQzOGYyIn0.FCjbCJM_A0StBme5cVrUt6GNTZh-Ejnoesb1Fzi9KS41NfyByaFbv8xTFgleuWYH7DN6WHu3B4XoDMI1dmmOtWILegpClj3nUsbWnfElIflg1C4_xR5mQRNUXSDiXzZltjSccskul3gMAqNibWBgmiMHZiItFI-UWrc5uVH4xjCJtpan1duFv_O2mBKX8ouNpNJzIgH07LJTPL8LmJI72OMyDlkICPEagMwYBdH25xhfdd34qtCODEKLhWB4vls3v8b1G6H8ttUstYvndaofUZTiP-royKNmuxoks_2AY3AIl4DtzuoYGErf6wzfcdQXeB7t3DM4OUfMsulhpW3Frg',
};

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  private async aadUserNameById(lead: LeadType) {
    const url = `${BASE_URL}/users/${lead.tutorId}`;
    const { data } = await this.httpService.axiosRef.get(url, {
      headers: HEADERS,
    });
    return { ...lead, tutorName: data.name };
  }

  private async aadStatusNameById(lead: LeadType) {
    const url = `${BASE_URL}/leads/pipelines/${lead.pipeline}/statuses/${lead.statusID}`;
    const { data } = await this.httpService.axiosRef.get(url, {
      headers: HEADERS,
    });
    return { ...lead, statusName: data.name, color: data.color };
  }

  private async addTutorsName(leads: LeadType[]): Promise<LeadType[]> {
    const promises = leads.map((lead) => this.aadUserNameById(lead));
    return Promise.all(promises);
  }

  private async addStatusName(leads: LeadType[]): Promise<LeadType[]> {
    const promises = leads.map((lead) => this.aadStatusNameById(lead));
    return Promise.all(promises);
  }

  public async getLeads(query: string): Promise<LeadType[]> {
    const url = `${BASE_URL}/leads${query ? `?query` : ''}`;
    const { data } = await this.httpService.axiosRef.get(url, {
      headers: HEADERS,
    });
    return await this.addStatusName(
      await this.addTutorsName(await convertLeads(data._embedded.leads)),
    );
  }
}

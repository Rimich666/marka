import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}
  async getLeads(query: string): Promise<string> {
    const url = `https://89179699365.amocrm.ru/api/v4/leads${query ? `?query` : ''}`;
    const { data } = await this.httpService.axiosRef.get(url, {
      headers: {
        Authorization:
          'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjMyYTQ1MDc0ZDY1YTMwYThiNmUzNWE4ZGQxNDkzNTZmOGFkZDliNmVkMmNhNWVmOWE3MWIxOWJhNTg4MjkyMGVjOTFiYmI4MmMxNzJiOWRhIn0.eyJhdWQiOiI0YTg0ZGM1OS1kNmZlLTQ4MzEtYTk2Zi00YWVjMTdjZjk5NzIiLCJqdGkiOiIzMmE0NTA3NGQ2NWEzMGE4YjZlMzVhOGRkMTQ5MzU2ZjhhZGQ5YjZlZDJjYTVlZjlhNzFiMTliYTU4ODI5MjBlYzkxYmJiODJjMTcyYjlkYSIsImlhdCI6MTcxOTQyMzQxMCwibmJmIjoxNzE5NDIzNDEwLCJleHAiOjE3MTk3MDU2MDAsInN1YiI6IjExMjA2MDU0IiwiZ3JhbnRfdHlwZSI6IiIsImFjY291bnRfaWQiOjMxODIwNDUwLCJiYXNlX2RvbWFpbiI6ImFtb2NybS5ydSIsInZlcnNpb24iOjIsInNjb3BlcyI6WyJjcm0iLCJmaWxlcyIsImZpbGVzX2RlbGV0ZSIsIm5vdGlmaWNhdGlvbnMiLCJwdXNoX25vdGlmaWNhdGlvbnMiXSwiaGFzaF91dWlkIjoiYzQ5NDllYzktYjViNy00NDNlLTg0MzQtMWQ0ZjE3MGQzOGYyIn0.FCjbCJM_A0StBme5cVrUt6GNTZh-Ejnoesb1Fzi9KS41NfyByaFbv8xTFgleuWYH7DN6WHu3B4XoDMI1dmmOtWILegpClj3nUsbWnfElIflg1C4_xR5mQRNUXSDiXzZltjSccskul3gMAqNibWBgmiMHZiItFI-UWrc5uVH4xjCJtpan1duFv_O2mBKX8ouNpNJzIgH07LJTPL8LmJI72OMyDlkICPEagMwYBdH25xhfdd34qtCODEKLhWB4vls3v8b1G6H8ttUstYvndaofUZTiP-royKNmuxoks_2AY3AIl4DtzuoYGErf6wzfcdQXeB7t3DM4OUfMsulhpW3Frg',
      },
    });
    return data;
  }
}

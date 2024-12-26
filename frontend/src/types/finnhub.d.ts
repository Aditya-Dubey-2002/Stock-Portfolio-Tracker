declare module 'finnhub' {
    export class DefaultApi {
      authentications: { [key: string]: { apiKey: string } };
      stockSymbols(exchange: string, callback: (error: any, data: any) => void): void;
      quote(symbol: string, callback: (error: any, data: any) => void): void;
      companyProfile2(
        params: { symbol: string },
        callback: (error: any, data: any) => void
      ): void;
    }
  }
  
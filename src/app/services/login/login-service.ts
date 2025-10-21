import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

 private readonly endpoints = {
    login: '/Login'
  } as const;

    private readonly http = inject(HttpClient);

   onLogin(credentials: any): Observable<any> {
      return this.http.post(this.endpoints.login, credentials).pipe(catchError(this.handleError));
    }

    private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ocorreu um erro desconhecido';

    if (error.error instanceof ErrorEvent) {
      // Erro do lado do cliente
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      // Erro do lado do servidor
      errorMessage = `Código: ${error.status}\nMensagem: ${error.message}`;
    }

    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}

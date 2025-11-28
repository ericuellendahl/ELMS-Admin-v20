import { HttpInterceptorFn } from '@angular/common/http';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  // Base URL centralizada
  const baseUrl = 'https://api.freeprojectapi.com/api/CollegeProject';

  // Apenas adiciona a base URL se a requisição não for externa
  if (!req.url.startsWith('http')) {
    req = req.clone({
      url: `${baseUrl}${req.url}`,
    });
  }

  // Adiciona headers comuns
  req = req.clone({
    setHeaders: {
      'Content-Type': 'application/json',
    },
  });

  return next(req);
};

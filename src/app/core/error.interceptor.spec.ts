import { inject, TestBed } from '@angular/core/testing';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import {
  ErrorInterceptor,
  ErrorInterceptorProvider
} from './error.interceptor';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Injectable } from '@angular/core';

@Injectable()
class MockHttpService {
  constructor(private http: HttpClient) {}
  get(url: string): Observable<any> {
    return this.http.get<Array<any>>(url, {
      headers: new HttpHeaders().set('Accept', 'application/json')
    });
  }
}

describe('ErrorInterceptor', () => {
  let http: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [MockHttpService, ErrorInterceptorProvider]
    });
  });

  beforeEach(() => {
    http = TestBed.get(HttpTestingController);
  });

  it(
    `should be created`,
    inject([HTTP_INTERCEPTORS], (service: ErrorInterceptor) => {
      expect(service).toBeTruthy();
    })
  );

  it(
    'should throw an error when an http error occurs',
    inject(
      [HttpClient, HttpTestingController],
      (apiService: HttpClient, httpMock: HttpTestingController) => {
        const mockErrorResponse: HttpErrorResponse = new HttpErrorResponse({
          error: 'details',
          status: 404,
          statusText: 'Bad Request'
        });

        apiService
          .get('/data')
          .catch(errResponse => {
            expect(Observable.of(errResponse)).toBeTruthy();
            expect(errResponse).toBe(
              '404 - Bad Request. Details: Http failure response for /data: 404 Bad Request'
            );
            return Observable.of(errResponse);
          })
          .subscribe();
        const req = http.expectOne('/data');
        req.flush({ errorMessage: 'uh oh' }, mockErrorResponse);
        httpMock.verify();
      }
    )
  );
});

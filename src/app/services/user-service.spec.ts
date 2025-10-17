import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user-service';
import { EmployeeResponse } from '../models/EmployeeResponse';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;
  const apiUrl = 'https://freeapi.miniprojectideas.com/api/EmployeeLeave';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('onLogin', () => {
    it('should send a POST request to the login API', () => {
      const mockUser = { username: 'test', password: 'password' };
      const mockResponse = { success: true, token: '12345' };

      service.onLogin(mockUser).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${apiUrl}/Login`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(mockUser);
      req.flush(mockResponse);
    });
  });

  describe('getAllEmployee', () => {
    it('should send a GET request to the get employees API', () => {
      const mockEmployeeResponse: EmployeeResponse = {
        message: 'Success',
        result: true,
        data: []
      };

      service.getAllEmployee().subscribe(response => {
        expect(response).toEqual(mockEmployeeResponse);
      });

      const req = httpMock.expectOne(`${apiUrl}/GetEmployees`);
      expect(req.request.method).toBe('GET');
      req.flush(mockEmployeeResponse);
    });
  });

  describe('getDepartments', () => {
    it('should send a GET request and return the data property', () => {
      const mockDepartments = [{ deptId: 1, deptName: 'IT' }];
      const mockResponse = { message: 'Success', result: true, data: mockDepartments };

      service.getDepartments().subscribe(response => {
        expect(response).toEqual(mockDepartments);
      });

      const req = httpMock.expectOne(`${apiUrl}/GetDepartments`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });
});

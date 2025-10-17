import { EmployeeEntiteModel } from "./Employee.model";

export interface EmployeeResponse {
  message: string;
  result: boolean;
  data: EmployeeEntiteModel[];
}



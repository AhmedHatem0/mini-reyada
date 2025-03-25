import { RelativeDto } from "./relative.model";

export interface ReyadaRequestDto{
    requestId?: string;
    requestType: RequestType;
    supportType: SupportType;
    businessActivitySector: string;
    businessActivityDivision: string;
    businessRelatedToOrg: boolean;
    planTitle: string;
    employeePersonalEmail: string;
    businessNature: string;
    hasRelatives: boolean;
    relativeEmployees: RelativeDto[];
    workPlan: string;   
}
export enum RequestType {
    OneYear = 'OneYear',
    ThreeYears = 'ThreeYears',
  }
  
  export enum SupportType {
    Financial = 'Financial',
    Consultation = 'Consultation',
    FinancialAndConsultation = 'FinancialAndConsultation',
  }
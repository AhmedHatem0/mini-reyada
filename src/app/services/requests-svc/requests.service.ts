import { Injectable } from '@angular/core';
import { RequestType, ReyadaRequestDto, SupportType } from '../../models/request.model';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  businessActivitySectors = [
    "التكنولوجيا", "الرعاية الصحية", "التعليم", "المالية", "التجزئة", "التصنيع", "العقارات", "السياحة", "الترفيه", "الخدمات اللوجستية",
    "الزراعة", "السيارات", "البناء", "الطاقة", "الاتصالات", "الصناعات الدوائية", "الإعلام", "الأغذية والمشروبات", "الخدمات القانونية", "الاستشارات"
  ];
  
  businessActivityDivisions = [
    "تطوير البرمجيات", "المعدات الطبية", "إدارة المدارس", "الخدمات المصرفية الاستثمارية", "التجارة الإلكترونية",
    "تصنيع النسيج", "إدارة العقارات", "سلاسل الفنادق", "إنتاج الأفلام", "إدارة سلاسل التوريد"
  ];
  
  dummyReyadaRequests:ReyadaRequestDto[] = [
    {
      requestId: "REQ12345",
      requestType: RequestType.OneYear,
      supportType: SupportType.Financial,
      businessActivitySector: this.businessActivitySectors[Math.floor(Math.random() * this.businessActivitySectors.length)],
      businessActivityDivision: this.businessActivityDivisions[Math.floor(Math.random() * this.businessActivityDivisions.length)],
      businessRelatedToOrg: true,
      planTitle: "خطة التوسع 2025",
      employeePersonalEmail: "john.doe@example.com",
      businessNature: "حلول تقنية متقدمة",
      hasRelatives: false,
      relativeEmployees: [],
      workPlan: "تطوير أدوات تعتمد على الذكاء الاصطناعي"
    },
    {
      requestId: "REQ67890",
      requestType: RequestType.ThreeYears,
      supportType: SupportType.Consultation,
      businessActivitySector: this.businessActivitySectors[Math.floor(Math.random() * this.businessActivitySectors.length)],
      businessActivityDivision: this.businessActivityDivisions[Math.floor(Math.random() * this.businessActivityDivisions.length)],
      businessRelatedToOrg: false,
      planTitle: "استراتيجية النمو طويلة المدى",
      employeePersonalEmail: "jane.smith@example.com",
      businessNature: "حلول الطاقة المستدامة",
      hasRelatives: true,
      relativeEmployees: [{ name: "أليس سميث", positionTitle: "مديرة المشاريع", unitName: "قسم الطاقة", positionGrade: "الدرجة الثانية" }],
      workPlan: "تنفيذ حلول الطاقة المتجددة"
    },
    {
      requestId: "REQ54321",
      requestType: RequestType.OneYear,
      supportType: SupportType.FinancialAndConsultation,
      businessActivitySector: this.businessActivitySectors[Math.floor(Math.random() * this.businessActivitySectors.length)],
      businessActivityDivision: this.businessActivityDivisions[Math.floor(Math.random() * this.businessActivityDivisions.length)],
      businessRelatedToOrg: true,
      planTitle: "خطة التوسع في السوق",
      employeePersonalEmail: "michael.jordan@example.com",
      businessNature: "التجزئة والتجارة الإلكترونية",
      hasRelatives: false,
      relativeEmployees: [],
      workPlan: "توسيع السوق عبر الإنترنت"
    },
    {
      requestId: "REQ98765",
      requestType: RequestType.ThreeYears,
      supportType: SupportType.Consultation,
      businessActivitySector: this.businessActivitySectors[Math.floor(Math.random() * this.businessActivitySectors.length)],
      businessActivityDivision: this.businessActivityDivisions[Math.floor(Math.random() * this.businessActivityDivisions.length)],
      businessRelatedToOrg: false,
      planTitle: "خطة الابتكار الاستراتيجية",
      employeePersonalEmail: "emily.watson@example.com",
      businessNature: "الذكاء الاصطناعي وعلوم البيانات",
      hasRelatives: true,
      relativeEmployees: [{ name: "بوب واتسون", positionTitle: "الرئيس التقني", unitName: "قسم تطوير البرمجيات", positionGrade: "الدرجة الأولى" }],
      workPlan: "تطوير نماذج تعلم الآلة"
    }
  ];
    
  addRequest(request:ReyadaRequestDto){
    this.dummyReyadaRequests.push(request);
  }
  
  getRequest(requestId:string){
    return this.dummyReyadaRequests.find((request)=> request.requestId===requestId )!;
  }
}

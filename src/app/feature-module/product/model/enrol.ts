export interface Enrol {
    id: number;
    certificateNumber: string;
    firstname: string;
    lastname: string;
    birthDate: string;
    gender: number;
    maritalStatus: number;
    mobileNumber: string;
    email: string;
    designation: string;
    joinDate?: Date;
    salary?: number;
    branchId?: number;
    bankAccoundNumber?: string;
    evidenceOfInsurability: boolean;
    effectiveDate: Date;
    CurrentDate: Date;
}

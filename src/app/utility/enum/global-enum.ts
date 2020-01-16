export enum ValidatorType {
    Global = 1,
    ProductDocument = 2,
    GroupHRSubmission = 3,
    GroupClaimSubmission = 4,
    GroupClaimApprove = 5,
    DocumentType = 6,
    ClaimType = 7
}

export enum ClaimType {
    Group = "Group",
    Individual = "Individual"
}

export enum ClaimEntryStatus {
    InProgress = 1,
    DoneDocumentEntry = 2,
    SendToMedicalQueue = 3

}

export enum FacilityType{
  Inclusion = 1,
  Exlcusion = 2
}

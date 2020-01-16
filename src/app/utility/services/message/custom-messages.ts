export class ValidatingEnroleeMessage {
  public otpTimeExpire = 'If you have not yet received an '
    + 'OTP code then contact your HR/Authorized personnel '
    + 'to update your mobile number in MetLife';
  public otpLeftTime = 120;
  public claimSubmissionMessage = 'Your claims data and documents have been successfully forwarded for HR approval.';
}

export class ProductDocumentMessage {
  public mandatoryFieldRequired = 'You must check Mandatory field.';

}

export class EnrolDependentMessage {
  public mandatoryProductList = "You must select at least one product.";
}

export enum GroupPolicyMessage {
  msgSave = "New Policy Created Successfully. Do you want to add products for this policy?"
}
export class DataEntryMessage {
  claimNumberGenerated = "Claim number generated successfully";
}

export class DocumentEntryMessage {
  sendToMedicleQueueConfirmation = "Are you sure you want to send to Medicle Advisor ?";
}


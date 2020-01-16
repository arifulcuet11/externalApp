import { Injectable } from "@angular/core";
import Swal, { SweetAlertType } from "sweetalert2";

@Injectable({
  providedIn: "root"
})
export class MessageService {
  msgSave = "Saved Successfully";
  msgUpdate = "Updated Successfully";
  msgDelete = "Deleted Successfully";
  msgNotfound = "Data not found";
  msgConfirmDelete = "Are you sure to delete";
  msgFileNotFound = "No file found";
  otpSendSuccess = "OTP Send Successfully";
  msgAssigned = "Assigned Successfully";
  resetSuccess = "Password reset successfully.";
  approveSuccess = "Approve successfully";
  rejectSuccess = "Reject successfully";
  approveConfirmation = "Are you sure you want to approve?";
  submitConfirmation = "Are you sure you want to submit?";
  rejectConfirmation = "Are you sure you want to reject?";
  msgClaimRelease = "Release successfully.";
  msgClaimFault = "Unable to release.";
  msgUnableToSave = "Unable to Save";

  constructor() {}

  show(message: string, type: SweetAlertType) {
    Swal.fire({
      type,
      text: message,
      showConfirmButton: false,
      // showCloseButton: true,
      showCancelButton: true
      // timer: 1500
    });
  }

  confirm(message?: string) {
    return Swal.fire({
      text: message ? message : "Are you sure?",
      type: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      reverseButtons: true
    });
  }

  inputValue(message: string, title: string) {
   return Swal.fire({
      title,
      input: 'number',
      showConfirmButton: true,
      // showCloseButton: true,
      showCancelButton: true
      // timer: 1500
    });
  }
}

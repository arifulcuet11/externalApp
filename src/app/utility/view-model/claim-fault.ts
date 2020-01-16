export class UpdateGroupPolicy {
  claimFaultId: number;
  groupPolicyId: number;
}

export class UpdateEnrollee {
  claimFaultId: number;
  enrolleeId: number;
}

export class AssignClaimFault {
  claimFaultId: number;
  assignedUserId: number;
}

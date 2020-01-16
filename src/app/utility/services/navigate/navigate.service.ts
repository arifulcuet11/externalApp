import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RouteUrl } from '../../configuration/routeUrl';

@Injectable({
  providedIn: 'root'
})
export class NavigateService {

  url = RouteUrl;

  constructor(private router: Router) { }

  toHome() {
    this.router.navigate([this.url.home]);
  }

  toLogin() {
    this.router.navigate([this.url.login]);
  }

  toLogout() {
    this.router.navigate([this.url.logout]);
  }

  toSignUp() {
    this.router.navigate([this.url.signup]);
  }

  toRole() {
    this.router.navigate([this.url.role]);
  }

  toAssignRole() {
    this.router.navigate([this.url.assingRole]);
  }

  toAddProduct() {
    this.router.navigate([this.url.addProduct]);
  }

  toProductEligiblity(productId) {
    this.router.navigate([this.url.productEligibility, productId]);
  }

  toProductDocument(productId) {
    this.router.navigate([this.url.productDocument, productId]);
  }

  toAddGroupPolicyProduct(id: number) {
    this.router.navigate([this.url.addGroupPolicyProduct + '/' + id]);
  }

  toAddUser() {
    this.router.navigate([this.url.addUser]);
  }

  toUpdateUser(userId: number) {
    this.router.navigate([this.url.addUser + '/' + userId]);
  }

  toChangePassword() {
    this.router.navigate([this.url.changePassword]);
  }

  toForgetPassword() {
    this.router.navigate([this.url.forgetPassword]);
  }

  toEnrol(groupPolicyId: number) {
    this.router.navigate([this.url.enrol + '/' + groupPolicyId]);
  }

  toEnrolDependent(enrolId: number) {
    this.router.navigate([this.url.enrolDependent + '/' + enrolId]);
  }

  toGroupPolicyUser(groupPolicyId: number) {
    this.router.navigate([this.url.groupPolicyUser + '/' + groupPolicyId]);
  }

  toClaimDataEntry(claimEntryId: number) {
    this.router.navigate([this.url.claimDataEntry + '/' + claimEntryId]);
  }

  toEnrolClass(groupPolicyId: number) {
    this.router.navigate([this.url.enrolleClass + '/' + groupPolicyId]);
  }

  toGroupPolicyClusterProduct(clusterId: number, groupPolicyId: number) {
    this.router.navigate([this.url.GroupPolicyClusterProduct + '/' + clusterId + '/' + groupPolicyId]);
  }

  toClaimBenefit(claimTypeId: number) {
    this.router.navigate([this.url.claimBenefit + '/' + claimTypeId]);
  }

  toGroupPolicyProductDetail(gppid: number, pid: number) {
    this.router.navigate([`/${this.url.groupPolicyProductDetail}/${gppid}/${pid}`]);
  }

  toGroupPolicyClusterProductBenefit(id: any) {
    this.router.navigate([this.url.groupPolicyClusterProductBenefit + '/' + id]);
  }

  toDataEntryQueue() {
    this.router.navigate([this.url.dataEntryQueue]);
  }

  toClaimDocumentEntry(id: number) {
    this.router.navigate([this.url.claimDocumentEntry + '/' + id]);
  }

  toMedicalAdvisorEntryQueue() {
    this.router.navigate([this.url.medicalAdvisorEntryQueue]);
  }

  toOnlineGroupSubmission() {
    this.router.navigate([this.url.onlineGroupClaimSubmission]);
  }
}

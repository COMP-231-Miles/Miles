import { FormGroup } from "@angular/forms";

export function passwordMatchValidator(frm: FormGroup) {
  return frm.controls['password'].value ===
    frm.controls['confirmPassword'].value
    ? null
    : { mismatch: true };
}
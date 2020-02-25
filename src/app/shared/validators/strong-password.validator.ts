import { FormGroup } from "@angular/forms";

const STRONG_PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

export function StrongPassword(
  controlName: string,
) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    if (STRONG_PASSWORD_PATTERN.test(control.value)) {
        return
    }
    control.setErrors({ strongPassword: true });
  };
}

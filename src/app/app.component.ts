import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title;
  contactForm: FormGroup;
  submittedData: any[] = [];
  constructor(private frmBuilder: FormBuilder) { }
  ngOnInit(): void {
    this.contactForm = this.frmBuilder.group({
      name: ['', Validators.required],
      startlocation: ['', Validators.required],
      destination: ['', Validators.required],
      car: ['', Validators.required],
      seatsavailable: ['', [Validators.required, seatsAvailableValidator]]
    });
  }
  onSubmit() {

    if (this.contactForm?.valid) {
      const formData = this.contactForm.value;
      this.submittedData.push(formData);
      this.contactForm.reset();
      alert('Ride Offered: \n Name:' + formData.name + ' \n StartLocation :' + formData.startlocation + ' \n Destination :' + formData.destination +'\n Car :'+formData.car+'\n Seats Available :'+formData.seatsavailable);
    }
    else {
      alert('Form is invalid');
    }
  }
}

function seatsAvailableValidator(control: AbstractControl): { [key: string]: boolean } | null {
  if (
    control.value !== undefined && (isNaN(control.value) || control.value <= 0 || control.value >= 8)
  ) {
    return { seatsavailable: true };
  }
  return null;
}

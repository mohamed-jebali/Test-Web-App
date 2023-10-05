import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { ConfigService } from '../config/config.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {
  createForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private dataService: ConfigService) {
    this.createForm = this.formBuilder.group({
      id: 0,
      nome: '',
      cognome: '',
      email: '',
      comune: '',
      provincia: '',
      note: ''
    });
  }

  onSubmit(): void {
    const newData = this.createForm.value;

    this.dataService.createData(newData).subscribe(
      (response) => {
        Swal.fire({
          icon: 'success',
          title: 'A New Profile created successfully',
          showConfirmButton: false,
          timer: 2000
        });


        console.log('Nuovo profilo creato:', response);

        this.createForm.reset();
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'An error occurred while creating the profile',
          showConfirmButton: false,
          timer: 2000
        });
        console.error('Errore durante la creazione del profilo:', error);
      }
    );
  }
}

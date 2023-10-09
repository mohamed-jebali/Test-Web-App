import { Component } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from "@angular/forms";
import { ConfigService } from '../config/config.service';
import { ActivatedRoute} from '@angular/router';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {
  createForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private dataService: ConfigService,private router :Router,private route: ActivatedRoute ) {
    this.createForm = this.formBuilder.group({
      id: 0,
      nome: ['', [Validators.required, Validators.minLength(4)]],
      cognome: ['', [Validators.required,Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email,Validators.maxLength(40)]],
      comune: ['',[Validators.minLength(4)]],
      provincia: ['', [Validators.minLength(2),Validators.maxLength(2)]],
      note: ['',[Validators.maxLength(50)]]
    });
  }

  onSubmit(): void {
    if (this.createForm.valid) {
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
      );
      this.router.navigate([''], { queryParams: { message: `${this.createForm.value.nome} has been created` } });
    }
    else{
        Swal.fire({
          icon: 'error',
          title: 'Error creation profile check errors messages',
          showConfirmButton: false,
          timer: 2000
        });
        console.error('Errore durante la creazione del profilo:');
    }
  }
}


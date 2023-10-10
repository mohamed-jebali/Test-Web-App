import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Params} from '@angular/router';
import { ConfigService } from '../config/config.service';
import { Router } from '@angular/router';
import { FormBuilder,FormGroup, Validators } from "@angular/forms";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  itemId: any;
  item: any = {
    id: 0,
    nome: '',
    cognome: '',
    email: '',
    comune: '',
    provincia: '',
    note: ''
  };

  updatedItem: boolean | undefined
  editForm!:FormGroup;


  constructor(private route: ActivatedRoute, private dataService: ConfigService,private formGroup: FormBuilder,private router: Router) { }



  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.itemId = +params['id'];
    });
    this.dataService.getDataById(this.itemId).subscribe(data => {
      this.item = data;
    });
    this.editForm = this.formGroup.group({
      nome: [this.item.nome, [Validators.required, Validators.minLength(4)]],
      cognome: [this.item.cognome, [Validators.required,Validators.minLength(3)]],
      email: [this.item.email, [Validators.required, Validators.email,Validators.maxLength(40)]],
      comune: [this.item.comune,[Validators.minLength(4)]],
      provincia: [this.item.provincia, [Validators.minLength(2),Validators.maxLength(2)]],
      note: [this.item.note,[Validators.maxLength(50)]]
  });
};

onSubmit(): void {
  if (this.editForm.valid) {
    const newData = {
      id: this.itemId,
      nome: this.editForm.value.nome,
      cognome: this.editForm.value.cognome,
      email: this.editForm.value.email,
      comune: this.editForm.value.comune,
      provincia: this.editForm.value.provincia,
      note: this.editForm.value.note
    };

    this.dataService.updateData(this.itemId, newData).subscribe(() => {
      Swal.fire({
        icon: 'success',
        title: this.editForm.value.nome + ' has been updated',
        showConfirmButton: false,
        timer: 2000
      });

    });

    this.router.navigate([''], { queryParams: {updatedItemId:this.itemId} });
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Invalid credentials. Please check the errors messages.',
      showConfirmButton: false,
      timer: 2000
    });
  }
}
}

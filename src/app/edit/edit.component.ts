import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from '../config/config.service';
import { FormBuilder,FormGroup, FormControl, Validators } from "@angular/forms";
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

  editForm!:FormGroup;


  constructor(private route: ActivatedRoute, private dataService: ConfigService,private formBuilder: FormBuilder) { }



  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.itemId = +params['id'];
    });
    this.dataService.getDataById(this.itemId).subscribe(data => {
      this.item = data;
    });
    this.editForm = this.formBuilder.group({
      name: [this.item.nome, [
        Validators.required,
        Validators.minLength(4),
      ]],
    });
  }

  onSubmit(): void {
    const newData = {
      id: this.itemId,
      nome: this.item.nome,
      cognome: this.item.cognome,
      email: this.item.email,
      comune: this.item.comune,
      provincia: this.item.provincia,
      note: this.item.note
    };
    console.log('Dati del modulo inviati:', this.item);
  
    this.dataService.updateData(this.itemId, newData).subscribe(() => {

        Swal.fire({
         icon: 'success',
         title: this.item.nome +' has been updated',
         showConfirmButton: false,
         timer: 2000 
        });
        
      console.log('Modifica completata con successo');
    });
  }
}

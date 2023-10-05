import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from '../config/config.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  itemId: any;
  name: string = '';
  surname: string = '';
  common: string = '';
  email: string = '';
  province: string = '';
  notes: string = '';
  item: any = {};

  constructor(private route: ActivatedRoute,private dataService: ConfigService) { 
    this.name = '';
    this.surname = '';
    this.email = '';
    this.common = '';
    this.province = '';
    this.notes = '';
  }
  

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.itemId = +params['id'];
    });
    this.dataService.getDataById(this.itemId).subscribe(data => {
      this.item = data;
      this.name = this.item.nome;
      this.surname = this.item.cognome;
      this.email = this.item.email;
      this.common = this.item.comune;
      this.province = this.item.provincia;
      this.notes = this.item.note;
    });
  }

  onSubmit(): void {
    // Puoi accedere ai dati del modulo tramite this.formData

      const newData = {
      nome: this.name,
      cognome: this.surname,
      email: this.email,
      comune: this.common,
      provincia: this.province,
      note: this.notes,
      // Aggiungi altri campi qui se necessario
    };
    console.log('Dati del modulo inviati:', this.item);
  
    // Invia i dati al servizio per l'aggiornamento (utilizza this.itemId per identificare l'elemento da aggiornare)
    this.dataService.updateData(this.itemId, newData).subscribe(() => {

        Swal.fire({
         icon: 'success',
         title: this.item.nome +' has been updated',
         showConfirmButton: false,
         timer: 2000 
        });
        
      // Gestisci il completamento dell'aggiornamento, ad esempio, reindirizza l'utente o mostra un messaggio di successo
      console.log('Modifica completata con successo');
    });
  }
  

}


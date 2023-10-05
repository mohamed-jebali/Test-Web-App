import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../config/config.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {
  dati: any;
  newData: any;

  constructor(private dataService: ConfigService) { }

  ngOnInit(){
    this.viewData()
  }

  viewData(){
    this.dataService.getData().subscribe(data => {
      this.dati = data;
      console.log(this.dati)
    });
  }

  deleteItem(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this User.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel'

    }).then((result) => {
      if (result.isConfirmed) {
        this.dataService.deleteData(id).subscribe(() => {
          this.viewData();

          const deletedItem = this.dati.find((item: any) => item.id === id);

          if (deletedItem) {
            this.MessageAlert(deletedItem.nome);
          }
        });
      }
    });
  }
  editItem(id: number, newData: any) {
    this.dataService.updateData(id, newData).subscribe(() => {
      this.viewData();
    });
  }

  MessageAlert(id: number){
    Swal.fire({
     icon: 'success',
     title: id + ' has been deleted',
     showConfirmButton: false,
     timer: 2000 
    });
  }
}

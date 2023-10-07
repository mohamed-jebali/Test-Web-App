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
  inputData: any;
  selectedField: string = "nome";
  lowerData: any;

  constructor(private dataService: ConfigService) { }

  ngOnInit(){
    this.viewData()
  }

  viewData(){
    this.dataService.getData().subscribe(data => {
      this.dati = data;
      this.lowerData = data;
      console.log(this.dati)
    });
  }

 getFieldData() {
  if (this.inputData && this.selectedField) {
    const searchCase = this.inputData.toLowerCase();
    this.dati = this.lowerData.filter((item: any) =>
      item[this.selectedField].toLowerCase().includes(searchCase)
    );
  }
}

  
  handleKeyUp(event: any) {
  if (event.keyCode === 13) {
    this.getFieldData();
  }
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

  MessageAlert(id: number){
    Swal.fire({
     icon: 'success',
     title: id + ' has been deleted',
     showConfirmButton: false,
     timer: 2000 
    });
  }
}

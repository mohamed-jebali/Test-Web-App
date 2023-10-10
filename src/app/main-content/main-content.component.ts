import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ConfigService } from '../config/config.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {
  dati: any;
  newData: object = {};
  inputData: string = '';
  selectedField: string = "nome";
  lowerData: any;
  message: string | undefined;
  isFound: boolean | undefined
  highlight: boolean | undefined;
  updatedItemId: number | null = null;
  createdId: number | null = null;


  constructor(private dataService: ConfigService, private route : ActivatedRoute) { }

  ngOnInit(){
    this.route.queryParams.subscribe((params: Params) => {
      this.message = params['message'];
      this.updatedItemId = params['updatedItemId']
    });
    console.log(this.updatedItemId)
    this.viewData()
  }
  

  sortData() {
    this.dataService.getData().subscribe(data => {
      this.dati = data.sort((a: any, b: any) => {
        const fieldA = a[this.selectedField].toLowerCase();
        const fieldB = b[this.selectedField].toLowerCase();
  
        if (fieldA < fieldB) return -1;
        if (fieldA > fieldB) return 1;
        return 0;
      });
  
      this.lowerData = this.dati.slice();
    });
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
      this.isFound = this.dati.length > 0;
  }
  else{
    this.isFound = false
  }
}

  
  handleKeyUp(event: any) {
  if (event.keyCode === 13) {
    this.getFieldData();
  }
}


  deleteItem(id: number,nome:string) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete ' + nome,
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

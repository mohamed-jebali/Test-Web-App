import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../config/config.service';

@Component({
  selector: 'main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {
  dati: any;

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
    this.dataService.deleteData(id).subscribe(() => {
      // Dopo l'eliminazione, ricarica i dati
      this.viewData();
    });
  }
  

  editItem(id: number, newData: any) {
    this.dataService.updateData(id, newData).subscribe(() => {
      // Dopo l'aggiornamento, ricarica i dati
      this.viewData();
    });
  }
}

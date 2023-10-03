import { Component, OnInit } from '@angular/core';
import { DataService } from '../config/config.service';

@Component({
  selector: 'main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {
  dati: any;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getData().subscribe(data => {
      this.dati = data;
      console.log(this.dati)
    });
  }
}

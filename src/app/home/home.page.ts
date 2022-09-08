import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Checklist } from 'src/entities/Checklist';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  checklists: Checklist[];

  constructor(private dataService: DataService, private router: Router) {
    this.dataService.getChecklists().then((checklists: Checklist[]) => {
      this.checklists = checklists;
    });
  }

  ngOnInit() {}
}

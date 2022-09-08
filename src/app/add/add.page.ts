import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Checklist } from 'src/entities/Checklist';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  newItem: string;
  updatedItem: string;

  checklist: Checklist = {
    title: '',
    items: [],
  };

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit() {}

  updateTitle(target: EventTarget) {
    const element = target as HTMLInputElement;
    const value: string = element.value;
    this.checklist.title = value;
  }

  addItem() {
    if (this.newItem) {
      this.checklist.items.push(this.newItem);
    }
    this.checklist.items = this.checklist.items.filter(
      (item) => item || !(item.trim().length === 0)
    );
    this.newItem = null;
  }

  updateItem(index: number, target: EventTarget) {
    const element = target as HTMLInputElement;
    const value: string = element.value;

    if (value) {
      this.checklist.items[index] = value;
    } else {
      delete this.checklist.items[index];
    }
  }

  addChecklist() {
    this.dataService
      .addChecklist(this.checklist)
      .then(() => {
        this.checklist = {
          title: '',
          items: [],
        };
      })
      .finally(() => {
        this.router.navigate(['/']).then(() => {
          window.location.reload();
        });
      });
  }
}

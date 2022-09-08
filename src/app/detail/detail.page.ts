import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Checklist } from 'src/entities/Checklist';
import { DataService } from '../services/data.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  newItem: string;
  updatedItem: string;

  checklist: Checklist = {
    title: '',
    items: [],
  };

  index: number;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private alertController: AlertController
  ) {
    this.index = Number(this.route.snapshot.paramMap.get('index'));
    this.loadData();
  }

  ngOnInit() {}

  async loadData() {
    await this.dataService.getChecklists().then((checklists: Checklist[]) => {
      this.checklist = checklists[this.index];
    });
  }

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

  updateChecklist() {
    this.dataService
      .updateChecklist(this.checklist, this.index)
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

  async removeAlert() {
    const alert = await this.alertController.create({
      header: 'CONFIRM ACTION',
      message: 'Are you sure you want to remove? This action is irreversible.',
      buttons: [
        {
          text: 'Remove',
          cssClass: 'alert-button-confirm',
          handler: () => this.removeChecklist(),
        },
        {
          text: 'Cancel',
          cssClass: 'alert-button-cancel',
          role: 'cancel',
        },
      ],
    });

    await alert.present();
  }

  removeChecklist() {
    this.dataService
      .removeChecklist(this.index)
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

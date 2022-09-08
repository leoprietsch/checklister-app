/* eslint-disable no-underscore-dangle */
import { Storage } from '@ionic/storage-angular';
import { Injectable } from '@angular/core';
import { Checklist } from 'src/entities/Checklist';

const STORAGE_KEY = 'checklists';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    this.storage.create().then((storage: Storage) => {
      this.storage = storage;
    });
  }

  async getChecklists(): Promise<Checklist[]> {
    if (!this.storage) {
      await this.init();
    }

    let checklists: Checklist[] = [];
    await this.storage
      .get(STORAGE_KEY)
      .then((result: Checklist[]) => {
        checklists = result || [];
      })
      .catch(() => {
        checklists = [];
      });

    return checklists;
  }

  async setChecklists(checklists: Checklist[]) {
    if (!this.storage) {
      await this.init();
    }
    await this.storage?.set(STORAGE_KEY, checklists);
  }

  public async addChecklist(checklist: Checklist) {
    if (!this.storage) {
      await this.init();
    }

    const checklists = await this.getChecklists();
    checklists.push(checklist);
    await this.setChecklists(checklists);
  }

  public async removeChecklist(index: number) {
    if (!this.storage) {
      await this.init();
    }
    const checklists = (await this.storage.get(STORAGE_KEY)) as Checklist[];
    checklists.splice(index, 1);
    await this.setChecklists(checklists);
  }

  public async updateChecklist(checklist: Checklist, index: number) {
    const checklists = (await this.storage.get(STORAGE_KEY)) as Checklist[];
    checklists[index] = checklist;
    await this.setChecklists(checklists);
  }
}

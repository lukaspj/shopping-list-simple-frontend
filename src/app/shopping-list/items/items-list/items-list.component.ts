import { Component, OnInit } from '@angular/core';
import { IItem } from '../../models/item';
import { ItemService } from '../../services/item.service';

@Component({
  templateUrl: './items-list.component.html',
  styleUrls: [ './items-list.component.scss' ]
})
export class ItemsListComponent implements OnInit {
  items: IItem[];

  constructor(
    private _itemService: ItemService
  ) { }

  ngOnInit() {
    this._itemService.getItems()
      .subscribe(items => this.items = items);
  }

  deleteItem(item) {
    this._itemService.deleteItem(item)
      .subscribe(res =>{
        if (res) {
          console.log(res);
        } else {
          this._itemService.getItems()
            .subscribe(items => this.items = items);
        }
      });
  }
}

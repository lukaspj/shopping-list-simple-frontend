import { Component, OnInit } from '@angular/core';
import { IItem } from '../../shopping-list/models';
import { ShoppingItemService } from '../shopping-item.service';

@Component({
  selector: 'app-shopping-item-list',
  templateUrl: './shopping-item-list.component.html',
  styleUrls: [ './shopping-item-list.component.scss' ]
})
export class ShoppingItemListComponent implements OnInit {
  items: IItem[];

  // todo Bad division of responsibility
  constructor(private _shoppingItemService: ShoppingItemService) { }

  ngOnInit() {
    this._shoppingItemService.getItems()
      .subscribe(items => this.items = items);
  }

  deleteItem(item) {
    this._shoppingItemService.deleteItem(item)
      .subscribe(res =>{
        if (res) {
          console.log(res);
        } else {
          this._shoppingItemService.getItems()
            .subscribe(items => this.items = items);
        }
      });
  }
}

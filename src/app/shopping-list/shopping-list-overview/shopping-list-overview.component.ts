import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';
import { IItemList, LIST_STATUS } from '../models';

@Component({
  selector: 'app-shopping-list-overview',
  templateUrl: './shopping-list-overview.component.html',
  styleUrls: ['./shopping-list-overview.component.scss']
})
export class ShoppingListOverviewComponent implements OnInit {

  itemLists: IItemList[];

  constructor(private _shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.itemLists = [];
    this._shoppingListService.getLists()
      .subscribe(lists => this.itemLists = lists);
  }

  getRelevantLists(): IItemList[] {
    return this.itemLists
      .filter(x => x.status !== LIST_STATUS.DONE);
  }

  createList() {
    this._shoppingListService
      .createList()
      .subscribe(x => {
        this._shoppingListService.getLists()
          .subscribe(lists => this.itemLists = lists);
      });
  }
}

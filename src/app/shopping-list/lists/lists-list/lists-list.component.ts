import { Component, OnInit } from '@angular/core';
import { IList } from '../../models/list';
import { ListService } from '../../services/list.service';
import { ListedItemService } from '../../services/listed-item.service';

@Component({
  templateUrl: './lists-list.component.html',
  styleUrls: [ './lists-list.component.scss' ]
})
export class ListsListComponent implements OnInit {

  lists: IList[];

  constructor(
    private _listService: ListService,
    private _listedItemService: ListedItemService
  ) { }

  ngOnInit() {
    this.lists = [];
    this._listService.getLists()
      .subscribe(lists => {
        this._listedItemService.setItemsForLists(lists)
          .subscribe(lists_with_items => this.lists = lists_with_items);
      });
  }

  getRelevantLists(): IList[] {
    return this.lists
      .filter(x => x.status !== 2);
  }

  createList() {
    this._listService
      .createList()
      .subscribe(x => {
        this._listService.getLists()
          .subscribe(lists => {
            this._listedItemService.setItemsForLists(lists)
              .subscribe(lists_with_items => this.lists = lists_with_items);
          });
      });
  }
}

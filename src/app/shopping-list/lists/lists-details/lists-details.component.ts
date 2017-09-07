import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IList } from '../../models/list';
import { IItem } from '../../models/item';
import { ListService } from '../../services/list.service';
import { ListedItemService } from '../../services/listed-item.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from '../../services/item.service';

@Component({
  templateUrl: './lists-details.component.html',
  styleUrls: [ './lists-details.component.scss' ]
})
export class ListsDetailsComponent implements OnInit {

  isInactive = false;
  isActive = false;
  isDone = false;

  confirmDelete = false;
  addMenuShown = false;
  newItemForm: FormGroup;
  _list: IList;
  get list(): IList {
    return this._list;
  }
  set list(list: IList) {
    this._list = list;
    this.updateListStatus();
  }
  items: IItem[];

  constructor(
    private _listService: ListService,
    private _listedItemService: ListedItemService,
    private _itemService: ItemService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.newItemForm = this._formBuilder.group({
      id: [ '', Validators.required ],
      amount: [ '', Validators.required ],
      notes: ''
    });

    const id = +this._route.snapshot.paramMap.get('id');
    this._itemService.getItems()
      .subscribe(items => {
        this.items = items;
        this.updateList(id);
      });
  }

  getNameOfItem(id): string {
    return this.items.find(item => item.item_id === id).name;
  }

  deleteList() {
    if (this.list) {
      this._listService.deleteList(this.list)
        .subscribe(err => {
          if (err) {
            console.log(err);
          } else {
            this._router.navigate([ '/shopping-list/lists' ]);
          }
        });
    }
  }

  triggerAddMenu() {
    this.addMenuShown = !this.addMenuShown;
  }

  onSubmit() {
    const value = this.newItemForm.value;
    this._listedItemService.create(
      this.list.list_id,
      value.id,
      value.amount,
      value.notes
    )
      .subscribe(x => {
        this.newItemForm.reset();
        this.addMenuShown = false;
        this.updateList(this.list.list_id);
      });
  }

  updateList(id) {
    this._listService.getList(id)
      .subscribe(list => {
        this._listedItemService.setItemsForList(list)
          .subscribe(list_with_items => this.list = list_with_items);
      });
  }

  removeItem(item) {
    this._listedItemService.delete(item)
      .subscribe(x => {
        this.list.items.splice(this.list.items.indexOf(item), 1);
      });
  }

  activateList() {
    this.list.status = 1;
    this.updateListStatus();
  }

  finishList() {
    this.list.status = 2;
    this.updateListStatus();
  }

  private updateListStatus() {
    this._listService.updateList(this.list)
      .subscribe(() => {
        this.isInactive = this.list.status === 0;
        this.isActive = this.list.status === 1;
        this.isDone = this.list.status === 2;
      });
  }
}

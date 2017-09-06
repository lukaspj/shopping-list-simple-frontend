import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';
import { IItem, IItemList, LIST_STATUS } from '../models';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list-detail.component.html',
  styleUrls: [
    './shopping-list-detail.component.scss'
  ]
})
export class ShoppingListDetailComponent implements OnInit {

  isInactive = false;
  isActive = false;
  isDone = false;

  confirmDelete = false;
  addMenuShown = false;
  newItemForm: FormGroup;
  _list: IItemList;
  get list(): IItemList {
    return this._list;
  }
  set list(list: IItemList) {
    this._list = list;
    this.updateListStatus();
  }
  items: IItem[];

  constructor(
    private _shoppingListService: ShoppingListService,
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
    this._shoppingListService.getItems()
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
      this._shoppingListService.deleteList(this.list)
        .subscribe(err => {
          if (err) {
            console.log(err);
          } else {
            this._router.navigate([ '/shoppinglist' ]);
          }
        });
    }
  }

  triggerAddMenu() {
    this.addMenuShown = !this.addMenuShown;
  }

  onSubmit() {
    const value = this.newItemForm.value;
    this._shoppingListService.createListItem(
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
    this._shoppingListService.getList(id)
      .subscribe(list => this.list = list);
  }

  removeItem(item) {
    this._shoppingListService.deleteListItem(item)
      .subscribe(x => {
        this.list.items.splice(this.list.items.indexOf(item), 1);
      });
  }

  activateList() {
    this.list.status = LIST_STATUS.ACTIVE;
    this.updateListStatus();
  }

  finishList() {
    this.list.status = LIST_STATUS.DONE;
    this.updateListStatus();
  }

  private updateListStatus() {
    this._shoppingListService.updateList(this.list)
      .subscribe(() => {
        this.isInactive = this.list.status === LIST_STATUS.INACTIVE;
        this.isActive = this.list.status === LIST_STATUS.ACTIVE;
        this.isDone = this.list.status === LIST_STATUS.DONE;
    });
  }
}

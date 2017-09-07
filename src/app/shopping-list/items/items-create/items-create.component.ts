import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemService } from '../../services/item.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './items-create.component.html',
  styleUrls: [ './items-create.component.scss' ]
})
export class ItemsCreateComponent implements OnInit {

  itemForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _itemService: ItemService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.itemForm = this._formBuilder.group(({
      name: [ '', Validators.required ],
      estprice: [ '', Validators.required ]
    }));
  }

  onSubmit() {
    const value = this.itemForm.value;
    this._itemService.createItem(value.name, value.estprice)
      .subscribe(res => {
        if (res) {
          console.log(res);
        } else {
          this._router.navigate([ '/shopping-list/items' ]);
        }
      });
  }
}

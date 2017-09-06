import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ShoppingItemService } from '../shopping-item.service';

@Component({
  selector: 'app-shopping-item-create',
  templateUrl: './shopping-item-create.component.html',
  styleUrls: [ './shopping-item-create.component.scss' ]
})
export class ShoppingItemCreateComponent implements OnInit {

  itemForm: FormGroup;

  constructor(
    private _shoppingItemService: ShoppingItemService,
    private _formBuilder: FormBuilder,
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
    this._shoppingItemService.createItem(value.name, value.estprice)
      .subscribe(res => {
        if (res) {
          console.log(res);
        } else {
          this._router.navigate([ '/shoppingitem' ]);
        }
      });
  }

}

import { Component, OnInit } from '@angular/core';

import { FormsModule, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    starForm: FormGroup;

    ngOnInit() {
        this.starForm = new FormGroup({
            'userData': new FormGroup({
                'firstName': new FormControl( null, Validators.required ),
                'secondName': new FormControl( null),
                'email': new FormControl(null, [Validators.required, Validators.email]),
                'date': new FormControl(null),
                'gender': new FormControl('male')
            })
        })
    
    }
    onSubmit() {
        console.log('submited',this.starForm)
    }
}

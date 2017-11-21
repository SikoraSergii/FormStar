import { Component, OnInit } from '@angular/core';

import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs/Observable';

import { Stars } from './SharedData/stars-mosk'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    starForm: FormGroup;
    message: string;
    stars = Stars();
    star: { name: string, url: string }
    private now = new Date()

    ngOnInit() {
        this.starForm = new FormGroup({
            'userData': new FormGroup({
                'firstName': new FormControl(null, Validators.required),
                'secondName': new FormControl(null, Validators.required),
                'email': new FormControl(null, [Validators.required, Validators.email]),
                'date': new FormControl(null, [Validators.required, this.dateChecker.bind(this)]),
                'gender': new FormControl('male')
            }),
            'howHard': new FormControl(0)
        });

        
    }

    onSubmit(starType: string) {
        const data = this.starForm.value
        const age = this.now.getFullYear() - data.userData.date.getFullYear()

        if (age < 18) {
            this.message = `How can you be a ${starType} star, if you can't even buy a beer `;
            return
        }
        if (starType === 'rock') {
            this.star = data.userData.gender === 'female' ? this.stars.rockWoman[data.howHard] : this.stars.rockMan[data.howHard]
        } else {
            this.star = data.userData.gender === 'female' ? this.stars.rapWoman[0] : this.stars.rapMan[data.howHard]
        }
            
        this.message = `Congratulations, ${data.userData.firstName} "${this.star.name}" ${data.userData.secondName}! You are cool now `
    }

    newTry() {
        this.star = null;
        this.message = null;
        this.starForm.reset({
            howHard: 0,
            userData: {
                gender: 'male'
            }
        })
    }
    dateChecker(control: FormControl): { [s: string]: boolean } {
        if (control.value && (control.value.getFullYear() >= this.now.getFullYear() || control.value.getFullYear() < 1940)) {
            return { 'incorrectDate': true };
        }
        return null;
    }
}

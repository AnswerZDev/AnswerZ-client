import { EventEmitter, Injectable } from '@angular/core'
import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";

@Injectable({
    providedIn: 'root',
})
export class SecurityService {
    constructor() { }
}

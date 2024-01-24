import { Injectable } from '@angular/core'

@Injectable({
    providedIn: 'root',
})
export class JWTService {
    public static parseJWT(token: string): JWT {
        return JSON.parse(atob(token.split('.')[1]))
    }
}

export interface JWT {
    exp: number
    iat: number
    username: string
    roles: string[]
}

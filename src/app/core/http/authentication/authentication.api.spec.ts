import { TestBed } from '@angular/core/testing'
import { HttpClientModule } from '@angular/common/http'
import { AuthenticationApi } from './authentication.api'

describe('AuthService', () => {
    let service: AuthenticationApi

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule],
            providers: [AuthenticationApi],
        })
        service = TestBed.inject(AuthenticationApi)
    })
    it('should create an instance', () => {
        expect(service).toBeTruthy()
    })
})

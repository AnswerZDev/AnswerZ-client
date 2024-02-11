import { TestBed } from '@angular/core/testing'

import { CardsetApi } from './cardset.api'

describe('CardsetApiService', () => {
    let service: CardsetApi

    beforeEach(() => {
        TestBed.configureTestingModule({})
        service = TestBed.inject(CardsetApi)
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })
})
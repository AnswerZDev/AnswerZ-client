import { TestBed } from '@angular/core/testing'

import { FlashcardApi } from './flashcard.api'

describe('FlashcardApiService', () => {
    let service: FlashcardApi

    beforeEach(() => {
        TestBed.configureTestingModule({})
        service = TestBed.inject(FlashcardApi)
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })
})
import { TestBed } from '@angular/core/testing'

import { QuestionApi } from './question.api'

describe('UserApiService', () => {
    let service: QuestionApi

    beforeEach(() => {
        TestBed.configureTestingModule({})
        service = TestBed.inject(QuestionApi)
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })
})

import { Uri } from './uri'

describe('Uri', () => {
    it('should create an instance', () => {
        expect(new Uri('https://www.example.com/')).toBeTruthy()
    })

    it('should append a path', () => {
        const uri = new Uri('https://www.example.com/')
        uri.appendPath('path')
        expect(uri.get()).toEqual('https://www.example.com/path/')
    })

    it('should append a path with a leading slash', () => {
        const uri = new Uri('https://www.example.com/')
        uri.appendPath('/path')
        expect(uri.get()).toEqual('https://www.example.com/path/')
    })

    it('should append a path with a trailing slash', () => {
        const uri = new Uri('https://www.example.com/')
        uri.appendPath('path/')
        expect(uri.get()).toEqual('https://www.example.com/path/')
    })

    it('should append a path with a leading and trailing slash', () => {
        const uri = new Uri('https://www.example.com/')
        uri.appendPath('/path/')
        expect(uri.get()).toEqual('https://www.example.com/path/')
    })
})

import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Uri } from '../models/uri/uri'
import { inject, Injectable } from '@angular/core'
import { Filter } from '../dto/filter.dto'
// import { environment } from '@environments/environment'

@Injectable({
    providedIn: 'root',
})
export abstract class ApiService {
    protected readonly _uri: Uri
    protected readonly http: HttpClient = inject(HttpClient)
    private url = 'toto' //environment.server + '/api/v1'

    protected constructor(extendUrl: string) {
        this._uri = new Uri(this.url)
        this._uri = this._uri.appendPath(extendUrl)
    }

    protected get uri(): string {
        return this._uri.get()
    }

    protected get<T>(
        url: string,
        filters?: Filter[],
        page?: number,
        options?: any
    ): Observable<T> {
        if (!options) {
            options = {}
        }
        options.params = options?.params ?? new HttpParams()
        if (filters) {
            filters.forEach((filter) => {
                if (Array.isArray(filter.value) && filter.value.length > 0) {
                    filter.value.forEach((value) => {
                        options.params = options.params.append(
                            filter.name + '[]',
                            value
                        )
                    })
                } else if (
                    !Array.isArray(filter.value) &&
                    filter.value !== null &&
                    filter.value !== undefined
                ) {
                    options.params = options.params.append(
                        filter.name,
                        filter.value
                    )
                }
            })
        }

        if (page) {
            options.params = options.params.append('page', page.toString())
        }
        return this.http.get<T>(
            this._uri.appendPath(url).get(),
            options
        ) as unknown as Observable<T>
    }

    protected post<T>(url: string, body: any, options?: any): Observable<T> {
        return this.http.post<T>(
            this._uri.appendPath(url).get(),
            body,
            options
        ) as unknown as Observable<T>
    }

    protected put<T>(url: string, body: any, options?: any): Observable<T> {
        return this.http.put<T>(
            this._uri.appendPath(url).get(),
            body,
            options
        ) as unknown as Observable<T>
    }

    protected delete<T>(url: string, options?: any): Observable<T> {
        return this.http.delete<T>(
            this._uri.appendPath(url).get(),
            options
        ) as unknown as Observable<T>
    }

    protected patch<T>(url: string, body: any, options?: any): Observable<T> {
        return this.http.patch<T>(
            this._uri.appendPath(url).get(),
            body,
            options
        ) as unknown as Observable<T>
    }

    protected head<T>(url: string, options?: any): Observable<T> {
        return this.http.head<T>(
            this._uri.appendPath(url).get(),
            options
        ) as unknown as Observable<T>
    }

    protected options<T>(url: string, options?: any): Observable<T> {
        return this.http.options<T>(
            this._uri.appendPath(url).get(),
            options
        ) as unknown as Observable<T>
    }
}
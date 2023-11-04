import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product, Store} from "../../features/stores/containers/store/store.model";

@Injectable({
    providedIn: 'root'
})
export class StoresService {
    private STORES_DB = 'assets/data/stores.json';
    private PRODUCTS_DB = 'assets/data/products.json';

    constructor(private httpClient: HttpClient) {
    }

    getProducts(): Observable<Product[]> {
        return this.httpClient.get<Product[]>(this.PRODUCTS_DB);
    }

    getStores(): Observable<Store[]> {
        return this.httpClient.get<Store[]>(this.STORES_DB);
    }

    saveStores(stores: Store[]): Observable<Store[]> {
        return this.httpClient.put<Store[]>(this.STORES_DB, stores);
    }
}

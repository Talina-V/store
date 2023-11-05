import {Component, OnInit} from '@angular/core';
import {Product, Store} from "./features/stores/containers/store/store.model";
import {StoresService} from "./core/services/stores.service";
import {take, timer} from "rxjs";
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {Toast} from "./notification.model"

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    title = 'Stores';
    stores: Store[] = [];
    products: Product[] = [];
    faTrash = faTrash;
    toast: Toast | null = null;

    constructor(
        private storeService: StoresService,
    ) {
    }

    ngOnInit(): void {
        this.getStores();
        this.getProducts();
    }

    getProducts() {
        this.storeService.getProducts().subscribe((data: Product[]) => {
            this.products = data;
        });
    }

    getStores() {
        this.storeService.getStores().subscribe((data: Store[]) => {
            this.stores = data;
        });
    }

    getTotalAmount(store: Store): number {
        return store.products.reduce((acc, product) => acc + product.amount, 0);
    }

    getMostPopularProduct(store: Store): string {
        let maxAmount = 0;
        let popularProductName = 'Out of stock';

        if (store.products && store.products.length > 0) {
            store.products.forEach(product => {
                if (product.amount > maxAmount) {
                    maxAmount = product.amount;
                    const foundProduct = this.products.find(p => p.id === product.id);
                    if (foundProduct) {
                        popularProductName = foundProduct.name;
                    }
                }
            });
        }

        return popularProductName;
    }

    getPopularProductAmount(store: Store): number {
        let maxAmount = 0;
        let popularProductAmount = 0;

        store.products.forEach(product => {
            if (product.amount > maxAmount) {
                maxAmount = product.amount;
                popularProductAmount = product.amount;
            }
        });

        return popularProductAmount;
    }

    deleteStore(targetStore: Store): void {
        const index = this.stores.indexOf(targetStore);
        if (index > -1) {
            this.stores.splice(index, 1);
            this.showToast('Store deleted successfully.', 'danger');
        }
    }


    onStoreAdded(newStore: Store): void {
        this.stores.push(newStore);
        this.showToast('Store added successfully.', 'success');
    }

    showToast(message: string, type: 'success' | 'danger') {
        this.toast = {message, type};
        timer(3000).pipe(take(1)).subscribe(() => {
            this.closeToast();
        });
    }

    closeToast() {
        this.toast = null;
    }
}

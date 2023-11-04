import {ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {StoresService} from "../../../../core/services/stores.service";
import {Product, Store} from "./store.model";
import {faPlus, faMinus} from "@fortawesome/free-solid-svg-icons";
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-store',
    templateUrl: './store.component.html',
    styleUrls: ['./store.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class StoreComponent implements OnInit {
    title = 'New Store';
    faPlus = faPlus;
    faMinus = faMinus;
    storeForm!: FormGroup;
    isInventoryAvailable: boolean = false;
    elementFormArray: FormArray;
    addedProducts: { id: number, name: string, amount: number }[] = [];
    stores: Store[] = [];
    products: Product[] = [];
    selectedProduct: FormControl = new FormControl(0);
    selectedQuantity: FormControl = new FormControl(0);
    @Output() storeAdded: EventEmitter<Store> = new EventEmitter<Store>();

    constructor(
        private storeService: StoresService,
        private fb: FormBuilder,
    ) {
        this.elementFormArray = this.fb.array([]);
    }

    ngOnInit(): void {
        this.buildForm();
        this.getProducts();
    }

    buildForm(): void {
        this.storeForm = this.fb.group({
            storeTitle: ['',
                [
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(50)
                ]
            ],
            selectedProduct: this.selectedProduct,
            selectedQuantity: this.selectedQuantity
        });
    }

    addStore() {
        if (this.storeForm.valid) {
            const newStore: Store = {
                name: this.storeForm.value.storeTitle,
                products: this.addedProducts,
            };

            this.storeAdded.emit(newStore);
        }
    }

    addProduct() {
        const selectedProductValue = +this.storeForm.value.selectedProduct;
        const selectedQuantityValue = +this.storeForm.value.selectedQuantity;
        const foundProduct = this.products.find(product => product.id === selectedProductValue);

        if (foundProduct && selectedQuantityValue > 0) {
            const productName = foundProduct.name;
            this.addedProducts.push({ id: selectedProductValue, name: productName, amount: selectedQuantityValue });
        }

        this.selectedProduct.setValue(0);
        this.selectedQuantity.setValue(0);
    }

    removeProduct(product: { id: number, amount: number }) {
        const index = this.addedProducts.findIndex(p => p.id === product.id);
        if (index !== -1) {
            this.addedProducts.splice(index, 1);
        }
    }

    getProducts(): void {
        this.storeService.getProducts().subscribe((products: Product[]) => {
            this.products = products;
        });
    }

    toggleInventoryAvailability() {
        this.isInventoryAvailable = !this.isInventoryAvailable;
    }

    get storeTitle(): AbstractControl {
        return this.storeForm.get('storeTitle')!;
    }

    onSave(): void {
        const newStoreName: string = this.storeForm.value.storeTitle;

        const newStore: Store = {
            name: newStoreName,
            products: [],
        };

        this.stores.push(newStore);
        this.storeAdded.emit(newStore);

        this.storeForm.get('storeTitle')?.reset();

        this.storeService.getStores().subscribe((stores: Store[]) => {
            this.storeService.saveStores([...stores, newStore]).subscribe(updatedStores => {
                console.log('New store added and saved to JSON:', updatedStores);
            });
        });
    }
}

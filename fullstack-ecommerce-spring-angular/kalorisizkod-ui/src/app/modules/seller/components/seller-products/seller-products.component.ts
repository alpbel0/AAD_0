import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-seller-products',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './seller-products.component.html',
  styleUrls: ['./seller-products.component.css']
})
export class SellerProductsComponent implements OnInit {
  products: any[] = [];
  categories: string[] = ['Elektronik', 'Giyim', 'Kitaplar', 'Ev & Yaşam', 'Spor'];
  loading: boolean = true;
  showAddProductModal: boolean = false;
  showEditProductModal: boolean = false;
  productForm!: FormGroup;
  editingProductId: number | null = null;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit(): void {
    // Normalde bir servis üzerinden ürünler çekilecek
    setTimeout(() => {
      this.products = [
        { id: 1, name: 'Gaming Laptop', description: 'Yüksek performanslı oyuncu bilgisayarı', price: 15999.99, stock: 20, category: 'Elektronik', imageUrl: 'https://via.placeholder.com/150', active: true },
        { id: 2, name: 'Akıllı Telefon', description: '6.5 inç ekranlı akıllı telefon', price: 9999.99, stock: 50, category: 'Elektronik', imageUrl: 'https://via.placeholder.com/150', active: true },
        { id: 3, name: 'Kablosuz Kulaklık', description: 'Gürültü önleyici özellikli kulaklık', price: 2499.50, stock: 100, category: 'Elektronik', imageUrl: 'https://via.placeholder.com/150', active: true },
        { id: 4, name: 'Pamuklu Tişört', description: '%100 pamuk yazlık tişört', price: 299.90, stock: 200, category: 'Giyim', imageUrl: 'https://via.placeholder.com/150', active: false }
      ];
      this.loading = false;
    }, 800);
  }

  createForm(): void {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: ['', [Validators.required, Validators.min(0)]],
      stock: ['', [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      imageUrl: ['https://via.placeholder.com/150'],
      active: [true]
    });
  }

  openAddProductModal(): void {
    this.createForm(); // Form'u sıfırla
    this.showAddProductModal = true;
  }

  openEditProductModal(product: any): void {
    this.editingProductId = product.id;
    this.productForm.setValue({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      category: product.category,
      imageUrl: product.imageUrl,
      active: product.active
    });
    this.showEditProductModal = true;
  }

  closeModals(): void {
    this.showAddProductModal = false;
    this.showEditProductModal = false;
    this.editingProductId = null;
  }

  addProduct(): void {
    if (this.productForm.invalid) {
      return;
    }

    const newProduct = {
      id: this.products.length + 1, // Gerçek uygulamada backend tarafından atanır
      ...this.productForm.value
    };

    this.products.push(newProduct);
    this.closeModals();
    // Burada normalde bir API çağrısı yapılacak
  }

  updateProduct(): void {
    if (this.productForm.invalid || !this.editingProductId) {
      return;
    }

    const index = this.products.findIndex(p => p.id === this.editingProductId);
    if (index !== -1) {
      this.products[index] = {
        ...this.products[index],
        ...this.productForm.value
      };
    }

    this.closeModals();
    // Burada normalde bir API çağrısı yapılacak
  }

  toggleProductStatus(product: any): void {
    product.active = !product.active;
    // Burada normalde bir API çağrısı yapılacak
  }

  deleteProduct(id: number): void {
    if (confirm('Bu ürünü silmek istediğinizden emin misiniz?')) {
      this.products = this.products.filter(product => product.id !== id);
      // Burada normalde bir API çağrısı yapılacak
    }
  }
}

app.component('product-display', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: 
    
    /*html*/
    `<div class="product-display">
        <div class="product-container">
          <div class="product-image" data-cy="product-image">
            <a :href="url" target="_blank">
              <img v-bind:src="image" :alt="product" :class="{ 'out-of-stock-img': !inStock }" >
            </a>
          </div>
          <div class="product-info" data-cy="product-info-block">

            <h1>{{ title }}</h1>
            <p v-if="inStock">In Stock</p>
            <!-- <p v-else-if="inventory <= 10 && inventory > 0">Almost sold out</p> -->
            <p v-else class="color-danger">Out of Stock</p>

            <p data-cy="shipping">Shipping: {{ shipping }}</p>

            <ul>
               <product-details :details="details" data-cy="details-list"></product-details>
            </ul>

            <div> Colour: </div>
            <div class="d-flex"> 
              <div 
                v-for="(variant, index) in variants" 
                :key="variant.id" 
                @mouseover="updateVariant(index)"
                class="color-circle"
                :style="{ backgroundColor: variant.color }"
                data-cy="variants-list"
              >
              </div>
            </div>

            <div> Size: </div>
            <ul class="d-flex sizes" data-cy="sizes-list">
              <li v-for="size in sizes" class="button-size">
                <a @click="{ selectedSize: true }">{{ size }}</a>
              </li>
            </ul>

            <div class="buttons"> 
            
              <button 
                class="button" 
                :class="{ disabledButton: !inStock }"
                @click="addToCart"
                data-cy="add-to-cart-button"
              >
                Add to Cart
              </button>

              <button 
                class="button button-delete" 
                @click="removeProduct"
                data-cy="delete-button"
              >
                Remove 
              </button>
              
            </div>


          </div>
        </div>

        <div class="reviews-block">
          
          <review-form @review-submitted="addReview" data-cy="review-form"></review-form>
          <review-list  v-if="reviews.length" :reviews="reviews" data-cy="review-list"></review-list> 
          
        </div>

      </div>`, 

      data () {
        return {
            product: 'Socks',
            brand: 'Vue Mastery',
            url: 'https://google.com.br',
            selectedVariant: 0,
            onSale: true,
            variants: [
                { id: 123, color: '#1b814c', image: './assets/images/socks_green.jpg', quantity: 50 },
                { id: 124, color: '#586b84', image: './assets/images/socks_blue.jpg', quantity: 20 },
                { id: 125, color: '#db9447', image: './assets/images/socks_blue.jpg', quantity: 0 },
            ],
            sizes: ['S', 'M', 'L', 'XL'],
            details: ['50% cotton', '30% wool', '20% polyester'],
            reviews: [] 
        }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].id)
        },
        removeProduct() {
            this.$emit('remove-from-cart', this.variants[this.selectedVariant].id)
        },
        /**
         * @param {any} variantImage
         */
        updateVariant(index) {
            this.selectedVariant = index
        }, 
        addReview(review) {
            this.reviews.push(review)
        }

    },
    computed: {
        title() {
            //let sale = this.onSale ? 'is on sale' : ''
            return this.brand + ' ' + this.product + ' ' //+ sale
        },
        image() {
            return this.variants[this.selectedVariant].image
        },
        inStock() {
            return this.variants[this.selectedVariant].quantity
        },
        onSale() {
            if(this.onSale) {
                return this.brand + ' ' + this.product + 'is on sale'
            }
            return ''
        },
        shipping() {
            if(this.premium) {
                return 'Free'
            }
            return 2.99
        }
    }

})
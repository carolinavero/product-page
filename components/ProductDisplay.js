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
          <div class="product-image">
            <a :href="url" target="_blank">
              <img v-bind:src="image" :alt="product" :class="{ 'out-of-stock-img': !inStock }" >
            </a>
          </div>
          <div class="product-info">

            <h1>{{ title }}</h1>
            <p v-if="inStock">In Stock</p>
            <!-- <p v-else-if="inventory <= 10 && inventory > 0">Almost sold out</p> -->
            <p v-else>Out of Stock</p>

            <p>Shipping: {{ shipping }}</p>

            <ul>
               <product-details :details="details"></product-details>
            </ul>

            <div 
              v-for="(variant, index) in variants" 
              :key="variant.id" 
              @mouseover="updateVariant(index)"
              class="color-circle"
              :style="{ backgroundColor: variant.color }"
            >
            </div>

            <ul>
              <li v-for="size in sizes">
                {{ size }}
              </li>
            </ul>

            <button 
              class="button" 
              :class="{ disabledButton: !inStock }"
              @click="addToCart"
            >
              Add to Cart
            </button>

            <button class="button" @click="removeProduct">
              Remove 
            </button>

          </div>
        </div>

        <review-list v-if="reviews.length" :reviews="reviews"></review-list>
        <review-form @review-submitted="addReview"></review-form>
      </div>`, 

      data () {
        return {
            product: 'Socks',
            brand: 'Vue Mastery',
            image: './assets/images/socks_blue.jpg',
            url: 'https://google.com.br',
            selectedVariant: 0,
            onSale: true,
            variants: [
                { id: 123, color: 'green', image: './assets/images/socks_green.jpg', quantity: 50 },
                { id: 124, color: 'blue', image: './assets/images/socks_blue.jpg', quantity: 0 },
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
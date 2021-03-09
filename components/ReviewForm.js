app.component('review-form', {
    template: 
    /*html*/

    `
    <form class="review-form" @submit.prevent="onSubmit">

        <div v-if="error">
            <div class="error-alert">
                Review is incomplete! Please fill out every field.
            </div>
        </div>

        <h3>Leave a review</h3>
        <label for="name">Name:</label>
        <input id="name" v-model="name">

        <label for="review">Review:</label>      
        <textarea id="review" v-model="review"></textarea>

        <label for="rating">Rating:</label>
        <select id="rating" v-model.number="rating">
            <option>5</option>
            <option>4</option>
            <option>3</option>
            <option>2</option>
            <option>1</option>
        </select>
        
        <label for="recommend">Would you recommend this product?</label>
        <select id="recommend" v-model="recommend">
            <option>Yes</option>
            <option>No</option>
        </select>

        <input class="button" type="submit" value="Submit">  

    </form>
    `,
    data() {
        return {
            name: '',
            review: '',
            rating: null,
            recommend: null,
            error: false, 
            reviews: [] 
        }
    },
    mounted() {
        if(localStorage.getItem('productReview')) {
            try {
                this.reviews = JSON.parse(localStorage.getItem('productReview'));
            } catch(e) {
                localStorage.removeItem('productReview');
            }
        }
    },
    methods: {
        onSubmit() {

            if(this.name === '' || 
            this.review === '' ||
            this.rating === null ||
            this.recommend === null) {
                this.error = true;
                return
            }

            let productReview = {
                name: this.name,
                review: this.review,
                rating: this.rating,
                recommend: this.recommend
            }
            this.$emit('review-submitted', productReview)
            this.reviews = productReview

            this.name = '',
            this.review = '',
            this.rating = null,
            this.recommend = null

            this.saveReviews()

        },
        saveReviews() {
            
            console.log(this.reviews);
            const resultReviews = JSON.stringify(this.reviews);
            localStorage.setItem('productReview', resultReviews);

            if(localStorage.name) this.name = localStorage.name;
            if(localStorage.review) this.review = localStorage.review;
            if(localStorage.rating) this.rating = localStorage.rating;
            if(localStorage.recommend) this.name = localStorage.recommend;
        }
    }
})
app.component('review-list', {
    props: {
        reviews: {
            type: Array,
            required: true
        }
    },
    mounted() {
        if(localStorage.getItem('productReview')) {
            console.log("list...", this.reviews)
           
        }
    },
    template: 
    /*html*/
    `   
    <div class="review-container" >
        <h3> Reviews: </h3>
        <ul>
            <li v-for="(review, index) in reviews" :key="index">
                <strong>{{ review.name }}</strong> gave this <strong>{{ review.rating }} stars </strong>
                <br />
                Recommend? {{ review.recommend }}
                <br />
                "{{ review.review }}"
            </li>
        </ul>
    </div>

    
    `
})
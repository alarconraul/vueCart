const app = new Vue({
    el: '#app',

    data() {
        return {
            title: 'Intro a VueJs',
            cart: [],
            showStyle: {
                display: 'block'
            },
            displayCart: false,
            premiumUser: false
        }
    },
    methods: {
        addToShoppingCart(product){
            this.cart.push(product);
        },
        removeFromShoppingCart(product){ 
            let index=this.cart.indexOf(product);
            if(this.cart.length > -1){

                this.cart.splice(index,1);
            }
        },
        emptyCart(){
            this.$refs.product.restoreStock()  
            this.cart = []
        },

        
    },
    computed: {
        modalStyle() {
            if (this.displayCart) {
                return this.showStyle;
            } else {
                return {};
            }
        },
        cartCheck (){
            var cartProducts = this.cart.map ((product) => product.type) 
            result = cartProducts.reduce((a, c) => (a[c] = (a[c] || 0) + 1, a), Object.create(null));
            return result
        }
    }
});
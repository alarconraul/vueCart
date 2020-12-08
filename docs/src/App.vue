<template>
  <div id="app">
        <nav class="navbar fixed-top navbar-dark bg-info">
            <span class="navbar-brand mb-0 h1">Hello, Vue</span>
            <ul class="navbar-nav ml-auto">
                <li class='nav-item active'>
                    <a href="#" class="nav-link" @click="displayCart=true">
                        Cart {{ cart.length }}
                    </a>
                </li>
            </ul>
        </nav>
        <div class="container mt-5">
            <h1>{{title}}</h1>
            <product-component :premium="premiumUser" @add-to-cart="addToShoppingCart" :cart="cart" @remove-from-cart="removeFromShoppingCart" ref="product"></product-component>
        </div>
        <div class="modal" :class="{show: displayCart}" :style="modalStyle" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Resumen de compra</h5>
                        <button @click="displayCart=false" type="button" class="close" data-dismiss="modal"
                            aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <ul>
                            <li v-for="(item, key, index) in cartCheck" :key="index">
                              {{ item }} - {{ key }}
                            </li>
                          </ul>
                        <p></p>
                    </div>
                    <div class="modal-footer">
                        <button @click="emptyCart" type="button" class="btn btn-secondary"
                            data-dismiss="modal">Vaciar carrito</button>
                        <button type="button" @click="displayCart=false" class="btn btn-primary">Seguir comprando</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ProductComponent from './components/ProductComponent.vue'

export default {
  name: 'App',
  components: {
    ProductComponent
  }, 
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
            var result = cartProducts.reduce((a, c) => (a[c] = (a[c] || 0) + 1, a), Object.create(null));
            return result
        }
    }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

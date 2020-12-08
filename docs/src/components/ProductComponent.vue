<template>
  <div class="hello">
            <div class="row">
            <div class="col md-6">
                <img :src="img" alt="img" class="img-thumbnail">
            </div>
            <div class="col md-6">
                 <h2>{{name}}</h2>   
                 <p>{{description}}</p>
                 <p>Stock: {{stock}}</p>
                 <p v-if='stock > 10'>En Stock</p>
                 <p v-else-if='stock <= 10 && stock > 0'>¡Quedan muy pocos libros!</p>
                 <p v-else>Sin Stock</p>
                 <p>Costo de envío: {{shipping}}</p>

                 <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <label class="input-group-text" for="inputGroupSelect01">Formato</label>
                    </div>
                    <select v-model="selectedFormat" class="custom-select" id="inputGroupSelect01">
                      <option v-for="format in formats" :value="format" :key="format.sku">{{format.type}}</option>
                    </select>
                  </div>
                  <button class="btn btn-primary" @click='stock++'>{{stock}}</button>
                  <button @click="addToCart" :disabled="!hasStock" class="btn btn-success">Agregar al carrito</button>
                  <button class="btn btn-danger" @click="removeFromCart">Eliminar</button>
            </div>
        </div>
      </div>
</template>

<script>
export default {
  name: 'ProductComponent',
      props: {
        premium: {
            type: Boolean,
            //required: true
            default:false
        },
        cart:{
            type:Array,
            required: true
        }
    },
    data() {
        return {
            selectedFormat: {},
            name: 'Normal Gets You Nowhere',
            description: 'Lorem Ipsum',
            formats: [{
                sku: '2234',
                type: 'Versión Impresa',
                img: './assets/img/printed-book.jpg',
                stock: 10,
            }, {
                sku: '2235',
                type: 'PDF',
                img: './assets/img/pdf-book.jpg',
                stock: 100,
                default: true
            }]
        }
    },
    computed: {
        img() {
            return this.selectedFormat.img;
        },
        stock() {
            return this.selectedFormat.stock;
            
        },
        shipping() {
            if (this.premium) {
                return 0;
            } else {
                return '2500'
            }
        },
        hasStock(){
            if(this.stock > 0){
                return true;
            }else{
                return false;
            }
        }
    },
    beforeCreate (){
        console.log(`estamos en el beforeCreated ${this.selectedFormat}`)
    },
    created() {
        console.log(`estamos en el created ${this.selectedFormat.type}`)
        var defaultFormat = this.formats.find(format => format.default == true);
        this.selectedFormat = defaultFormat;
        console.log(`estamos en el created ${this.selectedFormat.type}`)
    },

    
    methods:{
        addToCart(){
            this.selectedFormat.stock -=1;
            this.$emit('add-to-cart',this.selectedFormat)
        },
        removeFromCart(){      
            let variantCart =this.cart.filter(variant => variant == this.selectedFormat)
            if(variantCart.length > 0){
                this.selectedFormat.stock +=1
                this.$emit('remove-from-cart',this.selectedFormat)
            }
        },
        restoreStock(){
            console.log("I got you!")
            this.cart.forEach( (product) => {
                var returnedProduct = this.formats.find(format => format.type == product.type)
                returnedProduct.stock += 1
            })
        },
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
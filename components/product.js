Vue.component('product-component', {
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
    template: '#product-template',
    
});
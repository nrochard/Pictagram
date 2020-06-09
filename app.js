//modele de vue
const vm = new Vue({
    el: '#app',
    created() {
        this.import()
    },
    data: {
        posts: [],
        update: null,
        query: ''
    },
    methods: {
        import() {
            //pour convertir les accents etc
            const uri = encodeURIComponent(this.query)

            fetch(this.query ? `./api.php?tag=${uri}` : './api.php')
            .then(response => response.json())
            .then(json => {
                this.posts = json
                this.posts.forEach(post => {
                    post.isLiked = false
                })
            })
            .catch(error => console.error(error))
        },
        like(postId) {
            //Récupérer l'index du post à modifier
            const index = this.posts.findIndex(p => p.id === postId)
            //Déterminer la nouvelle valeur
            const newValue = !this.posts[index].isLiked
            //cloner le post à modifier
            const post = this.posts[index]
            //Donner la nouvelle valeur de isLiked
            post.isLiked = newValue
            //Modifier la propriété et la rendre réactive
            this.$set(this.posts, index, post)
        },
        typing() {
            //remettre le compteur à 0
            clearTimeout(this.update)
            //lancer un compteur de 750ms, la foonction fléchée est ensuite éxécutée
            this.update = setTimeout(() => {
                this.posts = []
                this.import()
            }, 750)
        }
    },
    computed: {
        likedTags() {
            return this.posts.filter(p => p.isLiked).length
        }
    }
});



// {{}}: liaison modèle-html

//Directives
// v-bind: liaison modèle attribut
// v-for: pour faire des boucles
// v-on: pour les évènements
// v-model: liaison bi-directionnelle avec les champs des formulaires
// v-if, v-if-else, v-else, v-show: conditions

// propriété calculée
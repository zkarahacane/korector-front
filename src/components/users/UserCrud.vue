<template>
    <v-data-table
            :headers="headers"
            :items="users"
            sort-by="username"
            class="elevation-1"
    >
        <template v-slot:top>
            <v-toolbar flat color="white">
                <v-toolbar-title>Liste de vos utilisateurs</v-toolbar-title>
                <v-divider
                        class="mx-4"
                        inset
                        vertical
                ></v-divider>
                <v-spacer></v-spacer>
                <AddUser></AddUser>
                <v-divider
                        class="mx-4"
                        inset
                        vertical
                ></v-divider>
                <ImportUser></ImportUser>
            </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">

            <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on }">
                    <v-icon
                            small
                            v-on="on"
                            class="mr-2"
                            @click="editItem(item)"
                    >
                        mdi-pencil
                    </v-icon>
                </template>

                <v-card>
                    <v-card-title>
                        <span class="headline">Modifier {{item.username}}</span>
                    </v-card-title>

                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field v-model="newUser.username" label="Username"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field v-model="newUser.nom" label="Nom"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field v-model="newUser.prenom" label="Prenom"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field v-model="newUser.email" label="email"></v-text-field>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                        <v-btn color="blue darken-1" text @click="updateItem">Save</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <v-icon
                    small
                    @click="deleteItem(item)"
            >
                mdi-delete
            </v-icon>
        </template>
        <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">Reset</v-btn>
        </template>
    </v-data-table>
</template>

<script>
    import AddUser from "./AddUser";
    import ImportUser from "./ImportUser";
    export default {
        name: "UserCrud",
        components: {ImportUser, AddUser},
        data: () => ({
            dialog: false,
            headers: [
                {
                    text: 'Username',
                    align: 'start',
                    sortable: false,
                    value: 'username',
                },
                { text: 'Nom', value: 'nom' },
                { text: 'Prenom', value: 'prenom' },
                { text: 'Email', value: 'email' },
                { text: 'Actions', value: 'actions', sortable: false },
            ],
            editedIndex: -1,
            editedItem: {
                name: '',
                calories: 0,
                fat: 0,
                carbs: 0,
                protein: 0,
            },
            defaultItem: {
                name: '',
                calories: 0,
                fat: 0,
                carbs: 0,
                protein: 0,
            },
        }),

        computed: {
            users(){
                return this.$store.getters['user/users'];
            },
            newUser(){
                return this.$store.getters['user/newUser'];
            }
        },

        created () {
            this.initialize()
        },

        methods: {
            initialize () {
                this.$store.dispatch('user/all');
            },

            editItem (item) {
                // TODO faire update UserCrud
                this.newUser.id = item.id;
                this.newUser.username = item.username;
                this.newUser.email = item.email;
                this.newUser.nom = item.nom;
                this.newUser.prenom = item.prenom;
                this.editedIndex = this.users.indexOf(this.users);
                this.dialog = true;
            },
            updateItem(){
                if(this.newUser) this.$store.dispatch('user/update');
                this.dialog = false;
            },
            deleteItem (item) {
                confirm('Voulez vous vraiment supprimer cet utilisateur ? Le retour en arrière est impossible') && this.$store.dispatch('user/delete',item);
            },
            close(){
                this.dialog = false;
                this.$store.dispatch('user/clearForm');
            }
        },
    }
</script>

<style scoped>

</style>
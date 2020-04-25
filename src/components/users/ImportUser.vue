<template>
    <v-dialog v-model="dialog" max-width="1000px">
        <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">Importer utilisateur</v-btn>
        </template>
        <template>
            <v-stepper v-model="importStep">
                <v-stepper-header>
                    <v-stepper-step :complete="importStep > 1" step="1">Importer fichier CSV</v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step :complete="importStep > 2" step="2">Vérification de l'import</v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step step="3">Fin de l'import</v-stepper-step>
                </v-stepper-header>

                <v-stepper-items>
                    <v-stepper-content step="1">
                        <v-container>
                            <v-row>
                                <template>
                                    <v-file-input v-model="file" label="Rechercher fichier"></v-file-input>
                                </template>
                            </v-row>
                        </v-container>
                        <v-btn
                                color="primary"
                                @click="uploadFile"
                        >
                            Continue
                        </v-btn>

                        <v-btn text @click="finish">Annuler</v-btn>
                    </v-stepper-content>

                    <v-stepper-content step="2">
                                    <v-data-table
                                            :headers="headers"
                                            :items="usersImport"
                                            :items-per-page="10"
                                            class="elevation-1"
                                    ></v-data-table>

                        <v-btn
                                color="primary"
                                @click="importUser"
                        >
                            Continue
                        </v-btn>

                        <v-btn text @click="finish">Annuler</v-btn>
                    </v-stepper-content>

                    <v-stepper-content step="3">
                        <v-container>
                            <v-row>
                                    Votre import s'est effectué avec succès
                            </v-row>
                        </v-container>
                        <v-btn
                                color="primary"
                                @click="newImport"
                        >
                            Importer un nouveau fichier
                        </v-btn>
                        <v-btn text @click="finish">Terminer</v-btn>
                    </v-stepper-content>
                </v-stepper-items>
            </v-stepper>
        </template>

    </v-dialog>
</template>

<script>
    export default {
        name: "ImportUser",
        data: () => ({
            dialog: false,
            file: null,
            headers: [
                {
                    text: 'Username',
                    align: 'start',
                    sortable: false,
                    value: 'username',
                },
                { text: 'Email', value: 'email' },
                { text: 'Nom', value: 'nom' },
                { text: 'Prenom', value: 'prenom' },
            ],

        }),
        watch: {
            dialog (val) {
                val || this.close()
            },
        },
        computed:{
            usersImport(){
                return this.$store.getters['user/usersImport'];
            },
            importStep(){
                return this.$store.getters['user/importStep'];
            }
        },
        methods: {
            uploadFile(){
                if(this.file)
                this.$store.dispatch('user/uploadUser', this.file);
            },
            importUser(){
                if(this.usersImport.length > 0)
                this.$store.dispatch('user/importUser');
            },
            close () {
                this.dialog = false;
            },
            finish(){
                if(this.usersImport.length > 0){
                    confirm('Voulez vous vraiment annuler votre import ?') && this.$store.dispatch('user/clearImport');
                    this.dialog = false;
                }else this.$store.dispatch('user/clearImport');
            },
            newImport(){
                this.$store.dispatch('user/clearImport');
            }

        }
    }
</script>

<style scoped>

</style>
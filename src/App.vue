<template>
    <v-app id="inspire">
        <v-navigation-drawer
                v-model="drawer"
                app
        >
            <v-list dense>
                <v-list-item link>
                    <v-list-item-action>
                        <router-link to="/" class="routerLink">
                            <v-icon>mdi-home</v-icon>
                        </router-link>
                    </v-list-item-action>
                    <v-list-item-content>
                        <router-link to="/" class="routerLink">
                            <v-list-item-title>Accueil</v-list-item-title>
                        </router-link>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item link>
                    <v-list-item-action>
                        <router-link to="/users" class="routerLink">
                            <v-icon>mdi-account-group</v-icon>
                        </router-link>
                    </v-list-item-action>
                    <v-list-item-content>
                        <router-link to="/users" class="routerLink">
                            <v-list-item-title>Utilisateurs</v-list-item-title>
                        </router-link>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar
                app
                color="indigo"
                dark
        >
            <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
            <v-toolbar-title>Application</v-toolbar-title>
        </v-app-bar>

        <v-content>
            <v-container
                    class="fill-height"
                    fluid
            >
            <router-view />
            </v-container>
        </v-content>
        <v-footer
                color="indigo"
                app
        >
            <span class="white--text">&copy; 2019</span>
        </v-footer>
    </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
      drawer: false,
  }),
  components: {
  },
  methods: {
      login(){
          window.location.href = 'http://localhost:8080/private';
      }
  },

};
</script>

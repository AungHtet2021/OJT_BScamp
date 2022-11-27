<template>
  <v-app>
    <v-app-bar
      app
      color="red"
      dark
    >
    BSCAMP OJT
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>

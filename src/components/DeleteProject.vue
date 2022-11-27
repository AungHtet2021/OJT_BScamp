
<template>
  <v-dialog v-model="delete_dialog1" max-width="500px">
  <v-card>
    <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
    <v-card-text>{{ selectDemo.pid }}</v-card-text>
    <v-card-text>{{ selectDemo.name }}</v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn @click="closeDelete">Cancel</v-btn>
      <v-btn @click="deleteItemConfirm(selectDemo.pid)">Delete</v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</v-dialog>

</template>

<script>
import api from '../utils/api.js'
export default{
  name: 'DeleteProject',
  props:["delete_dialog",'selectDemo'],
  data(){
    return{
      delete_dialog1:false,
      selectDemo1 : {}
     }
  },
  updated(){
    this.delete_dialog1=this.delete_dialog;
    this.selectDemo1=this.selectDemo;
  },
  methods:{
    closeDelete(){
      // console.log('delete')
        this.delete_dialog1=false;
        console.log('working')
    },
    async deleteItemConfirm(id) {
      const resp = await api.remove("project/delete/product/" + id);
      if (resp.status == 200) {
        this.delete_dialog1 = false;
        this.$emit("deleteProject");
      }
      else {
        console.log("sth wrong in delete id");
      }
    },
  }
}
</script>

<style>

</style>
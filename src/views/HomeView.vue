<template>
  <div>
    <v-data-table :headers="headers" :items="projects" :items-per-page="7" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat>
          <AddNewProject @saveNewProject="saveNewProject"></AddNewProject>       
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
  <v-icon small class="mr-2" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteItem(item)">
          mdi-delete 
        </v-icon>
     </template>   
    </v-data-table>
<DeleteProject @deleteProject="deleteProject" v-bind:delete_dialog="delete_dialog" v-bind:selectDemo="selectDemo"></DeleteProject>
<div>
  <v-dialog v-model="dialog" max-width="500px">
        <v-card>
            <v-card-title>
                <span class="text-h5">Edit project</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="project.pid"  label="Project Id"></v-text-field>
                        </v-col> 
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="project.name"  label="Project name"></v-text-field>
                        </v-col> 
                                    
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="project.member" label="member" type="number"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-select :items="status" v-model="project.status" label="status" ></v-select>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <template>
                                <v-row justify="center">
                                    <v-date-picker v-model="project.createdAt"></v-date-picker>
                                </v-row>
                            </template>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="editClose">
                    Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="editSave(project.pid)">
                    editSave
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</div>
  </div>
</template>

<script>
import DeleteProject from '../components/DeleteProject'
import AddNewProject from '../components/AddNewProject'
import api from '../utils/api.js'
  export default {
  components: {
    DeleteProject,
   
   AddNewProject },
    data () {
      return {
        selectDemo:{},
        delete_dialog:false,
        dialog:false,
        status:["FINISHED","STARTED","KEEPON"],
        headers: [
          {
            text: 'Id',
            align: 'start',
            sortable: false,
            value: 'pid',
          },
          { text: 'Name', value: 'name' },
          { text: 'Member', value: 'member' },
          { text: 'CreatedAt', value: 'createdAt' },  
          { text: 'Status', value: 'status' },
          { text: 'Actions', value: 'actions' },
        ],
        projects: [ ],
        project:[],
        name:"aunghtet"    
      }
    },
    async created(){
        await this.getAllProjects();
    },
  methods: {
    async getAllProjects() {
      const resp = await api.get("project/get/products");
      if (resp) {
        const data = await resp.json();
        if (data) this.projects = data;
      }
      else {
        console.log("something wrong")
      }
    },
    
    async saveNewProject() {
      await this.getAllProjects();
    },
    async deleteProject() {
      await this.getAllProjects();
    },
    deleteItem(item) {
      this.delete_dialog = true
      this.selectDemo = item
    },
    async editItem(item) {
      this.dialog = true;
      const resp = await api.get("project/get/product/" + item.pid);
      if (resp) {
        const data = await resp.json();
        if (data) this.project = data;
      }
      else {
        console.log("something wrong")
      }
    },
    async editSave(id) {
            const resp = await api.update("project/update/"+id, {
                pid:this.project.pid,
                name: this.project.name,
                member: this.project.member,
                status: this.project.status,
                createdAt: this.project.createdAt,
            });
            if (resp) {
              this.getAllProjects();
              this.dialog = false;  
            }
        },
    // async deleteItemConfirm(id) {
    //   const resp = await api.remove("project/delete/product/" + id);
    //   if (resp.status == 200) {
    //     this.delete_dialog = false;
    //     await this.getAllProjects();
    //   }
    //   else {
    //     console.log("sth wrong in delete id");
    //   }
    // },
    closeDelete() {
      this.delete_dialog = false;
    },

    editClose() {
      this.dialog = false;
    },
    }
    }
</script>

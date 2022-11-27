
<template>
    <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2 " v-bind="attrs" v-on="on">Add New Project</v-btn>
        </template>
        <v-card>
            <v-card-title>
                <span class="text-h5">Add new project</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="newItem.name" label="Project name"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="newItem.member" label="member" type="number"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-select :items="status" label="status" v-model="newItem.status"></v-select>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <template>
                                <v-row justify="center">
                                    <v-date-picker v-model="newItem.createdAt"></v-date-picker>
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
                <v-btn color="blue darken-1" text @click="close">
                    Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="save">
                    Save
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script >
import api from '../utils/api.js'
export default{
    // props:['dialog'],
    data() {
        return {
            dialog:false,
            status:["FINISHED","STARTED","KEEPON"],
            newItem: {
                name: "",
                member: "",
                createdAt: "",
                status: ""
            },
        }
    },

    methods: {
        async save() {
            const resp = await api.save("project/save", {
                name: this.newItem.name,
                member: this.newItem.member,
                status: this.newItem.status,
                createdAt: this.newItem.createdAt,
            });
            if (resp) {
                this.newItem={};
                this.dialog = false;
                this.$emit("saveNewProject");
            }
        },
        close() {
            this.dialog = false;
        },
    }
}
</script>

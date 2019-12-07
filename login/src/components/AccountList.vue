<template>
<v-container>
    <v-data-table :headers="headers" :items="students" :search="search" sort-by="calories" class="elevation-1">
        <template v-slot:top>
            <v-toolbar flat color="white">
                <v-toolbar-title>Employee</v-toolbar-title>

                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
                <v-row justify="center">
                    <v-dialog v-model="dialog" persistent max-width="600px">
                        <template v-slot:activator="{ on }">
                            <v-btn color="blue" dark v-on="on">AddEmployee</v-btn>
                        </template>
                        <v-card>
                            <v-container>
                                <v-card-title>
                                    <h1 class="headline">Employee Form</h1>
                                </v-card-title>
                                <v-form ref="form" v-model="valid" @submit.prevent="create">
                                    <v-row>
                                        <v-col cols="12" md="4">
                                            <v-text-field v-model="firstname" prepend-icon="mdi-account" :rules="nameRules" label="First Name" required></v-text-field>
                                        </v-col>
                                        <v-col cols="12" md="4">
                                            <v-text-field v-model="lastname" :rules="nameRules" prepend-icon="mdi-account" label="Last Name" required></v-text-field>
                                        </v-col>
                                        <v-col cols="12" md="4">
                                            <v-text-field v-model="middlename" :rules="nameRules" prepend-icon="mdi-account" label="Middle Name" required></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="15" md="6">
                                            <v-select :items="gender" prepend-icon="mdi-gender-male-female" v-model="gender" label="Gender"></v-select>
                                        </v-col>
                                        <v-col cols="15" md="6">
                                            <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="birthdate" transition="scale-transition" offset-y min-width="290px">
                                                <!-- For picking the date on the calendar -->
                                                <template v-slot:activator="{ on }">
                                                    <v-text-field v-model="birthdate" label="Pick a Date" prepend-icon="mdi-calendar" readonly v-on="on"></v-text-field>
                                                </template>
                                                <v-date-picker v-model="birthdate" no-title scrollable>
                                                    <v-spacer></v-spacer>
                                                    <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                                                    <v-btn text color="primary" @click="$refs.menu.save(birthdate)">OK</v-btn>
                                                </v-date-picker>
                                            </v-menu>
                                        </v-col>
                                    </v-row>
                                    <v-text-field v-model="Address" prepend-icon="mdi-map-marker" label="Address" required></v-text-field>

                                    <v-text-field v-model="email" :rules="emailRules" prepend-icon="mdi-email" label="E-mail" required></v-text-field>

                                    <v-textarea v-model="description" prepend-icon="mdi-account" label="Description" class="input-group--focused"></v-textarea>

                                    <v-card-actions>
                                        <v-spacer />
                                        <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                                        <v-btn :disabled="!valid" color="success" class="mr-4" @click="formActions">
                                            Add Account
                                        </v-btn>
                                    </v-card-actions>
                                </v-form>
                            </v-container>
                        </v-card>
                    </v-dialog>
                </v-row>
            </v-toolbar>
        </template>
        <template v-slot:item.action="{ item }">
            <v-icon small class="mr-2" @click="editStudent(item)">
                edit
            </v-icon>
            <v-icon small @click="deleteStudent(item)">
                delete
            </v-icon>
        </template>
    </v-data-table>
</v-container>
</template>

<script>
import {
    createStudent
} from '@/axios/axios.js'
// import AddStudent from '@/components/AddStudent.vue'
// import Students from '@/components/Students.vue'
import {
    getStudents,
    deleteStudent,
    updateStudent
} from '@/axios/axios.js'
export default {
    name: "AccountList",
    data() {
        return {
            add: true,
            search: '',
            students: [],
            dialog: false,
            headers: [{
                    text: 'First Name',
                    align: 'left',
                    sortable: false,
                    value: 'firstname',
                },
                {
                    text: 'Last Name',
                    value: 'lastname',
                },
                {
                    text: 'Middle Name',
                    value: 'middlename',
                },
                {
                    text: 'Gender',
                    value: 'gender'
                },
                {
                    text: 'birthdate',
                    value: 'birthdate'
                },
                {
                    text: 'Address',
                    value: 'Address'
                },
                {
                    text: 'Email',
                    value: 'email'
                },
                {
                    text: 'Actions',
                    value: 'action',
                    sortable: false
                },
            ],
            oldData:[],
            studentId: 0,
            menu: false,
            modal: false,
            editedIndex: -1,
            firstname: '',
            lastname: '',
            middlename: '',
            gender: ['Male', 'Female'],
            birthdate: new Date().toISOString().substr(0, 10),
            email: '',
            Address: '',
            description: "",
            valid: true,
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
            batchRules: [
                v => !!v || 'This is Required Field',
                v => /^[0-9]*$/.test(v) || 'This Field should be a number',
            ],
            nameRules: [
                v => !!v || 'This is Required Field',
                v => /^[a-zA-Z]*$/.test(v) || 'This field should contain only Letters',
            ]
        }
    },
    mounted() {
        getStudents()
            .then(data => this.students = data.data)
            .catch((err => alert(err)));
    },
    methods: {
        deleteStudent(items) {
            const index = this.students.indexOf(items)
            const student = this.students[index]
            deleteStudent(student._id)
                .then(() => {
                    this.$emit('deleteStudent', student._id);
                    confirm('Are you sure you want to delete this employee?') && this.$swal("Deleted", "employee deleted", 'success') && this.students.splice(index, 1)
                })
                .catch(err => alert(err.message));

        },
        editStudent(item) {
            this.add = false
            this.firstname = item.firstname;
            this.lastname = item.lastname;
            this.middlename = item.middlename
            this.gender = item.gender,
                this.birthdate = item.birthdate,
                this.email = item.email,
                this.studentId = item._id,
                this.Address = item.Address,
                this.description = item.description,
                this.editedIndex = this.students.indexOf(item)
            this.dialog = true
        },
        validate() {
            if (this.$refs.form.validate()) {
                this.snackbar = true
            }
        },
        create: function () {
            let data = {
                firstname: this.firstname,
                lastname: this.lastname,
                middlename: this.middlename,
                gender: this.gender,
                birthdate: this.birthdate,
                email: this.email,
                Address: this.Address,
                description: this.description
            }
            createStudent(data)
                .then(data => {
                    confirm('Are you sure you want to add this Employee ?') && this.$swal("Added", "employee added", 'success') &&
                        this.$emit('createStudent', data.data);
                    getStudents()
                        .then(data => this.students = data.data)
                        .catch((err => window.console.log(err)));
                    this.firstname = this.lastname = this.middlename = this.gender = this.birthdate = this.email = this.Address = this.description = ""
                    this.dialog = false;
                })
                .catch(err => alert(err.message));
        },
        update() {
           
            window.console.log(this.studentId)
            let data = {
                firstname: this.firstname,
                lastname: this.lastname,
                middlename: this.middlename,
                gender: this.gender,
                birthdate: this.birthdate,
                email: this.email,
                Address: this.Address,
                description: this.description
            };
            updateStudent(data, this.studentId)
                .then(data => {
                    confirm('Are you sure you want to Update this Employee ?') && this.$swal("Updated", "employee updated", 'success') && this.$emit("updateStudent", data.account);
                    this.firstname = this.lastname = this.middlename = this.gender = this.birthdate = this.email = this.Address = this.description = ""
                    this.dialog = false;
                    getStudents()
                        .then(data => this.students = data.data)
                        .catch((err => alert(err)));

                })
        },

        formActions() {
            if (this.add == true) {
                this.create()
            } else {
                this.update()
            }
        }
    },

}
</script>

<style>
</style>

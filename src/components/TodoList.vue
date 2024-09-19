<template>
  <v-container>
    <!-- Clock -->
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card class="pa-4 d-flex align-center justify-center">
          <h3>{{ currentTime }}</h3>
        </v-card>
      </v-col>
    </v-row>
  
      <!-- To-Do List -->
      <v-row justify="center">
        <v-col cols="12" md="6">
          <v-card class="pa-4">
            <v-text-field
              v-model="newTask"
              label="Add a new task"
              @keyup.enter="addTask"
            ></v-text-field>
  
            <v-btn @click="addTask" color="primary">Add Task</v-btn>
  
            <v-list>
              <v-list-item
                v-for="(task, index) in tasks"
                :key="index"
                class="my-2"
              >
                <v-list-item-content>
                  <v-text-field
                    v-if="task.isEditing"
                    v-model="task.text"
                    label="Edit Task"
                    @keyup.enter="saveTask(index)"
                  ></v-text-field>
                  <v-list-item-title v-else>
                    {{ task.text }} <br>
                    <small>Added: {{ task.addedTime }} | Last edited: {{ task.editedTime || 'N/A' }}</small>
                  </v-list-item-title>
                </v-list-item-content>
  
                <v-list-item-action>
                  <v-btn icon @click="editTask(index)">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                  <v-btn icon @click="deleteTask(index)">
                    <v-icon color="red">mdi-delete</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
  
      <!-- Schedule Button -->
      <v-row justify="center">
        <v-col cols="12" md="6" class="text-center">
          <v-btn @click="openSchedule" color="info">
            Show Schedule
          </v-btn>
        </v-col>
      </v-row>
  
      <!-- Half-Screen Modal with Full-Size Image -->
      <v-dialog
        v-model="showSchedule"
        hide-overlay
        persistent
        transition="dialog-bottom-transition"
        :max-width="'80vw'"
        :max-height="'50vh'"
      >
        <v-card>
          <v-toolbar dark color="primary">
            <v-btn icon @click="showSchedule = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Schedule</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
  
          <v-card-text class="d-flex justify-center">
            <v-img :src="scheduleImage" contain max-width="100%" max-height="100%"></v-img>
          </v-card-text>
        </v-card>
      </v-dialog>
  
      <!-- Background Blur -->
      <div v-if="showSchedule" class="blur-background"></div>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        newTask: '',
        tasks: [],
        currentTime: new Date().toLocaleTimeString(),
        showSchedule: false,
        scheduleImage: require('@/assets/myschedule.png'), // Replace with your image path
      };
    },
    created() {
      this.startClock();
    },
    methods: {
      startClock() {
        setInterval(() => {
          this.currentTime = new Date().toLocaleTimeString();
        }, 1000);
      },
      addTask() {
        if (this.newTask) {
          const currentTime = new Date().toLocaleTimeString();
          this.tasks.push({
            text: this.newTask,
            isEditing: false,
            addedTime: currentTime,
            editedTime: null,
          });
          this.newTask = '';
        }
      },
      editTask(index) {
        this.tasks[index].isEditing = true;
      },
      saveTask(index) {
        const currentTime = new Date().toLocaleTimeString();
        this.tasks[index].isEditing = false;
        this.tasks[index].editedTime = currentTime;
      },
      deleteTask(index) {
        this.tasks.splice(index, 1);
      },
      openSchedule() {
        // Delay the modal by 1 second
        setTimeout(() => {
          this.showSchedule = true;
        }, 1000);
      },
    },
  };
  </script>
  
  <style scoped>
  .pa-4 {
    padding: 16px;
  }
  
  /* Animation for modal appearance */
  .v-dialog__content {
    transition: all 1s ease;
  }
  
  /* Background blur effect when the schedule is open */
  .blur-background {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(28, 26, 68, 0.5);
    backdrop-filter: blur(8px);
    z-index: 1;
  }
  </style>
import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
// import EditProject from '../views/EditProject.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  // {
  //   path: '/editProject/:id',
  //   name: 'EditProject',
  //   component: EditProject,
  //   props:true
  // }
]

const router = new VueRouter({
  routes
})

export default router

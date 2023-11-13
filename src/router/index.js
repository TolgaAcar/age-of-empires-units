import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import UnitsView from "../views/UnitsView.vue";
import UnitDetailsView from "../views/UnitDetailsView.vue";
import NotFoundView from "../views/NotFoundView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView
    },
    {
      path: "/units",
      name: "units",
      component: UnitsView
    },
    {
      path: "/units/:id",
      name: "UnitDetails",
      component: UnitDetailsView
    },
    {
      path: "/:pathMatch(.*)*",
      component: NotFoundView
    }
  ]
});

export default router;

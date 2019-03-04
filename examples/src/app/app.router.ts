import VueRouter from 'vue-router';
import { Vue } from 'vue-property-decorator';

Vue.use(VueRouter);

export function router() {
    return new VueRouter({
        mode: 'history',
        routes: [
            {
              path: '/',
              component: () => import('./Cities.vue'),
            }
        ]
    });
}

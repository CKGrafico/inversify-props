import { Vue } from 'vue-property-decorator';

import { router } from './app.router';
import { containerBuilder } from './app.container';
import App from './App.vue';

export class AppModule {
    constructor() {
        containerBuilder();

        this.bootstrap();
    }

    private async bootstrap(): Promise<Vue> {
        let options = {
            el: '.main',
            router: router(),
            render: create => create(App)
        };

        return new Vue(options);
    }
}

new AppModule();

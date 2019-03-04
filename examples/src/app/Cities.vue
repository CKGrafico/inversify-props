<template>
  <section class="cities container-medium">
    {{result}}
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { IService1, IService2 } from '~/shared';
import { Inject } from '../../../src';

@Component
export default class extends Vue {
  @Inject() service1: IService1;
  @Inject() service2: IService2;

  public result = 'Loading services...';

  public created(): void {
    const result1 = this.service1.method1();
    const result2 = this.service2.method2();

    this.result = `${result1} ${result2}`;
  }
}
</script>

import { LitElement, html, property, customElement } from 'lit-element';
import { Inject, cid } from '../../../../../src';
import { IExampleService } from '~/services/iexample-service';
import { myHelper } from '~/helpers/example-helper';
import { ISubexampleService } from '~/services/isubexample-service';

@customElement('example-element')
export class ExampleElement extends LitElement {
  @Inject() exampleService: IExampleService;
  @Inject() subexampleService: ISubexampleService;
  @property() name = 'World |';

  private onClick() {
    this.name = this.exampleService.transform(this.name);
    console.log('subexample', this.subexampleService.transform(this.name));
    myHelper(this.name);
  }

  render() {
    return html`<p @click="${this.onClick}">Hello, ${this.name}</p>`;
  }
}

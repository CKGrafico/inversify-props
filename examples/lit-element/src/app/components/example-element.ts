import { LitElement, html, property, customElement } from 'lit-element';
import { Inject } from '../../../../../src';
import { IExampleService } from '~/services/iexample-service';

@customElement('example-element')
export class ExampleElement extends LitElement {
  @Inject() exampleService: IExampleService;
  @property() name = 'World |';

  private onClick() {
    this.name = this.exampleService.transform(this.name);
  }

  render() {
    return html`<p @click="${this.onClick}">Hello, ${this.name}</p>`;
  }
}

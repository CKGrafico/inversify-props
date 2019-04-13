import { LitElement, html, property, customElement } from 'lit-element';
import { ExampleService } from '~/services/example-service';

const exampleService = new ExampleService();
@customElement('example-element')
export class SimpleGreeting extends LitElement {
  @property() name = 'World |';

  private onClick() {
    this.name = exampleService.transform(this.name);
  }

  render() {
    return html`<p @click="${this.onClick}">Hello, ${this.name}</p>`;
  }
}

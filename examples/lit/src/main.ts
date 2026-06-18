import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { inject } from 'inversify-props';
import type { IGreeterService } from './services';
import { buildContainer } from './services/container';

buildContainer();

@customElement('greeter-app')
export class GreeterApp extends LitElement {
  // id inferred from the property name -> "GreeterService".
  // GreeterService itself @inject()s NameService — see src/services.
  @inject() private greeterService!: IGreeterService;

  @state() private message = '';

  render() {
    return html`
      <main>
        <h1>inversify-props + Lit 3</h1>
        <p>This component injects a service with <code>@inject()</code>; that service injects another.</p>
        <button @click=${() => (this.message = this.greeterService.greet())}>greet()</button>
        ${this.message ? html`<p>Result: ${this.message}</p>` : ''}
      </main>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'greeter-app': GreeterApp;
  }
}

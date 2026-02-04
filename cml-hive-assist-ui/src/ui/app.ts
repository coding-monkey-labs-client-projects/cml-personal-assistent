import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { Tab } from "./types.ts";
import { loadSettings, saveSettings, type UiSettings } from "./storage.ts";

/**
 * CML Hive Assist UI - Main Application Component
 *
 * This is the root component for the CML Hive Assist web interface.
 * It manages navigation, theme, and gateway connection state.
 */
@customElement("hive-assist-app")
export class HiveAssistApp extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      height: 100%;
      width: 100%;
    }

    .app-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 20px;
      background: var(--color-bg-secondary);
      border-bottom: 1px solid var(--color-border);
    }

    .app-logo {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .app-logo h1 {
      font-size: 18px;
      font-weight: 600;
      color: var(--color-text-primary);
    }

    .app-nav {
      display: flex;
      gap: 4px;
    }

    .nav-tab {
      padding: 8px 16px;
      border-radius: var(--radius-md);
      color: var(--color-text-secondary);
      background: transparent;
      transition: all var(--transition-fast);
    }

    .nav-tab:hover {
      background: var(--color-bg-tertiary);
      color: var(--color-text-primary);
    }

    .nav-tab.active {
      background: var(--color-accent);
      color: white;
    }

    .app-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .status-indicator {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 6px 12px;
      border-radius: var(--radius-md);
      font-size: 12px;
      background: var(--color-bg-tertiary);
    }

    .status-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
    }

    .status-dot.connected {
      background: var(--color-success);
    }

    .status-dot.disconnected {
      background: var(--color-error);
    }

    .status-dot.connecting {
      background: var(--color-warning);
      animation: pulse 1.5s infinite;
    }

    @keyframes pulse {
      0%,
      100% {
        opacity: 1;
      }
      50% {
        opacity: 0.5;
      }
    }

    .theme-toggle {
      padding: 8px;
      border-radius: var(--radius-md);
      color: var(--color-text-secondary);
      background: transparent;
      transition: all var(--transition-fast);
    }

    .theme-toggle:hover {
      background: var(--color-bg-tertiary);
      color: var(--color-text-primary);
    }

    .app-main {
      flex: 1;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }

    .content-area {
      flex: 1;
      overflow: auto;
      padding: 20px;
    }

    .welcome-message {
      max-width: 600px;
      margin: 40px auto;
      text-align: center;
    }

    .welcome-message h2 {
      font-size: 24px;
      font-weight: 600;
      margin-bottom: 12px;
      color: var(--color-text-primary);
    }

    .welcome-message p {
      color: var(--color-text-secondary);
      margin-bottom: 24px;
    }

    .connect-form {
      display: flex;
      flex-direction: column;
      gap: 16px;
      max-width: 400px;
      margin: 0 auto;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .form-group label {
      font-size: 13px;
      font-weight: 500;
      color: var(--color-text-secondary);
    }

    .form-group input {
      padding: 10px 14px;
      border-radius: var(--radius-md);
      border: 1px solid var(--color-border);
      background: var(--color-bg-tertiary);
      color: var(--color-text-primary);
      transition: border-color var(--transition-fast);
    }

    .form-group input:focus {
      border-color: var(--color-accent);
      outline: none;
    }

    .btn-primary {
      padding: 12px 24px;
      border-radius: var(--radius-md);
      background: var(--color-accent);
      color: white;
      font-weight: 500;
      transition: background var(--transition-fast);
    }

    .btn-primary:hover {
      background: var(--color-accent-hover);
    }

    .btn-primary:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .error-message {
      padding: 12px 16px;
      border-radius: var(--radius-md);
      background: rgba(239, 68, 68, 0.1);
      border: 1px solid var(--color-error);
      color: var(--color-error);
      font-size: 13px;
    }

    .channels-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 16px;
      padding: 20px 0;
    }

    .channel-card {
      padding: 20px;
      background: var(--color-bg-secondary);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      transition: all var(--transition-fast);
    }

    .channel-card:hover {
      border-color: var(--color-accent);
      box-shadow: var(--shadow-md);
    }

    .channel-card h3 {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 8px;
    }

    .channel-card p {
      font-size: 13px;
      color: var(--color-text-secondary);
    }

    .channel-status {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-top: 12px;
      font-size: 12px;
    }
  `;

  @state() settings: UiSettings = loadSettings();
  @state() tab: Tab = "chat";
  @state() connected = false;
  @state() connecting = false;
  @state() gatewayUrl = this.settings.gatewayUrl ?? "";
  @state() lastError: string | null = null;
  @state() theme: "light" | "dark" | "system" = this.settings.theme ?? "system";

  private tabs: { id: Tab; label: string }[] = [
    { id: "chat", label: "Chat" },
    { id: "channels", label: "Channels" },
    { id: "agents", label: "Agents" },
    { id: "config", label: "Config" },
    { id: "logs", label: "Logs" },
  ];

  setTab(nextTab: Tab) {
    this.tab = nextTab;
  }

  setTheme(nextTheme: "light" | "dark" | "system") {
    this.theme = nextTheme;
    this.settings = { ...this.settings, theme: nextTheme };
    saveSettings(this.settings);
  }

  async handleConnect() {
    if (!this.gatewayUrl.trim()) {
      this.lastError = "Please enter a gateway URL";
      return;
    }

    this.connecting = true;
    this.lastError = null;

    try {
      // Simulate connection for now
      await new Promise((resolve) => setTimeout(resolve, 1000));
      this.connected = true;
      this.settings = { ...this.settings, gatewayUrl: this.gatewayUrl };
      saveSettings(this.settings);
    } catch (err) {
      this.lastError = `Connection failed: ${String(err)}`;
    } finally {
      this.connecting = false;
    }
  }

  handleGatewayUrlChange(e: Event) {
    const input = e.target as HTMLInputElement;
    this.gatewayUrl = input.value;
  }

  renderNavigation() {
    return html`
      <nav class="app-nav">
        ${this.tabs.map(
          (t) => html`
            <button
              class="nav-tab ${this.tab === t.id ? "active" : ""}"
              @click=${() => this.setTab(t.id)}
            >
              ${t.label}
            </button>
          `,
        )}
      </nav>
    `;
  }

  renderHeader() {
    return html`
      <header class="app-header">
        <div class="app-logo">
          <h1>CML Hive Assist</h1>
        </div>
        ${this.connected ? this.renderNavigation() : null}
        <div class="app-actions">
          <div class="status-indicator">
            <span
              class="status-dot ${
                this.connected ? "connected" : this.connecting ? "connecting" : "disconnected"
              }"
            ></span>
            <span>${this.connected ? "Connected" : this.connecting ? "Connecting..." : "Disconnected"}</span>
          </div>
          <button
            class="theme-toggle"
            @click=${() => this.setTheme(this.theme === "dark" ? "light" : "dark")}
            title="Toggle theme"
          >
            ${this.theme === "dark" ? "Light" : "Dark"}
          </button>
        </div>
      </header>
    `;
  }

  renderWelcome() {
    return html`
      <div class="welcome-message">
        <h2>Welcome to CML Hive Assist</h2>
        <p>Connect to your gateway to get started with chat, channels, and more.</p>

        <form class="connect-form" @submit=${(e: Event) => {
          e.preventDefault();
          this.handleConnect();
        }}>
          <div class="form-group">
            <label for="gateway-url">Gateway URL</label>
            <input
              id="gateway-url"
              type="text"
              placeholder="http://localhost:18789"
              .value=${this.gatewayUrl}
              @input=${this.handleGatewayUrlChange}
            />
          </div>

          ${this.lastError ? html`<div class="error-message">${this.lastError}</div>` : null}

          <button
            type="submit"
            class="btn-primary"
            ?disabled=${this.connecting}
          >
            ${this.connecting ? "Connecting..." : "Connect"}
          </button>
        </form>
      </div>
    `;
  }

  renderChat() {
    return html`
      <div class="content-area">
        <h2>Chat</h2>
        <p>Chat interface coming soon...</p>
      </div>
    `;
  }

  renderChannels() {
    return html`
      <div class="content-area">
        <h2>Channels</h2>
        <p>Manage your messaging channels</p>

        <div class="channels-grid">
          <div class="channel-card">
            <h3>WhatsApp</h3>
            <p>Connect via WhatsApp Web QR code</p>
            <div class="channel-status">
              <span class="status-dot disconnected"></span>
              <span>Not configured</span>
            </div>
          </div>

          <div class="channel-card">
            <h3>Telegram</h3>
            <p>Connect via Telegram Bot API</p>
            <div class="channel-status">
              <span class="status-dot disconnected"></span>
              <span>Not configured</span>
            </div>
          </div>

          <div class="channel-card">
            <h3>Slack</h3>
            <p>Connect via Slack Socket Mode</p>
            <div class="channel-status">
              <span class="status-dot disconnected"></span>
              <span>Not configured</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  renderAgents() {
    return html`
      <div class="content-area">
        <h2>Agents</h2>
        <p>Agent management coming soon...</p>
      </div>
    `;
  }

  renderConfig() {
    return html`
      <div class="content-area">
        <h2>Configuration</h2>
        <p>Configuration editor coming soon...</p>
      </div>
    `;
  }

  renderLogs() {
    return html`
      <div class="content-area">
        <h2>Logs</h2>
        <p>Log viewer coming soon...</p>
      </div>
    `;
  }

  renderContent() {
    if (!this.connected) {
      return this.renderWelcome();
    }

    switch (this.tab) {
      case "chat":
        return this.renderChat();
      case "channels":
        return this.renderChannels();
      case "agents":
        return this.renderAgents();
      case "config":
        return this.renderConfig();
      case "logs":
        return this.renderLogs();
      default:
        return this.renderChat();
    }
  }

  render() {
    return html`
      ${this.renderHeader()}
      <main class="app-main">
        ${this.renderContent()}
      </main>
    `;
  }
}

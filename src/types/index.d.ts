export {};

declare global {
  interface Window {
    goTo(pageName: string): void;
  }
}

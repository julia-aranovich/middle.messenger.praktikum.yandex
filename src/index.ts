import renderPage from "./utils/router";

window.renderPage = renderPage;

window.addEventListener("DOMContentLoaded", (): void => {
  renderPage();
});

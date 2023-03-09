declare module "*.hbs" {
  import {TemplateDelegate} from "handlebars";

  declare const template: TemplateDelegate;
  export default template;
}

declare module "*.pcss";
declare module "*.png";
declare module "*.svg";

declare module "handlebars/dist/handlebars.runtime"
declare module "uuid"

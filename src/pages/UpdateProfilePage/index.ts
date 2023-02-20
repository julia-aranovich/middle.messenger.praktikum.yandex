import Block from "../../utils/Block";

import Button from "../../components/Button";
import Field from "../../components/Field";
import Form from "../../components/Form";
import Avatar, {AVATAR_SIZES} from "../../components/Avatar";

import {PROFILE_PAGE} from "../../utils/routes";

import template from "./update_profile_page.hbs";
import PAGE_FIELDS, {Field as FieldProps} from "../../utils/fields";

export default class UpdateProfilePage extends Block {
  init() {
    this.children.avatar = new Avatar({
      title: this.props.first_name,
      size: AVATAR_SIZES.LARGE
    });
    this.children.form = new Form({
      events: {
        submit: (e: Event) => {
          e.preventDefault();
          (<Form> this.children.form).logData();
          if ((<Form> this.children.form).isValid()) {
            window.renderPage(PROFILE_PAGE);
          }
        }
      },
      children: {
        submitButton: new Button({
          text: "Сохранить"
        }),
        fields: PAGE_FIELDS[PROFILE_PAGE].map((field: FieldProps): Block => new Field({
          ...field,
          value: this.props[field.name]
        }))
      }
    });
  }

  render() {
    return this.compile(template, {});
  }
}

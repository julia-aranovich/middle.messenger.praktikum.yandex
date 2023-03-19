import Block from "../../utils/Block";
import Form from "../Form";
import Field from "../Field";

import template from "./add_member_form.hbs";
import "./add_member_form.pcss";

import withStore from "../../hocs/withStore";
import {State} from "../../utils/storage";
import withControllers from "../../hocs/withControllers";
import UserController from "../../controllers/UserController";

import ChatMember from "../ChatMember";
import {User} from "../../api/AuthAPI";

interface AddMemberFormProps {
  users: typeof UserController,
  userSearchResults?: User[],
  selectedChatUsers?: User[]
}

class AddMemberForm extends Block<AddMemberFormProps> {
  init() {
    this.children.searchForm = new Form({
      fields: [new Field({
        name: "search-member",
        placeholder: "Введите логин и нажмите Enter",
        label: "Добавить участника:"
      })],
      events: {
        submit: async (e: Event) => {
          e.preventDefault();
          await this.props.users.findUser(
            ((this.children.searchForm as Block).children.fields as Field[])[0].getValue()
          );
        }
      }
    });

    this.updateResults();
  }

  updateResults(newProps?: AddMemberFormProps) {
    const props = newProps || this.props;
    const results = props.userSearchResults || [];
    this.children.results = results.map(
      (user: User) => new ChatMember({
        user,
        addMode: true,
        alreadyAdded: props.selectedChatUsers!.find(({id}) => id === user.id)
      })
    );
  }

  componentDidUpdate(_oldProps: AddMemberFormProps, _newProps: AddMemberFormProps) {
    this.updateResults(_newProps);
    return true;
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default withStore((state: State) => ({
  userSearchResults: state.userSearchResults,
  selectedChatUsers: state.selectedChatUsers
}))(
  withControllers(AddMemberForm, {users: UserController})
);

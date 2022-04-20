import { BaseComponent } from 'https://symbiotejs.github.io/examples/submodules/symbiote/core/BaseComponent.js';

class ListItem extends BaseComponent {

  init$ = {
    text: '',
    className: 'active',
    keydown: (event) => {
      if (event.code === 'Enter') {
        this.$['*addItem']();
        return false;
      }
    },
    click: (event) => {
      this.$.className = event.target.checked ? 'complete' : 'active';
    },
    remove: () => {
      this.remove();
    },
  };

  get checked() {
    return this.ref.checkbox.checked;
  }

  initCallback() {
    this.ref.edit.focus();
  }
}

ListItem.template = /* html */ `
  <input ref="checkbox" set="onclick: click" type="checkbox">
  <div ref="edit" contenteditable="true" set="textContent: text; @class: className; onkeydown: keydown"></div>
`;
ListItem.reg('list-item');



class MyApp extends BaseComponent {

  get items() {
    return [...this.ref.wrapper.children];
  }

  init$ = {
    '*addItem': () => {
      this.ref.wrapper.appendChild(new ListItem());
    },

    removeChecked: () => {
      this.items.forEach((item) => {
        if (item.checked) {
          item.remove();
        }
      });

      if (!this.items.length) {
        this.$['*addItem']();
      }
    }
  }

  initCallback() {
    this.$['*addItem']();
  }
}

MyApp.template = /*html*/ `
  <h2>TODO</h2>
  <div ref="wrapper"></div>
  <div class="toolbar">
    <button set="onclick: removeChecked">Delete Completed</button>
  </div>
`;
MyApp.reg('my-app');
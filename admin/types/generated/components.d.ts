import type { Schema, Attribute } from '@strapi/strapi';

export interface UiAkkordeon extends Schema.Component {
  collectionName: 'components_ui_akkordeon';
  info: {
    displayName: '\u0410\u043A\u043A\u043E\u0440\u0434\u0435\u043E\u043D';
    icon: 'bulletList';
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
    content: Attribute.Text & Attribute.Required;
  };
}

export interface UiButton extends Schema.Component {
  collectionName: 'components_ui_buttons';
  info: {
    displayName: '\u041A\u043D\u043E\u043F\u043A\u0430';
    icon: 'cursor';
    description: '';
  };
  attributes: {
    text: Attribute.String;
    href: Attribute.String & Attribute.Required;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'ui.akkordeon': UiAkkordeon;
      'ui.button': UiButton;
    }
  }
}

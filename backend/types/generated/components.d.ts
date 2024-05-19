import type { Schema, Attribute } from '@strapi/strapi';

export interface KicksProductqty extends Schema.Component {
  collectionName: 'components_kicks_productqties';
  info: {
    displayName: 'productqty';
    icon: 'shoppingCart';
    description: '';
  };
  attributes: {
    productid: Attribute.Integer;
    qty: Attribute.Integer;
    size: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'kicks.productqty': KicksProductqty;
    }
  }
}

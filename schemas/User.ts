import { list } from '@keystone-next/keystone/schema';
import { text, password, relationship, select, checkbox } from '@keystone-next/fields';
import { permissions, rules } from '../access';

export const User = list({
  access: {
    create: () => true,
    read: rules.canManageUsers,
    update: rules.canManageUsers,
    // only people with the permission can delete themselves!
    // You can't delete yourself
    delete: permissions.canManageUsers,
  },
  ui: {
    // hide the backend UI from regular users
    hideCreate: args => !permissions.canManageUsers(args),
    hideDelete: args => !permissions.canManageUsers(args),
  },
  fields: {
    name: text({ isRequired: true }),
    firstname: text({ isRequired: false }),
    email: text({ isRequired: true, isUnique: true }),
    password: password(),
    //isAdmin: checkbox(),
    phone: text({ isRequired: false }),
    rotis: relationship({ ref: 'Roti.user', many: true }),
    language: select({
      options: [
        { label: 'Français', value: 'fr' },
        { label: 'English', value: 'en-gb' },
      ],
      defaultValue: 'en-gb',
      ui: {
        displayMode: 'segmented-control',
        createView: { fieldMode: 'hidden' },
      },
    }),
    cart: relationship({
      ref: 'CartItem.user',
      many: true,
      ui: {
        createView: { fieldMode: 'hidden' },
        itemView: { fieldMode: 'read' },
      },
    }),
    orders: relationship({ ref: 'Order.user', many: true }),
    role: relationship({
      ref: 'Role.assignedTo',
      access: {
        create: permissions.canManageUsers,
        update: permissions.canManageUsers,
      },
    }),
    products: relationship({
      ref: 'Product.user',
      many: true,
    }),
  },
});

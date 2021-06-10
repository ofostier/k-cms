import { list } from '@keystone-next/keystone/schema';
import { text, password, relationship, select } from '@keystone-next/fields';

export const User = list({
  // access:
  // ui
  fields: {
    name: text({ isRequired: true }),
    firstname: text({ isRequired: false }),
    email: text({ isRequired: true, isUnique: true }),
    password: password(),
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
    // TODO, add roles, cart and orders
  },
});

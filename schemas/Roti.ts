import { integer, relationship, select, text, timestamp, virtual } from '@keystone-next/fields';
//import { atTracking } from '@keystone-next/keystone';
import { atTracking } from '@keystonejs-contrib-next/list-plugins';
import { list } from '@keystone-next/keystone/schema';
//import { ProductImage } from './ProductImage';

const withAtTracking = atTracking({});

// TODO: [RR-1] Add byTracking KEYSTONE Plugin
// Capacity to automated CreatedBy and UpdateBy

export const Roti = list(
//  withAtTracking(
    {
  // access:
  fields: {
    subject: text({ isRequired: true }),
    description: text({
      ui: {
        displayMode: 'textarea',
      },
    }),
    shorturl:text({ isRequired: true }),
    datecreated: timestamp({
      //format: 'dd/MM/yyyy HH:mm O',
      //yearPickerType: 'auto',
      defaultValue: () => (new Date().getTime()),
    }),
    status: select({
      options: [
        { label: 'Draft', value: 'DRAFT' },
        { label: 'Availlable', value: 'AVAILABLE' },
        { label: 'Unavailable', value: 'UNAVAILABLE ' },
        { label: 'Closed', value: 'CLOSED' },
      ],
      defaultValue: 'AVAILABLE',
      ui: {
        displayMode: 'segmented-control',
        createView: { fieldMode: 'hidden' },
      },
    }),
    user: relationship({
      ref: 'User.rotis',
      defaultValue: ({ context }) => ({
        connect: { id: context.session.itemId },
      }),
    }),
    votes: relationship({
      ref: 'Vote.rotis',
      many: true,
    }),
    tags: text({ isRequired: false }),
    // tags: virtual({
    //     resolver: (item) => `TOTO`,
    //     //graphQLReturnType: 'String',
    // }),
  },
  // plugins: [
  //   atTracking(),
  // ]
}
//)
);

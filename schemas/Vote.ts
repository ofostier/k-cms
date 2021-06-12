import { integer, relationship, select, text, timestamp } from '@keystone-next/fields';
//import { atTracking } from '@keystone-next/keystone';
import { atTracking } from '@keystonejs-contrib-next/list-plugins';
import { list } from '@keystone-next/keystone/schema';
//import { ProductImage } from './ProductImage';

const withAtTracking = atTracking({});

// TODO: [RR-1] Add byTracking KEYSTONE Plugin
// Capacity to automated CreatedBy and UpdateBy

export const Vote = list(
  //withAtTracking(
    {
  // access:
  fields: {
    name: text({ isRequired: false }),
    email: text({ isRequired: false }),
    note: select({
      options: [
        { value: '0', label: '0' },
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' },
        { value: '5', label: '5' },
      ],
      defaultValue: 1,
      //dataType: 'integer',
      // ui: {
      //   displayMode: 'segmented-control',
      //   //createView: { fieldMode: 'hidden' },
      // },
    }),
    mood: select({
      options: [
        { value: '0', label: '0' },
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' },
        { value: '5', label: '5' },
      ],
      defaultValue: 1,
      //dataType: 'integer',
    }),
    comment: text({
      ui: {
        displayMode: 'textarea',
      },
    }),
    rotis: relationship({
      ref: 'Roti.votes',
      many: true,
      //isIndexed: true,
    })
  },
  // plugins: [
  //   atTracking(),
  // ]
}
//)
);

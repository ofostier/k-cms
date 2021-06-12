import { createAuth } from '@keystone-next/auth';
import { config, createSchema } from '@keystone-next/keystone/schema';
import { withItemData, statelessSessions } from '@keystone-next/keystone/session';
import { permissionsList } from './schemas/fields';
import { Role } from './schemas/Role';
import { OrderItem } from './schemas/OrderItem';
import { Order } from './schemas/Order';
import { CartItem } from './schemas/CartItem';
import { ProductImage } from './schemas/ProductImage';
import { Product } from './schemas/Product';
import { User } from './schemas/User';
import { Roti } from './schemas/Roti';
import { Vote } from './schemas/Vote';
import 'dotenv/config';
import { insertSeedData } from './seed-data';
import { sendPasswordResetEmail } from './lib/mail';
import { extendGraphqlSchema } from './mutations';

const databaseURL = process.env.DATABASE_URL || 'file:./keystone.db';

//console.log(process.env);

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360, // How long they stay signed in?
  secret: process.env.COOKIE_SECRET || 'this secret should only be used in testing',
  //sameSite: 'none',
  //secure: false,

};

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  initFirstItem: {
    fields: ['name', 'email', 'password'],
    //itemData: { isAdmin: true },
    skipKeystoneWelcome: true,
    // TODO: Add in inital roles here
  },
  passwordResetLink: {
    async sendToken(args) {
      // send the email
      await sendPasswordResetEmail(args.token, args.identity);
    },
  },
});

export default withAuth(
  config({
    // @ts-ignore
    server: {
      cors: {
        origin: true, //[process.env.FRONTEND_URL!],
        credentials: true,
      },
    },
    db: process.env.DATABASE_URL
      ? {
          provider: 'sqlite',
          url: 'file:./app.db',
          //provider: 'postgresql',
          //url: process.env.DATABASE_URL,
          //console.log('BOUM !!Connecting to the database!');
          async onConnect(context) {
            console.log('Connected to the database!');
            if (process.argv.includes('--seed-data')) {
              await insertSeedData(context);
            }
          },
        }
      : {
          provider: 'sqlite',
          url: databaseURL,
          async onConnect(context) {
            console.log('Connected to the database!');
            if (process.argv.includes('--seed-data')) {
              await insertSeedData(context);
            }
          },
        },
    lists: createSchema({
      // Schema items go in here
      User,
      Product,
      ProductImage,
      CartItem,
      OrderItem,
      Order,
      Role,
      Roti,
      Vote,
    }),
    extendGraphqlSchema,
    ui: {
      // Show the UI only for poeple who pass this test
      isAccessAllowed: ({ session }) =>
        // console.log(session);
        !!session?.data,
    },
    session: withItemData(statelessSessions(sessionConfig), {
      // GraphQL Query
      //User: `id name email role { ${permissionsList.join(' ')} }`,
      User: `id name email`,
    }),
  })
);

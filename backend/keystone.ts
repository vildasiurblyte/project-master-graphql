import { ProductImage } from "./schemas/ProductImage";
import { Product } from "./schemas/Product";
import "dotenv/config";
import { config, createSchema } from "@keystone-next/keystone/schema";
import { User } from "./schemas/User";
import { createAuth } from "@keystone-next/auth";
import {
  withItemData,
  statelessSessions,
} from "@keystone-next/keystone/session";
import { insertSeedData } from "./seed-data";

const databaseURL =
  process.env.DATABASE_URL || "mongodb://localhost/keystone-sick-fits-tutorial";

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360, // how long should they stay logged in
  secret: process.env.COOKIE_SECRET,
};

const { withAuth } = createAuth({
  listKey: "User",
  identityField: "email",
  secretField: "password",
  initFirstItem: {
    fields: ["name", "email", "password"],
    // add initial roles here
  },
});

export default withAuth({
  server: {
    cors: {
      origin: [process.env.FRONTEND_URL],
      credentials: true,
    },
  },
  db: {
    adapter: "mongoose",
    url: databaseURL,
    async onConnect(keystone) {
      if (process.argv.includes("--seed-data")) await insertSeedData(keystone);
    },
  },
  lists: createSchema({
    User,
    Product,
    ProductImage,
    // Schema items go in here
  }),
  ui: {
    // show the UI only for people who pass this test
    isAccessAllowed: ({ session }) => {
      return !!session?.data;
    },
  },
  session: withItemData(statelessSessions(sessionConfig), {
    User: "id",
  }),
});

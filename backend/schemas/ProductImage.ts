import "dotenv/config";
import { relationship, text } from "@keystone-next/fields";
import { list } from "@keystone-next/keystone/schema";
import { cloudinaryImage } from "@keystone-next/cloudinary";

export const cloudinary = {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  apiKey: process.env.CLOUDINARY_KEY,
  apiSecret: process.env.CLOUDINARY_SECRET,
  folder: "sickfits", // in which forder images end up in Cloudinary
};

export const ProductImage = list({
  fields: {
    image: cloudinaryImage({
      cloudinary,
      label: "Source",
    }),
    altText: text(),
    product: relationship({ ref: "Product.photo" }),
  },
  ui: {
    listView: {
      initialColumns: ["image", "altText", "product"],
    },
  },
});
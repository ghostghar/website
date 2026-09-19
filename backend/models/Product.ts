import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProduct extends Document {
  id: string;
  name: string;
  cat: string;
  catSlug: string;
  newPrice: string;
  oldPrice?: string;
  tag?: string;
  sizes: string;
  stock: number;
  inStock: boolean;
  image?: string;
  description?: string;
  isFeatured?: boolean;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    cat: { type: String, required: true },
    catSlug: { type: String, required: true },
    newPrice: { type: String, required: true },
    oldPrice: { type: String, default: "" },
    tag: { type: String, default: "" },
    sizes: { type: String, default: "500g, 1kg, 2kg" },
    stock: { type: Number, default: 10 },
    inStock: { type: Boolean, default: true },
    image: { type: String, default: "" },
    description: { type: String, default: "" },
    isFeatured: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (_doc, ret: any) {
        ret.id = ret._id ? ret._id.toString() : "";
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

export const ProductModel: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);

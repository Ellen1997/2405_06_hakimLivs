import mongoose from "mongoose";
import Product from "../models/Product.js";

describe("Product Model Test", () => {
  afterAll(async () => {
    // Remove all products from the database
    await Product.deleteMany({
      name: {
        $regex: "%%TEST%%",
      },
    });
    await mongoose.connection.close();
  });

  it("should create & save product successfully", async () => {
    const validProduct = new Product({
      name: "Test Product: %%TEST%%",
      price: 9.99,
      description: "Test Description",
      stock: 10,
    });
    const savedProduct = await validProduct.save();

    expect(savedProduct._id).toBeDefined();
    expect(savedProduct.name).toBe(validProduct.name);
    expect(savedProduct.price).toBe(validProduct.price);
    expect(savedProduct.stock).toBe(validProduct.stock);
  });

  it("should fail to save product without required fields", async () => {
    // TODO: Implement this and other tests
    const err = new Error("Test Error");
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });
});

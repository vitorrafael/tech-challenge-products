import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "chai";
import request from "supertest";
import app from "../../../../../server";
import Sinon from "sinon";
import SequelizeProductDataSource from "../../../../../external/SequelizeProductDataSource";
import ProductDTO from "../../../../../core/products/dto/ProductDTO";

Sinon.stub(SequelizeProductDataSource.prototype, "create").callsFake(
  (ProductDTO: ProductDTO) =>
    Promise.resolve({ id: Math.trunc(Math.random() * 100), ...ProductDTO }) as any
);

Given("I have a product with name {string} and category {string} and price {string}", function (name: string, category: string, price: string) {
  this.name = name;
  this.category = category;
  this.price = price;
});

When('I create the product', async function () {
  this.response = await request(app)
    .post("/products")
    .send({ name: this.name, category: this.category, price: this.price });
});

Then("should create product with name {string}", function (name: string) {
  let expectedResponse = { name: "Hamburguer", category: "Lanche", price: 10 }

  Object.entries(expectedResponse).forEach(([key, value]) => {
    expect(this.response.body[key]).to.be.equal(value);
  });
});

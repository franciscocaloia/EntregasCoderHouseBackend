const getRenderProductList = async () => {
  const resPartial = await fetch("../templates/partials/product.hbs");
  const productPartialTemplate = await resPartial.text();
  Handlebars.registerPartial("product", productPartialTemplate);
  const resList = await fetch("../templates/productList.hbs");
  const productListTemplate = await resList.text();
  return Handlebars.compile(productListTemplate);
};
const main = async () => {
  const renderProductList = await getRenderProductList();
  const products = await fetch("/api/products-test");
  console.log(products);
  document.querySelector("#productList").innerHTML = renderProductList({
    products: await products.json(),
  });
};
main();

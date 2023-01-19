const authorSchema = new normalizr.schema.Entity(
  "authors",
  {},
  { idAttribute: "email" }
);
const messageSchema = new normalizr.schema.Entity(
  "messages",
  {
    author: authorSchema,
  },
  { idAttribute: "_id" }
);
const messageArray = new normalizr.schema.Array(messageSchema);
const getFormProduct = () => {
  return {
    description: document.querySelector("#productDescription").value,
    name: document.querySelector("#productName").value,
    price: document.querySelector("#productPrice").value,
    code: document.querySelector("#productCode").value,
    img: document.querySelector("#productImg").value,
    stock: document.querySelector("#productStock").value,
  };
};
const getFormMessage = () => {
  const date = new Date();
  return {
    author: {
      email: document.querySelector("#messageEmail").value,
      name: document.querySelector("#messageName").value,
      lastName: document.querySelector("#messageLastName").value,
      alias: document.querySelector("#messageAlias").value,
      age: document.querySelector("#messageAge").value,
    },
    text: document.querySelector("#messageText").value,
    date: `[${date.getFullYear()}/${
      date.getMonth() + 1
    }/${date.getDay()}  ${date.getHours()}:${date.getMinutes()}]`,
  };
};
const getRenderProductList = async () => {
  const resPartial = await fetch("templates/partials/product.hbs");
  const productPartialTemplate = await resPartial.text();
  Handlebars.registerPartial("product", productPartialTemplate);
  const resList = await fetch("templates/productList.hbs");
  const productListTemplate = await resList.text();
  return Handlebars.compile(productListTemplate);
};

const getRenderMessageList = async () => {
  const resPartial = await fetch("templates/partials/message.hbs");
  const messagePartialTemplate = await resPartial.text();
  Handlebars.registerPartial("message", messagePartialTemplate);
  const resList = await fetch("templates/messageList.hbs");
  const messageListTemplate = await resList.text();
  return Handlebars.compile(messageListTemplate);
};

const startIO = async () => {
  const renderProductList = await getRenderProductList();
  const renderMessageList = await getRenderMessageList();
  const socket = io();
  document.querySelector("#newMessageButton").addEventListener("click", (e) => {
    e.preventDefault();
    console.log("enviando mensaje");
    socket.emit("newMessage", getFormMessage());
  });
  document.querySelector("#newProductButton").addEventListener("click", (e) => {
    e.preventDefault();
    console.log("enviando producto");
    socket.emit("newProduct", getFormProduct());
  });
  socket.on("productList", (products) => {
    console.log(products);
    document.querySelector("#productList").innerHTML = renderProductList({
      products,
    });
  });
  socket.on("messageList", (messagesNormalizr) => {
    console.log(messagesNormalizr);
    const messages = normalizr.denormalize(
      messagesNormalizr.result,
      messageArray,
      messagesNormalizr.entities
    );
    document.querySelector("#messageList").innerHTML = renderMessageList({
      messages,
    });
  });
};

startIO();

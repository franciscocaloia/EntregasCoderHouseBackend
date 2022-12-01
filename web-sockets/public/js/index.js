const getFormProduct = () => {
  return {
    name: document.querySelector("#name").value,
    price: document.querySelector("#price").value,
  };
};
const getFormMessage = () => {
  const date = new Date();
  return {
    name: document.querySelector("#messageName").value,
    content: document.querySelector("#messageContent").value,
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
    console.log("lista");
    document.querySelector("#productList").innerHTML = renderProductList({
      products,
    });
  });
  socket.on("messageList", (messages) => {
    console.log("lista");
    document.querySelector("#messageList").innerHTML = renderMessageList({
      messages,
    });
  });
};

startIO();

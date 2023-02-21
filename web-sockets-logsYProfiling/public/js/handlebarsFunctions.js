const getRenderError = async () => {
  const resError = await fetch("templates/error.hbs");
  const errorTemplate = await resError.text();
  return Handlebars.compile(errorTemplate);
};
const showError = async (error) => {
  const renderError = await getRenderError();
  document.querySelector("body").innerHTML = renderError(error);
  document.querySelector("#back__button").addEventListener("click", () => {
    window.location.reload();
  });
};

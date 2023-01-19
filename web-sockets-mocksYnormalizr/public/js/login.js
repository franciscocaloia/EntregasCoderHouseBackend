const getFormProduct = () => {
  return {
    name: document.querySelector("#userName").value,
  };
};

document.querySelector("#userForm").addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(getFormProduct());
  fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(getFormProduct()),
  });
});

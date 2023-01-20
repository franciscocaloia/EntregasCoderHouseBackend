const getFormProduct = () => {
  return {
    name: document.querySelector("#userName").value,
  };
};

document.querySelector("#userForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const res = await fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(getFormProduct()),
  });
  const data = await res.json();
  if (data.error) {
    return console.log(data.error);
  } else {
    window.open("/");
  }
});

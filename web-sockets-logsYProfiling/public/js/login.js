const getFormProduct = () => {
  return {
    username: document.querySelector("#username").value,
    password: document.querySelector("#password").value,
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
    showError({ error: data.error });
  } else {
    window.location = "/";
  }
});

fetch("https://www.google.com")
  .then(res => console.log("STATUS:", res.status))
  .catch(err => console.error("ERROR:", err));

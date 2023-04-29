const selects = document.querySelectorAll(".select")

selects.forEach(select => {
  const current = select.querySelector(".current")
  const options = select.querySelector(".options")

  current.addEventListener("click", () => options.classList.toggle("disabled"))
  options.addEventListener("click", (event) => {
    if (event.target.classList.contains("option")) {
      const option = event.target
      
      current.textContent = "";
      current.appendChild(option.cloneNode(true))

      options.classList.add("disabled")
    }
  })
})
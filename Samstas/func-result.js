export function addResultToDOM(result) {
    const newResult = document.createElement("div");
    newResult.textContent = result;
    results.appendChild(newResult);
  
    newResult.addEventListener("click", () => {
      results.removeChild(newResult);
    });
  }

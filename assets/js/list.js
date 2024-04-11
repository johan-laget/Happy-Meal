let ingredients = [];
function removeItem(itemName) {
  const items = JSON.parse(localStorage.getItem("shoppingList")) || {};
  if (items[itemName]) {
    delete items[itemName];
    localStorage.setItem("shoppingList", JSON.stringify(items));
    ingredients.pop(itemName);
    generateItem();
  } else {
    console.log(`${itemName} not found in the list.`);
  }
}

const listGroupe = document.querySelector(".list-group");
function createListItem(item, quantiter) {
  const li = document.createElement("li");
  li.className =
    "list-group-item d-flex justify-content-between align-items-center";
  li.innerHTML = `
  ${quantiter} ${item} <span><button
                        type="button" class="btn btn-outline-dark btn-sm" id="btn-remove" value="${item}"><i class="ri-close-line"></i></button></span>
  `;
  listGroupe.appendChild(li);
  li.querySelectorAll("#btn-remove").forEach((btn) => {
    btn.addEventListener("click", () => {
      removeItem(btn.getAttribute("value"));
    });
  });
}

function generateItem() {
  listGroupe.innerHTML = "";
  const items = JSON.parse(localStorage.getItem("shoppingList")) || {};
  for (const [key, value] of Object.entries(items)) {
    ingredients.push(`${key} ${value}`);
    createListItem(key, value);
  }
}

generateItem();

function createPdfWithIngredients(ingredients) {
  console.log("ok");
  let ingredientsText = ingredients
    .map((ingredient, index) => {
      let yPosition = 680 - index * 20;
      return `BT /F1 12 Tf 100 ${yPosition} Td (${ingredient}) Tj ET`;
    })
    .join("\n");

  const pdfTemplate = `
    %PDF-1.3
    1 0 obj
    << /Type /Catalog
       /Pages 2 0 R
    >>
    endobj
    2 0 obj
    << /Type /Pages
       /Kids [3 0 R]
       /Count 1
       /MediaBox [0 0 600 800]
    >>
    endobj
    3 0 obj
    <<  /Type /Page
        /Parent 2 0 R
        /Resources <<
        /Font <<
        /F1 <<
        /Type /Font
        /Subtype /Type1
        /BaseFont /Helvetica
        >>
        >>
        >>
        /Contents 4 0 R
    >>
    endobj
    4 0 obj
    << /Length ${ingredientsText.length + 20} >>
    stream
    ${ingredientsText}
    endstream
    endobj
    xref
    0 5
    0000000000 65535 f 
    0000000010 00000 n 
    0000000077 00000 n 
    0000000178 00000 n 
    0000000457 00000 n 
    trailer
    <<  /Root 1 0 R
        /Size 5
    >>
    startxref
    596
    %%EOF
    `;

  // Générer le Blob PDF
  const blob = new Blob([pdfTemplate], { type: "application/pdf" });

  // Créer et cliquer sur le lien pour télécharger
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = "liste-ingredients.pdf";
  link.click();

  // Nettoyage
  window.URL.revokeObjectURL(link.href);
}

const btnGenerate = document.querySelector("#btn-generate");

console.log(btnGenerate);

btnGenerate.addEventListener("click", () =>
  createPdfWithIngredients(ingredients)
);

const fs = require("fs");

/**
 * Creates a text file containing the array elements.
 * @param {Array} arrayData - The array to be written to the text file.
 * @param {string} fileName - The name of the text file to create.
 */
function createTextFileFromArray(arrayData, fileName) {
  const textContent = arrayData.join("\n");

  fs.writeFile(fileName, textContent, (err) => {
    if (err) {
      console.error("Error creating text file:", err);
      return;
    }
    console.log("Text file created successfully:", fileName);
  });
}

export default createTextFileFromArray;

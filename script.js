const fileInput = document.getElementById("fileInput");
const chooseImageButton = document.getElementById("chooseImageButton");
const previewImage = document.getElementById("preview");
const brightness = document.getElementById("brightness");
const saturation = document.getElementById("saturation");
const grayscale = document.getElementById("grayscale");
const inversion = document.getElementById("inversion");
const saveBtn = document.getElementById("saveBtn");
const resetBtn = document.getElementById("resetBtn");
const cancelBtn = document.getElementById("cancelBtn");
const rotateLeftBtn = document.getElementById("left");
const rotateRightBtn = document.getElementById("right");
const flipHorizontalBtn = document.getElementById("horizontal");
const flipVerticalBtn = document.getElementById("vertical");

let rotation = 0;
let flipX = 1, flipY = 1;

// Load Image
chooseImageButton.addEventListener("click", () => fileInput.click());
fileInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
        previewImage.src = URL.createObjectURL(file);
    }
});

// Apply Filters
function applyFilters() {
    previewImage.style.filter = `brightness(${brightness.value}%) saturate(${saturation.value}%) grayscale(${grayscale.value}%) invert(${inversion.value}%)`;
    previewImage.style.transform = `rotate(${rotation}deg) scale(${flipX}, ${flipY})`;
}

[brightness, saturation, grayscale, inversion].forEach(filter => {
    filter.addEventListener("input", applyFilters);
});

// Rotate & Flip Image
rotateLeftBtn.addEventListener("click", () => {
    rotation -= 90;
    applyFilters();
});

rotateRightBtn.addEventListener("click", () => {
    rotation += 90;
    applyFilters();
});

flipHorizontalBtn.addEventListener("click", () => {
    flipX *= -1;
    applyFilters();
});

flipVerticalBtn.addEventListener("click", () => {
    flipY *= -1;
    applyFilters();
});

// Reset Filters
resetBtn.addEventListener("click", () => {
    brightness.value = 100;
    saturation.value = 100;
    grayscale.value = 0;
    inversion.value = 0;
    rotation = 0;
    flipX = 1;
    flipY = 1;
    applyFilters();
});

// Cancel Image Selection
cancelBtn.addEventListener("click", () => {
    previewImage.src = "";
    fileInput.value = "";
    resetBtn.click();
});

// Save Image
saveBtn.addEventListener("click", () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = previewImage.naturalWidth;
    canvas.height = previewImage.naturalHeight;
    ctx.filter = `brightness(${brightness.value}%) saturate(${saturation.value}%) grayscale(${grayscale.value}%) invert(${inversion.value}%)`;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(rotation * Math.PI / 180);
    ctx.scale(flipX, flipY);
    ctx.drawImage(previewImage, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    
    const link = document.createElement("a");
    link.href = canvas.toDataURL();
    link.download = "edited-image.png";
    link.click();
});

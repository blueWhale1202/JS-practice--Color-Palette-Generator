const NUMBER_OF_PALETTES = 32;

const refreshBtn = document.querySelector(".refresh-btn");
const palettesList = document.querySelector(".palette-list");

const generateHexCode = () => {
    const hexCode = Math.floor(Math.random() * 0xffffff)
        .toString(16)
        .padStart(6, "0");
    return `#${hexCode}`;
};

const copyColor = async (paletteItem, hexCode) => {
    try {
        const paletteInfo = paletteItem.querySelector(".palette__info");
        paletteInfo.innerText = "Copied";

        setTimeout(() => (paletteInfo.innerText = hexCode), 1000);
    } catch (error) {
        alert("Failed to copy the color code");
    }
};

const generatePalette = () => {
    palettesList.innerHTML = "";

    for (let i = 0; i < NUMBER_OF_PALETTES; i++) {
        const paletteItem = document.createElement("li");
        paletteItem.classList.add("palette-item");

        const hexCode = generateHexCode();

        paletteItem.innerHTML = `
            <div
                class="palette__color"
                style="background-color: ${hexCode}"
            ></div>
            <p class="palette__info">${hexCode}</p>
        `;

        paletteItem.onclick = (e) => copyColor(paletteItem, hexCode);

        palettesList.appendChild(paletteItem);
    }
};

generatePalette();

refreshBtn.onclick = () => {
    generatePalette();
};

const NUMBER_OF_PALETTES = 32;

const generateHexCode = () =>
    Math.floor(Math.random() * 0xffffff)
        .toString(16)
        .padStart(6, "0")
        .toLocaleUpperCase();

const paletteList = document.querySelector(".palette-list");
const generatePalettes = () => {
    paletteList.innerHTML = "";
    for (let i = 0; i < NUMBER_OF_PALETTES; i++) {
        const hexCode = `#${generateHexCode()}`;

        const paletteItem = document.createElement("li");
        paletteItem.classList.add("palette-item");

        paletteItem.innerHTML = `
            <div
                class="palette__color"
                style="background-color: ${hexCode}"
            ></div>
            <div class="palette__info">${hexCode}</div>
        `;

        paletteItem.onmousedown = () => {
            paletteItem.style.transform = `scale(0.98)`;
        };

        paletteItem.onmouseup = () => {
            paletteItem.style.transform = `scale(1)`;
        };

        paletteItem.onclick = async () => {
            try {
                await navigator.clipboard.writeText(hexCode);

                const paletteInfo = paletteItem.querySelector(".palette__info");
                paletteInfo.innerText = "COPIED";

                setTimeout(() => {
                    paletteInfo.innerText = `${hexCode}`;
                }, 600);
            } catch (error) {
                throw Error("Failed to copy: ", error);
            }
        };
        paletteList.append(paletteItem);
    }
};

generatePalettes();

const refreshBtn = document.querySelector(".btn");
refreshBtn.onclick = () => {
    generatePalettes();
};

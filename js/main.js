const toppingsApi     = 'https://cramerfam.github.io/CS601_HW2_Cramer/models/toppings.json';
const loadButton      = document.getElementById('loadCanvasButton');
const canvasContainer = document.getElementById('canvasContainer');

async function fetchToppingsData() {
    const response     = await fetch(toppingsApi);
    const toppingsJson = await response.json();

    return toppingsJson;
}

loadButton.addEventListener('click', async () => {
    toppingsData = await fetchToppingsData();

    for (let item in toppingsData) {

        let category = toppingsData[item];

        category.forEach(topping => {
            const name   = topping.name;
            const type   = topping.goodFor;
            const canvas = document.createElement('canvas');

            canvas.width = 150;
            canvas.width = 150;
            canvas.draggable = true;
            canvas.dataset.type = type;
            canvas.id = name;

            canvasContainer.appendChild(canvas);
        })
    }
})


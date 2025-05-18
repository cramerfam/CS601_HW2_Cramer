//API URL as constant
const toppingsApi     = 'https://cramerfam.github.io/CS601_HW2_Cramer/models/toppings.json';
//DOM elements as constants
const loadButton      = document.getElementById('loadToppingsButton');
const canvasContainer = document.getElementById('canvasContainer');
const dropZones       = ['pizzaDropZone', 'trashDropZone'];
const infoZone        = document.getElementById('info');
//Set event names as constants
const CLICK      = 'click';
const DRAG_START = 'dragstart';
const DRAG_OVER  = 'dragover';
const DROP       = 'drop';
//Info messaging as constants
const END_MESSAGE           = 'WHAT A PIZZA! PLEASE REFRESH TO PLAY AGAIN.';
const FAIL_MESSAGE          = 'NOT QUITE. PLEASE TRY AGAIN!';
const PINEAPPLE_MESSAGE     = 'PINEAPPLE - YOU EITHER LOVE IT OR HATE IT!';
const SUCCESS_MESSAGE_PIZZA = 'YUM! THAT GOES GREAT ON PIZZA!';
const SUCCESS_MESSAGE_TRASH = 'IN THE TRASH IT GOES, GOOD JOB!';

//Fetch Toppings JSON from the API
async function fetchToppingsData() {
    const response     = await fetch(toppingsApi);
    const toppingsJson = await response.json();

    return toppingsJson;
}

//Iterate over toppings JSON to create canvases of each topping
loadButton.addEventListener(CLICK, async () => {

    //Disable load button to prevent unlimited toppings
    loadButton.disabled = true;
    loadButton.classList.add('loaded');
    loadButton.innerText = 'Toppings Loaded';

    //Get toppings
    toppingsData = await fetchToppingsData();

    //Iterate over categories in topics object
    for (let item in toppingsData) {
        let category = toppingsData[item];

        //Create a canvas for each topping in each category
        category.forEach(topping => {
            const name   = topping.name;
            const type   = topping.goodFor;
            const canvas = document.createElement('canvas');

            canvas.width = 150;
            canvas.width = 150;
            canvas.draggable = true;
            canvas.dataset.type = type;
            canvas.id = name;

            //Set canvas data when drag begins
            canvas.addEventListener(DRAG_START, (e) => {
                e.dataTransfer.setData('text', canvas.id);
                infoZone.innerText = '';
            })

            //Add the canvas to the container
            canvasContainer.appendChild(canvas);
        })
    }
})

//Iterate through drop zones
dropZones.forEach(id => {

    //Select the drop zone
    const dropZone = document.getElementById(id);

    //Prevent default behavior on drag over
    dropZone.addEventListener(DRAG_OVER, (e) => {
        e.preventDefault();
    })

    //Determine how to respond based on canvas data and drop zone
    dropZone.addEventListener(DROP, (e) => {
        e.preventDefault();

        const canvasId   = e.dataTransfer.getData('text');
        const canvas     = document.getElementById(canvasId);
        const type       = canvas.dataset.type;
        const dropPrefix = id.substring(0, 5);
        const container  = type === 'either' ? document.getElementById(`${dropPrefix}Toppings`) : document.getElementById(`${type}Toppings`);

        //If dropping real toppings on pizza, success!
        if (id === 'pizzaDropZone' && type === 'pizza') {
            //Move canvas to container (it gets hidden)
            container.appendChild(canvas);
            //Unhide the overlay with the corresponding toppings
            let overlay = document.getElementById(`pizza-${canvasId}`);
            if (overlay) {
                overlay.style.display = 'block';
            }
            //Alert
            infoZone.innerText = SUCCESS_MESSAGE_PIZZA;
        //If dropping non-toppings into trash, also success!
        } else if (id === 'trashDropZone' && type === 'trash') {
            //Move canvas to container (it gets hidden)
            container.appendChild(canvas); 
            //Alert
            infoZone.innerText = SUCCESS_MESSAGE_TRASH;
        //User can put pineapple in either place
        } else if (type === 'either') { 
            //Move canvas to container (it gets hidden)
            container.appendChild(canvas);
            //If pineapple was put on pizza, unhide the pineapple topping layer
            if (id === 'pizzaDropZone') {
                let overlay = document.getElementById(`pizza-${canvasId}`);
                overlay.style.display = 'block';
            }
            //Alert
            infoZone.innerText = PINEAPPLE_MESSAGE;
        //Otherwise, show an error
        } else {
            infoZone.innerText = FAIL_MESSAGE;
        }

        //If the canvas container is empty, hide it and show a final message
        if (canvasContainer.children?.length === 0) {
            canvasContainer.style.display = 'none';
            loadButton.style.display = 'none';
            infoZone.innerText = END_MESSAGE;
        }
    })
});
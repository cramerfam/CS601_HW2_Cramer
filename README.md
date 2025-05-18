# CS 601 Week 2 Assignment - Drag & Drop Project

Please take a look around. You can open index.html in your browser to view the game or launch it live in your IDE with an extension.

## About My Project

I decided to make a pizza topping game for my drag & drop project. I created two drop zones: a pizza and a trash can. To fill these drop zones, I created three groups in my json: actual pizza toppings, things that wouldn't go on pizza, and pineapple (since people either love or hate pineapple, it can go in either bucket). When you put actual pizza toppings on the pizza, the canvas topping gets hidden and a hidden layer of the pizza with the topping present gets unhidden, making it look like the toppings are going onto the pizza. When you add items to the trash, they disappear, as if they were really going into the trash can. There are also helpful prompts that show on screen when you sort correctly, incorrectly, or decide where the pineapple should go. Once all the toppings have been sorted, the toppings container hides and a message appears to indicate the game is over that that the user can refresh to play again. To keep the UI clean, I disable the button after the topping canvases load - otherwise you could add infinite canvases to the DOM and make it look cluttered. 

The toppings json file is hosted on GitHub Pages: https://cramerfam.github.io/CS601_HW2_Cramer/models/toppings.json.

(Note: All clip-art is from Canva, which I have a subscription for.)
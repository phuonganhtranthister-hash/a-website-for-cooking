/* =========================================
   COOKWISE JAVASCRIPT
========================================= */


// =========================================
// RECIPE DATA
// =========================================

const recipes = {

    spaghetti: {
        title: "Classic Spaghetti 🍝",

        ingredients: [
            "8 oz spaghetti",
            "2 cups tomato sauce",
            "2 cloves garlic",
            "1 tablespoon olive oil",
            "Salt to taste",
            "Black pepper to taste",
            "Parmesan cheese"
        ],

        steps: [
            "Bring a large pot of salted water to a boil.",
            "Add the spaghetti and cook according to the package directions.",
            "While the pasta cooks, heat olive oil in a pan.",
            "Add minced garlic and cook for about 30 seconds.",
            "Add the tomato sauce and simmer for 10 minutes.",
            "Drain the pasta and add it to the sauce.",
            "Toss everything together.",
            "Serve with Parmesan cheese."
        ]
    },


    pancakes: {
        title: "Fluffy Pancakes 🥞",

        ingredients: [
            "1 cup all-purpose flour",
            "2 tablespoons sugar",
            "1 teaspoon baking powder",
            "1 egg",
            "3/4 cup milk",
            "2 tablespoons melted butter",
            "Pinch of salt"
        ],

        steps: [
            "Mix the flour, sugar, baking powder, and salt.",
            "In another bowl, whisk together the egg, milk, and melted butter.",
            "Combine the wet and dry ingredients.",
            "Mix until just combined. Do not overmix.",
            "Heat a lightly greased pan over medium heat.",
            "Pour approximately 1/4 cup of batter into the pan.",
            "Cook until bubbles appear on the surface.",
            "Flip and cook the other side until golden brown.",
            "Serve with your favorite toppings."
        ]
    },


    salad: {
        title: "Fresh Chicken Salad 🥗",

        ingredients: [
            "2 cooked chicken breasts",
            "Mixed lettuce",
            "1 tomato",
            "1/2 cucumber",
            "1/4 red onion",
            "2 tablespoons olive oil",
            "1 tablespoon lemon juice",
            "Salt and pepper"
        ],

        steps: [
            "Wash and prepare all vegetables.",
            "Cut the chicken into bite-sized pieces.",
            "Chop the tomato, cucumber, and onion.",
            "Place the lettuce in a large bowl.",
            "Add the chicken and vegetables.",
            "Mix olive oil and lemon juice for the dressing.",
            "Pour the dressing over the salad.",
            "Season with salt and pepper.",
            "Toss gently and serve."
        ]
    },


    cake: {
        title: "Chocolate Cake 🍰",

        ingredients: [
            "1 1/2 cups flour",
            "1 cup sugar",
            "1/2 cup cocoa powder",
            "1 teaspoon baking powder",
            "2 eggs",
            "1 cup milk",
            "1/2 cup vegetable oil",
            "1 teaspoon vanilla extract"
        ],

        steps: [
            "Preheat the oven to 350°F (175°C).",
            "Grease a cake pan.",
            "Mix the flour, sugar, cocoa powder, and baking powder.",
            "Add the eggs, milk, oil, and vanilla.",
            "Mix until the batter is smooth.",
            "Pour the batter into the prepared pan.",
            "Bake until a toothpick inserted into the center comes out clean.",
            "Allow the cake to cool before serving."
        ]
    }

};


// =========================================
// SEARCH
// =========================================

const searchInput =
    document.getElementById("searchInput");

const recipeCards =
    document.querySelectorAll(".recipe-card");

const noResults =
    document.getElementById("noResults");


searchInput.addEventListener("input", filterRecipes);


function filterRecipes() {

    const searchText =
        searchInput.value.toLowerCase().trim();

    let visibleRecipes = 0;

    recipeCards.forEach(card => {

        const recipeName =
            card.dataset.name.toLowerCase();

        const category =
            card.dataset.category.toLowerCase();

        if (
            recipeName.includes(searchText) ||
            category.includes(searchText)
        ) {

            card.style.display = "block";

            visibleRecipes++;

        } else {

            card.style.display = "none";

        }

    });


    if (visibleRecipes === 0) {
        noResults.style.display = "block";
    } else {
        noResults.style.display = "none";
    }

}


// =========================================
// CATEGORY FILTER
// =========================================

const categoryButtons =
    document.querySelectorAll(".category");


categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        categoryButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const selectedCategory =
            button.dataset.category;

        let visibleRecipes = 0;

        recipeCards.forEach(card => {

            const cardCategory =
                card.dataset.category;

            if (
                selectedCategory === "all" ||
                cardCategory === selectedCategory
            ) {

                card.style.display = "block";

                visibleRecipes++;

            } else {

                card.style.display = "none";

            }

        });

        if (visibleRecipes === 0) {
            noResults.style.display = "block";
        } else {
            noResults.style.display = "none";
        }

    });

});


// =========================================
// RECIPE MODAL
// =========================================

const modal =
    document.getElementById("recipeModal");

const modalRecipe =
    document.getElementById("modalRecipe");

const closeModal =
    document.getElementById("closeModal");

const recipeButtons =
    document.querySelectorAll(".recipe-button");


recipeButtons.forEach(button => {

    button.addEventListener("click", () => {

        const recipeName =
            button.dataset.recipe;

        showRecipe(recipeName);

    });

});


function showRecipe(recipeName) {

    const recipe =
        recipes[recipeName];

    if (!recipe) {
        return;
    }


    let ingredientsHTML = "";

    recipe.ingredients.forEach(ingredient => {

        ingredientsHTML += `
            <li>${ingredient}</li>
        `;

    });


    let stepsHTML = "";

    recipe.steps.forEach(step => {

        stepsHTML += `
            <li>${step}</li>
        `;

    });


    modalRecipe.innerHTML = `

        <h2>${recipe.title}</h2>

        <h3>🛒 Ingredients</h3>

        <ul>
            ${ingredientsHTML}
        </ul>

        <h3>👨‍🍳 Instructions</h3>

        <ol>
            ${stepsHTML}
        </ol>

        <br>

        <p>
            <strong>Cooking tip:</strong>
            Read through the entire recipe before you begin.
            Prepare your ingredients first so you can focus on cooking.
        </p>

    `;


    modal.classList.add("show");

    document.body.style.overflow = "hidden";

}


// =========================================
// CLOSE MODAL
// =========================================

closeModal.addEventListener("click", closeRecipe);


modal.addEventListener("click", event => {

    if (event.target === modal) {
        closeRecipe();
    }

});


function closeRecipe() {

    modal.classList.remove("show");

    document.body.style.overflow = "";

}


// =========================================
// ESC KEY CLOSES MODAL
// =========================================

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {
        closeRecipe();
    }

});


// =========================================
// MOBILE MENU
// =========================================

const mobileMenu =
    document.getElementById("mobileMenu");

const navigation =
    document.querySelector(".navbar nav");


mobileMenu.addEventListener("click", () => {

    if (navigation.style.display === "flex") {

        navigation.style.display = "none";

    } else {

        navigation.style.display = "flex";
        navigation.style.flexDirection = "column";
        navigation.style.position = "absolute";
        navigation.style.top = "75px";
        navigation.style.right = "0";
        navigation.style.background = "#fffaf5";
        navigation.style.padding = "25px";
        navigation.style.width = "200px";
        navigation.style.boxShadow =
            "0 10px 25px rgba(0,0,0,0.1)";

    }

});

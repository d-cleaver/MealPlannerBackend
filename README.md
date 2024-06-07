# Flavorite Recipes

## Website URL: [https://mealplannerfrontend2.onrender.com/]

### Description

Flavorite Recipes is a recipe search website. It allows users to search through our database of recipes,
favorite whichever recipes the user likes, and compiles those favorites in one spot for easier access.

---

### Features Implemented

**Feature 1:** User sign-up / login abilities.
_Reason:_ This is so each user can have their own set of favorite recipes. Users can edit their profile
in the Profile tab, with the exception of changing their username or password. Password is required to save changes.
**Feature 2:** Search through Spoonacular recipe database.
_Reason:_ This is **the** core feature of the site. Users can search through our database to find recipes they like.
**Feature 3:** Favorites
_Reason:_ The secondary feature of the site. This allows users to select favorite recipes, and have access to
their individual favorite recipes with the click of a button. The favorite state persists throughout the site,
allowing users full control of their favorites, with access to toggle a favorite on or off anywhere a recipe appears.

---

### Tests

##### Frontend Tests

_Tests for the components are located in the following files:_

- FavoritesComponent.test.js
- RecipeCard.test.js
- RecipeModel.test.js
- SearchComponent.test.js

**To run the frontend tests:**

- Clone the repository.
- Navigate to the project directory in the terminal.
- Ensure you are using Node 16.20.2 (nvm use Node 16.20.2)
- Run npm test to execute the tests.

##### Backend Tests

_Tests for the backend are located in the tests directory._

**To run the backend tests:**

- Clone the repository.
- Navigate to the backend directory in the terminal.
- Ensure you are using Node 16.20.2 (nvm use Node 16.20.2)
- Run npm test to execute the tests.

---

#### Standard User Flow

- **Home Page:** Upon visiting the site, users are directed to the site's homepage and are directed towards the search feature.
- **Search:** Users are greeted with a search bar to search for recipes. Users enter a search term and click the submit button.
- **Results:** The site displays a list of recipes based on the search term. Users can click on a recipe to view more details.
- **Recipe Details:** Users can view detailed information about the selected recipe, including a summary and image.
- **Favorites:** Users can mark recipes as favorites, which are saved for future reference. Favorite state persists throughout the site.

---

#### API Notes

The website utilizes the Spoonacular API for fetching recipe data. This API provides comprehensive recipe information,
including titles, images, and summaries. The website also has a database to store user profile information as well as
user favorite recipes.
**Spoonacular Docs:** [https://spoonacular.com/food-api/docs]

---

##### Technology Stack

**Node Version:** 16.20.2
**Frontend:** React.js
**Backend:** Node.js
**API Integration:** Axios
**Testing:** Jest, react-testing-library, SuperTest

---

###### Additional Notes

_The Spoonacular API has many additional endpoints to be utilized. This site was designed with scalibility
in mind. I have designed re-usable components that could be utilized when creating additional functionality.
The overall goal was to make the code as clean as possible, allowing anyone to easily add features and decipher it._

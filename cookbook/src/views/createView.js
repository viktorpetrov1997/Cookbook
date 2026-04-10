import { html, page } from "../utility/library.js";
import { dataService } from "../service/dataService.js";

const createTemplate = () => html`
    <article>
        <h2>New Recipe</h2>
        <form @submit=${onSubmit}>
            <label>Name: <input type="text" name="name" placeholder="Recipe name"></label>
            <label>Image: <input type="text" name="img" placeholder="Image URL"></label>
            <label class="ml">Ingredients: <textarea name="ingredients" placeholder="Enter ingredients on separate lines"></textarea></label>
            <label class="ml">Preparation: <textarea name="steps" placeholder="Enter preparation steps on separate lines"></textarea></label>
            <input type="submit" value="Create Recipe">
        </form>
    </article>
`;

export async function showCreateView(ctx)
{
    ctx.render(createTemplate());
}

async function onSubmit(e)
{
    e.preventDefault();

    const formData = new FormData(e.target);

    const { name, img, ingredients, steps } = Object.fromEntries(formData);

    if(!name || !img || !ingredients || !steps)
    {
        return alert("All fields are required!");
    }

    const ingredientsArray = ingredients
        .split("\n")
        .map(x => x.trim())
        .filter(x => x !== "");

    const stepsArray = steps
        .split("\n")
        .map(x => x.trim())
        .filter(x => x !== "");

    await dataService.createRecipe({ name, img, ingredients: ingredientsArray, steps: stepsArray });

    page.redirect("/");
}
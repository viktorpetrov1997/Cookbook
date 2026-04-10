import { html, page } from "../utility/library.js";
import { dataService } from "../service/dataService.js";

const editTemplate = (recipe) => html`
    <section id="edit">
        <article>
            <h2>Edit Recipe</h2>
            <form @submit=${onSubmit} data-id=${recipe._id}>
                <label>Name: <input type="text" name="name" .value=${recipe.name} placeholder="Recipe name"></label>
                <label>Image: <input type="text" name="img" .value=${recipe.img} placeholder="Image URL"></label>
                <label class="ml">Ingredients: <textarea name="ingredients" .value=${recipe.ingredients.join('\n')}
                            placeholder="Enter ingredients on separate lines"></textarea></label>
                <label class="ml">Preparation: <textarea name="steps" .value=${recipe.steps.join('\n')}
                            placeholder="Enter preparation steps on separate lines"></textarea></label>
                <input type="submit" value="Update Recipe">
            </form>
        </article>
    </section>
`;

export async function showEditView(ctx)
{
    const id = ctx.params.id;

    const recipe = await dataService.getRecipeById(id);

    ctx.render(editTemplate(recipe));
}

async function onSubmit(e)
{
    e.preventDefault();

    const id = e.target.dataset.id;

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

    await dataService.updateRecipe(id, { name, img, ingredients: ingredientsArray, steps: stepsArray });

    page.redirect("/details/" + id);
}
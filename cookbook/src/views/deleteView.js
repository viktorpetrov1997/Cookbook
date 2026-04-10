import { dataService } from "../service/dataService.js";
import { html } from "../utility/library.js";

const deleteTemplate = () => html`
    <article>
        <h2>Recipe deleted</h2>
    </article>
`;

export async function deleteHandler(ctx)
{
    const id = ctx.params.id;

    const userConfirm = confirm("Are you sure you want to delete this recipe?");
    
    if(userConfirm)
    {
        userConfirm && await dataService.deleteRecipeById(id);
        ctx.render(deleteTemplate());
    }
}
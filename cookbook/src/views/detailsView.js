import { html, nothing, page } from "../utility/library.js";
import { dataService } from "../service/dataService.js";
import { userUtils } from "../utility/userUtils.js";

const detailsTemplate = (recipe, hasOwner, showForm, onShowForm, comments, isLoggedIn) => html`
    <article>
        <h2>${recipe.name}</h2>
        <div class="band">
            <div class="thumb">
                <img src=${getImgSrc(recipe.img)}>
            </div>
            <div class="ingredients">
                <h3>Ingredients:</h3>
                <ul>
                    ${recipe.ingredients.map(i => html`<li>${i}</li>`)}
                </ul>
            </div>
        </div>
        <div class="description">
            <h3>Preparation:</h3>
            ${recipe.steps.map(s => html`<p>${s}</p>`)}
        </div>
    
        ${hasOwner ? html`
            <div class="controls">
                <a href="/edit/${recipe._id}" class="btn edit-btn">✏️ Edit</a>
                <a href="/delete/${recipe._id}" class="btn delete-btn">❌ Delete</a>
            </div>
        `: nothing}
    </article>

    <div class="section-title">
        Comments for ${recipe.name}
    </div>

    <div class="comments">
        <ul>
            ${comments.map(c => html`
                <li class="comment">
                    <header>${c.userEmail || "Anonymous comment"}</header>
                    <p>${c.content}</p>
                </li>
            `)}
        </ul>
    </div>

    ${isLoggedIn ? (
      !showForm ? html`
        <article class="new-comment">
            <form>
                <button type="button" class="button" @click=${onShowForm}>Add comment</button>
            </form>
        </article>
    ` : html`
        <article class="new-comment">
            <h2>New comment</h2>
            <form id="commentForm" @submit=${onSubmit}>
                <textarea name="content" placeholder="Type comment"></textarea>
                <input type="submit" value="Add comment">
            </form>
        </article>
    `) : nothing}
`;

let currentRecipeId = null;

export async function showDetailsView(ctx)
{
    const id = ctx.params.id;

    currentRecipeId = id;
    
    const recipe = await dataService.getRecipeById(id);

    const userId = await userUtils.getUserId();

    const isLoggedIn = Boolean(userId);

    const hasOwner = userId === recipe._ownerId;

    const comments = await dataService.getAllCommentsForRecipe(recipe._id);

    let showForm = false;

    function onShowForm() 
    {
        showForm = true;
        ctx.render(detailsTemplate(recipe, hasOwner, showForm, onShowForm, comments, isLoggedIn));
    }

    ctx.render(detailsTemplate(recipe, hasOwner, showForm, onShowForm, comments, isLoggedIn));
}

const getImgSrc = (img) =>
{
    if (!img) return "";

    if(img.startsWith("assets")) 
    {
        return `/${img}`;
    }

    return img;
};

async function onSubmit(e)
{
    e.preventDefault();

    const formData = new FormData(e.target);

    const content = formData.get("content");

    if(!content)
    {
        return alert("You can't add an empty comment!");
    }

     const comment = 
     {
        recipeId: currentRecipeId,
        content: content,
        userEmail: userUtils.getUserEmail()
    };

    await dataService.addComment(comment);

    e.target.reset();

    page.redirect("/details/" + currentRecipeId);
}
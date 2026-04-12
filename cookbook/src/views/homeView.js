import { html, page } from "../utility/library.js";
import { dataService } from "../service/dataService.js";

const homeTemplate = (recipes) => html`
    <div id="views">
        <section id="home">
            <div class="hero">
                <h2>Welcome to My Cookbook</h2>
            </div>
            <header class="section-title">Recently added recipes</header>
            <div class="recent-recipes">
                ${recipes.map(recipe => recipeTemplate(recipe))}
            </div>
            <footer class="section-title">
                <p>Browse all recipes in the <a href="/catalog">Catalog</a></p>
            </footer>
        </section>
    </div>
`;

const recipeTemplate = (recipe) => html`
    <article class="recent" @click=${() => page.redirect(`/details/${recipe._id}`)}>
        <div class="recent-preview">
            <img src=${recipe.img}>
        </div>
        <div class="recent-title">
            ${recipe.name}
        </div>
    </article>
`
const root = document.querySelector("nav");

export async function showHomeView(ctx)
{
    root.querySelectorAll("a").forEach(a => a.classList.remove("active"));
    
    const data = await dataService.getThreeMostRecentRecipes();

    const recipes = Object.values(data);

    ctx.render(homeTemplate(recipes));
}
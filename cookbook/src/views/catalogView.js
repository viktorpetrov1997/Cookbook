import { html, page } from "../utility/library.js";
import { dataService } from "../service/dataService.js";

const PAGE_SIZE = 5;

const catalogTemplate = (recipes, pageInfo) => html`
    <div class="section-title">
        Page ${pageInfo.currentPage} of ${pageInfo.totalPages}

        ${pageInfo.currentPage > 1 ? html`
            <a class="pager" href="/catalog?page=${pageInfo.currentPage - 1}">
                &lt; Prev
            </a>
        ` : ""}

        ${pageInfo.currentPage < pageInfo.totalPages ? html`
            <a class="pager" href="/catalog?page=${pageInfo.currentPage + 1}">
                Next &gt;
            </a>
        ` : ""}
    </div>

    ${recipes.map(recipe => recipeTemplate(recipe))}

    <div class="section-title">
        Page ${pageInfo.currentPage} of ${pageInfo.totalPages}

        ${pageInfo.currentPage > 1 ? html`
            <a class="pager" href="/catalog?page=${pageInfo.currentPage - 1}">
                &lt; Prev
            </a>
        ` : ""}

        ${pageInfo.currentPage < pageInfo.totalPages ? html`
            <a class="pager" href="/catalog?page=${pageInfo.currentPage + 1}">
                Next &gt;
            </a>
        ` : ""}
    </div>
`;

const recipeTemplate = (recipe) => html`
    <article class="preview" @click=${() => page.redirect(`/details/${recipe._id}`)}>
        <div class="title">
            <h2>${recipe.name}</h2>
        </div>
        <div class="small">
            <img src=${recipe.img}>
        </div>
    </article>
`;

export async function showCatalogView(ctx) 
{
    const url = new URL(ctx.path, window.location.origin);

    let currentPage = Number(url.searchParams.get("page")) || 1;

    const totalNumberOfRecipes = await dataService.getTotalNumberOfRecipes();
    const totalPages = Math.ceil(totalNumberOfRecipes / PAGE_SIZE);

    if (currentPage < 1) currentPage = 1;
    if (currentPage > totalPages && totalPages > 0) currentPage = totalPages;

    const offset = (currentPage - 1) * PAGE_SIZE;

    const recipes = await dataService.getOffsetRecipes(offset);

    ctx.render(catalogTemplate(recipes, { currentPage, totalPages }));
}
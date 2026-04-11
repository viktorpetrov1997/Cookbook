import { html, page } from "../utility/library.js";
import { dataService } from "../service/dataService.js";

const PAGE_SIZE = 5;

const catalogTemplate = (recipes, pageInfo) => html`
    
    <div class="section-title">
        <form id="searchForm" @submit=${onSearch}>
            <input type="text" name="search">
            <input type="submit" value="Search">
        </form>
    </div>

    ${recipes.length === 0
        ? html`
            <div class="section-title">
                <p>No recipes found</p>
            </div>
        `
        : html`
            ${paginationTemplate(pageInfo)}

            ${recipes.map(recipe => recipeTemplate(recipe))}

            ${paginationTemplate(pageInfo)}
        `
    }
`;

const paginationTemplate = (pageInfo) => html`
    <div class="section-title">
        Page ${pageInfo.currentPage} of ${pageInfo.totalPages}

        ${pageInfo.currentPage > 1 ? html`
            <a class="pager" href="/catalog?page=${pageInfo.currentPage - 1}${pageInfo.searchQuery ? `&search=${encodeURIComponent(pageInfo.searchQuery)}` : ""}">
                &lt; Prev
            </a>
        ` : ""}

        ${pageInfo.currentPage < pageInfo.totalPages ? html`
            <a class="pager" href="/catalog?page=${pageInfo.currentPage + 1}${pageInfo.searchQuery ? `&search=${encodeURIComponent(pageInfo.searchQuery)}` : ""}">
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
    const searchQuery = url.searchParams.get("search")?.trim();

    let recipes = [];
    let totalNumberOfRecipes = 0;

    if(searchQuery) 
    {
        const allMatches = await dataService.findRecipe(searchQuery) ?? [];

        totalNumberOfRecipes = allMatches.length;

        const totalPages = Math.max(1, Math.ceil(totalNumberOfRecipes / PAGE_SIZE));

        if (currentPage < 1) currentPage = 1;
        if (currentPage > totalPages && totalPages > 0) currentPage = totalPages;

        const offset = (currentPage - 1) * PAGE_SIZE;

        recipes = allMatches.slice(offset, offset + PAGE_SIZE);

        ctx.render(catalogTemplate(recipes, { currentPage, totalPages, searchQuery }));
    } 
    else 
    {
        totalNumberOfRecipes = await dataService.getTotalNumberOfRecipes();
        const totalPages = Math.ceil(totalNumberOfRecipes / PAGE_SIZE);

        if (currentPage < 1) currentPage = 1;
        if (currentPage > totalPages && totalPages > 0) currentPage = totalPages;

        const offset = (currentPage - 1) * PAGE_SIZE;

        recipes = await dataService.getOffsetRecipes(offset);

        ctx.render(catalogTemplate(recipes, { currentPage, totalPages, searchQuery: null }));
    }
}

async function onSearch(e)
{
    e.preventDefault();

    const formData = new FormData(e.target);
    const searchQuery = formData.get("search").trim();

    if(!searchQuery)
    {
        alert("Please enter a search term!");
        return;
    }

    page.redirect(`/catalog?search=${encodeURIComponent(searchQuery)}`);
}
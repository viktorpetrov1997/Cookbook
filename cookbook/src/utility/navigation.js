import { html, render } from "./library.js";
import { userUtils } from "./userUtils.js";

const root = document.querySelector("nav");

const navigationTemplate = (hasUser) => html`
    <a href="/catalog">Catalog</a>

    ${hasUser ? html` 
        <div id="user">
            <a href="/create">Create Recipe</a>
            <a id="logoutBtn" href="/logout">Logout</a>
        </div> `
    :
    html`
    <div id="guest">
        <a href="/login">Login</a>
        <a href="/register">Register</a>
    </div>`}
`;

export function updateNav()
{   
    const userData = userUtils.getUserData();

    render(navigationTemplate(!!userData), root);
}

root.addEventListener("click", (e) => 
{
    if(e.target.tagName === "A") 
    {
        root.querySelectorAll("a").forEach(a => a.classList.remove("active"));

        e.target.classList.add("active");
    }
});
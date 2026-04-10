import { html, page } from "../utility/library.js";
import { userService } from "../service/userService.js";
import { updateNav } from "../utility/navigation.js";

const loginTemplate = () => html`
    <article>
        <h2>Login</h2>
        <form @submit=${onSubmit}>
            <label>E-mail: <input type="text" name="email"></label>
            <label>Password: <input type="password" name="password"></label>
            <input type="submit" value="Login">
        </form>
    </article>
`;

export function showLoginView(ctx)
{
    ctx.render(loginTemplate());
}

async function onSubmit(e)
{
    e.preventDefault();

    const formData = new FormData(e.target);

    const { email, password } = Object.fromEntries(formData);

    if(!email || !password)
    {
        return alert("All fields are required!");
    }

    await userService.login({ email, password });
    updateNav();
    page.redirect("/");
}
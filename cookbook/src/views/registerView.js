import { html, page } from "../utility/library.js";
import { userService } from "../service/userService.js";
import { updateNav } from "../utility/navigation.js";

const registerTemplate = () => html`
    <article>
        <h2>Register</h2>
        <form @submit=${onSubmit}>
            <label>E-mail: <input type="text" name="email"></label>
            <label>Password: <input type="password" name="password"></label>
            <label>Repeat: <input type="password" name="rePass"></label>
            <input type="submit" value="Register">
        </form>
    </article>
`;

export function showRegisterView(ctx)
{
    ctx.render(registerTemplate());
}

async function onSubmit(e)
{
    e.preventDefault();

    const formData = new FormData(e.target);

    const { email, password, rePass } = Object.fromEntries(formData);

    if(!email || !password)
    {
        return alert("All fields are required!");
    }

    if(password !== rePass)
    {
        return alert("Passwords don't match!");
    }

    await userService.register({ email, password });
    updateNav();
    page.redirect("/");
}
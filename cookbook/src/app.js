import { page } from "./utility/library.js";
import { addRender } from "./utility/render.js";
import { showHomeView } from "./views/homeView.js";
import { showCatalogView } from "./views/catalogView.js";
import { showDetailsView } from "./views/detailsView.js";
import { updateNav } from "./utility/navigation.js";
import { showLoginView } from "./views/loginView.js";
import { showRegisterView } from "./views/registerView.js";
import { logout } from "./views/logout.js";
import { showCreateView } from "./views/createView.js";
import { showEditView } from "./views/editView.js";
import { deleteHandler } from "./views/deleteView.js";


page(addRender);

page("/", showHomeView);
page("/catalog", showCatalogView);
page("/details/:id", showDetailsView);
page("/login", showLoginView);
page("/register", showRegisterView);
page("/logout", logout);
page("/create", showCreateView);
page("/edit/:id", showEditView);
page("/delete/:id", deleteHandler);


page.start();
updateNav();
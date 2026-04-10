import { api } from "./requester.js";

const endPoints =
{
    getAllRecipes: "/data/recipes?select=_id%2Cname%2Cimg",
    byId: "/data/recipes/",
    createRecipe: "/data/recipes",
    edit: "/data/recipes/",
    getThreeMostRecentRecipes: "/data/recipes?select=_id%2Cname%2Cimg&sortBy=_createdOn%20desc&pageSize=3",
    getOffsetRecipes: (offset) => `/data/recipes?select=_id%2Cname%2Cimg&offset=${offset}&pageSize=5`,
    getTotalNumberOfRecipes: "/data/recipes?count",
    getAllCommentsForRecipe: (recipeId) => `/data/comments?where=recipeId%3D%22${recipeId}%22`,
    addComment: "/data/comments"
}

async function getAllRecipes()
{
    return await api.get(endPoints.getAllRecipes);
}

async function getRecipeById(id)
{
    return await api.get(endPoints.byId + id);
}

async function createRecipe(data)
{
    return await api.post(endPoints.createRecipe, data);
}

async function updateRecipe(id, data)
{
    return await api.put(endPoints.edit + id, data);
}

async function deleteRecipeById(id)
{
    return await api.del(endPoints.byId + id);
}

async function getThreeMostRecentRecipes()
{
    return await api.get(endPoints.getThreeMostRecentRecipes);
}

async function getOffsetRecipes(offset)
{
    return await api.get(endPoints.getOffsetRecipes(offset));
}

async function getTotalNumberOfRecipes()
{
    return await api.get(endPoints.getTotalNumberOfRecipes);
}

async function getAllCommentsForRecipe(recipeId)
{
    return await api.get(endPoints.getAllCommentsForRecipe(recipeId));
}

async function addComment(comment)
{
    return await api.post(endPoints.addComment, comment);
}

export const dataService =
{
    getAllRecipes,
    getRecipeById,
    createRecipe,
    updateRecipe,
    deleteRecipeById,
    getThreeMostRecentRecipes,
    getOffsetRecipes,
    getTotalNumberOfRecipes,
    getAllCommentsForRecipe,
    addComment
}
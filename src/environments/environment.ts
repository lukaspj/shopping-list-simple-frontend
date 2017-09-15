// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

const dbUrl = `http://127.0.0.1:8000`;

export const environment = {
  production: false,
  serviceUrls: {
    recipes: {
      create: `${dbUrl}/recipes/`,
      list: `${dbUrl}/recipes/`,
      latest: (limit) => `${dbUrl}/recipes/latest/${limit}/`,
      get: (id) => `${dbUrl}/recipes/${id}/`,
      delete: (id) => `${dbUrl}/recipes/${id}/`,
      update: (id) => `${dbUrl}/recipes/${id}/`
    },
    ingredients: {
      list: `${dbUrl}/ingredients/`,
      get: (id) => `${dbUrl}/ingredients/${id}/`,
      create: `${dbUrl}/ingredients/`,
      update: (id) => `${dbUrl}/ingredients/${id}/`,
      delete: (id) => `${dbUrl}/ingredients/${id}/`
    },
    recipe_ingredients: {
      list: `${dbUrl}/recipe_ingredients`,
      list_for: (id) => `${dbUrl}/recipeingredients/${id}`,
      create: `${dbUrl}/recipeingredients/create`,
      update: `${dbUrl}/recipeingredients/update`,
      delete: `${dbUrl}/recipeingredients/delete`
    }
  }
};

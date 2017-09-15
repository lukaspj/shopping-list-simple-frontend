const dbUrl = 'https://normad-db.flynn.lukasj.org';

export const environment = {
  production: true,
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
    },
    auth: {
      authenticate: `${dbUrl}/api-token-auth/`,
      user_list: `${dbUrl}/users/`
    },
    units: {
      list: `${dbUrl}/units/`
    }
  }
};

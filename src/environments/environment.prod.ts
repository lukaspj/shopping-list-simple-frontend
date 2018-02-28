const dbUrl = 'https://normad-db.flynn.lukasj.org';

export const environment = {
  production: true,
  serviceUrls: {
    recipes: {
      get: (id) => `${dbUrl}/recipes/${id}/`,
      list: `${dbUrl}/recipes/`,
      create: `${dbUrl}/recipes/`,
      update: (id) => `${dbUrl}/recipes/${id}/`,
      delete: (id) => `${dbUrl}/recipes/${id}/`,
      search_name_contains: (term) => `${dbUrl}/recipes/search/?name__contains=${term}`,
      latest: (limit) => `${dbUrl}/recipes/latest/${limit}/`,
    },
    ingredients: {
      get: (id) => `${dbUrl}/ingredients/${id}/`,
      list: `${dbUrl}/ingredients/`,
      create: `${dbUrl}/ingredients/`,
      update: (id) => `${dbUrl}/ingredients/${id}/`,
      delete: (id) => `${dbUrl}/ingredients/${id}/`,
      search_name_contains: (term) => `${dbUrl}/ingredients/search/?name__contains=${term}`
    },
    recipe_ingredients: {
      options: `${dbUrl}/recipeingredients`,
      list: `${dbUrl}/recipe_ingredients`,
      list_for: (id) => `${dbUrl}/recipeingredients/${id}`,
      create: `${dbUrl}/recipeingredients/create`,
      update: `${dbUrl}/recipeingredients/update`,
      delete: `${dbUrl}/recipeingredients/delete`
    },
    auth: {
      authenticate: `${dbUrl}/api-token-auth/`,
      register: `${dbUrl}/users/`,
      user_list: `${dbUrl}/users/`
    },
    units: {
      list: `${dbUrl}/units/`
    }
  }
};

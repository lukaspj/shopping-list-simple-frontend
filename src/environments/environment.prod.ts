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
      list_for: (id) => `${dbUrl}/recipe_ingredients/${id}`,
      create: `${dbUrl}/recipe_ingredients/create`,
      update: `${dbUrl}/recipe_ingredients/update`,
      delete: `${dbUrl}/recipe_ingredients/delete`
    }
  }
};

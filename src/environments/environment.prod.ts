const dbUrl = 'https://normad-db.flynn.lukasj.org';

export const environment = {
  production: true,
  serviceUrls: {
    items: {
      create: `${dbUrl}/items/create`,
      delete: `${dbUrl}/items/delete`,
      getAll: `${dbUrl}/items`
    },
    lists: {
      create: `${dbUrl}/lists/create`,
      delete: `${dbUrl}/lists/delete`,
      update: `${dbUrl}/lists/update`,
      get: `${dbUrl}/lists/`,
      getAll: `${dbUrl}/lists/`,
    },
    listed_item: {
      create: `${dbUrl}/list_items/create`,
      delete: `${dbUrl}/list_items/delete`,
      get: (id) => `${dbUrl}/list_items/${id}`,
      getAll: `${dbUrl}/list_items/`
    },
    recipes: {
      create: `${dbUrl}/recipes/create`,
      list: `${dbUrl}/recipes`,
      latest: (limit) => `${dbUrl}/recipes/latest/${limit}`,
      get: (id) => `${dbUrl}/recipes/${id}`,
      delete: `${dbUrl}/recipes/delete`,
      update: `${dbUrl}/recipes/update`
    },
    ingredients: {
      list: `${dbUrl}/ingredients`,
      get: (id) => `${dbUrl}/ingredients/${id}`,
      create: `${dbUrl}/ingredients/create`,
      update: `${dbUrl}/ingredients/update`,
      delete: `${dbUrl}/ingredients/delete`
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

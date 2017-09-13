export const environment = {
  production: true,
  serviceUrls: {
    items: {
      'create': 'http://sample-db-service.flynn.lukasj.org/items/create',
      'delete': 'http://sample-db-service.flynn.lukasj.org/items/delete',
      'getAll': 'http://sample-db-service.flynn.lukasj.org/items'
    },
    lists: {
      'create': 'http://sample-db-service.flynn.lukasj.org/lists/create',
      'delete': 'http://sample-db-service.flynn.lukasj.org/lists/delete',
      'update': 'http://sample-db-service.flynn.lukasj.org/lists/update',
      'get': 'http://sample-db-service.flynn.lukasj.org/lists/',
      'getAll': 'http://sample-db-service.flynn.lukasj.org/lists/',
    },
    listed_item: {
      'create': 'http://sample-db-service.flynn.lukasj.org/list_items/create',
      'delete': 'http://sample-db-service.flynn.lukasj.org/list_items/delete',
      'get': (id) => `http://sample-db-service.flynn.lukasj.org/list_items/${id}`,
      'getAll': 'http://sample-db-service.flynn.lukasj.org/list_items/'
    },
    recipes: {
      'create': 'http://sample-db-service.flynn.lukasj.org/recipes/create',
      'list': 'http://sample-db-service.flynn.lukasj.org/recipes',
      'get': (id) => `http://sample-db-service.flynn.lukasj.org/recipes/${id}`,
      'delete': 'http://sample-db-service.flynn.lukasj.org/recipes/delete',
      'update': 'http://sample-db-service.flynn.lukasj.org/recipes/update'
    },
    ingredients: {
      'list': 'http://sample-db-service.flynn.lukasj.org/ingredients',
      'get': (id) => `http://sample-db-service.flynn.lukasj.org/ingredients/${id}`,
      'create': `http://sample-db-service.flynn.lukasj.org/ingredients/create`,
      'update': `http://sample-db-service.flynn.lukasj.org/ingredients/update`,
      'delete': `http://sample-db-service.flynn.lukasj.org/ingredients/delete`
    },
    recipe_ingredients: {
      'list': 'http://sample-db-service.flynn.lukasj.org/recipe_ingredients',
      'list_for': (id) => `http://sample-db-service.flynn.lukasj.org/recipe_ingredients/${id}`,
      'create': 'http://sample-db-service.flynn.lukasj.org/recipe_ingredients/create',
      'update': 'http://sample-db-service.flynn.lukasj.org/recipe_ingredients/update',
      'delete': 'http://sample-db-service.flynn.lukasj.org/recipe_ingredients/delete'
    }
  }
};

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
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
      'list': 'http://sample-db-service.flynn.lukasj.org/recipes'
    },
    ingredients: {
      'list': 'http://sample-db-service.flynn.lukasj.org/ingredients',
      'get': (id) => `http://sample-db-service.flynn.lukasj.org/ingredients/${id}`
    }
  }
};

import algoliasearch from 'algoliasearch/lite';
import { autocomplete, getAlgoliaResults } from '@algolia/autocomplete-js';
import { ProductCard } from '../ecommerce/components/productCard/ProductCard';

const searchClient = algoliasearch(
  'S0ZM5LSE19',
  '08a7fdbe34b03a844600cf26665b56f0'
);

const autocompleteSearch = autocomplete({
  container: '#container_search',
  getSources() {
    return [
      {
        sourceId: 'querySuggestions',
        getItemInputValue: ({ item }) => item.query,
        getItems({ query }) {
          return getAlgoliaResults({
            searchClient,
            queries: [
              {
                indexName: 'dev_ecommerce',
                query
              },
            ],
          });
        },
        templates: {
          item({ item, components }) {
            return  <ProductCard
            key={product.id}
            data={product}
            onOpenModal={handleClickOpenModal}
            addToCart={handleAddToCart}
            addAnAmount={handleAddAnAmount}
            subtractAnAmount={handleSubtractAnAmount}
          />
          },
        },
      },
    ];
  },
});
import React, { createElement } from 'react';
import { getAlgoliaResults } from '@algolia/autocomplete-js';
import algoliasearch from 'algoliasearch';
import { Autocomplete } from './Autocomplete';

import '@algolia/autocomplete-theme-classic';
import { ProductItem } from './ProductItem';

const appId = 'S0ZM5LSE19';
const apiKey = '08a7fdbe34b03a844600cf26665b56f0';
const searchClient = algoliasearch(appId, apiKey);

function App() {
  const selectProduct = (event) => {
    console.log('ups', event)
  };
  return (
    <div className="app-container">
      <Autocomplete
        openOnFocus={true}
        placeholder= 'Buscar producto ...'
        onSubmit={ ()=>selectProduct() }
        getSources={({ query }) => [
          {
            sourceId: 'products',
            getItems() {
              return getAlgoliaResults({
                searchClient,
                queries: [
                  {
                    indexName: 'dev_ecommerce',
                    query,
                  },
                ],
              });
            },
            templates: {
              // item({ item, components }) {
              //   return <ProductItem hit={item} components={components} />;
              // },
              item({ item, components, html }) {
                return html`<div class="aa-ItemWrapper">
                  <div class="aa-ItemContent">
                    <div class="aa-ItemIcon">
                      <img
                        src="${item.image}"
                        alt="${item.title}"
                        width="40"
                        height="40"
                      />
                    </div>
                    <div class="aa-ItemContentBody">
                      <div class="aa-ItemContentTitle">
                        ${components.Highlight({ hit: item, attribute: 'title' })}
                      </div>
                    </div>
                  </div>
                  <div class="aa-ItemActions">
                    <button
                      class="aa-ItemActionButton aa-DesktopOnly aa-ActiveOnly"
                      type="button"
                      title="Select"
                    >
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                        <path
                          d="M18.984 6.984h2.016v6h-15.188l3.609 3.609-1.406 1.406-6-6 6-6 1.406 1.406-3.609 3.609h13.172v-4.031z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>`;
              },
            },
          },
        ]}
      />
    </div>
  );
}

export default App;

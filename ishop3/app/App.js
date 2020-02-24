'use strict';

const React = require('react');
const ReactDOM = require('react-dom');

const ProductTable = require('../components/ProductTable');

const shopItems = require('./shopItems.json');

// данные для заполнения в компоненте
let shopName = 'ishop2';
// Класс для стилизации таблицы
let tableStylingClass = 'ProductTable';

ReactDOM.render(
  <ProductTable
    tableClassName={tableStylingClass}
    shopName={shopName}
    items={shopItems}
  />
  , document.getElementById('container')
);

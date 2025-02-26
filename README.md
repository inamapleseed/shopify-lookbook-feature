# Shopify Lookbook Feature

## Overview
This implementation enables a fully native Lookbook feature for a Shopify store using metaobjects. 
It allows merchants to create curated product collections that can be displayed on any page via customizable sections, 
as well as automatically on product pages when products are included in lookbooks.

## Technical Implementation

### Metaobject Schema Configuration
The solution uses Shopify's native metaobject system to create a "Lookbook" schema with the following attributes:
- **Title**: Text field for the lookbook name
- **Description**: Rich text field for lookbook description
- **Products List**: List of product references that appear in the lookbook

### Code Structure
- **sections/lookbook.liquid**: Main section template for displaying lookbooks
- **main-product.liquid**: Modified product template with lookbook integration
- **snippets/lookbook-product-display.liquid**: Reusable component for consistent lookbook rendering
- **lookbook.css**: Styling for lookbook components
- **lookbook.js**: Interactive functionality for lookbook displays

### Key Features

#### Lookbook Theme Sections
- Configurable section that can be added to any page through the theme customizer
- Option to select which lookbook to display from available metaobjects

#### Product Page Integration
- Automatic detection of lookbooks containing the current product
- Configurable checkbox in product template settings to enable/disable related lookbooks
- Consistent styling between standalone lookbook sections and product page lookbooks

## Installation Guide

### 1. Metaobject Configuration
1. In Shopify Admin, navigate to Settings > Custom data > Metaobjects
2. Create a new definition named "Lookbook"
3. Add the following fields:
   - Title: Single-line text field
   - Description: Rich text field
   - Products List: List of product references
4. Save the metaobject definition

### 2. Creating Lookbooks
1. Go to Content > Metaobjects
2. Click "Add Lookbook"
3. Fill in the title and description
4. Add products to the Products List
5. Save the lookbook

### 3. Adding Lookbook Sections
1. In the Theme Editor, select a page to customize
2. Click "Add section" and select "Lookbook"
3. Configure section settings:
   - Select the lookbook content to display
4. Save changes

### 4. Product Page Configuration
1. In the Theme Editor, navigate to the product template
2. Find the "Show Related Lookbook" setting and enable it
3. Save changes

## Technical Details

### Metaobject Querying
The implementation uses Liquid to query and filter metaobjects efficiently:

```liquid
{% assign lookbooks = shop.metaobjects.lookbook.values %}
```

### Product Retrieval From Metaobject References
One significant challenge when working with shopify metaobjects is converting product GIDs (Global IDs) back into renderable product objects. 
The implementation solves this by iterating through all products in the store until finds all matches:

```liquid
{%- for product_gid in lookbook_product_gids -%}
  {% assign product_found = false %}

  {%- for item in collections.all.products -%}
    {% if product_found == false %}
      {% assign item_id = 'gid://shopify/Product/' | append: item.id %}
  
      {% if item_id == product_gid %}
        {% include 'lookbook-product-display' %}
        {% assign product_found = true %}
      {% endif %}
    {% endif %}
  {%- endfor -%}
{%- endfor -%}

---

This implementation adheres to the requirement of using only native Shopify features while providing a robust, maintainable, and user-friendly lookbook solution.

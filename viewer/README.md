# How to embed the Trillion 3D Viewer on a Shopify site?

## Prerequisites

- You have an account on the Trillion Dashboard
- You have purchased a package that includes the 3D Viewer (3D Viewer or Try-on + 3D Viewer)
- You have at least one product that has "Done" status and has been published.

## To embed the Viewer on your site, you need to do the following

1. Add an image of your product as a thumbnail for the viewer
2. Add a code snippet
3. Set your Activation key
4. Edit trillion_viewer.liquid regarding your theme
5. Choose how to get the SKU
6. Connect a snippet to your theme

Let's take a closer look at each step below:

## 1. Add an image of your product as a thumbnail for the viewer

- Go to “Products” -> Choose a product where 3D model exists

![Products](./_img/1.png)

- Add an image that will be a thumbnail for your 3D viewer slide

## 2. Add a code snippet

You need to copy the snippet file `trillion_viewer.liquid` to the snippets folder

- Go to the Shopify admin panel, select Online Store → Themes → Click three dots → Edit code

![Admin panel](./_img/2.png)

- Click "Add a new snippet"

![Add snippet](./_img/3.png)

- In the popup window, you enter `trillion_viewer`

![Add snippet popup](./_img/4.png)

- Download the [trillion_viewer.liquid](./trillion_viewer.liquid "Go to file") file and copy its contents

- Paste it into the snippet file you just created in the Shopify code editor (page.trillion_viewer.liquid)

## 3. Set your Activation key

- Go to [Trillion Dashboard/Integration](https://dashboard.trillion.jewelry/integration "Go to dashboard")
- Click "Add a hostname"

![Integration start](./_img/5.png)

- Enter your site hostname and click "Add"

![Integration add](./_img/6.png)

- Click the "Copy key" button in the Activation key section

![Integration copy key](./_img/7.png)

- Set your Activation key at line 19

![Paste template content](./_img/8.png)

- Press "Save"

## 4. Edit trillion_viewer.liquid regarding your theme

If your theme use flickity-slider, you can skip this step and go to part 5.

- Go to the web page of a product where you added a thumbnail in step 1.a -> Open developer panel (CTRL + F12 on Windows or F12 on Mac) -> And find the class of a component, which is a wrapper for a gallery slides. In my theme, this class name is `product__media-list` (you will most likely have the same class if your site does not use a custom slider, so you can leave it unchanged and skip part 4)

![Find wrapper class](./_img/9.png)

- Go to Edit Code -> Assets -> trillion_viewer.js.liquid and change this part (line 46) to your class in the way to choose the last element of wrapped components

![Edit wrapper class](./_img/10.png)

- Press "Save"

## 5. Choose how to get the SKU

You need to choose a method of getting the SKU, it depends on what you specify in the SKU field in the product card in the Trillion Dashboard.

1. Get SKU from Product SKU field. If you use SKU field in your Shopify product.
`{{ product.selected_or_first_available_variant.sku }}` (default)
2. Get SKU from url `url.slice(url.lastIndexOf('/') + 1)`. If you don't use SKU field, you can use product name from url.

If you prefer method 2, you need to do some changes in `trillion_viewer.liquid`.

- Comment line 26
- Uncomment line 29

## 6. Connect a snippet to your theme

- In the Shopify Code editor, go to Layout -> theme.liquid and add this line right before closing `</body>` tag

```liquid
  {%- if request.page_type == 'product' -%}
    {%- render 'trillion_viewer' -%}
  {%- endif -%}
```

![Connect snippet](./_img/11.png)

## Result

As a result, you should see an additional slide in the product card. Click on it. If this product is present in the Trillion database and it has a 3D model, a 3D viewer should appear instead of a picture.

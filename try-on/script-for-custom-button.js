const trillionTryonPage = 'trillion-tryon';

const url = document.location.pathname;
// get the sku from the url, it should be the same as in the Trillion dashboard
const jewelryId = url.slice(url.lastIndexOf('/') + 1);

// if you use sku field in product, you can use this
// const jewelryId = "{{ product.selected_or_first_available_variant.sku }}";

const arButton = document.querySelector("YOUR-BUTTON");

if (await checkJewelryExists()) {
  arButton.style.display = 'block';
}

arButton.addEventListener("click", () => {
  goToIntegrationTryon();
});

function goToIntegrationTryon() {
  const url = new URL(`${window.location.origin}/pages/${trillionTryonPage}`);
  url.searchParams.append('sku', jewelryId);
  window.open(url, "_blank").focus();
}

async function checkJewelryExists() {
  const response = await fetch(
    `https://dashboard.trillion.jewelry/api/trillionwebapp/publication-status/${jewelryId}`,
    {
      method: "GET",
    }
  );

  const data = await response.json();
  if (data.isPublishedWebSDK) {
    return true;
  } else {
    throw new Error("[Trillion AR Widget] Product is not published");
  }
}
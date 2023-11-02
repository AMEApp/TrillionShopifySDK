const trillionTryonPage = 'trillion-tryon';
const jewelryId = '{{ product.selected_or_first_available_variant.sku }}';
const arButton = document.querySelector(".trillion-ar-button");

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
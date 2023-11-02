import { TrillionViewerApp } from "https://unpkg.com/trillion-viewer@0.19.2/build-lib/trillion-viewer.js"

// \/ PASTE YOUR KEY HERE \/
const activationKey = 'PASTE_YOUR_ACTIVATION_KEY_HERE'
// /\ PASTE YOUR KEY HERE /\

const jewelryId = "{{ product.selected_or_first_available_variant.sku }}";

await checkJewelryExists()
trillionViewerInit()

async function checkJewelryExists() {
  const response = await fetch(`https://dashboard.trillion.jewelry/api/trillionwebapp/publication-status/${jewelryId}`, {
    method: "GET",
    headers: {
      "Accept": "application/json",
    }
  })
  const data = await response.json()
  if (!data.isPublishedWebSDK) {
    throw new Error('[Trillion 3D Viewer] Product is not published')
  }
}

function trillionViewerInit() {
  const galleryList = document.querySelector('.product__media-list li:last-of-type')
  galleryList.innerHTML = '<div id="trillion-viewer"></div>'

  const viewerElem = document.getElementById('trillion-viewer')
  const trillionViewer = new TrillionViewerApp()

  trillionViewer.init(viewerElem)
  trillionViewer.setServiceActivationKey(activationKey)
  trillionViewer.setJewelryID(jewelryId)
  trillionViewer.refresh()
}
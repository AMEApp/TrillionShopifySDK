import { TrillionWidgetApp } from "https://unpkg.com/trillion-widget@0.19.2/build-lib/trillion-widget.js"

// \/ PASTE YOUR KEY HERE \/
const activationKey = 'PASTE_YOUR_ACTIVATION_KEY_HERE'
// /\ PASTE YOUR KEY HERE /\

const elem = document.querySelector('#trillion-widget')
export const trillionWidget = new TrillionWidgetApp()
trillionWidget.init(elem)
trillionWidget.setServiceActivationKey(activationKey)
const urlParams = new URLSearchParams(window.location.search);
const jewelryId = urlParams.get('sku')
if (jewelryId) {
  trillionWidget.setJewelryId(jewelryId)
}
trillionWidget.refresh()

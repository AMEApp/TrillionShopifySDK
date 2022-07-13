// AR Button
const productOverlay = document.querySelector('.product__overlay');
const arButton = document.querySelector('#ar')
const arPopup = document.querySelector('#arPopup');
const arPopupClose = document.querySelector('#ar__container-close');
const demoIframe = document.createElement("iframe");
const url = document.location.pathname
const jewelryId = url.substr(url.lastIndexOf('/') + 1);
const body = document.querySelector('body')

function prepareIFrame() {
  demoIframe.setAttribute("src", `https://master.widget.develop.trillion.jewelry/?id=${jewelryId}`);
  demoIframe.style.width = "100%"
  demoIframe.style.height = "100%"
  demoIframe.style.border = "none"
  demoIframe.style.display = "block"
  demoIframe.style.position = "fixed"
  demoIframe.style.top = "0"
  demoIframe.style.left = "0"
  demoIframe.setAttribute('allow','camera')
  arPopup.appendChild(demoIframe)
}

if (arButton) {
  arButton.addEventListener('click', (event) => {
    productOverlay.classList.add('product__overlay-visible')
    arPopup.classList.add('product__card-ar-popup-visible')
    prepareIFrame()
    body.style.overflowY = 'hidden'
  });
}


if (arPopupClose) {
  arPopupClose.addEventListener('click', (event) => {
    let iframes = document.querySelectorAll('iframe');
    for (let i = 0; i < iframes.length; i++) {
      iframes[i].parentNode.removeChild(iframes[i]);
    }
    productOverlay.classList.remove('product__overlay-visible')
    arPopup.classList.remove('product__card-ar-popup-visible')
    body.style.overflowY = 'unset'
  });
}

if (productOverlay) {
  productOverlay.addEventListener('click', (event) => {
    let iframes = document.querySelectorAll('iframe');
    for (let i = 0; i < iframes.length; i++) {
      iframes[i].parentNode.removeChild(iframes[i]);
    }
    productOverlay.classList.remove('product__overlay-visible')
    arPopup.classList.remove('product__card-ar-popup-visible')
    body.style.overflowY = 'unset'
  })
}

// Jewelry Exist
function jewelryExists(handle) {
  const data = {
    "data": { id: handle, rootCollectionName: "AppData4" }
  };
  fetch(`https://us-central1-trillionprod.cloudfunctions.net/jewelryExists`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Cache-Control": "no-cache"
    },
    body: JSON.stringify(data),
  })
    .then(response => {
      return response.json();
    })
    .then(data => {
      if (data.result) {
        arButton.style.display = "block";
      }
    })
}

jewelryExists(jewelryId)

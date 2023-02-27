import { TrillionViewerApp } from "https://unpkg.com/trillion-viewer@0.7.0/build-lib/trillion-viewer.js"

function trillionViewerInit(jewelryId) {
  let galleryList = document.querySelector('.product__media-list li:last-of-type')
  galleryList.innerHTML = '<div id="trillion-viewer"></div>'
  
  const viewerElem = document.getElementById('trillion-viewer')
  const trillionViewer = new TrillionViewerApp()
  
  trillionViewer.init(viewerElem)
  trillionViewer.setJewelryID(jewelryId)
  trillionViewer.refresh()
}

const jewelryExists = (function() {
  const url = document.location.pathname
  const jewelryId = url.substr(url.lastIndexOf('/') + 1)
  
  
  const query = function(jewelryId) {
    const data = {
        "data": { id: jewelryId }
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
                trillionViewerInit(jewelryId)
            }
        })
  }
  return query()
}) 

jewelryExists()

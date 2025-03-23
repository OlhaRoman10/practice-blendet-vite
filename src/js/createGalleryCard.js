export function createGalleryCard(images) {
 return images
    .map(
      ({ alt_description, urls: { small } }) => 
        `<li class="gallery-item">
      <img src="${small}" class="gallery-img"
      alt="${alt_description}">
    </li>`
    )
    .join("");
}

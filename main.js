let searchForm = document.querySelector("#search-form");
let searchBox = document.querySelector("#search-box");
let searchResult = document.querySelector("#search-result");
let showMoreBtn = document.querySelector("#show-more-btn");

let keyword = "";
let page = 1;

const accessKey = "V_C8oN0yBEhHA61Z3S4hplV39t_kagjDP5aKkeQHE50";

async function searchImage() {
  keyword = searchBox.value;
  const URL =
    "https://api.unsplash.com/search/photos?page=" +
    page +
    "&query=" +
    keyword +
    "&client_id=" +
    accessKey +
    "&per_page=12";
  const response = await fetch(URL);
  const data = await response.json();

  if (page === 1) {
    searchResult.innerHTML = "";
  }

  const results = data.results;

  results.map((result) => {
    const image = document.createElement("img");
    image.src = result.urls.small;
    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";

    imageLink.appendChild(image);
    searchResult.appendChild(imageLink);
  });

  showMoreBtn.style.display = "block";
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  page = 1;
  searchImage();
});

showMoreBtn.addEventListener("click", () => {
  page++;
  searchImage();
});

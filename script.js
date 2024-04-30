// Get HTML elements
const searchInput = document.getElementById("search-input");
const searchResults = document.getElementById("search-results");
const pageNumber = document.getElementById("page-number");
const searchBox = document.getElementById("search-box");
const inputBox = document.getElementById("input-box");
const heading = document.getElementById("heading");

// Set initial page and page size
let currentPage = 1;
const pageSize = 50;
const maxPages = 50;

// Fetch and display NASA images
async function fetchAndDisplayNASAImages(query = "moon") {
  const response = await fetch(
    `https://images-api.nasa.gov/search?q=${query}&media_type=image&page=${currentPage}&page_size=${pageSize}`
  );
  const data = await response.json();

  // Clear previous search results
  searchResults.innerHTML = "";

  // Create and append new search result elements
  data.collection.items.forEach((item) => {
    const resultElement = document.createElement("div");
    resultElement.classList.add(
      "bg-white",
      "rounded-lg",
      "shadow-md",
      "overflow-hidden",
      "transition-all",
      "duration-300",
      "transform",
      "hover:scale-105",
      "cursor-pointer"
    );

    const imageElement = document.createElement("img");
    imageElement.src = item.links[0].href;
    imageElement.alt = item.data[0].title;
    imageElement.classList.add("w-full", "h-48", "object-cover");

    const contentElement = document.createElement("div");
    contentElement.classList.add("p-5");

    const titleElement = document.createElement("h2");
    titleElement.textContent = item.data[0].title;
    titleElement.classList.add(
      "text-lg",
      "font-bold",
      "mb-2",
      "max-h-20",
      "title-fix"
    );

    contentElement.appendChild(titleElement);
    resultElement.appendChild(imageElement);
    resultElement.appendChild(contentElement);
    searchResults.appendChild(resultElement);
  });

  // Get previous and next buttons
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");

  // Update disabled state of previous and next buttons
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled =
    currentPage === maxPages ||
    data.collection.metadata.total_hits <= currentPage * pageSize;

  // Update page number display
  pageNumber.textContent = `Page ${currentPage} of ${Math.min(
    maxPages,
    Math.ceil(data.collection.metadata.total_hits / pageSize)
  )}`;
}

// Get previous and next buttons
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

// Event listener for previous button
prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    fetchAndDisplayNASAImages(searchInput.value.toLowerCase());
  }
});

// Event listener for next button
nextBtn.addEventListener("click", () => {
  if (currentPage < maxPages) {
    currentPage++;
    fetchAndDisplayNASAImages(searchInput.value.toLowerCase());
  }
});

// Initial fetch and display of NASA images
fetchAndDisplayNASAImages();

// Event listener for search input
searchInput.addEventListener("input", async () => {
  currentPage = 1;
  const query = searchInput.value.toLowerCase();
  await fetchAndDisplayNASAImages(query);
});

// Event listener for window scroll
window.addEventListener("scroll", () => {
  console.log(scrollY); // Log the current scroll position

  // Adjust layout based on scroll position
  if (scrollY > 50) {
    searchBox.classList.remove("relative", "flex-col");
    searchBox.classList.add(
      "fixed",
      "flex-row",
      "z-10",
      "top-0",
      "bg-white",
      "p-4"
    );
    heading.classList.remove("mb-6");
    inputBox.classList.remove("mb-6");
    inputBox.classList.add("flex-grow", "max-w-6xl");
    searchInput.classList.remove("max-w-md");
  } else {
    searchBox.classList.add("relative", "flex-col");
    searchBox.classList.remove(
      "fixed",
      "flex-row",
      "z-10",
      "top-0",
      "bg-white",
      "p-4"
    );
    inputBox.classList.remove("flex-grow", "max-w-6xl");
    heading.classList.add("mb-6");
    inputBox.classList.add("mb-6");
    searchInput.classList.add("max-w-md");
  }
});
const modeToggle = document.getElementById("mode-toggle");
const darkElement = document.querySelector("html");

// Toggle dark/light mode
modeToggle.addEventListener("click", () => {
  darkElement.classList.toggle("dark");
  const moonIcon = modeToggle.querySelector(".fa-moon");
  const sunIcon = modeToggle.querySelector(".fa-sun");
  moonIcon.classList.toggle("hidden");
  sunIcon.classList.toggle("hidden");
});

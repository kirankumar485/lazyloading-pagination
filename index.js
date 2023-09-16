const resultsContainer = document.getElementById("results");
let page = 1;
let isLoading = false;

// Function to fetch data from the API
function fetchData() {
  isLoading = true;
  fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`)
    .then((response) => response.json())
    .then((data) => {
      isLoading = false;
      page++;
      data.forEach((post) => {
        const postElement = document.createElement("div");
        postElement.classList.add("post");
        postElement.innerHTML = `
                    <h2>${post.title}</h2>
                    <p>${post.body}</p>
                `;
        resultsContainer.appendChild(postElement);
      });
    })
    .catch((error) => {
      isLoading = false;
      console.error("Error fetching data:", error);
    });
}

// Function to check if the user has scrolled to the bottom of the page
function checkScroll() {
  const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 100 && !isLoading) {
    fetchData();
  }
}

// Initial data load
fetchData();

// Listen for scroll events to trigger lazy loading
window.addEventListener("scroll", checkScroll);

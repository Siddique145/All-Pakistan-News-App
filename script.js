/*//const apikey = "1d81ece110de497f92fcb7ad45fbbd20";
const apikey = "1c910e83eecfd652664edae0971a6656";
const blogcontainer = document.getElementById("blog-container");

async function fetchRandomNews() {
  try {
    //const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apikey=${apikey}`;
    const apiUrl = `https://gnews.io/api/v4/top-headlines?country=pk&category=general&pageSize=5&apikey=${apikey}`;
    const response = await fetch(apiUrl);
    const data = await response.json()
    console.log(data)
    return data.articles

  } 
  catch (error) {
    console.error("Error fetchin from function fetchRandomNews ", error);
    return [];
  }
}

function displayBlogs(articles) {
    blogcontainer.innerHTML = "";
    articles.forEach((article) => {
    const blogCard = document.createElement("div");
    blogCard.classList.add("blog-card");
    const img = document.createElement("img");
    img.src = article.image;
    img.alt = article.title;
    const title = document.createElement("h2");
    title.textContent = article.title;
    const description = document.createElement("p");
    description.textContent = article.description;

    blogCard.appendChild(img);
    blogCard.appendChild(title);
    blogCard.appendChild(description);
    blogcontainer.appendChild(blogCard)
  });
}

(async ()=>{
    try{
        const articles = await fetchRandomNews()
        displayBlogs(articles)
    }
    catch(error){
        console.error("Error Fetching Random News")
    }
})()*/









//const apikey = "1c910e83eecfd652664edae0971a6656";
const apikey = "7a571d9d62f38aa234873087bd9a4a99";
const blogcontainer = document.getElementById("blog-container");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

async function fetchNews(query = "Pakistan") {
  const apiUrl = `https://gnews.io/api/v4/search?q=${query}&country=pk&max=10&token=${apikey}`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
}

function displayBlogs(articles) {
  blogcontainer.innerHTML = "";
  articles.forEach((article) => {
    const blogCard = document.createElement("div");
    blogCard.classList.add("blog-card");
    const img = document.createElement("img");
    img.src = article.image;
    img.alt = article.title;
    const title = document.createElement("h2");
    title.textContent = article.title;
    const description = document.createElement("p");
    description.textContent = article.description;

    blogCard.appendChild(img);
    blogCard.appendChild(title);
    blogCard.appendChild(description);
    blogcontainer.appendChild(blogCard);
  });
}

function showLoading() {
  const loadingDiv = document.createElement("div");
  loadingDiv.classList.add("loading");
  loadingDiv.innerHTML = '<img src="./Hourglass.gif" alt="Loading..." />';
  blogcontainer.appendChild(loadingDiv);
}

async function init() {
  showLoading();
  try {
    const articles = await fetchNews();
    displayBlogs(articles);
  } catch (error) {
    console.error("Error initializing:", error);
  }
}

searchButton.addEventListener("click", async () => {
  const query = searchInput.value.trim();
  if (query !== "") {
    showLoading();
    try {
      const articles = await fetchNews(query);
      displayBlogs(articles);
    } catch (error) {
      console.error("Error searching news:", error);
    }
  }
});

window.addEventListener("DOMContentLoaded", init);

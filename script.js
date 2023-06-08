const newsContainer = document.getElementById('newsContainer');
const heading = document.getElementById('heading');
const categoryLinks = document.querySelectorAll('.category-link');
const pageTitle = document.querySelector('title');
const loadingIndicator = document.getElementById('loadingIndicator');
const loadingSpinner = document.getElementById('loadingSpinner');
const dropdownButton = document.getElementById('dropdownButton');
const dropdownMenu = document.getElementById('dropdownMenu');
const dropdownBox = document.getElementById('dropdownBox');
const endMessage = document.getElementById('endMsg');

const getDummyImageWithText = (text, width, height, backgroundColor, textColor) => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d');

  // Set background color
  context.fillStyle = `#${backgroundColor}`;
  context.fillRect(0, 0, width, height);

  // Set text properties
  const fontSize = Math.floor(height / 5);
  const fontFamily = 'Arial';
  const fontWeight = 'bold';

  context.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
  context.fillStyle = `#${textColor}`;
  context.textAlign = 'center';
  context.textBaseline = 'middle';

  // Position the text in the center of the canvas
  const x = width / 2;
  const y = height / 2;

  // Draw the text
  context.fillText(text, x, y);

  // Convert the canvas to a data URL
  const dataURL = canvas.toDataURL();

  return dataURL;
};

const logoText = "Newzy Newzy";
const dummyLogoImageUrl = getDummyImageWithText(logoText, 300, 200, "e2e8f0", "168eea");

const getImageUrl = (url) => {
  if (url && url.startsWith('http')) {
    return url;
  } else {
    return dummyLogoImageUrl; // Replace with your dummy image URL
  }
};


dropdownButton.addEventListener('mouseenter', ()=> {
  dropdownMenu.classList.remove('hidden');
  dropdownButton.classList.add('open');
});
dropdownBox.addEventListener('mouseleave', ()=> {
  dropdownMenu.classList.add('hidden');
  dropdownButton.classList.remove('open');
});

function formatLocalizedDate(date) {
  return new Date(date).toLocaleString();
}

function limitDescription(description, maxLength) {
  if (description.length > maxLength) {
    return `${description.slice(0, maxLength)}...`;
  }
  return description;
}



const cardsPerPage = 10;
let page = 1;
let isLoading = false;
let totalResults;
let nextPage;

function showLoadingIndicator() {
  loadingIndicator.style.display = 'block';
}

function hideLoadingIndicator() {
  loadingIndicator.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function() {

  var menuButton = document.getElementById('menuButton');
  var menu = document.getElementById('menu');

  function toggleMenu() {
    menu.classList.toggle('hidden');
    menuButton.classList.toggle('open');
  }

  function closeMenu() {
    menu.classList.add('hidden');
    menuButton.classList.remove('open');
  }

  menuButton.addEventListener('click', toggleMenu);

  // Close menu when clicking on a menu link or outside of the menu
  var menuLinks = document.querySelectorAll('.menu-link');
  var body = document.querySelector('body');

  menuLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      closeMenu();
    });
  });

  body.addEventListener('click', function(event) {
    var isMenuClick = menu.contains(event.target);
    var isButtonMenuClick = menuButton.contains(event.target);

    if (!isMenuClick && !isButtonMenuClick) {
      closeMenu();
    }
  });
  
// Assuming you have a separate function to handle the navigation from the About page to a specific category
function navigateToCategory(category) {
  // Remove active class from all category links
  categoryLinks.forEach(function (link) {
    link.classList.remove('active');
  });

  // Add active class to the corresponding category link in the footer
  var selectedFooterLink = document.querySelector('footer .category-link[data-category="' + category + '"]');
  if (selectedFooterLink) {
    selectedFooterLink.classList.add('active');
  }

  // Add active class to the corresponding category link in the navbar
  var selectedNavbarLink = document.querySelector('nav .category-link[data-category="' + category + '"]');
  if (selectedNavbarLink) {
    selectedNavbarLink.classList.add('active');
  }
  
  var selectedNavbarLink = document.querySelector('nav .menu-link[data-category="' + category + '"]');
  if (selectedNavbarLink) {
    selectedNavbarLink.classList.add('active');
  }

  // Update the category variable and display the news for the selected category
  category = category;
  updateNews();
  updateTitle(category);
}

categoryLinks.forEach(function (link) {
  link.addEventListener('click', function (event) {
    event.preventDefault();
    var selectedCategory = this.getAttribute('data-category');
    navigateToCategory(selectedCategory);
  });
});

  
  

});



function updateTitle(category) {
  const categoryText = getCategoryText(category);
  pageTitle.textContent = `${categoryText} - NewzyNewzy.com`;
  heading.textContent = `${categoryText} News`;
}


function getCategoryText(category) {
  // Add logic to return the appropriate text based on the category
  switch (category) {
    case 'top':
      return 'Top';
    case 'business':
      return 'Business';
    case 'entertainment':
      return 'Entertainment';
    case 'health':
      return 'Health';
    case 'science':
      return 'Science';
    case 'sports':
      return 'Sports';
    case 'technology':
      return 'Technology';
    case 'environment':
      return 'Environment';
    case 'food':
      return 'Food';
    case 'politics':
      return 'Politics';
    case 'tourism':
      return 'Tourism';
    case 'world':
      return 'World';
    // Add other cases for each category
    default:
      return 'Top';
  }}



const country = 'pk';
let category = 'top';
const apiKey = window.API_KEY_2;


function updateNews() {
  showLoadingIndicator();

  loadingBar.style.width = '0';

  if (isLoading) return;

  isLoading = true;
  loadingSpinner.style.display = 'block';

  if (page === 1) {
    newsContainer.innerHTML = '';
    endMessage.innerText = '';
  }

  let apiUrl = `https://newsdata.io/api/1/news?apikey=${apiKey}&language=en&country=${country}&category=${category}`;

  if (page !== 1 && nextPage) {
    apiUrl += `&page=${nextPage}`;
  }


  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {

      totalResults = data.totalResults;
      nextPage = data.nextPage;
     

      // Process the news data and generate HTML for each news item
      const newsHTML = data.results
      .slice(0, cardsPerPage)
      .map(news => {
        // Limit the description length
       

        // Format the time
       

        // Function to check and get a valid image URL or use a dummy image
   

        return `
        
          <div class="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden">
            <img class="w-full h-48 object-cover" src="${getImageUrl(news.image_url)}" alt="${news.title}" />

            <div class="px-6 py-4">
              <div class="flex items-center mb-2">
                <span class="inline-block bg-blue-500 text-white text-xs px-2 py-1 uppercase tracking-wide rounded-full mr-2">
                  New
                </span>
                <span class="text-gray-600 text-sm mr-1">&#128340;</span>
                <span class="text-gray-600 text-xs">${formatLocalizedDate(news.pubDate)}</span>
              </div>
          
              <h3 class="text-gray-900 font-bold text-xl mb-2">${limitDescription(news.title, 80)}</h3>
          
              <p class="text-gray-700 text-sm">${limitDescription(news.description, 150)}</p>
            </div>
          
            <div class="px-6 py-4 flex justify-between items-center">
              <div class="flex items-center">
                <span class="inline-block bg-gray-200 text-gray-800 text-xs px-2 py-1 uppercase tracking-wide rounded-full">
                  ${news.source_id}
                </span>
              </div>
          
              <a href="${news.link}" target="_blank">
                <button class="text-blue-500 text-sm font-medium hover:text-blue-700 transition duration-200 ease-in-out">
                  Read More
                </button>
              </a>
            </div>
          </div>
        `;
      });

      // Append the news HTML to the newsContainer element
      newsContainer.insertAdjacentHTML('beforeend', newsHTML.join(''));
      hideLoadingIndicator();

      isLoading = false;
      loadingSpinner.style.display = 'none';

      const totalShown = page * cardsPerPage;
      if (totalShown >= totalResults) {
        showEndMessage();
      }

if (nextPage) {
  page++;
  if (page <= Math.ceil(totalResults / cardsPerPage)) {
    window.addEventListener('scroll', handleScroll);
  } else {
    window.removeEventListener('scroll', handleScroll);
  }
}

    })
    .catch(error => {
      console.log('Error fetching news:', error);
      hideLoadingIndicator();

      isLoading = false;
      loadingSpinner.style.display = 'none';

    });
}

function showEndMessage() {
 
  endMessage.textContent = 'End of news articles.';
}


categoryLinks.forEach(function (link) {
  link.addEventListener('click', function (event) {
    event.preventDefault();
    category = this.getAttribute('data-category');
    page = 1; // Reset the page count
    updateNews();
    updateTitle(category);
  });
});

function handleScroll() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 100) {
    showLoadingIndicator();
    window.removeEventListener('scroll', handleScroll);
    updateNews();
  }
}



// Initial fetch and update
updateNews();





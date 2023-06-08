const topContainer = document.getElementById('topContainer');
const cardContainer = document.getElementById('cardContainer');
const cardContainer2 = document.getElementById('cardContainer2');
const cardContainer3 = document.getElementById('cardContainer3');
const topCard = document.getElementById('topCard');
const newsList = document.getElementById('newsList');
const cardContainer4 = document.getElementById('cardContainer4');
const cardContainer5 = document.getElementById('cardContainer5');
const topCard2 = document.getElementById('topCard2');
const newsList2 = document.getElementById('newsList2');
const welcomeModal = document.getElementById('welcomeModal');
const closeModalButton = document.getElementById('closeModalButton');

const loadingIndicator = document.getElementById('loadingIndicator');
const loadingSpinner = document.getElementById('loadingSpinner');


const country = 'pk';
let category = 'top';
let category2 = 'world';
let category3 = 'entertainment';
let category4 = 'technology';
let category5 = 'sports';
const apiKey = window.API_KEY_1;
let isLoading = false;

function showLoadingIndicator() {
  loadingIndicator.style.display = 'block';
}

function hideLoadingIndicator() {
  loadingIndicator.style.display = 'none';
}

function limitDescription(description, maxLength) {
  if (description.length > maxLength) {
    return `${description.slice(0, maxLength)}...`;
  }
  return description;
}

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
    
    
  

function updateNews() {

  

  
 
  
    let apiUrl = `https://newsdata.io/api/1/news?apikey=${apiKey}&language=en&country=${country}&category=${category}`;
   
    // if (page !== 1 && nextPage) {
    //   apiUrl += `&page=${nextPage}`;
    // }
  
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
  
        // totalResults = data.totalResults;
        // nextPage = data.nextPage;
       
  
        // Process the news data and generate HTML for each news item
        const newsCard = data.results
        .slice(4, 10)
        .map(news => {
          // Limit the description length
          const limitedDescription = news.description.length > 100
            ? `${news.description.slice(0, 100)}...`
            : news.description;
  
        
      
  
          return `
          
          <div class="flex-shrink max-w-full w-full sm:w-1/3 px-3 pb-3 pt-3 sm:pt-0 border-b-2 sm:border-b-0 border-dotted border-gray-100">
              <div class="flex flex-row sm:block hover-img">
                <a href="${news.link}" target="blank">
                  <img class="max-w-full w-full mx-auto" src="${getImageUrl(news.image_url)}" alt="alt title">
                </a>
                <div class="py-0 sm:py-3 pl-3 sm:pl-0">
                
                  <h3 class="text-lg font-bold leading-tight mb-2">
                    <a href="${news.link}" target="blank">
                    ${limitDescription(news.title, 70)}</a>
                  </h3>
                  <p class="hidden md:block text-gray-600 leading-tight mb-1">${limitedDescription}</p>
                  <a class="text-gray-500" href="#"><span class="inline-block h-3 border-l-2 border-red-600 mr-2"></span>${news.source_id}</a>
                </div>
              </div>
            </div>

          `;
        //   return `
          
        //   <div class="flex-shrink max-w-full w-full sm:w-1/3 px-3 pb-3 pt-3 sm:pt-0 border-b-2 sm:border-b-0 border-dotted border-gray-100">
        //       <div class="flex flex-row sm:block hover-img">
        //         <a href="${news.link}" target="blank">
        //           <img class="max-w-full w-full mx-auto" src="${getImageUrl(news.image_url)}" alt="alt title">
        //         </a>
        //         <div class="py-0 sm:py-3 pl-3 sm:pl-0">
        //           <h3 class="text-lg font-bold leading-tight mb-2">
        //             <a href="${news.image_url}" target="blank">
        //             ${news.title}</a>
        //           </h3>
        //           <p class="hidden md:block text-gray-600 leading-tight mb-1">${limitedDescription}</p>
        //           <a class="text-gray-500" href="#"><span class="inline-block h-3 border-l-2 border-red-600 mr-2"></span>${news.source_id}</a>
        //         </div>
        //       </div>
        //     </div>

        //   `;
        });


    // Generate HTML markup for the first news item
    const newsHTML = `
    <div class="flex flex-row flex-wrap">
  <!--Start left cover-->
  <div class="flex-shrink max-w-full w-full lg:w-1/2 pb-1 lg:pb-0 lg:pr-1">
    <div class="relative hover-img max-h-98 overflow-hidden">
      <a href="${data.results[0].link}" target="blank">
        <img class="max-w-full w-full mx-auto h-auto" src="${getImageUrl(data.results[0].image_url)}" alt="${data.results[0].title}">
      </a>
      <div class="absolute px-5 pt-8 pb-5 bottom-0 w-full bg-gradient-cover">
        <a href="${data.results[0].link}" target="blank">
          <h2 class="text-xl md:text-3xl font-bold capitalize text-white mb-3">${limitDescription(data.results[0].title, 60)}</h2>
        </a>
        <p class="text-gray-100 hidden sm:inline-block">${data.results[0].description.slice(0, 150)}</p>
        <div class="pt-2">
          <div class="text-gray-100"><div class="inline-block h-3 border-l-2 border-red-600 mr-2"></div>${data.results[0].source_id}</div>
        </div>
      </div>
    </div>
  </div>

  <!--Start box news-->
  <div class="flex-shrink max-w-full w-full lg:w-1/2">
    <div class="box-one flex flex-row flex-wrap">
      <article class="flex-shrink max-w-full w-full sm:w-1/2">
        <div class="relative hover-img max-h-48 overflow-hidden">
          <a href="${data.results[1].link}" target="blank">
            <img class="max-w-full w-full mx-auto h-auto" src="${getImageUrl(data.results[1].image_url)}" alt="${data.results[1].title}">
          </a>
          <div class="absolute px-4 pt-7 pb-4 bottom-0 w-full bg-gradient-cover">
            <a href="${data.results[1].link}" target="blank">
              <h2 class="text-lg font-bold capitalize leading-tight text-white mb-1">${limitDescription(data.results[1].title, 60)}</h2>
            </a>
            <div class="pt-1">
              <div class="text-gray-100"><div class="inline-block h-3 border-l-2 border-red-600 mr-2"></div>${data.results[1].source_id}</div>
            </div>
          </div>
        </div>
      </article>
      <article class="flex-shrink max-w-full w-full sm:w-1/2">
        <div class="relative hover-img max-h-48 overflow-hidden">
          <a href="${data.results[2].link}" target="blank">
            <img class="max-w-full w-full mx-auto h-auto" src="${getImageUrl(data.results[2].image_url)}" alt="${data.results[2].title}">
          </a>
          <div class="absolute px-4 pt-7 pb-4 bottom-0 w-full bg-gradient-cover">
            <a href="${data.results[2].link}" target="blank">
              <h2 class="text-lg font-bold capitalize leading-tight text-white mb-1">${limitDescription(data.results[2].title, 60)}</h2>
            </a>
            <div class="pt-1">
              <div class="text-gray-100"><div class="inline-block h-3 border-l-2 border-red-600 mr-2"></div>${data.results[2].source_id}</div>
            </div>
          </div>
        </div>
      </article>
      <article class="flex-shrink max-w-full w-full sm:w-1/2">
        <div class="relative hover-img max-h-48 overflow-hidden">
          <a href="${data.results[3].link}"target="blank">
            <img class="max-w-full w-full mx-auto h-auto" src="${getImageUrl(data.results[3].image_url)}" alt="${data.results[3].title}">
          </a>
          <div class="absolute px-4 pt-7 pb-4 bottom-0 w-full bg-gradient-cover">
            <a href="${data.results[3].link}"target="blank">
              <h2 class="text-lg font-bold capitalize leading-tight text-white mb-1">${limitDescription(data.results[3].title, 60)}</h2>
            </a>
            <div class="pt-1">
              <div class="text-gray-100"><div class="inline-block h-3 border-l-2 border-red-600 mr-2"></div>${data.results[3].source_id}</div>
            </div>
          </div>
        </div>
      </article>
      <article class="flex-shrink max-w-full w-full sm:w-1/2">
        <div class="relative hover-img max-h-48 overflow-hidden">
          <a href="${data.results[4].link}" target="blank">
            <img class="max-w-full w-full mx-auto h-auto" src="${getImageUrl(data.results[4].image_url)}" alt="${data.results[4].title}">
          </a>
          <div class="absolute px-4 pt-7 pb-4 bottom-0 w-full bg-gradient-cover">
            <a href="${data.results[4].link}" target="blank">
              <h2 class="text-lg font-bold capitalize leading-tight text-white mb-1">${limitDescription(data.results[4].title, 60)}</h2>
            </a>
            <div class="pt-1">
              <div class="text-gray-100"><div class="inline-block h-3 border-l-2 border-red-600 mr-2"></div>${data.results[4].source_id}</div>
            </div>
          </div>
        </div>
      </article>
    </div>
  </div>
</div>
      
    `;
    
    // Append the news HTML to the newsContainer element
    topContainer.insertAdjacentHTML('beforeend', newsHTML);

    
    
        // Append the news HTML to the newsContainer element
        cardContainer.insertAdjacentHTML('beforeend', newsCard.join(''));
   
       
  
  //       const isModalShown = localStorage.getItem('isModalShown');
  
  // if (!isModalShown) {
  //   welcomeModal.style.display = 'block';
  //   localStorage.setItem('isModalShown', true);
  // }
  
  // closeModalButton.addEventListener('click', function() {
  //   welcomeModal.style.display = 'none';
  // });
  
  
      })
      .catch(error => {
        console.log('Error fetching news:', error);
     
  
      });
 
  }


function updateNews2() {


  

  
 
  
        let apiUrl2 = `https://newsdata.io/api/1/news?apikey=${apiKey}&language=en&country=${country}&category=${category2}`;
  
    // if (page !== 1 && nextPage) {
    //   apiUrl += `&page=${nextPage}`;
    // }
  
  
    fetch(apiUrl2)
      .then(response => response.json())
      .then(data => {
  
        // totalResults = data.totalResults;
        // nextPage = data.nextPage;
        
  
        // Process the news data and generate HTML for each news item
        let newsCard2 = data.results
        .slice(0, 8)
        .map(news => {
          // Limit the description length
          const limitedDescription = news.description.length > 100
            ? `${news.description.slice(0, 100)}...`
            : news.description;
  
  
  
          return `
          
     

          <div class="flex-shrink max-w-full w-full sm:w-1/3 lg:w-1/4 px-3 pb-3 pt-3 sm:pt-0 border-b-2 sm:border-b-0 border-dotted border-gray-100">
          <div class="flex flex-row sm:block hover-img">
            <a href="${news.link}" target="blank">
              <img class="max-w-full w-full mx-auto" src="${getImageUrl(news.image_url)}" alt="${news.title}">
            </a>
            <div class="py-0 sm:py-3 pl-3 sm:pl-0">
              <h3 class="text-lg font-bold leading-tight mb-2">
                <a href="${news.link}" target="blank">${limitDescription(news.title, 70)}</a>
              </h3>
              <p class="hidden md:block text-gray-600 leading-tight mb-1">${limitedDescription}</p>
              <a class="text-gray-500" href="${news.link}"><span class="inline-block h-3 border-l-2 border-red-600 mr-2"></span>${news.source_id}</a>
            </div>
          </div>
        </div>`;
 
        });

        

      
        
    
        
   
    
    // Function to check and get a valid image URL or use a dummy image
    // const getImageUrl = (url) => {
    //   if (url && url.startsWith('http')) {
    //     return url;
    //   } else {
    //     return dummyLogoImageUrl; // Replace with your dummy image URL
    //   }
    // };

    
    // Generate HTML markup for the first news item
    // const newsHTML =`
    // `;
    
    // Append the news HTML to the newsContainer element
    // topContainer.insertAdjacentHTML('beforeend', newsHTML);

    
    
        // Append the news HTML to the newsContainer element
        cardContainer2.insertAdjacentHTML('beforeend', newsCard2.join('') );

        
   
       
  
  //       const isModalShown = localStorage.getItem('isModalShown');
  
  // if (!isModalShown) {
  //   welcomeModal.style.display = 'block';
  //   localStorage.setItem('isModalShown', true);
  // }
  
  // closeModalButton.addEventListener('click', function() {
  //   welcomeModal.style.display = 'none';
  // });
  
  
      })
      .catch(error => {
        console.log('Error fetching news:', error);
     
  
      });
 
  }
function updateNews3() {

  

  
 
  
        let apiUrl3 = `https://newsdata.io/api/1/news?apikey=${apiKey}&language=en&country=${country}&category=${category3}`;
  
    // if (page !== 1 && nextPage) {
    //   apiUrl += `&page=${nextPage}`;
    // }
  
  
    fetch(apiUrl3)
      .then(response => response.json())
      .then(data => {
  
        // totalResults = data.totalResults;
        // nextPage = data.nextPage;
        
  
        // Process the news data and generate HTML for each news item
        let newsCard3 = data.results
        .slice(1, 7)
        .map(news => {
          // Limit the description length
          const limitedDescription = news.description.length > 100
            ? `${news.description.slice(0, 100)}...`
            : news.description;
  

  
          return `
          
     

          <div class="flex-shrink max-w-full w-full sm:w-1/3 lg:w-1/3 px-3 pb-3 pt-3 sm:pt-0 border-b-2 sm:border-b-0 border-dotted border-gray-100">
              <div class="flex flex-row sm:block hover-img">
                <a href="${news.link}"  target="blank">
                  <img class="max-w-full w-full mx-auto" src="${getImageUrl(news.image_url)}" alt="${news.title}">
                </a>
                <div class="py-0 sm:py-3 pl-3 sm:pl-0">
                  <h3 class="text-lg font-bold leading-tight mb-2">
                    <a href="${news.link}"  target="blank">${limitDescription(news.title, 70)}</a>
                  </h3>
                  <p class="hidden md:block text-gray-600 leading-tight mb-1">${limitedDescription}</p>
                  <a class="text-gray-500" href="#"><span class="inline-block h-3 border-l-2 border-red-600 mr-2"></span>${news.source_id}</a>
                </div>
              </div>
            </div>

          `;
 
        });


        let listNews = data.results
        .slice(5, 10)
        .map(news => {
          // Limit the description length
          const limitedDescription = news.description.length > 150
            ? `${news.description.slice(0, 100)}...`
            : news.description;
  
       
  
          return `
          
     

          <li class="border-b border-gray-100 hover:bg-gradient-to-r from-purple-400 to-blue-400">
          <a class="text-lg font-bold px-6 py-3 flex flex-row items-center" href="${news.link}" target="_blank">
            <img class="mr-4 h-20 w-20" src="${getImageUrl(news.image_url)}" alt="Image">
            ${news.title}
          </a>
        </li>
        

          `;
 
        });

        

      
        
    
        
    


    
    // Generate HTML markup for the first news item
    const topCardNews =`

    <div class="relative hover-img max-h-98 overflow-hidden">
                <!--thumbnail-->
                <a href="${data.results[0].link}" target="blank">
                  <img class="max-w-full w-full mx-auto h-auto" src="${getImageUrl(data.results[0].image_url)}" alt="${data.results[0].title}">
                </a>
                <div class="absolute px-5 pt-8 pb-5 bottom-0 w-full bg-gradient-cover">
                  <!--title-->
                  <a href="${data.results[0].link}" target="blank">
                    <h2 class="text-xl md:text-3xl font-bold capitalize text-white mb-3">${limitDescription(data.results[0].title, 80)}</h2>
                  </a>
                  <p class="text-gray-100 hidden sm:inline-block">${data.results[0].description}</p>                                                  
                  <!-- author and date -->
                  <div class="pt-2">
                    <div class="text-gray-100"><div class="inline-block h-3 border-l-2 border-red-600 mr-2"></div>${data.results[0].source_id}</div>
                  </div>
                </div>
              </div>


    `;
    
    // Append the news HTML to the newsContainer element
    topCard.insertAdjacentHTML('beforeend', topCardNews);

    
    
        // Append the news HTML to the newsContainer element
        cardContainer3.insertAdjacentHTML('beforeend', newsCard3.join('') );
        newsList.insertAdjacentHTML('beforeend', listNews.join('') );

        
   
       
  
  //       const isModalShown = localStorage.getItem('isModalShown');
  
  // if (!isModalShown) {
  //   welcomeModal.style.display = 'block';
  //   localStorage.setItem('isModalShown', true);
  // }
  
  // closeModalButton.addEventListener('click', function() {
  //   welcomeModal.style.display = 'none';
  // });
  
  
      })
      .catch(error => {
        console.log('Error fetching news:', error);
     
  
      });
 
  }
function updateNews4() {



 
  
        let apiUrl4 = `https://newsdata.io/api/1/news?apikey=${apiKey}&language=en&country=${country}&category=${category4}`;
  
    // if (page !== 1 && nextPage) {
    //   apiUrl += `&page=${nextPage}`;
    // }
  
  
    fetch(apiUrl4)
      .then(response => response.json())
      .then(data => {
  
        // totalResults = data.totalResults;
        // nextPage = data.nextPage;
        
  
        // Process the news data and generate HTML for each news item
        let newsCard4 = data.results
        .slice(1, 7)
        .map(news => {
          // Limit the description length
          const limitedDescription = news.description.length > 100
            ? `${news.description.slice(0, 100)}...`
            : news.description;

          return `
          
          <div class="flex-shrink max-w-full w-full sm:w-1/3 lg:w-1/3 px-3 pb-3 pt-3 sm:pt-0 border-b-2 sm:border-b-0 border-dotted border-gray-100">
              <div class="flex flex-row sm:block hover-img">
                <a href="${news.link}"  target="blank">
                  <img class="max-w-full w-full mx-auto" src="${getImageUrl(news.image_url)}" alt="${news.title}">
                </a>
                <div class="py-0 sm:py-3 pl-3 sm:pl-0">
                  <h3 class="text-lg font-bold leading-tight mb-2">
                    <a href="${news.link}"  target="blank">${limitDescription(news.title, 70)}</a>
                  </h3>
                  <p class="hidden md:block text-gray-600 leading-tight mb-1">${limitedDescription}</p>
                  <a class="text-gray-500" href="#"><span class="inline-block h-3 border-l-2 border-red-600 mr-2"></span>${news.source_id}</a>
                </div>
              </div>
            </div>

          `;
 
        });


        let listNews2 = data.results
        .slice(5, 10)
        .map(news => {
          // Limit the description length
          const limitedDescription = news.description.length > 150
            ? `${news.description.slice(0, 100)}...`
            : news.description;

  
          return `
          
          <li class="border-b border-gray-100 hover:bg-gradient-to-r from-purple-400 to-blue-400">
          <a class="text-lg font-bold px-6 py-3 flex flex-row items-center" href="${news.link}" target="_blank">
            ${news.title}
            <img class="ml-4 h-20 w-20" src="${getImageUrl(news.image_url)}" alt="Image">
          </a>
        </li>
        

          `;
 
        });
    
        

      
        
    
        
   
    

    
    // Generate HTML markup for the first news item
    const topCardNews2 =`

    

    <div class="relative hover-img max-h-98 overflow-hidden">
                <!--thumbnail-->
                <a href="${data.results[0].link}" target="blank">
                  <img class="max-w-full w-full mx-auto h-auto" src="${getImageUrl(data.results[0].image_url)}" alt="${data.results[0].title}">
                </a>
                <div class="absolute px-5 pt-8 pb-5 bottom-0 w-full bg-gradient-cover">
                  <!--title-->
                  <a href="${data.results[0].link}" target="blank">
                    <h2 class="text-xl md:text-3xl font-bold capitalize text-white mb-3">${limitDescription(data.results[0].title, 80)}</h2>
                  </a>
                  <p class="text-gray-100 hidden sm:inline-block">${data.results[0].description.slice(0, 150)}</p>                                                  
                  <!-- author and date -->
                  <div class="pt-2">
                    <div class="text-gray-100"><div class="inline-block h-3 border-l-2 border-red-600 mr-2"></div>${data.results[0].source_id}</div>
                  </div>
                </div>
              </div>


    `;
    
    // Append the news HTML to the newsContainer element
    topCard2.insertAdjacentHTML('beforeend', topCardNews2);

    
    
        // Append the news HTML to the newsContainer element
        cardContainer4.insertAdjacentHTML('beforeend', newsCard4.join('') );
        newsList2.insertAdjacentHTML('beforeend', listNews2.join('') );
  
      })
      .catch(error => {
        console.log('Error fetching news:', error);
  
      });
 
  }
function updateNews5() {

  

  showLoadingIndicator();

  loadingBar.style.width = '0';

  isLoading = true;
  loadingSpinner.style.display = 'block';
 
  
        let apiUrl5 = `https://newsdata.io/api/1/news?apikey=${apiKey}&language=en&country=${country}&category=${category5}`;
  
    // if (page !== 1 && nextPage) {
    //   apiUrl += `&page=${nextPage}`;
    // }
  
  
    fetch(apiUrl5)
      .then(response => response.json())
      .then(data => {
  
        // totalResults = data.totalResults;
        // nextPage = data.nextPage;
        
  
        // Process the news data and generate HTML for each news item
        let newsCard5 = data.results
        .slice(0, 8)
        .map(news => {
          // Limit the description length
          const limitedDescription = news.description.length > 100
            ? `${news.description.slice(0, 100)}...`
            : news.description;

          return `
          
          <div class="flex-shrink max-w-full w-full sm:w-1/3 lg:w-1/4 px-3 pb-3 pt-3 sm:pt-0 border-b-2 sm:border-b-0 border-dotted border-gray-100">
              <div class="flex flex-row sm:block hover-img">
                <a href="${news.link}"  target="blank">
                  <img class="max-w-full w-full mx-auto" src="${getImageUrl(news.image_url)}" alt="${news.title}">
                </a>
                <div class="py-0 sm:py-3 pl-3 sm:pl-0">
                  <h3 class="text-lg font-bold leading-tight mb-2">
                    <a href="${news.link}"  target="blank">${limitDescription(news.title, 70)}</a>
                  </h3>
                  <p class="hidden md:block text-gray-600 leading-tight mb-1">${limitedDescription}</p>
                  <a class="text-gray-500" href="#"><span class="inline-block h-3 border-l-2 border-red-600 mr-2"></span>${news.source_id}</a>
                </div>
              </div>
            </div>

          `;
 
        });


    
    
        // Append the news HTML to the newsContainer element
        cardContainer5.insertAdjacentHTML('beforeend', newsCard5.join('') );


        
   
        hideLoadingIndicator();

        isLoading = false;
        loadingSpinner.style.display = 'none';
  
        const isModalShown = localStorage.getItem('isModalShown');
  
  if (!isModalShown) {
    welcomeModal.style.display = 'block';
    localStorage.setItem('isModalShown', true);
  }
  
  closeModalButton.addEventListener('click', function() {
    welcomeModal.style.display = 'none';
  });
  
  
      })
      .catch(error => {
        console.log('Error fetching news:', error);
  
        hideLoadingIndicator();

        isLoading = false;
        loadingSpinner.style.display = 'none';
  
  
      });
 
  }

  
  

  updateNews()
  updateNews2()
  updateNews3()
  updateNews4()
  updateNews5()

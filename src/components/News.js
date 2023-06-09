import React, { useEffect, useState } from 'react'

import NewsCard from './NewsCard';







const News =  (props) => {

  const currentUrl = window.location.href;

  useEffect(() => {

    document.title = `${Cap(props.category)} - Newzy Newzy`;
      updateNews()
 
      // eslint-disable-next-line
  }, [currentUrl])
  

  const Cap = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const apiKey = process.env.REACT_APP_API_KEY;
  let country = props.country;
  let category = props.category;

const [articles, setArticles] = useState([]);


const updateNews = async ()=> {
 
  // const url = 'https://newsdata2.p.rapidapi.com/news?country=pk&language=en';
  // const url = `https://newsdata.io/api/1/news?apikey=pub_23982106034f9736eabf57973665557460266&language=en&country=${country}&category=${category}`;
  const url = `https://newsdata.io/api/1/news?apikey=${apiKey}&language=en&country=${country}&category=${category}`;
  // const options = {
  //   method: 'GET',
  //   headers: {
  //     'X-RapidAPI-Key': 'b910a89e24msh273469b3b066239p1e7459jsnb7bc65c866e0',
  //       //  'X-RapidAPI-Key': 'e3ddc694aamsh66f35ba06b3df6ep1ac36fjsn505f1a607f89',
  //     'X-RapidAPI-Host': 'newsdata2.p.rapidapi.com'
  //   }
  // };



  
  try {
    const response = await fetch(url);
    // const response = await fetch(url, options);
    const result = await response.json();
    console.log(result.results);
    setArticles(result.results)
  } catch (error) {
    console.error(error);
  }

    // // const url = 'https://gnews.io/api/v4/search?q=example&lang=en&country=us&max=10&apikey=' + apikey;
    // const url = 'https://newsapi.org/v2/top-headlines?apiKey=e0fe8dc076714b7989bbb635abc0f93f&q=cricket';


    // let data = await fetch(url);
  
    // let parsedData = await data.json();
   
    // setArticles(parsedData.articles)
}



  return (
    <>

<h1 className='mt-28 mb-14 text-4xl font-bold text-center text-blue-700'>{`${Cap(props.category)} - News`}</h1>

<div className="flex justify-center">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-8 mb-16 md:mx-4 ">
      {articles.map((news) => (
        <NewsCard
          key={news.link}
          title={news.title}
          description={news.description}
          imageUrl={news.image_url}
          time={news.pubDate}
          source={news.source_id}
          url={news.link}
        />
      ))}
    </div>
    </div>

    </>
    
  )
}

export default News
import { useState, useEffect } from 'react';

const InfiniteScroll = () => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalData, setTotalData] = useState(0);
    const arr = [1,2,3,4,5,6,7,8,9];

    const fetchData = async() =>{
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:5000/quote?page=${page}&pageSize=9`);
        // const response = await fetch(`https://api.javascripttutorial.net/v1/quotes/?page=${page}&limit=10`);
        let res = await response.json();
        setTotalData(res.total);
        if (page === 1 && items.length==0) {
          setItems(res.quote);
        } else {
          setItems(prevItems => [...prevItems, ...res.quote]);
        }
      } catch (error) {
        setError(error);
      } finally {
        // setIsLoading(false);
        items.length <= totalData ? setIsLoading(true) : setIsLoading(false);
      }
    };
  
    useEffect(() => {
      fetchData();
    },[page]);

    useEffect(()=>{
      console.log(items);
    },[items])
  
    const handleScroll = () => {
      if ( Math.round(window.innerHeight + document.documentElement.scrollTop) !== document.documentElement.offsetHeight || isLoading
      ) {
        return;
      }
      setPage(prevPage => prevPage + 1);
      // if(items.length<totalData && items.length != 0) fetchData();
    };
    
    useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, [isLoading]);
  
  return (
    <div>        
        <div>
        {
            items.length!=0 &&
                <div>
                    <div className='flex justify-center'>
                        <div className='w-4/5'>
                            <ul className='flex justify-center flex-wrap gap-10 py-10'>
                                {items.map((item,i) => (
                                <li key={i} className=''>
                                    <div className='w-[350px] min-h-48 bg-red-900 text-white p-3 relative'>
                                        <p className='line-clamp-3'>{item.quote}</p>
                                        <p className='absolute right-3 bottom-5 font-bold'>{item.author}</p>
                                    </div>
                                </li>
                                ))}
                            </ul>
                            {isLoading &&
                                <div className='flex justify-center items-center gap-3'>
                                    <div className="loader">
            
                                    </div>
                                    <span className='font-bold'>Loading...</span>
                                </div>
                            }
                            
                            {error && <p>Error: {error.message}</p>}
                        </div>
                    </div>
                    
                </div>
        }

        </div>

        <div className='flex justify-center'>
            {
                items.length == 0 &&
                <ul className='flex justify-center flex-wrap w-4/5 gap-10 py-10'>
                {arr.map((item,i) => (
                <li key={i} className=''>
                            <div className='w-[350px] min-h-48 bg-gray-300 p-3 relative'>
                                {/* <span>{item.id}</span> */}
                                <p className='w-full h-6 bg-slate-400 animate-pulse'></p>
                                <p className='w-full h-6 bg-slate-400 mt-2 animate-pulse'></p>
                                <p className='w-1/2 h-6 bg-slate-400 mt-2 animate-pulse'></p>
                                <p className='w-1/3 h-6 bg-slate-400 animate-pulse absolute right-3 bottom-5 font-bold'></p>
                            </div>
                        </li>
                    ))}
                </ul>
            }
        </div>
    </div>
  )
}

export default InfiniteScroll;


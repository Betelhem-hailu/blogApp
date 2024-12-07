import { useDispatch, useSelector } from 'react-redux';
import { Footer, Header, Posts, Search, Subscribe } from '../components'
import { useEffect, useState } from 'react';
import { getPopularPosts } from '../slices/post.slice';

const Home = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [tag, setTag] = useState("");

  const { data, loading } = useSelector((state) => state.post);

  useEffect(() => {
    console.log('search', search);
    dispatch(getPopularPosts({search, tag}));
  }, [tag, search, dispatch]);

  return (
    <div className='bg-bg_primary min-h-[100vh] h-full'>
        <Header />
        <Search search={search} setSearch={setSearch} setTag={setTag}/>
        {loading && <p>Loading...</p>}
        <Posts data={data}/>
        <Subscribe />
        <Footer />
    </div>
  )
}

export default Home
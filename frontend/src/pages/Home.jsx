import { Footer, Header, Posts, Search, Subscribe } from '../components'

const Home = () => {
  return (
    <div className='bg-bg_primary min-h-[100vh] h-full'>
        <Header />
        <Search />
        <Posts />
        <Subscribe />
        <Footer />
    </div>
  )
}

export default Home
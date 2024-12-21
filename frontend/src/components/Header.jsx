import Nav from "./Nav";

const Header = () => {
    return (
      <header id="home" className="bg-five-color-gradient text-tx_primary h-full md:h-[350px] rounded-b-[100px] shadow-header_shadow">
        <Nav />
        <div className="ml-[70px] md:ml-[140px] text-tx_primary w-3/4 md:w-2/4 my-[20px] pb-[10px]">
          <h1 className="font-primary text-heading_2 md:text-heading_1 mb-[10px]">Your Voice, Your Story, Your World</h1>
        <p className="font-secondary text-base">
        {"Discover a platform that brings readers and bloggers together in a dynamic community. Readers can explore captivating stories, insightful articles, and personalized recommendations while engaging with their favorite content. Bloggers can share their voice, grow their audience, and connect with readers through powerful publishing tools and performance tracking features. Whether you're here to read or write, this is your space to inspire and be inspired."}
        </p></div>
      </header>
    );
  };
  
  export default Header;
  
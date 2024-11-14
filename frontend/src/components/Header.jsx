import Nav from "./Nav";

const Header = () => {
    return (
      <header className="bg-five-color-gradient text-tx_primary h-[350px] rounded-b-[100px] shadow-header_shadow">
        <Nav />
        <div className="ml-[140px] text-tx_primary w-2/4 my-[20px]">
          <h1 className="font-primary text-heading_1 mb-[10px]">MOTTO for the blog up that inspire</h1>
        <p className="font-secondary text-base">
        Lorem ipsum odor amet, consectetuer adipiscing elit. Tempor ante vivamus placerat parturient massa donec platea molestie. Nascetur euismod convallis odio dui risus.        </p>
        </div>
      </header>
    );
  };
  
  export default Header;
  
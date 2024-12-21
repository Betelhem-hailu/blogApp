

const Subscribe = () => {
  return (
    <section className="bg-gray-700 mx-[20px] md:mx-[90px] my-[20px] md:my-[50px] flex md:items-center flex-col md:flex-row">
      <div className="text-tx_primary w-3/4 my-[20px]">
        <h2 className="font-primary text-heading_2 md:text-heading_1 mb-[2px]">Subscribe for new content</h2>
        <p className="text-base font-light text-tx_tertiary">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
      <div className="flex gap-[10px]">
          <input type="email" placeholder="Enter your email" className="px-4 py-[5px] bg-[#11003335] border border-[0.5px] border-[#59ACFF80] rounded-[100px] text-white w-3/4 md:w-[350px] h-[50px] focus:outline-none focus:ring-2 focus:ring-blue-400" />
          <button className="px-4 py-2 bg-[#11003380] text-tx_primary w-[150px] border border-[0.5px] border-[#59ACFF80] rounded-full">Subscribe!</button>
        </div>
    </section>
  );
};

export default Subscribe;

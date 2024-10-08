const AboutContent = () => {
  return (
    <div className="grid grid-cols-7 gap-[23px] max-md:gap-[10px] max-md:grid-cols-3 max-md:auto-rows-min max-md:mt-10">
      <div className="col-span-1 flex flex-col">
        {/* <div className="w-full rounded-[15px] flex-grow h-[196px]"></div> */}
        <img
          src="/g0.png"
          alt="img1"
          className="w-full max-md:h-[133px] object-cover rounded-[15px] flex-grow"
        />
        <img
          src="/g1.png"
          alt="img1"
          className="w-full h-[210px] max-md:h-[133px] object-cover rounded-[15px] mt-[14px]"
        />
      </div>
      <div className="col-span-3 max-md:col-span-2">
        <img src="/g2.png" alt="img2" className="w-full max-md:h-full" />
      </div>
      <div className="col-span-3 rounded-[15px] overflow-hidden">
        <img
          src="/g3.png"
          alt="img3"
          className="w-full max-md:h-[191px] object-cover rounded-[15px]"
        />
        <div className="grid grid-cols-3 gap-[10px] mt-[14px]">
          <div className="col-span-1 rounded-[15px] overflow-hidden ">
            <img
              src="/g4.png"
              alt="img4"
              className="w-full h-[210px] max-md:h-[133px] object-cover"
            />
          </div>
          <div className="col-span-2 rounded-[15px] overflow-hidden ">
            <img
              src="/g5.png"
              alt="img5"
              className="w-full h-[210px] max-md:h-[133px] object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutContent;

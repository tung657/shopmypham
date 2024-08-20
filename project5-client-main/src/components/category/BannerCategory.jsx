export default function BannerCategory({ name }) {
  return (
    <>
      {
        <div className="bg-gray-200 rounded-md relative flex flex-row mb-7">
          <div className="hidden md:flex">
            <span className="box-border inline-block overflow-hidden opacity-100 m-0 p-0 relative max-w-full">
              <span className="box-border block opacity-100 m-0 p-0 max-w-full">
                <img
                  alt=""
                  aria-hidden="true"
                  src={require("../../assets/images/banners/category-banner.png")}
                  className="block max-w-full opacity-100 m-0 p-0"
                />
              </span>
            </span>
          </div>
          <div className="relative md:absolute top-0 start-0 h-auto md:h-full w-full md:w-2/5 flex items-center py-2 sm:py-3.5">
            <h2 className="capitalize text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-heading p-7 text-center w-full">
              {"#" + (name || "")}
            </h2>
          </div>
        </div>
      }
    </>
  );
}

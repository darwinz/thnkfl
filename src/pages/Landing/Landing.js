import { appwrite, github, twitter, react } from "../icons";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/appreciations");
  };

  const links = [
    {
      href: "http://github.com/darwinz/thnkfl",
      icon: github(10),
    },
    {
      href: "https://twitter.com/ubbjuntu",
      icon: twitter(10),
    },
    {
      href: "http://johnsonb.com",
      icon: github(10),
    },
  ];

  return (
    <>
      <section className="container mx-auto flex">
        <div className="flex flex-col mx-auto justify-center p-6 text-center">
          <p className="my-8 text-xl md:text-2xl lg:text-3xl font-medium">Introducing</p>
          <h1 className="text-4xl md:text-7xl lg:text-9xl font-bold">Thankful for...</h1>
          <p className="my-8 text-xl md:text-2xl lg:text-3xl font-medium">
            A positivity app
          </p>
          <button
            onClick={handleClick}
            className="mx-auto mt-4 py-3 lg:py-5 px-10 lg:px-24 text-lg md:text-2xl font-semibold  rounded-lg shadow-md bg-white text-gray-900 border border-gray-900 hover:border-transparent hover:text-white hover:bg-gray-900 focus:outline-none"
          >
            Get Started
          </button>
        </div>
      </section>

      <section className="absolute bottom-0 right-0 py-3 px-6 mr-8 mb-8 flex">
        {links.map((item, key) => (
          <div key={key} className="rounded-full mx-4 transition duration-200 ease-in-out transform hover:-translate-y-3 hover:scale-125 hover:shadow-4xl">
            <a href={item["href"]}>{item["icon"]}</a>
          </div>
        ))}
      </section>
    </>
  );
};

export default Landing;

import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";

function Home() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  if (posts.length === 0) {
    return (
      <div className="w-full text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                {/* <!--Title--> */}
                <div className="text-center pt-16">
                  <h1 className="font-bold break-normal text-3xl md:text-5xl">
                    Welcome to TechieBlog
                  </h1>
                </div>
              </h1>
            </div>
            {/* <!--Container--> */}
            <div className="container max-w-5xl mx-auto -mt-12">
              <div className="mx-0 sm:mx-6">
                {/* <!--Subscribe-->	 */}
                <div className="container font-sans rounded mt-10 p-4 md:p-10 text-center">
                  <h2 className="font-bold break-normal text-2xl md:text-4xl">
                    Subscribe to TechieBlog
                  </h2>
                  <h3 className="break-normal font-normal text-gray-600 text-base md:text-xl">
                    Get the latest posts delivered right to your inbox
                  </h3>

                  <div className="w-full text-center pt-4">
                    <form action="#">
                      <div className="max-w-sm mx-auto p-1 pr-0 flex flex-wrap items-center">
                        <input
                          type="email"
                          placeholder="youremail@example.com"
                          className="flex-1 appearance-none rounded shadow p-2 text-gray-600 mr-2 focus:outline-none"
                        />
                        <button
                          type="submit"
                          className="flex-1 mt-4 md:mt-0 block md:inline-block appearance-none bg-green-500 text-white text-base font-semibold tracking-wider uppercase py-3 rounded shadow hover:bg-green-400"
                        >
                          Subscribe
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                {/* <!-- /Subscribe--> */}
              </div>
            </div>

            {/* </div> */}
          </div>
        </Container>
      </div>
    );
  }
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;

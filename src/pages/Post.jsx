import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import Swal from 'sweetalert2';
import Loading from "../components/loaders/Loading";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        }
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will delete this post!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete the Post!',
    });

    if (result.isConfirmed) {
      const status = await appwriteService.deletePost(post.$id);
      if (status) {
        const fileDeleted = await appwriteService.deleteFile(post.featuredImage);
        if (fileDeleted) {
          await Swal.fire('Deleted Successfully!', 'Post have been deleted successfully.', 'success');
        }
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    }
  };

  return (
    <div className="py-4">
      <Container>
        {post ? (
          <div className="w-full overflow-hidden rounded-xl border bg-white dark:bg-gradient-to-r dark:from-gray-800 dark:via-gray-900 dark:to-black shadow-sm transition-all hover:shadow-lg">
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-2/5">
                <img
                  src={appwriteService.getFilePreview(post.featuredImage)}
                  alt={post.title}
                  className="h-[300px] w-full object-cover lg:h-full rounded-lg aspect-video"
                />
              </div>

              <div className="flex-1 p-6 lg:p-8 flex flex-col">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                    {post.title}
                  </h1>
                  <div className="browser-css text-gray-700 dark:text-gray-300">
                    {parse(post.content)}
                  </div>
                </div>

                {isAuthor && (
                  <div className="mt-8 flex items-center justify-center gap-4 pt-4 border-t">
                    <Link to={`/edit-post/${post.$id}`}>
                      <button className="px-6 py-2 bg-green-500 dark:bg-green-600 text-white 
                      rounded-lg hover:bg-green-600 dark:hover:bg-green-700 
                      transition-colors duration-300">
                        Edit
                      </button>
                    </Link>
                    <button
                      onClick={deletePost}
                      className="px-6 py-2 bg-red-500 dark:bg-red-600 text-white 
                      rounded-lg hover:bg-red-600 dark:hover:bg-red-700 
                      transition-colors duration-300"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <Loading />
        )}
      </Container>
    </div>
  );
}

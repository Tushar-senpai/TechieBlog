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
          <div className="w-full flex mb-4 relative border rounded-xl p-5">
          <div className="w-full">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-xl"
            />
          </div>

          <div className="m-4 pl-4 pb-4 text-left">
            <div className="w-full mb-6">
              <h1 className="text-2xl font-bold">{post.title}</h1>
            </div>
            <div className="pb-3 browser-css">{parse(post.content)}</div>
            <div className="w-full browser-css p-3">
              {isAuthor && (
                <div className="absolute bottom-6 flex space-x-6">
                  <Link to={`/edit-post/${post.$id}`}>
                    <Button bgColor="bg-green-500">Edit</Button>
                  </Link>

                  <Button
                    bgColor="bg-red-500"
                    className="mr-40"
                    onClick={deletePost}
                  >
                    Delete
                  </Button>
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

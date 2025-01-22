import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import parse from "html-react-parser";
import Swal from 'sweetalert2';
import { format, formatDistanceToNow } from "date-fns";
import { ArrowLeft, Calendar, Clock, Share2, User } from "lucide-react";

import appwriteService from "../appwrite/config";
import authService from "../appwrite/auth";
import { Container } from "../components";
import Loading from "../components/loaders/Loading";

export default function Post() {
  const [post, setPost] = useState(null);
  const [author, setAuthor] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  
  useEffect(() => {
    async function fetchPost() {
      try {
        if (!slug) {
          navigate("/");
          return;
        }

        const fetchedPost = await appwriteService.getPost(slug);
        if (!fetchedPost) {
          throw new Error("Post not found");
        }

        setPost(fetchedPost);
        
        const user = await authService.getUserById(fetchedPost.userId);
        if (user) {
          setAuthor(user);
        }
      } catch (err) {
        throw err;
      }
    }

    fetchPost();
  }, [slug, navigate]);

  const deletePost = async () => {
    try {
      const result = await Swal.fire({
        title: 'Delete Post?',
        text: 'This action cannot be undone!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dc2626',
        cancelButtonColor: '#6b7280',
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
      });

      if (result.isConfirmed) {
        await appwriteService.deletePost(post.$id);
        await appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    } catch (err) {
      Swal.fire('Error', 'Failed to delete the post', 'error');
    }
  };

  const sharePost = async () => {
    const url = window.location.href;
    try {
      await navigator.share({
        title: post.title,
        text: `Check out this post: ${post.title}`,
        url: url,
      });
    } catch (err) {
      navigator.clipboard.writeText(url);
      Swal.fire({
        title: 'Link Copied!',
        text: 'Post URL copied to clipboard',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  if (!post) return <Loading />;

  const isAuthor = userData?.$id === post.userId;

  return (
    <div className="py-8 min-h-screen bg-gray-50 dark:bg-gray-900">
      <Container>
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Posts
        </button>

        <article className="max-w-4xl mx-auto">
          <img
            src={appwriteService.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="w-full h-[300px] object-contain bg-gray-100 dark:bg-gray-800 rounded-xl mb-4"
          />

          <div className="flex justify-between items-center mb-6">
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{author ? author.name : "Unknown Author"}</span>
              </div>
              <div className="hidden sm:block text-gray-400">•</div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Posted {format(new Date(post.$createdAt), "MMMM d, yyyy")}</span>
              </div>
              <div className="hidden sm:block text-gray-400">•</div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Updated {formatDistanceToNow(new Date(post.$updatedAt), { addSuffix: true })}</span>
              </div>
            </div>
            <button
              onClick={sharePost}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors duration-200"
              title="Share Post"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            {post.title}
          </h1>

          <div className="prose prose-lg prose-gray dark:prose-invert max-w-none mb-8">
            {parse(post.content)}
          </div>

          {isAuthor && (
            <div className="flex justify-center gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
              <Link
                to={`/edit-post/${post.$id}`}
                className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Edit
              </Link>
              <button
                onClick={deletePost}
                className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          )}
        </article>
      </Container>
    </div>
  );
}
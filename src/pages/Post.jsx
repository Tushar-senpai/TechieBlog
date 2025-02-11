import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
// import parse from "html-react-parser";
import Swal from 'sweetalert2';
import { format, formatDistanceToNow } from "date-fns";
import { ArrowLeft, Calendar, Clock, Share2, User, Heart, Send } from "lucide-react";

import appwriteService from "../appwrite/config";
import authService from "../appwrite/auth";
import { Container } from "../components";
import Loading from "../components/loaders/Loading";
import MarkdownDisplay from "../components/MarkdownDisplay";
import commentService from "../appwrite/comment";

export default function Post() {
  const [post, setPost] = useState(null);
  const [author, setAuthor] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const [likes, setLikes] = useState(0);
  const [isLiking, setIsLiking] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (post && userData) {
      setIsLiked(post.likedBy?.includes(userData.$id));
      setLikes(post.likedBy?.length || 0);
    }
  }, [post, userData]);

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

  const handleLike = async () => {
    if (!userData) {
      Swal.fire('Error', 'You need to be logged in to like a post', 'error');
      return;
    }

    try {
      setIsLiking(true);
      const updatedPost = await appwriteService.addLikes(post.$id, userData.$id);
      if (updatedPost) {
        setPost(updatedPost);
        setLikes(updatedPost.likedBy.length);
        setIsLiked(updatedPost.likedBy.includes(userData.$id));
      }
    } catch (err) {
      Swal.fire('Error', 'Failed to like the post', 'error');
    } finally {
      setIsLiking(false);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!userData) {
      Swal.fire('Error', 'You need to be logged in to comment', 'error');
      return;
    }
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    try {
      const commentData = {
        commentBody: newComment.trim(),
        article: post.$id,
        commentBy: userData.$id,
        commentedOn: new Date().toISOString()
      };
      console.log(commentData);

      const comment = await commentService.createComment(commentData);
      console.log(comment);
      setComments(prev => [...prev, comment]);
      setNewComment("");
      Swal.fire({
        title: 'Success!',
        text: 'Comment posted successfully',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire('Error', 'Failed to post comment', 'error');
    } finally {
      setIsSubmitting(false);
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
            {userData && (
              <button
                onClick={handleLike}
                disabled={isLiking}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-105 ${
                  isLiking ? 'opacity-70 cursor-not-allowed' : ''
                } ${
                  isLiked
                    ? 'bg-red-100 dark:bg-red-900/50 text-red-500'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/30'
                }`}
                title="Like Post"
              >
                {isLiking ? (
                  <div className="w-5 h-5 animate-spin rounded-full border-2 border-gray-300 border-t-red-500" />
                ) : (
                  <Heart
                    className={`w-5 h-5 transition-colors duration-300 ${
                      isLiked
                        ? 'fill-red-500 stroke-red-500'
                        : 'fill-none stroke-current hover:stroke-red-500'
                    }`}
                  />
                )}
                <span className="font-medium">{likes}</span>
              </button>
            )}
          </div>

          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            {post.title}
          </h1>

          <MarkdownDisplay content={post.content} />

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

        <section className="max-w-4xl mx-auto mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Comments
          </h2>

          {userData ? (
            <form onSubmit={handleCommentSubmit} className="mb-8 transform transition-all duration-300">
              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-semibold">
                      {userData.name[0].toUpperCase()}
                    </div>
                  </div>
                  <div className="flex-grow">
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Share your thoughts..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 
                        bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 
                        focus:ring-2 focus:ring-orange-500 focus:border-transparent
                        placeholder-gray-500 dark:placeholder-gray-400
                        transition-all duration-300 ease-in-out
                        min-h-[120px] resize-y"
                      rows="3"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting || !newComment.trim()}
                    className={`px-6 py-2.5 rounded-xl flex items-center gap-2 font-medium
                      transform transition-all duration-300
                      ${
                        isSubmitting || !newComment.trim()
                          ? 'bg-gray-200 dark:bg-gray-700 cursor-not-allowed opacity-60'
                          : 'bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 text-white'
                      }`}
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Post Comment</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 text-center mb-8 
              transform transition-all duration-300 hover:scale-[1.02]">
              <p className="text-gray-600 dark:text-gray-400">
                Please{" "}
                <Link 
                  to="/login" 
                  className="text-orange-500 hover:text-orange-600 dark:hover:text-orange-400 
                    font-medium hover:underline transition-colors duration-200"
                >
                  login
                </Link>{" "}
                to join the discussion
              </p>
            </div>
          )}
        </section>
      </Container>
    </div>
  );
}
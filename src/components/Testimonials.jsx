import { UserCircle, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Tech Enthusiast",
    content: "TechieBlog has become my go-to source for staying updated with the latest tech trends. The articles are well-researched and easy to understand.",
    rating: 5
  },
  {
    id: 2,
    name: "James Wilson",
    role: "Software Developer",
    content: "What I love most about TechieBlog is the depth of technical content. It's perfect for both beginners and experienced developers.",
    rating: 5
  },
  {
    id: 3,
    name: "Maria Garcia",
    role: "Product Manager",
    content: "The insights shared on TechieBlog have helped me make better product decisions. The community discussions are incredibly valuable.",
    rating: 5
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-yellow-50 via-orange-50 to-pink-50 dark:from-gray-800 dark:via-gray-900 dark:to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 sm:text-4xl mb-4">
            What Our Readers Say
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Join thousands of tech enthusiasts who trust TechieBlog for their daily dose of tech insights
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="backdrop-blur-sm bg-white/70 dark:bg-gray-800/70 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <Quote className="w-8 h-8 text-orange-500 dark:text-orange-400 mr-2" />
              </div>

              <p className="text-gray-600 dark:text-gray-300 mb-6">
                "{testimonial.content}"
              </p>

              <div className="flex items-center">
                <UserCircle className="w-12 h-12 text-gray-400 dark:text-gray-500" />
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                </div>
              </div>

              <div className="mt-4 flex">
                {[...Array(testimonial.rating)].map((_, index) => (
                  <svg
                    key={index}
                    className="w-5 h-5 text-orange-500 dark:text-orange-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
import { Container, PostForm } from '../components'
function AddPost() {
  return (
    <div className='py-8 min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300'>
      <Container>
        <div className='max-w-4xl mx-auto bg-yellow-50 dark:bg-gray-800 p-8 rounded-lg shadow-lg transition-colors duration-300'>
          <PostForm />
        </div>
      </Container>
    </div>
  )
}
export default AddPost

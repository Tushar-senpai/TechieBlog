import { Container, PostForm } from '../components'
function AddPost() {
  return (
    <div className='py-8 min-h-screen bg-white dark:bg-gray-900 transition-colors '>
      <Container>
        <PostForm />
      </Container>
    </div>
  )
}
export default AddPost

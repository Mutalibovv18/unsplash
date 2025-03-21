// components
import { Form } from 'react-router-dom'
import {FormInput} from './'

function Search() {
  return (
    <Form method='post' className='flex gap-2 max-w-96 w-full mx-auto'>
        <FormInput type="text" placeholder="Search" name= "search" />
        <button className='btn btn-primary md:hidden btn-sm'>Search</button>
    </Form>
  )
}

export default Search
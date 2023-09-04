import { getUploadURL } from 'app/lib'
import React from 'react'

const Image = React.memo(function Image(props) {
  const src = getUploadURL(props.src)

  return (
    <img src={ src } />
  )
})

export default Image

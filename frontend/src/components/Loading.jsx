import React from 'react'

const Loading = () => {
  return (
    <div className="flex min-h-40 items-center justify-center" role="status" aria-label="Loading">
      <span
        className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-black"
        aria-hidden="true"
      />
    </div>
  )
}

export default Loading
import React, { useState } from "react"

const Form = (props) => {
  const { onSubmit } = props
  const [username, setUsername] = useState("")
  function handleSubmit(event) {
    event.preventDefault()
    fetch(`https://api.github.com/users/${username}`)
      .then((resp) => {
        if (resp.status >= 200 && resp.status <= 299) return resp.json()
        else {
          alert("User does not exist")
          setUsername("")
          throw Error(resp.messageText)
        }
      })
      .then((data) => {
        console.log(data)
        onSubmit(data)
        setUsername("")
      })
      .catch((error) => {
        console.log(error)
      })
  }
  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto">
      <div className="flex flex-col font-bold">
        <label htmlFor="username" className="mt-10">
          Github Username:
        </label>
        <div className="mt-5 flex">
          <input
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            type="text"
            placeholder="GitHub username"
            className="form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150"
            required
          />
          <button
            type="submit"
            className="ml-2 py-2 px-3 border border-gray-300 rounded-md text-sm leading-4 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out"
          >
            Search
          </button>
        </div>
      </div>
    </form>
  )
}

export default Form

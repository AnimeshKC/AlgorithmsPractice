import Head from "next/head"
import Parser from "rss-parser"

export async function getStaticProps(context) {
  const parser = new Parser()

  const data = await parser.parseURL("https://flaviocopes.com/index.xml")

  const posts = []
  for (const item of data.items.slice(0, 10)) {
    posts.push({
      title: item.title,
      link: item.link,
      date: item.isoDate,
      name: "Flavio Copes",
    })
  }

  return {
    props: {
      posts,
    },
  }
}

export default function IndexPage(props) {
  return (
    <div>
      <Head>
        <title>Latest posts</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between">
              <h1 className="text-3xl font-bold leading-tight text-gray-900">
                Latest posts
              </h1>
            </div>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-4 sm:px-0">
              <div className="border-4 rounded-lg">
                <div className="flex flex-col">
                  <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                    <div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg">
                      <table className="min-w-full">
                        <thead>
                          <tr>
                            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                              Post
                            </th>
                            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                              Date
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white">
                          {props.posts
                            .sort((a, b) => new Date(b.date) - new Date(a.date))
                            .map((value, index) => {
                              return (
                                <tr key={index}>
                                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                    <div className="flex items-center">
                                      <div className="ml-4">
                                        <div className="text-sm leading-5 font-medium text-gray-900 underline">
                                          <a href={value.link}>{value.title}</a>
                                        </div>
                                        <div className="text-sm leading-5 text-gray-500">
                                          {value.name}
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                    <div className="text-sm leading-5 text-gray-900">
                                      {new Date(value.date).toDateString()}
                                    </div>
                                    <div className="text-sm leading-5 text-gray-500"></div>
                                  </td>
                                </tr>
                              )
                            })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

import Feed from '@components/Feed';


const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Uncover & Share
        <br className="max-md:hidden" />
        <span className="green_gradient2 text-center">Rapid AI - Prompts</span>
      </h1>
      <p className="desc text-center">  
        Rapid Prompt is an open-source AI prompting tool for modern world to notice, generate and share creative prompts.
      </p>

      {/*feeds*/}
      <Feed />
    </section>
  )
}

export default Home;
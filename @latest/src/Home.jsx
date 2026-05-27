
import { Link } from "react-router-dom";


function Home() {
  return(
    <div>
      <h1>Welcome to Html Workshop </h1>
      <section className="htmlworkshop">
        <h5>Details:-</h5>
        <ol list-style-type="none">
          
          <li class="dates"><p>Dates:- </p></li>
          <li class="mode"><p>Mode:- ONLINE</p></li>
        </ol>
      
      <blockquote> &nbsp;
        <ul>
          <li class="topics"><p>-:All Topics:- </p></li>
           <li><h4 >- : Basics : -</h4>
          <ul>
            <pre>
              <li>  -Proper document structure</li>
              <li>  -Html Tags</li>
              <li>  -Div Tag</li>
              <li>  -Lists</li>
              <li>  -Aside</li>
            </pre>
            
          </ul>
          
          </li>
          

          <li><h4>- :Advance: -</h4></li>
          
          <pre>
            <li>  -Semantic tags</li>
            <li>  -Media and Hyperlinks</li>
            <li>  -Forms</li>
          </pre>

        </ul>
      </blockquote>
      

      <p className="firstlink" ><Link to ="/auth/register" >Click here to register </Link></p>

      </section>
    </div>
  )

}

export default Home;

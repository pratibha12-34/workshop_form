
import { Link } from "react-router-dom";


function Home() {
  return(
    <div>
      <h1>Welcome to Html Workshop </h1>
      <section className="htmlworkshop">
        <h5>Details:-</h5>
        <ol list-style-type="none">
          
          <li><p>Dates:- </p></li>
          <li><p>Mode:- ONLINE</p></li>
        </ol>
      
      <blockquote>
        <ul>
          <li><h4 >- : Basics : -</h4>
          <ul>
            <li>-Proper document structure</li>
          <li>-Html Tags</li>
          <li>-The img tag</li>
          <li>-Nesting</li>
          <li>-Buttons</li>
          <li>-Input tags</li>
          <li>-Anchor tags</li>
          <li>-Lists</li>
          <li>-Aside</li>
          </ul>
          
          </li>
          

          <li><h4>- :Advance: -</h4></li>
          <li>Semantic tags</li>
        </ul>
      </blockquote>
      

      <p className="firstlink" ><Link to ="/auth/register" >Click here to register </Link></p>

      </section>
    </div>
  )

}

export default Home;

 
import React, {useState} from 'react';
import axios from 'axios';
import './App.css';

 const Register = () =>{
 const [registerdata, setregisterdata] = useState({Name:"", EmailID:"", Password:"", Phone:""});
  const [loading, setloading]=useState(false);
  

  

  const handlePayment = () => {
    const options = {
      key: "rzp_test_Sqn2jKhinJ8GGo", // Key ID
      amount: "5000", // Amount in subunits (e.g., 50000 paise = 500 INR)
      currency: "INR",
      name: "Workshop Registration",
      description: "Payment for Workshop",
      handler: function (response) {
        alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
        // Note: The key_secret (BRvsRxQVBFDnRNPKzr0NED10) is used on your backend to verify the signature.
      },
      prefill: {
        name: registerdata.Name,
        email: registerdata.EmailID,
        contact: registerdata.Phone,
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      alert("Payment failed! Reason: " + response.error.description);
    });
    rzp1.open();
  };

  const handlesubmit = async(e)=>{
        e.preventDefault();

       setloading(true);
       try{
          const res = await axios.post('http://localhost:3000/auth/register',registerdata , {
            headers:{'Content-Type':'application/json'},
          });
          console.log("Register response:", res.data);
          alert("Registered successfully. Proceeding to payment...");
          
          // Trigger Razorpay payment
          handlePayment();
       }
       catch(err){
        console.log("handlesubmit:",err);
        
       }  
       finally{
        setloading(false);
       }      

  };

  const handleChange = (e) =>{
    const {name, value} = e.target;
    setregisterdata(prev =>({...prev, [name]: value}));
  }
  
  
  return (
    <div>
      <h1> Registration Form</h1>
      <form  onSubmit={handlesubmit} method="post">
        

        <section className="inputs">
          <label>Name:<input type="text" name="Name" placeholder="Enter name" value={registerdata.Name} onChange={handleChange} required></input></label> <br/>
          <label>EmailId:<input type="email"  name="EmailID" placeholder="Enter emailid" value={registerdata.EmailID} onChange={handleChange} required></input></label><br/>
           <label>Password:<input type="password" name="Password" placeholder="Enter password." value={registerdata.Password} onChange={handleChange} required></input></label><br/>
          <label>Phoneno:<input type="number"  name="Phone" placeholder="Enter phone no." value={registerdata.Phone} onChange={handleChange} required></input></label> <br/>
        </section>

        <button className="btn" disabled={loading}>
            { loading ? "Registering..." : "Register"}
          </button>
    

      </form>
    </div>
  )
}

export default Register;


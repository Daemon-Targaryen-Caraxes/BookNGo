
function bus() {
  return (
    <div className="busTicket">
      <div className="pinfo">
        <h2>Bus Ticket Reservation System</h2>
        <h3>Passenger Information</h3>
        <p><b>Name : </b><input type="text" placeholder="Full Name" required></input></p>
        <p><b>Age : </b> <input type="text" placeholder="Your Age" required></input></p>
        <p>  <b>Gender :</b><br></br>
          <input type="radio" id="Male" name="Gender" Value></input>
          <label for="Male" >Male</label><br></br>
          <input type="radio" id="Female" name="Gender" Value></input>
          <label for="Female" >Female</label><br></br>
          <input type="radio" id="Other" name="Gender" Value></input>
          <label for="Other" >Other</label><br></br>
        </p>
        <p><b>Contact : </b><input type="number" placeholder="Yourcontact" required></input></p>
        <p><b>Email : </b><input type="email" placeholder="Example@gmail.com" required></input></p>

      </div>
      <button class="submit" type="button" required>Submit</button>
    </div>

  )
}
export default bus;

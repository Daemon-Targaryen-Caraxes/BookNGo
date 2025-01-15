const AddTransport = () => {
  return (
    <>
      <div className="admin-container">
        <h1>Add Train, Bus, and Flight</h1>
        <form className="popup-content">
          <table>
            <tr className="form-group">
              <td><label>From:</label></td>
              <td><input type="text" name="from" /></td>
              <td><label>No:</label></td>
              <td><input type="text" name="number" /></td>
            </tr>
            <tr className="form-group">
              <td><label>To:</label></td>
              <td><input type="text" name="to" /></td>
              <td><label>Name:</label></td>
              <td><input type="text" name="name" /></td>
            </tr>
            <tr className="form-group">
              <td><label>Total Seats:</label></td>
              <td><input type="text" name="totalSeats" /></td>
              <td><label>Mode:</label></td>
              <td> <select id="mode" name="mode" required> <option value="bus">Bus</option> <option value="train">Train</option> <option value="flight">Flight</option> </select></td>
            </tr>
            <tr className="form-group">
              <td><label>AC Seats:</label></td>
              <td><input type="text" name="acSeats" /></td>
              <td><label>Amount:</label></td>
              <td><input type="text" name="amount" /></td>
            </tr>
            <tr className="form-group">
              <td><label>Time:</label></td>
              <td><input type="text" name="time" /></td>
              <td><label>Normal Seats:</label></td>
              <td><input type="text" name="normalSeats" /></td>
            </tr>
            <tr className="form-group">
              <td><label>Start ID:</label></td>
              <td><input type="text" name="startId" /></td>
            </tr>
          </table>
          <button type="submit" className="submit-button">Add</button>
        </form>
      </div>
    </>
  );
};
export default AddTransport;

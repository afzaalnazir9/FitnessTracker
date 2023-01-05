import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const CreateExercise = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [users , setUsers] = useState([]);
    const [username , setUsername] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState('');

const getUsers = () => {
    var config = {
        method: 'get',
        url: 'http://localhost:5000/users',
        headers: { 
          'Content-Type': 'application/json'
        }
      };
      axios(config)
      .then(function (response) {
        setUsers(response.data.map(user => user.username));
        setUsername(response.data[0].username)
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
}

useEffect(() => {
    getUsers();
}, []);

const onSubmit = (e) => {
    e.preventDefault();
    const exercise = {
      username: username,
      description: description,
      duration: duration,
      date: startDate
    }
    console.log(exercise);
    axios.post('http://localhost:5000/exercises/add', exercise)
      .then(res => console.log(res.data));
    window.location = '/';
  }

    return (
        <div className="createExercise">
            <div className="container">
                <div className="formExercuse">
                <h3 className="mb-3">Create New Exercise Log</h3>
                    <form 
                        onSubmit={onSubmit}
                    >
                        <div className="form-group mb-3"> 
                            <label>Username: </label>
                            <select
                                required
                                className="form-control"
                                value={username}
                                onChange={(e) => setUsername(e.target.value) }>
                                {
                                    users.map(function(user) {
                                    return <option 
                                        key={user}
                                        value={user}>{user}
                                        </option>;
                                    })
                                }
                            </select>
                        </div>
                        <div className="form-group mb-3"> 
                            <label>Description: </label>
                            <input  type="text"
                                required
                                className="form-control"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                />
                        </div>
                        <div className="form-group mb-3">
                            <label>Duration (in minutes): </label>
                            <input 
                                type="text" 
                                className="form-control"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                                />
                        </div>
                        <div className="form-group mb-3">
                            <label>Date: </label>
                            <div>
                                <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                            </div>

                        </div>
                        <div className="form-group mb-3">
                            <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateExercise;
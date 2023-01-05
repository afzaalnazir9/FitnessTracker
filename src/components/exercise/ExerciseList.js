import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const ExerciseList = () => {
    const [exercises, setExercises] = useState([]);

    const getExercises = () => {
        var config = {
            method: 'get',
            url: 'http://localhost:5000/exercises',
            headers: { }
        };
        axios(config)
        .then(function (response) {  
            setExercises(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    useEffect(() => {
        getExercises();
      }, [])

      const deleteExercise = (id) => {
        var config = {
            method: 'delete',
            url: 'http://localhost:5000/exercises/'+id,
            headers: { },
        };
        axios(config)
        .then(function (response) {
            const remainingExercise = exercises.filter(el => el._id !== id);
            setExercises(remainingExercise);
            // getExercises();
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });
      }

    return (
        <div className="container">
            {exercises ? 
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {  
                            exercises.map((exercise, key) => {
                            return (
                                    <tr key={key}>
                                        <td>{key+1}</td>
                                        <td>{exercise.username}</td>
                                        <td>{exercise.description}</td>
                                        <td>{exercise.duration}</td>
                                        <td>{exercise.date.substring(0,10)}</td>
                                        <td>
                                           <Link to={"/edit/"+exercise._id}>Edit</Link>
                                           |                                                 
                                           <Link onClick={()=>deleteExercise(exercise._id)}>delete</Link> 
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </Table> : ""}
        </div>
    )
}

export default ExerciseList;
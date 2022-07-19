import React, { useContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import CoffeeContext from '../contexts/CoffeeContext';

const NewCoffee = () => {
    let [ newCoffee, setNewCoffee ] = useState({
        name: " ",
        description: " ",
        price: 0
    });

    let { editCoffee } = useContext(CoffeeContext);
    let navigate = useNavigate();

    function handleChange(event) {
        setNewCoffee((prevValue) => {
            return { ...prevValue, [event.target.name]: event.target.value }
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        editCoffee(newCoffee).then(() => {
            navigate('/coffee');
        }).catch(error => {
            console.log(error);
            navigate('/signin');
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>UPDATE COFFEE</h1>
            <span>Coffee Name  </span>
            <input placeholder="Enter coffee name" type="text" name="name" value={newCoffee.coffeeName} onChange={handleChange} />
            <br></br><br></br>
            <span>Description  </span>
            <input placeholder="Enter description" type="text" name="description" value={newCoffee.description} onChange={handleChange} />
            <br></br><br></br>
            <span>Price  </span>
            <input placeholder="Enter price" type="number" name="price" value={newCoffee.price} onChange={handleChange} />
            <br></br><br></br>
            <button>Create New Coffee</button>
        </form>
    )
};

export default NewCoffee;
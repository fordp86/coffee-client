import React, { useContext, useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CoffeeContext from '../contexts/CoffeeContext';

const UpdateCoffee = (props) => {
    let params = useParams();
    let navigate = useNavigate();

    let { editCoffee, getCoffee, coffee } = useContext(CoffeeContext);

    useEffect(() => {
        async function fetch() {
          await getCoffee(params.coffeeId)
            .then((coffee) => setUpdateCoffee(coffee))
        }
        fetch()
      }, [params.coffeeId, getCoffee]);

    let { _id, name, description, price } = coffee;

    //console.log(coffee);

    let [ updateCoffee, setUpdateCoffee ] = useState({
        id: _id,
        name: name,
        description: description,
        price: price
    });

    function handleChange(event) {
        setUpdateCoffee((prevValue) => {
            return { ...prevValue, [event.target.name]: event.target.value }
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        editCoffee(updateCoffee, updateCoffee._id).then(() => {
            navigate('/coffee');
        }).catch(error => {
            navigate('/signin');
            console.log(error);
        });
    }

    //console.log(updateCoffee);

    function loading() {
        return <div className="w-25 text-center">Loading Yo</div>
      }
    
      function updateForm() {
        return (
            <form onSubmit={handleSubmit}>
            <h1>UPDATE COFFEE</h1>
            <span>Coffee Name  </span>
            <input placeholder="Enter coffee name" type="text" name="name" value={updateCoffee.name} onChange={handleChange} />
            <br></br><br></br>
            <span>Description  </span>
            <input placeholder="Enter description" type="text" name="description" value={updateCoffee.description} onChange={handleChange} />
            <br></br><br></br>
            <span>Price  </span>
            <input placeholder="Enter price" type="number" name="price" value={updateCoffee.price} onChange={handleChange} />
            <br></br><br></br>
            <button>Update Coffee</button>
        </form>
        )
      }
      if (updateCoffee === undefined) return loading()
      return parseInt(updateCoffee._id) !== parseInt(params.coffeeId) ?  loading() : updateForm()
};

export default UpdateCoffee;
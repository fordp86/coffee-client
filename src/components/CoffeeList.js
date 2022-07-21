import React, { useContext} from 'react';
import CoffeeContext from '../contexts/CoffeeContext';
import { Link, useNavigate } from 'react-router-dom';

const CoffeeList = () => {
    let navigate = useNavigate();

    let { deleteCoffee } = useContext(CoffeeContext);

    function removeCoffee(id) {
        deleteCoffee(id).then(() => {
            navigate('/coffee');
        }).catch(error => {
            navigate('/signin');
            console.log(error);
        });
    }

    return (
        <CoffeeContext.Consumer>
        {
            ({ coffee }) => {
                return <div>
                    <h1>Coffee List</h1>
                    <Link to="/coffee/new">Add New Coffee</Link>
                    <div>
                        {coffee.map((c) => {
                            return (
                                <div key={c._id}>
                                    <h2>{c.name} | ${c.price}</h2>
                                    <p>{c.description}</p>
                                    <div>
                                        <Link to={c._id}>Edit Coffee</Link>
                                        <br />
                                        <Link to={{}} onClick={() => removeCoffee(`${c._id}`)}>Delete Coffee</Link>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            }
        }
        </CoffeeContext.Consumer>
    );
}

export default CoffeeList;
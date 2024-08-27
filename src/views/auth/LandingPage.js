import React, { useEffect, useState } from 'react';
import { Button, Col, Input, Label, Navbar, NavbarBrand, Row, Table } from 'reactstrap';
import { logout } from '../../store/actions/authAction';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addFoodSchedule, deleteFoodSchedule, getFoodData, editFoodSchedule } from '../../store/actions/foodAction';
const daysOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function LandingPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const uid = useSelector((state) => state.authUser.uid);
    const { list, lastDocument, hasMoreDocument } = useSelector((state) => state.food);
    // console.log(list, lastDocument, hasMoreDocument)
    const [foodName, setFoodName] = useState('');
    const [day, setDay] = useState('');
    const [editing, setEditing] = useState({ id: null });
    const [searchFood, setSearchFood] = useState('');
    const [filterDay, setFilterDay] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [selectedImage, setSelectedImage] = useState(null);  

    const handleImageChange = (event) => {  
        const file = event.target.files[0];  
        setSelectedImage(file)
    };  
// console.log(selectedImage)
    const handleLogout = () => {
        dispatch(logout(() => {
            history.push("/auth/login");
        }));
    };

    const handleAdd = () => {
        if (foodName && day) {
            if (!editing.id){
                const newSchedule = {
                    day,
                    food: foodName,
                    createdAt: new Date().toLocaleString(),
                    image : selectedImage,
                    uid
                };
                // console.log(newSchedule)
                dispatch(addFoodSchedule(newSchedule, () => {
                    setFoodName('');
                    setDay('');
                }));
            } else {
                const updatedSchedule = {
                    day: day,
                    food: foodName,
                    uid
                };
                dispatch(editFoodSchedule(editing.id, updatedSchedule, () => {
                    setEditing({ id: null })
                    setFoodName('');
                    setDay('');
                }));
            }
        }
    };

    const handleDelete = (id) => {
        dispatch(deleteFoodSchedule(id, () => { }));
    };

    useEffect(() => {
        dispatch(getFoodData(uid, ""));
    }, []);

    const loadMore = () => {
        dispatch(getFoodData(uid, lastDocument));
    }

    const filteredFoodSchedule = filterDay ? list.filter((item) => item.day === filterDay) : list;

    const sortedFoodSchedule = filteredFoodSchedule.sort((a, b) => {
        const rowA = new Date(a.createdAt);
        const rowB = new Date(b.createdAt);
        return sortOrder === 'asc' ? rowA - rowB : rowB - rowA;
    });

    const searchedFoodSchedule = sortedFoodSchedule.filter((item) =>
        item.food.includes(searchFood)
    );

    const toggleSortOrder = () => {
        setSortOrder((prevOrder) => prevOrder === 'asc' ? 'desc' : 'asc');
    };

    const handleEdit = (id) => {
        const item = list.find((item) => item.id === id)
        setEditing({ id: item.id })
        setFoodName(item.food)
        setDay(item.day)
    }

    return (
        <>
            <Navbar>
                <NavbarBrand className='fs-1'>Food Scheduler</NavbarBrand>
                <Button color='primary' onClick={handleLogout}>LOGOUT</Button>
            </Navbar>
            <Row className='w-100'>
                <Col lg='3' className='ml-5 mt-3'>
                    <Label>Food Name</Label>
                    <Input
                        placeholder='Add Food Name'
                        type='text'
                        value={foodName}
                        onChange={(e) => setFoodName(e.target.value)}
                    />
                </Col>
                <Col lg='3' className='mt-3'>
                    <Label>Select Day</Label>
                    <Input
                        id="exampleSelect"
                        name="select"
                        type="select"
                        value={day}
                        onChange={(e) => setDay(e.target.value)}
                    >
                        <option>--Select--</option>
                        {daysOrder.map((day) => (
                            <option key={day}>{day}</option>
                        ))}
                    </Input>
                </Col>
                <Col lg='4' className='mt-5'>
                    <div  className='d-flex'>
                        <input type="file" onChange={handleImageChange} />
                        {selectedImage && (
                            <div> 
                                <img src={selectedImage} alt="Selected" width={50} height={50}/>
                            </div>
                        )}
                    </div>
                </Col>
                <Col lg='1'>
                    <Button color='primary' className='mt-5' onClick={handleAdd}>
                        {editing.id ? 'Update' : 'Add'}
                    </Button>
                </Col>
            </Row>
            <Row className='w-100'>
                <Col lg="3" className="mt-3 ml-5">
                    <Label>Filter by Day</Label>
                    <Input
                        id="filterDaySelect"
                        name="filterDay"
                        type="select"
                        value={filterDay}
                        onChange={(e) => setFilterDay(e.target.value)}
                    >
                        <option value=''>--All Days--</option>
                        {daysOrder.map((day) => (
                            <option key={day} value={day}>{day}</option>
                        ))}
                    </Input>
                </Col>
                <Col lg='3' className='mt-3'>
                    <Label>Search Food Name</Label>
                    <Input
                        placeholder='Search Food'
                        type='text'
                        value={searchFood}
                        onChange={(e) => setSearchFood(e.target.value)}
                    />
                </Col>
                <Col lg='2'>
                    <Button color='primary' className='mt-5' onClick={toggleSortOrder}>
                        {sortOrder === 'asc' ? 'Sort in Decending' : 'Sort in Asscending'}
                    </Button>
                </Col>
            </Row>
            <Row className="mt-5 w-100">
                <Col lg="6" className="ml-5">
                    <Table>
                        <thead>
                            <tr>
                                <th>Day</th>
                                <th>Food</th>
                                <th>Created At</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {searchedFoodSchedule.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.day}</td>
                                    <td>{item.food}</td>
                                    <td>{item.createdAt}</td>
                                    <td>
                                        <Button color="success" size="sm" className='mx-4' onClick={() => handleEdit(item.id)}>Edit</Button>
                                        <Button color="danger" size="sm" onClick={() => handleDelete(item.id)}>Delete</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Button color="primary" size="sm" disabled={!hasMoreDocument} onClick={() => loadMore()}>Load More</Button>

                </Col>
            </Row>
        </>
    );
}

export default LandingPage;
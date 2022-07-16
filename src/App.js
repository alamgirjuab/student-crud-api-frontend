import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import DataTable from 'react-data-table-component';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { MdDeleteForever, MdEdit, MdAddCircle } from 'react-icons/md';
import { Button, Modal } from 'react-bootstrap';
import PopupForm from './PopupForm';

function App() {
  const [studentData, setStudentData] = useState([]);
  // Modal State
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Get Data From Database
  const getStudentData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/studentinfo')
      setStudentData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Handle Datele Function
  const handleDelete = id => {
    const url = `http://localhost:5000/studentinfo/${id}`;
    fetch(url, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.deletedCount) {
          alert('Data deleted successfully !')
          const remaining = studentData.filter(remainData => remainData._id !== id);
          setStudentData(remaining);
        }
      })
  }

  const columns = [
    {
      name: '#',
      cell: (row, index) => index + 1,
      grow: 0,
    },
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Class',
      selector: row => row.class,
    },
    {
      name: 'Roll',
      selector: row => row.roll,
    },
    {
      name: 'Group',
      selector: row => row.group,
    },
    {
      name: 'Action',
      cell: row => [<button className='btn me-1 btn-danger' onClick={() => handleDelete(row._id)}><MdDeleteForever /></button>,
      <button className='btn me-1 btn-warning'><MdEdit /></button>]
    }
  ];

  useEffect(() => {
    getStudentData()
  }, [])
  // console.log(studentData);
  return (
    <div>
      <div className="header text-white text-center py-5">
        <h1>Welcome to <span className="text-primary">Softnerve Technology</span> Private Limited</h1>
      </div>
      <div className='container my-5'>
        <h4 className='text-center'>Student Information System</h4>

        {/*-------------------
        | Modal Start Here |
        ------------------*/}
        <div className='my-3'>
          <>
            <Button variant="primary" onClick={handleShow}>
              <MdAddCircle /> Insert New Record
            </Button>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                {/* <Modal.Title>Modal heading</Modal.Title> */}
              </Modal.Header>
              <Modal.Body>
                <PopupForm handleClose={handleClose} getStudentData={getStudentData} />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                {/* <Button variant="primary" onClick={handleClose}>
                            Save Changes
                        </Button> */}
              </Modal.Footer>
            </Modal>
          </>
        </div>

        {/*----------------- 
        | Modal End Here |
        ----------------*/}

        <DataTable
          columns={columns}
          data={studentData}
          fixedHeader
          fixedHeaderScrollHeight='400px'
          highlightOnHover
        />
      </div>
    </div>
  );
}

export default App;

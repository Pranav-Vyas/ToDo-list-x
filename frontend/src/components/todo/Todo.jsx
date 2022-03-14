import React, { useEffect, useState } from 'react';
import './Todo.css';
import { useNavigate } from "react-router-dom";
import { updateState } from '../../actions/index';
import { useSelector, useDispatch } from 'react-redux';
import Icon from '@material-ui/core/Icon';

function Todo() {

  const [inputData, setinputData] = useState("");
  const list = useSelector((state) => state.reducer.list);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    console.log("todo use effect");
    const checkAuthentication = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch("/auth", {
          mode: 'cors',
          method: "get",
          headers: new Headers({
            'Accept': "application/json",
            "content-type": "application/json",
            "Authorization": `Bearer ${token}`
          })
        });
        if (res.status !== 200) {
          console.log('if not 200');
          // navigate("/login");
          throw new Error(res.error);
        } else {
          console.log("authenticated");
        }

      } catch {
        console.log('in todo catch');
        navigate("/login");
      }
    }
    checkAuthentication();
  })

  useEffect(() => {
    const fetchData = async () => {
      console.log('in fetch data');
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('LoginId');
      const res = await fetch(`/todo/${userId}`, {
        mode: 'cors',  // this can not be 'no-cors'
        method: "GET",
        headers: new Headers({
          'Accept': "application/json",
          "content-type": "application/json",
          "Authorization": `Bearer ${token}`
        })
      });
      const data = await res.json();
      console.log("in fetch data", data);
      if (res.status > 200 || !data) {
        console.log(res.status);

        // alert("Cannot get posts");
      } else {
        console.log(data.list);
        dispatch(updateState(data.list));
      }

    }
    fetchData();
  }, [dispatch])

  const handleLogoutClick = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const res = await fetch("/logout", {
      mode: 'cors',  // this cannot be 'no-cors'
      method: "GET",
      headers: new Headers({
        'Accept': "application/json",
        "content-type": "application/json",
        "Authorization": `Bearer ${token}`
      })
    });
    if (res.status === 200) {
      localStorage.removeItem('token');
      localStorage.removeItem('LoginId');
      navigate("/login");

    } else {
      alert("Logout failed")
    }
  }

  const addData = async () => {
    const token = localStorage.getItem('token');
    const text = inputData;
    const id = localStorage.getItem('LoginId');

    const res = await fetch(`/todo/add`, {
      mode: 'cors',  // this can not be 'no-cors'
      method: "POST",
      headers: new Headers({
        'Accept': "application/json",
        "content-type": "application/json",
        "Authorization": `Bearer ${token}`
      }),
      body: JSON.stringify(
        {
          "userid": id,
          "data": text
        }
      )
    });
    const data = await res.json();
    if (res.status !== 200) {
      console.log(data.error);
    } else {
      console.log(data.user);
      dispatch(updateState(data.user.list));
      setinputData("");
    }

  }

  const deleteData = async (dataId) => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('LoginId');

    const res = await fetch(`/todo/delete`, {
      mode: 'cors',  // this can not be 'no-cors'
      method: "DELETE",
      headers: new Headers({
        'Accept': "application/json",
        "content-type": "application/json",
        "Authorization": `Bearer ${token}`
      }),
      body: JSON.stringify(
        {
          "userId": userId,
          "dataId": dataId
        }
      )
    });
    const data = await res.json();
    if (res.status !== 200) {
      console.log(data.error);
    } else {
      console.log(data.user);
      dispatch(updateState(data.user.list));
      setinputData("");
    }

  }


  return (
    <>
      <div className='main-container'>
        <h1>To Do</h1>
        <div className="write">
          <input className='todo-input' type="text" value={inputData} onChange={(e) => setinputData(e.target.value)} />
          <Icon onClick={addData} className='add-btn' >add</Icon>
          <button onClick={handleLogoutClick} className="logout-btn">Logout</button>
        </div>
        <div className="list">

          {
            list.map((task) => {
              return (
                <div key={task._id} className="item">
                  <p>{task.item}</p>

                  <Icon onClick={() => deleteData(task._id)} className='delete-btn'>delete_outline</Icon>
                </div>
              )
            })
          }

        </div>


      </div>
    </>
  )
}

export default Todo
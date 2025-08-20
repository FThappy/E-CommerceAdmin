import React, { useEffect, useState } from 'react';
import './widgetSm.css';
import { Visibility } from '@mui/icons-material';
import { userRequest } from '../../requestMethods';
import { format } from 'timeago.js';

export default function WidgetSm() {
  const [user, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await userRequest.get('users/findall/?new=true');
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUsers();
  }, []);

  return (
    <div className='widgetSm'>
      <span className='widgetSmTitle'>New Join Members</span>
      <ul className='widgetSmList'>
        {user.map(user => (
          <li className='widgetSmListItem' key={user._id}>
            <img
              src={user.img || 'https://cdn.icon-icons.com/icons2/1929/PNG/512/iconfinder-panda-4591884_122127.png'}
              alt='a'
              className='widgetSmImg'
            />
            <div className='widgetSmUser'>
              <span className='widgetSmUserName'>{user.username}</span>
              <span className='widgerSmUserTitle'>{user.desc}</span>
            </div>
            <div className='widgetSmCreateat'>
              <h3 className='widgetSmDay'>{format(user.createdAt)}</h3>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

import React from 'react';
import './sidebar.css';
import {
  AttachMoney,
  BarChart,
  ChatBubbleOutline,
  DynamicFeed,
  Home,
  MailOutline,
  PermIdentity,
  Report,
  Storefront,
  Timeline,
  TrendingUp,
  ViewCarousel,
  WorkOutline
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div className='sidebar'>
      <div className='sidebarWrapper'>
        <div className='sidebarMenu'>
          <div className='sidebarTitle'>DashBoard</div>
          <ul className='sidebarList'>
            <Link to='/' className='link'>
              <li className='sidebarListItem'>
                <Home className='sidebarIcon' />
                Home
              </li>
            </Link>
            <Link to='/sales' className='link'>
              <li className='sidebarListItem'>
                <TrendingUp className='sidebarIcon' />
                Sales
              </li>
            </Link>
          </ul>
        </div>
        <div className='sidebarMenu'>
          <div className='sidebarTitle'>Quick Menu</div>
          <ul className='sidebarList'>
            <Link to='/users' className='link'>
              <li className='sidebarListItem'>
                <PermIdentity className='sidebarIcon' />
                Users
              </li>
            </Link>
            <Link to='/products' className='link'>
              <li className='sidebarListItem'>
                <Storefront className='sidebarIcon' />
                Products
              </li>
            </Link>
            <Link to='/orders' className='link'>
              <li className='sidebarListItem'>
                <AttachMoney className='sidebarIcon' />
                Transactions
              </li>
            </Link>
            <Link to='/banners' className='link'>
              <li className='sidebarListItem'>
                <ViewCarousel className='sidebarIcon' />
                Banners
              </li>
            </Link>
          </ul>
        </div>
        <div className='sidebarMenu'>
          <div className='sidebarTitle'>Notifications</div>
          <ul className='sidebarList'>
            <Link to='/feedbacks' className='link'>
              <li className='sidebarListItem'>
                <DynamicFeed className='sidebarIcon' />
                Feedback
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}

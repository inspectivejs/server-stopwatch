import React from 'react';
import { Link } from 'react-router-dom'

const Nav = (props) => (
  <ul>
    <Link to='/requests'><li className="menu_icons"><i class="far fa-4x fa-chart-bar"></i></li></Link>
    <Link to='/logs'><li className="menu_icons"><i class="fas fa-4x fa-file-alt"></i></li></Link>
    <Link to='/settings'><li className="menu_icons"><i class="fas fa-4x fa-cogs"></i></li></Link>
  </ul>
)

export default Nav
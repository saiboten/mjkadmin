import React from 'react';

export const Menu = React.createClass({

  getInitialState: function() {
    return {
      menuOpen: false
    }
  },

  frontPage: function() {
    window.location = "/";
  },

  logInOrOut: function()  {
    this.props.loggedIn === true ? window.location = "/logout" : window.location = "/secure";
  },

  render: function() {
    // Quick note: this.props.loggedIn is a string
    var loggedInLink = this.props.loggedIn==="true" ? (<a className="header__menu-item" href="/logout">Logg ut</a>) : (<a className="header__menu-item" href="/secure">Logg inn</a>);
    var openMenuContent = (
      <ul className="header__menu-dropdown-list">
       <li className="header__menu-dropdown-list-element" onClick={this.frontPage}>Forsiden</li>
       <li className="header__menu-dropdown-list-element" onClick={this.logInOrOut}>{this.props.loggedIn==="true" ? "Logg ut":"Logg inn"}</li>
      </ul>
    )

    return (
      <nav className="header">
        <div className="header__fullscreen">
          <a className="header__menu-item" href="/"> Forsiden </a>
          {loggedInLink}
        </div>

    </nav>
    );
  }
});

export default Menu;

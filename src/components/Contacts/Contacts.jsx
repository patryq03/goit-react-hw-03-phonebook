import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Contacts extends Component {
  deleteId = Id => {
    this.props.del(Id);
  };
  createList = () => {
    return this.props.contacts.map(contact => {
      return (
        <li key={contact.id} id={contact.id}>
          {`${contact.name}: ${contact.number}`}
          <button
            data-id={contact.id}
            onClick={() => this.deleteId(contact.id)}
          >
            Delete
          </button>
        </li>
      );
    });
  };

  render() {
    return <ul>{this.createList()}</ul>;
  }
}
Contacts.propTypes = {
  contacts: PropTypes.array.isRequired,
  del: PropTypes.func.isRequired,
};
Contacts.defaultProps = {
  contacts: [],
};

export default Contacts;
import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import Form from './Form/Form';
import Contacts from './Contacts/Contacts';
import Filter from './Filter/Filter';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
    console.debug(contacts);
    console.log(parsedContacts);
  }

  componentDidUpdate(_, prevState) {
    if (JSON.stringify(this.state.contacts) !== JSON.stringify(prevState.contacts)) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));

    }
  }
  

  formSubmitHandler = data => {
    this.repeatControl(data);
  };

  repeatControl = data => {
    let nameArray = [];
    nameArray = this.state.contacts.map(cur => cur.name);
    if (!nameArray.includes(data.name)) {
      let arrayCont = [];
      arrayCont = [
        ...this.state.contacts,
        { id: nanoid(), name: data.name, number: data.number },
      ];
      return this.setState({ ...this.state, contacts: arrayCont });
    } else {
      alert('This contact is already in contacts.');
    }
  };

  elementDelete = (arr, idContact) => {
    let newArr = arr.filter(elem => elem.id !== idContact);
    return newArr;
  };

  deleteContactFromContactList = idContact => {
    let newArrAfterDel = this.elementDelete(this.state.contacts, idContact);
    this.setState({
      ...this.state,
      contacts: [...newArrAfterDel],
    });
  };

  setFilterToState = filterData => {
    this.setState({ ...this.state, filter: `${filterData}` });
  };

  filterArr = fArr => {
    let newArr = fArr.filter(cur =>
      cur.name.toUpperCase().includes(this.state.filter),
    );
    return newArr;
  };

  render() {
    return (
      <div className="App">
        <h1>Phonebook</h1>
        <Form onSubmitData={this.formSubmitHandler} />
        <h1>Contacts</h1>
        <Filter setFilterToState={this.setFilterToState} />
        <Contacts
          contacts={this.filterArr(this.state.contacts)}
          del={this.deleteContactFromContactList}
        />
      </div>
    );
  }
}
export default App;
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';

class EmployeeEdit extends Component {

    emptyItem = {
        firstName: '',
        secondName: '',
        email: '',
        phone: '',
        salary: 0
    };


    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        if (this.props.match.params.id !== 'new') {
            const employee = await (await fetch(`/api/employee/${this.props.match.params.id}`
            )).json();
            this.setState({item: employee});
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;

        await fetch( (item.id)? `/api/employee/${this.props.match.params.id}` : '/api/employee', {
            method: (item.id) ? 'PATCH' : 'POST',
            body: JSON.stringify(item),
            headers: {
                "Content-Type" : "application/json"
            }

        });
        this.props.history.push('/employee');
    }

    render() {
        if(localStorage.getItem("loggedUserRole")==="ROLE_MANAGER")
        {
            const {item} = this.state;
            const title = <h2>{item.id ? 'Edycja pracownika' : 'Dodawanie pracownika'}</h2>;
            console.log(item);

            return(
                <div>
                <Container>
                    {title}
                    {item.id ? <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label for="firstName">Imię</Label>
                                <Input type="text" name="firstName" id="firstName" value={item.firstName || ''}
                                       onChange={this.handleChange} autoComplete="name"/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="secondName">Nazwisko</Label>
                                <Input type="text" name="secondName" id="secondName" value={item.secondName || ''}
                                       onChange={this.handleChange} autoComplete="address-level1"/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="email">E-mail</Label>
                                <Input type="text" name="email" id="email" value={item.email || ''}
                                       onChange={this.handleChange} autoComplete="address-level1"/>
                            </FormGroup>
                            <FormGroup>

                            </FormGroup>
                            <Label for="phone">Telefon</Label>
                            <Input type="text" name="phone" id="phone" value={item.phone || ''}
                                   onChange={this.handleChange} autoComplete="address-level1"/>

                            <FormGroup>

                            </FormGroup>
                            <Label for="phone">Wynagrodzenie</Label>
                            <Input type="text" name="salary" id="salary" value={item.salary || ''}
                                   onChange={this.handleChange} autoComplete="address-level1"/>

                            <FormGroup>
                                <Button color="primary" type="submit">Zapisz</Button>{' '}
                                <Button color="secondary" tag={Link} to="/employee">Anuluj</Button>
                            </FormGroup>
                        </Form> :

                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label for="firstName">Imię</Label>
                                <Input type="text" name="firstName" id="firstName" value={item.firstName || ''}
                                       onChange={this.handleChange} autoComplete="name"/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="secondName">Nazwisko</Label>
                                <Input type="text" name="secondName" id="secondName" value={item.secondName || ''}
                                       onChange={this.handleChange} autoComplete="address-level1"/>
                            </FormGroup>
                            <FormGroup>
                            </FormGroup>
                            <Label for="email">E-mail</Label>
                            <Input type="text" name="email" id="email" value={item.email || ''}
                                   onChange={this.handleChange} autoComplete="address-level1"/>

                            <FormGroup>
                            </FormGroup>
                            <Label for="phone">Telefon</Label>
                            <Input type="text" name="phone" id="phone" value={item.phone || ''}
                                   onChange={this.handleChange} autoComplete="address-level1"/>
                            <FormGroup>
                            </FormGroup>
                            <Label for="phone">Wynagrodzenie</Label>
                            <Input type="text" name="salary" id="salary" value={item.salary || ''}
                                   onChange={this.handleChange} autoComplete="address-level1"/>

                            <FormGroup>
                                <Button color="primary" type="submit">Zapisz</Button>{' '}
                                <Button color="secondary" tag={Link} to="/employee">Anuluj</Button>
                            </FormGroup>
                        </Form>
                    }

                </Container>
            </div>);


        } else return <div>BRAK DOSTĘPU</div>
    }
}

export default withRouter(EmployeeEdit);
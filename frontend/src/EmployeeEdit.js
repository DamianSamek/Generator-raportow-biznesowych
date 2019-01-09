import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label, Col } from 'reactstrap';

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
            const {item} = this.state;
            const title = <h2>{item.id ? 'Edycja pracownika' : 'Dodawanie pracownika'}</h2>;
            console.log(item);

            return(
                <div>
                <Container>
                    <Col sm={{size: 4, offset: 4}}>
                    {title}
                    {item.id ? <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label for="firstName">Imię</Label>
                                <Input required type="text" name="firstName" id="firstName" value={item.firstName || ''}
                                       onChange={this.handleChange} autoComplete="name"/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="secondName">Nazwisko</Label>
                                <Input required type="text" name="secondName" id="secondName" value={item.secondName || ''}
                                       onChange={this.handleChange} autoComplete="address-level1"/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="email">E-mail</Label>
                                <Input required type="email" name="email" id="email" value={item.email || ''}
                                       onChange={this.handleChange} autoComplete="address-level1"/>
                            </FormGroup>
                            <FormGroup>

                            </FormGroup>
                            <Label for="phone">Telefon</Label>
                            <Input required type="text" pattern="\d{9}" title="9-cyfrowy numer telefonu" name="phone" id="phone" value={item.phone || ''}
                                   onChange={this.handleChange} autoComplete="address-level1"/>

                            <FormGroup>

                            </FormGroup>
                            <Label for="phone">Wynagrodzenie</Label>
                            <Input required type="number" name="salary" id="salary" value={item.salary || ''}
                                   onChange={this.handleChange} autoComplete="address-level1"/>

                            <FormGroup>
                                <Button color="primary" type="submit">Zapisz</Button>{' '}
                                <Button color="secondary" tag={Link} to="/employee">Anuluj</Button>
                            </FormGroup>
                        </Form> :

                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label for="firstName">Imię</Label>
                                <Input required type="text" name="firstName" id="firstName" value={item.firstName || ''}
                                       onChange={this.handleChange} autoComplete="name"/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="secondName">Nazwisko</Label>
                                <Input required type="text" name="secondName" id="secondName" value={item.secondName || ''}
                                       onChange={this.handleChange} autoComplete="address-level1"/>
                            </FormGroup>
                            <FormGroup>
                            </FormGroup>
                            <Label for="email">E-mail</Label>
                            <Input required type="email" name="email" id="email" value={item.email || ''}
                                   onChange={this.handleChange} autoComplete="address-level1"/>

                            <FormGroup>
                            </FormGroup>
                            <Label for="phone">Telefon</Label>
                            <Input required type="text" pattern="\d{9}" title="9-cyfrowy numer telefonu" name="phone" id="phone" value={item.phone || ''}
                                   onChange={this.handleChange} autoComplete="address-level1"/>
                            <FormGroup>
                            </FormGroup>
                            <Label for="phone">Wynagrodzenie</Label>
                            <Input required type="number" name="salary" id="salary" value={item.salary || ''}
                                   onChange={this.handleChange} autoComplete="address-level1"/>

                            <FormGroup>
                                <Button color="primary" type="submit">Zapisz</Button>{' '}
                                <Button color="secondary" tag={Link} to="/employee">Anuluj</Button>
                            </FormGroup>
                        </Form>
                    }
                    </Col>
                </Container>
            </div>);
    }
}

export default withRouter(EmployeeEdit);
import React, {Component} from 'react';
import {
    Button,
    ButtonGroup,
    Container,
    Table,
    TabContent,
    TabPane,
    Nav,
    NavItem,
    NavLink,
    Card,
    CardTitle,
    CardText,
    Row,
    Col
} from 'reactstrap';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {Bar, HorizontalBar, Doughnut, Pie} from 'react-chartjs-2';
import classnames from 'classnames';

class EmployeeList extends Component {

    constructor(props) {
        super(props);
        this.state = {employees: [], isLoading: true, activeTab: '1'};
        this.remove = this.remove.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {
        this.setState({isLoading: true});


        axios.get('/api/employee')
            .then(
                response => {
                    const data = response.data._embedded.employee;
                    this.setState({employees: data, isLoading: false});

                }
            )
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });

    }

    async remove(id) {
        await fetch(`/api/employee/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("token")
            }
        }).then(() => {
            let updatedEmployees = [...this.state.employees].filter(i => i.id !== id);
            this.setState({employees: updatedEmployees});
        });
    }

    exportToPdf() {
        axios({
            url: 'http://localhost:8080/api/pdf',
            method: 'GET',
            responseType: 'blob', // important
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            // link.setAttribute('download', 'file.pdf');
            window.open(url);
            document.body.appendChild(link);
            // link.click();
        });
    }


    async exportToXlsx() {
        axios({
            url: 'http://localhost:8080/api/xlsx',
            method: 'GET',
            responseType: 'blob', // important
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'file.xlsx');
            document.body.appendChild(link);
            link.click();
        });

    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    render() {
        const {employees, isLoading} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }
        console.log(employees);
        const employeesList = employees.map(employee => {
            //   const address = `${group.address || ''} ${group.city || ''} ${group.stateOrProvince || ''}`;
            return <tr key={employee.id}>
                <td style={{whiteSpace: 'nowrap'}}>{employee.firstName}</td>
                <td>{employee.secondName}</td>
                <td>{employee.email}</td>
                <td>{employee.phone}</td>
                <td>{employee.salary}</td>

                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link}
                                to={"/manager/employee/" + employee.id}>Edytuj</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(employee.id)}>Zwolnij</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        const labels = [];
        const salaries = [];
        employees.map(employee => {
            labels.push(employee.firstName + " " + employee.secondName);
            salaries.push(employee.salary);
        })

        const data = {
            labels: labels,
            datasets: [
                {
                    label: 'Wysokość wynagrodzenia',
                    backgroundColor: 'rgba(0,0,128,1)',
                    borderColor: 'rgba(255,255,255,0)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(0,0,255,1)',
                    hoverBorderColor: 'rgba(255,255,0,1)',
                    data: salaries
                }
            ],
        };

        return (
            <div>
                <Container fluid>

                    <div>
                        <Row><Col sm={{size: 8, offset: 2}}>
                        <Nav tabs >
                            <NavItem>
                                <NavLink className={classnames({active: this.state.activeTab === '1'})}
                                         onClick={() => {
                                             this.toggle('1');
                                         }}
                                >
                                    Zarządzaj pracownikami
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className={classnames({active: this.state.activeTab === '2'})}

                                         onClick={() => {
                                             this.toggle('2');
                                         }}
                                >
                                    Wykres słupkowy
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({active: this.state.activeTab === '3'})}
                                    onClick={() => {
                                        this.toggle('3');
                                    }}
                                >
                                    Wykres słupkowy poziomy
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({active: this.state.activeTab === '4'})}
                                    onClick={() => {
                                        this.toggle('4');
                                    }}
                                >
                                    Wykres kołowy
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className={classnames({active: this.state.activeTab === '5'})}
                                         onClick={() => {
                                             this.toggle('5');
                                         }}
                                >
                                    Wykres pierścieniowy
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={this.state.activeTab}>
                            <TabPane tabId="1">
                                        <div className="float-right">
                                            <Button color="success" tag={Link} to="/manager/employee/new">Dodaj
                                                pracownika</Button>
                                        </div>

                                        <Table className="mt-4">
                                            <thead>
                                            <tr>
                                                <th width="20%">Imię</th>
                                                <th width="20%">Nazwisko</th>
                                                <th>E-mail</th>
                                                <th>Telefon</th>
                                                <th>Wynagrodzenie</th>
                                                <th width="10%">Akcja</th>

                                            </tr>
                                            </thead>
                                            <tbody>
                                            {employeesList}
                                            </tbody>
                                        </Table>
                                        <div className="float-right">
                                            <Button size="sm" outline color="info" onClick={this.exportToPdf}>Eksportuj
                                                do PDF</Button>
                                        </div>
                                        <div className="float-right">
                                            <Button size="sm" outline color="info" onClick={this.exportToXlsx}>Eksportuj
                                                do XLSX</Button>
                                        </div>

                            </TabPane>
                            <TabPane tabId="2">

                                        <div>

                                            <Bar
                                                data={data} options={{
                                                    scales: {
                                                        yAxes: [{
                                                            ticks: {
                                                                min: 0
                                                            }
                                                        }]
                                                    }
                                            }}
                                            />
                                        </div>



                            </TabPane>
                            <TabPane tabId="3">
                                    <div>

                                        <HorizontalBar data={data} options={{
                                            scales: {
                                                xAxes: [{
                                                    ticks: {
                                                        min: 0
                                                    }
                                                }]
                                            }
                                        }}/>
                                    </div>
                            </TabPane>
                            <TabPane tabId="4">


                                    <div>

                                        <Pie data={data}/>
                                    </div>


                            </TabPane>

                            <TabPane tabId="5">


                                    <div>

                                        <Doughnut data={data}/>
                                    </div>

                            </TabPane>
                        </TabContent>
                        </Col></Row>
                    </div>


                </Container>


            </div>
        );
    }
}

export default EmployeeList;
package pl.edu.ur.reportgenerator.model;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.Size;


@Entity
@Table(name="employee")
@Data
public class Employee {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int id;

    @Size(max=45)
    private String firstName;
    @Size(max=45)
    private String secondName;
    @Size(max=12)
    private String phone;
    @Size(max=45)
    private String email;
    private int salary;
}
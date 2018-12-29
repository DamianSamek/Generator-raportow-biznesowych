package pl.edu.ur.reportgenerator.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import pl.edu.ur.reportgenerator.model.Employee;

@RepositoryRestResource(collectionResourceRel = "employee", path = "employee")
    public interface EmployeeRepository extends JpaRepository<Employee, Integer> {

    }


package pl.edu.ur.reportgenerator.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;


import net.sf.jasperreports.engine.JRException;
import pl.edu.ur.reportgenerator.report.EmployeeReport;
import pl.edu.ur.reportgenerator.repositories.EmployeeRepository;
import pl.edu.ur.reportgenerator.services.ReportService;

@Controller
public class ReportController {

    private final EmployeeRepository employeeRepository;
    private final ReportService reportService;

    @Autowired
    public ReportController(final EmployeeRepository employeeRepository, final ReportService reportService){
        this.employeeRepository = employeeRepository;
        this.reportService = reportService;
    }


    @GetMapping(value = "/api/pdf", produces = MediaType.APPLICATION_PDF_VALUE)
    @ResponseBody
    public HttpEntity<byte[]> getEmployeeReportPdf(final HttpServletResponse response) throws JRException, IOException, ClassNotFoundException {
        final EmployeeReport report = new EmployeeReport(employeeRepository.findAll());
        final byte[] data = reportService.getReportPdf(report.getReport());

        HttpHeaders header = new HttpHeaders();
        header.setContentType(MediaType.APPLICATION_PDF);
        header.set(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=employeeReport.pdf");
        header.setContentLength(data.length);

        return new HttpEntity<byte[]>(data, header);
    }


    @GetMapping(value = "/api/xlsx", produces = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    @ResponseBody
    public HttpEntity<byte[]> getEmployeeReportXlsx(final HttpServletResponse response) throws JRException, IOException, ClassNotFoundException {
        final EmployeeReport report = new EmployeeReport(employeeRepository.findAll());
        final byte[] data = reportService.getReportXlsx(report.getReport());

        HttpHeaders header = new HttpHeaders();
        header.setContentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"));
        header.set(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=employeeReport.xlsx");
        header.setContentLength(data.length);

        return new HttpEntity<byte[]>(data, header);
    }
}

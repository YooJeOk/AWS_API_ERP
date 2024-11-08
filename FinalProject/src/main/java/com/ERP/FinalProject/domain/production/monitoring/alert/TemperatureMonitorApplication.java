package com.ERP.FinalProject.domain.production.monitoring.alert;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class TemperatureMonitorApplication {
    public static void main(String[] args) {
        SpringApplication.run(TemperatureMonitorApplication.class, args);
    }
}

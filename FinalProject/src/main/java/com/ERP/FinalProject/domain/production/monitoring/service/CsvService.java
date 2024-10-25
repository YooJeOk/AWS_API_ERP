package com.ERP.FinalProject.domain.production.monitoring.service;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.stereotype.Service;

import com.ERP.FinalProject.domain.production.monitoring.model.ProductionMonitoringData;

import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.BufferedReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class CsvService {

	public List<ProductionMonitoringData> readCSV() {
	    List<ProductionMonitoringData> dataList = new ArrayList<>();

	    try {
	        InputStream inputStream = getClass().getClassLoader().getResourceAsStream("CSV/production_monitoring_order4.csv");
	        if (inputStream == null) {
	            throw new IOException("CSV 파일을 찾을 수 없습니다.");
	        }

	        BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream));
	        CSVParser csvParser = new CSVParser(reader, CSVFormat.DEFAULT.withHeader());

	        for (CSVRecord record : csvParser) {
	            ProductionMonitoringData data = new ProductionMonitoringData();

	            data.setId(Long.parseLong(record.get(0))); // id는 Long 타입
	            data.setOrderId(Integer.parseInt(record.get(1))); // orderId는 Integer 타입
	            data.setTemperature(Float.parseFloat(record.get(2))); // temperature는 Float 타입
	            data.setHumidity(Float.parseFloat(record.get(3))); // humidity는 Float 타입
	            data.setProductionRate(Float.parseFloat(record.get(4))); // productionRate는 Float 타입
	            data.setOperationTime(Float.parseFloat(record.get(5))); // operationTime은 Float 타입
	            data.setStartTime(record.get(6)); // startTime은 String 타입

	            dataList.add(data);
	        }

	        csvParser.close();
	    } catch (IOException e) {
	        e.printStackTrace();
	    }

	    return dataList;
	}
}
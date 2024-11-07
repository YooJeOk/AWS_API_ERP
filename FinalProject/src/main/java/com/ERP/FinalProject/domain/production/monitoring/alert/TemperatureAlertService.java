package com.ERP.FinalProject.domain.production.monitoring.alert;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.amazonaws.services.sns.AmazonSNS;
import com.amazonaws.services.sns.model.PublishRequest;
import com.amazonaws.services.sns.model.PublishResult;

@Service
public class TemperatureAlertService {

    private final AmazonSNS amazonSNS;
    private static final String TOPIC_ARN = "arn:aws:sns:us-east-1:463470975315:tempup"; // AWS SNS 주제 ARN

    @Autowired
    public TemperatureAlertService(AmazonSNS amazonSNS) {
        this.amazonSNS = amazonSNS;
    }

    public void sendTemperatureAlert(AlertRequest alertRequest) {
        String message = String.format(
                "Warning: Temperature exceeded threshold! Order ID: %d, Product: %s, Current Temperature: %.1f°C",
                alertRequest.getOrderId(),
                alertRequest.getProductName(),
                alertRequest.getTemperature()
        );

        PublishRequest publishRequest = new PublishRequest(TOPIC_ARN, message, "Temperature Alert");
        try {
            PublishResult result = amazonSNS.publish(publishRequest);
            System.out.println("SMS sent successfully with Message ID: " + result.getMessageId());
        } catch (Exception e) {
            System.err.println("Error sending SMS: " + e.getMessage());
        }
    }
}

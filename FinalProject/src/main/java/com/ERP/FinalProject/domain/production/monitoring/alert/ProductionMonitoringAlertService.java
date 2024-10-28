package com.ERP.FinalProject.domain.production.monitoring.alert;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.aws.messaging.core.NotificationMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class ProductionMonitoringAlertService {

    private final NotificationMessagingTemplate messagingTemplate;

    @Autowired
    public ProductionMonitoringAlertService(NotificationMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    public void sendAlert(String message) {
        String topicArn = "arn:aws:iam::463470975315:user/yoojeuk"; // 실제 ARN 값으로 변경
        messagingTemplate.sendNotification(topicArn, message, "Production Alert");
    }
}

package com.ERP.FinalProject.domain.production.monitoring.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import java.util.HashMap;
import java.util.Map;

@Service
public class AligoSmsService {

    @Value("${aligo.api.key}")
    private String apiKey;

    @Value("${aligo.user.id}")
    private String userId;

    @Value("${aligo.sender.phone}")
    private String senderPhone;

    private final RestTemplate restTemplate = new RestTemplate();
    private final String ALIGO_SMS_API_URL = "https://apis.aligo.in/send/";

    public void sendSms(String receiverPhone, String message) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        Map<String, String> body = new HashMap<>();
        body.put("key", apiKey);
        body.put("user_id", userId);
        body.put("sender", senderPhone);
        body.put("receiver", receiverPhone);
        body.put("msg", message);
        
        HttpEntity<Map<String, String>> request = new HttpEntity<>(body, headers);

        try {
            ResponseEntity<String> response = restTemplate.postForEntity(ALIGO_SMS_API_URL, request, String.class);
            System.out.println("SMS 발송 성공: " + response.getBody());
        } catch (Exception e) {
            System.err.println("SMS 발송 실패: " + e.getMessage());
        }
    }
}
